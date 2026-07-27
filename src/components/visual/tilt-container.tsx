"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

interface TiltContainerProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltContainer({
  children,
  className,
  maxTilt = 6,
}: TiltContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const enabled = effectsEnabled && !reduced && maxTilt > 0;

  const rotateX = useSpring(0, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 24 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt);
    rotateX.set(-y * maxTilt);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
