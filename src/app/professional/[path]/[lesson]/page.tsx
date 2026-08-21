import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getLessonLocation, getProfessionalPath, professionalPaths } from "@/content/professional";
import { LessonRenderer } from "@/components/professional-learning";

export function generateStaticParams() { return professionalPaths.flatMap((path) => path.modules.flatMap((module) => module.lessons.map((lesson) => ({ path: path.slug, lesson: lesson.slug })))); }

export async function generateMetadata({ params }: PageProps<"/professional/[path]/[lesson]">): Promise<Metadata> {
  const { path: pathSlug, lesson: lessonSlug } = await params;
  const path = getProfessionalPath(pathSlug);
  const lesson = getLesson(pathSlug, lessonSlug);
  if (!path || !lesson) return {};
  return { title: `${lesson.title} | Global Speaker`, description: lesson.description, alternates: { canonical: `/professional/${path.slug}/${lesson.slug}` }, openGraph: { type: "article", title: lesson.title, description: lesson.description, url: `/professional/${path.slug}/${lesson.slug}` } };
}

export default async function ProfessionalLessonPage({ params }: PageProps<"/professional/[path]/[lesson]">) {
  const { path: pathSlug, lesson: lessonSlug } = await params;
  const path = getProfessionalPath(pathSlug);
  const lesson = getLesson(pathSlug, lessonSlug);
  const learningModule = getLessonLocation(pathSlug, lessonSlug);
  if (!path || !lesson || !learningModule) notFound();
  const lessons = path.modules.flatMap((item) => item.lessons);
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  return <LessonRenderer lesson={lesson} path={path} module={learningModule} previous={lessons[lessonIndex - 1]} next={lessons[lessonIndex + 1]} />;
}
