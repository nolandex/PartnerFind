import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  AnnouncementBarConfig,
  getCachedAnnouncement,
  subscribeAnnouncement,
  normalizeTargetDate,
} from "../lib/announcementService";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetIso: string): CountdownTime {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const difference = targetMs - nowMs;

  if (isNaN(targetMs) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
}

function pad(num: number): string {
  return String(num).padStart(2, "0");
}

export function CountdownAnnouncementBar() {
  const { locale } = useLanguage();
  const [config, setConfig] = useState<AnnouncementBarConfig>(getCachedAnnouncement);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeLeft(config.targetDate)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeAnnouncement((updated) => {
      setConfig(updated);
      setTimeLeft(calculateTimeLeft(updated.targetDate));
    });
    return () => unsubscribe();
  }, []);

  // 1-second interval timer
  useEffect(() => {
    if (!config.enabled) return;

    const timer = setInterval(() => {
      let currentTarget = config.targetDate;
      let left = calculateTimeLeft(currentTarget);

      // If expired and autoRollDays is enabled, roll target forward
      if (left.isExpired && config.autoRollDays && config.autoRollDays > 0) {
        currentTarget = normalizeTargetDate(currentTarget, config.autoRollDays);
        left = calculateTimeLeft(currentTarget);
      }

      setTimeLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [config.enabled, config.targetDate, config.autoRollDays]);

  const isVisible = config.enabled;

  // Sync height to CSS variable --announcement-bar-height
  useEffect(() => {
    const updateHeight = () => {
      if (isVisible && containerRef.current) {
        const height = containerRef.current.offsetHeight || 28;
        document.documentElement.style.setProperty("--announcement-bar-height", `${height}px`);
      } else {
        document.documentElement.style.setProperty("--announcement-bar-height", "0px");
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.setProperty("--announcement-bar-height", "0px");
    };
  }, [isVisible, timeLeft]);

  // Detect locale properly for translations
  const lang = locale || "id-ID";
  const isEn = lang.startsWith("en");
  const isPt = lang.startsWith("pt");
  const isEs = lang.startsWith("es");
  const isFr = lang.startsWith("fr");
  const isJa = lang.startsWith("ja");
  const isDe = lang.startsWith("de");
  const isRu = lang.startsWith("ru");
  const isAr = lang.startsWith("ar");
  const isKo = lang.startsWith("ko");

  let displayMessage = (isEn && config.messageEn) ? config.messageEn : config.message;
  
  // Detect standard/default strings that should be localized
  const isStandardMessage = !displayMessage || 
    displayMessage === "Ditutup dalam:" || 
    displayMessage === "Closes in:" || 
    displayMessage.toLowerCase().includes("pendaftaran") ||
    displayMessage.includes("Registration") ||
    displayMessage.toLowerCase().includes("event") ||
    (lang.startsWith("id") && !displayMessage.toLowerCase().includes("pra"));

  if (isStandardMessage) {
    if (isPt) displayMessage = "Inscrições encerram em:";
    else if (isEs) displayMessage = "El registro cierra en:";
    else if (isFr) displayMessage = "Inscriptions closes dans :";
    else if (isJa) displayMessage = "登録締切まで：";
    else if (isDe) displayMessage = "Anmeldung schließt in:";
    else if (isRu) displayMessage = "Регистрация закроется через:";
    else if (isAr) displayMessage = "يغلق التسجيل خلال:";
    else if (isKo) displayMessage = "등록 마감까지:";
    else if (isEn) displayMessage = "Pre-registration Closes In:";
    else displayMessage = "Pra Registrasi ditutup dalam";
  }

  // Format time labels based on language
  let daysLabel = "d", hoursLabel = "h", minsLabel = "m", secsLabel = "s";
  
  if (lang.startsWith("id")) {
    daysLabel = "h"; hoursLabel = "j"; secsLabel = "d";
  } else if (isFr) {
    daysLabel = "j";
  } else if (isDe) {
    daysLabel = "T";
  } else if (isRu) {
    daysLabel = "д"; hoursLabel = "ч"; minsLabel = "м"; secsLabel = "с";
  } else if (isAr) {
    daysLabel = "ي"; hoursLabel = "س"; minsLabel = "د"; secsLabel = "ث";
  } else if (isJa) {
    daysLabel = "日"; hoursLabel = "時"; minsLabel = "分"; secsLabel = "秒";
  } else if (isKo) {
    daysLabel = "일"; hoursLabel = "시"; minsLabel = "분"; secsLabel = "초";
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          ref={containerRef}
          aria-label="Announcement"
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[60] bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-900 text-neutral-400 text-xs sm:text-[13px] select-none h-8 sm:h-9 flex items-center justify-center px-4"
        >
          <div className="flex items-center justify-center gap-2.5 whitespace-nowrap overflow-hidden text-ellipsis">
            {/* Message */}
            <span className="truncate font-medium text-neutral-300">
              {displayMessage}
            </span>

            {/* Countdown Numbers */}
            <span className="font-mono text-white font-bold tracking-tight inline-flex items-center gap-1.5 shrink-0">
              {timeLeft.days > 0 && <span>{pad(timeLeft.days)}{daysLabel}</span>}
              <span>{pad(timeLeft.hours)}{hoursLabel}</span>
              <span>{pad(timeLeft.minutes)}{minsLabel}</span>
              <span className="text-[hsl(var(--brand-accent))]">{pad(timeLeft.seconds)}{secsLabel}</span>
            </span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
