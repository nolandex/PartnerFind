import React, { useState, useEffect } from "react";
import { CircleDollarSign } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { subscribeHeroCounter, getCachedGroupCount } from "../lib/heroCounterService";

export const COLLAB_VALUE_LABELS: Record<string, string> = {
  "id-ID": "Total Nilai Kolaborasi",
  "en-US": "Total Collaboration Value",
  "es-ES": "Valor Total de Colaboración",
  "fr-FR": "Valeur Totale des Collaborations",
  "ja-JP": "総コラボレーション取引額",
  "de-DE": "Gesamter Kooperationswert",
  "zh-CN": "合作总交易额",
  "ru-RU": "Общая стоимость коллабораций",
  "ar-SA": "إجمالي قيمة التعاون",
  "ko-KR": "총 협업 거래 가치",
  "pt-PT": "Valor Total de Colaboração",
  "tr-TR": "Toplam İş Birliği Değeri",
};

interface TotalCollabSectionProps {
  className?: string;
  opportunityCount?: number;
}

export const TotalCollabSection: React.FC<TotalCollabSectionProps> = ({
  className = "",
  opportunityCount,
}) => {
  const { locale } = useLanguage();
  const [collabValue, setCollabValue] = useState<number>(485000000);

  useEffect(() => {
    const unsubscribe = subscribeHeroCounter((heroCfg) => {
      if ((heroCfg as any).totalCollaborationValue) {
        setCollabValue((heroCfg as any).totalCollaborationValue);
      }
    });
    return () => unsubscribe();
  }, []);

  const effectiveOpportunities = opportunityCount ?? getCachedGroupCount();
  const effectiveCollabValue =
    collabValue > 0
      ? collabValue
      : (effectiveOpportunities > 0 ? effectiveOpportunities : 342180) * 1420;
  const formattedUsd = `$${effectiveCollabValue.toLocaleString("en-US")}+`;

  const label = COLLAB_VALUE_LABELS[locale] || COLLAB_VALUE_LABELS["id-ID"];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Header Label */}
      <div className="inline-flex items-center justify-center gap-2 mb-3.5 sm:mb-4">
        <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-400" />
        <span className="text-sm sm:text-base font-semibold tracking-wide text-neutral-200">
          {label}
        </span>
      </div>

      {/* Large Prominent Display matching countdown aesthetic */}
      <div className="flex flex-col items-center">
        <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight leading-none text-white">
          {formattedUsd}
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 mt-2 uppercase">
          USD
        </span>
      </div>
    </div>
  );
};
