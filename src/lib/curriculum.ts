import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import corpus from "@/content/curriculum-corpus-v1.json";

export const curriculumLanguages = ["english", "spanish", "french"] as const;
export type CurriculumLanguage = (typeof curriculumLanguages)[number];

export type CurriculumRelation = {
  id: string;
  kind: string;
  reason?: string;
  priority?: string;
};

export type CurriculumLessonMeta = {
  id: string;
  slug: string;
  title: string;
  language: CurriculumLanguage;
  level: string;
  description: string;
  learningObjective: string;
  primaryEnvironment: string;
  secondaryEnvironments: string[];
  interests: string[];
  professionalPaths: string[];
  communicationFunctions: string[];
  lessonType: string;
  estimatedMinutes: number;
  prerequisites: CurriculumRelation[];
  relatedLessons: CurriculumRelation[];
  nextRecommended: CurriculumRelation[];
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    indexable: boolean;
  };
};

export type AuthoredSection = {
  heading: string;
  body: string;
};

export type AuthoredCurriculumLesson = CurriculumLessonMeta & {
  markdown: string;
  sections: AuthoredSection[];
};

const lessons = corpus.lessons as CurriculumLessonMeta[];
const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
const byPath = new Map(lessons.map((lesson) => [`${lesson.language}/${lesson.slug}`, lesson]));

export function isCurriculumLanguage(value: string): value is CurriculumLanguage {
  return curriculumLanguages.includes(value as CurriculumLanguage);
}

export function getCurriculumLessons(language?: CurriculumLanguage) {
  return language ? lessons.filter((lesson) => lesson.language === language) : lessons;
}

export function getCurriculumLessonMeta(language: string, slug: string) {
  if (!isCurriculumLanguage(language)) return undefined;
  return byPath.get(`${language}/${slug}`);
}

export function getCurriculumLessonById(id: string) {
  return byId.get(id);
}

function authoredPath(lesson: CurriculumLessonMeta) {
  return path.join(process.cwd(), "src", "content", "curriculum", "generated", lesson.language, `${lesson.id}.md`);
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

export function parseAuthoredSections(markdown: string): AuthoredSection[] {
  const body = stripFrontmatter(markdown).replace(/^# .+\n+/, "");
  const sectionPattern = /^## (.+)$/gm;
  const matches = [...body.matchAll(sectionPattern)];
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? body.length;
    return { heading: match[1].trim(), body: body.slice(start, end).trim() };
  });
}

export function getAuthoredCurriculumLesson(language: string, slug: string): AuthoredCurriculumLesson | undefined {
  const meta = getCurriculumLessonMeta(language, slug);
  if (!meta) return undefined;
  const markdown = readFileSync(authoredPath(meta), "utf8");
  return { ...meta, markdown, sections: parseAuthoredSections(markdown) };
}
