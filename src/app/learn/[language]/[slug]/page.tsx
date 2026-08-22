import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ButtonLink, PageIntro } from "@/components/ui";
import { getAuthoredLesson, getAuthoredLessonParams } from "@/content/curriculum-authored-v1";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthoredLessonParams();
}

export async function generateMetadata({ params }: PageProps<"/learn/[language]/[slug]">): Promise<Metadata> {
  const { language, slug } = await params;
  const lesson = getAuthoredLesson(language, slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.objective,
    alternates: { canonical: `/learn/${lesson.language}/${lesson.slug}` },
  };
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>)}</>;
}

function MarkdownBlock({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const rendered: ReactNode[] = [];

  blocks.forEach((block, index) => {
    if (block.startsWith("### ")) {
      rendered.push(<h3 key={index} className="mt-8 text-xl font-semibold">{block.slice(4)}</h3>);
      return;
    }
    const lines = block.split("\n");
    if (lines.every((line) => line.startsWith("- "))) {
      rendered.push(<ul key={index} className="my-4 list-disc space-y-2 pl-6">{lines.map((line) => <li key={line}><InlineText text={line.slice(2)} /></li>)}</ul>);
      return;
    }
    if (lines.every((line) => /^\d+\.\s/.test(line))) {
      rendered.push(<ol key={index} className="my-4 list-decimal space-y-2 pl-6">{lines.map((line) => <li key={line}><InlineText text={line.replace(/^\d+\.\s/, "")} /></li>)}</ol>);
      return;
    }
    rendered.push(<p key={index} className="my-4 whitespace-pre-line leading-7"><InlineText text={block} /></p>);
  });

  return <>{rendered}</>;
}

export default async function CurriculumLessonPage({ params }: PageProps<"/learn/[language]/[slug]">) {
  const { language, slug } = await params;
  const lesson = getAuthoredLesson(language, slug);
  if (!lesson) notFound();

  return (
    <>
      <PageIntro
        eyebrow={`${lesson.language.toUpperCase()} · ${lesson.level} · ${lesson.lessonType}`}
        title={lesson.title}
        copy={lesson.objective}
        note={lesson.primaryEnvironment}
      />
      <main className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex flex-wrap gap-2 text-sm opacity-70">
              {lesson.communicationFunctions.map((item) => <span key={item} className="rounded-full border px-3 py-1">{item}</span>)}
            </div>
            {lesson.sections.map((section) => (
              <section key={section.heading} className="border-t py-8 first:border-t-0 first:pt-0">
                <h2 className="mb-4 text-2xl font-semibold">{section.heading}</h2>
                <MarkdownBlock text={section.body} />
              </section>
            ))}
            <div className="mt-10 flex flex-wrap gap-3 border-t pt-8">
              <ButtonLink href={`/learn/${lesson.language}`} variant="secondary">Back to {lesson.language}</ButtonLink>
              <ButtonLink href="/language-map" variant="text">Build your Language Map</ButtonLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
