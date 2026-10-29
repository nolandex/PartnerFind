import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestoreError';

export type SubmissionType = 'pencari_peluang' | 'pemberi_peluang';

export interface PartnershipSubmission {
  id: string;
  type: SubmissionType;
  name: string;
  whatsapp: string;
  email?: string;
  industry: string;
  skills: string;
  needs: string;
  capitalRange: string;
  location: string;
  workPreference: string;
  description: string;
  createdAt: string;
  status: 'active' | 'matched' | 'archived';
}

export interface MatchResult {
  id: string;
  seekerId: string;
  providerId: string;
  seekerName: string;
  providerName: string;
  seekerWhatsapp: string;
  providerWhatsapp: string;
  seekerEmail?: string;
  providerEmail?: string;
  industry: string;
  matchScore: number; // 0 - 100
  matchReasons: string[];
  status: 'pending' | 'approved' | 'rejected';
  seekerData: PartnershipSubmission;
  providerData: PartnershipSubmission;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  whatsappGroupLink?: string;
  adminNotes?: string;
}

const SUBMISSIONS_COLLECTION = 'partnership_submissions';
const MATCHES_COLLECTION = 'match_results';

/**
 * Normalizes text into keywords
 */
function cleanText(str?: string): string[] {
  if (!str) return [];
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/**
 * Intelligent Multi-Factor Matching Algorithm
 * Calculates compatibility score and strict pass/fail eligibility.
 * Jika deskripsi tidak nyambung / tidak ada relevansi, skor < 50 dan isEligible = false (gagal cocok).
 */
export function calculateMatch(
  seeker: PartnershipSubmission,
  provider: PartnershipSubmission
): { score: number; reasons: string[]; isEligible: boolean } {
  let score = 0;
  const reasons: string[] = [];

  const seekerText = (seeker.description || seeker.skills || '').toLowerCase();
  const providerText = (provider.description || provider.skills || '').toLowerCase();

  const seekerWords = cleanText(seekerText);
  const providerWords = cleanText(providerText);

  // Find overlapping keywords between both descriptions
  const commonWords = seekerWords.filter((w) => providerWords.includes(w));
  // Remove common stop words or generic filler
  const meaningfulCommon = commonWords.filter(
    (w) =>
      !['dan', 'yang', 'untuk', 'dengan', 'dari', 'ini', 'itu', 'atau', 'ada', 'saya', 'kami', 'juga', 'dalam', 'pada'].includes(w)
  );

  const overlapCount = meaningfulCommon.length;

  if (overlapCount >= 4) {
    score += 70;
    reasons.push(`🎯 Keselarasan Kata Kunci Tinggi: Terdapat kecocokan topik & kata kunci yang signifikan (${overlapCount} poin irisan)`);
  } else if (overlapCount >= 2) {
    score += 55;
    reasons.push(`🔗 Keterkaitan Topik: Ditemukan beberapa kesamaan konteks dan arah kolaborasi (${overlapCount} irisan kata)`);
  } else if (overlapCount === 1) {
    score += 35;
    reasons.push(`💡 Irisan Konteks Minim: Hanya sedikit kesamaan kata kunci yang terdeteksi`);
  } else {
    score += 15;
    reasons.push(`❌ Tidak Ada Titik Temu: Deskripsi kedua pihak tidak memiliki relevansi topik atau keahlian yang saling mendukung`);
  }

  // Check minimum length / effort in description
  if (seekerText.length > 30 && providerText.length > 30) {
    score += 20;
    reasons.push(`📝 Kelengkapan Deskripsi: Keduanya memberikan penjelasan yang memadai`);
  } else {
    score += 5;
    reasons.push(`⚠️ Deskripsi Terlalu Singkat: Informasi yang diberikan sangat minim`);
  }

  // Final score calculation
  const finalScore = Math.min(99, Math.max(10, score));

  // STRICT ELIGIBILITY THRESHOLD (Gagal cocok jika skor < 50)
  const isEligible = finalScore >= 50 && overlapCount >= 1;

  if (!isEligible) {
    reasons.push(`🚫 Status: Gagal Cocok (Skor di bawah ambang batas minimum relevansi 50%).`);
  }

  return {
    score: finalScore,
    reasons,
    isEligible,
  };
}

/**
 * Creates a new partnership form submission and triggers automated matching
 */
export async function createPartnershipSubmission(
  submission: Omit<PartnershipSubmission, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id?: string; matchedCount?: number; error?: string }> {
  try {
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullSubmission: PartnershipSubmission = {
      ...submission,
      id,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    const docRef = doc(db, SUBMISSIONS_COLLECTION, id);
    await setDoc(docRef, fullSubmission);

    const matchedCount = await runAutoMatchingForSubmission(fullSubmission);

    return { success: true, id, matchedCount };
  } catch (err) {
    console.error('Error creating partnership submission:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Gagal menyimpan formulir' };
  }
}

/**
 * Evaluates a single newly submitted form against all opposite forms
 */
export async function runAutoMatchingForSubmission(newSub: PartnershipSubmission): Promise<number> {
  try {
    const snapshot = await getDocs(collection(db, SUBMISSIONS_COLLECTION));
    const allSubs: PartnershipSubmission[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as PartnershipSubmission;
      if (data && data.id) allSubs.push(data);
    });

    const oppositeSubs = allSubs.filter((s) => s.id !== newSub.id && s.type !== newSub.type && s.status !== 'archived');
    let createdMatches = 0;

    for (const counterpart of oppositeSubs) {
      const seeker = newSub.type === 'pencari_peluang' ? newSub : counterpart;
      const provider = newSub.type === 'pemberi_peluang' ? newSub : counterpart;

      const match = calculateMatch(seeker, provider);
      const matchId = `match_${seeker.id}_${provider.id}`;
      const matchDocRef = doc(db, MATCHES_COLLECTION, matchId);

      if (match.isEligible) {
        const existingDoc = await getDoc(matchDocRef);
        if (!existingDoc.exists()) {
          const matchResult: MatchResult = {
            id: matchId,
            seekerId: seeker.id,
            providerId: provider.id,
            seekerName: seeker.name,
            providerName: provider.name,
            seekerWhatsapp: seeker.whatsapp,
            providerWhatsapp: provider.whatsapp,
            industry: 'Kolaborasi Umum',
            matchScore: match.score,
            matchReasons: match.reasons,
            status: 'pending',
            seekerData: seeker,
            providerData: provider,
            createdAt: new Date().toISOString(),
          };

          await setDoc(matchDocRef, matchResult);
          createdMatches++;
        }
      } else {
        // If it fails matching, ensure any outdated match is removed or marked rejected
        const existingDoc = await getDoc(matchDocRef);
        if (existingDoc.exists() && existingDoc.data().status === 'pending') {
          await deleteDoc(matchDocRef);
        }
      }
    }

    return createdMatches;
  } catch (err) {
    console.error('Error running auto matching for submission:', err);
    return 0;
  }
}

/**
 * Re-runs full matching over all active submissions
 */
export async function runAllMatching(): Promise<{ success: boolean; totalProcessed: number; newMatches: number }> {
  try {
    const snapshot = await getDocs(collection(db, SUBMISSIONS_COLLECTION));
    const seekers: PartnershipSubmission[] = [];
    const providers: PartnershipSubmission[] = [];

    snapshot.forEach((d) => {
      const data = d.data() as PartnershipSubmission;
      if (data && data.status !== 'archived') {
        if (data.type === 'pencari_peluang') seekers.push(data);
        else if (data.type === 'pemberi_peluang') providers.push(data);
      }
    });

    let newMatches = 0;
    let totalProcessed = 0;

    for (const seeker of seekers) {
      for (const provider of providers) {
        totalProcessed++;
        const match = calculateMatch(seeker, provider);
        const matchId = `match_${seeker.id}_${provider.id}`;
        const matchDocRef = doc(db, MATCHES_COLLECTION, matchId);

        if (match.isEligible) {
          const existingDoc = await getDoc(matchDocRef);
          if (!existingDoc.exists()) {
            const matchResult: MatchResult = {
              id: matchId,
              seekerId: seeker.id,
              providerId: provider.id,
              seekerName: seeker.name,
              providerName: provider.name,
              seekerWhatsapp: seeker.whatsapp,
              providerWhatsapp: provider.whatsapp,
              industry: 'Kolaborasi Umum',
              matchScore: match.score,
              matchReasons: match.reasons,
              status: 'pending',
              seekerData: seeker,
              providerData: provider,
              createdAt: new Date().toISOString(),
            };

            await setDoc(matchDocRef, matchResult);
            newMatches++;
          }
        }
      }
    }

    return { success: true, totalProcessed, newMatches };
  } catch (err) {
    console.error('Error running full matching:', err);
    return { success: false, totalProcessed: 0, newMatches: 0 };
  }
}

/**
 * Subscribes to real-time matching results
 */
export function subscribeMatchResults(callback: (results: MatchResult[]) => void): () => void {
  const colRef = collection(db, MATCHES_COLLECTION);
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: MatchResult[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as MatchResult);
      });
      callback(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, MATCHES_COLLECTION);
    }
  );
}

