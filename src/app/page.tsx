"use client";

import Link from "next/link";
import { LanguageCard, ResourceCard } from "@/components/cards";
import { useInterfaceLocale } from "@/components/interface-locale";
import { LanguageSelector } from "@/components/language-selector";
import { LifeEnvironmentGrid } from "@/components/life-environment-grid";
import { LanguageMapPreview } from "@/components/language-map-preview";
import { MethodExample, MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, SectionHeading } from "@/components/ui";
import { languages, professionalPaths } from "@/content/site";
import { resources } from "@/content/resources";
import { pickLocaleCopy } from "@/lib/locale-copy";

const copy = {
  en: {
    heroTitle: <>Speak more<br />of the <em>world.</em></>, heroLede: "Learn the language through the life you already live.", curriculum: "Explore the full curriculum", map: "Build your Language Map",
    reasons: "What brings you here?", goals: ["Work", "Travel", "Life", "Culture"], note: "Field note · 001", noteBody: "Language appears before the lesson does.", observed: "Observed in life", observedBody: "The world is already giving you something to say.",
    methodEyebrow: "The method · 01", methodTitle: "You already know what you want to say.", methodIntro: "We help you build the language to say it.", methodLink: "Explore the full method",
    lifeEyebrow: "Your life · 02", lifeTitle: "Your life is already full of lessons.", lifeIntro: "Choose a world, then open its connected curriculum in English, French, or Spanish.", lifeNote: "Tap a world, then choose a language.",
    gatewayEyebrow: "Language gateway · 03", gatewayTitle: "Choose your language.", gatewayIntro: "One method. Three ways into a wider world.",
    workEyebrow: "Professional paths · 04", workTitle: "Language for the world you work in.", workIntro: "Learn the moments that make your work move: the welcome, the question, the explanation, the recovery, the connection.", workButton: "Map my work language",
    mapEyebrow: "Personal learning · 05", mapTitle: "Build your Language Map.", mapIntro: "Generic lessons begin with a textbook. Your map begins with your goals, environments, communication needs, interests, and current ability.", mapItems: ["What you want to do", "Where language appears", "What keeps you curious", "What would unlock confidence"], mapButton: "Create my Language Map",
    resourceEyebrow: "Articles & language guides · 06", resourceTitle: "Follow a question.", resourceIntro: "Short editorial resources are separate from the structured 175-lesson curriculum.", resourceButton: "Explore articles & guides",
    ctaTitle: "Your curriculum begins with your life.", ctaCopy: "Bring your world — your work, your people, your interests, your questions. We’ll build from there.",
  },
  es: {
    heroTitle: <>Habla más<br />del <em>mundo.</em></>, heroLede: "Aprende el idioma a través de la vida que ya vives.", curriculum: "Explorar el currículo completo", map: "Crear mi Mapa de Idioma",
    reasons: "¿Qué te trae por aquí?", goals: ["Trabajo", "Viajes", "Vida", "Cultura"], note: "Nota de campo · 001", noteBody: "El idioma aparece antes que la lección.", observed: "Observado en la vida", observedBody: "El mundo ya te está dando algo que decir.",
    methodEyebrow: "El método · 01", methodTitle: "Ya sabes lo que quieres decir.", methodIntro: "Te ayudamos a construir el idioma para decirlo.", methodLink: "Explorar el método completo",
    lifeEyebrow: "Tu vida · 02", lifeTitle: "Tu vida ya está llena de lecciones.", lifeIntro: "Elige un entorno y abre el currículo conectado en inglés, francés o español.", lifeNote: "Toca un entorno y después elige un idioma.",
    gatewayEyebrow: "Puerta de idiomas · 03", gatewayTitle: "Elige tu idioma.", gatewayIntro: "Un método. Tres maneras de entrar a un mundo más amplio.",
    workEyebrow: "Rutas profesionales · 04", workTitle: "Idioma para el mundo en el que trabajas.", workIntro: "Aprende los momentos que hacen avanzar tu trabajo: recibir, preguntar, explicar, resolver y conectar.", workButton: "Mapear mi idioma de trabajo",
    mapEyebrow: "Aprendizaje personal · 05", mapTitle: "Crea tu Mapa de Idioma.", mapIntro: "Las lecciones genéricas comienzan con un libro. Tu mapa comienza con tus metas, entornos, necesidades de comunicación, intereses y nivel actual.", mapItems: ["Lo que quieres hacer", "Dónde aparece el idioma", "Lo que mantiene tu curiosidad", "Lo que desbloquearía tu confianza"], mapButton: "Crear mi Mapa de Idioma",
    resourceEyebrow: "Artículos y guías de idioma · 06", resourceTitle: "Sigue una pregunta.", resourceIntro: "Los recursos editoriales cortos son distintos del currículo estructurado de 175 lecciones.", resourceButton: "Explorar artículos y guías",
    ctaTitle: "Tu currículo comienza con tu vida.", ctaCopy: "Trae tu mundo — tu trabajo, tu gente, tus intereses, tus preguntas. Construimos desde ahí.",
  },
  fr: {
    heroTitle: <>Parlez davantage<br />du <em>monde.</em></>, heroLede: "Apprenez la langue à travers la vie que vous vivez déjà.", curriculum: "Explorer le programme complet", map: "Créer ma Carte Linguistique",
    reasons: "Qu'est-ce qui vous amène ici ?", goals: ["Travail", "Voyage", "Vie", "Culture"], note: "Note de terrain · 001", noteBody: "La langue apparaît avant la leçon.", observed: "Observé dans la vie", observedBody: "Le monde vous donne déjà quelque chose à dire.",
    methodEyebrow: "La méthode · 01", methodTitle: "Vous savez déjà ce que vous voulez dire.", methodIntro: "Nous vous aidons à construire la langue pour le dire.", methodLink: "Explorer la méthode complète",
    lifeEyebrow: "Votre vie · 02", lifeTitle: "Votre vie est déjà pleine de leçons.", lifeIntro: "Choisissez un univers puis ouvrez le programme relié en anglais, français ou espagnol.", lifeNote: "Touchez un univers, puis choisissez une langue.",
    gatewayEyebrow: "Passerelle linguistique · 03", gatewayTitle: "Choisissez votre langue.", gatewayIntro: "Une méthode. Trois chemins vers un monde plus vaste.",
    workEyebrow: "Parcours professionnels · 04", workTitle: "La langue du monde dans lequel vous travaillez.", workIntro: "Apprenez les moments qui font avancer votre travail : accueillir, questionner, expliquer, réparer et créer du lien.", workButton: "Cartographier ma langue de travail",
    mapEyebrow: "Apprentissage personnel · 05", mapTitle: "Créez votre Carte Linguistique.", mapIntro: "Les cours génériques commencent par un manuel. Votre carte commence par vos objectifs, environnements, besoins de communication, intérêts et niveau actuel.", mapItems: ["Ce que vous voulez faire", "Où la langue apparaît", "Ce qui nourrit votre curiosité", "Ce qui renforcerait votre confiance"], mapButton: "Créer ma Carte Linguistique",
    resourceEyebrow: "Articles et guides linguistiques · 06", resourceTitle: "Suivez une question.", resourceIntro: "Les ressources éditoriales courtes sont distinctes du programme structuré de 175 leçons.", resourceButton: "Explorer les articles et guides",
    ctaTitle: "Votre programme commence avec votre vie.", ctaCopy: "Apportez votre monde — votre travail, vos proches, vos intérêts, vos questions. Nous construisons à partir de là.",
  },
} as const;

