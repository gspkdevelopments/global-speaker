import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import corpus from "@/content/curriculum-corpus-v1.json";
import { getLocalizedCurriculumOverride } from "@/content/curriculum-localized";
import type { CurriculumPracticeQuestion, LocalizedCurriculumSection } from "@/lib/curriculum-types";
import type { InterfaceLocale } from "@/lib/interface-locale";

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
  kind?: LocalizedCurriculumSection["kind"];
};

export type AuthoredCurriculumLesson = CurriculumLessonMeta & {
  markdown: string;
  sections: AuthoredSection[];
  expectedOutcome?: string;
  practice: CurriculumPracticeQuestion[];
  checkpoints: string[];
};

const lessons = corpus.lessons as CurriculumLessonMeta[];
const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
const byPath = new Map(lessons.map((lesson) => [`${lesson.language}/${lesson.slug}`, lesson]));

export function isCurriculumLanguage(value: string): value is CurriculumLanguage {
  return curriculumLanguages.includes(value as CurriculumLanguage);
}

function localizedMeta(lesson: CurriculumLessonMeta, locale?: InterfaceLocale): CurriculumLessonMeta {
  if (!locale) return lesson;
  const override = getLocalizedCurriculumOverride(locale, lesson.id);
  return override
    ? { ...lesson, title: override.title, description: override.description, learningObjective: override.learningObjective }
    : lesson;
}

export function getCurriculumLessons(language?: CurriculumLanguage, locale?: InterfaceLocale) {
  const selected = language ? lessons.filter((lesson) => lesson.language === language) : lessons;
  return selected.map((lesson) => localizedMeta(lesson, locale));
}

export function getCurriculumLessonMeta(language: string, slug: string, locale?: InterfaceLocale) {
  if (!isCurriculumLanguage(language)) return undefined;
  const lesson = byPath.get(`${language}/${slug}`);
  return lesson ? localizedMeta(lesson, locale) : undefined;
}

export function getCurriculumLessonById(id: string, locale?: InterfaceLocale) {
  const lesson = byId.get(id);
  return lesson ? localizedMeta(lesson, locale) : undefined;
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

export function getAuthoredCurriculumLesson(language: string, slug: string, locale?: InterfaceLocale): AuthoredCurriculumLesson | undefined {
  const meta = getCurriculumLessonMeta(language, slug, locale);
  if (!meta) return undefined;
  const override = locale ? getLocalizedCurriculumOverride(locale, meta.id) : undefined;
  if (override) {
    return {
      ...meta,
      markdown: "",
      sections: override.sections,
      expectedOutcome: override.expectedOutcome,
      practice: override.practice,
      checkpoints: override.checkpoints,
    };
  }
  const markdown = readFileSync(authoredPath(meta), "utf8");
  return { ...meta, markdown, sections: parseAuthoredSections(markdown), practice: [], checkpoints: [] };
}
