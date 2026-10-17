import React, { useState, useMemo, useEffect, memo } from "react";
import {
  Search,
  Users,
  X,
  ExternalLink,
  Globe,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MemberProfile } from "../data/profilesData";
import { useLanguage } from "../context/LanguageContext";
import { subscribeToProfiles, isCreatorUnlocked } from "../lib/profileService";

interface NetworkDirectoryProps {
  initialSearchQuery?: string;
  onClearSearch?: () => void;
}

// Helper to determine the best actionable link for a profile
export function getProfileLink(profile: MemberProfile): string {
  if (profile.link && profile.link.trim() !== "") {
    const raw = profile.link.trim();
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
    if (raw.startsWith("wa.me") || raw.startsWith("t.me")) return `https://${raw}`;
    if (raw.startsWith("@")) return `https://t.me/${raw.replace("@", "")}`;
    return `https://${raw}`;
  }
  if (profile.contact?.whatsapp) {
    const num = profile.contact.whatsapp.replace(/[^0-9]/g, "");
    return `https://wa.me/${num}?text=Halo%20${encodeURIComponent(
      profile.name
    )},%20saya%20melihat%20profil%20Anda%20di%20PartnerFind.%20Salam%20kenal!`;
  }
  if (profile.contact?.telegram) {
    const handle = profile.contact.telegram.replace("@", "");
    return `https://t.me/${handle}`;
  }
  if (profile.contact?.instagram) {
    const handle = profile.contact.instagram.replace("@", "");
    return `https://instagram.com/${handle}`;
  }
  if (profile.contact?.linkedin) {
    return `https://linkedin.com/in/${profile.contact.linkedin}`;
  }
  return "";
}

// Label helper for the link
function getLinkLabel(linkUrl: string): { label: string; icon: React.ReactNode } {
  if (!linkUrl) return { label: "Detail", icon: <ExternalLink className="w-3 h-3" /> };
  if (linkUrl.includes("wa.me") || linkUrl.includes("whatsapp")) {
    return { label: "WhatsApp", icon: <MessageCircle className="w-3 h-3 text-emerald-400" /> };
  }
  if (linkUrl.includes("t.me") || linkUrl.includes("telegram")) {
    return { label: "Telegram", icon: <MessageCircle className="w-3 h-3 text-sky-400" /> };
  }
  if (linkUrl.includes("instagram.com")) {
    return { label: "Instagram", icon: <Globe className="w-3 h-3 text-pink-400" /> };
  }
  return { label: "Hubungi", icon: <ExternalLink className="w-3 h-3 text-neutral-300" /> };
}

