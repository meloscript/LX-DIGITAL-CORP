"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RevealLabel } from "@/components/visual/text-reveal";
import { kineticEase } from "@/lib/motion-config";
import { siteConfig } from "@/lib/utils";
import { cn } from "@/lib/utils";

type FieldErrors = Record<string, string>;

const STEPS = ["name", "company", "email", "phone", "message"] as const;
type Step = (typeof STEPS)[number];

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

const fieldMeta: Record<Step, { label: string; type?: string; placeholder: string }> = {
  name: { label: "Nom", placeholder: "Jean Dupont" },
  company: { label: "Entreprise", placeholder: "Nom de votre entreprise" },
  email: { label: "Email", type: "email", placeholder: "contact@entreprise.com" },
  phone: { label: "Téléphone", type: "tel", placeholder: "+33 6 XX XX XX XX" },
  message: { label: "Message", placeholder: "Décrivez vos objectifs et vos besoins..." },
};

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState<Record<Step, string>>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [unlocked, setUnlocked] = useState(1);

  const handleChange = (step: Step, value: string) => {
    setValues((v) => ({ ...v, [step]: value }));
    const index = STEPS.indexOf(step);
    if (value.trim().length > 0 && unlocked === index + 1) {
      setUnlocked((u) => Math.max(u, index + 2));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const canSubmit = unlocked > STEPS.length;

  return (
    <section id="contact" className="section-padding bg-paper">
      <div className="container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
              Contact
            </RevealLabel>
            <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl tracking-tight mb-4">
              Parlons de votre visibilité
            </h2>
            <p className="text-ink/60 leading-relaxed font-light mb-6">
              Remplissez le formulaire ou contactez-nous directement. Réponse sous 24 h
              ouvrées.
            </p>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour,%20je%20souhaite%20discuter%20de%20mes%20objectifs%20de%20croissance%20digitale.`}
                target="_blank"
                rel="noopener noreferrer"
                className="corner-cut-br-sm flex items-center gap-4 p-4 bg-white border border-ink/10 hover:border-kinetic/40 transition-colors group"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-kinetic/10 flex items-center justify-center group-hover:bg-kinetic/15 transition-colors">
                  <Phone className="h-5 w-5 text-kinetic" />
                </div>
                <div>
                  <p className="font-medium text-ink">WhatsApp</p>
                  <p className="text-sm text-ink/60">{siteConfig.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="corner-cut-br-sm flex items-center gap-4 p-4 bg-white border border-ink/10 hover:border-kinetic/40 transition-colors group"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-kinetic/10 flex items-center justify-center group-hover:bg-kinetic/15 transition-colors">
                  <Mail className="h-5 w-5 text-kinetic" />
                </div>
                <div>
                  <p className="font-medium text-ink">Email professionnel</p>
                  <p className="text-sm text-ink/60">{siteConfig.email}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="corner-cut-br bg-white border border-ink/10 p-8 shadow-xl shadow-ink/5">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="h-16 w-16 rounded-full bg-kinetic/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-kinetic" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">Message envoyé</h3>
                <p className="text-ink/60">
                  Nous vous recontacterons dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <AnimatePresence initial={false}>
                  {STEPS.map((step, index) => {
                    if (index + 1 > unlocked) return null;
                    const meta = fieldMeta[step];
                    const isMessage = step === "message";

                    return (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: kineticEase }}
                        className="space-y-2"
                      >
                        <Label htmlFor={step}>{meta.label}</Label>
                        {isMessage ? (
                          <textarea
                            id={step}
                            name={step}
                            rows={4}
                            placeholder={meta.placeholder}
                            required
                            value={values[step]}
                            onChange={(e) => handleChange(step, e.target.value)}
                            className="corner-cut-br-sm flex w-full border border-ink/15 bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kinetic/30 focus-visible:border-kinetic resize-none"
                          />
                        ) : (
                          <input
                            id={step}
                            name={step}
                            type={meta.type ?? "text"}
                            placeholder={meta.placeholder}
                            required
                            value={values[step]}
                            onChange={(e) => handleChange(step, e.target.value)}
                            className={cn(
                              "corner-cut-br-sm flex h-12 w-full border border-ink/15 bg-white px-4 py-2 text-base text-ink transition-colors placeholder:text-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kinetic/30 focus-visible:border-kinetic",
                              errors[step] && "border-red-400 focus-visible:ring-red-400/30"
                            )}
                          />
                        )}
                        {errors[step] && (
                          <p className="text-xs text-red-500">{errors[step]}</p>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <AnimatePresence>
                  {canSubmit && (
                    <motion.button
                      key="submit"
                      type="submit"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: kineticEase }}
                      disabled={loading}
                      className="corner-cut-br-sm group w-full inline-flex items-center justify-center gap-2 bg-kinetic px-6 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-kinetic-hover disabled:opacity-60"
                    >
                      {loading ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          Envoyer ma demande
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
