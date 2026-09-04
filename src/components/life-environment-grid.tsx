"use client";

import Link from "next/link";
import { useState } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";
import { lifeEnvironments } from "@/content/site";
import { pickLocaleCopy } from "@/lib/locale-copy";

const languageLinks = [
  { key: "english", label: "English" },
  { key: "french", label: "Français" },
  { key: "spanish", label: "Español" },
] as const;

const translations = {
  en: {
    open: "Open connected lessons",
    names: ["Home", "Work", "People", "Travel", "Interests", "Culture"],
    examples: [
      ["Objects", "Routines", "Food", "Relationships", "Feelings", "Environment"],
      ["Meetings", "Customers", "Questions", "Problems", "Instructions", "Negotiation"],
      ["Introductions", "Stories", "Opinions", "Humor", "Conflict", "Connection"],
      ["Arrivals", "Directions", "Plans", "Discovery", "Questions", "Unexpected moments"],
      ["Music", "Technology", "Food", "Nature", "Design", "Ideas"],
      ["Politeness", "Identity", "Film", "Traditions", "Social cues", "Meaning"],
    ],
  },
  es: {
    open: "Abrir lecciones conectadas",
    names: ["Casa", "Trabajo", "Personas", "Viajes", "Intereses", "Cultura"],
    examples: [
      ["Objetos", "Rutinas", "Comida", "Relaciones", "Emociones", "Entorno"],
      ["Reuniones", "Clientes", "Preguntas", "Problemas", "Instrucciones", "Negociación"],
      ["Presentaciones", "Historias", "Opiniones", "Humor", "Conflicto", "Conexión"],
      ["Llegadas", "Direcciones", "Planes", "Descubrimiento", "Preguntas", "Imprevistos"],
      ["Música", "Tecnología", "Comida", "Naturaleza", "Diseño", "Ideas"],
      ["Cortesía", "Identidad", "Cine", "Tradiciones", "Señales sociales", "Significado"],
    ],
  },
  fr: {
    open: "Ouvrir les leçons reliées",
    names: ["Maison", "Travail", "Personnes", "Voyage", "Intérêts", "Culture"],
    examples: [
      ["Objets", "Routines", "Cuisine", "Relations", "Émotions", "Environnement"],
      ["Réunions", "Clients", "Questions", "Problèmes", "Instructions", "Négociation"],
      ["Présentations", "Histoires", "Opinions", "Humour", "Conflit", "Lien"],
      ["Arrivées", "Directions", "Plans", "Découverte", "Questions", "Imprévus"],
      ["Musique", "Technologie", "Cuisine", "Nature", "Design", "Idées"],
      ["Politesse", "Identité", "Cinéma", "Traditions", "Signaux sociaux", "Sens"],
    ],
  },
} as const;

export function LifeEnvironmentGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const { locale } = useInterfaceLocale();
  const t = pickLocaleCopy(translations, locale);

  return (
    <div className="life-grid">
      {lifeEnvironments.map((environment, index) => {
        const open = openIndex === index;
        const area = environment.name.toLowerCase();
        return (
          <article className={`life-card${open ? " is-open" : ""}`} key={environment.name}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
              <span className="life-card__index">{environment.index}</span>
              <span className="life-card__title">{t.names[index]}</span>
              <span className="life-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            <div className="life-card__content">
              <ul>{t.examples[index].map((example) => <li key={example}>{example}</li>)}</ul>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[.12em]">{t.open}</p>
                <div className="flex flex-wrap gap-2">
                  {languageLinks.map((language) => (
                    <Link key={language.key} href={`/learn/${language.key}/life/${area}`} className="rounded-full border border-[var(--line)] px-3 py-2 text-sm">
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
