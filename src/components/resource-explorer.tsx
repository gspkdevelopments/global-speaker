"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/cards";
import { useInterfaceLocale } from "@/components/interface-locale";
import type { Resource } from "@/content/resources";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

type FilterDef = { key: string } & WithEnglish<string>;
const filterDefs: FilterDef[] = [
  { key: "All", en: "All", es: "Todo", fr: "Tout" },
  { key: "English", en: "English", es: "Inglés", fr: "Anglais" },
  { key: "Français", en: "Français", es: "Francés", fr: "Français" },
  { key: "Español", en: "Español", es: "Español", fr: "Espagnol" },
  { key: "Words & Meaning", en: "Words & Meaning", es: "Palabras y significado", fr: "Mots et sens" },
  { key: "Expression", en: "Expression", es: "Expresión", fr: "Expression" },
  { key: "Grammar in Context", en: "Grammar in Context", es: "Gramática en contexto", fr: "Grammaire en contexte" },
  { key: "Work", en: "Work", es: "Trabajo", fr: "Travail" },
  { key: "Culture", en: "Culture", es: "Cultura", fr: "Culture" },
  { key: "Travel", en: "Travel", es: "Viajes", fr: "Voyage" },
  { key: "People", en: "People", es: "Personas", fr: "Relations" },
  { key: "Learning", en: "Learning", es: "Aprendizaje", fr: "Apprentissage" },
] as const;

const copy = {
  en: { question: "What do you want to understand?", placeholder: "A word, situation, or idea…", filterLabel: "Filter resources", swipe: "Swipe to see all topics →", singular: "resource", plural: "resources", empty: "No exact match yet.", emptyHelp: "Try a language, a broader idea, or build a Language Map around the question." },
  es: { question: "¿Qué quieres entender?", placeholder: "Una palabra, situación o idea…", filterLabel: "Filtrar recursos", swipe: "Desliza para ver todos los temas →", singular: "recurso", plural: "recursos", empty: "Aún no hay una coincidencia exacta.", emptyHelp: "Prueba con un idioma, una idea más amplia o crea un Mapa de Idioma alrededor de la pregunta." },
  fr: { question: "Qu’est-ce que vous voulez comprendre ?", placeholder: "Un mot, une situation ou une idée…", filterLabel: "Filtrer les ressources", swipe: "Faites glisser pour voir tous les thèmes →", singular: "ressource", plural: "ressources", empty: "Aucune correspondance exacte pour le moment.", emptyHelp: "Essayez une langue, une idée plus large ou créez un Language Map autour de la question." },
} as const;

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const { locale } = useInterfaceLocale();
  const t = pickLocaleCopy(copy, locale);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesFilter = filter === "All" || resource.languageLabel === filter || resource.category === filter;
      const haystack = `${resource.title} ${resource.subtitle} ${resource.description} ${resource.category} ${resource.languageLabel}`.toLowerCase();
      return matchesFilter && (!normalized || haystack.includes(normalized));
    });
  }, [filter, query, resources]);

  return (
    <div className="resource-explorer">
      <div className="resource-search">
        <label htmlFor="resource-search">{t.question}</label>
        <div><span aria-hidden="true">⌕</span><input id="resource-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} /></div>
      </div>
      <div className="filter-row" aria-label={t.filterLabel}>
        {filterDefs.map((item) => <button type="button" className={filter === item.key ? "is-active" : ""} aria-pressed={filter === item.key} onClick={() => setFilter(item.key)} key={item.key}>{pickLocaleCopy(item, locale)}</button>)}
      </div>
      <p className="filter-row__hint" aria-hidden="true">{t.swipe}</p>
      <p className="results-count" aria-live="polite">{visible.length} {visible.length === 1 ? t.singular : t.plural}</p>
      {visible.length ? <div className="resource-grid resource-grid--library">{visible.map((resource, index) => <ResourceCard resource={resource} index={index} featured={index === 0} key={resource.slug} />)}</div> : <div className="empty-state"><p>{t.empty}</p><span>{t.emptyHelp}</span></div>}
    </div>
  );
}
