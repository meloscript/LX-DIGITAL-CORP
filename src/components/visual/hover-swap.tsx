"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HoverSwapTextProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Effet "roue verticale" — au survol du parent (group), le texte courant
 * se décale vers le haut pendant qu'une copie identique apparaît par-dessous.
 * Purement CSS (transform + group-hover), aucun JS requis.
 */
export function HoverSwapText({ children, className }: HoverSwapTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden [transform:translateZ(0)]",
        className
      )}
    >
      <span className="col-start-1 row-start-1 inline-flex items-center gap-2 transition-transform duration-500 ease-expo group-hover:-translate-y-[130%]">
        {children}
      </span>
      <span
        className="col-start-1 row-start-1 inline-flex items-center gap-2 translate-y-[130%] transition-transform duration-500 ease-expo group-hover:translate-y-0"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
