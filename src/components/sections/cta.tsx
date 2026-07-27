"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactHref } from "@/lib/navigation";

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <div className="absolute inset-0 bg-gradient-to-br from-premium/20 via-transparent to-accent/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-premium/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-premium font-semibold text-sm uppercase tracking-wider mb-4">
            Prochaine étape
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Construisons ensemble votre prochaine croissance
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Un échange de 30 minutes pour comprendre vos objectifs et identifier les
            leviers digitaux les plus impactants.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-night hover:bg-slate-100">
              <Link href={contactHref}>
                <Calendar className="h-4 w-4" />
                Planifier un rendez-vous
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
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
