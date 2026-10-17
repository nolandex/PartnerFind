import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { handleFirestoreError, OperationType } from "./firestoreError";

export interface VideoEmbedConfig {
  enabled: boolean; // true = Tampilkan video embed, false = Sembunyikan video embed
  youtubeVideoId?: string; // YouTube video ID (default: "8mAITcNt710")
  updatedAt?: number;
  updatedBy?: string;
}

const SETTINGS_DOC_ID = "video_config";
const LOCAL_STORAGE_KEY = "collab_video_settings_v1";

export const DEFAULT_VIDEO_CONFIG: VideoEmbedConfig = {
  enabled: true, // Saat ini aktif, dan admin dapat menyembunyikan sewaktu-waktu
  youtubeVideoId: "8mAITcNt710",
};

/**
 * Ekstrak ID YouTube dari berbagai format URL (watch?v=, youtu.be, embed, atau langsung ID)
 */
export function extractYoutubeId(input: string): string {
  if (!input) return DEFAULT_VIDEO_CONFIG.youtubeVideoId || "8mAITcNt710";
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

  // Jika input hanya karakter ID YouTube standar (11 karakter alphanumeric)
  if (/^[a-zA-Z0-9_-]{6,15}$/.test(trimmed)) {
    return trimmed;
  }

  return DEFAULT_VIDEO_CONFIG.youtubeVideoId || "8mAITcNt710";
}

/**
 * Ambil konfigurasi Video dari localStorage untuk render instan tanpa kedip (zero-flicker)
 */
export function getCachedVideoConfig(): VideoEmbedConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_VIDEO_CONFIG,
        ...parsed,
      };
    }
  } catch {
    // abaikan error parse
  }
  return DEFAULT_VIDEO_CONFIG;
}

/**
 * Mengambil konfigurasi Video dari Firestore satu kali
 */
export async function getVideoConfig(): Promise<VideoEmbedConfig> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as VideoEmbedConfig;
      const merged: VideoEmbedConfig = {
        ...DEFAULT_VIDEO_CONFIG,
        ...data,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      } catch {}
      return merged;
    }
  } catch (err) {
    console.warn("Could not fetch video config from Firestore:", err);
  }
  return getCachedVideoConfig();
}

/**
 * Menyimpan konfigurasi video ke Firestore & LocalStorage
 */
export async function saveVideoConfig(
  config: Partial<VideoEmbedConfig>,
  userEmail = "admin"
): Promise<boolean> {
  const current = getCachedVideoConfig();
  const payload: VideoEmbedConfig = {
    ...current,
    ...config,
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
 * Berlangganan (listen) perubahan status & ID video secara real-time
 */
export function subscribeVideoConfig(callback: (config: VideoEmbedConfig) => void): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as VideoEmbedConfig;
        const merged: VideoEmbedConfig = {
          ...DEFAULT_VIDEO_CONFIG,
          ...data,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        } catch {}
        callback(merged);
      } else {
        callback(DEFAULT_VIDEO_CONFIG);
      }
    },
    (error) => {
      console.warn("Real-time video config listener error:", error);
      callback(getCachedVideoConfig());
    }
  );

  return unsubscribe;
}
