import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const corpusPath = path.join(root, "src/content/curriculum-corpus-v1.json");
const authoredRoot = path.join(root, "src/content/curriculum");
const requiredSections = [
  "## Context",
  "## Objective",
  "## Notice",
  "## Understand",
  "## Language toolkit",
  "## Examples",
  "## Culture & register",
  "## Guided practice",
  "## Production",
  "## Real-world challenge",
  "## Reflection",
  "## Continue",
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "README.md") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function scalar(markdown, key) {
  const match = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim()?.replace(/^"|"$/g, "") ?? null;
}

function functions(markdown) {
  const match = markdown.match(/communicationFunctions:\n((?:  - .+\n)+)/);
  return match ? match[1].trim().split("\n").map((line) => line.trim().slice(2)) : [];
}

function objective(markdown) {
  return markdown.match(/\*\*Learning objective:\*\* (.+)/)?.[1]?.trim() ?? null;
}

const canonical = JSON.parse(await readFile(corpusPath, "utf8"));
const expected = new Map(canonical.lessons.map((lesson) => [lesson.id, lesson]));
const files = await walk(authoredRoot);
const seen = new Map();
const errors = [];

for (const file of files) {
  const markdown = await readFile(file, "utf8");
  const id = scalar(markdown, "id");
  if (!id) { errors.push(`${file}: missing id`); continue; }
  if (seen.has(id)) errors.push(`${id}: duplicate authored ID`);
  seen.set(id, file);

  const lesson = expected.get(id);
  if (!lesson) { errors.push(`${id}: not present in canonical corpus`); continue; }

  const checks = [
    ["slug", scalar(markdown, "slug"), lesson.slug],
    ["title", scalar(markdown, "title"), lesson.title],
    ["language", scalar(markdown, "language"), lesson.language],
    ["level", scalar(markdown, "level"), lesson.level],
    ["lessonType", scalar(markdown, "lessonType"), lesson.lessonType],
    ["primaryEnvironment", scalar(markdown, "primaryEnvironment"), lesson.primaryEnvironment],
    ["learningObjective", objective(markdown), lesson.learningObjective],
  ];
  for (const [field, actual, wanted] of checks) {
    if (actual !== wanted) errors.push(`${id}: ${field} mismatch; got ${JSON.stringify(actual)}, expected ${JSON.stringify(wanted)}`);
  }

  const actualFunctions = functions(markdown);
  if (JSON.stringify(actualFunctions) !== JSON.stringify(lesson.communicationFunctions)) {
    errors.push(`${id}: communicationFunctions mismatch`);
  }

  for (const section of requiredSections) {
    if (!markdown.includes(section)) errors.push(`${id}: missing section ${section}`);
  }
}

for (const id of expected.keys()) {
  if (!seen.has(id)) errors.push(`${id}: missing authored Markdown`);
}

const counts = {
  authored: files.length,
  canonical: expected.size,
  missing: [...expected.keys()].filter((id) => !seen.has(id)).length,
  extra: [...seen.keys()].filter((id) => !expected.has(id)).length,
  errors: errors.length,
};

console.log(JSON.stringify(counts, null, 2));
if (errors.length) {
  console.error(errors.slice(0, 100).join("\n"));
  if (errors.length > 100) console.error(`... ${errors.length - 100} more`);
  process.exit(1);
}

console.log("Curriculum Corpus v1 authored validation PASS");
