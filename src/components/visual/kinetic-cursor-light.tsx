"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type KineticCursorLightProps = {
  className?: string;
  size?: number;
  color?: string;
};

/**
 * Point de lumière ponctuel qui suit le curseur avec un décalage (spring/lerp).
 * Élément d'atmosphère lié à l'interaction — pas un blob décoratif statique.
 * Desktop uniquement, désactivé si effets réduits.
 */
export function KineticCursorLight({
  className,
  size = 560,
  color = "rgba(255, 77, 35, 0.32)",
}: KineticCursorLightProps) {
  const { effectsEnabled, reduced } = usePerformanceMode();
  const ref = useRef<HTMLDivElement>(null);
  // Position de repos : occupe la moitié droite, autrement vide, de la scène —
  // évite un vide total tant que le curseur n'a pas bougé.
  const idle = useRef({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 55, damping: 22, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 55, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (!effectsEnabled || reduced) return;
    const el = ref.current?.parentElement;
    if (!el) return;

    const setIdle = () => {
      const rect = el.getBoundingClientRect();
      idle.current = { x: rect.width * 0.72, y: rect.height * 0.42 };
      x.set(idle.current.x);
      y.set(idle.current.y);
    };
    setIdle();

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      x.set(idle.current.x);
      y.set(idle.current.y);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", setIdle);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", setIdle);
    };
  }, [effectsEnabled, reduced, x, y]);

  if (!effectsEnabled || reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.4, 0.55], scale: [0.9, 1.06, 0.98, 1.06] }}
      transition={{
        opacity: { duration: 2.5, times: [0, 0.3, 0.6, 1], repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        scale: { duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        borderRadius: "9999px",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
