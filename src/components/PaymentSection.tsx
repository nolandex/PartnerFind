import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Check,
  ArrowRight,
  User,
  Phone,
  Loader2,
  Globe,
  CreditCard,
  Info,
  QrCode,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Regional pricing configuration tailored to each locale
export interface LocalePricing {
  currency: string;
  symbol: string;
  amount: number;
  formatted: string;
}

export const PRICING_BY_LOCALE: Record<string, LocalePricing> = {
  "id-ID": {
    currency: "IDR",
    symbol: "Rp",
    amount: 4999,
    formatted: "Rp 4.999",
  },
  "en-US": {
    currency: "USD",
    symbol: "$",
    amount: 4.99,
    formatted: "$4.99",
  },
  "es-ES": {
    currency: "EUR",
    symbol: "€",
    amount: 4.99,
    formatted: "4,99 €",
  },
  "fr-FR": {
    currency: "EUR",
    symbol: "€",
    amount: 4.99,
    formatted: "4,99 €",
  },
  "de-DE": {
    currency: "EUR",
    symbol: "€",
    amount: 4.99,
    formatted: "4,99 €",
  },
  "ja-JP": {
    currency: "JPY",
    symbol: "¥",
    amount: 750,
    formatted: "¥750",
  },
  "zh-CN": {
    currency: "CNY",
    symbol: "¥",
    amount: 35,
    formatted: "¥35",
  },
  "ru-RU": {
    currency: "RUB",
    symbol: "₽",
    amount: 490,
    formatted: "490 ₽",
  },
  "ar-SA": {
    currency: "SAR",
    symbol: "ر.س",
    amount: 19,
    formatted: "19 ر.س",
  },
  "ko-KR": {
    currency: "KRW",
    symbol: "₩",
    amount: 6900,
    formatted: "₩6,900",
  },
  "pt-PT": {
    currency: "EUR",
    symbol: "€",
    amount: 4.99,
    formatted: "4,99 €",
  },
  "tr-TR": {
    currency: "TRY",
    symbol: "₺",
    amount: 175,
    formatted: "175 ₺",
  },
};

interface PaymentStrings {
  sectionTitle: string;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  payBtn: string;
  connecting: string;
  officialGateway: string;
  paymentMethods: string;
  errName: string;
  errPhone: string;
  errService: string;
  errGeneral: string;
  successTitle: string;
  successDesc: string;
  pendingTitle: string;
  pendingDesc: string;
  failTitle: string;
  failDesc: string;
  orderIdLabel: string;
  totalLabel: string;
  backBtn: string;
  paymentGatewayNote?: string;
  paymentUnavailableTitle?: string;
  paymentUnavailableDesc?: string;
}

