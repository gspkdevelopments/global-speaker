import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/cards";
import { MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { languages, type LanguageKey } from "@/content/site";
import { resources } from "@/content/resources";
import { getAuthoredLessonsByLanguage } from "@/content/curriculum-authored-v1";

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
  const curriculum = getAuthoredLessonsByLanguage(profile.key);
  const curriculumByLevel = ["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => ({ level, lessons: curriculum.filter((lesson) => lesson.level === level) })).filter((group) => group.lessons.length);
  const languageMapExamples: Record<LanguageKey, string[]> = {
    english: ["Lead a guest conversation", "Share an opinion naturally", "Feel ready in meetings", "Travel without rehearsing every sentence"],
    french: ["Find the right social register", "Follow natural conversation", "Express nuance and taste", "Travel with cultural confidence"],
    spanish: ["Participate in daily life", "Connect more deeply in Mexico", "Handle work interactions", "Build real relationships"],
  };
  const livedMoments: Record<LanguageKey, { label: string; line: string; context: string }> = {
    english: { label: "Work · 09:14", line: "Could you walk me through that?", context: "A useful sentence begins with a real need: understand the process, ask clearly, keep the conversation moving." },
    french: { label: "Après le travail · 18:20", line: "On se retrouve après le travail ?", context: "The words carry more than a plan. They carry ease, social distance, rhythm, and the possibility of belonging." },
    spanish: { label: "Daily life · 13:05", line: "¿Me recomienda algo de aquí?", context: "Language becomes local when it helps you ask, listen, respond, and take part in the place around you." },
  };
  const livedMoment = livedMoments[profile.key];
  return (
    <>
      <PageIntro eyebrow={`${profile.code} · ${profile.eyebrow}`} title={profile.heading} copy={profile.description} accent={profile.accent} note={profile.nativeName} />
      <section className="section hub-pillars"><div className="container"><SectionHeading eyebrow="Built around you" title="Learn what your life asks for." intro="A useful language path follows situations before syllabi." /><div className="hub-pillar-grid">{languageMapExamples[profile.key].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div><aside className={`hub-field-note hub-field-note--${profile.accent}`}><span>{livedMoment.label}</span><blockquote>{livedMoment.line}</blockquote><p>{livedMoment.context}</p></aside></div></section>
      <section className={`section hub-method hub-method--${profile.accent}`}><div className="container"><SectionHeading eyebrow="The learning movement" title="From experience to interaction." intro="Notice what is happening. Build the thought. Connect it to language. Say it. Use it with someone." /><MethodSequence compact /><ButtonLink href="/method" variant="secondary">See how the method works</ButtonLink></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow={`Corpus v1 · ${curriculum.length} lessons`} title={`Explore the ${profile.name} curriculum.`} intro="Open a level, choose a situation that belongs to your life, and move from understanding to real-world use." /><div className="mt-8 space-y-4">{curriculumByLevel.map((group, index) => <details key={group.level} open={index === 0} className="rounded-2xl border p-5"><summary className="cursor-pointer text-xl font-semibold">{group.level} · {group.lessons.length} lessons</summary><div className="mt-5 grid gap-3 md:grid-cols-2">{group.lessons.map((lesson) => <Link key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`} className="rounded-xl border p-4 transition hover:-translate-y-0.5"><span className="text-xs uppercase tracking-widest opacity-60">{lesson.primaryEnvironment} · {lesson.lessonType}</span><h3 className="mt-2 text-lg font-semibold">{lesson.title}</h3><p className="mt-2 text-sm leading-6 opacity-75">{lesson.objective}</p></Link>)}</div></details>)}</div></div></section>
      <section className="section"><div className="container"><div className="resources-preview__heading"><SectionHeading eyebrow={`Explore ${profile.nativeName}`} title="Start with one useful idea." /><ButtonLink href="/resources" variant="text">All free resources</ButtonLink></div><div className="resource-grid resource-grid--preview">{related.map((resource, index) => <ResourceCard key={resource.slug} resource={resource} index={index} />)}</div></div></section>
      <CTASection eyebrow={`${profile.code} · Your next step`} title={`Make ${profile.name} part of your world.`} copy="Tell us where you want to use it, what matters to you, and what feels difficult now." />
    </>
  );
}
