import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  KeyRound, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  Loader2,
  Send,
  UserCheck,
  Edit3,
  RefreshCw,
  Globe,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { 
  isCreatorUnlocked, 
  validateInviteCode, 
  getMyProfile, 
  saveProfile, 
  updateProfile,
  deleteMyProfile, 
  FirestoreProfileData 
} from "../lib/profileService";
import { ProfileAvatar } from "../components/NetworkDirectory";
import { TopNavbar } from "../components/top-navbar";
import { BottomNavbar } from "../components/bottom-navbar";

export default function CreateProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteParam = searchParams.get("invite") || searchParams.get("token") || searchParams.get("code") || "";

  // State for Access Lock
  const [unlocked, setUnlocked] = useState<boolean>(isCreatorUnlocked());
  const [validatingInvite, setValidatingInvite] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState<string>("");
  const [lockError, setLockError] = useState<string>("");

  // State for Profile
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [myProfile, setMyProfile] = useState<FirestoreProfileData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & convert image file to optimized Base64
  const compressImageFile = (file: File, maxSize = 280, quality = 0.82): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        const img = new window.Image();
        img.onerror = reject;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 10 MB.");
      return;
    }

    setUploadingImage(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 280, 0.82);
      setAvatar(compressedDataUrl);
      setFormError("");
    } catch (err) {
      console.error("Gagal memproses gambar:", err);
      alert("Gagal memproses gambar. Silakan coba lagi.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // 1. Check URL invite param on mount
  useEffect(() => {
    async function checkParam() {
      if (inviteParam) {
        setValidatingInvite(true);
        const res = await validateInviteCode(inviteParam);
        if (res.valid) {
          setUnlocked(true);
          setSuccessToast("Akses pembuat profil berhasil diverifikasi dan disimpan permanen!");
          setTimeout(() => setSuccessToast(""), 4000);
        } else {
          setLockError(res.error || "Link undangan tidak valid atau sudah tidak berlaku.");
        }
        setValidatingInvite(false);
      }
    }
    checkParam();
  }, [inviteParam]);

  // 2. Load my existing profile if unlocked
  useEffect(() => {
    if (unlocked) {
      loadProfile();
    } else {
      setLoadingProfile(false);
    }
  }, [unlocked]);

  const loadProfile = async () => {
    setLoadingProfile(true);
    const prof = await getMyProfile();
    setMyProfile(prof);
    if (prof) {
      setName(prof.name);
      setBio(prof.bio);
      setLink(prof.link || "");
      setAvatar(prof.avatar || "");
    }
    setLoadingProfile(false);
  };

  const handleManualUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = manualCode.trim();
    if (!code) return;

    setValidatingInvite(true);
    setLockError("");
    const res = await validateInviteCode(code);
    if (res.valid) {
      setUnlocked(true);
      setSuccessToast("Akses pembuat profil berhasil dibuka secara permanen!");
      setTimeout(() => setSuccessToast(""), 4000);
    } else {
      setLockError(res.error || "Kode atau link undangan salah. Hubungi admin untuk mendapatkan undangan.");
    }
    setValidatingInvite(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Mohon masukkan nama atau brand Anda.");
      return;
    }
    if (!bio.trim()) {
      setFormError("Mohon isi deskripsi kerja sama yang Anda tawarkan atau cari.");
      return;
    }

    setSubmitting(true);
    let res: { success: boolean; id: string; error?: string };
    const isEditMode = isEditing && Boolean(myProfile?.id);

    if (isEditMode && myProfile) {
      res = await updateProfile(myProfile.id, {
        name: name.trim(),
        bio: bio.trim(),
        link: link.trim(),
        avatar: avatar.trim(),
      });
    } else {
      res = await saveProfile({
        name: name.trim(),
        bio: bio.trim(),
        link: link.trim(),
        avatar: avatar.trim(),
      });
    }

    if (res.success) {
      setSuccessToast(isEditMode ? "Perubahan profil berhasil disimpan!" : "Profil kolaborasi Anda berhasil dipublikasikan ke direktori!");
      setIsEditing(false);
      await loadProfile();
      setTimeout(() => setSuccessToast(""), 4000);
    } else {
      setFormError(res.error || "Gagal menyimpan profil. Silakan coba lagi.");
    }
    setSubmitting(false);
  };

  const handleDeleteProfile = async () => {
    setDeleting(true);
    const res = await deleteMyProfile();
    if (res.success) {
      setMyProfile(null);
      setName("");
      setBio("");
      setLink("");
      setIsEditing(false);
      setShowDeleteModal(false);
      setSuccessToast("Profil Anda telah berhasil dihapus dari direktori.");
      setTimeout(() => setSuccessToast(""), 4000);
    } else {
      alert(res.error || "Gagal menghapus profil.");
    }
    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between pb-24">
      <TopNavbar showBack backTo="/" backLabel="Kembali ke Beranda" />

      <main
        className="flex-1 max-w-2xl w-full mx-auto px-4 pt-20 pb-12 transition-all duration-200"
      >
        {/* Toast Notification */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-medium">{successToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. STATE: VALIDATING INVITE FROM LINK */}
        {validatingInvite && (
          <div className="bg-card/90 border border-foreground/15 rounded-2xl p-8 text-center flex flex-col items-center justify-center my-12">
            <Loader2 className="w-8 h-8 text-[hsl(var(--brand-accent))] animate-spin mb-4" />
            <h3 className="text-base font-semibold text-foreground">Memvalidasi Link Undangan...</h3>
            <p className="text-xs text-foreground/60 mt-1">
              Menghubungkan dan membuka izin permanen pembuat profil Anda.
            </p>
          </div>
        )}

        {/* 2. STATE: LOCKED (NO INVITE ACCESS) */}
        {!validatingInvite && !unlocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/90 border border-foreground/15 rounded-2xl p-6 sm:p-8 shadow-xl text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--brand-accent)/0.15)] border border-[hsl(var(--brand-accent)/0.3)] flex items-center justify-center mx-auto mb-5 text-[hsl(var(--brand-accent))]">
              <KeyRound className="w-7 h-7" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2">
              Khusus Undangan Partner
            </h1>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-md mx-auto mb-6 leading-relaxed">
              Halaman pembuatan profil kolaborasi hanya dapat diakses melalui <strong>link undangan resmi</strong> dari pemilik atau admin.
            </p>

            <form onSubmit={handleManualUnlock} className="max-w-sm mx-auto space-y-3">
              <div className="text-left">
                <label className="block text-[11px] font-medium text-foreground/60 mb-1">
                  Punya Kode / Link Undangan? Masukkan di sini:
                </label>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Contoh: partner-xyz atau kode invite"
                  className="w-full h-10 px-3.5 rounded-xl bg-background border border-foreground/20 text-xs text-foreground focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-colors"
                />
              </div>

              {lockError && (
                <p className="text-[11px] text-red-400 text-left flex items-center gap-1.5 pt-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {lockError}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-[hsl(var(--brand-accent))] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                Buka Akses Pembuat Profil
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-foreground/10 text-[11px] text-foreground/50">
              💡 Catatan: Setelah sekali masuk melalui link undangan yang sah, browser Anda otomatis memiliki akses permanen ke halaman ini.
            </div>
          </motion.div>
        )}

        {/* 3. STATE: UNLOCKED - LOADING PROFILE DATA */}
        {!validatingInvite && unlocked && loadingProfile && (
          <div className="bg-card/90 border border-foreground/15 rounded-2xl p-8 text-center flex flex-col items-center justify-center my-12">
            <Loader2 className="w-7 h-7 text-[hsl(var(--brand-accent))] animate-spin mb-3" />
            <p className="text-xs text-foreground/70">Memuat status profil Anda...</p>
          </div>
        )}

        {/* 4. STATE: UNLOCKED - HAS ACTIVE PROFILE (VIEW & DELETE) */}
        {!validatingInvite && unlocked && !loadingProfile && myProfile && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-foreground/12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Profil Aktif di Direktori
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Profil Kolaborasi Anda
                </h1>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Profil ini sedang tayang di pencarian partner dan direktori publik.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (myProfile) {
                      setName(myProfile.name);
                      setBio(myProfile.bio);
                      setLink(myProfile.link || "");
                    }
                    setFormError("");
                    setIsEditing(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-card hover:bg-muted border border-foreground/20 text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profil
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-xs font-medium text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Profil
                </button>
              </div>
            </div>

            {/* Profile Card Preview */}
            <div className="bg-card/90 border border-foreground/15 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <ProfileAvatar avatar={myProfile.avatar} name={myProfile.name} className="w-10 h-10 sm:w-12 sm:h-12" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/50 block mb-0.5">
                    Nama / Brand
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-foreground truncate">
                    {myProfile.name}
                  </h2>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/50 block mb-1">
                  Deskripsi Kerja Sama
                </span>
                <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-line leading-relaxed bg-background/50 p-3.5 rounded-xl border border-foreground/10">
                  {myProfile.bio}
                </p>
              </div>

              {myProfile.link && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/50 block mb-1">
                    Link Kontak / Kolaborasi
                  </span>
                  <a
                    href={myProfile.link.startsWith("http") ? myProfile.link : `https://${myProfile.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[hsl(var(--brand-accent))] hover:underline break-all"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    {myProfile.link}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>

            {/* Actions & Shortcut */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="flex-1 h-10 rounded-xl bg-card hover:bg-muted border border-border text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                Lihat di Direktori Partner
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </motion.div>
        )}

        {/* 5. STATE: UNLOCKED - CREATE FORM (OR EDITING) */}
        {!validatingInvite && unlocked && !loadingProfile && (!myProfile || isEditing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Form Header */}
            <div className="pb-2 border-b border-foreground/12 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[hsl(var(--brand-accent)/0.15)] text-[hsl(var(--brand-accent))] text-[11px] font-semibold mb-1">
                  <Sparkles className="w-3 h-3" />
                  Akses Terverifikasi
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {isEditing ? "Edit Profil Kolaborasi" : "Buat Profil Kolaborasi Baru"}
                </h1>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Profil akan langsung muncul di hasil pencarian & direktori partner publik.
                </p>
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    if (myProfile) {
                      setName(myProfile.name);
                      setBio(myProfile.bio);
                      setLink(myProfile.link || "");
                    }
                    setFormError("");
                    setIsEditing(false);
                  }}
                  className="text-xs text-foreground/60 hover:text-foreground px-3 py-1.5 rounded-lg border border-border cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProfile} className="bg-card/90 border border-foreground/15 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              {/* Field: Nama */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nama Anda / Nama Brand <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rian Pratama atau Creative Media Studio"
                  maxLength={70}
                  className="w-full h-10 px-3.5 rounded-xl bg-background border border-foreground/20 text-xs sm:text-sm text-foreground focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-colors"
                />
              </div>

              {/* Field: Foto Profil / Avatar */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  Foto Profil / Avatar <span className="text-foreground/50 font-normal">(Opsional)</span>
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="p-3.5 rounded-xl bg-background/80 border border-foreground/15 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Avatar Preview */}
                    <div className="relative group">
                      <ProfileAvatar avatar={avatar} name={name || "Profil"} className="w-14 h-14 rounded-full" />
                      {avatar && (
                        <button
                          type="button"
                          onClick={() => setAvatar("")}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-md"
                          title="Hapus Foto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Upload Buttons */}
                    <div className="flex-1 flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="h-9 px-4 rounded-xl bg-[hsl(var(--brand-accent))] hover:bg-[hsl(var(--brand-accent)/0.85)] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Memproses Foto...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{avatar ? "Ganti Foto Perangkat" : "Upload Foto dari Perangkat"}</span>
                          </>
                        )}
                      </button>

                      {avatar && (
                        <button
                          type="button"
                          onClick={() => setAvatar("")}
                          className="h-9 px-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Hapus</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Secondary option: URL input / Sample selection */}
                  <div className="pt-2 border-t border-foreground/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="Atau masukkan URL foto (https://...)"
                        className="flex-1 h-8 px-3 rounded-lg bg-card border border-foreground/15 text-[11px] text-foreground focus:outline-none focus:border-[hsl(var(--brand-accent))]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                      <span className="text-[10px] text-foreground/50 shrink-0">Atau pilih contoh:</span>
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
                        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
                      ].map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(url)}
                          className={`w-6 h-6 rounded-full overflow-hidden shrink-0 border transition-all cursor-pointer ${
                            avatar === url ? "border-[hsl(var(--brand-accent))] scale-110 shadow-md ring-2 ring-[hsl(var(--brand-accent)/0.4)]" : "border-neutral-700 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Field: Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Deskripsi Kerja Sama <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Jelaskan jenis kerja sama yang Anda cari atau tawarkan, keahlian, proyek yang sedang dijalankan, atau bentuk kolaborasi yang diinginkan..."
                  rows={6}
                  maxLength={1500}
                  className="w-full p-3.5 rounded-xl bg-background border border-foreground/20 text-xs sm:text-sm text-foreground focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-colors leading-relaxed resize-y"
                />
                <div className="text-[10px] text-foreground/50 text-right mt-1">
                  {bio.length}/1500 karakter
                </div>
              </div>

              {/* Field: Link Kontak / Website / WA */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Link Kontak / WhatsApp / Medsos / Website <span className="text-foreground/50 font-normal">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Contoh: https://wa.me/628123456789 atau https://instagram.com/nama_anda"
                  className="w-full h-10 px-3.5 rounded-xl bg-background border border-foreground/20 text-xs sm:text-sm text-foreground focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-colors"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-[hsl(var(--brand-accent))] hover:brightness-110 disabled:opacity-60 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan ke Direktori...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {isEditing ? "Perbarui Profil Kolaborasi" : "Publikasikan Profil Kolaborasi"}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Modal Konfirmasi Hapus Profil */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border text-card-foreground max-w-sm w-full rounded-2xl p-6 text-center space-y-4 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
                  <Trash2 className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-foreground">
                  Hapus Profil Kolaborasi?
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Profil Anda akan langsung dihapus dari direktori publik dan hasil pencarian. Anda tetap dapat membuat profil baru kapan saja dari perangkat ini.
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleting}
                    className="flex-1 h-9 rounded-xl bg-muted hover:bg-muted/80 text-xs font-semibold text-foreground transition-colors cursor-pointer border border-border"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteProfile}
                    disabled={deleting}
                    className="flex-1 h-9 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Ya, Hapus
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <BottomNavbar />
    </div>
  );
}
