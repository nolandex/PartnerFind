import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";

export interface CtaConfig {
  enabled: boolean; // default: false (sembunyikan cta)
  updatedAt?: number;
  updatedBy?: string;
}

const SETTINGS_DOC_ID = "cta_config";
const LOCAL_STORAGE_KEY = "collab_cta_settings_v1";

export const DEFAULT_CTA_CONFIG: CtaConfig = {
  enabled: false, // Default: Sembunyikan CTA sesuai permintaan user
};

/**
 * Mendapatkan status CTA dari localStorage untuk render instan tanpa kedip (zero-flicker)
 */
export function getCachedCtaEnabled(): boolean {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return typeof parsed.enabled === "boolean" ? parsed.enabled : false;
    }
  } catch {
    // abaikan error parse
  }
  return DEFAULT_CTA_CONFIG.enabled;
}

/**
 * Mengambil konfigurasi CTA dari Firestore satu kali
 */
export async function getCtaConfig(): Promise<CtaConfig> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as CtaConfig;
      const merged: CtaConfig = {
        ...DEFAULT_CTA_CONFIG,
        ...data,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      } catch {}
      return merged;
    }
  } catch (err) {
    console.warn("Could not fetch cta config from Firestore:", err);
  }
  return { enabled: getCachedCtaEnabled() };
}

/**
 * Menyimpan konfigurasi status visibilitas CTA ke Firestore & LocalStorage
 */
export async function saveCtaConfig(
  enabled: boolean,
  userEmail = "admin"
): Promise<boolean> {
  const payload: CtaConfig = {
    enabled,
    updatedAt: Date.now(),
    updatedBy: userEmail,
  };

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {}

  const docRef = doc(db, "settings", SETTINGS_DOC_ID);
  try {
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `settings/${SETTINGS_DOC_ID}`);
    return false;
  }
}

/**
 * Berlangganan (listen) perubahan status visibilitas CTA secara real-time
 */
export function subscribeCtaConfig(callback: (config: CtaConfig) => void): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as CtaConfig;
        const merged: CtaConfig = {
          ...DEFAULT_CTA_CONFIG,
          ...data,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        } catch {}
        callback(merged);
      } else {
        callback(DEFAULT_CTA_CONFIG);
      }
    },
    (error) => {
      console.warn("Real-time cta config listener error:", error);
      callback({ enabled: getCachedCtaEnabled() });
    }
  );

  return unsubscribe;
}
