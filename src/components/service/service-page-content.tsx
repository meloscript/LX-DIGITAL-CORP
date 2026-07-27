import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { contactHref } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/visual/liquid-glass";

type ServicePageContentProps = {
  service: ServiceData;
};

export function ServicePageContent({ service }: ServicePageContentProps) {
  const Icon = service.icon;

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-surface dark:from-night dark:via-night dark:to-night/95" />
        <div className="absolute top-20 -right-32 w-96 h-96 bg-premium/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1 text-sm text-premium font-medium mb-6 hover:underline"
            >
              ← Retour aux services
            </Link>
            <div
              className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-6 w-fit shadow-lg`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-night dark:text-white tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-premium font-medium mb-4">{service.promise}</p>
            <p className="text-lg text-muted leading-relaxed mb-8">{service.introduction}</p>
            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface dark:bg-night/50">
        <div className="container-max mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-night dark:text-white mb-6">
              Les problèmes que nous résolvons
            </h2>
            <ul className="space-y-4">
              {service.problems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-premium shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-night dark:text-white mb-6">
              Ce que vous gagnez concrètement
            </h2>
            <ul className="space-y-4">
              {service.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-premium shrink-0 mt-0.5" />
                  <span className="text-night dark:text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center mb-12">
            Notre méthode LX Digital Corp
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {service.method.map((step, i) => (
              <LiquidGlass key={step.title} className="rounded-2xl p-8 h-full">
                <span className="text-sm font-bold text-premium mb-3 block">
                  Étape {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-night dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface dark:bg-night/50">
        <div className="container-max mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center mb-10">
            Livrables et actions incluses
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl liquid-glass dark:liquid-glass-dark"
              >
                <CheckCircle2 className="h-5 w-5 text-premium shrink-0" />
                <span className="text-sm text-night dark:text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-night dark:text-white text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {service.faq.map((item) => (
              <LiquidGlass key={item.question} className="rounded-2xl p-6">
                <h3 className="font-semibold text-night dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-muted leading-relaxed">{item.answer}</p>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-night" />
        <div className="absolute inset-0 bg-gradient-to-br from-premium/20 via-transparent to-accent/20" />
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Prêt à avancer sur {service.title.toLowerCase()} ?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Discutons de vos objectifs et définissons un plan d&apos;action adapté à votre
            activité.
          </p>
          <Button asChild size="lg" className="bg-white text-night hover:bg-slate-100">
            <Link href={contactHref}>
              Parler à un expert
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
