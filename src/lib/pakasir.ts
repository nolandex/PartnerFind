// Pakasir Payment Gateway Client Helper

export interface PakasirTransactionResult {
  txnId: string;
  orderId: string;
  paymentLink?: string;
  qrString?: string;
  qrUrl?: string;
  totalPayment: number;
  fee: number;
  status: "pending" | "completed" | "expired" | "failed" | string;
  expiresAt?: string | null;
  method?: string;
}

export interface PakasirStatusResult {
  txn_id: string;
  order_id?: string;
  amount: number;
  status: "pending" | "completed" | "expired" | "canceled" | string;
  completed_at?: string | null;
  is_sandbox?: boolean;
}

export interface PakasirConfig {
  slug: string;
  isConfigured: boolean;
  webhookUrl: string;
}

/**
 * Fetch Pakasir public configuration & webhook URL from backend
 */
export async function getPakasirConfig(): Promise<PakasirConfig> {
  const res = await fetch("/api/pakasir/config");
  if (!res.ok) {
    throw new Error("Gagal mengambil konfigurasi Pakasir.");
  }
  return res.json();
}

/**
 * Create a new Pakasir transaction (QRIS or Payment Link)
 */
export async function createPakasirTransaction(params: {
  planId: string;
  planName: string;
  amount: number;
  method?: "qris" | "payment_link";
  customerDetails?: {
    firstName: string;
    phone: string;
    email?: string;
  };
}): Promise<PakasirTransactionResult> {
  const response = await fetch("/api/pakasir/create-transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Gagal membuat transaksi Pakasir.");
  }

  return data;
}

/**
 * Check real-time transaction status from Pakasir API
 */
export async function checkPakasirStatus(txnId: string): Promise<PakasirStatusResult> {
  const response = await fetch(`/api/pakasir/status/${encodeURIComponent(txnId)}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Gagal memeriksa status pembayaran Pakasir.");
  }
  return data;
}

/**
 * Fetch recent webhook logs for Admin debugging
 */
export async function getPakasirWebhookLogs(): Promise<any[]> {
  try {
    const res = await fetch("/api/pakasir/logs");
    if (!res.ok) return [];
    const data = await res.json();
    return data.logs || [];
  } catch {
    return [];
  }
}
