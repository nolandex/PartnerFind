import { createContext, useContext, useMemo, ReactNode } from "react";
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { COURSE_LANGUAGES, LOCALE_TO_CODE, CourseLanguage } from "../lib/courseLanguages";

export type { CourseLanguage };
export const LANGUAGES = COURSE_LANGUAGES;

interface ColorContextValue {
  selectedLang: CourseLanguage;
}

const ColorContext = createContext<ColorContextValue>({
  selectedLang: COURSE_LANGUAGES[0],
});

export function ColorProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();

  const selectedLang = useMemo(() => {
    const code = LOCALE_TO_CODE[locale] || "id";
    return COURSE_LANGUAGES.find((l) => l.code === code) || COURSE_LANGUAGES[0];
  }, [locale]);

  const value = useMemo(() => ({ selectedLang }), [selectedLang]);

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}
