import Link from "next/link";
import type { ReactNode } from "react";

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

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}

export function CTASection({
  eyebrow = "Your next sentence",
  title = "Begin with something real.",
  copy = "Tell us where language meets your life. We’ll help you see what to learn next.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="cta-band__action">
          <p>{copy}</p>
          <ButtonLink href="/language-map" variant="light">Build your Language Map</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
  accent = "blue",
  note,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  accent?: "blue" | "wine" | "terracotta" | "ink";
  note?: string;
}) {
  return (
    <header className={`page-intro page-intro--${accent}`}>
      <div className="container page-intro__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-intro__copy">
          <p>{copy}</p>
          {note ? <span>{note}</span> : null}
        </div>
      </div>
    </header>
  );
}
