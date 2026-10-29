import { doc, getDoc, setDoc, updateDoc, runTransaction, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface HeroCounterConfig {
  // Anggota (Members)
  currentCount: number;
  minIncrement: number; // Minimal penambahan angka
  maxIncrement: number; // Maksimal penambahan angka
  intervalValue?: number; // Nilai interval (misal 5, 10, 30 atau 1, 2)
  intervalUnit?: 'seconds' | 'minutes'; // Satuan: 'seconds' (detik) atau 'minutes' (menit)
  intervalMinutes: number; // Disinkronkan untuk kompatibilitas mundur
  lastUpdated: number; // Timestamp epoch ms

  // Grup (Groups)
  groupCount: number;
  groupMinIncrement: number;
  groupMaxIncrement: number;
  groupIntervalValue?: number;
  groupIntervalUnit?: 'seconds' | 'minutes';
  groupIntervalMinutes: number;
  groupLastUpdated: number;
}

export const DEFAULT_HERO_COUNTER: HeroCounterConfig = {
  currentCount: 1000000,
  minIncrement: 1,
  maxIncrement: 3,
  intervalValue: 1,
  intervalUnit: 'minutes',
  intervalMinutes: 1,
  lastUpdated: Date.now(),

  groupCount: 342180,
  groupMinIncrement: 1,
  groupMaxIncrement: 2,
  groupIntervalValue: 2,
  groupIntervalUnit: 'minutes',
  groupIntervalMinutes: 2,
  groupLastUpdated: Date.now(),
};

const SETTINGS_DOC_ID = "hero_counter";
const LOCAL_STORAGE_HERO_KEY = "last_hero_member_count";
const LOCAL_STORAGE_GROUP_KEY = "last_hero_group_count";

let latestConfigCache: HeroCounterConfig | null = null;

/**
 * Calculate millisecond interval from value and unit
 */
export function getIntervalMs(
  unit?: 'seconds' | 'minutes',
  value?: number,
  fallbackMinutes?: number
): number {
  if (unit === 'seconds') {
    const sec = Math.max(1, typeof value === 'number' ? value : 1);
    return sec * 1000;
  }
  const min = Math.max(0.01, typeof value === 'number' ? value : (fallbackMinutes || 1));
  return min * 60 * 1000;
}

/**
 * Get cached member count for instant zero-flicker display on mount
 */
export function getCachedHeroCount(): number {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_HERO_KEY);
    if (cached) {
      const val = parseInt(cached, 10);
      if (!isNaN(val) && val > 0) return val;
    }
  } catch (_e) {}
  return DEFAULT_HERO_COUNTER.currentCount;
}

/**
 * Get cached group count for instant zero-flicker display on mount
 */
export function getCachedGroupCount(): number {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_GROUP_KEY);
    if (cached) {
      const val = parseInt(cached, 10);
      if (!isNaN(val) && val > 0) return val;
    }
  } catch (_e) {}
  return DEFAULT_HERO_COUNTER.groupCount;
}

