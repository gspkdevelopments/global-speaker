import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/cards";
import { MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { getLocalizedCurriculumOverride, getLocalizedFoundationLessonIds } from "@/content/curriculum-localized";
import { resources } from "@/content/resources";
import { languages, type LanguageKey } from "@/content/site";
import { getCurriculumLessonById, getCurriculumLessons, type CurriculumLanguage } from "@/lib/curriculum";
import type { InterfaceLocale } from "@/lib/interface-locale";
import { getInterfaceLocale } from "@/lib/interface-locale-server";

const cefrOrder = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const areaSlugs = ["home", "work", "people", "travel", "interests", "culture"] as const;
type AreaSlug = (typeof areaSlugs)[number];

const areaCopy = {
  en: { home: ["Home", "Routines · space · shared life"], work: ["Work", "Tasks · clients · decisions"], people: ["People", "Connection · opinions · boundaries"], travel: ["Travel", "Arrival · movement · problem-solving"], interests: ["Interests", "Music · technology · food · ideas"], culture: ["Culture", "Register · humor · implication"] },
  es: { home: ["Hogar", "Rutinas · espacio · vida compartida"], work: ["Trabajo", "Tareas · clientes · decisiones"], people: ["Personas", "Conexión · opiniones · límites"], travel: ["Viajes", "Llegada · movimiento · resolución de problemas"], interests: ["Intereses", "Música · tecnología · comida · ideas"], culture: ["Cultura", "Registro · humor · implicación"] },
  fr: { home: ["Maison", "Routines · espace · vie partagée"], work: ["Travail", "Tâches · clients · décisions"], people: ["Personnes", "Lien · opinions · limites"], travel: ["Voyage", "Arrivée · déplacements · résolution de problèmes"], interests: ["Centres d’intérêt", "Musique · technologie · cuisine · idées"], culture: ["Culture", "Registre · humour · implicite"] },
} as const;

const heroCopy: Record<InterfaceLocale, Record<LanguageKey, { eyebrow: string; title: string; copy: string }>> = {
  en: {
    english: { eyebrow: "English · Real communication", title: "Build an English voice that belongs to you.", copy: "Start with who you are, what you need, and the situations where English becomes useful." },
    french: { eyebrow: "French · Real communication", title: "French for expressing your own life.", copy: "Build from identity and immediate needs toward conversation, interests, and social confidence." },
    spanish: { eyebrow: "Spanish · Real communication", title: "Spanish for participating in real life.", copy: "Connect personal expression with the situations, relationships, and cultural choices that matter to you." },
  },
  es: {
    english: { eyebrow: "Inglés · Comunicación real", title: "Inglés para construir una voz propia.", copy: "Empieza por quién eres, lo que necesitas y las situaciones donde el inglés puede ayudarte a actuar y relacionarte." },
    french: { eyebrow: "Francés · Comunicación real", title: "Francés para hablar desde tu propia vida.", copy: "Construye desde tu identidad y tus necesidades inmediatas hasta la conversación, tus intereses y la confianza social." },
    spanish: { eyebrow: "Español · Comunicación real", title: "Español para participar en situaciones reales.", copy: "Conecta la expresión personal con las relaciones, necesidades y decisiones culturales que forman tu vida." },
  },
  fr: {
    english: { eyebrow: "Anglais · Communication réelle", title: "L’anglais pour construire votre propre voix.", copy: "Commencez par qui vous êtes, ce dont vous avez besoin et les situations où l’anglais devient utile." },
    french: { eyebrow: "Français · Communication réelle", title: "Le français pour exprimer votre propre vie.", copy: "Construisez à partir de votre identité et de vos besoins vers la conversation, les intérêts et la confiance sociale." },
    spanish: { eyebrow: "Espagnol · Communication réelle", title: "L’espagnol pour participer à la vie réelle.", copy: "Reliez votre expression personnelle aux situations, relations et choix culturels qui comptent pour vous." },
  },
};

const hubExamples: Record<InterfaceLocale, Record<LanguageKey, string[]>> = {
  en: {
    english: ["Say who you are", "Describe your personality", "Handle what matters now", "Share your interests"],
    french: ["Say who you are", "Describe your personality", "Ask for help clearly", "Turn interests into conversation"],
    spanish: ["Say who you are", "Build relationships", "Handle immediate needs", "Participate through your interests"],
  },
  es: {
    english: ["Decir quién eres", "Describir tu personalidad", "Resolver lo que importa ahora", "Compartir tus intereses"],
    french: ["Decir quién eres", "Describir tu personalidad", "Pedir ayuda con claridad", "Convertir intereses en conversación"],
    spanish: ["Decir quién eres", "Construir relaciones", "Resolver necesidades inmediatas", "Participar desde tus intereses"],
  },
  fr: {
    english: ["Dire qui vous êtes", "Décrire votre personnalité", "Gérer les besoins immédiats", "Partager vos intérêts"],
    french: ["Dire qui vous êtes", "Décrire votre personnalité", "Demander de l’aide clairement", "Transformer vos intérêts en conversation"],
    spanish: ["Dire qui vous êtes", "Créer des liens", "Gérer les besoins immédiats", "Participer à partir de vos intérêts"],
  },
};

const hubCopy = {
  en: { baseEye: "Global Speaker · Foundation route", baseTitle: "Eight lessons that build a usable personal base.", baseIntro: "Move from identity to interaction through the four principles of the method.", built: "Built around you", builtTitle: "Learn what your life asks for.", builtIntro: "A useful language path follows situations before syllabi.", lifeEye: "Your life · six doors", lifeTitle: "Enter the curriculum from where you already are.", lifeIntro: "Explore the same lesson graph by level or by the part of life where language becomes useful.", connected: "connected lessons", explore: "Explore this life area", movement: "The learning movement", movementTitle: "From experience to interaction.", movementIntro: "Notice what is happening. Build the thought. Connect it to language. Say it. Use it with someone.", method: "See how the method works", curriculum: "Curriculum", path: "Continue beyond the foundation.", pathIntro: "Explore the wider curriculum by CEFR level and real-life environment.", lessons: "lessons", exploreLang: "Explore", idea: "Start with one useful idea.", resources: "All free resources", next: "Organize your route", make: "Turn these lessons into your learning path.", cta: "Use your Language Map to prioritize the needs, situations, and interests that should come next." },
  es: { baseEye: "Global Speaker · Ruta base", baseTitle: "Ocho lecciones para construir una base personal y utilizable.", baseIntro: "Avanza desde la identidad hasta la interacción mediante los cuatro principios del método.", built: "Construido alrededor de ti", builtTitle: "Aprende lo que tu vida te pide.", builtIntro: "Una ruta útil sigue situaciones reales antes que temarios abstractos.", lifeEye: "Tu vida · seis puertas", lifeTitle: "Entra al currículo desde donde ya estás.", lifeIntro: "Explora el mismo recorrido por nivel o por la parte de tu vida donde el idioma se vuelve útil.", connected: "lecciones conectadas", explore: "Explorar esta área de vida", movement: "El movimiento de aprendizaje", movementTitle: "De la experiencia a la interacción.", movementIntro: "Observa lo que ocurre. Construye la idea. Conéctala con el idioma. Dila. Úsala con alguien.", method: "Ver cómo funciona el método", curriculum: "Currículo", path: "Continúa después de la ruta base.", pathIntro: "Explora el currículo amplio por nivel MCER y entorno de vida.", lessons: "lecciones", exploreLang: "Explorar", idea: "Empieza con una idea útil.", resources: "Todos los recursos gratuitos", next: "Organiza tu recorrido", make: "Convierte estas lecciones en tu ruta de aprendizaje.", cta: "Usa tu Mapa de Idioma para priorizar las necesidades, situaciones e intereses que deben continuar." },
  fr: { baseEye: "Global Speaker · Parcours de base", baseTitle: "Huit leçons pour construire une base personnelle et utilisable.", baseIntro: "Progressez de l’identité vers l’interaction à travers les quatre principes de la méthode.", built: "Construit autour de vous", builtTitle: "Apprenez ce que votre vie vous demande.", builtIntro: "Un parcours utile suit les situations avant les programmes abstraits.", lifeEye: "Votre vie · six portes", lifeTitle: "Entrez dans le programme depuis l’endroit où vous êtes déjà.", lifeIntro: "Explorez le même parcours par niveau ou par la partie de votre vie où la langue devient utile.", connected: "leçons associées", explore: "Explorer ce domaine de vie", movement: "Le mouvement d’apprentissage", movementTitle: "De l’expérience à l’interaction.", movementIntro: "Observez ce qui se passe. Construisez l’idée. Reliez-la à la langue. Dites-la. Utilisez-la avec quelqu’un.", method: "Voir comment fonctionne la méthode", curriculum: "Programme", path: "Continuez après le parcours de base.", pathIntro: "Explorez le programme élargi par niveau CECR et contexte de vie.", lessons: "leçons", exploreLang: "Explorer", idea: "Commencez avec une idée utile.", resources: "Toutes les ressources gratuites", next: "Organisez votre parcours", make: "Transformez ces leçons en parcours d’apprentissage.", cta: "Utilisez votre carte linguistique pour prioriser les besoins, situations et intérêts à développer ensuite." },
} as const;

function areaLabel(locale: InterfaceLocale, environment: string) {
  return areaSlugs.includes(environment as AreaSlug) ? areaCopy[locale][environment as AreaSlug][0] : environment;
}

export function generateStaticParams() {
  return languages.map((language) => ({ language: language.key }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[language]">): Promise<Metadata> {
  const { language } = await params;
  const locale = await getInterfaceLocale();
  const profile = languages.find((item) => item.key === language);
  if (!profile) return {};
  const hero = heroCopy[locale][profile.key];
  return { title: hero.title, description: hero.copy, alternates: { canonical: `/learn/${profile.key}` } };
}

export default async function LanguageHubPage({ params }: PageProps<"/learn/[language]">) {
  const { language } = await params;
  const locale = await getInterfaceLocale();
  const c = hubCopy[locale];
  const profile = languages.find((item) => item.key === language);
  if (!profile) notFound();

  const hero = heroCopy[locale][profile.key];
  const examples = hubExamples[locale][profile.key];
  const related = resources.filter((resource) => resource.language === profile.key).slice(0, 3);
  const curriculum = getCurriculumLessons(profile.key as CurriculumLanguage, locale);
  const curriculumByLevel = cefrOrder.map((level) => ({ level, lessons: curriculum.filter((lesson) => lesson.level === level) })).filter((group) => group.lessons.length > 0);
  const semanticAreas = areaSlugs.map((slug) => ({ slug, title: areaCopy[locale][slug][0], note: areaCopy[locale][slug][1], count: curriculum.filter((lesson) => lesson.primaryEnvironment === slug || lesson.secondaryEnvironments.includes(slug)).length }));
  const foundation = getLocalizedFoundationLessonIds(locale, profile.key).flatMap((lessonId) => {
    const lesson = getCurriculumLessonById(lessonId, locale);
    const override = getLocalizedCurriculumOverride(locale, lessonId);
    return lesson && override ? [{ lesson, pillar: override.pillar, sequence: override.sequence }] : [];
  });

  return <>
    <PageIntro eyebrow={hero.eyebrow} title={hero.title} copy={hero.copy} accent={profile.accent} note={profile.nativeName} />
    {foundation.length ? <section className="section foundation-route"><div className="container"><SectionHeading eyebrow={c.baseEye} title={c.baseTitle} intro={c.baseIntro} /><div className="resource-grid mt-10">{foundation.map(({ lesson, pillar, sequence }) => <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}><p className="eyebrow">{String(sequence).padStart(2, "0")} · {pillar}</p><h3 lang="fr">{lesson.title}</h3><p>{lesson.learningObjective}</p><span className="resource-card__link">{c.explore} <i aria-hidden="true">→</i></span></Link>)}</div></div></section> : null}
    <section className="section hub-pillars"><div className="container"><SectionHeading eyebrow={c.built} title={c.builtTitle} intro={c.builtIntro} /><div className="hub-pillar-grid">{examples.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow={c.lifeEye} title={c.lifeTitle} intro={c.lifeIntro} /><div className="resource-grid mt-10">{semanticAreas.map((area) => <Link className="resource-card" key={area.slug} href={`/learn/${profile.key}/life/${area.slug}`}><p className="eyebrow">{area.count} {c.connected}</p><h3>{area.title}</h3><p>{area.note}</p><span className="resource-card__link">{c.explore} <i aria-hidden="true">→</i></span></Link>)}</div></div></section>
    <section className={`section hub-method hub-method--${profile.accent}`}><div className="container"><SectionHeading eyebrow={c.movement} title={c.movementTitle} intro={c.movementIntro} /><MethodSequence compact /><ButtonLink href="/method" variant="secondary">{c.method}</ButtonLink></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow={`${c.curriculum} · ${curriculum.length} ${c.lessons}`} title={c.path} intro={c.pathIntro} /><div className="mt-12 space-y-4">{curriculumByLevel.map((group, index) => <details key={group.level} open={index === 0} className="border-t border-[var(--line)] py-5"><summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-2 marker:content-none"><span className="font-[var(--serif)] text-3xl">{group.level}</span><span className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-soft)]">{group.lessons.length} {c.lessons}</span></summary><div className="resource-grid mt-6">{group.lessons.map((lesson) => <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}><p className="eyebrow">{lesson.level} · {areaLabel(locale, lesson.primaryEnvironment)}</p><h3>{lesson.title}</h3><p>{lesson.learningObjective}</p></Link>)}</div></details>)}</div></div></section>
    <section className="section"><div className="container"><div className="resources-preview__heading"><SectionHeading eyebrow={`${c.exploreLang} ${profile.nativeName}`} title={c.idea} /><ButtonLink href="/resources" variant="text">{c.resources}</ButtonLink></div><div className="resource-grid resource-grid--preview">{related.map((resource, index) => <ResourceCard key={resource.slug} resource={resource} index={index} />)}</div></div></section>
    <CTASection eyebrow={`${profile.code} · ${c.next}`} title={c.make} copy={c.cta} />
  </>;
}
