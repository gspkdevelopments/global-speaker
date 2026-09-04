"use client";

import Link from "next/link";
import { useState } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";
import { languages, type LanguageKey } from "@/content/site";
import { pickLocaleCopy } from "@/lib/locale-copy";

const lifeAreas = ["home", "work", "people", "travel", "interests", "culture"] as const;
const labels = {
  en: { prompt: "What do you want to speak?", choose: "Choose a language", open: "Open the full", curriculum: "curriculum", start: "Or start with the part of life you need", areas: ["Home", "Work", "People", "Travel", "Interests", "Culture"] },
  es: { prompt: "¿Qué quieres hablar?", choose: "Elige un idioma", open: "Abrir el currículo completo de", curriculum: "", start: "O empieza con la parte de tu vida que necesitas", areas: ["Casa", "Trabajo", "Personas", "Viajes", "Intereses", "Cultura"] },
  fr: { prompt: "Quelle langue voulez-vous parler ?", choose: "Choisir une langue", open: "Ouvrir le programme complet de", curriculum: "", start: "Ou commencez par la partie de votre vie dont vous avez besoin", areas: ["Maison", "Travail", "Personnes", "Voyage", "Intérêts", "Culture"] },
} as const;

export function LanguageSelector() {
  const [selected, setSelected] = useState<LanguageKey>("english");
  const { locale } = useInterfaceLocale();
  const t = pickLocaleCopy(labels, locale);
  const language = languages.find((item) => item.key === selected) ?? languages[0];

  return (
    <div className={`language-selector language-selector--${language.accent}`}>
      <p>{t.prompt}</p>
      <div className="language-selector__options" role="group" aria-label={t.choose}>
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
        <Link href={`/learn/${language.key}`}>{t.open} {language.nativeName}{t.curriculum ? ` ${t.curriculum}` : ""} <span aria-hidden="true">→</span></Link>
      </div>
      <div className="mt-5 border-t border-current/20 pt-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.12em]">{t.start}</p>
        <div className="flex flex-wrap gap-2">
          {lifeAreas.map((area, index) => (
            <Link key={area} href={`/learn/${language.key}/life/${area}`} className="rounded-full border border-current/30 px-3 py-2 text-sm">
              {t.areas[index]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
