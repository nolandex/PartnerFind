import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TopNavbar } from "../components/top-navbar";
import { NetworkDirectory } from "../components/NetworkDirectory";
import { Lock, Home } from "lucide-react";
import { subscribeProfileAccess, getCachedProfileAccess } from "../lib/profileAccessService";
import { useLanguage } from "../context/LanguageContext";

export default function Profile() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [isProfileAccessActive, setIsProfileAccessActive] = useState<boolean>(getCachedProfileAccess);

  useEffect(() => {
    const unsubscribe = subscribeProfileAccess((enabled) => {
      setIsProfileAccessActive(enabled);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Top Navbar */}
      <TopNavbar showBack backTo="/" backLabel="Kembali" />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-16 sm:pt-18 pb-8">
        {isProfileAccessActive ? (
          <div className="w-full">
            {/* Direct Profile Search & Directory */}
            <NetworkDirectory initialSearchQuery={initialQuery} />
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 px-6 rounded-3xl bg-card border border-border shadow-2xl backdrop-blur-md my-12 text-card-foreground">
            <div className="w-14 h-14 rounded-2xl bg-muted border border-border text-amber-500 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Halaman Profil Dinonaktifkan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Akses ke halaman profil dan pencarian mitra saat ini dikunci oleh administrator.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-bold transition-all shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

