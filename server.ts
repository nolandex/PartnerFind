import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

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