const PAYMENT_TRANSLATIONS: Record<string, PaymentStrings> = {
  "id-ID": {
    sectionTitle: "Dapatkan Akses",
    title: "Akses PartnerFind",
    nameLabel: "Nama Lengkap",
    namePlaceholder: "Nama Lengkap Anda",
    phoneLabel: "Nomor WhatsApp / HP",
    phonePlaceholder: "Nomor WhatsApp / HP Aktif",
    payBtn: "Gabung Sekarang",
    connecting: "Menghubungkan ke Midtrans...",
    officialGateway: "Pembayaran Aman & Terenkripsi",
    paymentMethods: "QRIS • E-Wallet • Virtual Account • Kartu Kredit",
    errName: "Masukkan nama lengkap Anda.",
    errPhone: "Nomor WhatsApp/HP minimal 8 digit angka.",
    errService: "Layanan pembayaran tidak dapat dimuat.",
    errGeneral: "Terjadi kendala teknis.",
    successTitle: "Pembayaran Berhasil",
    successDesc: "Akses Anda telah aktif. Selamat bergabung!",
    pendingTitle: "Menunggu Konfirmasi",
    pendingDesc: "Selesaikan pembayaran Anda di e-wallet atau bank.",
    failTitle: "Pembayaran Belum Berhasil",
    failDesc: "Transaksi dibatalkan atau gagal diproses.",
    orderIdLabel: "Order ID:",
    totalLabel: "Total Bayar:",
    backBtn: "Kembali ke formulir pembayaran",
    paymentUnavailableTitle: "Belum Tersedia",
    paymentUnavailableDesc: "Bayar di pengundang anda",
  },
  "en-US": {
    sectionTitle: "Get Access",
    title: "PartnerFind Access",
    nameLabel: "Full Name",
    namePlaceholder: "Your Full Name",
    phoneLabel: "WhatsApp / Phone Number",
    phonePlaceholder: "Active WhatsApp / Phone",
    payBtn: "Join Now",
    connecting: "Processing...",
    officialGateway: "Payment Verification Notice",
    paymentMethods: "QRIS • E-Wallet • Virtual Account • Credit Card",
    errName: "Please enter your full name.",
    errPhone: "Please enter a valid phone number (min 8 digits).",
    errService: "Payment service unavailable.",
    errGeneral: "A technical error occurred.",
    successTitle: "Payment Successful",
    successDesc: "Your access is now active. Welcome aboard!",
    pendingTitle: "Awaiting Confirmation",
    pendingDesc: "Please complete your payment in your bank or e-wallet.",
    failTitle: "Payment Incomplete",
    failDesc: "Transaction was cancelled or failed to process.",
    orderIdLabel: "Order ID:",
    totalLabel: "Total Amount:",
    backBtn: "Back to payment form",
    paymentUnavailableTitle: "Not Available",
    paymentUnavailableDesc: "Please pay through your inviter",
  },
  "es-ES": {
    sectionTitle: "Obtener Acceso",
    title: "Acceso PartnerFind",
    nameLabel: "Nombre Completo",
    namePlaceholder: "Tu nombre completo",
    phoneLabel: "Número de WhatsApp / Teléfono",
    phonePlaceholder: "WhatsApp o teléfono activo",
    payBtn: "Unirse Ahora",
    connecting: "Procesando...",
    officialGateway: "Aviso de Pago Seguro",
    paymentMethods: "QRIS • Billeteras Digitales • Tarjeta",
    errName: "Por favor, ingresa tu nombre completo.",
    errPhone: "Por favor, ingresa un número de teléfono válido.",
    errService: "Servicio de pago no disponible.",
    errGeneral: "Ocurrió un error técnico.",
    successTitle: "Pago Exitoso",
    successDesc: "Tu acceso ya está activo. ¡Bienvenido!",
    pendingTitle: "Esperando Confirmación",
    pendingDesc: "Completa el pago en tu banco o billetera digital.",
    failTitle: "Pago No Completado",
    failDesc: "La transacción fue cancelada o falló al procesarse.",
    orderIdLabel: "ID de Orden:",
    totalLabel: "Monto Total:",
    backBtn: "Volver al formulario de pago",
    paymentUnavailableTitle: "No disponible",
    paymentUnavailableDesc: "Paga a través de tu invitador",
  },
  "fr-FR": {
    sectionTitle: "Obtenir l'Accès",
    title: "Accès PartnerFind",
    nameLabel: "Nom Complet",
    namePlaceholder: "Votre nom complet",
    phoneLabel: "Numéro WhatsApp / Téléphone",
    phonePlaceholder: "WhatsApp ou téléphone actif",
    payBtn: "Rejoindre Maintenant",
    connecting: "Traitement en cours...",
    officialGateway: "Notice de Paiement",
    paymentMethods: "QRIS • Portefeuilles Électroniques • Carte",
    errName: "Veuillez entrer votre nom complet.",
    errPhone: "Veuillez entrer un numéro de téléphone valide.",
    errService: "Service de paiement indisponible.",
    errGeneral: "Une erreur technique est survenue.",
    successTitle: "Paiement Réussi",
    successDesc: "Votre accès est désormais actif. Bienvenue !",
    pendingTitle: "En attente de confirmation",
    pendingDesc: "Veuillez finaliser le paiement sur votre application bancaire.",
    failTitle: "Paiement Non Finalisé",
    failDesc: "La transaction a été annulée ou a échoué.",
    orderIdLabel: "ID de Commande :",
    totalLabel: "Montant Total :",
    backBtn: "Retour au formulaire de paiement",
    paymentUnavailableTitle: "Non disponible",
    paymentUnavailableDesc: "Payez auprès de votre invitant",
  },
  "ja-JP": {
    sectionTitle: "アクセス権の取得",
    title: "PartnerFind アクセス",
    nameLabel: "氏名",
    namePlaceholder: "お名前を入力",
    phoneLabel: "WhatsApp / 電話番号",
    phonePlaceholder: "連絡可能な電話番号",
    payBtn: "今すぐ参加する",
    connecting: "処理中...",
    officialGateway: "安全なお支払いのご案内",
    paymentMethods: "QRIS • 電子マネー • クレジットカード",
    errName: "氏名を入力してください。",
    errPhone: "有効な電話番号（8桁以上）を入力してください。",
    errService: "決済サービスを利用できません。",
    errGeneral: "技術的なエラーが発生しました。",
    successTitle: "決済が完了しました",
    successDesc: "アクセス権が有効化されました。ようこそ！",
    pendingTitle: "確認待ち",
    pendingDesc: "銀行または電子決済アプリで支払いを完了してください。",
    failTitle: "支払いが完了していません",
    failDesc: "取引がキャンセルされたか、処理に失敗しました。",
    orderIdLabel: "注文ID:",
    totalLabel: "合計金額:",
    backBtn: "支払いフォームに戻る",
    paymentUnavailableTitle: "未対応",
    paymentUnavailableDesc: "紹介者にお支払いください",
  },
  "de-DE": {
    sectionTitle: "Zugang freischalten",
    title: "PartnerFind-Zugang",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "Ihr vollständiger Name",
    phoneLabel: "WhatsApp- / Telefonnummer",
    phonePlaceholder: "Aktive Telefonnummer",
    payBtn: "Jetzt beitreten",
    connecting: "Wird verarbeitet...",
    officialGateway: "Zahlungsinformation",
    paymentMethods: "QRIS • E-Wallets • Kreditkarte",
    errName: "Bitte geben Sie Ihren vollständigen Namen ein.",
    errPhone: "Bitte geben Sie eine gültige Telefonnummer ein.",
    errService: "Zahlungsdienst nicht verfügbar.",
    errGeneral: "Ein technischer Fehler ist aufgetreten.",
    successTitle: "Zahlung erfolgreich",
    successDesc: "Ihr Zugang ist jetzt aktiv. Willkommen an Bord!",
    pendingTitle: "Warten auf Bestätigung",
    pendingDesc: "Bitte schließen Sie die Zahlung in Ihrer Bank- oder Wallet-App ab.",
    failTitle: "Zahlung nicht abgeschlossen",
    failDesc: "Transaktion abgebrochen oder fehlgeschlagen.",
    orderIdLabel: "Bestell-ID:",
    totalLabel: "Gesamtbetrag:",
    backBtn: "Zurück zum Zahlungsformular",
    paymentUnavailableTitle: "Nicht verfügbar",
    paymentUnavailableDesc: "Über Ihren Einlader bezahlen",
  },
  "zh-CN": {
    sectionTitle: "获取权限",
    title: "PartnerFind 会员访问",
    nameLabel: "姓名",
    namePlaceholder: "请输入您的姓名",
    phoneLabel: "WhatsApp / 手机号码",
    phonePlaceholder: "有效手机号码",
    payBtn: "立即加入",
    connecting: "处理中...",
    officialGateway: "支付须知与安全指引",
    paymentMethods: "QRIS • 电子钱包 • 信用卡支付",
    errName: "请输入您的完整姓名。",
    errPhone: "请输入有效的电话号码（至少8位数字）。",
    errService: "支付服务不可用。",
    errGeneral: "发生技术错误。",
    successTitle: "支付成功",
    successDesc: "您的权限已激活。欢迎加入！",
    pendingTitle: "等待支付确认",
    pendingDesc: "请在您的银行或电子钱包应用中完成支付。",
    failTitle: "支付未完成",
    failDesc: "交易已取消或处理失败。",
    orderIdLabel: "订单号:",
    totalLabel: "支付总额:",
    backBtn: "返回支付表单",
    paymentUnavailableTitle: "暂未开通",
    paymentUnavailableDesc: "请向您的邀请人付款",
  },
  "ru-RU": {
    sectionTitle: "Получить доступ",
    title: "Доступ PartnerFind",
    nameLabel: "Полное имя",
    namePlaceholder: "Ваше полное имя",
    phoneLabel: "Номер WhatsApp / Телефона",
    phonePlaceholder: "Действующий номер телефона",
    payBtn: "Присоединиться сейчас",
    connecting: "Обработка...",
    officialGateway: "Информация об оплате",
    paymentMethods: "QRIS • Электронные кошельки • Карты",
    errName: "Пожалуйста, введите ваше полное имя.",
    errPhone: "Пожалуйста, введите корректный номер телефона.",
    errService: "Платежный сервис недоступен.",
    errGeneral: "Произошла техническая ошибка.",
    successTitle: "Оплата прошла успешно",
    successDesc: "Ваш доступ активирован. Добро пожаловать!",
    pendingTitle: "Ожидание подтверждения",
    pendingDesc: "Завершите оплату в банковском приложении или кошельке.",
    failTitle: "Оплата не завершена",
    failDesc: "Транзакция была отменена или не удалась.",
    orderIdLabel: "ID заказа:",
    totalLabel: "Итоговая сумма:",
    backBtn: "Вернуться к форме оплаты",
    paymentUnavailableTitle: "Недоступно",
    paymentUnavailableDesc: "Оплатите через вашего пригласителя",
  },
  "ar-SA": {
    sectionTitle: "الحصول على الوصول",
    title: "الوصول إلى PartnerFind",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "أدخل اسمك الكامل",
    phoneLabel: "رقم الواتساب / الهاتف",
    phonePlaceholder: "رقم هاتف نشط",
    payBtn: "انضم الآن",
    connecting: "جارٍ المعالجة...",
    officialGateway: "إشعار الدفع الآمن",
    paymentMethods: "QRIS • المحافظ الرقمية • البطاقات المصرفية",
    errName: "يرجى إدخال اسمك الكامل.",
    errPhone: "يرجى إدخال رقم هاتف صالح (8 أرقام على الأقل).",
    errService: "خدمة الدفع غير متوفرة حالياً.",
    errGeneral: "حدث خطأ فني.",
    successTitle: "تم الدفع بنجاح",
    successDesc: "تم تفعيل وصولك بنجاح. أهلاً بك!",
    pendingTitle: "في انتظار التأكيد",
    pendingDesc: "يرجى إكمال الدفع عبر تطبيق البنك أو المحفظة الإلكترونية.",
    failTitle: "لم يكتمل الدفع",
    failDesc: "تم إلغاء المعاملة أو فشلت المعالجة.",
    orderIdLabel: "رقم الطلب:",
    totalLabel: "المبلغ الإجمالي:",
    backBtn: "العودة إلى نموذج الدفع",
    paymentUnavailableTitle: "غير متوفر",
    paymentUnavailableDesc: "ادفع من خلال الشخص الذي دعاك",
  },
  "ko-KR": {
    sectionTitle: "이용권 신청",
    title: "PartnerFind 이용권",
    nameLabel: "성명",
    namePlaceholder: "성명을 입력하세요",
    phoneLabel: "WhatsApp / 휴대폰 번호",
    phonePlaceholder: "연락 가능한 휴대폰 번호",
    payBtn: "지금 참여하기",
    connecting: "처리 중...",
    officialGateway: "결제 안내",
    paymentMethods: "QRIS • 간편결제 • 신용카드",
    errName: "성명을 입력해 주세요.",
    errPhone: "올바른 전화번호(8자리 이상)를 입력해 주세요.",
    errService: "결제 서비스를 불러올 수 없습니다.",
    errGeneral: "기술적 오류가 발생했습니다.",
    successTitle: "결제가 완료되었습니다",
    successDesc: "이용권이 활성화되었습니다. 환영합니다!",
    pendingTitle: "결제 확인 대기 중",
    pendingDesc: "은행 앱 또는 전자지갑에서 결제를 완료해 주세요.",
    failTitle: "결제가 완료되지 않았습니다",
    failDesc: "거래가 취소되었거나 처리에 실패했습니다.",
    orderIdLabel: "주문 번호:",
    totalLabel: "총 결제금액:",
    backBtn: "결제 양식으로 돌아가기",
    paymentUnavailableTitle: "서비스 준비 중",
    paymentUnavailableDesc: "초대한 분을 통해 결제하세요",
  },
  "pt-PT": {
    sectionTitle: "Obter Acesso",
    title: "Acesso PartnerFind",
    nameLabel: "Nome Completo",
    namePlaceholder: "O seu nome completo",
    phoneLabel: "Número de WhatsApp / Telemóvel",
    phonePlaceholder: "WhatsApp ou telemóvel ativo",
    payBtn: "Aderir Agora",
    connecting: "A processar...",
    officialGateway: "Aviso de Pagamento",
    paymentMethods: "QRIS • Carteiras Digitais • Cartão",
    errName: "Por favor, introduza o seu nome completo.",
    errPhone: "Por favor, introduza um número de telemóvel válido.",
    errService: "Serviço de pagamento indisponível.",
    errGeneral: "Ocorreu um error técnico.",
    successTitle: "Pagamento Concluído",
    successDesc: "O seu acesso já está ativo. Bem-vindo!",
    pendingTitle: "A aguardar confirmação",
    pendingDesc: "Conclua o pagamento na aplicação do seu banco ou carteira digital.",
    failTitle: "Pagamento Incompleto",
    failDesc: "A transação foi cancelada ou falhou.",
    orderIdLabel: "ID de Encomenda:",
    totalLabel: "Montante Total:",
    backBtn: "Volver ao formulário de pagamento",
    paymentUnavailableTitle: "Indisponível",
    paymentUnavailableDesc: "Pague através do seu convidador",
  },
  "tr-TR": {
    sectionTitle: "Erişim Satın Al",
    title: "PartnerFind Erişimi",
    nameLabel: "Ad Soyad",
    namePlaceholder: "Adınız ve soyadınız",
    phoneLabel: "WhatsApp / Telefon Numarası",
    phonePlaceholder: "Aktif WhatsApp veya telefon",
    payBtn: "Şimdi Katıl",
    connecting: "İşleniyor...",
    officialGateway: "Ödeme Bilgilendirmesi",
    paymentMethods: "Kredi Kartı • Dijital Cüzdan • Havale",
    errName: "Lütfen adınızı ve soyadınızı girin.",
    errPhone: "Lütfen geçerli bir telefon numarası girin.",
    errService: "Ödeme hizmeti şu anda kullanılamıyor.",
    errGeneral: "Teknik bir hata oluştu.",
    successTitle: "Ödeme Başarılı",
    successDesc: "Erişiminiz aktif edildi. Hoş geldiniz!",
    pendingTitle: "Onay Bekleniyor",
    pendingDesc: "Lütfen bankanızdan veya uygulamanızdan ödemeyi tamamlayın.",
    failTitle: "Ödeme Tamamlanamadı",
    failDesc: "İşlem iptal edildi veya başarısız oldu.",
    orderIdLabel: "Sipariş No:",
    totalLabel: "Toplam Tutar:",
    backBtn: "Ödeme formuna geri dön",
    paymentUnavailableTitle: "Henüz Kullanılamıyor",
    paymentUnavailableDesc: "Sizi davet eden kişiye ödeme yapınız",
  },
};

