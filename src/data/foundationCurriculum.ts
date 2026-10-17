import {
  VideoLesson,
  ModuleSection,
  ClassCurriculum,
  RawClass,
  YOUTUBE_IDS,
} from "./curriculum/types";
import { getLessonImage } from "./curriculumImages";
import { curriculumID } from "./curriculum/id";
import { curriculumEN } from "./curriculum/en";
import { curriculumAR } from "./curriculum/ar";
import { curriculumDE } from "./curriculum/de";
import { curriculumES } from "./curriculum/es";
import { curriculumFR } from "./curriculum/fr";
import { curriculumJA } from "./curriculum/ja";
import { curriculumKO } from "./curriculum/ko";
import { curriculumPT } from "./curriculum/pt";
import { curriculumRU } from "./curriculum/ru";
import { curriculumZH } from "./curriculum/zh";

export type { VideoLesson, ModuleSection, ClassCurriculum };

const getVideoId = (idx: number) => YOUTUBE_IDS[idx % YOUTUBE_IDS.length];

export interface FoundationSectionLabels {
  prev: string;
  next: string;
  close: string;
  closeClasses: string;
  bonusTitle: string;
  classesCount: string;
  modulesCount: string;
  videosCount: string;
  videosCountSuffix: string;
  viewLessons: string;
  lessonList: string;
  nowPlaying: string;
}

const SECTION_LABELS: Record<string, FoundationSectionLabels> = {
  "id-ID": {
    prev: "Sebelumnya",
    next: "Berikutnya",
    close: "Tutup",
    closeClasses: "Tutup Kelas",
    bonusTitle: "Bonus Kelas",
    classesCount: "5 Kelas",
    modulesCount: "28 Modul",
    videosCount: "152 Video",
    videosCountSuffix: "Video",
    viewLessons: "Buka Modul",
    lessonList: "Daftar Video Pembelajaran",
    nowPlaying: "Sedang Diputar",
  },
  "en-US": {
    prev: "Previous",
    next: "Next",
    close: "Close",
    closeClasses: "Close Classes",
    bonusTitle: "Bonus Classes",
    classesCount: "5 Classes",
    modulesCount: "28 Modules",
    videosCount: "152 Videos",
    videosCountSuffix: "Videos",
    viewLessons: "Open Module",
    lessonList: "Lesson Video List",
    nowPlaying: "Now Playing",
  },
  "es-ES": {
    prev: "Anterior",
    next: "Siguiente",
    close: "Cerrar",
    closeClasses: "Cerrar Clases",
    bonusTitle: "Clases Extra",
    classesCount: "5 Clases",
    modulesCount: "28 Módulos",
    videosCount: "152 Vídeos",
    videosCountSuffix: "Vídeos",
    viewLessons: "Abrir Módulo",
    lessonList: "Lista de Lecciones",
    nowPlaying: "Reproduciendo",
  },
  "fr-FR": {
    prev: "Précédent",
    next: "Suivant",
    close: "Fermer",
    closeClasses: "Fermer les Cours",
    bonusTitle: "Cours Bonus",
    classesCount: "5 Cours",
    modulesCount: "28 Modules",
    videosCount: "152 Vidéos",
    videosCountSuffix: "Vidéos",
    viewLessons: "Ouvrir le Module",
    lessonList: "Liste des Leçons",
    nowPlaying: "Lecture en cours",
  },
  "de-DE": {
    prev: "Zurück",
    next: "Weiter",
    close: "Schließen",
    closeClasses: "Kurse Schließen",
    bonusTitle: "Bonus-Kurse",
    classesCount: "5 Kurse",
    modulesCount: "28 Module",
    videosCount: "152 Videos",
    videosCountSuffix: "Videos",
    viewLessons: "Modul Öffnen",
    lessonList: "Lektionsliste",
    nowPlaying: "Wird abgespielt",
  },
  "ja-JP": {
    prev: "前へ",
    next: "次へ",
    close: "閉じる",
    closeClasses: "クラスを閉じる",
    bonusTitle: "ボーナス講座",
    classesCount: "5講座",
    modulesCount: "28モジュール",
    videosCount: "152レッスン",
    videosCountSuffix: "レッスン",
    viewLessons: "モジュールを開く",
    lessonList: "レッスン動画一覧",
    nowPlaying: "再生中",
  },
  "zh-CN": {
    prev: "上一课",
    next: "下一课",
    close: "关闭",
    closeClasses: "收起课程",
    bonusTitle: "免费进阶课",
    classesCount: "5门课",
    modulesCount: "28个模块",
    videosCount: "152节课",
    videosCountSuffix: "节课",
    viewLessons: "打开模块",
    lessonList: "课程视频列表",
    nowPlaying: "正在播放",
  },
  "ru-RU": {
    prev: "Назад",
    next: "Далее",
    close: "Закрыть",
    closeClasses: "Свернуть курсы",
    bonusTitle: "Бонусные курсы",
    classesCount: "5 курсов",
    modulesCount: "28 модулей",
    videosCount: "152 видео",
    videosCountSuffix: "Видео",
    viewLessons: "Открыть модуль",
    lessonList: "Список видеоуроков",
    nowPlaying: "Сейчас играет",
  },
  "ar-SA": {
    prev: "السابق",
    next: "التالي",
    close: "إغلاق",
    closeClasses: "إغلاق الدروس",
    bonusTitle: "دروس إضافية",
    classesCount: "5 دورات",
    modulesCount: "28 وحدة",
    videosCount: "152 فيديو",
    videosCountSuffix: "فيديو",
    viewLessons: "فتح الوحدة",
    lessonList: "قائمة الدروس",
    nowPlaying: "قيد التشغيل الآن",
  },
  "ko-KR": {
    prev: "이전",
    next: "다음",
    close: "닫기",
    closeClasses: "강좌 닫기",
    bonusTitle: "보너스 강좌",
    classesCount: "5개 강좌",
    modulesCount: "28개 모듈",
    videosCount: "152개 영상",
    videosCountSuffix: "영상",
    viewLessons: "모듈 열기",
    lessonList: "학습 영상 목록",
    nowPlaying: "재생 중",
  },
  "pt-PT": {
    prev: "Anterior",
    next: "Seguinte",
    close: "Fechar",
    closeClasses: "Fechar Aulas",
    bonusTitle: "Aulas Bónus",
    classesCount: "5 Cursos",
    modulesCount: "28 Módulos",
    videosCount: "152 Vídeos",
    videosCountSuffix: "Vídeos",
    viewLessons: "Abrir Módulo",
    lessonList: "Lista de Aulas",
    nowPlaying: "A Reproduzir",
  },
};

