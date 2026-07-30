"use client";

import { motion } from "framer-motion";

type FlapLettersProps = {
  text: string;
  reveal: boolean;
  canAnimate: boolean;
  mode: "in" | "out";
  staggerMs?: number;
  durationMs?: number;
  className?: string;
  letterClassName?: string;
};

/** Split-flap minimal — chaque lettre bascule, sans décor superflu. */
export function FlapLetters({
  text,
  reveal,
  canAnimate,
  mode,
  staggerMs = 16,
  durationMs = 320,
  className,
  letterClassName,
}: FlapLettersProps) {
  const restRotate = mode === "out" ? 0 : -100;
  const restOpacity = mode === "out" ? 1 : 0;
  const activeRotate = mode === "out" ? 100 : 0;
  const activeOpacity = mode === "out" ? 0 : 1;
  const origin = mode === "out" ? "top" : "bottom";

  const target = {
    rotateX: reveal ? activeRotate : restRotate,
    opacity: reveal ? activeOpacity : restOpacity,
  };

  return (
    <span aria-hidden="true" className={className} style={{ perspective: 480 }}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className={["inline-block", letterClassName].filter(Boolean).join(" ")}
          style={{ transformOrigin: origin }}
          initial={
            canAnimate ? { rotateX: restRotate, opacity: restOpacity } : target
          }
          animate={target}
          transition={{
            duration: durationMs / 1000,
            delay: (i * staggerMs) / 1000,
            ease: [0.5, 0, 0.2, 1],
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
