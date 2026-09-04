"use client";

import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { useInterfaceLocale } from "@/components/interface-locale";
import { MobileNav } from "@/components/mobile-nav";
import { pickLocaleCopy } from "@/lib/locale-copy";

const startLabels = { en: "Start learning", es: "Empezar", fr: "Commencer" } as const;
const homeLabels = { en: "Global Speaker home", es: "Inicio de Global Speaker", fr: "Accueil Global Speaker" } as const;

export function SiteHeader() {
  const { locale, setLocale } = useInterfaceLocale();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="wordmark" href="/" aria-label={pickLocaleCopy(homeLabels, locale)}>
          <span className="wordmark__mark" aria-hidden="true">G/S</span>
          <span>Global Speaker</span>
        </Link>
        <DesktopNav />
        <div className="site-header__actions">
          <div className="interface-label flex items-center gap-1" role="group" aria-label="Interface language">
            {(["en", "es", "fr"] as const).map((item, index) => (
              <span key={item} className="flex items-center gap-1">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <button type="button" aria-pressed={locale === item} className={locale === item ? "font-bold underline underline-offset-4" : ""} onClick={() => setLocale(item)}>{item.toUpperCase()}</button>
              </span>
            ))}
          </div>
          <Link className="nav-cta" href="/language-map">{pickLocaleCopy(startLabels, locale)} <span aria-hidden="true">↗</span></Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
