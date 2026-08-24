import type { Metadata } from "next";
import { LanguageMapForm } from "@/components/language-map-form";
import { LanguageMapPreview } from "@/components/language-map-preview";
import { Localized } from "@/components/localized";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Build Your Language Map", description: "Create a personal language-learning starting point from your goals, environments, interests, challenges, and current level.", alternates: { canonical: "/language-map" } };

function FormShell({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <><section className="map-form-intro"><div className="container map-form-intro__grid"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div><LanguageMapPreview /></div></section><section className="section map-form-section"><div className="container"><LanguageMapForm /></div></section></>;
}

export default function LanguageMapPage() {
  return <Localized
    en={<><PageIntro eyebrow="Personal Language Map · Start here" title="Your curriculum begins with your life." copy="Tell us what language needs to do for you. This first map turns your goals, environments, interests, and challenges into a clearer direction." accent="blue" note="About 4 minutes" /><FormShell eyebrow="A map, not a test" title="There are no wrong answers." copy="You do not need to know your exact level or use educational language. Describe your world in your own words." /></>}
    es={<><PageIntro eyebrow="Mapa de Idioma Personal · Empieza aquí" title="Tu currículo comienza con tu vida." copy="Cuéntanos qué necesitas que el idioma haga por ti. Este primer mapa convierte tus metas, entornos, intereses y retos en una dirección más clara." accent="blue" note="Aproximadamente 4 minutos" /><FormShell eyebrow="Un mapa, no un examen" title="No hay respuestas incorrectas." copy="No necesitas conocer tu nivel exacto ni usar lenguaje educativo. Describe tu mundo con tus propias palabras." /></>}
    fr={<><PageIntro eyebrow="Carte linguistique personnelle · Commencez ici" title="Votre programme commence avec votre vie." copy="Dites-nous ce que la langue doit vous permettre de faire. Cette première carte transforme vos objectifs, contextes, intérêts et défis en direction plus claire." accent="blue" note="Environ 4 minutes" /><FormShell eyebrow="Une carte, pas un test" title="Il n’y a pas de mauvaise réponse." copy="Vous n’avez pas besoin de connaître votre niveau exact ni d’utiliser un vocabulaire pédagogique. Décrivez votre monde avec vos propres mots." /></>}
  />;
}
