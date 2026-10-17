// Midtrans Snap Client Integration Helper

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks?: {
          onSuccess?: (result: MidtransPaymentResult) => void;
          onPending?: (result: MidtransPaymentResult) => void;
          onError?: (result: MidtransPaymentResult) => void;
          onClose?: () => void;
        }
      ) => void;
      embed?: (token: string, options: { embedId: string }) => void;
    };
  }
}

export interface MidtransPaymentResult {
  status_code?: string;
  status_message?: string;
  transaction_id?: string;
  order_id?: string;
  gross_amount?: string;
  payment_type?: string;
  transaction_time?: string;
  transaction_status?: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  bill_key?: string;
  biller_code?: string;
  permata_va_number?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
  fraud_status?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceMonthly: number;
  priceLifetime: number;
  description: string;
  features: string[];
  ctaLabel: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
}

let snapScriptLoadedPromise: Promise<boolean> | null = null;

/**
 * Loads the Midtrans Snap.js script dynamically using client config from backend
 */
export async function loadMidtransSnap(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (window.snap) return true;
  if (snapScriptLoadedPromise) return snapScriptLoadedPromise;

  snapScriptLoadedPromise = new Promise(async (resolve) => {
    try {
      // Fetch public configuration from backend server
      const configRes = await fetch("/api/midtrans/config");
      let clientKey = "SB-Mid-client-2Jja2G7bzxSbRvmC";
      let snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

      if (configRes.ok) {
        const config = await configRes.json();
        if (config.clientKey) clientKey = config.clientKey;
        if (config.snapJsUrl) snapUrl = config.snapJsUrl;
      }

      // Check if script element already exists
      const existingScript = document.querySelector(`script[src*="snap.js"]`);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = snapUrl;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        console.error("Failed to load Midtrans Snap script");
        resolve(false);
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error("Error setting up Midtrans Snap:", err);
      resolve(false);
    }
  });

  return snapScriptLoadedPromise;
}

/**
 * Calls backend API to create a Snap transaction and obtain token
 */
export async function createMidtransTransaction(params: {
  planId: string;
  planName: string;
  amount: number;
  customerDetails: CustomerDetails;
}): Promise<{ token: string; redirectUrl?: string; orderId: string }> {
  const response = await fetch("/api/midtrans/create-transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Gagal membuat transaksi pembayaran.");
  }

  return data;
}

/**
 * Query status of an order via backend API proxy
 */
export async function checkOrderStatus(orderId: string): Promise<any> {
  const response = await fetch(`/api/midtrans/status/${encodeURIComponent(orderId)}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil status transaksi.");
  }
  return response.json();
}
