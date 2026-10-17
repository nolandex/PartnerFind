import React from "react";
import { motion } from "motion/react";
import { Star, ShieldCheck, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Locale } from "../lib/translations";
import { getFeatureTestimonials } from "../data/featureTestimonialsData";

const TESTIMONIAL_TITLES: Record<Locale, string> = {
  "id-ID": "Testimoni Kolaborator",
  "en-US": "Partner Testimonials",
  "ja-JP": "利用者の声",
  "ko-KR": "회원 이용 후기",
  "zh-CN": "合作伙伴感言",
  "es-ES": "Testimonios de Miembros",
  "fr-FR": "Témoignages des Partenaires",
  "de-DE": "Erfahrungsberichte",
  "ru-RU": "Отзывы Партнеров",
  "ar-SA": "آراء الشركاء",
  "tr-TR": "Üye Yorumları",
  "pt-PT": "Testemunhos de Membros",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const TestimonialsSection: React.FC = () => {
  const { locale } = useLanguage();
  const title = TESTIMONIAL_TITLES[locale] || TESTIMONIAL_TITLES["id-ID"];
  // 6 card total: 1 baris ada 2 card (3 baris)
  const testimonials = getFeatureTestimonials(locale).slice(0, 6);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 bg-background relative z-10 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-8">
        {/* Judul Simpel (Tanpa Subjudul) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* 6 Card Total: 1 Baris 2 Card (3 Baris) — Berlaku di Mobile & Desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-20px" }}
              variants={fadeUp}
              className="bg-neutral-900/70 border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 shadow-md sm:shadow-lg group hover:-translate-y-0.5"
            >
              <div>
                {/* 5 Bintang & Ikon Kutipan */}
                <div className="flex items-center justify-between mb-2 sm:mb-3.5">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-zinc-600 group-hover:text-[hsl(var(--brand-accent))] transition-colors" />
                </div>

                {/* Kalimat Testimoni */}
                <p className="text-[11.5px] sm:text-[13.5px] md:text-[15px] text-zinc-100 leading-snug sm:leading-relaxed italic font-normal mb-3 sm:mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Foto PNG Orang & Identitas */}
              <div className="flex items-center gap-2 sm:gap-3 pt-2.5 sm:pt-3.5 border-t border-white/10 mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full object-cover border border-white/20 shrink-0 shadow-sm sm:shadow-md"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <h3 className="text-white font-bold text-[11.5px] sm:text-[13px] md:text-[14.5px] truncate">
                      {item.name}
                    </h3>
                    <ShieldCheck
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0"
                      title="Verified Partner"
                    />
                  </div>
                  <p className="text-zinc-400 text-[9.5px] sm:text-[11px] md:text-[12px] truncate font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
