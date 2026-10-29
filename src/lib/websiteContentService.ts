import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";
import featImg1 from "../assets/images/collab_creators_search_1788611140629.jpg";
import featImg2 from "../assets/images/collab_direct_connect_1788611155564.jpg";
import featImg3 from "../assets/images/collab_cta_visual_1788470852891.jpg";
import featImg4 from "../assets/images/collab_revenue_growth_1788611167540.jpg";

export interface WebsiteContentConfig {
  // ── 1. Embed Video ──
  videoEnabled: boolean;
  youtubeVideoId: string;
  videoTitle: string;

  // ── 2. Gambar Website ──
  feature1Image: string;
  feature2Image: string;
  feature3Image: string;
  ctaBannerImage?: string;

  // ── 3. Teks Website ──
  // Hero
  heroHeadline: string; // Mendukung placeholder {count} dan {groups}
  heroSubheadline: string;
  searchPlaceholder: string;
  // Countdown
  countdownTitle: string;
  // Fitur / Langkah Kerja
  featuresLabel: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  // CTA
  ctaSubheadline: string;
  ctaButtonText: string;
  // Footer
  footerCopyright: string;

  // Multilingual custom texts per locale: texts['en-US'] = { heroHeadline: '...', ... }
  texts?: Record<string, Record<string, string>>;

  // Custom Tally Embed URL per locale
  tallyEmbedUrls?: Record<string, string>;

  // Metadata
  updatedAt?: number;
  updatedBy?: string;
}

/**
 * Get localized text for current active locale with fallback to legacy field or default built-in translation
 */
export function getLocalizedText(
  config: WebsiteContentConfig,
  locale: string,
  field: string,
  defaultTranslationValue: string
): string {
  if (config.texts && config.texts[locale] && config.texts[locale][field]) {
    const val = config.texts[locale][field];
    if (typeof val === "string" && val.trim() !== "") {
      return val;
    }
  }
  if ((locale === "id-ID" || !locale) && (config as any)[field]) {
    const legacyVal = (config as any)[field];
    if (typeof legacyVal === "string" && legacyVal.trim() !== "") {
      return legacyVal;
    }
  }
  return defaultTranslationValue;
}

/**
 * Teks tombol CTA aksi utama default sesuai bahasa
 */
export function getDefaultCtaButtonText(locale: string): string {
  const map: Record<string, string> = {
    "id-ID": "Daftar Pra-Registrasi Sekarang",
    "en-US": "Join Pre-Registration Now",
    "es-ES": "Unirse al Pre-Registro Ahora",
    "fr-FR": "Rejoindre la Pré-Inscription",
    "de-DE": "Jetzt zur Voranmeldung",
    "ja-JP": "今すぐ事前登録に参加する",
    "ru-RU": "Принять участие в предрегистрации",
    "ar-SA": "انضم إلى التسجيل المسبق الآن",
    "tr-TR": "Şimdi Ön Kayda Katılın",
    "ko-KR": "지금 사전 등록 참여하기",
    "pt-PT": "Entrar no Pré-Registro Agora",
  };
  return map[locale] || map["id-ID"] || "Daftar Pra-Registrasi Sekarang";
}

/**
 * Micro-copy penegas & pendorong klik di bawah tombol CTA
 */
export function getDefaultCtaMicroCopy(locale: string): string {
  const map: Record<string, string> = {
    "id-ID": "100% Bebas Biaya • Kuota Terbatas • Akses Global",
    "en-US": "100% Free • Limited Spots • Global Access",
    "es-ES": "100% Gratis • Plazas Limitadas • Acceso Global",
    "fr-FR": "100% Gratuit • Places Limitées • Accès Global",
    "de-DE": "100% Kostenlos • Begrenzte Plätze • Globaler Zugang",
    "ja-JP": "完全無料 • 枠数限定 • グローバルアクセス",
    "ru-RU": "100% Бесплатно • Ограниченные места • Глобальный доступ",
    "ar-SA": "مجاني 100% • مقاعد محدودة • وصول عالمي",
    "tr-TR": "%100 Ücretsiz • Sınırlı Kontenjan • Küresel Erişim",
    "ko-KR": "100% 무료 • 한정 수량 • 글로벌 액세스",
    "pt-PT": "100% Grátis • Vagas Limitadas • Acesso Global",
  };
  return map[locale] || map["id-ID"] || "100% Bebas Biaya • Kuota Terbatas • Akses Global";
}

export const PRESET_IMAGES = [
  { label: "Pencarian Kreator (Default Langkah 1)", url: featImg1 },
  { label: "Koneksi Langsung (Default Langkah 2)", url: featImg2 },
  { label: "Visual Kolaborasi (Default Langkah 3)", url: featImg3 },
  { label: "Pertumbuhan Revenue / Profit", url: featImg4 },
];

