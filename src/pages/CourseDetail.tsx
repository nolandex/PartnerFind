import { useState, useEffect, useRef } from "react";
import { Bookmark, Play } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, extractYouTubeId } from "../lib/data";
import { BottomNavbar } from "../components/bottom-navbar";
import { TopNavbar } from "../components/top-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useColor, LANGUAGES } from "../contexts/ColorContext";
import React from "react";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState("dQw4w9WgXcQ");
  const [isAdded, setIsAdded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { selectedLang } = useColor();
  const ui = selectedLang.content?.ui?.courseDetail || LANGUAGES[0].content?.ui?.courseDetail;
  
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const ytScriptLoadedRef = useRef(false);

  useEffect(() => {
    const isPremium = localStorage.getItem("isPremium") === "true";
    if (!isPremium) {
       navigate("/courses", { replace: true });
       return;
    }

    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      // Fetch localized course data
      const data = await getCourseById(id, selectedLang.code);
      setCourse(data);
      setLoading(false);

      if (data) {
        // Check "myCoursesIds" instead of objects
        const myCourseIds = JSON.parse(localStorage.getItem("myCoursesIds") || "[]");
        setIsAdded(myCourseIds.includes(data.id));

        // Legacy check fallback
        if (!isAdded) {
             const legacy = JSON.parse(localStorage.getItem("myCourses") || "[]");
             if (legacy.some((c:any) => c.id === data.id)) setIsAdded(true);
        }

        if (data.modules && data.modules.length > 0) {
          const firstVideoModule = data.modules.find((m: any) => (m.content_type || 'youtube') !== 'download');
          if (firstVideoModule) {
            const firstVideoId = extractYouTubeId(firstVideoModule.youtube_link);
            setCurrentVideoId(firstVideoId);
          }
        }
      }
    };
    fetchCourse();
  }, [id, navigate, selectedLang.code]);

  useEffect(() => {
    if (ytScriptLoadedRef.current) return;
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
    }
    ytScriptLoadedRef.current = true;
  }, []);

  const getYouTubeVideoIds = () => {
    if (!course?.modules) return [];
    return course.modules
      .filter((m: any) => ((m.content_type || "youtube").toLowerCase() !== "download"))
      .map((m: any) => extractYouTubeId(m.youtube_link || ""))
      .filter(Boolean);
  };

  const findNextYouTubeVideoId = (currentId: string) => {
    const vids = getYouTubeVideoIds();
    if (!vids.length) return null;
    const idx = vids.indexOf(currentId);
    if (idx === -1) return vids[0] || null;
    return vids[idx + 1] || null;
  };

  useEffect(() => {
    if (!isPlaying) { 
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
      return;
    }

    const createPlayerWhenReady = () => {
      if (!(window as any).YT || !(window as any).YT.Player) {
        setTimeout(createPlayerWhenReady, 200);
        return;
      }

      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }

      const playerVars: any = {
        autoplay: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        enablejsapi: 1,
        playsinline: 1, 
      };

      playerRef.current = new (window as any).YT.Player(playerContainerRef.current, {
        height: "100%",
        width: "100%",
        videoId: currentVideoId,
        playerVars,
        events: {
          onReady: (e: any) => {
            try { e.target.playVideo(); } catch (_) {}
            updateMediaSessionMetadata();
          },
          onStateChange: (e: any) => {
            const YT = (window as any).YT;
            if (!YT) return;
            if (e.data === YT.PlayerState.ENDED) {
              const next = findNextYouTubeVideoId(currentVideoId);
              if (next) {
                setCurrentVideoId(next);
                try { e.target.loadVideoById(next); } catch (err) {
                  try { playerRef.current.destroy(); } catch (_) {}
                  playerRef.current = null;
                  setIsPlaying(true);
                }
              } else {
                setIsPlaying(false);
              }
            } else if (e.data === YT.PlayerState.PLAYING) {
              updateMediaSessionMetadata();
            }
          }
        }
      });
    };

    createPlayerWhenReady();

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (_) {}
        playerRef.current = null;
      }
    };
  }, [isPlaying, currentVideoId]);

  useEffect(() => {
    const onVisibilityChange = () => {
      try {
        if (document.hidden) {
          playerRef.current?.playVideo?.();
        }
      } catch (_) {}
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onVisibilityChange);
    };
  }, []);

  const updateMediaSessionMetadata = () => {
    try {
      if (!("mediaSession" in navigator)) return;
      let title = course?.title || "Course";
      let artist = "";
      let artwork: any[] = [];

      if (course?.modules) {
        const m = course.modules.find((mod: any) => extractYouTubeId(mod.youtube_link || "") === currentVideoId);
        if (m) {
          title = m.title || title;
          artist = course.title || "";
          if (course.image_url) {
            artwork.push({ src: course.image_url, sizes: "512x512", type: "image/png" });
          } else {
            artwork.push({ src: `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`, sizes: "480x360", type: "image/jpeg" });
          }
        }
      }

      (navigator as any).mediaSession.metadata = new (window as any).MediaMetadata({
        title,
        artist,
        album: course?.title || "",
        artwork
      });

      (navigator as any).mediaSession.setActionHandler("play", () => {
        try { playerRef.current?.playVideo?.(); setIsPlaying(true); } catch (_) {}
      });
      (navigator as any).mediaSession.setActionHandler("pause", () => {
        try { playerRef.current?.pauseVideo?.(); } catch (_) {}
      });
      (navigator as any).mediaSession.setActionHandler("previoustrack", () => {
        if (!course?.modules) return;
        const vids = getYouTubeVideoIds();
        const idx = vids.indexOf(currentVideoId);
        if (idx > 0) {
          const prev = vids[idx - 1];
          setCurrentVideoId(prev);
          try { playerRef.current?.loadVideoById?.(prev); } catch (_) {}
        } else {
          try { playerRef.current?.seekTo?.(0); playerRef.current?.playVideo?.(); } catch (_) {}
        }
      });
      (navigator as any).mediaSession.setActionHandler("nexttrack", () => {
        const next = findNextYouTubeVideoId(currentVideoId);
        if (next) {
          setCurrentVideoId(next);
          try { playerRef.current?.loadVideoById?.(next); } catch (_) {}
        }
      });
    } catch (_) {
    }
  };

  const handleBack = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category) {
      navigate(`/courses?category=${category}`, { replace: true });
    } else {
      navigate("/courses", { replace: true });
    }
  };

  const handleAddRemoveCourse = () => {
    if (!course) return;
    try {
      // Logic for using ID-based storage
      let myCourseIds: string[] = JSON.parse(localStorage.getItem("myCoursesIds") || "[]");
      
      if (isAdded) {
        // Remove
        myCourseIds = myCourseIds.filter((id) => id !== course.id);
        setIsAdded(false);
      } else {
        // Add
        if (!myCourseIds.includes(course.id)) {
            myCourseIds.push(course.id);
        }
        setIsAdded(true);
      }
      localStorage.setItem("myCoursesIds", JSON.stringify(myCourseIds));
      
      // Cleanup legacy
      localStorage.removeItem("myCourses");
    } catch (error) {
      console.error("Error handling course add/remove:", error);
      setIsAdded(!isAdded);
    }
  };

  const handleModuleAction = (module: any) => {
    const videoId = extractYouTubeId(module.youtube_link || '');
    if (videoId) {
      setCurrentVideoId(videoId);
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <div className="px-4 pt-4">
          <div className="w-full aspect-video rounded-xl bg-card animate-pulse" />
        </div>
        <div className="p-4">
          <div className="mb-6 h-8 w-3/4 rounded-md bg-card animate-pulse" />
          <div className="flex gap-1 mb-6 bg-card/30 p-1 rounded-xl">
            <div className="h-10 w-1/2 rounded-lg bg-card animate-pulse" />
            <div className="h-10 w-1/2 rounded-lg bg-card animate-pulse" />
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 w-full rounded-lg bg-card animate-pulse" />
            ))}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{ui?.notFound}</h1>
          <button
            onClick={handleBack}
            className="text-primary hover:text-primary-dark"
          >
            ← {ui?.back}
          </button>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-16">
      <TopNavbar showBack onBack={handleBack} backLabel={ui?.back} />
      <div className="px-4 pt-4">
        {isPlaying ? (
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative shadow-lg">
            <div ref={playerContainerRef} className="w-full h-full" />
          </div>
        ) : (
          <div 
            className="w-full aspect-video rounded-xl overflow-hidden relative shadow-lg cursor-pointer group" 
            onClick={() => setIsPlaying(true)}
          >
             <img
              src={course?.image_url || (course?.modules?.length ? `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800")}
              alt={course?.title || "Course preview"}
              className="w-full h-full object-cover transition-all"
              loading="eager"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
               <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Play className="w-8 h-8 text-white fill-white" />
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground line-clamp-2 flex-1 mr-4">
            {course.title}
          </h1>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleAddRemoveCourse}
              className={`p-2 rounded-full transition-all duration-200 ${
                isAdded
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {isAdded ? <Bookmark className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/30 p-1 rounded-xl">
            <TabsTrigger value="modules" className="rounded-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
              {ui?.modulesTab}
            </TabsTrigger>
            <TabsTrigger value="description" className="rounded-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
              {ui?.descTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-3">
            {course.modules && course.modules
              .filter((module: any) => (module.content_type || 'youtube') !== 'download') 
              .map((module: any) => (
              <div
                key={module.id}
                onClick={() => handleModuleAction(module)}
                className="flex items-center bg-card rounded-lg px-4 py-3 shadow-sm transition-shadow cursor-pointer hover:shadow-md"
              >
                <button className="flex items-center justify-center w-7 h-7 rounded-full text-primary-foreground mr-3 flex-shrink-0 bg-primary">
                  <Play className="h-3 w-3 fill-current" />
                </button>
                <div className="flex-1">
                  <span className="text-sm font-normal text-foreground block">
                    {module.title}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="description">
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">{ui?.descTitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default CourseDetail;
