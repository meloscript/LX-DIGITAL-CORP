"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface PerformanceState {
  isMobile: boolean;
  saveData: boolean;
  lowPower: boolean;
}

/** Detects device/network constraints — no extra dependencies */
export function usePerformanceMode() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<PerformanceState>({
    isMobile: false,
    saveData: false,
    lowPower: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = !!conn?.saveData;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;

    const update = () =>
      setState({ isMobile: mq.matches, saveData, lowPower });

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const isLite = state.isMobile || state.saveData || state.lowPower || !!reduced;
  /** Full 3D scene, parallax, tilt, infinite loops */
  const effectsEnabled = !isLite;
  /** One-shot entrance choreography — lightweight, kept unless reduced motion */
  const animateEntrance = !reduced;

  return {
    reduced: !!reduced,
    ...state,
    isLite,
    effectsEnabled,
    animateEntrance,
  };
}

/** Defer decorative layers until the browser is idle — keeps LCP on text/UI */
export function useDeferredEffects() {
  const { isLite } = usePerformanceMode();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLite) return;

    const enable = () => setReady(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 400 });
      return () => window.cancelIdleCallback(id);
    }

    const t = setTimeout(enable, 80);
    return () => clearTimeout(t);
  }, [isLite]);

  return ready;
}

export const heroEase = [0.22, 1, 0.36, 1] as const;

export const heroTiming = {
  badge: 0.05,
  titleLine1: 0.12,
  titleWordStagger: 0.028,
  titleLine2: 0.45,
  digital: 0.5,
  paragraph: 0.62,
  buttons: 0.75,
  dashboard: 0.55,
  scene: 0,
} as const;
