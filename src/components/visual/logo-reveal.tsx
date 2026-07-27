"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { easePremium } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

type LogoRevealProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function LogoReveal({ size = 36, className, priority = false }: LogoRevealProps) {
  const reduced = useReducedMotion();
  const { effectsEnabled, animateEntrance } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const scrollScale = useTransform(scrollY, [0, 120], [1, effectsEnabled ? 0.94 : 1]);
  const scrollYShift = useTransform(scrollY, [0, 120], [0, effectsEnabled ? -1.5 : 0]);
  const scrollRotate = useTransform(scrollY, [0, 200], [0, effectsEnabled ? -1.5 : 0]);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced || !animateEntrance) {
    return (
      <Image
        src="/logo-lx.png"
        alt=""
        width={size}
        height={size}
        className={cn("rounded-lg object-contain shrink-0", className)}
        style={{ width: size, height: size }}
        priority={priority}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        scale: effectsEnabled ? scrollScale : 1,
        y: effectsEnabled ? scrollYShift : 0,
        rotate: effectsEnabled ? scrollRotate : 0,
      }}
      initial={{ opacity: 0, scale: 0.72, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.95, ease: easePremium }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg bg-premium/25 blur-md"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.75, 0.35], scale: [0.6, 1.15, 1] }}
        transition={{ duration: 1.1, ease: easePremium, times: [0, 0.45, 1] }}
        aria-hidden
      />
      <motion.div
        className="relative z-10 h-full w-full"
        whileHover={effectsEnabled ? { scale: 1.04 } : undefined}
        transition={{ duration: 0.35, ease: easePremium }}
      >
        <Image
          src="/logo-lx.png"
          alt=""
          width={size}
          height={size}
          className={cn("rounded-lg object-contain", className)}
          style={{ width: size, height: size }}
          priority={priority}
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}
