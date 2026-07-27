"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedHeading, RevealLabel, RevealParagraph } from "@/components/visual/text-reveal";
import { easePremium } from "@/lib/motion-config";
import { contactHref } from "@/lib/navigation";

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <div className="absolute inset-0 bg-gradient-to-br from-premium/20 via-transparent to-accent/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-premium/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 cta-band relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="text-center max-w-2xl mx-auto"
        >
          <RevealLabel className="text-premium font-semibold text-sm uppercase tracking-wider mb-3">
            Prochaine étape
          </RevealLabel>
          <AnimatedHeading className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight mb-4">
            Construisons ensemble votre prochaine croissance
          </AnimatedHeading>
          <RevealParagraph className="text-base sm:text-lg text-slate-300 mb-7 leading-relaxed" delay={0.08} dynamic="words">
            Un échange de 30 minutes pour comprendre vos objectifs et identifier les
            leviers digitaux les plus impactants.
          </RevealParagraph>

          <div className="cta-group justify-center">
            <Button
              asChild
              size="lg"
              className="btn-cta-solid bg-white text-night hover:bg-slate-100 w-full sm:w-auto"
            >
              <Link href={contactHref}>
                <Calendar className="h-4 w-4" />
                Planifier un rendez-vous
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="btn-cta-ghost w-full sm:w-auto">
              <Link href={contactHref}>
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
