import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { NetworkDirectory } from "../components/NetworkDirectory";
import { TopNavbar } from "../components/top-navbar";
import { Globe2, Users, ShieldCheck, FileText, X } from "lucide-react";
import React from "react";
import { useColor, LANGUAGES } from "../contexts/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { getLegalModalData } from "../data/legalModalData";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../lib/firebase";
import { doc, getDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";

const Index = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [_isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'about' | 'terms' | 'privacy' | null>(null);

  const { t, locale } = useLanguage();
  const legalData = useMemo(() => getLegalModalData(locale), [locale]);
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

      <footer className="py-8 bg-background text-[13px] text-foreground/70 mt-8 border-t border-border/40">
        <div className="container mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[11.5px] text-muted-foreground font-mono">
              {t("footer_copyright") || "© 2026 PartnerFind. Hak cipta dilindungi undang-undang."}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/"
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              Beranda
            </Link>
            <button
              onClick={() => setActiveModal('about')}
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {locale === 'id-ID' ? 'About' : t("footer_company_about")}
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {locale === 'id-ID' ? 'S&K' : t("footer_terms")}
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {locale === 'id-ID' ? 'Kebijakan Privasi' : t("footer_privacy")}
            </button>
          </div>
        </div>
      </footer>

      {/* ── MODALS SYSTEM FOR TRANSPARENCY ── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] text-left shadow-2xl text-card-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  {activeModal === 'about' && <Users className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  {activeModal === 'terms' && <FileText className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  <h3 className="font-bold text-lg text-foreground">
                    {activeModal === 'about' && (locale === 'id-ID' ? 'About PartnerFind' : t("footer_company_about"))}
                    {activeModal === 'privacy' && (locale === 'id-ID' ? 'Kebijakan Privasi' : t("footer_privacy"))}
                    {activeModal === 'terms' && (locale === 'id-ID' ? 'Syarat & Ketentuan (S&K)' : t("footer_terms"))}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm text-foreground/80 leading-relaxed">
                {activeModal === 'about' && (
                  <>
                    <p>{legalData.about.intro}</p>
                    <p><strong className="text-foreground">{legalData.about.flowTitle}</strong></p>
                    <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                      {legalData.about.steps.map((step, idx) => (
                        <li key={idx}>
                          <strong className="text-foreground">{step.bold} </strong>
                          {step.text}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {activeModal === 'privacy' && (
                  <div className="space-y-3">
                    <p>{legalData.privacy.intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                      {legalData.privacy.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeModal === 'terms' && (
                  <div className="space-y-3">
                    <p>{legalData.terms.intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                      {legalData.terms.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border bg-muted/40 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-border"
                >
                  {t("nav_close") || "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
