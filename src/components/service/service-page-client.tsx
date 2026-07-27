"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { getServiceBySlug, type ServiceSlug } from "@/lib/services-data";
import { contactHref } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionCard } from "@/components/motion";
import {
  AnimatedHeading,
  RevealParagraph,
  RevealTitle,
  RevealWords,
  RevealSubtitle,
} from "@/components/visual/text-reveal";
import { AnimatedIcon } from "@/components/visual/animated-icon";
import { LiquidGlass } from "@/components/visual/liquid-glass";

type ServicePageClientProps = {
  slug: ServiceSlug;
};

export function ServicePageClient({ slug }: ServicePageClientProps) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const Icon = service.icon;

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        <div
          data-page-bg="hero"
          className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-surface dark:from-night dark:via-night dark:to-night/95"
        />
        <div className="absolute top-20 -right-32 w-96 h-96 bg-premium/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionSection className="max-w-3xl">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1 text-sm text-premium font-medium mb-6 hover:underline"
            >
              ← Retour aux services
            </Link>
            <AnimatedIcon
              icon={Icon}
              delay={0.05}
              wrapperClassName={`rounded-xl bg-gradient-to-br ${service.color} mb-6 w-fit shadow-lg`}
              className="h-7 w-7 text-white"
            />
            <RevealTitle as="h1" className="text-4xl sm:text-5xl font-bold text-night dark:text-white tracking-tight mb-4">
              {service.title}
            </RevealTitle>
            <RevealParagraph className="text-xl text-premium font-medium mb-4" delay={0.1} dynamic="words">
              {service.promise}
            </RevealParagraph>
            <RevealParagraph className="text-lg text-muted leading-relaxed mb-8" delay={0.16} dynamic="words">
              {service.introduction}
            </RevealParagraph>
            <div className="cta-group">
              <Button asChild size="lg">
                <Link href={contactHref}>
                  Parler à un expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={contactHref}>
                  <Calendar className="h-4 w-4" />
                  Planifier un rendez-vous
                </Link>
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-surface dark:bg-night/50">
        <div className="container-max mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          <MotionSection delay={0.05}>
            <RevealTitle as="h2" className="text-2xl sm:text-3xl font-bold text-night dark:text-white mb-6">
              Les problèmes que nous résolvons
            </RevealTitle>
            <ul className="space-y-4">
              {service.problems.map((item, i) => (
                <MotionCard key={item} delay={i * 0.05} float={false}>
                  <li className="flex items-start gap-3 text-muted">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-premium shrink-0" />
                    {item}
                  </li>
                </MotionCard>
              ))}
            </ul>
          </MotionSection>
          <MotionSection delay={0.1}>
            <RevealTitle as="h2" className="text-2xl sm:text-3xl font-bold text-night dark:text-white mb-6">
              Ce que vous gagnez concrètement
            </RevealTitle>
            <ul className="space-y-4">
              {service.benefits.map((item, i) => (
                <MotionCard key={item} delay={i * 0.05} float={false}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-premium shrink-0 mt-0.5" />
                    <span className="text-night dark:text-white">{item}</span>
                  </li>
                </MotionCard>
              ))}
            </ul>
          </MotionSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <MotionSection className="text-center section-header-space" parallax>
            <RevealTitle
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center"
            >
              Notre méthode LX Digital Corp
            </RevealTitle>
          </MotionSection>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {service.method.map((step, i) => (
              <MotionCard key={step.title} delay={i * 0.1}>
                <LiquidGlass interactive className="rounded-2xl p-8 h-full">
                  <span className="text-sm font-bold text-premium mb-3 block">
                    Étape {String(i + 1).padStart(2, "0")}
                  </span>
                  <RevealSubtitle delay={i * 0.05} className="text-xl font-bold text-night dark:text-white mb-3">
                    {step.title}
                  </RevealSubtitle>
                  <RevealWords
                    text={step.description}
                    compact
                    delay={0.08 + i * 0.05}
                    className="text-muted leading-relaxed block"
                    as="span"
                  />
                </LiquidGlass>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface dark:bg-night/50">
        <div className="container-max mx-auto max-w-3xl">
          <MotionSection className="text-center section-header-space mb-10" parallax>
            <RevealTitle
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center"
            >
              Livrables et actions incluses
            </RevealTitle>
          </MotionSection>
          <ul className="grid sm:grid-cols-2 gap-4">
            {service.deliverables.map((item, i) => (
              <MotionCard key={item} delay={i * 0.05}>
                <li className="flex items-center gap-3 p-4 rounded-xl liquid-glass dark:liquid-glass-dark">
                  <CheckCircle2 className="h-5 w-5 text-premium shrink-0" />
                  <span className="text-sm text-night dark:text-white">{item}</span>
                </li>
              </MotionCard>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto max-w-3xl">
          <MotionSection className="text-center section-header-space mb-10" parallax>
            <RevealTitle
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center"
            >
              Questions fréquentes
            </RevealTitle>
          </MotionSection>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <MotionCard key={item.question} delay={i * 0.06}>
                <LiquidGlass interactive className="rounded-2xl p-6">
                  <h3 className="font-semibold text-night dark:text-white mb-2">
                    {item.question}
                  </h3>
                  <RevealWords
                    text={item.answer}
                    compact
                    delay={i * 0.04}
                    className="text-muted leading-relaxed block"
                    as="span"
                  />
                </LiquidGlass>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-night" />
        <div className="absolute inset-0 bg-gradient-to-br from-premium/20 via-transparent to-accent/20" />
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 cta-band relative z-10 text-center">
          <MotionSection>
            <AnimatedHeading className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {`Prêt à avancer sur ${service.title.toLowerCase()} ?`}
            </AnimatedHeading>
            <RevealParagraph className="text-slate-300 mb-6 max-w-xl mx-auto" delay={0.08} dynamic="words">
              Discutons de vos objectifs et définissons un plan d&apos;action adapté à votre
              activité.
            </RevealParagraph>
            <Button
              asChild
              size="lg"
              className="btn-cta-solid bg-white text-night hover:bg-slate-100"
            >
              <Link href={contactHref}>
                Parler à un expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MotionSection>
        </div>
      </section>
    </>
  );
}
