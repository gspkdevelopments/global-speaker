import { gunzipSync } from "node:zlib";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packedRoot = path.join(root, "src/content/curriculum-packed/v1");
const generatedRoot = path.join(root, "src/content/curriculum/generated");

const partNames = (await readdir(packedRoot))
  .filter((name) => /^part-\d+\.b64$/.test(name))
  .sort();

if (!partNames.length) throw new Error("No authored corpus payload parts found.");

const encoded = (await Promise.all(partNames.map((name) => readFile(path.join(packedRoot, name), "utf8"))))
  .join("")
  .replace(/\s+/g, "");

const decoded = gunzipSync(Buffer.from(encoded, "base64")).toString("utf8");
const payload = JSON.parse(decoded);

if (payload.version !== 1 || !Array.isArray(payload.lessons)) {
  throw new Error("Unsupported authored corpus payload.");
}
if (payload.lessons.length !== 175) {
  throw new Error(`Expected 175 authored lessons, got ${payload.lessons.length}`);
}

await rm(generatedRoot, { recursive: true, force: true });
await mkdir(generatedRoot, { recursive: true });

const seen = new Set();
for (const lesson of payload.lessons) {
  if (!lesson?.id || typeof lesson.markdown !== "string") throw new Error("Malformed authored lesson payload entry.");
  if (seen.has(lesson.id)) throw new Error(`Duplicate authored lesson ID: ${lesson.id}`);
  seen.add(lesson.id);

  const language = lesson.markdown.match(/^language:\s*(english|spanish|french)$/m)?.[1];
  if (!language) throw new Error(`${lesson.id}: missing or invalid language frontmatter`);
  const languageRoot = path.join(generatedRoot, language);
  await mkdir(languageRoot, { recursive: true });
  await writeFile(path.join(languageRoot, `${lesson.id}.md`), lesson.markdown.endsWith("\n") ? lesson.markdown : `${lesson.markdown}\n`, "utf8");
}

console.log(JSON.stringify({ parts: partNames.length, lessons: seen.size, generatedRoot }, null, 2));
