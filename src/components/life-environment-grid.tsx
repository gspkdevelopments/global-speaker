"use client";

import Link from "next/link";
import { useState } from "react";
import { lifeEnvironments } from "@/content/site";

const languageLinks = [
  { key: "english", label: "English" },
  { key: "french", label: "Français" },
  { key: "spanish", label: "Español" },
] as const;

export function LifeEnvironmentGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="life-grid">
      {lifeEnvironments.map((environment, index) => {
        const open = openIndex === index;
        const area = environment.name.toLowerCase();
        return (
          <article className={`life-card${open ? " is-open" : ""}`} key={environment.name}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
              <span className="life-card__index">{environment.index}</span>
              <span className="life-card__title">{environment.name}</span>
              <span className="life-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            <div className="life-card__content">
              <ul>{environment.examples.map((example) => <li key={example}>{example}</li>)}</ul>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[.12em]">Open connected lessons</p>
                <div className="flex flex-wrap gap-2">
                  {languageLinks.map((language) => (
                    <Link
                      key={language.key}
                      href={`/learn/${language.key}/life/${area}`}
                      className="rounded-full border border-[var(--line)] px-3 py-2 text-sm"
                    >
                      {language.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
