import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";

export interface ProfileAccessConfig {
  enabled: boolean; // true = Aktif (Icon Search & halaman profil terbuka), false = Nonaktif (Icon Lock/Gembok & halaman profil terkunci)
  updatedAt?: number;
}

const SETTINGS_DOC_ID = "profile_access";
const LOCAL_STORAGE_KEY = "collab_profile_access_v1";

export const DEFAULT_PROFILE_ACCESS: ProfileAccessConfig = {
  enabled: false, // Default: Nonaktif (Gembok / Terkunci)
};

/**
 * Get cached profile access state for instant zero-flicker UI render
 */
export function getCachedProfileAccess(): boolean {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return typeof parsed.enabled === "boolean" ? parsed.enabled : false;
    }
  } catch {
    // ignore
  }
  return DEFAULT_PROFILE_ACCESS.enabled;
}

/**
 * Fetch profile access configuration from Firestore once
 */
export async function getProfileAccess(): Promise<boolean> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as ProfileAccessConfig;
      const enabled = typeof data.enabled === "boolean" ? data.enabled : false;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ enabled }));
      } catch {}
      return enabled;
    }
    return DEFAULT_PROFILE_ACCESS.enabled;
  } catch (err) {
    console.warn("Could not fetch profile access from Firestore, using cached value:", err);
    return getCachedProfileAccess();
  }
}

/**
 * Update profile access configuration (Firestore + LocalStorage)
 */
export async function updateProfileAccess(enabled: boolean): Promise<void> {
  const payload: ProfileAccessConfig = {
    enabled,
    updatedAt: Date.now(),
  };

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {}

  const docRef = doc(db, "settings", SETTINGS_DOC_ID);
  try {
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `settings/${SETTINGS_DOC_ID}`);
  }
}

/**
 * Real-time subscription to profile access status
 */
export function subscribeProfileAccess(callback: (enabled: boolean) => void): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as ProfileAccessConfig;
        const enabled = typeof data.enabled === "boolean" ? data.enabled : false;
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ enabled }));
        } catch {}
        callback(enabled);
      } else {
        callback(DEFAULT_PROFILE_ACCESS.enabled);
      }
    },
    (error) => {
      console.warn("Real-time profile access listener error:", error);
      callback(getCachedProfileAccess());
    }
  );

  return unsubscribe;
}
