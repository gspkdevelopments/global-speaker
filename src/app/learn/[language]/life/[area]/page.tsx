import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, SectionHeading } from "@/components/ui";
import {
  getCurriculumLessons,
  isCurriculumLanguage,
  type CurriculumLanguage,
} from "@/lib/curriculum";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy } from "@/lib/locale-copy";

export const lifeAreas = [
  "home",
  "work",
  "people",
  "travel",
  "interests",
  "culture",
] as const;
export type LifeArea = (typeof lifeAreas)[number];
const cefrOrder = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const copy = {
  en: {
    home: [
      "Home",
      "Daily routines, shared spaces, objects, comfort, requests, and the language of ordinary life.",
    ],
    work: [
      "Work",
      "Updates, instructions, clients, meetings, feedback, negotiation, writing, and professional confidence.",
    ],
    people: [
      "People",
      "Introductions, small talk, opinions, relationships, disagreement, humor, boundaries, and connection.",
    ],
    travel: [
      "Travel",
      "Arrival, directions, food, transport, accommodation, changing plans, recommendations, and problem-solving.",
    ],
    interests: [
      "Interests",
      "Music, technology, food, nature, design, ideas, and the things that give you something real to say.",
    ],
    culture: [
      "Culture",
      "Register, politeness, implication, regional variation, humor, social distance, and interpreting more than words.",
    ],
    eye: "LIFE AREA",
    suffix: "in the language you need.",
    connected: "connected lessons",
    corpus: "One corpus · many entry points",
    explore: "Explore this area across levels.",
    intro:
      "These are not duplicate lessons. The same canonical learning objects are surfaced through the part of life where they become useful.",
    back: "Back to curriculum",
    lessons: "lessons",
  },
  es: {
    home: [
      "Hogar",
      "Rutinas diarias, espacios compartidos, objetos, comodidad, peticiones y el idioma de la vida cotidiana.",
    ],
    work: [
      "Trabajo",
      "Actualizaciones, instrucciones, clientes, reuniones, feedback, negociación, escritura y confianza profesional.",
    ],
    people: [
      "Personas",
      "Presentaciones, conversación ligera, opiniones, relaciones, desacuerdo, humor, límites y conexión.",
    ],
    travel: [
      "Viajes",
      "Llegadas, direcciones, comida, transporte, alojamiento, cambios de plan, recomendaciones y resolución de problemas.",
    ],
    interests: [
      "Intereses",
      "Música, tecnología, comida, naturaleza, diseño, ideas y todo lo que te da algo real que decir.",
    ],
    culture: [
      "Cultura",
      "Registro, cortesía, implicación, variación regional, humor, distancia social e interpretación más allá de las palabras.",
    ],
    eye: "ÁREA DE VIDA",
    suffix: "en el idioma que necesitas.",
    connected: "lecciones conectadas",
    corpus: "Un corpus · muchos puntos de entrada",
    explore: "Explora esta área a través de los niveles.",
    intro:
      "No son lecciones duplicadas. Los mismos objetos canónicos aparecen desde la parte de la vida donde se vuelven útiles.",
    back: "Volver al currículo",
    lessons: "lecciones",
  },
  fr: {
    home: [
      "Maison",
      "Routines quotidiennes, espaces partagés, objets, confort, demandes et langue de la vie ordinaire.",
    ],
    work: [
      "Travail",
      "Mises à jour, consignes, clients, réunions, retours, négociation, écriture et confiance professionnelle.",
    ],
    people: [
      "Personnes",
      "Présentations, petite conversation, opinions, relations, désaccord, humour, limites et connexion.",
    ],
    travel: [
      "Voyage",
      "Arrivée, directions, cuisine, transport, hébergement, changements de plan, recommandations et résolution de problèmes.",
    ],
    interests: [
      "Centres d’intérêt",
      "Musique, technologie, cuisine, nature, design, idées et tout ce qui vous donne quelque chose de réel à dire.",
    ],
    culture: [
      "Culture",
      "Registre, politesse, implicite, variation régionale, humour, distance sociale et interprétation au-delà des mots.",
    ],
    eye: "DOMAINE DE VIE",
    suffix: "dans la langue dont vous avez besoin.",
    connected: "leçons associées",
    corpus: "Un corpus · plusieurs points d’entrée",
    explore: "Explorez ce domaine à travers les niveaux.",
    intro:
      "Il ne s’agit pas de leçons dupliquées. Les mêmes objets canoniques sont proposés depuis la partie de la vie où ils deviennent utiles.",
    back: "Retour au programme",
    lessons: "leçons",
  },
} as const;
function lessonsForArea(language: CurriculumLanguage, area: LifeArea) {
  return getCurriculumLessons(language).filter(
    (lesson) =>
      lesson.primaryEnvironment === area ||
      lesson.secondaryEnvironments.includes(area),
  );
}
export function generateStaticParams() {
  const languages: CurriculumLanguage[] = ["english", "spanish", "french"];
  return languages.flatMap((language) =>
    lifeAreas.map((area) => ({ language, area })),
  );
}
export async function generateMetadata({
  params,
}: PageProps<"/learn/[language]/life/[area]">): Promise<Metadata> {
  const { language, area } = await params;
  if (!isCurriculumLanguage(language) || !lifeAreas.includes(area as LifeArea))
    return {};
  return {
    title: `${area} ${language} lessons`,
    alternates: { canonical: `/learn/${language}/life/${area}` },
  };
}
export default async function LifeAreaPage({
  params,
}: PageProps<"/learn/[language]/life/[area]">) {
  const { language, area } = await params;
  const locale = await getInterfaceLocale();
  if (!isCurriculumLanguage(language) || !lifeAreas.includes(area as LifeArea))
    notFound();
  const lifeArea = area as LifeArea;
  const c = pickLocaleCopy(copy, locale);
  const [title, description] = c[lifeArea];
  const lessons = lessonsForArea(language, lifeArea);
  const byLevel = cefrOrder
    .map((level) => ({
      level,
      lessons: lessons.filter((lesson) => lesson.level === level),
    }))
    .filter((group) => group.lessons.length > 0);
  return (
    <>
      <PageIntro
        eyebrow={`${language.toUpperCase()} · ${c.eye}`}
        title={`${title}, ${c.suffix}`}
        copy={description}
        note={`${lessons.length} ${c.connected}`}
      />
      <section className="section">
        <div className="container">
          <div className="resources-preview__heading">
            <SectionHeading
              eyebrow={c.corpus}
              title={c.explore}
              intro={c.intro}
            />
            <Link className="button button--text" href={`/learn/${language}`}>
              {c.back} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="mt-12 space-y-10">
            {byLevel.map((group) => (
              <section key={group.level}>
                <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-3">
                  <h2 className="font-[var(--serif)] text-3xl">
                    {group.level}
                  </h2>
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-soft)]">
                    {group.lessons.length} {c.lessons}
                  </span>
                </div>
                <div className="resource-grid">
                  {group.lessons.map((lesson) => (
                    <Link
                      className="resource-card"
                      key={lesson.id}
                      href={`/learn/${lesson.language}/${lesson.slug}`}
                    >
                      <p className="eyebrow">
                        {lesson.level} ·{" "}
                        {lesson.lessonType.replaceAll("-", " ")}
                      </p>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.learningObjective}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
