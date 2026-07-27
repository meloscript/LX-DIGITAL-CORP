"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MotionSection } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import { siteConfig } from "@/lib/utils";
import { cn } from "@/lib/utils";

type FieldErrors = Record<string, string>;

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const email = String(data.get("email") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Adresse email invalide";
  }
  const phone = String(data.get("phone") ?? "");
  if (phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Numéro trop court";
  }
  return errors;
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
    setTouched({ name: true, company: true, email: true, phone: true, message: true });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const fieldClass = (name: string, valid?: boolean) =>
    cn(
      touched[name] && errors[name] && "border-red-400 focus-visible:ring-red-400/30",
      touched[name] && valid && !errors[name] && "border-emerald-500/50 focus-visible:ring-emerald-500/30"
    );

  return (
    <section id="contact" className="section-padding section-alt">
      <div className="container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <MotionSection>
            <p className="section-label">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-night dark:text-white tracking-tight mb-4">
              Parlons de vos objectifs
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Remplissez le formulaire ou contactez-nous directement. Réponse sous 24 h
              ouvrées.
            </p>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour,%20je%20souhaite%20discuter%20de%20mes%20objectifs%20de%20croissance%20digitale.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-night/50 border border-slate-200/60 dark:border-white/10 hover:border-green-500/30 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-night dark:text-white">WhatsApp</p>
                  <p className="text-sm text-muted">Réponse rapide garantie</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-night/50 border border-slate-200/60 dark:border-white/10 hover:border-premium/30 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-premium/10 flex items-center justify-center group-hover:bg-premium/20 transition-colors">
                  <Mail className="h-5 w-5 text-premium" />
                </div>
                <div>
                  <p className="font-medium text-night dark:text-white">Email professionnel</p>
                  <p className="text-sm text-muted">{siteConfig.email}</p>
                </div>
              </a>
            </div>
          </MotionSection>

          <MotionSection delay={0.2}>
            <LiquidGlass className="rounded-2xl p-8 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-night dark:text-white mb-2">
                    Message envoyé
                  </h3>
                  <p className="text-muted">
                    Nous vous recontacterons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jean Dupont"
                        required
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nom de votre entreprise"
                        required
                        onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contact@entreprise.com"
                        required
                        className={fieldClass("email", true)}
                        onBlur={(e) => {
                          setTouched((t) => ({ ...t, email: true }));
                          const email = e.target.value;
                          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                            setErrors((err) => ({ ...err, email: "Adresse email invalide" }));
                          } else {
                            setErrors((err) => {
                              const next = { ...err };
                              delete next.email;
                              return next;
                            });
                          }
                        }}
                      />
                      {touched.email && errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+33 6 XX XX XX XX"
                        required
                        className={fieldClass("phone", true)}
                        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Décrivez vos objectifs et vos besoins..."
                      required
                      onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                      className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/30 focus-visible:border-premium dark:border-white/10 dark:bg-night/50 dark:text-white resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </LiquidGlass>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