export async function getHeroCounterConfig(): Promise<HeroCounterConfig> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as Partial<HeroCounterConfig>;
      const config: HeroCounterConfig = {
        currentCount: typeof data.currentCount === "number" ? data.currentCount : DEFAULT_HERO_COUNTER.currentCount,
        minIncrement: typeof data.minIncrement === "number" ? data.minIncrement : DEFAULT_HERO_COUNTER.minIncrement,
        maxIncrement: typeof data.maxIncrement === "number" ? data.maxIncrement : DEFAULT_HERO_COUNTER.maxIncrement,
        intervalValue: typeof data.intervalValue === "number" ? data.intervalValue : (data.intervalMinutes || 1),
        intervalUnit: data.intervalUnit || (data.intervalMinutes && data.intervalMinutes < 1 ? 'seconds' : 'minutes'),
        intervalMinutes: typeof data.intervalMinutes === "number" ? data.intervalMinutes : 1,
        lastUpdated: typeof data.lastUpdated === "number" ? data.lastUpdated : Date.now(),

        groupCount: typeof data.groupCount === "number" ? data.groupCount : DEFAULT_HERO_COUNTER.groupCount,
        groupMinIncrement: typeof data.groupMinIncrement === "number" ? data.groupMinIncrement : DEFAULT_HERO_COUNTER.groupMinIncrement,
        groupMaxIncrement: typeof data.groupMaxIncrement === "number" ? data.groupMaxIncrement : DEFAULT_HERO_COUNTER.groupMaxIncrement,
        groupIntervalValue: typeof data.groupIntervalValue === "number" ? data.groupIntervalValue : (data.groupIntervalMinutes || 2),
        groupIntervalUnit: data.groupIntervalUnit || (data.groupIntervalMinutes && data.groupIntervalMinutes < 1 ? 'seconds' : 'minutes'),
        groupIntervalMinutes: typeof data.groupIntervalMinutes === "number" ? data.groupIntervalMinutes : 2,
        groupLastUpdated: typeof data.groupLastUpdated === "number" ? data.groupLastUpdated : Date.now(),
      };
      latestConfigCache = config;
      return config;
    }
  } catch (err) {
    console.warn("Error fetching hero counter config:", err);
  }
  return DEFAULT_HERO_COUNTER;
}

/**
 * Save rule configuration (min, max, intervalValue, intervalUnit) permanently to Firestore.
 * NOTE: This explicitly does NOT overwrite currentCount or groupCount unless overrideCount is explicitly true,
 * preventing live ticking counts from ever being reverted by saving progression rules.
 */
export async function saveHeroRulesConfig(
  rules: {
    minIncrement: number;
    maxIncrement: number;
    intervalValue: number;
    intervalUnit: 'seconds' | 'minutes';
    intervalMinutes?: number;
    currentCount?: number;
    overrideCount?: boolean;
  }
): Promise<boolean> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const minInc = Math.max(1, Math.round(rules.minIncrement));
    const maxInc = Math.max(minInc, Math.round(rules.maxIncrement));
    const unit: 'seconds' | 'minutes' = rules.intervalUnit === 'seconds' ? 'seconds' : 'minutes';
    const val = Math.max(1, Math.round(rules.intervalValue) || 1);
    const intervalMins = unit === 'seconds' ? val / 60 : val;

    const payload: Record<string, any> = {
      minIncrement: minInc,
      maxIncrement: maxInc,
      intervalValue: val,
      intervalUnit: unit,
      intervalMinutes: intervalMins,
    };

    // Only update currentCount if explicitly requested (e.g. manual override)
    if (rules.overrideCount === true && typeof rules.currentCount === "number" && !isNaN(rules.currentCount) && rules.currentCount >= 0) {
      const safeCount = Math.round(rules.currentCount);
      payload.currentCount = safeCount;
      payload.lastUpdated = Date.now();
      if (latestConfigCache) {
        latestConfigCache.currentCount = safeCount;
        latestConfigCache.lastUpdated = payload.lastUpdated;
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_HERO_KEY, String(safeCount));
      } catch (_e) {}
    }

    await setDoc(docRef, payload, { merge: true });
    checkAndAdvanceCounter();
    return true;
  } catch (err) {
    console.error("Error saving hero counter rules:", err);
    return false;
  }
}

/**
 * Explicitly set the base count (Manual override by admin only)
 */
export async function overrideHeroCount(newCount: number): Promise<boolean> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const safeCount = Math.max(0, Math.round(newCount));
    const now = Date.now();
    await setDoc(
      docRef,
      {
        currentCount: safeCount,
        lastUpdated: now,
      },
      { merge: true }
    );
    if (latestConfigCache) {
      latestConfigCache.currentCount = safeCount;
      latestConfigCache.lastUpdated = now;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_HERO_KEY, String(safeCount));
    } catch (_e) {}
    return true;
  } catch (err) {
    console.error("Error overriding hero count:", err);
    return false;
  }
}

