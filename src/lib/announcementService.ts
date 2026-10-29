import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";

export interface AnnouncementBarConfig {
  enabled: boolean;
  badgeText: string;
  message: string;
  messageEn?: string;
  targetDate: string; // ISO string format e.g. "2026-09-30T23:59:59.000Z"
  buttonText: string;
  buttonTextEn?: string;
  buttonLink: string;
  theme?: "accent" | "amber" | "emerald" | "crimson" | "indigo";
  allowDismiss?: boolean;
  autoRollDays?: number; // If expired, how many days to roll forward automatically (0 = never roll, fixed)
  updatedAt?: number;
}

const SETTINGS_DOC_ID = "announcement_bar";
const LOCAL_STORAGE_ANNOUNCEMENT_KEY = "collab_announcement_bar_config_v2";
const LOCAL_STORAGE_DISMISSED_KEY = "collab_announcement_bar_dismissed_until";

// Fixed reference target date shared across all users by default
export const DEFAULT_TARGET_DATE = "2026-10-01T00:00:00.000Z";

export const DEFAULT_ANNOUNCEMENT: AnnouncementBarConfig = {
  enabled: true,
  badgeText: "",
  message: "Pra Registrasi ditutup dalam",
  messageEn: "Pre-registration Closes In",
  targetDate: DEFAULT_TARGET_DATE,
  buttonText: "",
  buttonTextEn: "",
  buttonLink: "",
  theme: "accent",
  allowDismiss: false,
  autoRollDays: 0,
};

/**
 * Helper to ensure target date is valid.
 * Uses deterministic synchronized cycles if autoRollDays > 0 so ALL users see the EXACT same time.
 */
export function normalizeTargetDate(targetDateStr?: string, autoRollDays = 0): string {
  if (!targetDateStr) {
    return DEFAULT_TARGET_DATE;
  }
  try {
    const targetMs = new Date(targetDateStr).getTime();
    if (isNaN(targetMs)) {
      return DEFAULT_TARGET_DATE;
    }
    const nowMs = Date.now();
    // Only roll forward if autoRollDays > 0 AND it is expired, using fixed deterministic intervals from anchor
    if (autoRollDays > 0 && targetMs < nowMs) {
      const cycleMs = autoRollDays * 24 * 60 * 60 * 1000;
      const elapsedCycles = Math.ceil((nowMs - targetMs) / cycleMs);
      const nextTargetMs = targetMs + elapsedCycles * cycleMs;
      return new Date(nextTargetMs).toISOString();
    }
    return targetDateStr;
  } catch {
    return DEFAULT_TARGET_DATE;
  }
}

/**
 * Get cached config for zero-flicker render on mount
 */
export function getCachedAnnouncement(): AnnouncementBarConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_ANNOUNCEMENT,
        ...parsed,
        targetDate: normalizeTargetDate(parsed.targetDate || DEFAULT_TARGET_DATE, parsed.autoRollDays || 0),
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_ANNOUNCEMENT;
}

/**
 * Fetch announcement config from Firestore once
 */
export async function getAnnouncementConfig(): Promise<AnnouncementBarConfig> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as AnnouncementBarConfig;
      const normalized: AnnouncementBarConfig = {
        ...DEFAULT_ANNOUNCEMENT,
        ...data,
        targetDate: normalizeTargetDate(data.targetDate || DEFAULT_TARGET_DATE, data.autoRollDays || 0),
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY, JSON.stringify(normalized));
      } catch {}
      return normalized;
    }
  } catch (err) {
    console.warn("Could not fetch announcement config from Firestore:", err);
  }
  return getCachedAnnouncement();
}

/**
 * Save announcement configuration to Firestore (admin only)
 */
export async function saveAnnouncementConfig(
  config: Partial<AnnouncementBarConfig>
): Promise<boolean> {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);
  try {
    const current = getCachedAnnouncement();
    const updated: AnnouncementBarConfig = {
      ...current,
      ...config,
      updatedAt: Date.now(),
    };

    await setDoc(docRef, updated, { merge: true });
    try {
      localStorage.setItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY, JSON.stringify(updated));
    } catch {}
    return true;
  } catch (error) {
    console.error("Error saving announcement config:", error);
    try {
      handleFirestoreError(error, OperationType.UPDATE, `settings/${SETTINGS_DOC_ID}`);
    } catch {}
    return false;
  }
}

/**
 * Real-time subscription to announcement config changes from Firestore
 */
export function subscribeAnnouncement(
  callback: (config: AnnouncementBarConfig) => void
): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as AnnouncementBarConfig;
        const normalized: AnnouncementBarConfig = {
          ...DEFAULT_ANNOUNCEMENT,
          ...data,
          targetDate: normalizeTargetDate(data.targetDate || DEFAULT_TARGET_DATE, data.autoRollDays || 0),
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY, JSON.stringify(normalized));
        } catch {}
        callback(normalized);
      } else {
        callback(DEFAULT_ANNOUNCEMENT);
      }
    },
    (err) => {
      console.warn("Announcement snapshot listener error:", err);
      callback(getCachedAnnouncement());
    }
  );

  return unsubscribe;
}

/**
 * Check if the user has dismissed the announcement bar
 */
export function isAnnouncementDismissed(targetDate: string): boolean {
  try {
    const dismissedUntil = localStorage.getItem(LOCAL_STORAGE_DISMISSED_KEY);
    if (!dismissedUntil) return false;
    const dismissedTime = parseInt(dismissedUntil, 10);
    if (!isNaN(dismissedTime) && dismissedTime > Date.now()) {
      return true;
    }
  } catch {}
  return false;
}

/**
 * Mark the announcement bar as dismissed for 12 hours
 */
export function dismissAnnouncement(): void {
  try {
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    localStorage.setItem(LOCAL_STORAGE_DISMISSED_KEY, expiresAt.toString());
  } catch {}
}

/**
 * Reset dismissal state
 */
export function resetDismissAnnouncement(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_DISMISSED_KEY);
  } catch {}
}
