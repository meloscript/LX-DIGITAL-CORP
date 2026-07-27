"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { easePremium } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

export { easePremium };

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easePremium },
  },
};

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  parallax?: boolean;
}

export function MotionSection({
  children,
  className,
  id,
  delay = 0,
  parallax = false,
}: MotionSectionProps) {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax && effectsEnabled ? 18 : 0, parallax && effectsEnabled ? -18 : 0]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={parallax && effectsEnabled && !reduced ? { y } : undefined}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : delay,
            ease: easePremium,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  float?: boolean;
}

export function MotionCard({ children, className, delay = 0, float = true }: MotionCardProps) {
  const reduced = useReducedMotion();
  const { effectsEnabled, isMobile } = usePerformanceMode();

  const hoverLift = effectsEnabled && !reduced;
  const canFloat = float && effectsEnabled && !reduced;

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : delay,
            ease: easePremium,
          },
        },
      }}
      animate={
        canFloat
          ? { y: [0, -4, 0] }
          : undefined
      }
      transition={
        canFloat
          ? { duration: 5 + (delay % 3), repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }
          : undefined
      }
      whileHover={
        hoverLift
          ? {
              y: -8,
              scale: 1.015,
              transition: { duration: 0.35, ease: easePremium },
            }
          : undefined
      }
      whileTap={
        isMobile && effectsEnabled && !reduced
          ? { scale: 0.985, y: -2, transition: { duration: 0.2 } }
          : undefined
      }
      className={cn("motion-card-depth", className)}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionStagger({ children, className }: MotionStaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={reduced ? undefined : staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionReveal({ children, className }: MotionRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easePremium }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
