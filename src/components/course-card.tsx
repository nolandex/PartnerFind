import { type Course } from "../lib/data";
import { X, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useColor, LANGUAGES } from "../contexts/ColorContext";

interface CourseCardProps {
  course: Course;
  isHorizontal?: boolean;
  source?: "homepage" | "my-courses";
  selectedCategory?: string;
  onRemove?: (courseId: string) => void;
  isLocked?: boolean;
  onLockedClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isHorizontal = false,
  source = "homepage",
  selectedCategory,
  onRemove,
  isLocked = false,
  onLockedClick,
}) => {
  const navigate = useNavigate();
  const { selectedLang } = useColor();
  const content = selectedLang.content?.ui?.common || LANGUAGES[0].content?.ui?.common; // Fallback safe

  const handleCourseClick = () => {
    if (isLocked) {
      if (onLockedClick) onLockedClick();
      return;
    }

    const baseUrl = `/course/${course.id}`;
    const url =
      selectedCategory && selectedCategory !== "popular"
        ? `${baseUrl}?category=${selectedCategory}`
        : baseUrl;
    navigate(url);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(course.id);
  };

  return (
    <div
      onClick={handleCourseClick}
      className={`
        bg-card rounded-2xl shadow-lg 
        relative group overflow-hidden
        ${isHorizontal ? "w-52 flex-shrink-0" : "w-full"}
        cursor-pointer
      `}
    >
      {source === "my-courses" && (
        <button
          onClick={handleRemoveClick}
          className="absolute top-2.5 right-2.5 z-20 bg-destructive text-destructive-foreground 
                     rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="overflow-hidden rounded-2xl relative">
        <div className="h-32 bg-muted relative">
          <img
            src={
              course.image_url ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80"
            }
            alt={course.title}
            className={`w-full h-full object-cover`}
          />
          
          {/* Deep professional gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

          {/* Locked Overlay */}
          {isLocked && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
               <div className="bg-black/60 p-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-xl">
                  <Lock className="w-5 h-5 text-white/90" />
               </div>
            </div>
          )}

          {/* Title Overlay with Badge */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col items-start">
             <span className={`text-[8px] font-bold px-1 py-[2px] mb-1.5 leading-none tracking-wider bg-primary text-white`}>
                {content?.naiklvl || "PARTNERFIND"}
             </span>
            <h3 className="text-white font-extrabold text-lg leading-tight line-clamp-2 drop-shadow-md tracking-tight">
              {course.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
