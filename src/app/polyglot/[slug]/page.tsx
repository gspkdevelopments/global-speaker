import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CurriculumMarkdown } from "@/components/curriculum-markdown";
import { ButtonLink } from "@/components/ui";
import { getPolyglotArticleBySlug, polyglotArticles, polyglotTopics } from "@/content/polyglot";
import { languages } from "@/content/site";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

type ArticlePageCopy = { back: string; putToUse: string; relevantTitle: string; touchesPrefix: string; open: string; minutesLabel: string };

const pageCopy: WithEnglish<ArticlePageCopy> = {
  en: { back: "← Polyglot", putToUse: "Put this to use", relevantTitle: "Relevant to your learning path", touchesPrefix: "This article touches", open: "Open", minutesLabel: "min" },
  es: { back: "← Polyglot", putToUse: "Ponlo en práctica", relevantTitle: "Relevante para tu ruta de aprendizaje", touchesPrefix: "Este artículo se relaciona con", open: "Abrir", minutesLabel: "min" },
  fr: { back: "← Polyglot", putToUse: "Mettez-le en pratique", relevantTitle: "Pertinent pour votre parcours d'apprentissage", touchesPrefix: "Cet article concerne", open: "Ouvrir", minutesLabel: "min" },
  de: { back: "← Polyglot", putToUse: "Nutze es", relevantTitle: "Relevant für deinen Lernweg", touchesPrefix: "Dieser Artikel betrifft", open: "Öffnen", minutesLabel: "Min." },
  it: { back: "← Polyglot", putToUse: "Mettilo in pratica", relevantTitle: "Rilevante per il tuo percorso di apprendimento", touchesPrefix: "Questo articolo riguarda", open: "Apri", minutesLabel: "min" },
  pt: { back: "← Polyglot", putToUse: "Coloque em prática", relevantTitle: "Relevante para o seu caminho de aprendizagem", touchesPrefix: "Este artigo se relaciona com", open: "Abrir", minutesLabel: "min" },
};

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

  const locale = await getInterfaceLocale();
  const t = pickLocaleCopy(pageCopy, locale);
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
            <Link className="article-back" href="/polyglot">{t.back}</Link>
            <p className="eyebrow">{topicLabel} · {article.readingMinutes} {t.minutesLabel}</p>
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
                <p className="eyebrow">{t.putToUse}</p>
                <h2>{t.relevantTitle}</h2>
                <p>{t.touchesPrefix} {relatedHubs.map((hub) => hub.nativeName).join(" " + (locale === "en" ? "and" : locale === "es" ? "y" : locale === "fr" ? "et" : locale === "de" ? "und" : locale === "it" ? "e" : "e") + " ")}.</p>
              </div>
              {relatedHubs.map((hub) => (
                <ButtonLink key={hub.key} href={`/learn/${hub.key}`} variant="secondary">
                  {t.open} {hub.nativeName}
                </ButtonLink>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
