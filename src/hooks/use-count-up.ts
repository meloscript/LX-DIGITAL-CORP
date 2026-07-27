"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(
  target: number,
  options?: { duration?: number; delay?: number; enabled?: boolean }
) {
  const { duration = 1200, delay = 0, enabled = true } = options ?? {};
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || reduced) {
      setValue(target);
      return;
    }

    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay, enabled, reduced]);

  return value;
}
