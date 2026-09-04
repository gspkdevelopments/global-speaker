import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/cards";
import { MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { getLocalizedCurriculumOverride, getLocalizedFoundationLessonIds } from "@/content/curriculum-localized";
import { resources } from "@/content/resources";
import { activeLanguages, languages, type LanguageKey } from "@/content/site";
import { getPolyglotArticlesForLanguage, polyglotTopics } from "@/content/polyglot";
import { getCurriculumLessonById, getCurriculumLessons, type CurriculumLanguage } from "@/lib/curriculum";
import type { InterfaceLocale } from "@/lib/interface-locale";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

const cefrOrder = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const areaSlugs = ["home", "work", "people", "travel", "interests", "culture"] as const;
type AreaSlug = (typeof areaSlugs)[number];
type HeroCopy = { eyebrow: string; title: string; copy: string };

const areaCopy: WithEnglish<Record<AreaSlug, [string, string]>> = {
  en: { home: ["Home", "Routines · space · shared life"], work: ["Work", "Tasks · clients · decisions"], people: ["People", "Connection · opinions · boundaries"], travel: ["Travel", "Arrival · movement · problem-solving"], interests: ["Interests", "Music · technology · food · ideas"], culture: ["Culture", "Register · humor · implication"] },
  es: { home: ["Hogar", "Rutinas · espacio · vida compartida"], work: ["Trabajo", "Tareas · clientes · decisiones"], people: ["Personas", "Conexión · opiniones · límites"], travel: ["Viajes", "Llegada · movimiento · resolución de problemas"], interests: ["Intereses", "Música · tecnología · comida · ideas"], culture: ["Cultura", "Registro · humor · implicación"] },
  fr: { home: ["Maison", "Routines · espace · vie partagée"], work: ["Travail", "Tâches · clients · décisions"], people: ["Personnes", "Lien · opinions · limites"], travel: ["Voyage", "Arrivée · déplacements · résolution de problèmes"], interests: ["Centres d’intérêt", "Musique · technologie · cuisine · idées"], culture: ["Culture", "Registre · humour · implicite"] },
};

const heroCopy: WithEnglish<Partial<Record<LanguageKey, HeroCopy>>> = {
  en: { english: { eyebrow: "English · Real communication", title: "Build an English voice that belongs to you.", copy: "Start with who you are, what you need, and the situations where English becomes useful." }, french: { eyebrow: "French · Real communication", title: "French for expressing your own life.", copy: "Build from identity and immediate needs toward conversation, interests, and social confidence." }, spanish: { eyebrow: "Spanish · Real communication", title: "Spanish for participating in real life.", copy: "Connect personal expression with the situations, relationships, and cultural choices that matter to you." } },
  es: { english: { eyebrow: "Inglés · Comunicación real", title: "Inglés para construir una voz propia.", copy: "Empieza por quién eres, lo que necesitas y las situaciones donde el inglés puede ayudarte." }, french: { eyebrow: "Francés · Comunicación real", title: "Francés para hablar desde tu propia vida.", copy: "Construye desde tu identidad y tus necesidades hasta la conversación y la confianza social." }, spanish: { eyebrow: "Español · Comunicación real", title: "Español para participar en situaciones reales.", copy: "Conecta la expresión personal con las relaciones y decisiones culturales que forman tu vida." } },
  fr: { english: { eyebrow: "Anglais · Communication réelle", title: "L’anglais pour construire votre propre voix.", copy: "Commencez par qui vous êtes, ce dont vous avez besoin et les situations où l’anglais devient utile." }, french: { eyebrow: "Français · Communication réelle", title: "Le français pour exprimer votre propre vie.", copy: "Construisez à partir de votre identité et de vos besoins vers la conversation et la confiance sociale." }, spanish: { eyebrow: "Espagnol · Communication réelle", title: "L’espagnol pour participer à la vie réelle.", copy: "Reliez votre expression personnelle aux situations et relations qui comptent pour vous." } },
};

const hubCopy: WithEnglish<Record<string, string>> = {
  en: { baseEye: "Global Speaker · Foundation route", baseTitle: "Lessons that build a usable personal base.", baseIntro: "Move from identity to interaction through the four principles of the method.", connected: "connected lessons", explore: "Explore", movement: "The learning movement", movementTitle: "From experience to interaction.", movementIntro: "Notice what is happening. Build the thought. Connect it to language. Say it. Use it with someone.", method: "See how the method works", curriculum: "Curriculum", lessons: "lessons", path: "Continue beyond the foundation.", pathIntro: "Explore the wider curriculum by CEFR level and real-life environment.", resources: "All free resources", fromPolyglot: "From Polyglot", polyglotIntro: "How this language connects to others you might already speak or want to learn next.", next: "Organize your route", make: "Turn these lessons into your learning path.", cta: "Use your Language Map to prioritize the needs and situations that should come next." },
  es: { baseEye: "Global Speaker · Ruta base", baseTitle: "Lecciones para construir una base personal y utilizable.", baseIntro: "Avanza desde la identidad hasta la interacción mediante los principios del método.", connected: "lecciones conectadas", explore: "Explorar", movement: "El movimiento de aprendizaje", movementTitle: "De la experiencia a la interacción.", movementIntro: "Observa lo que ocurre. Construye la idea. Conéctala con el idioma. Dila. Úsala con alguien.", method: "Ver cómo funciona el método", curriculum: "Currículo", lessons: "lecciones", path: "Continúa después de la ruta base.", pathIntro: "Explora el currículo por nivel MCER y entorno de vida.", resources: "Todos los recursos gratuitos", fromPolyglot: "Desde Polyglot", polyglotIntro: "Cómo se conecta este idioma con otros que ya hablas o quieres aprender.", next: "Organiza tu recorrido", make: "Convierte estas lecciones en tu ruta.", cta: "Usa tu Mapa de Idioma para priorizar las necesidades y situaciones que deben continuar." },
  fr: { baseEye: "Global Speaker · Parcours de base", baseTitle: "Des leçons pour construire une base utilisable.", baseIntro: "Progressez de l’identité vers l’interaction à travers la méthode.", connected: "leçons associées", explore: "Explorer", movement: "Le mouvement d’apprentissage", movementTitle: "De l’expérience à l’interaction.", movementIntro: "Observez. Construisez l’idée. Reliez-la à la langue. Dites-la. Utilisez-la.", method: "Voir comment fonctionne la méthode", curriculum: "Programme", lessons: "leçons", path: "Continuez après le parcours de base.", pathIntro: "Explorez le programme par niveau CECR et contexte de vie.", resources: "Toutes les ressources gratuites", fromPolyglot: "Depuis Polyglot", polyglotIntro: "Comment cette langue se connecte à d’autres que vous parlez ou voulez apprendre.", next: "Organisez votre parcours", make: "Transformez ces leçons en parcours.", cta: "Utilisez votre carte linguistique pour prioriser les besoins et situations à développer." },
};

function areaLabel(locale: InterfaceLocale, environment: string) {
  const copy = pickLocaleCopy(areaCopy, locale);
  return areaSlugs.includes(environment as AreaSlug) ? copy[environment as AreaSlug][0] : environment;
}

export function generateStaticParams() { return activeLanguages.map((language) => ({ language: language.key })); }

export async function generateMetadata({ params }: PageProps<"/learn/[language]">): Promise<Metadata> {
  const { language } = await params;
  const locale = await getInterfaceLocale();
  const profile = languages.find((item) => item.key === language && item.status === "active");
  if (!profile) return {};
  const hero = pickLocaleCopy(heroCopy, locale)[profile.key] ?? heroCopy.en[profile.key];
  return hero ? { title: hero.title, description: hero.copy, alternates: { canonical: `/learn/${profile.key}` } } : {};
}

export default async function LanguageHubPage({ params }: PageProps<"/learn/[language]">) {
  const { language } = await params;
  const locale = await getInterfaceLocale();
  const c = pickLocaleCopy(hubCopy, locale);
  const profile = languages.find((item) => item.key === language && item.status === "active");
  if (!profile) notFound();
  const hero = pickLocaleCopy(heroCopy, locale)[profile.key] ?? heroCopy.en[profile.key];
  if (!hero) notFound();
  const curriculum = getCurriculumLessons(profile.key as CurriculumLanguage, locale);
  const curriculumByLevel = cefrOrder.map((level) => ({ level, lessons: curriculum.filter((lesson) => lesson.level === level) })).filter((group) => group.lessons.length);
  const foundation = getLocalizedFoundationLessonIds(locale, profile.key).flatMap((lessonId) => {
    const lesson = getCurriculumLessonById(lessonId, locale);
    const override = getLocalizedCurriculumOverride(locale, lessonId);
    return lesson && override ? [{ lesson, pillar: override.pillar, sequence: override.sequence }] : [];
  });
  const polyglotArticles = getPolyglotArticlesForLanguage(profile.key);
  const related = resources.filter((resource) => resource.language === profile.key).slice(0, 3);
  const areas = areaSlugs.map((slug) => ({ slug, title: pickLocaleCopy(areaCopy, locale)[slug][0], note: pickLocaleCopy(areaCopy, locale)[slug][1], count: curriculum.filter((lesson) => lesson.primaryEnvironment === slug || lesson.secondaryEnvironments.includes(slug)).length }));

  return <>
    <PageIntro eyebrow={hero.eyebrow} title={hero.title} copy={hero.copy} accent={profile.accent} note={profile.nativeName} />
    {foundation.length ? <section className="section"><div className="container"><SectionHeading eyebrow={c.baseEye} title={c.baseTitle} intro={c.baseIntro} /><div className="resource-grid mt-10">{foundation.map(({ lesson, pillar, sequence }) => <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}><p className="eyebrow">{String(sequence).padStart(2, "0")} · {pillar}</p><h3>{lesson.title}</h3><p>{lesson.learningObjective}</p><span className="resource-card__link">{c.explore} <i aria-hidden="true">→</i></span></Link>)}</div></div></section> : null}
    <section className="section"><div className="container"><SectionHeading eyebrow={c.movement} title={c.movementTitle} intro={c.movementIntro} /><MethodSequence compact /><ButtonLink href="/method" variant="secondary">{c.method}</ButtonLink></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow={`${c.curriculum} · ${curriculum.length} ${c.lessons}`} title={c.path} intro={c.pathIntro} /><div className="mt-12 space-y-4">{curriculumByLevel.map((group, index) => <details key={group.level} open={index === 0} className="border-t border-[var(--line)] py-5"><summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-2"><span className="font-[var(--serif)] text-3xl">{group.level}</span><span className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-soft)]">{group.lessons.length} {c.lessons}</span></summary><div className="resource-grid mt-6">{group.lessons.map((lesson) => <Link className="resource-card" key={lesson.id} href={`/learn/${lesson.language}/${lesson.slug}`}><p className="eyebrow">{lesson.level} · {areaLabel(locale, lesson.primaryEnvironment)}</p><h3>{lesson.title}</h3><p>{lesson.learningObjective}</p></Link>)}</div></details>)}</div></div></section>
    {polyglotArticles.length ? <section className="section"><div className="container"><SectionHeading eyebrow={c.fromPolyglot} title={`${c.fromPolyglot} · ${profile.nativeName}`} intro={c.polyglotIntro} /><div className="resource-grid resource-grid--preview">{polyglotArticles.map((article) => <Link className="resource-card" key={article.slug} href={`/polyglot/${article.slug}`}><p className="eyebrow">{polyglotTopics.find((topic) => topic.key === article.topic)?.label ?? article.topic} · {article.readingMinutes} min</p><h3>{article.title}</h3><p>{article.description}</p></Link>)}</div></div></section> : null}
    <section className="section"><div className="container"><SectionHeading eyebrow={`${c.explore} ${profile.nativeName}`} title={c.resources} /><div className="resource-grid resource-grid--preview">{related.map((resource, index) => <ResourceCard key={resource.slug} resource={resource} index={index} />)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow={`${profile.code} · ${c.next}`} title={c.make} intro={c.cta} /></div></section>
  </>;
}
