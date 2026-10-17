import React, { useRef, memo } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { getJoinSteps } from "../data/joinSteps";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export const JoinStepsSection: React.FC = memo(() => {
  const { locale } = useLanguage();
  const joinData = getJoinSteps(locale);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="cara-bergabung" className="py-14 sm:py-16 relative overflow-hidden border-t border-foreground/[0.06]">
      {/* Background ambient glow */}
      <div
        className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[min(400px,60vw)] aspect-square rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--brand-accent)/0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 pl-2 sm:pl-4 pr-5 sm:pr-8 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section Heading */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(1.8rem,5vw,3rem)] font-bold tracking-tight text-white"
            >
              {joinData.heading}
            </motion.h2>
          </div>

          {/* 2 Langkah Bergabung — Section Terpisah dengan Format Alur & Nomor */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
            {joinData.steps.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="relative flex items-stretch">
                {/* Number badge (1, 2) + connector container */}
                <div className="relative flex flex-col items-center mr-4 shrink-0">
                  <div
                    className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0 rounded-full border border-foreground/10 transition-colors duration-300"
                    style={{
                      background: "hsl(var(--brand-accent))",
                      boxShadow: "0 4px 12px hsl(var(--brand-accent)/0.3)",
                    }}
                  >
                    <span className="text-white font-bold text-xs leading-none font-mono">
                      {item.number}
                    </span>
                  </div>

                  {/* Continuous vertical line on mobile */}
                  {i !== joinData.steps.length - 1 && (
                    <div
                      className="w-[1.5px] bg-foreground/20 flex-1 md:hidden"
                      style={{ marginBottom: "-24px" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Desktop horizontal connector line bridging to step 2 */}
                {i !== joinData.steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-3 left-6 right-[-48px] h-[1.5px] bg-foreground/20 -z-0 pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* Step Content */}
                <div className="pb-4 pt-0 flex-1 min-w-0">
                  <h3 className="text-lg sm:text-[18px] font-bold mb-1.5 leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15px] text-zinc-200 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
