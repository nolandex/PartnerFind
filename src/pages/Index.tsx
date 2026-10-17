import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { NetworkDirectory } from "../components/NetworkDirectory";
import { TopNavbar } from "../components/top-navbar";
import { Globe2 } from "lucide-react";
import React from "react";
import { useColor, LANGUAGES } from "../contexts/ColorContext";
import { db } from "../lib/firebase";
import { doc, getDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";

const Index = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [_isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedLang } = useColor();
  const ui = selectedLang.content?.ui?.index || LANGUAGES[0].content?.ui?.index;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }, [isLoading]);

  useEffect(() => {
    checkAuthAndStatus();
  }, []);

  const checkAuthAndStatus = async () => {
    setIsLoading(true);
    const premiumStatus = localStorage.getItem("isPremium") === "true";
    setIsPremium(premiumStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    const reservedSlugs = ['admin', 'courses', 'course', 'my-courses', 'profile', 'network', 'partner', 'partners', 'mitra', 'global-network', 'global', 'titik-lokasi', 'locations', 'create-profile', 'buat-profil', 'partner-profile'];
    
    // Check if the current URL slug is a valid token (and not a reserved subpage)
    const activeToken = (slug && !reservedSlugs.includes(slug.toLowerCase())) ? slug : null;

    if (!activeToken) return;

    const verifyToken = async () => {
      try {
        const tokenRef = doc(db, 'tokens', activeToken);
        const tokenSnap = await getDoc(tokenRef);

        if (tokenSnap.exists()) {
          const data = tokenSnap.data();
          const type = data.type || 'single';

          localStorage.setItem('isPremium', 'true');
          setIsPremium(true);

          if (type === 'single') {
            try {
              await deleteDoc(tokenRef);
            } catch (delErr) {
              console.warn('Failed to delete single-use token:', delErr);
            }
          } else {
            try {
              await updateDoc(tokenRef, {
                uses: increment(1)
              });
            } catch (updErr) {
              console.warn('Failed to increment use count:', updErr);
            }
          }

          navigate('/courses', { replace: true });
        } else {
          navigate('/courses', { replace: true });
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        navigate('/courses', { replace: true });
      }
    };

    verifyToken();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="w-full max-w-6xl mx-auto px-4 space-y-4">
          <div className="h-28 rounded-2xl bg-card animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-card animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col pt-16 pb-12 relative transition-all duration-200"
    >
      <TopNavbar showBack backTo="/" backLabel={ui?.backToHome} />
      <main className="flex-grow">
        <NetworkDirectory
          initialSearchQuery={searchQuery}
          onClearSearch={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("q");
            newParams.delete("search");
            setSearchParams(newParams);
          }}
        />
      </main>

      <footer className="py-8 bg-background text-[13px] text-foreground/70 mt-8">
        <div className="container mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[11.5px] text-muted-foreground font-mono">© 2026 PartnerFind. Hak cipta dilindungi.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/"
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              Beranda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