const goalReasons = ["work", "travel", "life", "culture"] as const;

export default function HomePage() {
  const { locale } = useInterfaceLocale();
  const t = pickLocaleCopy(copy, locale);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">English · Français · Español</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero__lede">{t.heroLede}</p>
            <div className="hero__actions"><ButtonLink href="/learn">{t.curriculum}</ButtonLink><ButtonLink href="/language-map" variant="text">{t.map}</ButtonLink></div>
            <div className="goal-links" aria-label={t.reasons}><span>{t.reasons}</span>{t.goals.map((goal, index) => <Link key={goal} href={`/language-map?reason=${goalReasons[index]}`}>{goal}</Link>)}</div>
          </div>
          <div className="hero__visual" aria-label={t.heroLede}>
            <div className="hero-collage">
              <aside className="hero-collage__note"><span>{t.note}</span><b>{t.noteBody}</b></aside>
              <div className="hero-collage__sun" />
              <div className="hero-collage__window"><span>A CAFÉ · A QUESTION<br />A MOMENT TO ANSWER</span></div>
              <div className="hero-collage__figure"><i /><b /></div>
              <p><span>01</span> Notice<br /><span>02</span> Connect<br /><span>03</span> Express</p>
              <strong>experience → language</strong>
            </div>
            <p className="hero__visual-caption"><span>{t.observed}</span> {t.observedBody}</p>
          </div>
        </div>
        <div className="container"><LanguageSelector /></div>
      </section>

      <section className="section method-intro"><div className="container"><SectionHeading eyebrow={t.methodEyebrow} title={t.methodTitle} intro={t.methodIntro} /><MethodSequence /><MethodExample /><div className="section-link"><Link href="/method">{t.methodLink} <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="section life-section"><div className="container life-section__heading"><SectionHeading eyebrow={t.lifeEyebrow} title={t.lifeTitle} intro={t.lifeIntro} /><p className="margin-note">{t.lifeNote}</p></div><div className="container"><LifeEnvironmentGrid /></div></section>

      <section className="section language-gateway"><div className="container"><SectionHeading eyebrow={t.gatewayEyebrow} title={t.gatewayTitle} intro={t.gatewayIntro} /><div className="language-card-grid">{languages.map((language) => <LanguageCard language={language} key={language.key} />)}</div></div></section>

      <section className="section work-section" id="professional"><div className="container work-section__layout"><div className="work-section__intro"><SectionHeading eyebrow={t.workEyebrow} title={t.workTitle} intro={t.workIntro} /><ButtonLink href="/language-map?reason=work" variant="secondary">{t.workButton}</ButtonLink></div><div className="professional-list">{professionalPaths.map((path, index) => <Link className="professional-card" href={`/professional/${path.slug}`} key={path.title}><div><span>{String(index + 1).padStart(2, "0")}</span><i>{path.shortCode}</i></div><h3>{path.title}</h3><p>{path.communicationNeeds.join(" · ")}</p><b aria-hidden="true">↗</b></Link>)}</div></div></section>

      <section className="section map-section"><div className="container map-section__grid"><div className="map-section__copy"><SectionHeading eyebrow={t.mapEyebrow} title={t.mapTitle} intro={t.mapIntro} /><ul>{t.mapItems.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href="/language-map">{t.mapButton}</ButtonLink></div><LanguageMapPreview /></div></section>

      <section className="section resources-preview"><div className="container"><div className="resources-preview__heading"><SectionHeading eyebrow={t.resourceEyebrow} title={t.resourceTitle} intro={t.resourceIntro} /><ButtonLink href="/resources" variant="text">{t.resourceButton}</ButtonLink></div><div className="resource-grid resource-grid--preview">{[resources[0], resources[4], resources[7]].map((resource, index) => <ResourceCard resource={resource} index={index} key={resource.slug} />)}</div></div></section>

      <CTASection title={t.ctaTitle} copy={t.ctaCopy} />
    </>
  );
}
