import { Locale } from "./translations";

export interface CtaPayTarget {
  label: string;
  url: string;
}

/**
 * Konfigurasi tombol bayar pada CTA landing page.
 * Setiap bahasa disesuaikan teks label dan tujuan URL (pesan/tujuan WhatsApp khusus).
 */
export const CTA_PAY_CONFIG: Record<Locale, CtaPayTarget> = {
  "id-ID": {
    label: "Bayar",
    url: "https://wa.me/6289691685228?text=Bayar",
  },
  "en-US": {
    label: "Pay Now",
    url: "https://wa.me/6289691685228?text=Pay%20PartnerFind%20Access",
  },
  "es-ES": {
    label: "Pagar Ahora",
    url: "https://wa.me/6289691685228?text=Pago%20PartnerFind%20Acceso",
  },
  "fr-FR": {
    label: "Payer Maintenant",
    url: "https://wa.me/6289691685228?text=Paiement%20PartnerFind%20Acces",
  },
  "de-DE": {
    label: "Jetzt Bezahlen",
    url: "https://wa.me/6289691685228?text=Zahlung%20PartnerFind%20Zugang",
  },
  "ja-JP": {
    label: "今すぐ支払う",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("PartnerFindアクセス支払い")}`,
  },
  "zh-CN": {
    label: "立即支付",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("PartnerFind访问权限支付")}`,
  },
  "ru-RU": {
    label: "Оплатить сейчас",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("Оплата доступа PartnerFind")}`,
  },
  "ar-SA": {
    label: "ادفع الآن",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("دفع اشتراك PartnerFind")}`,
  },
  "ko-KR": {
    label: "지금 결제하기",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("PartnerFind 이용 결제")}`,
  },
  "pt-PT": {
    label: "Pagar Agora",
    url: "https://wa.me/6289691685228?text=Pagamento%20PartnerFind%20Acesso",
  },
  "tr-TR": {
    label: "Şimdi Öde",
    url: `https://wa.me/6289691685228?text=${encodeURIComponent("PartnerFind Erişim Ödemesi")}`,
  },
};

export function getCtaPayConfig(locale: string): CtaPayTarget {
  if (locale in CTA_PAY_CONFIG) {
    return CTA_PAY_CONFIG[locale as Locale];
  }
  return CTA_PAY_CONFIG["id-ID"];
}
