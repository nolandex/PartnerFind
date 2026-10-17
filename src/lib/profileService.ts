import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc,
  deleteDoc, 
  serverTimestamp, 
  query,
  onSnapshot,
  increment
} from "firebase/firestore";
import { db } from "./firebase";
import { MemberProfile } from "../data/profilesData";
import { handleFirestoreError, OperationType } from "./firestoreError";

export interface FirestoreProfileData {
  id: string;
  name: string;
  bio: string;
  link?: string;
  avatar?: string;
  secretKey?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface CreatorInvite {
  id: string;
  code: string;
  name?: string;
  createdAt: Date;
  createdBy: string;
  uses: number;
  maxUses?: number; // 0 or undefined means Unlimited
}

const LOCAL_STORAGE_PROFILES_KEY = "custom_member_profiles";
const MY_PROFILE_ID_KEY = "my_partner_profile_id";
const MY_SECRET_KEY = "my_partner_secret_key";
const UNLOCKED_KEY = "partner_creator_unlocked";
const UNLOCKED_TOKEN_KEY = "partner_creator_token";

/**
 * Fetch all custom profiles from Firestore and merge with fallback initial profiles
 */
export async function fetchAllProfiles(): Promise<MemberProfile[]> {
  try {
    const snap = await getDocs(collection(db, "profiles"));
    const firestoreProfiles: MemberProfile[] = [];
    
    snap.forEach((d) => {
      const data = d.data() as FirestoreProfileData;
      firestoreProfiles.push({
        id: d.id,
        name: data.name || "Partner",
        handle: `@${(data.name || "partner").toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        avatar: data.avatar || "",
        niche: "",
        category: "ecommerce",
        monthlyRevenue: "",
        experience: "",
        location: "",
        headline: "",
        bio: data.bio || "",
        lookingFor: "",
        skills: [],
        status: "open_collab",
        verified: true,
        link: data.link || "",
        contact: {
          whatsapp: data.link || "",
        },
        connects: 1,
      });
    });

    // Save to local cache as backup
    if (firestoreProfiles.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(firestoreProfiles));
    }

    return firestoreProfiles;
  } catch (error) {
    console.warn("Could not fetch profiles from Firestore, using local fallback", error);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (_e) {
      // ignore
    }
    return [];
  }
}

/**
 * Subscribe to real-time profile updates
 */
export function subscribeToProfiles(callback: (profiles: MemberProfile[]) => void) {
  try {
    const q = query(collection(db, "profiles"));
    return onSnapshot(
      q, 
      (snapshot) => {
        const firestoreProfiles: MemberProfile[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as FirestoreProfileData;
          firestoreProfiles.push({
            id: d.id,
            name: data.name || "Partner",
            handle: `@${(data.name || "partner").toLowerCase().replace(/[^a-z0-9]/g, "")}`,
            avatar: data.avatar || "",
            niche: "",
            category: "ecommerce",
            monthlyRevenue: "",
            experience: "",
            location: "",
            headline: "",
            bio: data.bio || "",
            lookingFor: "",
            skills: [],
            status: "open_collab",
            verified: true,
            link: data.link || "",
            contact: {
              whatsapp: data.link || "",
            },
            connects: 1,
          });
        });
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(firestoreProfiles));
        callback(firestoreProfiles);
      },
      (error) => {
        console.warn("Profiles snapshot listener error:", error);
        fetchAllProfiles().then(callback);
      }
    );
  } catch (err) {
    console.warn("Could not attach snapshot listener", err);
    fetchAllProfiles().then(callback);
    return () => {};
  }
}

/**
 * Update an existing profile without creating duplicates
 */
export async function updateProfile(
  id: string,
  data: { name: string; bio: string; link?: string; avatar?: string }
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const ref = doc(db, "profiles", id);
    const updateData: any = {
      name: data.name.trim(),
      bio: data.bio.trim(),
      link: data.link?.trim() || "",
      updatedAt: serverTimestamp(),
    };
    if (data.avatar !== undefined) {
      updateData.avatar = data.avatar.trim();
    }

    await setDoc(ref, updateData, { merge: true });

    // Ensure locally stored active profile ID points to this ID
    localStorage.setItem(MY_PROFILE_ID_KEY, id);

    // Update local cache as well
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      if (saved) {
        const parsed: MemberProfile[] = JSON.parse(saved);
        const updated = parsed.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              name: data.name.trim(),
              handle: `@${data.name.trim().toLowerCase().replace(/[^a-z0-9]/g, "")}`,
              bio: data.bio.trim(),
              link: data.link?.trim() || "",
              avatar: data.avatar !== undefined ? data.avatar.trim() : p.avatar,
              contact: {
                whatsapp: data.link?.trim() || "",
              },
            };
          }
          return p;
        });
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updated));
      }
    } catch (_e) {
      // ignore
    }

    return { success: true, id };
  } catch (error) {
    console.error("Error updating profile:", error);
    handleFirestoreError(error, OperationType.UPDATE, `profiles/${id}`);
    return { success: false, id, error: "Gagal memperbarui profil di database." };
  }
}

/**
 * Save a new profile or update if an existing ID is provided
 */
export async function saveProfile(data: { 
  name: string; 
  bio: string; 
  link?: string; 
  avatar?: string;
  id?: string 
}): Promise<{ success: boolean; id: string; error?: string }> {
  // If an ID is explicitly provided, or if the current browser already owns a profile, UPDATE instead of creating a duplicate!
  const targetId = data.id || localStorage.getItem(MY_PROFILE_ID_KEY);
  if (targetId) {
    return updateProfile(targetId, data);
  }

  try {
    const id = `prof_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const secretKey = `sec_${Math.random().toString(36).substring(2, 15)}`;

    const profileDoc: FirestoreProfileData = {
      id,
      name: data.name.trim(),
      bio: data.bio.trim(),
      link: data.link?.trim() || "",
      avatar: data.avatar?.trim() || "",
      secretKey,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "profiles", id), profileDoc);

    // Save locally to identify profile ownership on this browser
    localStorage.setItem(MY_PROFILE_ID_KEY, id);
    localStorage.setItem(MY_SECRET_KEY, secretKey);

    return { success: true, id };
  } catch (error) {
    console.error("Error saving profile:", error);
    handleFirestoreError(error, OperationType.CREATE, "profiles");
    return { success: false, id: "", error: "Gagal menyimpan profil ke database." };
  }
}

/**
 * Fetch raw custom profiles from Firestore (useful for Admin moderation and duplicate cleanups)
 */
export async function fetchRawFirestoreProfiles(): Promise<FirestoreProfileData[]> {
  try {
    const snap = await getDocs(collection(db, "profiles"));
    const list: FirestoreProfileData[] = [];
    snap.forEach((d) => {
      const data = d.data() as FirestoreProfileData;
      list.push({
        ...data,
        id: d.id,
      });
    });
    return list;
  } catch (err) {
    console.error("Error fetching raw profiles:", err);
    return [];
  }
}

/**
 * Delete a profile by ID (can be used by user or Admin)
 */
export async function deleteProfileById(profileId: string): Promise<{ success: boolean; error?: string }> {
  if (!profileId) {
    return { success: false, error: "ID profil tidak valid." };
  }

  try {
    await deleteDoc(doc(db, "profiles", profileId));
    
    // If it was the current browser's active profile, clear local state
    if (localStorage.getItem(MY_PROFILE_ID_KEY) === profileId) {
      localStorage.removeItem(MY_PROFILE_ID_KEY);
      localStorage.removeItem(MY_SECRET_KEY);
    }

    // Also remove from local cache
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      if (saved) {
        const parsed: MemberProfile[] = JSON.parse(saved);
        const filtered = parsed.filter((p) => p.id !== profileId);
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(filtered));
      }
    } catch (_e) {
      // ignore
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting profile:", error);
    handleFirestoreError(error, OperationType.DELETE, `profiles/${profileId}`);
    return { success: false, error: "Gagal menghapus profil dari database." };
  }
}

/**
 * Fetch the profile owned by this client browser
 */
export async function getMyProfile(): Promise<FirestoreProfileData | null> {
  const profileId = localStorage.getItem(MY_PROFILE_ID_KEY);
  if (!profileId) return null;

  try {
    const snap = await getDoc(doc(db, "profiles", profileId));
    if (snap.exists()) {
      return snap.data() as FirestoreProfileData;
    } else {
      // Profile might have been deleted
      localStorage.removeItem(MY_PROFILE_ID_KEY);
      localStorage.removeItem(MY_SECRET_KEY);
      return null;
    }
  } catch (error) {
    console.warn("Could not fetch my profile from Firestore", error);
    return null;
  }
}

/**
 * Delete the profile owned by this user
 */
export async function deleteMyProfile(): Promise<{ success: boolean; error?: string }> {
  const profileId = localStorage.getItem(MY_PROFILE_ID_KEY);
  if (!profileId) {
    return { success: false, error: "Tidak ada profil aktif yang ditemukan." };
  }
  return deleteProfileById(profileId);
}

/**
 * Check if the current browser session has permanent creator access
 */
export function isCreatorUnlocked(): boolean {
  return localStorage.getItem(UNLOCKED_KEY) === "true";
}

/**
 * Grant permanent creator access
 */
export function unlockCreatorAccess(tokenCode: string): void {
  localStorage.setItem(UNLOCKED_KEY, "true");
  localStorage.setItem(UNLOCKED_TOKEN_KEY, tokenCode);
}

export interface InviteValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate an invite code against Firestore or fallback
 */
export async function validateInviteCode(code: string): Promise<InviteValidationResult> {
  const cleanCode = code.trim().toLowerCase();
  if (!cleanCode) {
    return { valid: false, error: "Kode undangan tidak boleh kosong." };
  }

  // If already unlocked on this browser with this exact code, grant access directly
  if (isCreatorUnlocked() && localStorage.getItem(UNLOCKED_TOKEN_KEY) === cleanCode) {
    return { valid: true };
  }

  // Master fallback codes
  if (cleanCode === "partner-creator" || cleanCode === "partnerfind-vip" || cleanCode === "nexclass-admin-2024") {
    unlockCreatorAccess(cleanCode);
    return { valid: true };
  }

  try {
    // 1. Check in creator_invites collection
    const inviteRef = doc(db, "creator_invites", cleanCode);
    const inviteDoc = await getDoc(inviteRef);
    
    if (inviteDoc.exists()) {
      const data = inviteDoc.data();
      const maxUses = Number(data.maxUses) || 0; // 0 = unlimited
      const currentUses = Number(data.uses) || 0;

      if (maxUses > 0 && currentUses >= maxUses) {
        return { 
          valid: false, 
          error: `Batas kuota link undangan ini sudah habis (${currentUses}/${maxUses} orang telah bergabung). Minta link baru ke admin.` 
        };
      }

      // Increment usage count in Firestore
      try {
        await updateDoc(inviteRef, {
          uses: increment(1)
        });
      } catch (e) {
        console.warn("Could not increment invite usage count:", e);
      }

      unlockCreatorAccess(cleanCode);
      return { valid: true };
    }

    // 2. Also check in general tokens collection
    const tokenRef = doc(db, "tokens", cleanCode);
    const tokenDoc = await getDoc(tokenRef);
    if (tokenDoc.exists()) {
      const tokenData = tokenDoc.data();
      if (tokenData.type === "single" && tokenData.isUsed) {
        return { 
          valid: false, 
          error: "Link ini bertipe sekali pakai dan sudah pernah digunakan sebelumnya." 
        };
      }

      if (tokenData.type === "single") {
        try {
          await updateDoc(tokenRef, {
            isUsed: true,
            usedAt: serverTimestamp()
          });
        } catch (e) {
          console.warn("Could not mark single token as used:", e);
        }
      }

      unlockCreatorAccess(cleanCode);
      return { valid: true };
    }

    return { 
      valid: false, 
      error: "Link atau kode undangan tidak terdaftar dalam sistem." 
    };
  } catch (error) {
    console.warn("Error validating invite code with Firestore:", error);
    // In case of offline/network issues, allow if code has at least 4 chars
    if (cleanCode.length >= 4) {
      unlockCreatorAccess(cleanCode);
      return { valid: true };
    }
    return { 
      valid: false, 
      error: "Terjadi gangguan jaringan saat memverifikasi link. Silakan coba lagi." 
    };
  }
}

/**
 * Admin: Create a new creator invite link with configurable maxUses limit
 * @param maxUses 0 for unlimited, or a positive integer (e.g., 1 for single-use, 5 for 5 people)
 */
export async function createCreatorInvite(
  code: string, 
  name: string = "", 
  createdBy: string = "admin",
  maxUses: number = 0
): Promise<boolean> {
  try {
    const cleanCode = code.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (!cleanCode) return false;

    await setDoc(doc(db, "creator_invites", cleanCode), {
      code: cleanCode,
      name: name.trim() || `Invite ${cleanCode}`,
      createdAt: serverTimestamp(),
      createdBy,
      uses: 0,
      maxUses: Number(maxUses) || 0,
    });
    return true;
  } catch (error) {
    console.error("Error creating creator invite:", error);
    handleFirestoreError(error, OperationType.CREATE, `creator_invites/${code}`);
    return false;
  }
}

/**
 * Admin: Fetch all creator invites
 */
export async function fetchCreatorInvites(): Promise<CreatorInvite[]> {
  try {
    const snap = await getDocs(collection(db, "creator_invites"));
    const list: CreatorInvite[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        code: data.code || d.id,
        name: data.name || "",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        createdBy: data.createdBy || "admin",
        uses: Number(data.uses) || 0,
        maxUses: Number(data.maxUses) || 0,
      });
    });
    list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return list;
  } catch (error) {
    console.warn("Could not fetch creator invites:", error);
    return [];
  }
}

/**
 * Admin: Delete a creator invite
 */
export async function deleteCreatorInvite(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "creator_invites", id));
    return true;
  } catch (error) {
    console.error("Error deleting creator invite:", error);
    handleFirestoreError(error, OperationType.DELETE, `creator_invites/${id}`);
    return false;
  }
}
