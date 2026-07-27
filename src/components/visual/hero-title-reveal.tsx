"use client";

import { useEffect, useState, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  heroEase,
  heroTiming,
  usePerformanceMode,
} from "@/hooks/use-performance-mode";

const LINE_1_WORDS =
  "Accélérez la croissance de votre entreprise grâce au".split(" ");

const STATIC_TITLE = (
  <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-night dark:text-white leading-[1.08] tracking-tight mb-6">
    Accélérez la croissance de votre entreprise grâce au{" "}
    <span className="text-gradient relative inline-block gradient-word-shine-wrap">
      digital
      <span className="gradient-word-shine" aria-hidden="true" />
    </span>{" "}
    et à l&apos;intelligence artificielle.
  </h1>
);

export function HeroTitleReveal() {
  const reduced = useReducedMotion();
  const { animateEntrance, effectsEnabled } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced || !animateEntrance) {
    return STATIC_TITLE;
  }

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-night dark:text-white leading-[1.08] tracking-tight mb-6">
      <span className="block">
        {LINE_1_WORDS.map((word, i) => (
          <Fragment key={`w-${i}`}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: heroTiming.titleLine1 + i * heroTiming.titleWordStagger,
                duration: 0.38,
                ease: heroEase,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {i < LINE_1_WORDS.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
      <motion.span
        className="block mt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: heroTiming.titleLine2, duration: 0.42, ease: heroEase }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: heroTiming.digital, duration: 0.4, ease: heroEase }}
          className="text-gradient relative inline-block gradient-word-shine-wrap"
        >
          digital
          {effectsEnabled && (
            <span className="gradient-word-shine" aria-hidden="true" />
          )}
        </motion.span>{" "}
        et à l&apos;intelligence artificielle.
      </motion.span>
    </h1>
  );
}
