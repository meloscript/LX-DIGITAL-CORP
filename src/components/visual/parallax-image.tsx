"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

type ParallaxImageProps = Omit<ImageProps, "ref"> & {
  depth?: number;
  tiltOnHover?: boolean;
  className?: string;
  wrapperClassName?: string;
};

export function ParallaxImage({
  depth = 24,
  tiltOnHover = true,
  className,
  wrapperClassName,
  alt,
  ...props
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth * 0.35, -depth * 0.35]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  if (reduced || !effectsEnabled) {
    return (
      <div className={wrapperClassName}>
        <Image alt={alt} className={className} {...props} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative [perspective:900px]", wrapperClassName)}
      style={{ y, rotateX }}
      whileHover={tiltOnHover ? { scale: 1.015, rotateY: 2 } : undefined}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image alt={alt} className={cn("relative z-10", className)} {...props} />
    </motion.div>
  );
}
