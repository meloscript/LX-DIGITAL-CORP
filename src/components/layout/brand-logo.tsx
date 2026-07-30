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
  /** Ancre ciblée par l'intro signature pour la position d'atterrissage. */
  logoId?: string;
};

/** Logo officiel LX — « Work smart » */
export function BrandLogo({
  showName = true,
  className,
  onDark = false,
  alwaysShowName = false,
  size = 36,
  logoId,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group", className)}
      aria-label="LX Digital Corp — Accueil"
    >
      <LogoReveal size={size} priority id={logoId} />
      {showName && (
        <span
          className={cn(
            "font-semibold uppercase tracking-[0.16em] transition-opacity duration-500 group-hover:opacity-90 text-xs sm:text-sm",
            onDark ? "text-white" : "text-night dark:text-white"
          )}
        >
          {alwaysShowName ? (
            "LX Digital Corp"
          ) : (
            <>
              <span className="sm:hidden">LX</span>
              <span className="hidden sm:inline">LX Digital Corp</span>
            </>
          )}
        </span>
      )}
    </Link>
  );
}
