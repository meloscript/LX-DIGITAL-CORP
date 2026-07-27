"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20digitaux.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full" />
    </a>
  );
}
