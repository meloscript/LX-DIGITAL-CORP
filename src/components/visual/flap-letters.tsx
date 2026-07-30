"use client";

import { motion } from "framer-motion";

type FlapLettersProps = {
  /** Texte à afficher, lettre par lettre */
  text: string;
  /** true = bascule vers l'état "actif" (disparu pour "out", visible pour "in") */
  reveal: boolean;
  canAnimate: boolean;
  /** "out" = flap qui se replie et disparaît, "in" = flap qui tombe et apparaît */
  mode: "in" | "out";
  staggerMs?: number;
  durationMs?: number;
  className?: string;
};

/**
 * Effet tableau d'aéroport / gare (split-flap) — chaque lettre bascule en 3D
 * sur son propre axe, en cascade de gauche à droite. "out" fait disparaître
 * un mot flap par flap (charnière en haut), "in" fait apparaître un mot
 * flap par flap (charnière en bas), façon panneau mécanique Solari.
 */
export function FlapLetters({
  text,
  reveal,
  canAnimate,
  mode,
  staggerMs = 16,
  durationMs = 320,
  className,
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
          style={{ display: "inline-block", transformOrigin: origin }}
          initial={canAnimate ? { rotateX: restRotate, opacity: restOpacity } : target}
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
