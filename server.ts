import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Midtrans configuration credentials
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-00d-pzzNYmONwbRRJ844umvR";
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-2Jja2G7bzxSbRvmC";
const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID || "G250315433";
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

// Pakasir configuration credentials
const PAKASIR_SLUG = process.env.PAKASIR_SLUG || "kelas-uang";
const PAKASIR_API_KEY = process.env.PAKASIR_API_KEY || "gjqy1pdnUiYDPDZQj9l7fDFOWYsyAYup";
const PAKASIR_WEBHOOK_SECRET = process.env.PAKASIR_WEBHOOK_SECRET || "92e23bf7593d6de73a59d337c06cc13e";
const PAKASIR_API_URL = "https://app.pakasir.com/api/v2";

// In-memory ring buffer for recent Pakasir webhook transactions
interface PakasirWebhookLog {
  timestamp: string;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  payload: any;
}
const recentPakasirWebhooks: PakasirWebhookLog[] = [];

const SNAP_API_URL = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1/transactions"
  : "https://app.sandbox.midtrans.com/snap/v1/transactions";

const CORE_API_URL = MIDTRANS_IS_PRODUCTION
  ? "https://api.midtrans.com/v2"
  : "https://api.sandbox.midtrans.com/v2";

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Ensure public/uploads directory exists and is statically accessible
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
    } catch {}
  }
  app.use("/uploads", express.static(uploadsDir));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Image Upload API (Supports Base64 Data URL or Raw Base64)
  app.post("/api/upload-image", async (req, res) => {
    try {
      const { image, fileName } = req.body;
      if (!image || typeof image !== "string") {
        return res.status(400).json({ error: "Data gambar tidak ditemukan." });
      }

      // Format: data:image/png;base64,iVBOR...
      const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "jpg";

      if (matches && matches.length === 3) {
        const mimeType = matches[1].toLowerCase();
        if (mimeType.includes("png")) ext = "png";
        else if (mimeType.includes("webp")) ext = "webp";
        else if (mimeType.includes("gif")) ext = "gif";
        else if (mimeType.includes("svg")) ext = "svg";
        else ext = "jpg";
        buffer = Buffer.from(matches[2], "base64");
      } else {
        buffer = Buffer.from(image, "base64");
      }

      const timestamp = Date.now();
      const sanitizedName = (fileName || "image")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_")
        .substring(0, 30);
      const safeFilename = `${sanitizedName}_${timestamp}.${ext}`;
      const filePath = path.join(uploadsDir, safeFilename);

      await fs.promises.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${safeFilename}`;
      return res.json({
        success: true,
        url: publicUrl,
        fileName: safeFilename,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error("Upload image error:", err);
      return res.status(500).json({ error: err?.message || "Gagal mengunggah gambar." });
    }
  });

  // Client config endpoint for Snap.js injection & client key
  app.get("/api/midtrans/config", (_req, res) => {
    res.json({
      clientKey: MIDTRANS_CLIENT_KEY,
      merchantId: MIDTRANS_MERCHANT_ID,
      isProduction: MIDTRANS_IS_PRODUCTION,
      snapJsUrl: MIDTRANS_IS_PRODUCTION
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js",
    });
  });

  // Create Snap Transaction Token
  app.post("/api/midtrans/create-transaction", async (req, res) => {
    try {
      const { planId, planName, amount, customerDetails } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Nominal pembayaran tidak valid." });
      }

      // Generate a unique Order ID
      const orderId = `CS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      const grossAmount = Math.round(Number(amount));
      const cleanPlanName = (planName || "Paket Akses CollabSeek").substring(0, 50);

      const payload = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        item_details: [
          {
            id: planId || "plan-membership",
            price: grossAmount,
            quantity: 1,
            name: cleanPlanName,
          },
        ],
        customer_details: {
          first_name: customerDetails?.firstName?.trim() || "Partner",
          last_name: customerDetails?.lastName?.trim() || "",
          email: customerDetails?.email?.trim() || "member@collabseek.com",
          phone: customerDetails?.phone?.trim() || "081234567890",
        },
        credit_card: {
          secure: true,
        },
        callbacks: {
          finish: `${req.protocol}://${req.get("host")}/?payment_status=finish&order_id=${orderId}`,
        },
      };

      const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");

      const response = await fetch(SNAP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as any;

      if (!response.ok) {
        console.error("Midtrans Snap API Error:", data);
        return res.status(response.status).json({
          error:
            data?.error_messages?.join(", ") ||
            data?.message ||
            "Gagal membuat token pembayaran Midtrans.",
          details: data,
        });
      }

      return res.json({
        token: data.token,
        redirectUrl: data.redirect_url,
        orderId,
      });
    } catch (err: any) {
      console.error("Internal server error creating Midtrans transaction:", err);
      return res.status(500).json({
        error: err?.message || "Terjadi kesalahan internal server saat membuat transaksi Midtrans.",
      });
    }
  });

  // Check Transaction Status via Midtrans Core API
  app.get("/api/midtrans/status/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        return res.status(400).json({ error: "Order ID diperlukan" });
      }

      const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");
      const response = await fetch(`${CORE_API_URL}/${orderId}/status`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      console.error("Error checking Midtrans transaction status:", err);
      return res.status(500).json({ error: err?.message || "Gagal memeriksa status pembayaran." });
    }
  });

  // ==========================================
  // PAKASIR PAYMENT GATEWAY ENDPOINTS
  // ==========================================

  // Pakasir config and webhook URL resolver
  app.get("/api/pakasir/config", (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.headers["x-forwarded-host"] || req.get("host");
    const webhookUrl = `${protocol}://${host}/api/pakasir/webhook`;

    res.json({
      slug: PAKASIR_SLUG,
      isConfigured: Boolean(PAKASIR_API_KEY && PAKASIR_SLUG),
      webhookUrl,
      sandbox: true,
    });
  });

  // Create Pakasir Transaction (QRIS or Payment Link)
  app.post("/api/pakasir/create-transaction", async (req, res) => {
    try {
      const { amount, method = "qris" } = req.body;

      if (!amount || Number(amount) <= 0) {
        return res.status(400).json({ error: "Nominal pembayaran tidak valid." });
      }

      const grossAmount = Math.round(Number(amount));
      const orderId = `CS-P-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Call Pakasir API v2: POST /api/v2/create-transaction/{slug}/{order_id}
      const pakasirUrl = `${PAKASIR_API_URL}/create-transaction/${encodeURIComponent(PAKASIR_SLUG)}/${encodeURIComponent(orderId)}`;

      const response = await fetch(pakasirUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": PAKASIR_API_KEY,
        },
        body: JSON.stringify({
          method: "qris",
          amount: grossAmount,
        }),
      });

      const data = (await response.json()) as any;

      if (!response.ok) {
        console.error("Pakasir API Error:", data);
        return res.status(response.status).json({
          error: data?.message || data?.error || "Gagal membuat transaksi Pakasir.",
          details: data,
        });
      }

      const qrString = data.qr_string || data.payment_number || data.qris_string || data.qr_code || null;
      let rawPaymentLink = data.payment_link || data.payment_url || (data.txn_id ? `https://app.pakasir.com/pay-v2/${data.txn_id}` : `https://app.pakasir.com/pay/${encodeURIComponent(PAKASIR_SLUG)}/${grossAmount}?order_id=${encodeURIComponent(orderId)}`);

      // Ensure QRIS only parameter is appended if not already present
      let paymentLink = rawPaymentLink;
      if (paymentLink && !paymentLink.includes("qris_only=1")) {
        paymentLink += (paymentLink.includes("?") ? "&" : "?") + "qris_only=1";
      }

      // Format response uniformly for QRIS only
      return res.json({
        txnId: data.txn_id || data.id,
        orderId: data.order_id || orderId,
        paymentLink,
        qrString,
        qrUrl: data.qr_url || data.qr_image || null,
        totalPayment: data.total_payment || grossAmount,
        fee: data.fee || 0,
        status: data.status || "pending",
        expiresAt: data.expires_at || null,
        isSandbox: data.is_sandbox ?? true,
        method: "qris",
      });
    } catch (err: any) {
      console.error("Internal error creating Pakasir transaction:", err);
      return res.status(500).json({
        error: err?.message || "Terjadi kesalahan internal server saat membuat transaksi Pakasir.",
      });
    }
  });

  // Check Pakasir Transaction Status by txnId
  app.get("/api/pakasir/status/:txnId", async (req, res) => {
    try {
      const { txnId } = req.params;
      if (!txnId) {
        return res.status(400).json({ error: "Transaction ID (txnId) diperlukan" });
      }

      const statusUrl = `${PAKASIR_API_URL}/transaction-status/${encodeURIComponent(PAKASIR_SLUG)}/${encodeURIComponent(txnId)}`;
      const response = await fetch(statusUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": PAKASIR_API_KEY,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      console.error("Error checking Pakasir transaction status:", err);
      return res.status(500).json({ error: err?.message || "Gagal memeriksa status pembayaran Pakasir." });
    }
  });

  // Pakasir Webhook Handler (POST /api/pakasir/webhook)
  // Pakasir sends HTTP POST with header `x-secret` matching PAKASIR_WEBHOOK_SECRET
  app.post("/api/pakasir/webhook", (req, res) => {
    try {
      const secretHeader = (req.headers["x-secret"] || req.headers["x-webhook-secret"]) as string | undefined;

      // Validate secret if configured
      if (PAKASIR_WEBHOOK_SECRET && secretHeader && secretHeader !== PAKASIR_WEBHOOK_SECRET) {
        console.warn("Pakasir Webhook Secret mismatch! Received:", secretHeader);
        return res.status(401).json({ error: "Webhook secret tidak valid." });
      }

      const payload = req.body || {};
      const { order_id, amount, status, payment_method, project } = payload;

      console.log(`[PAKASIR WEBHOOK] Payment notification received for order: ${order_id}, status: ${status}, amount: ${amount}`);

      // Push into in-memory ring buffer (keep latest 30 events)
      recentPakasirWebhooks.unshift({
        timestamp: new Date().toISOString(),
        orderId: String(order_id || "unknown"),
        amount: Number(amount) || 0,
        status: String(status || "completed"),
        paymentMethod: payment_method,
        payload,
      });
      if (recentPakasirWebhooks.length > 30) {
        recentPakasirWebhooks.pop();
      }

      return res.status(200).json({
        status: "success",
        received: true,
        orderId: order_id,
        project: project || PAKASIR_SLUG,
      });
    } catch (err: any) {
      console.error("Error processing Pakasir webhook:", err);
      return res.status(500).json({ error: err?.message || "Internal webhook error" });
    }
  });

  // Pakasir Webhook Info & Health endpoint (GET /api/pakasir/webhook)
  app.get("/api/pakasir/webhook", (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.headers["x-forwarded-host"] || req.get("host");
    const webhookUrl = `${protocol}://${host}/api/pakasir/webhook`;

    res.json({
      status: "ready",
      service: "Pakasir Webhook Receiver",
      project: PAKASIR_SLUG,
      webhookUrl,
      instruction: "Salin 'webhookUrl' ini ke Dashboard Pakasir > Edit Project > Webhook URL.",
    });
  });

  // Recent Pakasir Webhook Logs for Admin
  app.get("/api/pakasir/logs", (_req, res) => {
    res.json({
      logs: recentPakasirWebhooks,
      count: recentPakasirWebhooks.length,
    });
  });

  // Vite middleware in dev mode, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
