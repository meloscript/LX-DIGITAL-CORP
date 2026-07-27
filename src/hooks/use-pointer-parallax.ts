"use client";

import { useCallback, useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

interface PointerState {
  x: number;
  y: number;
}

export function usePointerParallax(intensity = 18) {
  const { effectsEnabled } = usePerformanceMode();
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!effectsEnabled) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2 * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * intensity;
      setPointer({ x, y });
    },
    [effectsEnabled, intensity]
  );

  const handleLeave = useCallback(() => setPointer({ x: 0, y: 0 }), []);

  useEffect(() => {
    if (!effectsEnabled) return;
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [effectsEnabled, handleMove, handleLeave]);

  return pointer;
}

/** @deprecated Use usePerformanceMode */
export function useMotionSafe() {
  const mode = usePerformanceMode();
  return {
    reduced: mode.reduced,
    isMobile: mode.isMobile,
    effectsEnabled: mode.effectsEnabled,
  };
}