/**
 * Save group rule configuration (min, max, intervalValue, intervalUnit) permanently to Firestore.
 * NOTE: This explicitly does NOT overwrite groupCount unless overrideCount is explicitly true,
 * preventing live ticking group counts from ever being reverted by saving progression rules.
 */
export async function saveGroupRulesConfig(
  rules: {
    groupMinIncrement: number;
    groupMaxIncrement: number;
    groupIntervalValue: number;
    groupIntervalUnit: 'seconds' | 'minutes';
    groupIntervalMinutes?: number;
    groupCount?: number;
    overrideCount?: boolean;
  }
): Promise<boolean> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const minInc = Math.max(1, Math.round(rules.groupMinIncrement));
    const maxInc = Math.max(minInc, Math.round(rules.groupMaxIncrement));
    const unit: 'seconds' | 'minutes' = rules.groupIntervalUnit === 'seconds' ? 'seconds' : 'minutes';
    const val = Math.max(1, Math.round(rules.groupIntervalValue) || 1);
    const intervalMins = unit === 'seconds' ? val / 60 : val;

    const payload: Record<string, any> = {
      groupMinIncrement: minInc,
      groupMaxIncrement: maxInc,
      groupIntervalValue: val,
      groupIntervalUnit: unit,
      groupIntervalMinutes: intervalMins,
    };

    // Only update groupCount if explicitly requested (e.g. manual override)
    if (rules.overrideCount === true && typeof rules.groupCount === "number" && !isNaN(rules.groupCount) && rules.groupCount >= 0) {
      const safeGroupCount = Math.round(rules.groupCount);
      payload.groupCount = safeGroupCount;
      payload.groupLastUpdated = Date.now();
      if (latestConfigCache) {
        latestConfigCache.groupCount = safeGroupCount;
        latestConfigCache.groupLastUpdated = payload.groupLastUpdated;
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_GROUP_KEY, String(safeGroupCount));
      } catch (_e) {}
    }

    await setDoc(docRef, payload, { merge: true });
    checkAndAdvanceCounter();
    return true;
  } catch (err) {
    console.error("Error saving group counter rules:", err);
    return false;
  }
}

/**
 * Explicitly set the base count for groups (Manual override by admin only)
 */
export async function overrideGroupCount(newCount: number): Promise<boolean> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const safeCount = Math.max(0, Math.round(newCount));
    const now = Date.now();
    await setDoc(
      docRef,
      {
        groupCount: safeCount,
        groupLastUpdated: now,
      },
      { merge: true }
    );
    if (latestConfigCache) {
      latestConfigCache.groupCount = safeCount;
      latestConfigCache.groupLastUpdated = now;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_GROUP_KEY, String(safeCount));
    } catch (_e) {}
    return true;
  } catch (err) {
    console.error("Error overriding group count:", err);
    return false;
  }
}

/**
 * Check and advance counter if interval has elapsed using ATOMIC Firestore transactions.
 * This ensures that even with multiple tabs or concurrent visitors, the counter NEVER resets,
 * NEVER overwrites with stale values, and increases monotonically.
 */
