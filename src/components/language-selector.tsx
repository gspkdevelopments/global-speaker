"use client";

import Link from "next/link";
import { useState } from "react";
import { languages, type LanguageKey } from "@/content/site";

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
        <Link href={`/learn/${language.key}`}>Explore {language.name} <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
