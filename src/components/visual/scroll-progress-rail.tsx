"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { sectionLinks } from "@/lib/navigation";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type Marker = { id: string; label: string; top: number };

/**
 * Le fil conducteur : un rail vertical fixe qui trace la progression réelle
 * du scroll sur toute la page, avec un point par section. Ce n'est pas un
 * décor — c'est une information (où j'en suis, où je vais) qui relie
 * visuellement le hero à chaque section jusqu'au contact.
 * Desktop uniquement (lg+), désactivé si effets réduits.
 */
export function ScrollProgressRail() {
  const { effectsEnabled, reduced } = usePerformanceMode();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activeId, setActiveId] = useState<string>("accueil");

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.4,
  });

  useEffect(() => {
    if (!effectsEnabled || reduced) return;

    const compute = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const next = sectionLinks.map(({ href, label }) => {
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        // getBoundingClientRect + scrollY plutôt que offsetTop : certaines
        // sections sont enveloppées dans un conteneur positionné (chargement
        // différé), ce qui fausserait offsetTop (relatif à ce wrapper).
        const absoluteTop = el
          ? el.getBoundingClientRect().top + window.scrollY
          : 0;
        const top = (absoluteTop / docHeight) * 100;
        return { id, label, top: Math.min(100, Math.max(0, top)) };
      });
      setMarkers(next);
    };

    compute();
    window.addEventListener("resize", compute);
    // Filet de sécurité : les sections peuvent changer de hauteur une fois
    // les polices/images chargées ou les animations d'entrée terminées.
    const resizeObserver = new ResizeObserver(() => compute());
    resizeObserver.observe(document.body);
    const settle = setTimeout(compute, 1200);
    return () => {
      window.removeEventListener("resize", compute);
      resizeObserver.disconnect();
      clearTimeout(settle);
    };
  }, [effectsEnabled, reduced]);

  useEffect(() => {
    if (!effectsEnabled || reduced) return;
    const ids = sectionLinks.map(({ href }) => href.replace("/#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [effectsEnabled, reduced]);

  if (!effectsEnabled || reduced || markers.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      style={{ height: "min(56vh, 480px)" }}
    >
      <div className="relative h-full w-px" style={{ background: "rgba(255,255,255,0.5)", mixBlendMode: "difference" }}>
        <motion.div
          className="absolute inset-x-0 top-0 w-px origin-top bg-kinetic"
          style={{ height: "100%", scaleY }}
        />

        {markers.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-label={`Aller à la section ${m.label}`}
            onClick={() =>
              document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ top: `${m.top}%` }}
          >
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-70"
              style={{ mixBlendMode: "difference" }}
            >
              {m.label}
            </span>
            <span
              className={
                "block rounded-full transition-all duration-300 " +
                (activeId === m.id
                  ? "h-[7px] w-[7px] bg-kinetic"
                  : "h-[5px] w-[5px] bg-white/50 group-hover:bg-white/80")
              }
              style={activeId === m.id ? undefined : { mixBlendMode: "difference" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