let isAdvancing = false;
export async function checkAndAdvanceCounter(): Promise<void> {
  if (isAdvancing) return;

  // In-memory pre-check to prevent unnecessary Firestore transaction calls
  if (latestConfigCache) {
    const now = Date.now();
    const mIntervalMs = getIntervalMs(latestConfigCache.intervalUnit, latestConfigCache.intervalValue, latestConfigCache.intervalMinutes);
    const mElapsed = now - (latestConfigCache.lastUpdated || now);
    const gIntervalMs = getIntervalMs(latestConfigCache.groupIntervalUnit, latestConfigCache.groupIntervalValue, latestConfigCache.groupIntervalMinutes);
    const gElapsed = now - (latestConfigCache.groupLastUpdated || now);

    const isMemberDue = mElapsed >= mIntervalMs;
    const isGroupDue = gElapsed >= gIntervalMs;
    const missingGroupFields = typeof latestConfigCache.groupCount !== 'number' || typeof latestConfigCache.groupLastUpdated !== 'number';

    if (!isMemberDue && !isGroupDue && !missingGroupFields) {
      return;
    }
  }

  isAdvancing = true;

  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(docRef);
      if (!snap.exists()) {
        const cachedMember = getCachedHeroCount();
        const cachedGroup = getCachedGroupCount();
        const initialConfig: HeroCounterConfig = {
          ...DEFAULT_HERO_COUNTER,
          currentCount: Math.max(DEFAULT_HERO_COUNTER.currentCount, cachedMember),
          groupCount: Math.max(DEFAULT_HERO_COUNTER.groupCount, cachedGroup),
          lastUpdated: Date.now(),
          groupLastUpdated: Date.now(),
        };
        transaction.set(docRef, initialConfig);
        return;
      }

      const data = snap.data() as Partial<HeroCounterConfig>;
      const now = Date.now();

      // ── 1. MEMBER COUNTER ADVANCEMENT ──
      const memberIntervalMs = getIntervalMs(data.intervalUnit, data.intervalValue, data.intervalMinutes || 1);
      const hasStoredMemberLastUpdated = typeof data.lastUpdated === "number";
      const hasStoredMemberCount = typeof data.currentCount === "number";
      const memberLastUpdated = hasStoredMemberLastUpdated ? data.lastUpdated! : now;
      const memberElapsedMs = Math.max(0, now - memberLastUpdated);

      // Monotonic guard: base count cannot be lower than existing or cached
      const baseMemberCount = Math.max(
        hasStoredMemberCount ? data.currentCount! : 0,
        getCachedHeroCount(),
        DEFAULT_HERO_COUNTER.currentCount
      );

      let newMemberCount = baseMemberCount;
      let newMemberLastUpdated = memberLastUpdated;
      let memberUpdated = !hasStoredMemberCount || !hasStoredMemberLastUpdated;

      if (memberElapsedMs >= memberIntervalMs) {
        const memberIntervalsPassed = Math.floor(memberElapsedMs / memberIntervalMs);
        if (memberIntervalsPassed >= 1) {
          const minInc = Math.max(1, data.minIncrement ?? 1);
          const maxInc = Math.max(minInc, data.maxIncrement ?? minInc);
          let totalAdded = 0;
          const iterations = Math.min(memberIntervalsPassed, 100);
          for (let i = 0; i < iterations; i++) {
            totalAdded += Math.floor(Math.random() * (maxInc - minInc + 1)) + minInc;
          }
          newMemberCount = baseMemberCount + totalAdded;
          newMemberLastUpdated = memberLastUpdated + (memberIntervalsPassed * memberIntervalMs);
          memberUpdated = true;
        }
      }

      // ── 2. GROUP COUNTER ADVANCEMENT ──
      const groupIntervalMs = getIntervalMs(data.groupIntervalUnit, data.groupIntervalValue, data.groupIntervalMinutes || 2);
      const hasStoredGroupLastUpdated = typeof data.groupLastUpdated === "number";
      const hasStoredGroupCount = typeof data.groupCount === "number";
      
      const groupLastUpdated = hasStoredGroupLastUpdated
        ? data.groupLastUpdated!
        : (data.lastUpdated ? data.lastUpdated : now - groupIntervalMs);
      const groupElapsedMs = Math.max(0, now - groupLastUpdated);

      // Monotonic guard: base group count cannot be lower than existing or cached
      const baseGroupCount = Math.max(
        hasStoredGroupCount ? data.groupCount! : 0,
        getCachedGroupCount(),
        DEFAULT_HERO_COUNTER.groupCount
      );

      let newGroupCount = baseGroupCount;
      let newGroupLastUpdated = groupLastUpdated;
      let groupUpdated = !hasStoredGroupCount || !hasStoredGroupLastUpdated;

      if (groupElapsedMs >= groupIntervalMs) {
        const groupIntervalsPassed = Math.floor(groupElapsedMs / groupIntervalMs);
        if (groupIntervalsPassed >= 1) {
          const gMinInc = Math.max(1, data.groupMinIncrement ?? 1);
          const gMaxInc = Math.max(gMinInc, data.groupMaxIncrement ?? gMinInc);
          let gTotalAdded = 0;
          const gIterations = Math.min(groupIntervalsPassed, 100);
          for (let i = 0; i < gIterations; i++) {
            gTotalAdded += Math.floor(Math.random() * (gMaxInc - gMinInc + 1)) + gMinInc;
          }
          newGroupCount = baseGroupCount + gTotalAdded;
          newGroupLastUpdated = groupLastUpdated + (groupIntervalsPassed * groupIntervalMs);
          groupUpdated = true;
        }
      } else if (!hasStoredGroupLastUpdated) {
        newGroupLastUpdated = now;
      }

      // Final monotonic assertion: counts must never decrease
      newMemberCount = Math.max(newMemberCount, baseMemberCount);
      newGroupCount = Math.max(newGroupCount, baseGroupCount);

      // Commit changes atomically if any counter progressed
      if (memberUpdated || groupUpdated) {
        const updates: Record<string, any> = {};
        if (memberUpdated) {
          updates.currentCount = newMemberCount;
          updates.lastUpdated = newMemberLastUpdated;
          try {
            localStorage.setItem(LOCAL_STORAGE_HERO_KEY, String(newMemberCount));
          } catch (_e) {}
        }
        if (groupUpdated) {
          updates.groupCount = newGroupCount;
          updates.groupLastUpdated = newGroupLastUpdated;
          try {
            localStorage.setItem(LOCAL_STORAGE_GROUP_KEY, String(newGroupCount));
          } catch (_e) {}
        }
        transaction.update(docRef, updates);
      }
    });
  } catch (err) {
    // Transaction conflict or network hiccup is harmless, next tick will retry
    console.debug("Counter check skipped or conflict resolved:", err);
  } finally {
    isAdvancing = false;
  }
}

