import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CurriculumMarkdown } from "@/components/curriculum-markdown";
import { ButtonLink } from "@/components/ui";
import {
  getAuthoredCurriculumLesson,
  getCurriculumLessonById,
  getCurriculumLessonMeta,
  getCurriculumLessons,
} from "@/lib/curriculum";
import { siteConfig } from "@/config/site";

const languageLabels = { english: "English", spanish: "Spanish", french: "French" } as const;

export function generateStaticParams() {
  return getCurriculumLessons().map((lesson) => ({ language: lesson.language, slug: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[language]/[slug]">): Promise<Metadata> {
  const { language, slug } = await params;
  const lesson = getCurriculumLessonMeta(language, slug);
  if (!lesson) return {};
  return {
    title: lesson.seo.title,
    description: lesson.seo.description,
    alternates: { canonical: lesson.seo.canonicalPath },
    robots: lesson.seo.indexable ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: lesson.title,
      description: lesson.description,
      url: lesson.seo.canonicalPath,
    },
  };
}

export default async function CurriculumLessonPage({ params }: PageProps<"/learn/[language]/[slug]">) {
  const { language, slug } = await params;
  const lesson = getAuthoredCurriculumLesson(language, slug);
  if (!lesson) notFound();

  const relatedIds = [...lesson.relatedLessons, ...lesson.nextRecommended]
    .map((relation) => relation.id)
    .filter((id, index, list) => list.indexOf(id) === index)
    .slice(0, 4);
  const related = relatedIds.map(getCurriculumLessonById).filter((item) => item !== undefined);
  const languageLabel = languageLabels[lesson.language];
  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    learningResourceType: lesson.lessonType,
    educationalLevel: lesson.level,
    inLanguage: lesson.language === "french" ? "fr" : lesson.language === "spanish" ? "es" : "en",
    provider: { "@type": "Organization", name: "Global Speaker" },
    url: `${siteConfig.siteUrl}${lesson.seo.canonicalPath}`,
  };

  return (
    <article className="article article--teal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="article-header">
        <div className="container article-header__grid">
          <div>
            <Link className="article-back" href={`/learn/${lesson.language}`}>← {languageLabel} learning path</Link>
            <p className="eyebrow">{languageLabel} · {lesson.level} · {lesson.lessonType.replaceAll("-", " ")}</p>
            <h1>{lesson.title}</h1>
            <p className="article-header__subtitle">{lesson.learningObjective}</p>
          </div>
          <div className="article-header__aside">
            <dl>
              <div><dt>Practice time</dt><dd>{lesson.estimatedMinutes} min</dd></div>
              <div><dt>Level</dt><dd>{lesson.level}</dd></div>
              <div><dt>Environment</dt><dd>{lesson.primaryEnvironment}</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <div className="container article-layout">
        <aside className="article-rail">
          <span>In this lesson</span>
          {lesson.sections.map((section, index) => (
            <a key={section.heading} href={`#section-${index + 1}`}>
              {String(index + 1).padStart(2, "0")} {section.heading}
            </a>
          ))}
        </aside>
        <div className="article-content">
          <p className="article-intro">{lesson.description}</p>
          {lesson.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={`${index}-${section.heading}`}>
              <span className="article-section-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              <CurriculumMarkdown body={section.body} />
            </section>
          ))}
          <section className="article-map-cta">
            <div>
              <p className="eyebrow">Make it yours</p>
              <h2>Connect this lesson to your Language Map.</h2>
              <p>Use the situation, environment, and communication goal to turn this lesson into something from your real life.</p>
            </div>
            <ButtonLink href="/language-map">Open my Language Map</ButtonLink>
          </section>
        </div>
      </div>

      {related.length ? (
        <section className="section related-resources">
          <div className="container">
            <p className="eyebrow">Continue the graph</p>
            <h2>Keep moving through the curriculum.</h2>
            <div className="resource-grid">
              {related.map((item) => (
                <Link className="resource-card" key={item.id} href={`/learn/${item.language}/${item.slug}`}>
                  <p className="eyebrow">{languageLabels[item.language]} · {item.level}</p>
                  <h3>{item.title}</h3>
                  <p>{item.learningObjective}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
