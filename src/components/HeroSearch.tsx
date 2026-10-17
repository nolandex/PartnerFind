import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { subscribeProfileAccess, getCachedProfileAccess } from "../lib/profileAccessService";
import { getCachedWebsiteContent, subscribeWebsiteContent, getLocalizedText } from "../lib/websiteContentService";

interface HeroSearchProps {
  onSearchClick?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = memo(({ onSearchClick }) => {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(getCachedProfileAccess);
  const [contentConfig, setContentConfig] = useState(getCachedWebsiteContent);
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeProfileAccess((enabled) => {
      setIsUnlocked(enabled);
    });
    const unsubscribeContent = subscribeWebsiteContent((cfg) => {
      setContentConfig(cfg);
    });
    return () => {
      unsubscribe();
      unsubscribeContent();
    };
  }, []);

  const handleSearchClick = useCallback(
    (e?: React.MouseEvent | React.TouchEvent | React.FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (isUnlocked) {
        // When active, navigating directly to the profile directory page
        const trimmed = searchQuery.trim();
        const targetUrl = trimmed ? `/profile?q=${encodeURIComponent(trimmed)}` : "/profile";
        navigate(targetUrl);
        return;
      }

      // When deactivated / locked:
      setIsActive(true);
      if (activeTimerRef.current) {
        clearTimeout(activeTimerRef.current);
      }
      activeTimerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 500);

      // Trigger animation on countdown below
      if (onSearchClick) {
        onSearchClick();
      }
    },
    [isUnlocked, searchQuery, navigate, onSearchClick]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  useEffect(() => {
    return () => {
      if (activeTimerRef.current) {
        clearTimeout(activeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto relative z-30">
      {/* Search Bar Container */}
      <div
        id="hero-search-bar"
        role="button"
        tabIndex={0}
        onClick={handleSearchClick}
        onKeyDown={(e) => {
          if (!isUnlocked && (e.key === "Enter" || e.key === " ")) {
            handleSearchClick();
          }
        }}
        className="relative w-full group cursor-pointer select-none text-left"
        aria-label={t("search_placeholder") || "Cari mitra & profil kerja sama"}
      >
        {/* Ambient breathing glow behind search bar (Original full ambient glow) */}
        <div
          className={`absolute -inset-2.5 sm:-inset-3.5 rounded-3xl blur-2xl pointer-events-none -z-10 transition-all duration-300 ${
            isActive ? "opacity-100 scale-103" : "opacity-60 group-hover:opacity-85 scale-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--brand-accent) / 0.45) 0%, hsl(var(--brand-accent) / 0.18) 55%, transparent 75%)",
          }}
        />

        <div
          className={`relative flex items-center w-full h-14 sm:h-16 pl-4.5 sm:pl-6 pr-3 sm:pr-4 rounded-2xl sm:rounded-3xl bg-neutral-950/95 hover:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 shadow-2xl shadow-black/60 overflow-hidden cursor-pointer ${
            isActive ? "scale-[0.99]" : ""
          }`}
        >
          {/* Subtle light sweep across the bar */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.div
              animate={{
                x: ["-100%", "250%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-1/3 h-full -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--brand-accent) / 0.15), transparent)",
              }}
            />
          </div>

          {/* Search Icon (Always Search icon) */}
          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mr-3 sm:mr-4">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Interactive Input when Active, or Placeholder Display when Locked */}
          {isUnlocked ? (
            <div className="flex-1 flex items-center min-w-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                placeholder={getLocalizedText(contentConfig, locale, 'searchPlaceholder', t("search_placeholder"))}
                className="w-full bg-transparent text-base sm:text-lg md:text-[19px] text-foreground placeholder-muted-foreground font-medium focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleSearchClick}
                aria-label="Cari Profil"
                className="group/btn ml-2 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground flex items-center justify-center shrink-0 transition-all border border-border cursor-pointer active:scale-95 shadow-sm"
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center min-w-0 pointer-events-none select-none">
              <span className="text-base sm:text-lg md:text-[19px] text-foreground/80 group-hover:text-foreground font-medium truncate tracking-tight transition-colors">
                {getLocalizedText(contentConfig, locale, 'searchPlaceholder', t("search_placeholder"))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

HeroSearch.displayName = "HeroSearch";


