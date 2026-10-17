import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface TopNavbarProps {
  showBack?: boolean;
  backTo?: string;
  backLabel?: string;
  onBack?: () => void;
}

export function TopNavbar({ showBack = false, backTo = "/", backLabel, onBack }: TopNavbarProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    }
  };

  return (
    <header
      dir="ltr"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
              aria-label={backLabel || "Back"}
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <Link to="/" className="flex items-center shrink-0">
            <span className="font-extrabold text-xl tracking-tight text-white">
              PartnerFind
            </span>
          </Link>
        </div>
        <LanguageSwitcher variant="desktop" />
      </div>
    </header>
  );
}
