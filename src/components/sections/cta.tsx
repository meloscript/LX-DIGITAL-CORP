"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { RevealLabel, RevealParagraph } from "@/components/visual/text-reveal";
import { easePremium } from "@/lib/motion-config";
import { contactHref } from "@/lib/navigation";

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 cta-band relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="text-center max-w-2xl mx-auto"
        >
          <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
            Prochaine étape
          </RevealLabel>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-paper tracking-tight mb-4">
            Construisons ensemble votre visibilité
          </h2>
          <RevealParagraph className="text-base sm:text-lg text-paper/60 mb-7 leading-relaxed font-light" delay={0.08} dynamic="words">
            Un échange de 30 minutes pour comprendre vos objectifs et identifier les
            leviers les plus impactants pour votre site.
          </RevealParagraph>

          <div className="cta-group justify-center">
            <Link
              href={contactHref}
              className="corner-cut-br-sm group inline-flex items-center justify-center gap-2 bg-kinetic px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-kinetic-hover w-full sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Planifier un rendez-vous
            </Link>
            <Link
              href={contactHref}
              className="corner-cut-br-sm inline-flex items-center justify-center gap-2 border border-paper/20 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:border-paper/40 w-full sm:w-auto"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
