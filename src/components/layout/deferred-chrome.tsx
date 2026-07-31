"use client";

import dynamic from "next/dynamic";

const LogoSignatureIntro = dynamic(
  () =>
    import("@/components/visual/logo-signature-intro").then(
      (m) => m.LogoSignatureIntro
    ),
  { ssr: false }
);

const ScrollProgressRail = dynamic(
  () =>
    import("@/components/visual/scroll-progress-rail").then(
      (m) => m.ScrollProgressRail
    ),
  { ssr: false }
);

const WhatsAppButton = dynamic(
  () =>
    import("@/components/whatsapp-button").then((m) => m.WhatsAppButton),
  { ssr: false }
);

/** Chrome non critique — chargé après l’hydratation */
export function DeferredIntro() {
  return <LogoSignatureIntro />;
}

export function DeferredScrollRail() {
  return <ScrollProgressRail />;
}

export function DeferredWhatsApp() {
  return <WhatsAppButton />;
}
