import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/cards";
import { MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { languages, type LanguageKey } from "@/content/site";
import { resources } from "@/content/resources";

export function generateStaticParams() { return languages.map((language) => ({ language: language.key })); }

export async function generateMetadata({ params }: PageProps<"/learn/[language]">): Promise<Metadata> {
  const { language } = await params;
  const profile = languages.find((item) => item.key === language);
  if (!profile) return {};
  return { title: `Learn ${profile.name}`, description: profile.description, alternates: { canonical: `/learn/${profile.key}` } };
}

export default async function LanguageHubPage({ params }: PageProps<"/learn/[language]">) {
  const { language } = await params;
  const profile = languages.find((item) => item.key === language);
  if (!profile) notFound();
  const related = resources.filter((resource) => resource.language === profile.key).slice(0, 3);
  const languageMapExamples: Record<LanguageKey, string[]> = {
    english: ["Lead a guest conversation", "Share an opinion naturally", "Feel ready in meetings", "Travel without rehearsing every sentence"],
    french: ["Find the right social register", "Follow natural conversation", "Express nuance and taste", "Travel with cultural confidence"],
    spanish: ["Participate in daily life", "Connect more deeply in Mexico", "Handle work interactions", "Build real relationships"],
  };
  return (
    <>
      <PageIntro eyebrow={`${profile.code} · ${profile.eyebrow}`} title={profile.heading} copy={profile.description} accent={profile.accent} note={profile.nativeName} />
      <section className="section hub-pillars"><div className="container"><SectionHeading eyebrow="Built around you" title="Learn what your life asks for." intro="A useful language path follows situations before syllabi." /><div className="hub-pillar-grid">{languageMapExamples[profile.key].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div></div></section>
      <section className={`section hub-method hub-method--${profile.accent}`}><div className="container"><SectionHeading eyebrow="The learning movement" title="From experience to interaction." intro="Notice what is happening. Build the thought. Connect it to language. Say it. Use it with someone." /><MethodSequence compact /><ButtonLink href="/method" variant="secondary">See how the method works</ButtonLink></div></section>
      <section className="section"><div className="container"><div className="resources-preview__heading"><SectionHeading eyebrow={`Explore ${profile.nativeName}`} title="Start with one useful idea." /><ButtonLink href="/resources" variant="text">All free resources</ButtonLink></div><div className="resource-grid resource-grid--preview">{related.map((resource, index) => <ResourceCard key={resource.slug} resource={resource} index={index} />)}</div></div></section>
      <CTASection eyebrow={`${profile.code} · Your next step`} title={`Make ${profile.name} part of your world.`} copy="Tell us where you want to use it, what matters to you, and what feels difficult now." />
    </>
  );
}
