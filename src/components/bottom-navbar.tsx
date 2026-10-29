import { Users, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div dir="ltr" className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl z-50 border-t border-border shadow-lg">
      <div className="grid grid-cols-2 max-w-sm mx-auto py-2 px-4 relative">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 w-full min-w-0 ${
            path === "/" 
              ? "text-primary scale-105" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Compass className="h-5 w-5 flex-shrink-0" strokeWidth={path === "/" ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide truncate w-full text-center">Beranda</span>
        </Link>
        
        <Link
          to="/courses"
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 w-full min-w-0 ${
            path === "/courses" 
              ? "text-primary scale-105" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-5 w-5 flex-shrink-0" strokeWidth={path === "/courses" ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide truncate w-full text-center">Direktori</span>
        </Link>
      </div>
    </div>
  );
};
