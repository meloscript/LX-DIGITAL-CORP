"use client";

import { cn } from "@/lib/utils";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  /** Enable subtle hover lift + shine */
  interactive?: boolean;
  /** Dark mode glass variant */
  dark?: boolean;
  as?: "div" | "section" | "article";
}

export function LiquidGlass({
  children,
  className,
  interactive = false,
  dark = false,
  as: Tag = "div",
}: LiquidGlassProps) {
  return (
    <Tag
      className={cn(
        "liquid-glass dark:liquid-glass-dark",
        dark && "liquid-glass-dark",
        interactive && "liquid-glass-interactive",
        className
      )}
    >
      <span className="liquid-glass-edge" aria-hidden="true" />
      <span className="liquid-glass-shine" aria-hidden="true" />
      <span className="relative z-[1]">{children}</span>
    </Tag>
  );
}
