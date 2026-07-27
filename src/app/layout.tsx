import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/utils";
import "./globals.css";

const seoTitle =
  "LX Digital Corp | Solutions digitales et IA pour accélérer votre croissance";

export const metadata: Metadata = {
  icons: {
    icon: "/logo-lx.png",
    apple: "/logo-lx.png",
  },
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoTitle,
    template: "%s | LX Digital Corp",
  },
  description: siteConfig.description,
  keywords: [
    "solutions digitales",
    "intelligence artificielle entreprise",
    "référencement local google",
    "création site web professionnel",
    "marketing digital",
    "automatisation IA",
    "croissance digitale",
    "transformation digitale PME",
  ],
  authors: [{ name: "LX Digital Corp" }],
  creator: "LX Digital Corp",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: seoTitle,
    description: siteConfig.description,
    siteName: "LX Digital Corp",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "LX Digital Corp — Solutions digitales et IA pour la croissance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: siteConfig.description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="preview-olive" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
