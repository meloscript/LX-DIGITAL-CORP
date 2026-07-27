"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easePremium, motionDurations } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

export function PageTransition() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { isLite } = usePerformanceMode();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced || isLite) return;

    setActive(true);
    const hide = window.setTimeout(() => setActive(false), 480);
    return () => window.clearTimeout(hide);
  }, [pathname, reduced, isLite]);

  if (reduced || isLite) return null;

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDurations.page, ease: easePremium }}
        >
          <motion.div
            className="absolute inset-0 bg-white/92 dark:bg-night/94 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85] }}
            transition={{ duration: 0.48, ease: easePremium, times: [0, 0.35, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-premium/10 via-transparent to-accent/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.5, ease: easePremium }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.75, 1, 1.04, 1.08], filter: "blur(0px)" }}
            transition={{ duration: 0.48, ease: easePremium, times: [0, 0.35, 0.7, 1] }}
            className="relative z-10"
          >
            <span className="absolute inset-0 rounded-2xl bg-premium/30 blur-2xl scale-125" aria-hidden />
            <Image
              src="/logo-lx.png"
              alt=""
              width={56}
              height={56}
              className="relative rounded-xl object-contain"
              priority
              aria-hidden
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
