import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";

export type PaymentGatewayType = "both" | "pakasir" | "midtrans";

export interface PaymentSettingsConfig {
  enabled: boolean;
  gatewayMode?: PaymentGatewayType;
  midtransEnabled?: boolean;
  pakasirEnabled?: boolean;
  pakasirSlug?: string;
  pakasirApiKey?: string;
  pakasirWebhookSecret?: string;
  disabledNotice?: string;
  updatedAt?: number;
  updatedBy?: string;
}

const SETTINGS_DOC_ID = "payment_config";
const LOCAL_STORAGE_PAYMENT_KEY = "collab_payment_settings_v1";

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettingsConfig = {
  enabled: false, // Default nonaktif / hidden as requested by user
  gatewayMode: "both",
  midtransEnabled: true,
  pakasirEnabled: true,
  pakasirSlug: "kelas-uang",
  pakasirApiKey: "gjqy1pdnUiYDPDZQj9l7fDFOWYsyAYup",
  pakasirWebhookSecret: "92e23bf7593d6de73a59d337c06cc13e",
  disabledNotice: "Pembayaran saat ini dinonaktifkan oleh administrator.",
};

/**
 * Get cached config for instant zero-flicker rendering
 */
export function getCachedPaymentSettings(): PaymentSettingsConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PAYMENT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_PAYMENT_SETTINGS,
        ...parsed,
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_PAYMENT_SETTINGS;
}

/**
 * Fetch payment config from Firestore once
 */
export async function getPaymentSettings(): Promise<PaymentSettingsConfig> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as PaymentSettingsConfig;
      const merged: PaymentSettingsConfig = {
        ...DEFAULT_PAYMENT_SETTINGS,
        ...data,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_PAYMENT_KEY, JSON.stringify(merged));
      } catch {}
      return merged;
    }
  } catch (err) {
    console.warn("Could not fetch payment config from Firestore:", err);
  }
  return getCachedPaymentSettings();
}

/**
 * Save payment configuration to Firestore (admin only)
 */
export async function savePaymentSettings(
  config: Partial<PaymentSettingsConfig>,
  userEmail = "admin"
): Promise<boolean> {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);
  try {
    const current = getCachedPaymentSettings();
    const updated: PaymentSettingsConfig = {
      ...current,
      ...config,
      updatedAt: Date.now(),
      updatedBy: userEmail,
    };

    await setDoc(docRef, updated, { merge: true });
    try {
      localStorage.setItem(LOCAL_STORAGE_PAYMENT_KEY, JSON.stringify(updated));
    } catch {}
    return true;
  } catch (error) {
    console.error("Error saving payment config:", error);
    try {
      handleFirestoreError(error, OperationType.UPDATE, `settings/${SETTINGS_DOC_ID}`);
    } catch {}
    return false;
  }
}

/**
 * Real-time subscription to payment config changes from Firestore
 */
export function subscribePaymentSettings(
  callback: (config: PaymentSettingsConfig) => void
): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as PaymentSettingsConfig;
        const merged: PaymentSettingsConfig = {
          ...DEFAULT_PAYMENT_SETTINGS,
          ...data,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_PAYMENT_KEY, JSON.stringify(merged));
        } catch {}
        callback(merged);
      } else {
        callback(DEFAULT_PAYMENT_SETTINGS);
      }
    },
    (err) => {
      console.warn("Payment config snapshot listener error:", err);
      callback(getCachedPaymentSettings());
    }
  );

  return unsubscribe;
}
