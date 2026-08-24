import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/cards";
import { MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { languages, type LanguageKey } from "@/content/site";
import { resources } from "@/content/resources";
import { getCurriculumLessons, type CurriculumLanguage } from "@/lib/curriculum";

const cefrOrder = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

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
  const curriculum = getCurriculumLessons(profile.key as CurriculumLanguage);
  const curriculumByLevel = cefrOrder
    .map((level) => ({ level, lessons: curriculum.filter((lesson) => lesson.level === level) }))
    .filter((group) => group.lessons.length > 0);
  const levels = curriculumByLevel.map((group) => group.level);
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
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={`Curriculum · ${curriculum.length} lessons`} title="A real path, not a pile of exercises." intro={`Move through ${levels.join(", ")} with lessons rooted in home, work, people, travel, interests, and culture.`} />
          <div className="mt-12 space-y-4">
            {curriculumByLevel.map((group, index) => (
              <details key={group.level} open={index === 0} className="border-t border-[var(--line)] py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-2 marker:content-none">
                  <span className="font-[var(--serif)] text-3xl">{group.level}</span>
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-soft)]">{group.lessons.length} lessons</span>
                </summary>
                <div className="resource-grid mt-6">
                  {group.lessons.map((lesson) => (
                    <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}>
                      <p className="eyebrow">{lesson.level} · {lesson.primaryEnvironment}</p>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.learningObjective}</p>
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section"><div className="container"><div className="resources-preview__heading"><SectionHeading eyebrow={`Explore ${profile.nativeName}`} title="Start with one useful idea." /><ButtonLink href="/resources" variant="text">All free resources</ButtonLink></div><div className="resource-grid resource-grid--preview">{related.map((resource, index) => <ResourceCard key={resource.slug} resource={resource} index={index} />)}</div></div></section>
      <CTASection eyebrow={`${profile.code} · Your next step`} title={`Make ${profile.name} part of your world.`} copy="Tell us where you want to use it, what matters to you, and what feels difficult now." />
    </>
  );
}
