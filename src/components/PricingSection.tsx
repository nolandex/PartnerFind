import React, { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PricingPlan } from "../lib/midtrans";
import { CheckoutModal } from "./CheckoutModal";
import { useLanguage } from "../context/LanguageContext";

interface MinimalPricingText {
  planTitle: string;
  priceFormatted: string;
  priceNote: string;
  cta: string;
  gatewayNote: string;
}

const MINIMAL_PRICING_I18N: Record<string, MinimalPricingText> = {
  "id-ID": {
    planTitle: "Akses Seumur Hidup",
    priceFormatted: "Rp 4.999",
    priceNote: "Sekali bayar • Akses selamanya",
    cta: "Beli Akses",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "en-US": {
    planTitle: "Lifetime Access",
    priceFormatted: "Rp 4.999",
    priceNote: "One-time payment • Permanent access",
    cta: "Get Access",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "es-ES": {
    planTitle: "Acceso de por Vida",
    priceFormatted: "Rp 4.999",
    priceNote: "Pago único • Acceso permanente",
    cta: "Comprar Acceso",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "fr-FR": {
    planTitle: "Accès à Vie",
    priceFormatted: "Rp 4.999",
    priceNote: "Paiement unique • Accès permanent",
    cta: "Obtenir l'Accès",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "ja-JP": {
    planTitle: "生涯アクセス",
    priceFormatted: "Rp 4.999",
    priceNote: "一括払い • 永久アクセス",
    cta: "アクセス権を購入",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "de-DE": {
    planTitle: "Lebenslanger Zugang",
    priceFormatted: "Rp 4.999",
    priceNote: "Einmalzahlung • Dauerhafter Zugriff",
    cta: "Zugang Kaufen",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "zh-CN": {
    planTitle: "终身访问权限",
    priceFormatted: "Rp 4.999",
    priceNote: "一次性付费 • 永久有效",
    cta: "立即购买",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "ru-RU": {
    planTitle: "Пожизненный Доступ",
    priceFormatted: "Rp 4.999",
    priceNote: "Разовая оплата • Доступ навсегда",
    cta: "Купить Доступ",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "ar-SA": {
    planTitle: "وصول مدى الحياة",
    priceFormatted: "Rp 4.999",
    priceNote: "دفعة واحدة • وصول دائم",
    cta: "شراء الوصول",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "tr-TR": {
    planTitle: "Ömür Boyu Erişim",
    priceFormatted: "Rp 4.999",
    priceNote: "Tek ödeme • Kalıcı erişim",
    cta: "Erişimi Satın Al",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "ko-KR": {
    planTitle: "평생 이용권",
    priceFormatted: "Rp 4.999",
    priceNote: "1회 결제 • 영구 이용",
    cta: "액세스 구매",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
  "pt-BR": {
    planTitle: "Acesso Vitalício",
    priceFormatted: "Rp 4.999",
    priceNote: "Pagamento único • Acesso permanente",
    cta: "Comprar Acesso",
    gatewayNote: "Midtrans (QRIS, VA, E-Wallet)",
  },
};

export function PricingSection() {
  const { locale } = useLanguage();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const t =
    MINIMAL_PRICING_I18N[locale] ||
    MINIMAL_PRICING_I18N["id-ID"] ||
    MINIMAL_PRICING_I18N["en-US"];

  const planData: PricingPlan = {
    id: "partnerfind-access",
    name: t.planTitle,
    badge: "",
    priceMonthly: 4999,
    priceLifetime: 4999,
    description: t.priceNote,
    features: [],
    ctaLabel: t.cta,
  };

  return (
    <section id="pricing" className="py-12 sm:py-16 bg-background border-t border-foreground/[0.06]">
      <div className="container mx-auto px-4 max-w-xs sm:max-w-sm">
        {/* Minimalist Card */}
        <div
          className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-6 text-center shadow-lg transition-all"
          style={{
            borderColor: "hsl(var(--brand-accent) / 0.25)",
          }}
        >
          {/* Plan Title */}
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
            {t.planTitle}
          </span>

          {/* Price */}
          <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight my-2">
            {t.priceFormatted}
          </div>

          {/* Subtitle */}
          <p className="text-xs text-neutral-400 mb-5">
            {t.priceNote}
          </p>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full h-10 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer shadow hover:brightness-110"
            style={{
              backgroundColor: "hsl(var(--brand-accent))",
            }}
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Gateway Note */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
            <ShieldCheck
              className="w-3 h-3"
              style={{ color: "hsl(var(--brand-accent))" }}
            />
            <span>{t.gatewayNote}</span>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        plan={planData}
        billingCycle="lifetime"
      />
    </section>
  );
}