export function PaymentSection() {
  const { locale } = useLanguage();
  const langKey = (locale && PAYMENT_TRANSLATIONS[locale]) ? locale : "id-ID";
  const tr = PAYMENT_TRANSLATIONS[langKey] || PAYMENT_TRANSLATIONS["id-ID"];
  const isRtl = langKey.startsWith("ar");

  // Determine pricing and payment gateway dynamically based on active locale
  const pricing = PRICING_BY_LOCALE[locale || "id-ID"] || PRICING_BY_LOCALE["id-ID"];
  const isIndonesian = (locale === "id-ID");

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettingsConfig>(getCachedPaymentSettings());
  const activeGatewayMode = paymentSettings.gatewayMode || "both";
  
  const [selectedGateway, setSelectedGateway] = useState<"pakasir" | "midtrans">(
    activeGatewayMode === "midtrans" ? "midtrans" : "pakasir"
  );

  // Subscribe to real-time payment settings (gateway mode updates from /admin)
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

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentResult, setPaymentResult] = useState<MidtransPaymentResult | null>(null);
  const [pakasirResult, setPakasirResult] = useState<PakasirTransactionResult | null>(null);
  const [paymentStatusType, setPaymentStatusType] = useState<"success" | "pending" | "error" | "unavailable" | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Poll Pakasir transaction status while waiting
  useEffect(() => {
    if (paymentStatusType === "pending" && pakasirResult?.txnId) {
      const poll = async () => {
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

      pollIntervalRef.current = setInterval(poll, 3500);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      };
    }
  }, [paymentStatusType, pakasirResult?.txnId]);

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
      setErrorMessage(tr.errName);
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      setErrorMessage(tr.errPhone);
      return;
    }

    setLoading(true);

    // Indonesian payment routing: Pakasir vs Midtrans
    if (isIndonesian) {
      const safePhone = phone.replace(/\D/g, "");
      const safeEmail = `${safePhone || "user"}@partnerfind.com`;

      // 1. PAKASIR (Payment Link & QRIS)
      if (selectedGateway === "pakasir") {
        try {
          const res = await createPakasirTransaction({
            planId: `lifetime-${pricing.amount}`,
            planName: `PartnerFind Access (${pricing.formatted})`,
            amount: pricing.amount,
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

          // Open Pakasir payment link in new window/tab if available
          if (res.paymentLink) {
            try {
              window.open(res.paymentLink, "_blank", "noopener,noreferrer");
            } catch {
              // Popup blocked, user can click the button
            }
          }
        } catch (err: any) {
          setLoading(false);
          setErrorMessage(err.message || "Gagal memproses pembayaran Pakasir.");
        }
        return;
      }

      // 2. MIDTRANS SNAP
      try {
        await loadMidtransSnap();

        const transaction = await createMidtransTransaction({
          planId: `lifetime-${pricing.amount}`,
          planName: `PartnerFind Access (${pricing.formatted})`,
          amount: pricing.amount,
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
              setErrorMessage(tr.failDesc);
            },
            onClose: () => {
              // User closed snap without completing
            },
          });
        } else if (transaction.redirectUrl) {
          window.location.href = transaction.redirectUrl;
        } else {
          throw new Error(tr.errService);
        }
      } catch (err: any) {
        setLoading(false);
        setErrorMessage(err.message || tr.errGeneral);
      }
    } else {
      // For all languages other than Indonesian: Midtrans is not available
      // Notify user that the gateway is not yet available and instruct them to pay via their inviter
      try {
        await new Promise((res) => setTimeout(res, 500));
        setLoading(false);
        setPaymentStatusType("unavailable");
      } catch (err: any) {
        setLoading(false);
        setErrorMessage(err.message || tr.errGeneral);
      }
    }
  };

  return (
    <section id="payment" className="py-12 sm:py-16 bg-background relative z-10" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={containerRef} className="max-w-xl mx-auto">
          {/* Section Title - Short & Clean */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center mb-5 sm:mb-6"
          >
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-foreground">
              {tr.sectionTitle}
            </h2>
          </motion.div>

          {/* Payment Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative rounded-2xl px-5 pt-5 pb-2 sm:px-6 sm:pt-5 sm:pb-2.5 bg-card backdrop-blur-xl border border-border shadow-xl overflow-hidden text-card-foreground"
          >
            {/* Ambient Background Accent Glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-15 blur-3xl"
              style={{ background: "hsl(var(--brand-accent))" }}
            />

            {/* Header: Clean, Ultra-Compact & Minimalist */}
            <div className="flex items-center justify-between pb-3.5 border-b border-border">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {tr.title}
                </h3>
              </div>

              {/* Price Tag - Dynamic per Locale */}
              <div className={`${isRtl ? "text-left" : "text-right"} shrink-0`}>
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                  {pricing.formatted}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="pt-4">
              <AnimatePresence mode="wait">
                {paymentStatusType ? (
                  /* Status Screen */
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-4 text-center space-y-5"
                  >
                    {paymentStatusType === "success" && (
                      <div className="space-y-1.5">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {tr.successTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {tr.successDesc}
                        </p>
                      </div>
                    )}

                    {paymentStatusType === "pending" && (
                      <div className="space-y-3.5 max-w-sm mx-auto">
                        <div className="p-4 rounded-2xl bg-card border border-amber-500/35 space-y-3 text-left shadow-lg text-card-foreground">
                          {/* Top Status & Price Row */}
                          <div className="flex items-center justify-between pb-2.5 border-b border-border">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                              </span>
                              <span className="text-xs font-bold text-amber-400">
                                {selectedGateway === "pakasir" ? "Menunggu Pembayaran" : tr.pendingTitle}
                              </span>
                            </div>
                            <span className="text-sm font-bold font-mono text-emerald-400">
                              {selectedGateway === "pakasir" && pakasirResult?.totalPayment
                                ? `Rp ${pakasirResult.totalPayment.toLocaleString("id-ID")}`
                                : pricing.formatted}
                            </span>
                          </div>

                          {/* Action Button for Payment Link */}
                          {selectedGateway === "pakasir" && pakasirResult?.paymentLink && (
                            <a
                              href={pakasirResult.paymentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                            >
                              <span>Buka Halaman Pembayaran Pakasir</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Order ID & Check Status */}
                          <div className="p-2.5 rounded-xl bg-muted/60 border border-border flex items-center justify-between text-[11px] font-mono">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <span>Order:</span>
                              <span className="text-foreground font-medium">
                                {selectedGateway === "pakasir" ? pakasirResult?.orderId : paymentResult?.order_id}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyOrderId(
                                    selectedGateway === "pakasir"
                                      ? pakasirResult?.orderId
                                      : paymentResult?.order_id
                                  )
                                }
                                className="p-0.5 hover:text-foreground transition-colors cursor-pointer text-muted-foreground"
                                title="Copy Order ID"
                              >
                                {copiedOrderId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>

                            {selectedGateway === "pakasir" && (
                              <button
                                type="button"
                                disabled={checkingStatus}
                                onClick={handleManualCheckPakasir}
                                className="flex items-center gap-1 font-sans text-sky-500 hover:text-sky-400 cursor-pointer disabled:opacity-50 text-[11px]"
                              >
                                <RefreshCw className={`w-3 h-3 ${checkingStatus ? "animate-spin" : ""}`} />
                                <span>{checkingStatus ? "Cek..." : "Cek Status"}</span>
                              </button>
                            )}
                          </div>

                          <p className="text-[10.5px] text-muted-foreground text-center leading-relaxed">
                            {selectedGateway === "pakasir"
                              ? "Scan QRIS di halaman Pakasir. Status akan otomatis lunas saat selesai."
                              : "Selesaikan pembayaran di aplikasi atau instruksi yang muncul."}
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentStatusType === "error" && (
                      <div className="space-y-1.5">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-2 border border-rose-500/20">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {tr.failTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {errorMessage || tr.failDesc}
                        </p>
                      </div>
                    )}

                    {paymentStatusType === "unavailable" && (
                      <div className="py-2 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
                          <Info className="w-6 h-6" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                          {tr.paymentUnavailableTitle || "Belum Tersedia"}
                        </h4>
                        <p className="text-sm font-medium text-amber-300">
                          {tr.paymentUnavailableDesc || "Bayar di pengundang anda"}
                        </p>
                      </div>
                    )}

                    {paymentStatusType !== "pending" && paymentStatusType !== "unavailable" && (
                      <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs font-mono space-y-2 max-w-sm mx-auto text-left" dir="ltr">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>{tr.orderIdLabel}</span>
                          <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <span>
                              {selectedGateway === "pakasir"
                                ? pakasirResult?.orderId || "N/A"
                                : paymentResult?.order_id || "N/A"}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyOrderId(
                                  selectedGateway === "pakasir"
                                    ? pakasirResult?.orderId
                                    : paymentResult?.order_id
                                )
                              }
                              className="p-1 hover:text-foreground transition-colors cursor-pointer text-muted-foreground"
                              title="Copy Order ID"
                            >
                              {copiedOrderId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>{tr.totalLabel}</span>
                          <span className="text-foreground font-semibold">
                            {selectedGateway === "pakasir" && pakasirResult?.totalPayment
                              ? `Rp ${pakasirResult.totalPayment.toLocaleString("id-ID")}`
                              : pricing.formatted}
                          </span>
                        </div>
                      </div>
                    )}

                    {paymentStatusType === "unavailable" && (
                      <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs space-y-1.5 max-w-sm mx-auto text-left" dir="ltr">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="font-mono">{tr.totalLabel}</span>
                          <span className="text-foreground font-bold text-sm font-mono">{pricing.formatted}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {fullName ? `${fullName} • ${phone}` : phone}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentStatusType(null);
                          setPaymentResult(null);
                          setPakasirResult(null);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer"
                      >
                        {tr.backBtn}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Form: Compact, Modern Grid, Integrated Action */
                  <form onSubmit={handleStartPayment} className="space-y-4">
                    {/* Gateway Switcher for Indonesian locale (Only shown if admin selected both) */}
                    {isIndonesian && activeGatewayMode === "both" && (
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          Pilihan Metode Pembayaran
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted/70 rounded-xl border border-border">
                          <button
                            type="button"
                            onClick={() => setSelectedGateway("pakasir")}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              selectedGateway === "pakasir"
                                ? "bg-card text-foreground shadow-sm border border-border"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <QrCode className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Pakasir (QRIS)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedGateway("midtrans")}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              selectedGateway === "midtrans"
                                ? "bg-card text-foreground shadow-sm border border-border"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5 text-sky-500" />
                            <span>Midtrans</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="compact-checkout-name"
                          className="block text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                        >
                          {tr.nameLabel}
                        </label>
                        <div className="relative">
                          <div className={`absolute inset-y-0 ${isRtl ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-muted-foreground`}>
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            id="compact-checkout-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={tr.namePlaceholder}
                            required
                            className={`w-full h-11 ${isRtl ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} bg-muted/40 border border-border hover:border-foreground/20 focus:border-foreground/40 rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all`}
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label
                          htmlFor="compact-checkout-phone"
                          className="block text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                        >
                          {tr.phoneLabel}
                        </label>
                        <div className="relative">
                          <div className={`absolute inset-y-0 ${isRtl ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-muted-foreground`}>
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            id="compact-checkout-phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={tr.phonePlaceholder}
                            required
                            className={`w-full h-11 ${isRtl ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} bg-muted/40 border border-border hover:border-foreground/20 focus:border-foreground/40 rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all font-mono`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Error Notice */}
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Submit Bar & Universal Security Proof */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 sm:h-12 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md hover:brightness-110"
                        style={{ backgroundColor: "hsl(var(--brand-accent))" }}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>{tr.connecting}</span>
                          </div>
                        ) : (
                          <>
                            <span>{tr.payBtn}</span>
                            <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 mt-2 mb-0 text-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{tr.officialGateway}</span>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
