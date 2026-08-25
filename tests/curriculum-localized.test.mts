// Node's built-in test runner executes this TypeScript module without another dependency.
import assert from "node:assert/strict";
import test from "node:test";
import { getLocalizedCurriculumOverride } from "../src/content/curriculum-localized.ts";

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

test("does not leak the pilot into unapproved interface locales", () => {
  assert.equal(getLocalizedCurriculumOverride("en", lessonId), undefined);
  assert.equal(getLocalizedCurriculumOverride("fr", lessonId), undefined);
});
