"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { BrandLogo } from "@/components/layout/brand-logo";
import { HoverSwapText } from "@/components/visual/hover-swap";
import { sectionLinks, contactHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Lien de nav qui se distord légèrement (skew) dans le sens du mouvement du curseur */
function KineticNavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [skew, setSkew] = useState(0);
  const lastX = useRef<number | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    if (lastX.current !== null) {
      const delta = e.clientX - lastX.current;
      setSkew(Math.max(-10, Math.min(10, delta * 1.4)));
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setSkew(0), 180);
    }
    lastX.current = e.clientX;
  };

  const handleLeave = () => {
    lastX.current = null;
    setSkew(0);
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: `skewX(${skew}deg)`, transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      className={cn("inline-block", className)}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top)]",
        scrolled
          ? "liquid-glass dark:liquid-glass-dark border-b border-slate-200/50 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          <BrandLogo onDark={!scrolled} logoId="brand-logo-anchor" size={32} />

          <div className="hidden lg:flex items-center gap-8">
            {sectionLinks.map((link) => (
              <KineticNavLink
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  scrolled
                    ? "text-muted hover:text-night dark:hover:text-white"
                    : "text-paper/70 hover:text-paper"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kinetic group-hover:w-full transition-all duration-300" />
              </KineticNavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "p-2.5 rounded-lg transition-colors",
                  scrolled
                    ? "text-muted hover:text-night dark:hover:text-white hover:bg-surface dark:hover:bg-white/5"
                    : "text-paper/70 hover:text-paper hover:bg-white/10"
                )}
                aria-label="Changer le thème"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <Link
              href={contactHref}
              className="corner-cut-br-sm group hidden sm:inline-flex items-center bg-kinetic px-5 py-2.5 text-base font-semibold text-paper transition-colors duration-300 hover:bg-kinetic-hover"
            >
              <HoverSwapText>Parler à un expert</HoverSwapText>
            </Link>

            <button
              type="button"
              className={cn(
                "lg:hidden p-2.5 rounded-lg",
                scrolled ? "text-night dark:text-white" : "text-paper"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200/50 dark:border-white/10 bg-paper dark:bg-ink"
          >
            <div className="container-max mx-auto px-4 py-4 flex flex-col gap-1 max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 px-4 text-base font-medium text-ink dark:text-paper hover:bg-surface dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={contactHref}
                onClick={() => setMobileOpen(false)}
                className="corner-cut-br-sm mt-3 inline-flex items-center justify-center bg-kinetic px-5 py-3.5 text-base font-semibold text-paper"
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
