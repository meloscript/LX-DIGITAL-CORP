"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const easePremium = [0.22, 1, 0.36, 1] as const;

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
}

export function MotionSection({
  children,
  className,
  id,
  delay = 0,
}: MotionSectionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      id={id}
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
}

export function MotionCard({ children, className, delay = 0 }: MotionCardProps) {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();

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
      whileHover={
        reduced || !effectsEnabled
          ? undefined
          : { y: -4, transition: { duration: 0.25, ease: easePremium } }
      }
      className={cn(className)}
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
