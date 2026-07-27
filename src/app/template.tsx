"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easePremium } from "@/lib/motion-config";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easePremium }}
    >
      {children}
    </motion.div>
  );
}
