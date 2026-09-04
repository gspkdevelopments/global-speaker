import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CurriculumMarkdown } from "@/components/curriculum-markdown";
import { ButtonLink } from "@/components/ui";
import { getPolyglotArticleBySlug, polyglotArticles, polyglotTopics } from "@/content/polyglot";
import { languages } from "@/content/site";

export function generateStaticParams() {
  return polyglotArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/polyglot/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getPolyglotArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/polyglot/${article.slug}` },
  };
}

export default async function PolyglotArticlePage({ params }: PageProps<"/polyglot/[slug]">) {
  const { slug } = await params;
  const article = getPolyglotArticleBySlug(slug);
  if (!article) notFound();

  const topicLabel = polyglotTopics.find((t) => t.key === article.topic)?.label ?? article.topic;

  // Surface the actual learning hubs this article is relevant to, so a
  // "Spanish → French" transfer piece links out to both /learn/spanish and
  // /learn/french — the cross-language-learning loop from the brief.
  const relatedHubKeys = [
    ...new Set(article.relatedLanguagePairs?.flatMap((pair) => [pair.from, pair.to]) ?? []),
  ];
  const relatedHubs = relatedHubKeys
    .map((key) => languages.find((l) => l.key === key && l.status === "active"))
    .filter((l) => l !== undefined);

  return (
    <article className="article article--teal">
      <header className="article-header">
        <div className="container article-header__grid">
          <div>
            <Link className="article-back" href="/polyglot">← Polyglot</Link>
            <p className="eyebrow">{topicLabel} · {article.readingMinutes} min</p>
            <h1>{article.title}</h1>
            <p className="article-header__subtitle">{article.description}</p>
          </div>
        </div>
      </header>

      <div className="container article-layout">
        <div className="article-content">
          <CurriculumMarkdown body={article.body} />

          {relatedHubs.length ? (
            <section className="article-map-cta">
              <div>
                <p className="eyebrow">Put this to use</p>
                <h2>Relevant to your learning path</h2>
                <p>This article touches {relatedHubs.map((h) => h.nativeName).join(" and ")}.</p>
              </div>
              {relatedHubs.map((hub) => (
                <ButtonLink key={hub.key} href={`/learn/${hub.key}`} variant="secondary">
                  Open {hub.nativeName}
                </ButtonLink>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
