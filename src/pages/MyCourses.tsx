import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../lib/data";
import { CourseCard } from "../components/course-card";
import { BottomNavbar } from "../components/bottom-navbar";
import { TopNavbar } from "../components/top-navbar";
import { useColor } from "../contexts/ColorContext";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedLang } = useColor();
  const ui = selectedLang.content.ui.myCourses;

  useEffect(() => {
    const isPremium = localStorage.getItem("isPremium") === "true";
    if (!isPremium) {
      navigate("/courses", { replace: true });
      return;
    }
    loadMyCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLang.code]);

  const loadMyCourses = async () => {
    setLoading(true);
    const ids: string[] = JSON.parse(localStorage.getItem("myCoursesIds") || "[]");
    const loaded = await Promise.all(ids.map((id) => getCourseById(id, selectedLang.code)));
    setCourses(loaded.filter(Boolean));
    setLoading(false);
  };

  const handleRemove = (courseId: string) => {
    let ids: string[] = JSON.parse(localStorage.getItem("myCoursesIds") || "[]");
    ids = ids.filter((id) => id !== courseId);
    localStorage.setItem("myCoursesIds", JSON.stringify(ids));
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <TopNavbar showBack backTo="/courses" backLabel={selectedLang.content.ui.courseDetail.back} />

      <div className="px-4 pt-20 pb-4">
        <h1 className="text-2xl font-bold">{ui.title}</h1>
        <p className="text-muted-foreground text-sm mt-1">{ui.subtitle}</p>
      </div>

      {loading ? (
        <div className="px-4 grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <p className="text-muted-foreground text-sm">{ui.empty}</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 text-primary text-sm font-medium"
          >
            {ui.explore}
          </button>
        </div>
      ) : (
        <div className="px-4 grid grid-cols-2 gap-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              source="my-courses"
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      <BottomNavbar />
    </div>
  );
};

export default MyCourses;
