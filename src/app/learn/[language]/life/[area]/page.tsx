import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, SectionHeading } from "@/components/ui";
import { getCurriculumLessons, isCurriculumLanguage, type CurriculumLanguage } from "@/lib/curriculum";

export const lifeAreas = ["home", "work", "people", "travel", "interests", "culture"] as const;
export type LifeArea = (typeof lifeAreas)[number];

const cefrOrder = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const areaCopy: Record<LifeArea, { title: string; description: string }> = {
  home: { title: "Home", description: "Daily routines, shared spaces, objects, comfort, requests, and the language of ordinary life." },
  work: { title: "Work", description: "Updates, instructions, clients, meetings, feedback, negotiation, writing, and professional confidence." },
  people: { title: "People", description: "Introductions, small talk, opinions, relationships, disagreement, humor, boundaries, and connection." },
  travel: { title: "Travel", description: "Arrival, directions, food, transport, accommodation, changing plans, recommendations, and problem-solving." },
  interests: { title: "Interests", description: "Music, technology, food, nature, design, ideas, and the things that give you something real to say." },
  culture: { title: "Culture", description: "Register, politeness, implication, regional variation, humor, social distance, and interpreting more than words." },
};

function lessonsForArea(language: CurriculumLanguage, area: LifeArea) {
  return getCurriculumLessons(language).filter((lesson) =>
    lesson.primaryEnvironment === area || lesson.secondaryEnvironments.includes(area),
  );
}

export function generateStaticParams() {
  const languages: CurriculumLanguage[] = ["english", "spanish", "french"];
  return languages.flatMap((language) => lifeAreas.map((area) => ({ language, area })));
}

export async function generateMetadata({ params }: PageProps<"/learn/[language]/life/[area]">): Promise<Metadata> {
  const { language, area } = await params;
  if (!isCurriculumLanguage(language) || !lifeAreas.includes(area as LifeArea)) return {};
  const copy = areaCopy[area as LifeArea];
  return {
    title: `${copy.title} ${language} lessons`,
    description: copy.description,
    alternates: { canonical: `/learn/${language}/life/${area}` },
  };
}

export default async function LifeAreaPage({ params }: PageProps<"/learn/[language]/life/[area]">) {
  const { language, area } = await params;
  if (!isCurriculumLanguage(language) || !lifeAreas.includes(area as LifeArea)) notFound();

  const lifeArea = area as LifeArea;
  const copy = areaCopy[lifeArea];
  const lessons = lessonsForArea(language, lifeArea);
  const byLevel = cefrOrder
    .map((level) => ({ level, lessons: lessons.filter((lesson) => lesson.level === level) }))
    .filter((group) => group.lessons.length > 0);

  return (
    <>
      <PageIntro
        eyebrow={`${language.toUpperCase()} · LIFE AREA`}
        title={`${copy.title}, in the language you need.`}
        copy={copy.description}
        note={`${lessons.length} connected lessons`}
      />
      <section className="section">
        <div className="container">
          <div className="resources-preview__heading">
            <SectionHeading eyebrow="One corpus · many entry points" title={`Explore ${copy.title.toLowerCase()} across levels.`} intro="These are not duplicate lessons. The same canonical learning objects are being surfaced through the part of life where they become useful." />
            <Link className="button button--text" href={`/learn/${language}`}>Back to curriculum <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="mt-12 space-y-10">
            {byLevel.map((group) => (
              <section key={group.level}>
                <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-3">
                  <h2 className="font-[var(--serif)] text-3xl">{group.level}</h2>
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-soft)]">{group.lessons.length} lessons</span>
                </div>
                <div className="resource-grid">
                  {group.lessons.map((lesson) => (
                    <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}>
                      <p className="eyebrow">{lesson.level} · {lesson.lessonType.replaceAll("-", " ")}</p>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.learningObjective}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
