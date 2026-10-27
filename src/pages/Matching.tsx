import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProfiles } from "../lib/profileService";
import type { MemberProfile } from "../data/profilesData";
import {
  draftIntroduction,
  findExceptions,
  findTopMatches,
  fromRegistration,
  toMatchable,
  type MatchableProfile,
} from "../lib/matching";

const OPPORTUNITY_TYPES = ["Bisnis", "Proyek", "Investasi", "Pendanaan", "Pekerjaan", "Kerja sama"];

export default function Matching() {
  const [profiles, setProfiles] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [testProfiles, setTestProfiles] = useState<MatchableProfile[]>([]);
  const [copied, setCopied] = useState("");

  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState<"pencari" | "pemberi">("pencari");
  const [formField, setFormField] = useState("");
  const [formSkills, setFormSkills] = useState("");
  const [formTypes, setFormTypes] = useState<string[]>([]);
  const [formNeeds, setFormNeeds] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formVerified, setFormVerified] = useState(true);
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    fetchAllProfiles()
      .then((list) => {
        setProfiles(list);
        if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch(() => setLoadError("Profil tidak bisa dimuat. Coba muat ulang."))
      .finally(() => setLoading(false));
  }, []);

  const matchable = useMemo<MatchableProfile[]>(() => {
    return [...profiles.map(toMatchable), ...testProfiles];
  }, [profiles, testProfiles]);

  const selected = matchable.find((p) => p.id === selectedId) || matchable[0];
  const topMatches = useMemo(
    () => (selected ? findTopMatches(selected, matchable, 3) : []),
    [selected, matchable],
  );
  const exceptions = useMemo(() => findExceptions(matchable), [matchable]);

  const toggleType = (t: string) =>
    setFormTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const addTestProfile = () => {
    if (!formName.trim() || !formNeeds.trim() || formTypes.length === 0) {
      setFormMsg("Lengkapi nama, kebutuhan, dan minimal satu jenis peluang.");
      return;
    }
    const created = fromRegistration({
      name: formName.trim(),
      role: formRole,
      field: formField.trim(),
      skills: formSkills,
      opportunityTypes: formTypes,
      needs: formNeeds.trim(),
      contact: formContact.trim(),
      verified: formVerified,
    });
    setTestProfiles((prev) => [...prev, created]);
    setSelectedId(created.id);
    setFormMsg("Profil uji ditambahkan untuk sesi ini saja. Profil ini belum tersimpan ke Firestore.");
    setFormName("");
    setFormField("");
    setFormSkills("");
    setFormTypes([]);
    setFormNeeds("");
    setFormContact("");
  };

  const copyDraft = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
    } catch {
      setCopied("");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">Pencocokan Otomatis PartnerFind</h1>
        <p className="mt-2 text-neutral-600">
          Terintegrasi dengan repo PartnerFind: pendaftaran sudah ada lewat{" "}
          <Link to="/buat-profil" className="underline font-semibold">Buat Profil</Link>, dan halaman
          ini mencocokkan profil yang sudah ada di Firestore. Tidak ada payment, dan tidak ada pesan
          yang dikirim otomatis — draf perkenalan hanya untuk disalin.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Skor transparan: jenis peluang sama 40, bidang sama 25, keahlian nyambung 20, kata kebutuhan
          sama 15. Skor 70+ = cocok kuat, 40–69 = perlu dicek, di bawah 40 = belum cocok.
        </p>

        {loading && <p className="mt-6">Memuat profil…</p>}
        {loadError && <p className="mt-6 text-red-700">{loadError}</p>}

        <section className="mt-6 bg-white border rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-bold">Coba profil baru (uji, belum tersimpan ke Firestore)</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Gunakan ini untuk menguji logika pencocokan. Untuk pendaftaran sungguhan, pakai{" "}
            <Link to="/buat-profil" className="underline">Buat Profil</Link>.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <label className="block text-sm font-semibold">Nama lengkap
              <input className="mt-1 w-full border rounded-lg p-2" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="cth: Andi Pratama" />
            </label>
            <label className="block text-sm font-semibold">Peran
              <select className="mt-1 w-full border rounded-lg p-2" value={formRole} onChange={(e) => setFormRole(e.target.value as "pencari" | "pemberi")}>
                <option value="pencari">Pencari Peluang</option>
                <option value="pemberi">Pemberi Peluang</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Bidang
              <input className="mt-1 w-full border rounded-lg p-2" value={formField} onChange={(e) => setFormField(e.target.value)} placeholder="cth: kuliner, teknologi" />
            </label>
            <label className="block text-sm font-semibold">Keahlian
              <input className="mt-1 w-full border rounded-lg p-2" value={formSkills} onChange={(e) => setFormSkills(e.target.value)} placeholder="cth: memasak, desain" />
            </label>
            <label className="block text-sm font-semibold">Kontak
              <input className="mt-1 w-full border rounded-lg p-2" value={formContact} onChange={(e) => setFormContact(e.target.value)} placeholder="WhatsApp / email" />
            </label>
            <label className="block text-sm font-semibold">Kebutuhan / peluang
              <input className="mt-1 w-full border rounded-lg p-2" value={formNeeds} onChange={(e) => setFormNeeds(e.target.value)} placeholder="Tulis dengan jelas" />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OPPORTUNITY_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => toggleType(t)} className={`px-3 py-1.5 rounded-full border text-sm ${formTypes.includes(t) ? "bg-emerald-700 text-white border-emerald-700" : "bg-white"}`}>{t}</button>
            ))}
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={formVerified} onChange={(e) => setFormVerified(e.target.checked)} />
            Bersedia verifikasi identitas (yang tidak dicentang masuk dashboard pengecualian)
          </label>
          <button type="button" onClick={addTestProfile} className="mt-4 bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold">Tambah profil uji &amp; cocokkan</button>
          {formMsg && <p className="mt-2 text-sm">{formMsg}</p>}
        </section>

        <section className="mt-6 bg-white border rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-bold">Hasil pencocokan</h2>
          <label className="block text-sm font-semibold mt-3">Pilih profil
            <select className="mt-1 w-full border rounded-lg p-2" value={selected?.id || ""} onChange={(e) => setSelectedId(e.target.value)}>
              {matchable.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.role === "pencari" ? "Pencari" : p.role === "pemberi" ? "Pemberi" : "Peran belum jelas"}</option>
              ))}
            </select>
          </label>
          {!selected && <p className="mt-3 text-neutral-600">Belum ada profil. Buat profil dulu lewat Buat Profil, atau tambah profil uji di atas.</p>}
          {selected && topMatches.length === 0 && (
            <p className="mt-3 text-neutral-600">Belum ada lawan dengan skor ≥40 untuk {selected.name}. Profil ini masuk dashboard pengecualian di bawah.</p>
          )}
          {selected && topMatches.map((m) => {
            const draft = draftIntroduction(selected, m);
            return (
              <article key={m.profile.id} className="mt-4 border rounded-xl p-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <strong className="text-lg">{m.profile.name}</strong>
                  <span className="text-2xl font-extrabold text-emerald-700">{m.score}</span>
                  <span>/ 100</span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{m.level === "cocok-kuat" ? "Cocok kuat" : "Perlu dicek"}</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">{m.profile.opportunityTypes.join(", ")} • {m.profile.field}</p>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {m.reasons.map((r) => <li key={r.label}>{r.label} (+{r.points})</li>)}
                </ul>
                <p className="text-sm font-semibold mt-3">Draf perkenalan (salin saja):</p>
                <p className="text-sm bg-neutral-100 rounded-lg p-3 mt-1">{draft}</p>
                <button type="button" onClick={() => copyDraft(draft, m.profile.id)} className="mt-2 border px-3 py-1.5 rounded-lg text-sm font-semibold">{copied === m.profile.id ? "Tersalin" : "Salin draf"}</button>
              </article>
            );
          })}
        </section>

        <section className="mt-6 bg-white border rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-bold">Dashboard pengecualian — yang masih butuh manusia</h2>
          <p className="text-sm text-neutral-600 mt-1">Total profil yang dihitung: {matchable.length}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><strong>Belum terverifikasi:</strong> {exceptions.unverified.length ? exceptions.unverified.map((p) => p.name).join(", ") : "—"}</li>
            <li><strong>Tidak ada lawan cocok ≥40:</strong> {exceptions.noMatch.length ? exceptions.noMatch.map((p) => p.name).join(", ") : "—"}</li>
            <li><strong>Kontak duplikat:</strong> {exceptions.duplicateContacts.length ? exceptions.duplicateContacts.map((p) => p.name).join(", ") : "—"}</li>
          </ul>
          <p className="text-sm text-neutral-600 mt-3">
            Batasan jujur: profil lama di repo ini belum punya field peran dan jenis peluang eksplisit,
            jadi pencocokan pertama ini memakai kategori, niche, skills, lookingFor, dan bio yang sudah ada.
            Langkah berikutnya, kalau kamu setuju, adalah menambahkan field peran dan jenis peluang ke
            CreateProfile dan Firestore — modul matching di atas sudah siap memakai field itu.
          </p>
        </section>
      </div>
    </div>
  );
}
