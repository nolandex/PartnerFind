import React, { useState, useMemo, useEffect, useRef, memo } from "react";
import {
  Play,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  VideoLesson,
  ModuleSection,
  ClassCurriculum,
  getCurriculum,
  getSectionLabels,
} from "../data/foundationCurriculum";

export const cleanModuleDisplayTitle = (rawTitle: string): string => {
  return (
    rawTitle
      .replace(/^(Modul|Module|Módulo|Модуль|الوحدة|모듈|模块|モジュール)\s*\d*\s*[:—–-]\s*/i, "")
      .replace(/^(Modul|Module|Módulo|Модуль|الوحدة|모듈|模块|モジュール)\s*/i, "")
      .trim() || rawTitle
  );
};

interface ModuleCardProps {
  module: ModuleSection;
  classIdx: number;
  moduleIdx: number;
  onOpenModule: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onOpenModule,
}) => {
  const displayTitle = cleanModuleDisplayTitle(module.moduleTitle);

  return (
    <div
      onClick={onOpenModule}
      className="group relative cursor-pointer select-none rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col w-[210px] sm:w-[240px] md:w-[260px] shrink-0 border border-neutral-800/70 hover:border-neutral-600/80"
    >
      {/* 16:9 Aspect Ratio Thumbnail Image Tanpa Badge Tambahan */}
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-950">
        <img
          src={module.thumbnail}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            if (module.videos[0]?.videoId) {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${module.videos[0].videoId}/hqdefault.jpg`;
            }
          }}
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/20 transition-colors duration-300" />

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Judul Modul di Bawah Thumbnail */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          <h4 className="text-xs sm:text-[13px] font-semibold text-white leading-tight line-clamp-2 drop-shadow-md group-hover:text-white/90 transition-colors">
            {displayTitle}
          </h4>
        </div>
      </div>
    </div>
  );
};

interface ClassRowProps {
  cls: ClassCurriculum;
  classIdx: number;
  onOpenModule: (module: ModuleSection, classTitle: string) => void;
}

const ClassRow: React.FC<ClassRowProps> = ({ cls, classIdx, onOpenModule }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [cls.modules]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Baris Kelas: Judul Kelas Bersih & Navigasi Panah Geser */}
      <div className="flex items-center justify-between gap-3 px-1">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
          {cls.classTitle}
        </h3>

        {/* Tombol Geser Panah Kiri & Kanan */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Geser ke kiri"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollLeft
                ? "bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800"
                : "bg-neutral-950/40 border-neutral-800/40 text-neutral-600 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Geser ke kanan"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollRight
                ? "bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800"
                : "bg-neutral-950/40 border-neutral-800/40 text-neutral-600 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Baris Modul Horizontal yang Dapat Digeser (Scrollable Row) */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-2.5 pt-1 px-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent scroll-smooth select-none"
        style={{ scrollbarWidth: "thin" }}
      >
        {cls.modules.map((mod, modIdx) => (
          <ModuleCard
            key={mod.moduleTitle}
            module={mod}
            classIdx={classIdx}
            moduleIdx={modIdx}
            onOpenModule={() => onOpenModule(mod, cls.classTitle)}
          />
        ))}
      </div>
    </div>
  );
};

export const FreeFoundationSection: React.FC = memo(() => {
  const { locale } = useLanguage();
  // Tetap tertutup diawal sesuai aslinya
  const [isOpen, setIsOpen] = useState(false);

  // Active module modal state
  const [activeModuleData, setActiveModuleData] = useState<{
    module: ModuleSection;
    classTitle: string;
  } | null>(null);

  // Active video within the module modal
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);

  const curriculum: ClassCurriculum[] = useMemo(
    () => getCurriculum(locale),
    [locale]
  );
  const labels = useMemo(() => getSectionLabels(locale), [locale]);

  // Jika navigasi mengarah ke anchor #belajar-gratis, buka section
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "#belajar-gratis") {
        setIsOpen(true);
      }
      const handleHashChange = () => {
        if (window.location.hash === "#belajar-gratis") {
          setIsOpen(true);
        }
      };
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const handleOpenModule = (module: ModuleSection, classTitle: string) => {
    setActiveModuleData({ module, classTitle });
    // Default to the first video of the module for instant preview
    if (module.videos.length > 0) {
      setActiveVideo(module.videos[0]);
    } else {
      setActiveVideo(null);
    }
  };

  const handleCloseModal = () => {
    setActiveModuleData(null);
    setActiveVideo(null);
  };

  return (
    <section
      id="belajar-gratis"
      className={`${
        isOpen
          ? "py-8 sm:py-12 border-t border-white/[0.06]"
          : "py-3 sm:py-4 border-t border-white/[0.04]"
      } relative overflow-hidden bg-background`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl relative z-10">
        {!isOpen ? (
          /* ── TOMBOL BONUS KELAS (Aslinya Tertutup Diawal) ── */
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer text-xs sm:text-sm text-white/80 hover:text-white shadow-xs border border-white/5"
            >
              <span className="font-semibold">{labels.bonusTitle}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          /* ── SECTION KELAS TERBUKA: 5 BARIS MODUL DIGESER KESAMPING ── */
          <div className="animate-in fade-in duration-300">
            {/* Header Pengendali Kelas Terbuka */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.06]">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                {labels.bonusTitle}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/5"
              >
                <span>{labels.close}</span>
                <ChevronUp className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
              </button>
            </div>

            {/* Tampilan 5 Baris: Modul digeser horizontal */}
            <div className="space-y-8 sm:space-y-10">
              {curriculum.map((cls, classIdx) => (
                <ClassRow
                  key={cls.classTitle}
                  cls={cls}
                  classIdx={classIdx}
                  onOpenModule={handleOpenModule}
                />
              ))}
            </div>

            {/* Tombol Tutup di Bagian Bawah */}
            <div className="mt-10 pt-4 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById("belajar-gratis");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white text-xs font-medium transition-all cursor-pointer shadow-xs border border-white/5"
              >
                <ChevronUp className="w-3.5 h-3.5 text-white/50 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
                <span>{labels.closeClasses}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL POPUP MODUL & DAFTAR VIDEO PEMBELAJARAN (Sama Seperti Semula) ── */}
      <AnimatePresence>
        {activeModuleData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl flex flex-col max-h-[88vh] border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal Ringkas */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800">
                <div className="min-w-0">
                  <span className="text-[10.5px] text-zinc-400 font-mono block truncate uppercase tracking-wider">
                    {activeModuleData.classTitle}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
                    {activeModuleData.module.moduleTitle}
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  aria-label={labels.close}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player 16:9 Minimalis */}
              {activeVideo && (
                <div className="relative w-full aspect-video bg-black shrink-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              )}

              {/* Daftar Video Pelajaran (Saat Modul Diklik Muncul Lengkap) */}
              <div className="overflow-y-auto p-3 sm:p-4 space-y-1.5 flex-1">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-1">
                  {labels.lessonList} ({activeModuleData.module.videos.length} Video)
                </div>
                {activeModuleData.module.videos.map((vid, vIdx) => {
                  const isCurrent =
                    activeVideo?.videoId === vid.videoId &&
                    activeVideo?.title === vid.title;

                  return (
                    <div
                      key={vIdx}
                      onClick={() => setActiveVideo(vid)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-white/10 text-white font-medium shadow-xs"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Nomor / Status Play Indicator */}
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                          isCurrent
                            ? "bg-white text-black font-bold shadow-xs"
                            : "bg-white/5 text-white/50"
                        }`}
                      >
                        {isCurrent ? (
                          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                        ) : (
                          vIdx + 1
                        )}
                      </span>

                      {/* Judul Pelajaran */}
                      <span className="text-xs sm:text-sm truncate flex-1">
                        {vid.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
