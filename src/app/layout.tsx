import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { content } from "@/lib/content";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(content.site.url),
  title: content.site.title,
  description: content.site.description,
  authors: [{ name: content.site.name, url: content.site.url }],
  creator: content.site.name,
  keywords: [
    "Amine Larbi",
    "portfolio",
    "développeur web",
    "développeur junior",
    "BTS SIO SLAM",
    "alternance",
    "alternance développeur",
    "Île-de-France",
    "Next.js",
    "TypeScript"
  ],
  openGraph: {
    type: "website",
    locale: content.site.locale,
    url: content.site.url,
    title: content.site.title,
    description: content.site.description,
    siteName: content.site.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: content.site.title }]
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F2EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" }
  ],
  width: "device-width",
  initialScale: 1
};

// Anti-FOUC : applique le thème AVANT le premier rendu pour éviter le flash.
const themeBootstrap = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23D4FF00'/%3E%3Crect x='3' y='3' width='58' height='58' fill='none' stroke='%230A0A0A' stroke-width='4'/%3E%3Ctext x='32' y='44' text-anchor='middle' font-family='Space Grotesk,Arial,sans-serif' font-size='30' font-weight='700' fill='%230A0A0A'%3EAL%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
