"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInterfaceLocale } from "@/components/interface-locale";

const labels = {
  en: { learn: "Learn", professional: "Professional", method: "Method", resources: "Resources", culture: "Culture", about: "About", learningLanguages: "Learning languages" },
  es: { learn: "Aprender", professional: "Profesional", method: "Método", resources: "Recursos", culture: "Cultura", about: "Acerca de", learningLanguages: "Idiomas de aprendizaje" },
  fr: { learn: "Apprendre", professional: "Professionnel", method: "Méthode", resources: "Ressources", culture: "Culture", about: "À propos", learningLanguages: "Langues d'apprentissage" },
} as const;

const linkDefs = [
  ["professional", "/professional"],
  ["method", "/method"],
  ["resources", "/resources"],
  ["culture", "/culture"],
  ["about", "/about"],
] as const;

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/"));
}

export function DesktopNav() {
  const pathname = usePathname();
  const { locale } = useInterfaceLocale();
  const copy = labels[locale];
  const learnIsCurrent = pathname === "/learn" || pathname.startsWith("/learn/");

  return (
    <nav className="desktop-nav" aria-label={locale === "es" ? "Navegación principal" : locale === "fr" ? "Navigation principale" : "Primary navigation"}>
      <div className="desktop-nav__learn">
        <Link className={learnIsCurrent ? "is-active" : ""} aria-current={learnIsCurrent ? "page" : undefined} href="/learn">{copy.learn}</Link>
        <div className="language-menu" aria-label={copy.learningLanguages}>
          <Link className={pathname === "/learn/english" ? "is-active" : ""} aria-current={pathname === "/learn/english" ? "page" : undefined} href="/learn/english"><span>EN</span> English</Link>
          <Link className={pathname === "/learn/french" ? "is-active" : ""} aria-current={pathname === "/learn/french" ? "page" : undefined} href="/learn/french"><span>FR</span> Français</Link>
          <Link className={pathname === "/learn/spanish" ? "is-active" : ""} aria-current={pathname === "/learn/spanish" ? "page" : undefined} href="/learn/spanish"><span>ES</span> Español</Link>
        </div>
      </div>
      {linkDefs.map(([key, href]) => {
        const active = isCurrent(pathname, href);
        return <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={href}>{copy[key]}</Link>;
      })}
    </nav>
  );
}
