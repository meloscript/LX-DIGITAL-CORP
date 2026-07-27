"use client";

import Link from "next/link";
import { LogoReveal } from "@/components/visual/logo-reveal";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  showName?: boolean;
  className?: string;
  /** Footer / fond sombre */
  onDark?: boolean;
  /** Afficher le nom sur tous les écrans (footer) */
  alwaysShowName?: boolean;
  /** Taille du logo en pixels */
  size?: number;
};

/** Logo officiel LX — « Work smart » */
export function BrandLogo({
  showName = true,
  className,
  onDark = false,
  alwaysShowName = false,
  size = 36,
}: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <LogoReveal size={size} priority />
      {showName && (
        <span
          className={cn(
            "font-semibold tracking-tight transition-opacity duration-500 group-hover:opacity-90",
            alwaysShowName ? "inline" : "hidden sm:block",
            onDark ? "text-white" : "text-night dark:text-white"
          )}
        >
          LX Digital Corp
        </span>
      )}
    </Link>
  );
}
