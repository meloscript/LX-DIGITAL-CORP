import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "LX Digital Corp",
  tagline: "Solutions digitales et intelligence artificielle pour la croissance",
  description:
    "Nous aidons les entreprises à développer leur visibilité, automatiser leurs opérations et accélérer leur croissance grâce au digital et à l'intelligence artificielle.",
  url: "https://lxdigitalcorp.com",
  whatsapp: "33615300314",
  email: "contact@lxdigitalcorp.com",
  phone: "+33 6 15 30 03 14",
};
