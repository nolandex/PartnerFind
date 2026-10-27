import type { MemberProfile } from "../data/profilesData";

/**
 * Pencocokan otomatis PartnerFind, terintegrasi dengan repo yang sudah ada.
 *
 * Pendaftaran sudah ada lewat CreateProfile (/buat-profil) dan profil
 * disimpan di Firestore lewat profileService. Modul ini TIDAK mengubah
 * skema Firestore dan TIDAK mengirim pesan otomatis apa pun.
 *
 * Yang dilakukan modul ini:
 * - mengubah MemberProfile yang sudah ada menjadi profil yang bisa
 *   dicocokkan, memakai field yang memang sudah ada di repo:
 *   category, niche, skills, lookingFor, bio, headline, verified
 * - menghitung skor transparan, bukan kotak hitam
 * - menemukan pengecualian yang masih butuh manusia
 *
 * Langkah berikutnya (di luar PR ini, kalau user setuju) adalah
 * menambahkan field eksplisit peran (Pencari/Pemberi) dan jenis
 * peluang ke CreateProfile + Firestore. Sampai saat itu, peran
 * dan jenis peluang diturunkan dari teks profil yang sudah ada.
 */

export type MatchRole = "pencari" | "pemberi" | "tidak-diketahui";

export interface MatchableProfile {
  id: string;
  name: string;
  role: MatchRole;
  opportunityTypes: string[];
  field: string;
  skills: string[];
  needs: string;
  verified: boolean;
  contact: string;
}

export interface MatchReason {
  label: string;
  points: number;
}

export interface MatchResult {
  profile: MatchableProfile;
  score: number;
  reasons: MatchReason[];
  level: "cocok-kuat" | "perlu-dicek" | "belum-cocok";
}

export const SCORE_STRONG = 70;
export const SCORE_MINIMUM = 40;

const OPPORTUNITY_KEYWORDS: Array<{ type: string; keywords: string[] }> = [
  { type: "Bisnis", keywords: ["bisnis", "business", "usaha", "umkm", "startup"] },
  { type: "Proyek", keywords: ["proyek", "project", "proyek"] },
  { type: "Investasi", keywords: ["investasi", "investment", "investor", "modal"] },
  { type: "Pendanaan", keywords: ["pendanaan", "funding", "dana", "pinjaman"] },
  { type: "Pekerjaan", keywords: ["pekerjaan", "job", "kerja", "karyawan", "freelance"] },
  { type: "Kerja sama", keywords: ["kerja sama", "kerjasama", "kolaborasi", "collab", "partnership", "mitra", "partner"] },
];

const STOPWORDS = new Set([
  "dan", "yang", "untuk", "dari", "dengan", "atau", "di", "ke", "pada",
  "adalah", "ini", "itu", "saya", "kami", "anda", "bisa", "jika", "saat", "dalam",
]);

