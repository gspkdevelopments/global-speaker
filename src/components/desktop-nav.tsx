"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInterfaceLocale } from "@/components/interface-locale";
import { activeLanguages } from "@/content/site";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

const labels: WithEnglish<{
  learn: string;
  professional: string;
  polyglot: string;
  method: string;
  resources: string;
  culture: string;
  about: string;
  learningLanguages: string;
  primaryNav: string;
}> = {
  en: { learn: "Learn", professional: "Professional", polyglot: "Polyglot", method: "Method", resources: "Resources", culture: "Culture", about: "About", learningLanguages: "Learning languages", primaryNav: "Primary navigation" },
  es: { learn: "Aprender", professional: "Profesional", polyglot: "Polyglot", method: "Método", resources: "Recursos", culture: "Cultura", about: "Acerca de", learningLanguages: "Idiomas de aprendizaje", primaryNav: "Navegación principal" },
  fr: { learn: "Apprendre", professional: "Professionnel", polyglot: "Polyglot", method: "Méthode", resources: "Ressources", culture: "Culture", about: "À propos", learningLanguages: "Langues d'apprentissage", primaryNav: "Navigation principale" },
  de: { learn: "Lernen", professional: "Beruflich", polyglot: "Polyglot", method: "Methode", resources: "Ressourcen", culture: "Kultur", about: "Über uns", learningLanguages: "Lernsprachen", primaryNav: "Hauptnavigation" },
  it: { learn: "Impara", professional: "Professionale", polyglot: "Polyglot", method: "Metodo", resources: "Risorse", culture: "Cultura", about: "Chi siamo", learningLanguages: "Lingue di apprendimento", primaryNav: "Navigazione principale" },
  pt: { learn: "Aprender", professional: "Profissional", polyglot: "Polyglot", method: "Método", resources: "Recursos", culture: "Cultura", about: "Sobre", learningLanguages: "Idiomas de aprendizagem", primaryNav: "Navegação principal" },
};

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/")) || (href === "/polyglot" && pathname.startsWith("/polyglot/"));
}

export function DesktopNav() {
  const pathname = usePathname();
  const { locale } = useInterfaceLocale();
  const copy = pickLocaleCopy(labels, locale);
  const learnIsCurrent = pathname === "/learn" || pathname.startsWith("/learn/");
  const linkDefs: [string, string][] = [
    [copy.professional, "/professional"],
    [copy.polyglot, "/polyglot"],
    [copy.method, "/method"],
    [copy.resources, "/resources"],
    [copy.culture, "/culture"],
    [copy.about, "/about"],
  ];

  return (
    <nav className="desktop-nav" aria-label={copy.primaryNav}>
      <div className="desktop-nav__learn">
        <Link className={learnIsCurrent ? "is-active" : ""} aria-current={learnIsCurrent ? "page" : undefined} href="/learn">{copy.learn}</Link>
        <div className="language-menu" aria-label={copy.learningLanguages}>
          {activeLanguages.map((language) => {
            const href = `/learn/${language.key}`;
            const active = pathname === href;
            return (
              <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={language.key}>
                <span>{language.code}</span> {language.nativeName}
              </Link>
            );
          })}
        </div>
      </div>
      {linkDefs.map(([label, href]) => {
        const active = isCurrent(pathname, href);
        return <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={href}>{label}</Link>;
      })}
    </nav>
  );
}
