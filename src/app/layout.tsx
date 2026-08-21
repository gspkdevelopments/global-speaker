import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = "https://globalspeaker.world";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Global Speaker — Language begins with your life", template: "%s — Global Speaker" },
  description: "Personalized English, French, and Spanish learning built around your real life, work, interests, and world.",
  keywords: ["language learning", "English", "French", "Spanish", "language resources", "Tulum"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en", url: siteUrl, siteName: "Global Speaker", title: "Global Speaker — Speak more of the world", description: "Learn the language through the life you already live." },
  twitter: { card: "summary_large_image", title: "Global Speaker", description: "Language begins with your life." },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Speaker",
  url: siteUrl,
  description: "Personalized English, French, and Spanish language development rooted in real life.",
  areaServed: ["Tulum", "Riviera Maya", "Online"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
