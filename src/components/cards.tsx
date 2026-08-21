import Link from "next/link";
import type { LanguageProfile } from "@/content/site";
import type { Resource } from "@/content/resources";
import { Tag } from "@/components/ui";

export function LanguageCard({ language }: { language: LanguageProfile }) {
  return (
    <article className={`language-card language-card--${language.accent}`}>
      <div className="language-card__top"><span>{language.code}</span><i aria-hidden="true" /></div>
      <h3>{language.nativeName}</h3>
      <p>{language.eyebrow}</p>
      <div className="language-card__themes">{language.themes.slice(0, 4).map((theme) => <span key={theme}>{theme}</span>)}</div>
      <Link href={`/learn/${language.key}`}>{language.key === "french" ? "Découvrir le français" : language.key === "spanish" ? "Explorar español" : "Explore English"} <span aria-hidden="true">↗</span></Link>
    </article>
  );
}

export function ResourceCover({ resource, index = 0, className = "" }: { resource: Resource; index?: number; className?: string }) {
  return (
    <div className={`resource-card__field ${className}`.trim()} aria-hidden="true">
      <span className="resource-card__field-label">{resource.languageLabel} · {resource.category}</span>
      <div className="resource-card__field-words">{resource.cover.map((word) => <b key={word}>{word}</b>)}</div>
      <i>{String(index + 1).padStart(2, "0")}</i>
    </div>
  );
}

export function ResourceCard({ resource, index, featured = false }: { resource: Resource; index?: number; featured?: boolean }) {
  return (
    <article className={`resource-card resource-card--${resource.accent}${featured ? " resource-card--featured" : ""}`}>
      <Link href={`/resources/${resource.slug}`} aria-label={`Read ${resource.title}`}>
        {featured ? <span className="resource-card__featured-label">Featured lesson</span> : null}
        <ResourceCover resource={resource} index={index} />
        <div className="resource-card__meta"><Tag accent={resource.accent}>{resource.languageLabel}</Tag><span>{resource.readingTime}</span><span>{resource.difficulty}</span></div>
        <h3>{resource.title}</h3>
        <p>{resource.subtitle}</p>
        <span className="resource-card__link">Explore the idea <i aria-hidden="true">→</i></span>
      </Link>
    </article>
  );
}

export function CultureCard({ item, index }: { item: { title: string; description: string; slug?: string; region: string }; index: number }) {
  const content = (
    <>
      <div className="culture-card__number">{String(index + 1).padStart(2, "0")}</div>
      <div><span>{item.region}</span><h3>{item.title}</h3><p>{item.description}</p></div>
      <i aria-hidden="true">↗</i>
    </>
  );
  return item.slug ? <Link className="culture-card" href={`/resources/${item.slug}`}>{content}</Link> : <article className="culture-card culture-card--static">{content}</article>;
}
