import { readFileSync } from "node:fs";
import { join } from "node:path";
import { brotliDecompressSync } from "node:zlib";

const chunkNames = ["chunk-01.txt", "chunk-02.txt", "chunk-03.txt", "chunk-04.txt", "chunk-05.txt"];
const base = join(process.cwd(), "src", "content", "corpus-v1-packed");
const encoded = chunkNames.map((name) => readFileSync(join(base, name), "utf8").trim()).join("");
const corpus = JSON.parse(brotliDecompressSync(Buffer.from(encoded, "base64")).toString("utf8"));
const requiredSections = ["Context", "Objective", "Notice", "Understand", "Language toolkit", "Examples", "Culture & register", "Guided practice", "Production", "Real-world challenge", "Reflection", "Continue"];

const scalar = (markdown, key) => markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim().replace(/^\"|\"$/g, "");
const count = (field) => Object.fromEntries([...new Set(corpus.objects.map(({ markdown }) => scalar(markdown, field)))].map((value) => [value, corpus.objects.filter(({ markdown }) => scalar(markdown, field) === value).length]));
const ids = corpus.objects.map((object) => scalar(object.markdown, "id"));
const slugs = corpus.objects.map((object) => scalar(object.markdown, "slug"));
const unique = (values) => new Set(values).size === values.length;
const anatomyFailures = corpus.objects.filter(({ markdown }) => requiredSections.some((section) => !markdown.includes(`## ${section}`))).map(({ id }) => id);
const expected = {
  language: { english: 72, spanish: 55, french: 48 },
  level: { A1: 18, A2: 34, B1: 46, B2: 43, C1: 27, C2: 7 },
  lessonType: { "scenario-lesson": 96, "language-toolkit": 20, "conversation-lab": 14, "pronunciation-lab": 12, "cultural-interpretation": 12, "professional-simulation": 9, "story-and-reflection": 6, "written-clarity-lab": 6 },
};
const actual = { language: count("language"), level: count("level"), lessonType: count("lessonType") };
const same = (left, right) => Object.entries(right).every(([key, value]) => left[key] === value) && Object.keys(left).length === Object.keys(right).length;
const failures = [];
if (corpus.objects.length !== 175) failures.push(`Expected 175 objects, got ${corpus.objects.length}`);
if (!unique(ids)) failures.push("Duplicate curriculum IDs detected");
if (!unique(slugs)) failures.push("Duplicate curriculum slugs detected");
if (!same(actual.language, expected.language)) failures.push(`Language distribution mismatch: ${JSON.stringify(actual.language)}`);
if (!same(actual.level, expected.level)) failures.push(`Level distribution mismatch: ${JSON.stringify(actual.level)}`);
if (!same(actual.lessonType, expected.lessonType)) failures.push(`Lesson type distribution mismatch: ${JSON.stringify(actual.lessonType)}`);
if (anatomyFailures.length) failures.push(`Missing required lesson anatomy: ${anatomyFailures.join(", ")}`);
if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures, actual }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ status: "PASS", total: corpus.objects.length, ...actual, anatomyFailures: 0 }, null, 2));
