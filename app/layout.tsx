import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://neuralcapital.com";
const SITE_NAME = "Neural Capital";
const SITE_DESCRIPTION =
  "Tecnologia, automação e educação para mercados financeiros e ativos digitais. Forex, Criptoativos e sistemas quantitativos em um único ecossistema.";

export const metadata: Metadata = {
  // ─── Básico ────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neural Capital | Forex & Criptoativos",
    template: "%s | Neural Capital",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Forex",
    "Criptoativos",
    "Copy Trading",
    "Expert Advisor",
    "Robô Forex",
    "DeFi",
    "Sistemas Quantitativos",
    "Neural Capital",
    "Mercado Financeiro",
    "Ativos Digitais",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ─── Robots / Indexação ────────────────────────────────────────────────────
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

  // ─── Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ──────────────────────
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Neural Capital | Forex & Criptoativos",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/neural-capital-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Neural Capital — Quantitative Systems",
      },
    ],
  },

  // ─── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Neural Capital | Forex & Criptoativos",
    description: SITE_DESCRIPTION,
    images: ["/neural-capital-logo.jpg"],
    creator: "@neuralcapital",
  },

  // ─── Ícones ────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/neural-capital-n-original.png",
  },

  // ─── Outros ───────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: { "pt-BR": SITE_URL },
  },

  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
