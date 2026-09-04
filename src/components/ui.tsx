"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";
import type { LanguageProfile } from "@/content/site";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text" | "light";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  return (
    <Link href={href} className={`button button--${variant} ${className}`.trim()}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function Tag({ children, accent }: { children: ReactNode; accent?: string }) {
  return <span className={`tag${accent ? ` tag--${accent}` : ""}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, intro, align = "left" }: { eyebrow: string; title: string; intro?: string; align?: "left" | "center" }) {
  return <div className={`section-heading section-heading--${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro ? <p className="section-intro">{intro}</p> : null}</div>;
}

export function CTASection({ eyebrow, title, copy }: { eyebrow?: string; title?: string; copy?: string }) {
  const { locale } = useInterfaceLocale();
  const defaults = pickLocaleCopy({
    en: { eyebrow: "Your next sentence", title: "Begin with something real.", copy: "Tell us where language meets your life. We’ll help you see what to learn next.", action: "Build your Language Map" },
    es: { eyebrow: "Tu próxima frase", title: "Empieza con algo real.", copy: "Cuéntanos dónde aparece el idioma en tu vida. Te ayudaremos a ver qué aprender después.", action: "Crear mi Mapa de Idioma" },
    fr: { eyebrow: "Votre prochaine phrase", title: "Commencez par quelque chose de réel.", copy: "Dites-nous où la langue rencontre votre vie. Nous vous aiderons à voir quoi apprendre ensuite.", action: "Créer mon Language Map" },
  } satisfies WithEnglish<{ eyebrow: string; title: string; copy: string; action: string }>, locale);
  return <section className="cta-band"><div className="container cta-band__inner"><div><p className="eyebrow eyebrow--light">{eyebrow ?? defaults.eyebrow}</p><h2>{title ?? defaults.title}</h2></div><div className="cta-band__action"><p>{copy ?? defaults.copy}</p><ButtonLink href="/language-map" variant="light">{defaults.action}</ButtonLink></div></div></section>;
}

export function PageIntro({ eyebrow, title, copy, accent = "blue", note }: { eyebrow: string; title: string; copy: string; accent?: LanguageProfile["accent"] | "ink"; note?: string }) {
  return <header className={`page-intro page-intro--${accent}`}><div className="container page-intro__grid"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="page-intro__copy"><p>{copy}</p>{note ? <span>{note}</span> : null}</div></div></header>;
}
