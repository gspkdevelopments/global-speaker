// Node's built-in test runner executes this TypeScript module without another dependency.
import assert from "node:assert/strict";
import test from "node:test";
import { getLocalizedCurriculumOverride, getLocalizedFoundationLessonIds } from "../src/content/curriculum-localized.ts";

const lessonId = "fra-people-saluer-et-se-presenter-v1";

test("provides the Spanish-supported French pilot lesson", () => {
  const lesson = getLocalizedCurriculumOverride("es", lessonId);
  assert.ok(lesson);
  assert.equal(lesson.title, "Qui je suis aujourd’hui");
  assert.match(lesson.learningObjective, /Presentarte en francés/);
  assert.match(lesson.expectedOutcome, /30–45 segundos/);
  assert.ok(lesson.sections.some((section) => section.kind === "practice"));
  assert.ok(lesson.sections.some((section) => section.kind === "progress"));
});

test("keeps target-language practice inside the Spanish lesson support", () => {
  const lesson = getLocalizedCurriculumOverride("es", lessonId);
  assert.ok(lesson);
  assert.match(lesson.sections.map((section) => section.body).join("\n"), /Je m’appelle/);
  assert.equal(lesson.practice.length, 3);
  for (const question of lesson.practice) assert.ok(question.options.includes(question.answer));
});

test("orders eight foundation lessons across the four methodology pillars", () => {
  const ids = getLocalizedFoundationLessonIds("es", "french");
  assert.equal(ids.length, 8);
  const lessons = ids.map((id) => getLocalizedCurriculumOverride("es", id)!);
  assert.deepEqual(lessons.map((lesson) => lesson.sequence), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual([...new Set(lessons.map((lesson) => lesson.pillar))], ["Ser y existir", "Personalidad", "Urgencias", "Ocio e intereses"]);
  for (const lesson of lessons) {
    assert.equal(lesson.practice.length, 3);
    assert.equal(lesson.checkpoints.length, 3);
    assert.ok(lesson.sections.some((section) => section.kind === "practice"));
    assert.ok(lesson.sections.some((section) => section.kind === "progress"));
    for (const question of lesson.practice) assert.ok(question.options.includes(question.answer));
  }
});

test("connects each foundation lesson to the next lesson in sequence", () => {
  const ids = getLocalizedFoundationLessonIds("es", "french");
  ids.slice(0, -1).forEach((id, index) => assert.equal(getLocalizedCurriculumOverride("es", id)?.nextLessonId, ids[index + 1]));
  assert.equal(getLocalizedCurriculumOverride("es", ids.at(-1)!)?.nextLessonId, undefined);
});

test("does not leak the pilot into unapproved interface locales", () => {
  assert.equal(getLocalizedCurriculumOverride("en", lessonId), undefined);
  assert.equal(getLocalizedCurriculumOverride("fr", lessonId), undefined);
});