/**
 * Cleans prefix numbers or words from video titles.
 */
export function cleanVideoTitle(rawTitle: string): string {
  return rawTitle
    .replace(/^(?:(?:video|vídeo|vidéo|видео|動画|视频|영상|فيديو)\s*\d+[\s.:–—-]*|\d+\s*[:.–—-])\s*/i, "")
    .trim();
}

/**
 * Returns curriculum for any locale based on language code.
 */
export function getCurriculum(locale: string): ClassCurriculum[] {
  let rawClasses: RawClass[] = curriculumEN;

  if (locale.startsWith("id")) rawClasses = curriculumID;
  else if (locale.startsWith("es")) rawClasses = curriculumES;
  else if (locale.startsWith("de")) rawClasses = curriculumDE;
  else if (locale.startsWith("fr")) rawClasses = curriculumFR;
  else if (locale.startsWith("ar")) rawClasses = curriculumAR;
  else if (locale.startsWith("ja")) rawClasses = curriculumJA;
  else if (locale.startsWith("ko")) rawClasses = curriculumKO;
  else if (locale.startsWith("pt")) rawClasses = curriculumPT;
  else if (locale.startsWith("ru")) rawClasses = curriculumRU;
  else if (locale.startsWith("zh")) rawClasses = curriculumZH;

  let globalVideoCounter = 0;
  return rawClasses.map((cls, classIdx) => ({
    classTitle: cls.classTitle,
    modules: cls.modules.map((mod, modIdx) => {
      const moduleThumbnail = getLessonImage(classIdx, modIdx, 0);
      return {
        moduleTitle: mod.moduleTitle,
        thumbnail: moduleThumbnail,
        videos: mod.videoTitles.map((title, vidIdx) => {
          const vid = getVideoId(globalVideoCounter);
          const thumbnail = getLessonImage(classIdx, modIdx, vidIdx);
          globalVideoCounter += 1;
          return {
            title: cleanVideoTitle(title),
            videoId: vid,
            thumbnail,
          };
        }),
      };
    }),
  }));
}

export function getSectionLabels(locale: string): FoundationSectionLabels {
  return SECTION_LABELS[locale] || SECTION_LABELS["en-US"] || SECTION_LABELS["id-ID"];
}
