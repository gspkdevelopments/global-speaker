"use client";

import { useState } from "react";
import type { CurriculumPracticeQuestion } from "@/lib/curriculum-types";
import type { InterfaceLocale } from "@/lib/interface-locale";

const copy = {
  en: { correct: "Correct", retry: "Try again" },
  es: { correct: "Correcto", retry: "Inténtalo de nuevo" },
  fr: { correct: "Correct", retry: "Réessayez" },
} as const;

export function LessonPractice({ questions, locale, targetLanguage }: { questions: CurriculumPracticeQuestion[]; locale: InterfaceLocale; targetLanguage: string }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="lesson-practice">
      {questions.map((question, index) => {
        const selected = answers[index];
        const isCorrect = selected === question.answer;
        return (
          <fieldset className="lesson-practice__question" key={question.prompt}>
            <legend><span>{String(index + 1).padStart(2, "0")}</span> {question.prompt}</legend>
            <div className="lesson-practice__options" lang={targetLanguage}>
              {question.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={selected === option ? "is-selected" : ""}
                  aria-pressed={selected === option}
                  onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                >
                  {option}
                </button>
              ))}
            </div>
            {selected ? (
              <p className={isCorrect ? "lesson-feedback is-correct" : "lesson-feedback is-retry"} role="status">
                <strong>{isCorrect ? copy[locale].correct : copy[locale].retry}.</strong> {question.explanation}
              </p>
            ) : null}
          </fieldset>
        );
      })}
    </div>
  );
}
