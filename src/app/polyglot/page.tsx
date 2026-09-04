import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/ui";
import { polyglotArticles, polyglotTopics } from "@/content/polyglot";

export const metadata: Metadata = {
  title: "Polyglot — Language Community & Culture",
  description:
    "Articles on how polyglots learn, language transfer, multilingual identity, personal methods, and the communities that keep languages alive.",
  alternates: { canonical: "/polyglot" },
};

export default function PolyglotIndexPage() {
  return (
    <>
      <PageIntro
        eyebrow="Polyglot"
        title="Beyond one language, into a hub."
        copy="Global Speaker is a place to learn English, French, and Spanish — and a wider conversation about what it means to live between languages."
        note="Stories · Learning science · Transfer · Culture · Community"
      />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="All articles" title="Follow a question." intro="Short editorial pieces, separate from the structured curriculum." />
          <div className="resource-grid resource-grid--preview">
            {polyglotArticles.map((article) => {
              const topicLabel = polyglotTopics.find((t) => t.key === article.topic)?.label ?? article.topic;
              return (
                <Link className="resource-card" key={article.slug} href={`/polyglot/${article.slug}`}>
                  <p className="eyebrow">{topicLabel} · {article.readingMinutes} min</p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
