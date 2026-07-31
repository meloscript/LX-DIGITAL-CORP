"use client";

import { useEffect, useState } from "react";

/** Lecture → sortie → entrée (CSS). Îlot client minimal. */
const HOLD_MS = 2800;
const OUT_MS = 750;
const GAP_MS = 200;
const IN_START_MS = HOLD_MS + OUT_MS + GAP_MS;

export function HeroHeadlineSwap() {
  const [leaving, setLeaving] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLeaving(true);
      setResolved(true);
      return;
    }

    const timers = [
      setTimeout(() => setLeaving(true), HOLD_MS),
      setTimeout(() => setResolved(true), IN_START_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`hero-mock-h2 hero-mock-h2-stack${leaving ? " is-leaving" : ""}${resolved ? " is-resolved" : ""}`}
      aria-hidden="true"
    >
      <div className="hero-mock-h2-line-wrap">
        <span className="hero-mock-h2-old">TROUVENT VOS</span>
        <span className="hero-mock-h2-new">VOUS TROUVENT</span>
      </div>
      <div className="hero-mock-h2-line-wrap">
        <span className="hero-mock-h2-old">CONCURRENTS</span>
        <span className="hero-mock-h2-new">D&apos;ABORD</span>
      </div>
    </div>
  );
}