/**
 * Subscribes to real-time form submissions
 */
export function subscribeSubmissions(callback: (submissions: PartnershipSubmission[]) => void): () => void {
  const colRef = collection(db, SUBMISSIONS_COLLECTION);
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: PartnershipSubmission[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as MatchResult as unknown as PartnershipSubmission);
      });
      callback(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, SUBMISSIONS_COLLECTION);
    }
  );
}

/**
 * Approves a match result.
 */
export async function approveMatchResult(
  matchId: string,
  adminEmail: string,
  options?: { whatsappGroupLink?: string; adminNotes?: string }
): Promise<boolean> {
  try {
    const docRef = doc(db, MATCHES_COLLECTION, matchId);
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: adminEmail,
      ...(options?.whatsappGroupLink ? { whatsappGroupLink: options.whatsappGroupLink } : {}),
      ...(options?.adminNotes ? { adminNotes: options.adminNotes } : {}),
    });
    return true;
  } catch (err) {
    console.error('Error approving match result:', err);
    return false;
  }
}

/**
 * Rejects a match result
 */
export async function rejectMatchResult(matchId: string, adminEmail: string, notes?: string): Promise<boolean> {
  try {
    const docRef = doc(db, MATCHES_COLLECTION, matchId);
    await updateDoc(docRef, {
      status: 'rejected',
      approvedAt: new Date().toISOString(),
      approvedBy: adminEmail,
      ...(notes ? { adminNotes: notes } : {}),
    });
    return true;
  } catch (err) {
    console.error('Error rejecting match result:', err);
    return false;
  }
}

