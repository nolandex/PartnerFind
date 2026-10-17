import { getCourses, getCategories, type Course, type Category } from "../lib/data";
import { CourseCard } from "./course-card";
import { useEffect, useState } from "react";
import { useColor } from "../contexts/ColorContext";
import React from "react";
import { Lock, AlertCircle, ChevronRight, ArrowLeft, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CourseGridProps {
  selectedClassId: string;
  isLocked?: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}

const CourseCardSkeleton: React.FC<{ isHorizontal?: boolean }> = ({ isHorizontal = false }) => (
  <div className={isHorizontal ? "w-52 flex-shrink-0" : "w-full"}>
    <div className="bg-card rounded-2xl overflow-hidden">
      <div className="h-32 bg-muted animate-pulse" />
    </div>
  </div>
);

export const CourseGrid: React.FC<CourseGridProps> = ({
  selectedClassId,
  isLocked = false,
  searchQuery = "",
  onClearSearch,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { selectedLang } = useColor();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [coursesData, categoriesData] = await Promise.all([
        getCourses(selectedLang.code, undefined, selectedClassId),
        getCategories(selectedLang.code, selectedClassId)
      ]);
      
      setCourses(coursesData);
      setCategories(categoriesData);
      setLoading(false);
      // Reset selected category when changing class
      setSelectedCategoryId(null);
    };
    
    fetchData();
  }, [selectedClassId, selectedLang.code]);

  const handleLockedClick = () => {
    // Keep courses locked quietly with no popup, as requested by the user
  };

  const content = selectedLang.content?.ui?.index || { emptyCategory: "No courses" };
  const allCatLabel = selectedLang.content?.ui?.categories?.allCategories || "All Categories";

  if (loading) {
    return (
      <div className="px-4 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="mb-3 h-6 w-1/2 rounded-md bg-muted animate-pulse" />
            <div className="flex gap-3 overflow-x-hidden">
              {[...Array(3)].map((_, j) => (
                <CourseCardSkeleton key={j} isHorizontal />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const trimmedSearch = searchQuery.trim().toLowerCase();
  const filteredCourses = trimmedSearch
    ? courses.filter((course) => {
        const matchTitle = course.title?.toLowerCase().includes(trimmedSearch);
        const matchDesc = course.description?.toLowerCase().includes(trimmedSearch);
        const category = categories.find((c) => c.id === course.category_id);
        const matchCategory = category?.name?.toLowerCase().includes(trimmedSearch);
        const matchModules = course.modules?.some((m) =>
          m.title?.toLowerCase().includes(trimmedSearch)
        );
        return matchTitle || matchDesc || matchCategory || matchModules;
      })
    : courses;

  // Search Results View
  if (trimmedSearch) {
    return (
      <div className="px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Hasil pencarian: <span className="text-primary font-bold">"{searchQuery}"</span>
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
              {filteredCourses.length} kelas
            </span>
          </div>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full bg-muted/80 hover:bg-muted transition-colors"
            >
              <X size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm mb-3">
              Tidak ada kelas yang cocok dengan pencarian Anda.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors"
              >
                Lihat Semua Kelas
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                selectedCategory={selectedClassId}
                isLocked={isLocked}
                onLockedClick={handleLockedClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const groupedCourses = groupCoursesByCategory(courses);
  
  if (selectedCategoryId) {
    const activeCategory = categories.find(c => c.id === selectedCategoryId);
    const categoryCourses = groupedCourses[selectedCategoryId] || [];
    
    return (
      <div className="px-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setSelectedCategoryId(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>{allCatLabel}</span>
          </button>
          
          {activeCategory && (
            <div className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
              {activeCategory.name}
            </div>
          )}
        </div>
        
        {categoryCourses.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">{content.emptyCategory || "No courses available"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-w-6xl mx-auto">
            {categoryCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                selectedCategory={selectedClassId}
                isLocked={isLocked}
                onLockedClick={handleLockedClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 space-y-6">
      {Object.entries(groupedCourses).map(([categoryId, categoryCourses]) => {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) return null;
        
        return (
          <CategorySection
            key={categoryId}
            category={category}
            courses={categoryCourses}
            selectedClassId={selectedClassId}
            isLocked={isLocked}
            onLockedClick={handleLockedClick}
            onSeeAllClick={() => setSelectedCategoryId(categoryId)}
          />
        );
      })}
      
      {courses.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">{content.emptyCategory || "No courses available"}</p>
        </div>
      )}
    </div>
  );
};

const groupCoursesByCategory = (allCourses: Course[]): { [key: string]: Course[] } => {
  const grouped: { [key: string]: Course[] } = {};
  
  allCourses.forEach(course => {
    if (course.category_id) {
      if (!grouped[course.category_id]) {
        grouped[course.category_id] = [];
      }
      grouped[course.category_id].push(course);
    }
  });
  
  return grouped;
};

interface CategorySectionProps {
  category: any;
  courses: Course[];
  selectedClassId: string;
  isLocked?: boolean;
  onLockedClick?: () => void;
  onSeeAllClick?: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, courses, selectedClassId, isLocked, onLockedClick, onSeeAllClick }) => {
  return (
    <div>
      <div 
        className="mb-3 flex items-center justify-between cursor-pointer group" 
        onClick={onSeeAllClick}
      >
        <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
        <ChevronRight size={18} className="text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isHorizontal
            selectedCategory={selectedClassId} // Just passing it as selectedCategory prop to CourseCard for now to avoid refactoring CourseCard
            isLocked={isLocked}
            onLockedClick={onLockedClick}
          />
        ))}
      </div>
    </div>
  );
};
