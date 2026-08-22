import { readFileSync } from "node:fs";
import { join } from "node:path";
import { brotliDecompressSync } from "node:zlib";

export const curriculumLanguages = ["english", "french", "spanish"] as const;
export type CurriculumLanguage = (typeof curriculumLanguages)[number];

export type AuthoredLessonSection = {
  heading: string;
  body: string;
};

export type AuthoredLesson = {
  id: string;
  slug: string;
  title: string;
  language: CurriculumLanguage;
  level: string;
  lessonType: string;
  primaryEnvironment: string;
  communicationFunctions: string[];
  objective: string;
  status: string;
  version: number;
  markdown: string;
  sections: AuthoredLessonSection[];
};

type PackedCorpus = {
  version: number;
  objects: Array<{ id: string; markdown: string }>;
};

const chunkNames = ["chunk-01.txt", "chunk-02.txt", "chunk-03.txt", "chunk-04.txt", "chunk-05.txt"];
let lessonCache: AuthoredLesson[] | undefined;

function unquote(value: string) {
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  return value;
}

function readPackedCorpus(): PackedCorpus {
  const base = join(process.cwd(), "src", "content", "corpus-v1-packed");
  const encoded = chunkNames.map((name) => readFileSync(join(base, name), "utf8").trim()).join("");
  const json = brotliDecompressSync(Buffer.from(encoded, "base64")).toString("utf8");
  return JSON.parse(json) as PackedCorpus;
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error("Curriculum lesson is missing frontmatter.");
  const lines = match[1].split("\n");
  const scalars = new Map<string, string>();
  const communicationFunctions: string[] = [];
  let inFunctions = false;

  for (const line of lines) {
    if (line === "communicationFunctions:") {
      inFunctions = true;
      continue;
    }
    if (inFunctions && line.startsWith("  - ")) {
      communicationFunctions.push(line.slice(4).trim());
      continue;
    }
    if (inFunctions && !line.startsWith("  ")) inFunctions = false;
    const scalar = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (scalar) scalars.set(scalar[1], unquote(scalar[2].trim()));
  }

  const objective = markdown.match(/^\*\*Learning objective:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "";
  return { scalars, communicationFunctions, objective };
}

function parseSections(markdown: string): AuthoredLessonSection[] {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? body.length : body.length;
    return { heading: match[1].trim(), body: body.slice(start, end).trim() };
  });
}

function hydrateLesson(object: PackedCorpus["objects"][number]): AuthoredLesson {
  const { scalars, communicationFunctions, objective } = parseFrontmatter(object.markdown);
  const language = scalars.get("language");
  if (!curriculumLanguages.includes(language as CurriculumLanguage)) throw new Error(`Unsupported curriculum language: ${language}`);
  const value = (key: string) => {
    const found = scalars.get(key);
    if (!found) throw new Error(`Curriculum lesson ${object.id} is missing ${key}.`);
    return found;
  };
  return {
    id: value("id"),
    slug: value("slug"),
    title: value("title"),
    language: language as CurriculumLanguage,
    level: value("level"),
    lessonType: value("lessonType"),
    primaryEnvironment: value("primaryEnvironment"),
    communicationFunctions,
    objective,
    status: value("status"),
    version: Number(value("version")),
    markdown: object.markdown,
    sections: parseSections(object.markdown),
  };
}

export function getAuthoredLessons(): readonly AuthoredLesson[] {
  if (!lessonCache) lessonCache = readPackedCorpus().objects.map(hydrateLesson);
  return lessonCache;
}

export function getAuthoredLessonsByLanguage(language: string) {
  return getAuthoredLessons().filter((lesson) => lesson.language === language);
}

export function getAuthoredLesson(language: string, slug: string) {
  return getAuthoredLessons().find((lesson) => lesson.language === language && lesson.slug === slug);
}

export function getAuthoredLessonParams() {
  return getAuthoredLessons().map((lesson) => ({ language: lesson.language, slug: lesson.slug }));
}
