const fs = require("fs");
let content = fs.readFileSync("src/components/PaymentSection.tsx", "utf8");

const replacement = `
import { useInView } from "motion/react";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FIXED_AMOUNT = 4999;
`;

content = content.replace("const FIXED_AMOUNT = 4999;", replacement);
fs.writeFileSync("src/components/PaymentSection.tsx", content);