export function tokens(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function keywordOverlap(a: string, b: string): string[] {
  const setA = new Set(tokens(a));
  return [...new Set(tokens(b))].filter((w) => setA.has(w));
}

function deriveOpportunityTypes(text: string): string[] {
  const hay = ` ${text.toLowerCase()} `;
  const found: string[] = [];
  for (const entry of OPPORTUNITY_KEYWORDS) {
    if (entry.keywords.some((k) => hay.includes(k))) found.push(entry.type);
  }
  return found;
}

function deriveRole(text: string): MatchRole {
  const hay = text.toLowerCase();
  const seeker = ["mencari", "cari", "butuh", "looking for", "seeking"];
  const provider = ["menawarkan", "tawarkan", "menyediakan", "offering", "menyediakan peluang"];
  if (provider.some((k) => hay.includes(k)) && !seeker.some((k) => hay.includes(k))) return "pemberi";
  if (seeker.some((k) => hay.includes(k))) return "pencari";
  return "tidak-diketahui";
}

export function toMatchable(profile: MemberProfile): MatchableProfile {
  const text = [profile.lookingFor, profile.bio, profile.headline, profile.niche].join(" ");
  const opportunityTypes = deriveOpportunityTypes(text);
  return {
    id: profile.id,
    name: profile.name,
    role: deriveRole(text),
    opportunityTypes: opportunityTypes.length > 0 ? opportunityTypes : [profile.category],
    field: profile.niche || profile.category,
    skills: profile.skills || [],
    needs: text,
    verified: profile.verified,
    contact: profile.contact?.whatsapp || profile.link || "",
  };
}

/** Profil uji / pendaftaran baru, sebelum disimpan ke Firestore. */
export interface RegistrationInput {
  name: string;
  role: "pencari" | "pemberi";
  field: string;
  skills: string;
  opportunityTypes: string[];
  needs: string;
  contact: string;
  verified: boolean;
}

export function fromRegistration(input: RegistrationInput): MatchableProfile {
  return {
    // Date.now() saja tidak cukup: dua profil uji yang dibuat dalam
    // milidetik yang sama akan punya id yang sama dan saling
    // terfilter sebagai "diri sendiri" di findTopMatches.
    id: `uji-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    role: input.role,
    opportunityTypes: input.opportunityTypes,
    field: input.field,
    skills: tokens(input.skills),
    needs: input.needs,
    verified: input.verified,
    contact: input.contact,
  };
}

export function scoreMatch(a: MatchableProfile, b: MatchableProfile): MatchResult {
  const reasons: MatchReason[] = [];
  let score = 0;

  const typeOverlap = a.opportunityTypes.filter((t) => b.opportunityTypes.includes(t));
  if (typeOverlap.length > 0) {
    score += 40;
    reasons.push({ label: `Jenis peluang sama: ${typeOverlap.join(", ")}`, points: 40 });
  }

  const fieldOverlap = keywordOverlap(a.field, b.field);
  if (fieldOverlap.length > 0) {
    score += 25;
    reasons.push({ label: `Bidang sama: ${fieldOverlap.join(", ")}`, points: 25 });
  }

  const skillOverlap = keywordOverlap(a.skills.join(" "), b.needs).concat(
    keywordOverlap(b.skills.join(" "), a.needs),
  );
  const uniqueSkills = [...new Set(skillOverlap)];
  if (uniqueSkills.length > 0) {
    score += 20;
    reasons.push({ label: `Keahlian nyambung: ${uniqueSkills.join(", ")}`, points: 20 });
  }

  const needsOverlap = keywordOverlap(a.needs, b.needs);
  if (needsOverlap.length > 0) {
    score += 15;
    reasons.push({ label: `Kata kebutuhan sama: ${[...new Set(needsOverlap)].join(", ")}`, points: 15 });
  }

  const capped = Math.min(100, score);
  return {
    profile: b,
    score: capped,
    reasons,
    level: capped >= SCORE_STRONG ? "cocok-kuat" : capped >= SCORE_MINIMUM ? "perlu-dicek" : "belum-cocok",
  };
}

export function findTopMatches(
  me: MatchableProfile,
  others: MatchableProfile[],
  limit = 3,
): MatchResult[] {
  return others
    .filter((o) => o.id !== me.id && o.verified)
    .map((o) => scoreMatch(me, o))
    .filter((r) => r.score >= SCORE_MINIMUM)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
}

export interface Exceptions {
  unverified: MatchableProfile[];
  noMatch: MatchableProfile[];
  duplicateContacts: MatchableProfile[];
}

export function findExceptions(profiles: MatchableProfile[]): Exceptions {
  const unverified = profiles.filter((p) => !p.verified);
  const noMatch = profiles.filter((p) => findTopMatches(p, profiles, 1).length === 0);
  const seen = new Set<string>();
  const duplicateContacts: MatchableProfile[] = [];
  for (const p of profiles) {
    if (!p.contact) continue;
    if (seen.has(p.contact)) duplicateContacts.push(p);
    else seen.add(p.contact);
  }
  return { unverified, noMatch, duplicateContacts };
}

export function draftIntroduction(me: MatchableProfile, match: MatchResult): string {
  const firstReason = match.reasons[0]?.label || "jenis peluang";
  return (
    `Halo ${match.profile.name}, perkenalkan ${me.name} dari PartnerFind. ` +
    `Berdasarkan profil, ada kecocokan di ${firstReason}. ` +
    `Apakah bersedia berdiskusi lebih lanjut? ` +
    `Draf ini hanya untuk disalin, bukan pesan yang dikirim otomatis.`
  );
}