/**
 * Increment members immediately by a random step (for test button in admin)
 */
export async function manualStepHeroCount(): Promise<number | null> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    let updatedCount: number = 0;

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(docRef);
      const data = snap.exists() ? (snap.data() as Partial<HeroCounterConfig>) : DEFAULT_HERO_COUNTER;
      const minInc = Math.max(1, data.minIncrement ?? 1);
      const maxInc = Math.max(minInc, data.maxIncrement ?? 3);
      const inc = Math.floor(Math.random() * (maxInc - minInc + 1)) + minInc;

      updatedCount = (data.currentCount || 1000000) + inc;
      transaction.update(docRef, {
        currentCount: updatedCount,
        lastUpdated: Date.now(),
      });
    });

    try {
      localStorage.setItem(LOCAL_STORAGE_HERO_KEY, String(updatedCount));
    } catch (_e) {}

    return updatedCount;
  } catch (err) {
    console.error("Failed manual step increment:", err);
    return null;
  }
}

/**
 * Increment groups immediately by a random step (for test button in admin)
 */
export async function manualStepGroupCount(): Promise<number | null> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    let updatedCount: number = 0;

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(docRef);
      const data = snap.exists() ? (snap.data() as Partial<HeroCounterConfig>) : DEFAULT_HERO_COUNTER;
      const minInc = Math.max(1, data.groupMinIncrement ?? 1);
      const maxInc = Math.max(minInc, data.groupMaxIncrement ?? 2);
      const inc = Math.floor(Math.random() * (maxInc - minInc + 1)) + minInc;

      updatedCount = (data.groupCount || DEFAULT_HERO_COUNTER.groupCount) + inc;
      transaction.update(docRef, {
        groupCount: updatedCount,
        groupLastUpdated: Date.now(),
      });
    });

    try {
      localStorage.setItem(LOCAL_STORAGE_GROUP_KEY, String(updatedCount));
    } catch (_e) {}

    return updatedCount;
  } catch (err) {
    console.error("Failed manual step increment for groups:", err);
    return null;
  }
}

