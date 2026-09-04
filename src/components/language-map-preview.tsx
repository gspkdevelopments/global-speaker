"use client";
import { useInterfaceLocale } from "@/components/interface-locale";
import { pickLocaleCopy } from "@/lib/locale-copy";

const copy = {
  en: {
    title: "Personal Language Map",
    start: "Starting point",
    you: "You",
    goal: "Goal",
    goalValue: "Professional confidence",
    env: "Environments",
    work: "Work",
    social: "Social life",
    travel: "Travel",
    interests: "Interests",
    music: "Music",
    tech: "Technology",
    culture: "Culture",
    voice: "Voice",
    speaking: "Speaking",
    vocab: "Vocabulary",
    natural: "Natural expression",
    intention: "Intention",
    contexts: "Real contexts",
    yourVoice: "Your voice",
  },
  es: {
    title: "Mapa de Idioma Personal",
    start: "Punto de partida",
    you: "Tú",
    goal: "Meta",
    goalValue: "Confianza profesional",
    env: "Entornos",
    work: "Trabajo",
    social: "Vida social",
    travel: "Viajes",
    interests: "Intereses",
    music: "Música",
    tech: "Tecnología",
    culture: "Cultura",
    voice: "Voz",
    speaking: "Hablar",
    vocab: "Vocabulario",
    natural: "Expresión natural",
    intention: "Intención",
    contexts: "Contextos reales",
    yourVoice: "Tu voz",
  },
  fr: {
    title: "Carte linguistique personnelle",
    start: "Point de départ",
    you: "Vous",
    goal: "Objectif",
    goalValue: "Confiance professionnelle",
    env: "Contextes",
    work: "Travail",
    social: "Vie sociale",
    travel: "Voyage",
    interests: "Centres d’intérêt",
    music: "Musique",
    tech: "Technologie",
    culture: "Culture",
    voice: "Voix",
    speaking: "Parler",
    vocab: "Vocabulaire",
    natural: "Expression naturelle",
    intention: "Intention",
    contexts: "Contextes réels",
    yourVoice: "Votre voix",
  },
} as const;
export function LanguageMapPreview() {
  const { locale } = useInterfaceLocale();
  const c = pickLocaleCopy(copy, locale);
  return (
    <div className="map-preview" aria-label={c.title}>
      <div className="map-preview__header">
        <span>{c.title}</span>
        <span>GS—001</span>
      </div>
      <div className="map-preview__canvas">
        <svg
          aria-hidden="true"
          viewBox="0 0 640 390"
          preserveAspectRatio="none"
        >
          <path d="M320 190 C250 120 205 90 125 78" />
          <path d="M320 190 C400 120 450 92 525 82" />
          <path d="M320 190 C245 255 195 290 118 310" />
          <path d="M320 190 C395 255 448 292 526 310" />
        </svg>
        <div className="map-preview__you">
          <span>{c.start}</span>
          <strong>{c.you}</strong>
          <i>EN</i>
        </div>
        <dl className="map-preview__clusters">
          <div className="map-preview__cluster map-preview__cluster--goal">
            <dt>{c.goal}</dt>
            <dd>{c.goalValue}</dd>
          </div>
          <div className="map-preview__cluster map-preview__cluster--world">
            <dt>{c.env}</dt>
            <dd>
              <span>{c.work}</span>
              <span>{c.social}</span>
              <span>{c.travel}</span>
            </dd>
          </div>
          <div className="map-preview__cluster map-preview__cluster--interests">
            <dt>{c.interests}</dt>
            <dd>
              <span>{c.music}</span>
              <span>{c.tech}</span>
              <span>{c.culture}</span>
            </dd>
          </div>
          <div className="map-preview__cluster map-preview__cluster--voice">
            <dt>{c.voice}</dt>
            <dd>
              <span>{c.speaking}</span>
              <span>{c.vocab}</span>
              <span>{c.natural}</span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="map-preview__path" aria-hidden="true">
        <span>{c.intention}</span>
        <i />
        <span>{c.contexts}</span>
        <i />
        <span>{c.yourVoice}</span>
      </div>
    </div>
  );
}
