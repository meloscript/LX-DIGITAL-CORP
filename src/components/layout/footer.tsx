"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/utils";
import { sectionLinks } from "@/lib/navigation";
import { services } from "@/lib/services-data";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <BrandLogo showName onDark alwaysShowName size={40} className="mb-6" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              Solutions digitales et intelligence artificielle pour accélérer la
              croissance de votre entreprise.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-3">
              {sectionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm text-slate-400 hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 LX Digital Corp. Tous droits réservés.
          </p>
          <p className="text-sm text-slate-500">
            Solutions digitales &amp; intelligence artificielle
          </p>
        </div>
      </div>
    </footer>
  );
}
