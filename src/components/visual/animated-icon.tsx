"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { easePremium } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

type AnimatedIconProps = {
  icon: LucideIcon;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "p-2.5",
  md: "p-3.5",
  lg: "p-4",
};

export function AnimatedIcon({
  icon: Icon,
  className,
  wrapperClassName,
  delay = 0,
  size = "md",
}: AnimatedIconProps) {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();

  if (reduced) {
    return (
      <div className={cn("inline-flex", wrapperClassName)}>
        <Icon className={className} />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("inline-flex", sizeMap[size], wrapperClassName)}
      initial={{ opacity: 0, scale: 0.55, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: easePremium }}
      whileHover={
        effectsEnabled
          ? { scale: 1.08, rotate: 4, transition: { duration: 0.25, ease: easePremium } }
          : undefined
      }
      whileTap={effectsEnabled ? { scale: 0.96 } : undefined}
    >
      <motion.span
        animate={effectsEnabled ? { y: [0, -2, 0] } : undefined}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
      >
        <Icon className={className} />
      </motion.span>
    </motion.div>
  );
}
