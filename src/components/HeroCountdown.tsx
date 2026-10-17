import React, { useState, useEffect, memo } from "react";
import { Timer } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  AnnouncementBarConfig,
  getCachedAnnouncement,
  subscribeAnnouncement,
  normalizeTargetDate,
} from "../lib/announcementService";
import {
  getCachedWebsiteContent,
  subscribeWebsiteContent,
  getLocalizedText
} from "../lib/websiteContentService";

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

const UNIT_LABELS: Record<
  string,
  { days: string; hours: string; mins: string; secs: string; title: string }
> = {
  "id-ID": {
    days: "HARI",
    hours: "JAM",
    mins: "MENIT",
    secs: "DETIK",
    title: "pendaftaran di tutup dalam",
  },
  "en-US": {
    days: "DAYS",
    hours: "HOURS",
    mins: "MINS",
    secs: "SECS",
    title: "Registration Closes In",
  },
  "es-ES": {
    days: "DÍAS",
    hours: "HORAS",
    mins: "MINS",
    secs: "SEGS",
    title: "El registro cierra en",
  },
  "fr-FR": {
    days: "JOURS",
    hours: "HEURES",
    mins: "MINS",
    secs: "SECS",
    title: "Inscriptions closes dans",
  },
  "ja-JP": {
    days: "日",
    hours: "時間",
    mins: "分",
    secs: "秒",
    title: "登録締切まで",
  },
  "de-DE": {
    days: "TAGE",
    hours: "STD",
    mins: "MIN",
    secs: "SEK",
    title: "Anmeldung schließt in",
  },
  "zh-CN": {
    days: "天",
    hours: "时",
    mins: "分",
    secs: "秒",
    title: "报名截止倒计时",
  },
  "ru-RU": {
    days: "ДНЕЙ",
    hours: "ЧАСОВ",
    mins: "МИН",
    secs: "СЕК",
    title: "Регистрация закроется через",
  },
  "ar-SA": {
    days: "أيام",
    hours: "ساعات",
    mins: "دقائق",
    secs: "ثوانٍ",
    title: "يغلق التسجيل خلال",
  },
  "ko-KR": {
    days: "일",
    hours: "시간",
    mins: "분",
    secs: "초",
    title: "등록 마감까지",
  },
  "pt-PT": {
    days: "DIAS",
    hours: "HORAS",
    mins: "MINS",
    secs: "SEGS",
    title: "Inscrições encerram em",
  },
  "tr-TR": {
    days: "GÜN",
    hours: "SAAT",
    mins: "DK",
    secs: "SN",
    title: "Kayıtların kapanmasına kalan",
  },
};

interface HeroCountdownProps {
  triggerPulse?: number;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = memo(({ triggerPulse = 0 }) => {
  const { locale } = useLanguage();
  const [config, setConfig] = useState<AnnouncementBarConfig>(getCachedAnnouncement);
  const [contentConfig, setContentConfig] = useState(getCachedWebsiteContent);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeLeft(config.targetDate)
  );
  const [isPulsing, setIsPulsing] = useState(false);

  // Trigger pulse animation when triggerPulse prop increments (e.g. when search bar is clicked)
  useEffect(() => {
    if (triggerPulse > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [triggerPulse]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribeAnnouncement = subscribeAnnouncement((updated) => {
      setConfig(updated);
      setTimeLeft(calculateTimeLeft(updated.targetDate));
    });

    const unsubscribeContent = subscribeWebsiteContent((updated) => {
      setContentConfig(updated);
    });

    return () => {
      unsubscribeAnnouncement();
      unsubscribeContent();
    };
  }, []);

  // 1-second ticker with auto-roll handling
  useEffect(() => {
    if (!config.enabled) return;

    const timer = setInterval(() => {
      let currentTarget = config.targetDate;
      let left = calculateTimeLeft(currentTarget);

      if (left.isExpired && config.autoRollDays && config.autoRollDays > 0) {
        currentTarget = normalizeTargetDate(currentTarget, config.autoRollDays);
        left = calculateTimeLeft(currentTarget);
      }

      setTimeLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [config.enabled, config.targetDate, config.autoRollDays]);

  if (!config.enabled) return null;

  const currentStrings = UNIT_LABELS[locale] || UNIT_LABELS["id-ID"];
  const isEn = locale?.startsWith("en");

  // Determine display message: priority to custom countdownTitle from Admin
  let displayMessage = getLocalizedText(contentConfig, locale, 'countdownTitle', '') || ((isEn && config.messageEn) ? config.messageEn : config.message);
  if (
    !displayMessage ||
    displayMessage === "Pendaftaran ditutup dalam:" ||
    displayMessage === "Pendaftaran ditutup dalam" ||
    displayMessage === "Pendaftaran di tutup dalam" ||
    displayMessage === "pendaftaran di tutup dalam" ||
    displayMessage === "Registration closes in:" ||
    displayMessage === "Registration Closes In" ||
    displayMessage === "Ditutup dalam:" ||
    displayMessage === "Event dimulai dalam:" ||
    displayMessage === "Event dimulai dalam" ||
    displayMessage === "Event starts in:" ||
    displayMessage === "Event Starts In"
  ) {
    displayMessage = currentStrings.title;
  }

  return (
    <div
      id="hero-countdown-section"
      className="w-full max-w-xl mx-auto mt-7 sm:mt-9 relative z-20 text-center select-none"
    >
      {/* Ambient background soft glow (static, lightweight, constant color) */}
      <div
        className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-full blur-3xl opacity-35 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, hsl(var(--brand-accent) / 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Countdown Timer Block (Animates as a whole unit, keeping all colors strictly unchanged) */}
      <div
        className={`transition-transform duration-300 ease-out origin-center ${
          isPulsing ? "scale-105 sm:scale-108" : "scale-100"
        }`}
      >
        {/* Header Message */}
        <div className="inline-flex items-center justify-center gap-2 mb-3.5 sm:mb-5">
          <Timer className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-muted-foreground" />
          <span className="text-sm sm:text-base font-semibold tracking-wide text-foreground/80">
            {displayMessage}
          </span>
        </div>

        {/* Large Prominent Countdown Digits */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight leading-none text-foreground">
              {pad(timeLeft.days)}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground mt-2 uppercase">
              {currentStrings.days}
            </span>
          </div>

          <span className="text-2xl sm:text-4xl text-foreground/30 font-light -mt-4 sm:-mt-5 select-none">
            :
          </span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight leading-none text-foreground">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground mt-2 uppercase">
              {currentStrings.hours}
            </span>
          </div>

          <span className="text-2xl sm:text-4xl text-foreground/30 font-light -mt-4 sm:-mt-5 select-none">
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight leading-none text-foreground">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground mt-2 uppercase">
              {currentStrings.mins}
            </span>
          </div>

          <span className="text-2xl sm:text-4xl text-foreground/30 font-light -mt-4 sm:-mt-5 select-none">
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight leading-none text-foreground">
              {pad(timeLeft.seconds)}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground mt-2 uppercase">
              {currentStrings.secs}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
