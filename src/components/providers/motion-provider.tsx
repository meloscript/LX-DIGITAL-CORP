"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const PageTransition = dynamic(
  () =>
    import("@/components/visual/page-transition").then((m) => m.PageTransition),
  { ssr: false }
);

type MotionProviderProps = {
  children: React.ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = useReducedMotion();
  const { isMobile, saveData } = usePerformanceMode();

  useEffect(() => {
    if (reduced || isMobile || saveData) return;

    let cancelled = false;
    let frame = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.35,
      });

      document.documentElement.classList.add("lenis");

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
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
