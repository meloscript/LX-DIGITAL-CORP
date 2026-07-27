"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { PageTransition } from "@/components/visual/page-transition";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type MotionProviderProps = {
  children: React.ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = useReducedMotion();
  const { isMobile, saveData } = usePerformanceMode();

  useEffect(() => {
    if (reduced || isMobile || saveData) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    document.documentElement.classList.add("lenis");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, [reduced, isMobile, saveData]);

  return (
    <>
      <PageTransition />
      {children}
    </>
  );
}
