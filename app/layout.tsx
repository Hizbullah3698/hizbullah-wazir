import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import "@/styles/animations.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hizbullah Wazir — Frontend React Developer",
  description:
    "Portfolio of Hizbullah Wazir — Frontend React Developer specializing in React 19, TypeScript, Next.js, and enterprise-level web applications. Open to opportunities in Dubai and remote.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Dubai",
    "Portfolio",
    "Hizbullah Wazir",
    "AI Integration",
    "React 19",
  ],
  authors: [{ name: "Hizbullah Wazir" }],
  metadataBase: new URL("https://hizbullahwazir.dev"),
  openGraph: {
    title: "Hizbullah Wazir — Frontend React Developer",
    description:
      "Frontend React Developer specializing in React 19, TypeScript, and Next.js. Open to opportunities in Dubai and remote.",
    type: "website",
    locale: "en_US",
    siteName: "Hizbullah Wazir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizbullah Wazir — Frontend React Developer",
    description:
      "Frontend React Developer specializing in React 19, TypeScript, and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hizbullah Wazir",
  jobTitle: "Frontend React Developer",
  url: "https://hizbullahwazir.dev",
  sameAs: [
    "https://github.com/Hizbullah3698",
    "https://www.linkedin.com/in/hizbullahwazir",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "AI Integration",
    "Frontend Development",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "NUML Islamabad",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "UAE",
  },
  description:
    "Frontend React Developer specializing in React 19, TypeScript, Next.js, and AI integration. Open to opportunities in Dubai and remote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-background focus:rounded-md focus:font-jetbrains focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
