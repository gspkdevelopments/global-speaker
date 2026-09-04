import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
import { InterfaceLocaleProvider } from "@/components/interface-locale";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy } from "@/lib/locale-copy";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-interface",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Global Speaker — Language begins with your life", template: "%s — Global Speaker" },
  description: "Personalized English, French, and Spanish learning built around your real life, work, interests, and world.",
  keywords: ["language learning", "English", "French", "Spanish", "language resources", "Tulum"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en", url: siteConfig.siteUrl, siteName: "Global Speaker", title: "Global Speaker — Speak more of the world", description: "Learn the language through the life you already live." },
  twitter: { card: "summary_large_image", title: "Global Speaker", description: "Language begins with your life." },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Speaker",
  url: siteConfig.siteUrl,
  description: "Personalized English, French, and Spanish language development rooted in real life.",
  areaServed: ["Tulum", "Riviera Maya", "Online"],
};

const skipLabels = { en: "Skip to content", es: "Saltar al contenido", fr: "Aller au contenu" } as const;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getInterfaceLocale();
  return (
    <html lang={locale} className={`${newsreader.variable} ${workSans.variable}`}>
      <body>
        <InterfaceLocaleProvider initialLocale={locale}>
          <a className="skip-link" href="#main-content">{pickLocaleCopy(skipLabels, locale)}</a>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </InterfaceLocaleProvider>
      </body>
    </html>
  );
}
