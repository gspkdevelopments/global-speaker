"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";
import { activeLanguages } from "@/content/site";
import { allInterfaceLocales, interfaceLocaleMeta } from "@/lib/interface-locale";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

const labels: WithEnglish<{ links: string[]; start: string; interface: string; open: string; close: string; choose: string; mobileNav: string; account: string }> = {
  en: { links: ["Learn", "Professional", "Polyglot", "Method", "Resources", "Culture", "About"], start: "Start learning", interface: "Interface language", open: "Open navigation", close: "Close navigation", choose: "Choose a learning language", mobileNav: "Mobile navigation", account: "Account" },
  es: { links: ["Aprender", "Profesional", "Polyglot", "Método", "Recursos", "Cultura", "Acerca de"], start: "Empezar a aprender", interface: "Idioma de la interfaz", open: "Abrir navegación", close: "Cerrar navegación", choose: "Elige un idioma de aprendizaje", mobileNav: "Navegación móvil", account: "Cuenta" },
  fr: { links: ["Apprendre", "Professionnel", "Polyglot", "Méthode", "Ressources", "Culture", "À propos"], start: "Commencer à apprendre", interface: "Langue de l'interface", open: "Ouvrir la navigation", close: "Fermer la navigation", choose: "Choisir une langue d'apprentissage", mobileNav: "Navigation mobile", account: "Compte" },
  de: { links: ["Lernen", "Beruflich", "Polyglot", "Methode", "Ressourcen", "Kultur", "Über uns"], start: "Jetzt lernen", interface: "Sprache der Oberfläche", open: "Navigation öffnen", close: "Navigation schließen", choose: "Wähle eine Lernsprache", mobileNav: "Mobile Navigation", account: "Konto" },
  it: { links: ["Impara", "Professionale", "Polyglot", "Metodo", "Risorse", "Cultura", "Chi siamo"], start: "Inizia a imparare", interface: "Lingua dell'interfaccia", open: "Apri navigazione", close: "Chiudi navigazione", choose: "Scegli una lingua da imparare", mobileNav: "Navigazione mobile", account: "Account" },
  pt: { links: ["Aprender", "Profissional", "Polyglot", "Método", "Recursos", "Cultura", "Sobre"], start: "Começar a aprender", interface: "Idioma da interface", open: "Abrir navegação", close: "Fechar navegação", choose: "Escolha um idioma para aprender", mobileNav: "Navegação móvel", account: "Conta" },
};

const hrefs = ["/learn", "/professional", "/polyglot", "/method", "/resources", "/culture", "/about"] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { locale, setLocale } = useInterfaceLocale();
  const copy = pickLocaleCopy(labels, locale);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        className="mobile-nav__toggle"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? copy.close : copy.open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      {open ? (
        <div className="mobile-nav__panel" id="mobile-menu">
          <nav aria-label={copy.mobileNav}>
            {hrefs.map((href, index) => {
              const active = pathname === href || (href === "/learn" && pathname.startsWith("/learn/")) || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/")) || (href === "/polyglot" && pathname.startsWith("/polyglot/"));
              return (
              <Fragment key={href}>
              <Link ref={index === 0 ? firstLinkRef : undefined} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{copy.links[index]}
              </Link>
              {index === 0 ? (
                <div className="mobile-nav__languages" aria-label={copy.choose}>
                  {activeLanguages.map((language) => {
                    const langHref = `/learn/${language.key}`;
                    const active2 = pathname === langHref;
                    return (
                      <Link className={active2 ? "is-active" : ""} aria-current={active2 ? "page" : undefined} href={langHref} key={language.key} onClick={() => setOpen(false)}>
                        <span>{language.code}</span>{language.nativeName}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
              </Fragment>
              );
            })}
          </nav>
          <Link className="button button--primary" href="/language-map" onClick={() => setOpen(false)}>
            <span>{copy.start}</span><span aria-hidden="true">↗</span>
          </Link>
          <Link href="/account" onClick={() => setOpen(false)}>{copy.account}</Link>
          <div>
            <p>{copy.interface}</p>
            <fieldset className="mt-3 flex gap-2 flex-wrap">
              <legend className="sr-only">{copy.interface}</legend>
              {allInterfaceLocales.map((item) => (
                <button key={item} type="button" className={`rounded-full border px-3 py-2 text-sm uppercase${locale === item ? " font-bold" : ""}`} aria-pressed={locale === item} onClick={() => setLocale(item)}>
                  {interfaceLocaleMeta[item].code}
                </button>
              ))}
            </fieldset>
          </div>
        </div>
      ) : null}
    </div>
  );
}
