import { COURSE_LANGUAGES } from "./courseLanguages";
import { COURSE_CONTENT, getLocalizedCourseContent } from "./courseContent";

export interface Module {
  id: string;
  title: string;
  youtube_link: string;
  content_type?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string;
  modules: Module[];
}

export interface Category {
  id: string;
  name: string;
}

const CATEGORIES: Category[] = [
  { id: "finance", name: "Finance & Investment" },
  { id: "business", name: "Business & Entrepreneurship" },
  { id: "money", name: "Money & Wealth" },
  { id: "mindset", name: "Mindset & Habits" },
  { id: "health", name: "Health & Fitness" },
  { id: "mental_health", name: "Mental Health & Wellbeing" },
  { id: "nutrition", name: "Nutrition & Diet" },
  { id: "tech", name: "Technology & Coding" },
  { id: "data", name: "Data Science & AI" },
  { id: "design", name: "Design & UI/UX" },
];

interface BaseCourse {
  id: string;
  image_url: string;
  category_id: string;
  modules: Omit<Module, "title">[];
}

const COURSE_BASES: BaseCourse[] = [
  {
    id: "mental-health",
    image_url:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    category_id: "mental_health",
    modules: [
      { id: "m1", youtube_link: "SqcY0GlETPk" },
      { id: "m2", youtube_link: "RGKi6LSPDLU" },
    ],
  },
  {
    id: "ai-tools",
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category_id: "data",
    modules: [
      { id: "m1", youtube_link: "W6NZfCO5SIk" },
      { id: "m2", youtube_link: "h33Srr5J9nY" },
    ],
  },

  {
    id: "saham-dasar",
    image_url:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    category_id: "finance",
    modules: [
      { id: "m1", youtube_link: "qz0aGYrrlhU" },
      { id: "m2", youtube_link: "salY_Sm6mv4" },
      { id: "m3", youtube_link: "1Rs2ND1ryYc" },
      { id: "m4", youtube_link: "fYq5PXgSsbE" },
    ],
  },
  {
    id: "kripto-dasar",
    image_url:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category_id: "finance",
    modules: [
      { id: "m1", youtube_link: "W6NZfCO5SIk" },
      { id: "m2", youtube_link: "h33Srr5J9nY" },
      { id: "m3", youtube_link: "V_Kr9OSfDeU" },
      { id: "m4", youtube_link: "cRHQNNkYi1A" },
    ],
  },
  {
    id: "laporan-keuangan",
    image_url:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    category_id: "finance",
    modules: [
      { id: "m1", youtube_link: "SqcY0GlETPk" },
      { id: "m2", youtube_link: "RGKi6LSPDLU" },
      { id: "m3", youtube_link: "4UZrsTqkcW4" },
    ],
  },
  {
    id: "startup-bisnis",
    image_url:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
    category_id: "business",
    modules: [
      { id: "m1", youtube_link: "FTFaQWZBqQ8" },
      { id: "m2", youtube_link: "Cx2dkpBxst8" },
      { id: "m3", youtube_link: "TyaGpGDFczw" },
      { id: "m4", youtube_link: "iBkXf6u8htI" },
    ],
  },
  {
    id: "digital-marketing",
    image_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category_id: "business",
    modules: [
      { id: "m1", youtube_link: "ruanT5_HaKY" },
      { id: "m2", youtube_link: "Ovj4hFxko7c" },
      { id: "m3", youtube_link: "qZWDJqY27bw" },
      { id: "m4", youtube_link: "qz0aGYrrlhU" },
    ],
  },
  {
    id: "ecommerce-dasar",
    image_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category_id: "business",
    modules: [
      { id: "m1", youtube_link: "rfscVS0vtbw" },
      { id: "m2", youtube_link: "vmEHCJofslg" },
      { id: "m3", youtube_link: "a9UrKTVEeZA" },
    ],
  },
  {
    id: "personal-finance",
    image_url:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    category_id: "money",
    modules: [
      { id: "m1", youtube_link: "salY_Sm6mv4" },
      { id: "m2", youtube_link: "1Rs2ND1ryYc" },
      { id: "m3", youtube_link: "fYq5PXgSsbE" },
      { id: "m4", youtube_link: "W6NZfCO5SIk" },
    ],
  },
  {
    id: "passive-income",
    image_url:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    category_id: "money",
    modules: [
      { id: "m1", youtube_link: "h33Srr5J9nY" },
      { id: "m2", youtube_link: "V_Kr9OSfDeU" },
      { id: "m3", youtube_link: "cRHQNNkYi1A" },
      { id: "m4", youtube_link: "SqcY0GlETPk" },
    ],
  },
  {
    id: "growth-mindset",
    image_url:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    category_id: "mindset",
    modules: [
      { id: "m1", youtube_link: "RGKi6LSPDLU" },
      { id: "m2", youtube_link: "4UZrsTqkcW4" },
      { id: "m3", youtube_link: "0ZJgIjIuY7U" },
      { id: "m4", youtube_link: "FTFaQWZBqQ8" },
    ],
  },
  {
    id: "time-management",
    image_url:
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80",
    category_id: "mindset",
    modules: [
      { id: "m1", youtube_link: "Cx2dkpBxst8" },
      { id: "m2", youtube_link: "TyaGpGDFczw" },
      { id: "m3", youtube_link: "iBkXf6u8htI" },
    ],
  },
  {
    id: "health-fitness",
    image_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    category_id: "health",
    modules: [
      { id: "m1", youtube_link: "SqcY0GlETPk" },
      { id: "m2", youtube_link: "RGKi6LSPDLU" },
    ],
  },
  {
    id: "nutrition-diet",
    image_url:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    category_id: "nutrition",
    modules: [
      { id: "m1", youtube_link: "qz0aGYrrlhU" },
      { id: "m2", youtube_link: "salY_Sm6mv4" },
    ],
  },
  {
    id: "web-dev",
    image_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    category_id: "tech",
    modules: [
      { id: "m1", youtube_link: "W6NZfCO5SIk" },
      { id: "m2", youtube_link: "h33Srr5J9nY" },
    ],
  },
  {
    id: "data-science",
    image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category_id: "data",
    modules: [
      { id: "m1", youtube_link: "V_Kr9OSfDeU" },
      { id: "m2", youtube_link: "cRHQNNkYi1A" },
    ],
  },
  {
    id: "ui-ux-design",
    image_url:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    category_id: "design",
    modules: [
      { id: "m1", youtube_link: "c9Wg6Cb_YlU" },
      { id: "m2", youtube_link: "3n35E4QYx9I" },
    ],
  },
  {
    id: "graphic-design",
    image_url:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    category_id: "design",
    modules: [
      { id: "m1", youtube_link: "sByzHoiYFX0" },
      { id: "m2", youtube_link: "dFSiaHQYc-I" },
    ],
  },
];

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const watchMatch = urlOrId.match(/[?&]v=([^&#]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = urlOrId.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = urlOrId.match(/embed\/([^?&#]+)/);
  if (embedMatch) return embedMatch[1];
  // Assume it's already an ID (no slashes/dots)
  if (/^[a-zA-Z0-9_-]{6,15}$/.test(urlOrId)) return urlOrId;
  return urlOrId;
}

function localizeCourse(base: BaseCourse, langCode: string): Course {
  const content =
    getLocalizedCourseContent(langCode, base.id) ||
    getLocalizedCourseContent("en", base.id)!;

  return {
    id: base.id,
    title: content.title,
    description: content.description,
    image_url: base.image_url,
    category_id: base.category_id,
    modules: base.modules.map((m) => ({
      ...m,
      title: content.moduleTitles[m.id] || m.id,
      content_type: m.content_type,
    })),
  };
}

export async function getCourses(
  langCode: string,
  categoryId?: string,
  classId?: string
): Promise<Course[]> {
  let courses = COURSE_BASES.map((base) => localizeCourse(base, langCode));
  if (categoryId) {
    courses = courses.filter((c) => c.category_id === categoryId);
  } else if (classId) {
    const appClass = APP_CLASSES.find(c => c.id === classId);
    if (appClass) {
      courses = courses.filter(c => appClass.categoryIds.includes(c.category_id));
    }
  }
  return courses;
}

export interface AppClass {
  id: string;
  name: string;
  categoryIds: string[];
}

export const APP_CLASSES: AppClass[] = [
  { id: "finance_class", name: "Financial & Business Academy", categoryIds: ["finance", "business", "money", "mindset"] },
  { id: "health_class", name: "Health & Wellness Academy", categoryIds: ["health", "mental_health", "nutrition"] },
  { id: "tech_class", name: "Career & Tech Academy", categoryIds: ["tech", "data", "design"] }
];

export async function getClasses(langCode: string): Promise<AppClass[]> {
  // Can be localized later, keeping it simple for now
  return APP_CLASSES;
}

export async function getCategories(langCode: string, classId?: string): Promise<Category[]> {
  const lang = COURSE_LANGUAGES.find((l) => l.code === langCode) || COURSE_LANGUAGES[0];
  const labels = lang.content.ui.categories;
  let activeCategories = CATEGORIES;
  
  if (classId) {
    const appClass = APP_CLASSES.find(c => c.id === classId);
    if (appClass) {
      activeCategories = CATEGORIES.filter(c => appClass.categoryIds.includes(c.id));
    }
  }

  return activeCategories.map((c) => ({
    id: c.id,
    name: labels[c.id as keyof typeof labels] || c.name,
  }));
}

export async function getCourseById(
  id: string,
  langCode: string
): Promise<Course | null> {
  const base = COURSE_BASES.find((c) => c.id === id);
  if (!base) return null;
  return localizeCourse(base, langCode);
}