/**
 * Subscribe to real-time hero & group counter changes from Firestore
 */
export function subscribeHeroCounter(
  callback: (config: HeroCounterConfig) => void
): () => void {
  const docRef = doc(db, "settings", SETTINGS_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Partial<HeroCounterConfig>;
        const cachedMember = getCachedHeroCount();
        const cachedGroup = getCachedGroupCount();

        // Monotonic protection: ensure count never retrogrades below cached values
        const safeCurrentCount = Math.max(
          typeof data.currentCount === "number" ? data.currentCount : 0,
          cachedMember,
          DEFAULT_HERO_COUNTER.currentCount
        );
        const safeGroupCount = Math.max(
          typeof data.groupCount === "number" ? data.groupCount : 0,
          cachedGroup,
          DEFAULT_HERO_COUNTER.groupCount
        );

        const config: HeroCounterConfig = {
          currentCount: safeCurrentCount,
          minIncrement: typeof data.minIncrement === "number" ? data.minIncrement : 1,
          maxIncrement: typeof data.maxIncrement === "number" ? data.maxIncrement : 3,
          intervalValue: typeof data.intervalValue === "number" ? data.intervalValue : (data.intervalMinutes || 1),
          intervalUnit: data.intervalUnit || (data.intervalMinutes && data.intervalMinutes < 1 ? 'seconds' : 'minutes'),
          intervalMinutes: typeof data.intervalMinutes === "number" ? data.intervalMinutes : 1,
          lastUpdated: typeof data.lastUpdated === "number" ? data.lastUpdated : Date.now(),

          groupCount: safeGroupCount,
          groupMinIncrement: typeof data.groupMinIncrement === "number" ? data.groupMinIncrement : 1,
          groupMaxIncrement: typeof data.groupMaxIncrement === "number" ? data.groupMaxIncrement : 2,
          groupIntervalValue: typeof data.groupIntervalValue === "number" ? data.groupIntervalValue : (data.groupIntervalMinutes || 2),
          groupIntervalUnit: data.groupIntervalUnit || (data.groupIntervalMinutes && data.groupIntervalMinutes < 1 ? 'seconds' : 'minutes'),
          groupIntervalMinutes: typeof data.groupIntervalMinutes === "number" ? data.groupIntervalMinutes : 2,
          groupLastUpdated: typeof data.groupLastUpdated === "number" ? data.groupLastUpdated : Date.now(),
        };

        latestConfigCache = config;

        try {
          localStorage.setItem(LOCAL_STORAGE_HERO_KEY, String(config.currentCount));
          localStorage.setItem(LOCAL_STORAGE_GROUP_KEY, String(config.groupCount));
        } catch (_e) {}

        callback(config);
        checkAndAdvanceCounter();
      } else {
        const cachedMember = getCachedHeroCount();
        const cachedGroup = getCachedGroupCount();
        const initialConfig: HeroCounterConfig = {
          ...DEFAULT_HERO_COUNTER,
          currentCount: Math.max(DEFAULT_HERO_COUNTER.currentCount, cachedMember),
          groupCount: Math.max(DEFAULT_HERO_COUNTER.groupCount, cachedGroup),
          lastUpdated: Date.now(),
          groupLastUpdated: Date.now(),
        };
        setDoc(docRef, initialConfig, { merge: true }).catch((e) =>
          console.warn("Failed to initialize default hero counter in Firestore:", e)
        );
        latestConfigCache = initialConfig;
        callback(initialConfig);
      }
    },
    (err) => {
      console.warn("Error subscribing to hero counter:", err);
    }
  );

  // Periodic heartbeat: check every 1 second (1000ms) for high-precision second/minute intervals
  const ticker = setInterval(() => {
    checkAndAdvanceCounter();
  }, 1000);

  return () => {
    unsubscribe();
    clearInterval(ticker);
  };
}
