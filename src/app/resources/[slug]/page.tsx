import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard, ResourceCover } from "@/components/cards";
import { ButtonLink } from "@/components/ui";
import { getResource, resources } from "@/content/resources";
import { siteConfig } from "@/config/site";

export function generateStaticParams() { return resources.map((resource) => ({ slug: resource.slug })); }

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: { type: "article", title: resource.title, description: resource.description, url: `/resources/${resource.slug}`, publishedTime: resource.publishedAt, modifiedTime: resource.updatedAt },
  };
}

export default async function ResourceArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  const related = resource.related.map(getResource).filter((item) => item !== undefined);
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: resource.title, description: resource.description,
    datePublished: resource.publishedAt, dateModified: resource.updatedAt, author: { "@type": "Organization", name: resource.author },
    publisher: { "@type": "Organization", name: "Global Speaker" }, inLanguage: resource.language === "french" ? "fr" : resource.language === "spanish" ? "es" : "en",
    mainEntityOfPage: `${siteConfig.siteUrl}/resources/${resource.slug}`,
  };
  return (
    <article className={`article article--${resource.accent}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="article-header">
        <div className="container article-header__grid">
          <div>
            <Link className="article-back" href="/resources">← All resources</Link>
            <p className="eyebrow">{resource.languageLabel} · {resource.category}</p>
            <h1>{resource.title}</h1>
            <p className="article-header__subtitle">{resource.subtitle}</p>
          </div>
          <div className="article-header__aside">
            <ResourceCover resource={resource} className="article-header__cover" />
            <dl><div><dt>Reading time</dt><dd>{resource.readingTime}</dd></div><div><dt>Level</dt><dd>{resource.difficulty}</dd></div><div><dt>Topic</dt><dd>{resource.category}</dd></div></dl>
          </div>
        </div>
      </header>
      <div className="container article-layout">
        <aside className="article-rail"><span>In this idea</span>{resource.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} {section.heading}</a>)}</aside>
        <div className="article-content">
          <p className="article-intro">{resource.description}</p>
          {resource.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span className="article-section-number">{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2><p>{section.body}</p>{section.examples ? <div className="example-list">{section.examples.map((example) => <p key={example}>{example}</p>)}</div> : null}</section>)}
          <section className="your-turn"><p className="eyebrow">Your turn</p><h2>Bring the idea into the room.</h2>{resource.exercise.map((prompt) => <p key={prompt}>{prompt}</p>)}</section>
          <section className="article-map-cta"><div><p className="eyebrow">Make it personal</p><h2>Add this to your Language Map.</h2><p>Connect this idea to a situation where you would actually use it.</p></div><ButtonLink href="/language-map">Add to my map</ButtonLink></section>
        </div>
      </div>
      {related.length ? <section className="section related-resources"><div className="container"><p className="eyebrow">Keep exploring</p><h2>Related resources</h2><div className="resource-grid">{related.map((item, index) => <ResourceCard key={item.slug} resource={item} index={index} />)}</div></div></section> : null}
    </article>
  );
}
