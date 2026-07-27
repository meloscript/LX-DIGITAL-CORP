"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { sectionLinks, contactHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "liquid-glass dark:liquid-glass-dark border-b border-slate-200/50 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <BrandLogo />

          <div className="hidden lg:flex items-center gap-8">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-night dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-premium group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-muted hover:text-night dark:hover:text-white hover:bg-surface dark:hover:bg-white/5 transition-colors"
                aria-label="Changer le thème"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href={contactHref}>Parler à un expert</Link>
            </Button>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-night dark:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden liquid-glass dark:liquid-glass-dark border-b border-slate-200/50 dark:border-white/10"
          >
            <div className="container-max mx-auto px-4 py-4 flex flex-col gap-2">
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 text-sm font-medium text-muted hover:text-night dark:hover:text-white hover:bg-surface dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href={contactHref} onClick={() => setMobileOpen(false)}>
                  Parler à un expert
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
