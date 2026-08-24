"use client";

import Link from "next/link";
import { useState } from "react";
import { languages, type LanguageKey } from "@/content/site";

const lifeAreas = ["home", "work", "people", "travel", "interests", "culture"] as const;

export function LanguageSelector() {
  const [selected, setSelected] = useState<LanguageKey>("english");
  const language = languages.find((item) => item.key === selected) ?? languages[0];

  return (
    <div className={`language-selector language-selector--${language.accent}`}>
      <p>What do you want to speak?</p>
      <div className="language-selector__options" role="group" aria-label="Choose a language">
        {languages.map((item) => (
          <button
            type="button"
            key={item.key}
            className={selected === item.key ? "is-active" : ""}
            aria-pressed={selected === item.key}
            onClick={() => setSelected(item.key)}
          >
            <span>{item.code}</span>{item.nativeName}
          </button>
        ))}
      </div>
      <div className="language-selector__response" aria-live="polite">
        <p>“{language.promise}”</p>
        <Link href={`/learn/${language.key}`}>Open the full {language.name} curriculum <span aria-hidden="true">→</span></Link>
      </div>
      <div className="mt-5 border-t border-current/20 pt-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.12em]">Or start with the part of life you need</p>
        <div className="flex flex-wrap gap-2">
          {lifeAreas.map((area) => (
            <Link
              key={area}
              href={`/learn/${language.key}/life/${area}`}
              className="rounded-full border border-current/30 px-3 py-2 text-sm capitalize"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
