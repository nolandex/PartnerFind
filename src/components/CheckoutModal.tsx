import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Check,
  ArrowRight,
  QrCode,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import {
  PricingPlan,
  createMidtransTransaction,
  loadMidtransSnap,
  MidtransPaymentResult,
} from "../lib/midtrans";
import {
  createPakasirTransaction,
  checkPakasirStatus,
  PakasirTransactionResult,
} from "../lib/pakasir";
import {
  getCachedPaymentSettings,
  subscribePaymentSettings,
  PaymentSettingsConfig,
} from "../lib/paymentSettingsService";

interface CheckoutModalProps {
  plan: PricingPlan | null;
  billingCycle?: "monthly" | "lifetime";
  isOpen: boolean;
  onClose: () => void;
}

const FIXED_AMOUNT = 4999;

export function CheckoutModal({
  plan,
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettingsConfig>(getCachedPaymentSettings());
  const activeGatewayMode = paymentSettings.gatewayMode || "both";

  const [selectedGateway, setSelectedGateway] = useState<"pakasir" | "midtrans">(
    activeGatewayMode === "midtrans" ? "midtrans" : "pakasir"
  );

  // Subscribe to payment settings changes from admin
  useEffect(() => {
    const unsubscribe = subscribePaymentSettings((cfg) => {
      setPaymentSettings(cfg);
      if (cfg.gatewayMode === "pakasir") {
        setSelectedGateway("pakasir");
      } else if (cfg.gatewayMode === "midtrans") {
        setSelectedGateway("midtrans");
      }
    });
    return () => unsubscribe();
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentResult, setPaymentResult] = useState<MidtransPaymentResult | null>(null);
  const [pakasirResult, setPakasirResult] = useState<PakasirTransactionResult | null>(null);
  const [paymentStatusType, setPaymentStatusType] = useState<"success" | "pending" | "error" | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadMidtransSnap();
      setErrorMessage("");
      setPaymentResult(null);
      setPakasirResult(null);
      setPaymentStatusType(null);
    } else {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    }
  }, [isOpen]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Poll Pakasir status when waiting for payment
  useEffect(() => {
    if (paymentStatusType === "pending" && pakasirResult?.txnId) {
      const pollStatus = async () => {
        try {
          const res = await checkPakasirStatus(pakasirResult.txnId);
          if (res.status === "completed") {
            setPaymentStatusType("success");
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          }
        } catch {
          // ignore transient poll error
        }
      };

      // Poll every 3.5 seconds
      pollIntervalRef.current = setInterval(pollStatus, 3500);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      };
    }
  }, [paymentStatusType, pakasirResult?.txnId]);

  if (!isOpen || !plan) return null;

  const handleCopyOrderId = (orderId?: string) => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const handleManualCheckPakasir = async () => {
    if (!pakasirResult?.txnId) return;
    setCheckingStatus(true);
    try {
      const res = await checkPakasirStatus(pakasirResult.txnId);
      if (res.status === "completed") {
        setPaymentStatusType("success");
      }
    } catch {
      // ignore
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Silakan masukkan nama lengkap.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage("Silakan masukkan nomor WhatsApp / HP aktif.");
      return;
    }

    setLoading(true);

    // FLOW 1: PAKASIR PAYMENT (QRIS / Instant Payment Link)
    if (selectedGateway === "pakasir") {
      try {
        const safePhone = phone.replace(/\D/g, "");
        const safeEmail = `${safePhone || "user"}@partnerfind.com`;

        const res = await createPakasirTransaction({
          planId: `${plan.id}-${FIXED_AMOUNT}`,
          planName: `${plan.name} (Rp ${FIXED_AMOUNT.toLocaleString("id-ID")})`,
          amount: FIXED_AMOUNT,
          method: "payment_link",
          customerDetails: {
            firstName: fullName.trim(),
            phone: phone.trim(),
            email: safeEmail,
          },
        });

        setPakasirResult(res);
        setLoading(false);
        setPaymentStatusType("pending");

        // Open Pakasir payment page in new window
        if (res.paymentLink) {
          try {
            window.open(res.paymentLink, "_blank", "noopener,noreferrer");
          } catch {
            // popup blocked, fallback to user click
          }
        }
      } catch (err: any) {
        setLoading(false);
        setErrorMessage(err.message || "Gagal memproses pembayaran Pakasir.");
      }
      return;
    }

    // FLOW 2: MIDTRANS SNAP PAYMENT
    try {
      await loadMidtransSnap();

      const safePhone = phone.replace(/\D/g, "");
      const safeEmail = `${safePhone || "user"}@partnerfind.com`;

      const transaction = await createMidtransTransaction({
        planId: `${plan.id}-${FIXED_AMOUNT}`,
        planName: `${plan.name} (Rp ${FIXED_AMOUNT.toLocaleString("id-ID")})`,
        amount: FIXED_AMOUNT,
        customerDetails: {
          firstName: fullName.trim(),
          email: safeEmail,
          phone: phone.trim(),
        },
      });

      setLoading(false);

      if (window.snap && transaction.token) {
        window.snap.pay(transaction.token, {
          onSuccess: (result: MidtransPaymentResult) => {
            setPaymentResult({ ...result, order_id: result.order_id || transaction.orderId });
            setPaymentStatusType("success");
          },
          onPending: (result: MidtransPaymentResult) => {
            setPaymentResult({ ...result, order_id: result.order_id || transaction.orderId });
            setPaymentStatusType("pending");
          },
          onError: (result: MidtransPaymentResult) => {
            setPaymentResult({ ...result, order_id: result.order_id || transaction.orderId });
            setPaymentStatusType("error");
            setErrorMessage("Pembayaran gagal diproses.");
          },
          onClose: () => {
            // Closed by user
          },
        });
      } else if (transaction.redirectUrl) {
        window.location.href = transaction.redirectUrl;
      } else {
        throw new Error("Midtrans Snap tidak dapat diinisialisasi.");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || "Gagal memproses pembayaran.");
    }
  };

  const currentOrderId =
    selectedGateway === "pakasir"
      ? pakasirResult?.orderId
      : paymentResult?.order_id;

  const currentTotal =
    selectedGateway === "pakasir" && pakasirResult?.totalPayment
      ? pakasirResult.totalPayment
      : FIXED_AMOUNT;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[120] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-neutral-800/80">
            <div>
              <h3 className="font-bold text-sm text-white">
                Beli Akses PartnerFind
              </h3>
              <p className="text-[11px] text-neutral-400">
                Akses Seumur Hidup • <span className="text-white font-mono font-semibold">Rp {FIXED_AMOUNT.toLocaleString("id-ID")}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Payment Result View */}
          {paymentStatusType ? (
            <div className="p-5 space-y-4 text-center">
              {paymentStatusType === "success" && (
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Pembayaran Berhasil</h4>
                  <p className="text-[11px] text-neutral-400">Akses Anda telah aktif secara otomatis.</p>
                </div>
              )}

              {paymentStatusType === "pending" && (
                <div className="space-y-3 text-left">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/25 space-y-2.5">
                    {/* Status & Price Row */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span className="text-xs font-bold text-amber-300">Menunggu Pembayaran</span>
                      </div>
                      <span className="text-xs font-bold font-mono text-emerald-400">
                        Rp {currentTotal.toLocaleString("id-ID")}
                      </span>
                    </div>

                    {/* Action Link for Pakasir */}
                    {selectedGateway === "pakasir" && pakasirResult?.paymentLink && (
                      <a
                        href={pakasirResult.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <span>Buka Halaman Pembayaran Pakasir</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Order ID & Quick Check */}
                    <div className="p-2 rounded-lg bg-neutral-900 border border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <span>Order:</span>
                        <span className="text-white font-medium">{currentOrderId || "N/A"}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyOrderId(currentOrderId)}
                          className="p-0.5 text-neutral-400 hover:text-white cursor-pointer"
                          title="Salin Order ID"
                        >
                          {copiedOrderId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-400" />}
                        </button>
                      </div>

                      {selectedGateway === "pakasir" && (
                        <button
                          type="button"
                          disabled={checkingStatus}
                          onClick={handleManualCheckPakasir}
                          className="flex items-center gap-1 font-sans text-sky-400 hover:text-sky-300 text-[10.5px] cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${checkingStatus ? "animate-spin" : ""}`} />
                          <span>{checkingStatus ? "Cek..." : "Cek Status"}</span>
                        </button>
                      )}
                    </div>

                    <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
                      Selesaikan scan QRIS di Pakasir. Status terverifikasi otomatis.
                    </p>
                  </div>
                </div>
              )}

              {paymentStatusType === "error" && (
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-2">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Gagal</h4>
                  <p className="text-[11px] text-neutral-400">{errorMessage || "Pembayaran dibatalkan."}</p>
                </div>
              )}

              {paymentStatusType !== "pending" && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-left space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Order ID:</span>
                    <div className="flex items-center gap-1 font-semibold text-white">
                      <span>{currentOrderId || "N/A"}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyOrderId(currentOrderId)}
                        className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {copiedOrderId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Nominal:</span>
                    <span className="text-emerald-400 font-bold">
                      Rp {currentTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          ) : (
            /* Checkout Form with Gateway Switcher */
            <form
              id="checkout-form"
              name="checkout-form"
              onSubmit={handleStartPayment}
              className="p-5 space-y-3.5"
            >
              {/* Payment Gateway Switcher (Only shown if admin set to 'both') */}
              {activeGatewayMode === "both" && (
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                    Pilih Saluran Pembayaran
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setSelectedGateway("pakasir")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedGateway === "pakasir"
                          ? "bg-neutral-800 text-white shadow-sm border border-neutral-700"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pakasir (QRIS)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGateway("midtrans")}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedGateway === "midtrans"
                          ? "bg-neutral-800 text-white shadow-sm border border-neutral-700"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-sky-400" />
                      <span>Midtrans</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="checkout-name" className="block text-[11px] font-medium text-neutral-300 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    autoCorrect="off"
                    spellCheck="false"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama Lengkap Anda"
                    required
                    className="w-full h-10 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:border-neutral-600 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-tel" className="block text-[11px] font-medium text-neutral-300 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    id="checkout-tel"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nomor WhatsApp / HP Aktif"
                    required
                    className="w-full h-10 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:border-neutral-600 transition-all font-mono"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-xl font-bold text-xs text-neutral-950 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-md hover:brightness-110"
                  style={{
                    backgroundColor: "hsl(var(--brand-accent))",
                  }}
                >
                  {loading ? (
                    <span>Menghubungkan {selectedGateway === "pakasir" ? "Pakasir..." : "Midtrans..."}</span>
                  ) : (
                    <>
                      <span>
                        Bayar Rp {FIXED_AMOUNT.toLocaleString("id-ID")}{" "}
                        {selectedGateway === "pakasir" ? "via Pakasir" : "via Midtrans"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-neutral-500 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>
                    {selectedGateway === "pakasir"
                      ? "Pakasir QRIS (Semua E-Wallet & Bank)"
                      : "Midtrans (QRIS, VA Bank, E-Wallet)"}
                  </span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

