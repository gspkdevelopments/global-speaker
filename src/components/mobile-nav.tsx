"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";

const labels = {
  en: { links: ["Learn", "Professional", "Method", "Resources", "Culture", "About"], start: "Start learning", interface: "Interface language", open: "Open navigation", close: "Close navigation", choose: "Choose a learning language" },
  es: { links: ["Aprender", "Profesional", "Método", "Recursos", "Cultura", "Acerca de"], start: "Empezar a aprender", interface: "Idioma de la interfaz", open: "Abrir navegación", close: "Cerrar navegación", choose: "Elige un idioma de aprendizaje" },
  fr: { links: ["Apprendre", "Professionnel", "Méthode", "Ressources", "Culture", "À propos"], start: "Commencer à apprendre", interface: "Langue de l'interface", open: "Ouvrir la navigation", close: "Fermer la navigation", choose: "Choisir une langue d'apprentissage" },
} as const;

const hrefs = ["/learn", "/professional", "/method", "/resources", "/culture", "/about"] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { locale, setLocale } = useInterfaceLocale();
  const copy = labels[locale];

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
          <nav aria-label={locale === "es" ? "Navegación móvil" : locale === "fr" ? "Navigation mobile" : "Mobile navigation"}>
            {hrefs.map((href, index) => {
              const active = pathname === href || (href === "/learn" && pathname.startsWith("/learn/")) || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/"));
              return (
                <Fragment key={href}>
                  <Link ref={index === 0 ? firstLinkRef : undefined} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} onClick={() => setOpen(false)}>
                    <span>0{index + 1}</span>{copy.links[index]}
                  </Link>
                  {index === 0 ? (
                    <div className="mobile-nav__languages" aria-label={copy.choose}>
                      <Link className={pathname === "/learn/english" ? "is-active" : ""} href="/learn/english" onClick={() => setOpen(false)}><span>EN</span>English</Link>
                      <Link className={pathname === "/learn/french" ? "is-active" : ""} href="/learn/french" onClick={() => setOpen(false)}><span>FR</span>Français</Link>
                      <Link className={pathname === "/learn/spanish" ? "is-active" : ""} href="/learn/spanish" onClick={() => setOpen(false)}><span>ES</span>Español</Link>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </nav>
          <Link className="button button--primary" href="/language-map" onClick={() => setOpen(false)}>
            <span>{copy.start}</span><span aria-hidden="true">↗</span>
          </Link>
          <div>
            <p>{copy.interface}</p>
            <div className="mt-3 flex gap-2" role="group" aria-label={copy.interface}>
              {(["en", "es", "fr"] as const).map((item) => (
                <button key={item} type="button" className={`rounded-full border px-3 py-2 text-sm uppercase${locale === item ? " font-bold" : ""}`} aria-pressed={locale === item} onClick={() => setLocale(item)}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
