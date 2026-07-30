"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/utils";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

/** Visible uniquement après 45 % de scroll de la page. */
export function WhatsAppButton() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setVisible(progress >= 0.45);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20digitaux.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-[100] h-14 w-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors duration-300 bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] pointer-events-auto"
          aria-label="Contacter via WhatsApp"
          initial={reduced ? false : { opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={effectsEnabled ? { scale: 1.08 } : undefined}
          whileTap={effectsEnabled ? { scale: 0.94 } : undefined}
        >
          <motion.span
            animate={effectsEnabled && !reduced ? { y: [0, -2, 0] } : undefined}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="h-7 w-7" />
          </motion.span>
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