export const DEFAULT_WEBSITE_CONTENT: WebsiteContentConfig = {
  // Video
  videoEnabled: true,
  youtubeVideoId: "8mAITcNt710",
  videoTitle: "PartnerFind Platform Overview",

  // Gambar Section 2 (3 Langkah Fitur)
  feature1Image: featImg1,
  feature2Image: featImg2,
  feature3Image: featImg3,
  ctaBannerImage: "",

  // Teks Hero
  heroHeadline: "", // Kosong berarti menggunakan translasi otomatis sesuai bahasa pengguna ({count} & {groups})
  heroSubheadline: "",
  searchPlaceholder: "Temukan kolaborasi...",
  countdownTitle: "", // Kosong berarti menggunakan translasi otomatis "Pra Registrasi ditutup dalam"

  // Teks Fitur
  featuresLabel: "",
  feature1Title: "",
  feature1Desc: "",
  feature2Title: "",
  feature2Desc: "",
  feature3Title: "",
  feature3Desc: "",

  // Teks CTA
  ctaSubheadline: "",
  ctaButtonText: "",

  // Footer
  footerCopyright: "",
};

const SETTINGS_DOC_ID = "website_content";
const LOCAL_STORAGE_KEY = "partnerfind_website_content_v1";

/**
 * Ekstrak ID YouTube dari URL lengkap atau ID bersih
 */
export function extractYoutubeId(input: string): string {
  if (!input) return "8mAITcNt710";
  const trimmed = input.trim();

  // Format youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{6,15})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // Format youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{6,15})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Format youtube.com/embed/ID
  const embedMatch = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{6,15})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Alphanumeric standard YouTube ID (11 chars)
  if (/^[a-zA-Z0-9_-]{6,15}$/.test(trimmed)) {
    return trimmed;
  }

  return trimmed;
}

/**
 * Sanitasi konfigurasi konten website agar tidak pernah ada gambar rusak atau link 404
 */
export function sanitizeContentConfig(raw: Partial<WebsiteContentConfig>): WebsiteContentConfig {
  const merged: WebsiteContentConfig = {
    ...DEFAULT_WEBSITE_CONTENT,
    ...raw,
  };

  const isInvalidOrBroken = (url?: string) => {
    if (!url || typeof url !== "string") return true;
    const trimmed = url.trim();
    if (trimmed === "") return true;
    // Deteksi foto stock template lama Unsplash yang tidak sesuai
    if (trimmed.includes("photo-1517248135467-4c7edcad34c4")) return true;
    if (trimmed.includes("photo-1513104890138-7c749659a591")) return true;
    // Deteksi link upload lokal sementara yang tidak ada lagi di filesystem
    if (trimmed.startsWith("/uploads/1000822289_1793193739965")) return true;
    return false;
  };

  if (isInvalidOrBroken(merged.feature1Image)) {
    merged.feature1Image = DEFAULT_WEBSITE_CONTENT.feature1Image;
  }
  if (isInvalidOrBroken(merged.feature2Image)) {
    merged.feature2Image = DEFAULT_WEBSITE_CONTENT.feature2Image;
  }
  if (isInvalidOrBroken(merged.feature3Image)) {
    merged.feature3Image = DEFAULT_WEBSITE_CONTENT.feature3Image;
  }
  if (merged.ctaBannerImage && (merged.ctaBannerImage.startsWith("/uploads/1000816816_1792130055019") || merged.ctaBannerImage.trim() === "")) {
    merged.ctaBannerImage = "";
  }

  return merged;
}

/**
 * Ambil konten website yang tersimpan di localStorage untuk zero-flicker rendering
 */
export function getCachedWebsiteContent(): WebsiteContentConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return sanitizeContentConfig(parsed);
    }
  } catch {
    // Abaikan error parse
  }
  return DEFAULT_WEBSITE_CONTENT;
}

/**
 * Simpan konten website ke Firestore dan sync ke localStorage
 */
export async function saveWebsiteContent(
  updates: Partial<WebsiteContentConfig>,
  userEmail = "admin"
): Promise<boolean> {
  const current = getCachedWebsiteContent();
  const payload: WebsiteContentConfig = sanitizeContentConfig({
    ...current,
    ...updates,
    updatedAt: Date.now(),
    updatedBy: userEmail,
  });

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {}

  const docRef = doc(db, "settings", SETTINGS_DOC_ID);
  try {
    // Strip undefined properties so Firestore never throws unsupported field value error
    const cleanPayload: Record<string, any> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined) {
        cleanPayload[key] = value;
      }
    }
    await setDoc(docRef, cleanPayload, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving website content to Firestore:", error);
    try {
      handleFirestoreError(error, OperationType.WRITE, `settings/${SETTINGS_DOC_ID}`);
    } catch {}
    return false;
  }
}

/**
 * Subscribe real-time updates untuk konten website
 */
export function subscribeWebsiteContent(
  callback: (config: WebsiteContentConfig) => void
): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as WebsiteContentConfig;
        const sanitized = sanitizeContentConfig(data);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
        } catch {}
        callback(sanitized);
      } else {
        callback(DEFAULT_WEBSITE_CONTENT);
      }
    },
    (error) => {
      console.warn("Real-time website content listener warning:", error);
      callback(getCachedWebsiteContent());
    }
  );

  return unsubscribe;
}
