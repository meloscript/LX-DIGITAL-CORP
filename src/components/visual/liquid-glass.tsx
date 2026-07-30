"use client";

import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type LiquidGlassVariant = "default" | "dark" | "ink";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  /** Enable subtle hover lift + shine */
  interactive?: boolean;
  /** Dark mode glass variant (legacy) */
  dark?: boolean;
  /** Material variant — ink = hero Kinetic */
  variant?: LiquidGlassVariant;
  as?: "div" | "section" | "article";
}

/**
 * Verre liquide — coûteux en peinture (backdrop-filter + saturate). Sur
 * mobile / batterie faible / connexion économe, on sert une variante allégée
 * (flou réduit, pas de reflet animé en boucle) plutôt que de désactiver
 * l'effet, pour garder l'identité visuelle sans plomber les perfs.
 */
export function LiquidGlass({
  children,
  className,
  interactive = false,
  dark = false,
  variant = "default",
  as: Tag = "div",
}: LiquidGlassProps) {
  const { effectsEnabled } = usePerformanceMode();
  const resolved: LiquidGlassVariant = dark ? "dark" : variant;
  const isInk = resolved === "ink";

  return (
    <Tag
      className={cn(
        isInk && (effectsEnabled ? "liquid-glass-ink" : "liquid-glass-ink-lite"),
        resolved === "dark" && "liquid-glass-dark",
        resolved === "default" && "liquid-glass dark:liquid-glass-dark",
        interactive && "liquid-glass-interactive",
        className
      )}
    >
      <span className="liquid-glass-edge" aria-hidden="true" />
      <span className="liquid-glass-shine" aria-hidden="true" />
      {isInk && effectsEnabled && (
        <span className="liquid-glass-specular" aria-hidden="true" />
      )}
      <span className="relative z-[1]">{children}</span>
    </Tag>
  );
}