// Helper component for profile photo / avatar thumbnail with error fallback
export function ProfileAvatar({
  avatar,
  name,
  className = "w-6 h-6 sm:w-7 sm:h-7",
}: {
  avatar?: string;
  name: string;
  className?: string;
}) {
  const [imgError, setImgError] = React.useState(false);
  const initial = (name || "P").trim().charAt(0).toUpperCase();

  if (avatar && !imgError) {
    return (
      <img
        src={avatar}
        alt={name}
        onError={() => setImgError(true)}
        className={`${className} rounded-full object-cover shrink-0 border border-border shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-muted text-foreground font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0 border border-border shadow-sm uppercase select-none`}
    >
      {initial}
    </div>
  );
}

export const NetworkDirectory: React.FC<NetworkDirectoryProps> = memo(
  ({ initialSearchQuery = "", onClearSearch }) => {
    const { t } = useLanguage();
    const [profiles, setProfiles] = useState<MemberProfile[]>(() => {
      try {
        const saved = localStorage.getItem("custom_member_profiles");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (_e) {
        // ignore
      }
      return [];
    });

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedProfile, setSelectedProfile] = useState<MemberProfile | null>(null);
    const [hasCreatorAccess, setHasCreatorAccess] = useState<boolean>(false);

    useEffect(() => {
      setHasCreatorAccess(isCreatorUnlocked());
      const unsubscribe = subscribeToProfiles((updated) => {
        setProfiles(updated);
      });
      return () => unsubscribe();
    }, []);

    // Filter profiles
    const filteredProfiles = useMemo(() => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return profiles;

      return profiles.filter((p) => {
        const matchName = p.name?.toLowerCase().includes(query);
        const matchBio = p.bio?.toLowerCase().includes(query);
        const matchHeadline = p.headline?.toLowerCase().includes(query);
        const matchNiche = p.niche?.toLowerCase().includes(query);
        const matchLooking = p.lookingFor?.toLowerCase().includes(query);
        const matchLink = p.link?.toLowerCase().includes(query);

        return (
          matchName ||
          matchBio ||
          matchHeadline ||
          matchNiche ||
          matchLooking ||
          matchLink
        );
      });
    }, [profiles, searchQuery]);

    const handleOpenLink = (e: React.MouseEvent, url: string, profile: MemberProfile) => {
      e.stopPropagation();
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        setSelectedProfile(profile);
      }
    };

    return (
      <div className="w-full mx-auto space-y-3 sm:space-y-4">
        {/* Top Header: Slim Search & Profile Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
          {/* Search Input Ramping & Tidak Makan Tempat */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search_placeholder") || "Cari nama, keahlian, atau kerja sama..."}
              className="w-full h-9.5 sm:h-10 pl-9 pr-8 rounded-lg bg-card border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  if (onClearSearch) onClearSearch();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Count & Creator Action */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-muted-foreground shrink-0">
            {hasCreatorAccess && (
              <Link
                to="/buat-profil"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border text-[11px] font-medium transition-colors"
              >
                <UserCheck className="w-3 h-3 text-foreground/70" />
                <span>Kelola Profil</span>
              </Link>
            )}
            <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2.5 py-1.5 rounded-lg border border-border">
              <strong className="text-foreground font-mono">{filteredProfiles.length}</strong> profil
            </span>
          </div>
        </div>

        {/* 1 Baris 2 Profil (2 Kolom) - Mengutamakan Ruang Deskripsi yang Luas */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {filteredProfiles.map((profile) => {
              const displayDesc = profile.bio || profile.headline || profile.lookingFor || "";
              const targetUrl = getProfileLink(profile);
              const linkInfo = getLinkLabel(targetUrl);

              return (
                <motion.div
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedProfile(profile)}
                  className="bg-card hover:bg-card/95 border border-border hover:border-foreground/20 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer group relative overflow-hidden text-card-foreground"
                >
                  <div className="flex-1">
                    {/* Header Card Ringkas: Avatar Kecil + Nama + Niche */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <ProfileAvatar
                        avatar={profile.avatar}
                        name={profile.name}
                        className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
                      />
                      <div className="min-w-0 flex-1 flex items-center justify-between gap-1.5">
                        <h3 className="font-semibold text-xs sm:text-[13px] text-foreground group-hover:text-foreground transition-colors truncate">
                          {profile.name}
                        </h3>
                        {profile.niche && (
                          <span className="text-[9.5px] sm:text-[10.5px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0 max-w-[110px] truncate">
                            {profile.niche}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Deskripsi Banyak & Padat (Memuat Teks Panjang) */}
                    <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-relaxed line-clamp-6 sm:line-clamp-8 font-normal">
                      {displayDesc}
                    </p>
                  </div>

                  {/* Footer Card Sangat Tipis & Rapi */}
                  <div className="pt-2 mt-2 border-t border-border flex items-center justify-between gap-1.5 shrink-0">
                    {targetUrl ? (
                      <button
                        type="button"
                        onClick={(e) => handleOpenLink(e, targetUrl, profile)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-muted/80 text-foreground text-[10.5px] font-medium transition-colors border border-border"
                      >
                        {linkInfo.icon}
                        <span>{linkInfo.label}</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Profil</span>
                    )}

                    <span className="text-[10.5px] text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-0.5 font-medium">
                      <span>Detail</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12 px-5 bg-card border border-border rounded-xl max-w-md mx-auto shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-muted text-muted-foreground flex items-center justify-center mx-auto mb-2.5 border border-border">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              Belum Ada Profil Kerja Sama
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-4 leading-relaxed">
              Belum ada partner yang mendaftarkan profilnya. Jadilah yang pertama membuat profil!
            </p>
            <Link
              to="/buat-profil"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-foreground text-background hover:opacity-90 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Buat Profil Kerja Sama</span>
            </Link>
          </div>
        ) : (
          <div className="text-center py-10 px-5 bg-card border border-border rounded-xl max-w-md mx-auto shadow-sm">
            <Users className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
              Tidak ada profil yang cocok
            </h3>
            <p className="text-[11px] text-muted-foreground max-w-xs mx-auto mb-3">
              Coba cari dengan kata kunci lain atau periksa ejaan.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                if (onClearSearch) onClearSearch();
              }}
              className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 text-xs font-medium text-foreground transition-colors cursor-pointer border border-border"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Modal Detail Profil (Ringkas & Proporsional) */}
        <AnimatePresence>
          {selectedProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProfile(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-4 sm:p-5 flex flex-col max-h-[85vh] text-card-foreground"
              >
                {/* Close Button X Top Right */}
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header: Foto + Nama + Niche */}
                <div className="flex items-center gap-3 mb-3 pr-6">
                  <ProfileAvatar
                    avatar={selectedProfile.avatar}
                    name={selectedProfile.name}
                    className="w-10 h-10 sm:w-11 sm:h-11 shrink-0"
                  />
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-bold text-foreground truncate leading-snug">
                      {selectedProfile.name}
                    </h2>
                    {selectedProfile.niche && (
                      <span className="inline-block mt-0.5 text-[11px] text-muted-foreground">
                        {selectedProfile.niche}
                      </span>
                    )}
                  </div>
                </div>

                {/* Area Deskripsi / Bio */}
                <div className="w-full bg-muted/60 border border-border rounded-xl p-3 sm:p-3.5 mb-3.5 flex-1 overflow-y-auto">
                  <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line font-normal">
                    {selectedProfile.bio || selectedProfile.headline || selectedProfile.lookingFor}
                  </p>
                </div>

                {/* Action Buttons Ringkas */}
                <div className="flex items-center gap-2 mt-auto">
                  {(() => {
                    const targetUrl = getProfileLink(selectedProfile);
                    const linkInfo = getLinkLabel(targetUrl);
                    if (targetUrl) {
                      return (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 px-3 rounded-lg bg-foreground text-background font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm hover:opacity-90"
                        >
                          {linkInfo.icon}
                          <span>
                            {linkInfo.label.startsWith("Buka") ? linkInfo.label : `Buka ${linkInfo.label}`}
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-75" />
                        </a>
                      );
                    }
                    return null;
                  })()}

                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="px-3.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-medium text-foreground transition-colors cursor-pointer border border-border"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