/**
 * Deletes a submission
 */
export async function deleteSubmission(submissionId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, SUBMISSIONS_COLLECTION, submissionId));
    return true;
  } catch (err) {
    console.error('Error deleting submission:', err);
    return false;
  }
}

export function formatWhatsappNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  return cleaned;
}

export function createDirectWhatsappUrl(phone: string, targetName: string, counterpartName: string, role: string): string {
  const cleanPhone = formatWhatsappNumber(phone);
  const text = encodeURIComponent(
    `Halo ${targetName}! 👋\n\nSaya Admin dari *PartnerFind*. Berdasarkan sistem pencocokan kami, deskripsi Anda sangat cocok dengan *${counterpartName}* (${role}).\n\nApakah Anda bersedia kami hubungkan dalam grup WhatsApp kolaborasi? Terima kasih!`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function createGroupWelcomeMessage(match: MatchResult): string {
  const reasonsText = match.matchReasons.map((r) => `• ${r}`).join('\n');
  return `🎉 *KOLABORASI MITRA PARTNERFIND* 🎉

Halo Kak *${match.seekerName}* & Kak *${match.providerName}*!
Selamat datang di grup pengenalan kemitraan PartnerFind.

Sistem pencocokan PartnerFind mendeteksi kecocokan tinggi antara Anda berdua:
📊 *Skor Kecocokan:* ${match.matchScore}%

*Alasan Kecocokan Terdeteksi:*
${reasonsText}

---
👤 *Pencari Peluang:* ${match.seekerName}
💬 Deskripsi: ${match.seekerData?.description || '-'}

💼 *Pemberi Peluang:* ${match.providerName}
💬 Deskripsi: ${match.providerData?.description || '-'}

Silakan saling menyapa dan berdiskusi untuk menjajaki potensi kemitraan bersama! 🚀`;
}
