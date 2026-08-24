import type { Metadata } from "next";
import { LanguageCard } from "@/components/cards";
import { Localized } from "@/components/localized";
import { CTASection, PageIntro } from "@/components/ui";
import { languages } from "@/content/site";

export const metadata: Metadata = { title: "Learn English, French & Spanish", description: "Choose English, French, or Spanish and build language around your conversations, work, interests, and culture.", alternates: { canonical: "/learn" } };

function LanguageGrid() {
  return <section className="section"><div className="container"><div className="language-card-grid">{languages.map((language) => <LanguageCard language={language} key={language.key} />)}</div></div></section>;
}

export default function LearnPage() {
  return <Localized
    en={<><PageIntro eyebrow="Learn · Your way in" title="Three languages. One life-led method." copy="Choose the language you want to bring into your work, travel, relationships, and interests. Each path begins with what is already meaningful to you." note="EN · FR · ES" /><LanguageGrid /><CTASection title="Not sure where to begin?" copy="A Language Map turns a broad goal into a practical, personal starting point." /></>}
    es={<><PageIntro eyebrow="Aprender · Tu puerta de entrada" title="Tres idiomas. Un método guiado por tu vida." copy="Elige el idioma que quieres llevar a tu trabajo, viajes, relaciones e intereses. Cada ruta empieza con lo que ya tiene significado para ti." note="EN · FR · ES" /><LanguageGrid /><CTASection title="¿No sabes por dónde empezar?" copy="Un Mapa de Idioma convierte una meta amplia en un punto de partida práctico y personal." /></>}
    fr={<><PageIntro eyebrow="Apprendre · Votre porte d’entrée" title="Trois langues. Une méthode guidée par votre vie." copy="Choisissez la langue que vous voulez intégrer à votre travail, vos voyages, vos relations et vos centres d’intérêt. Chaque parcours commence par ce qui compte déjà pour vous." note="EN · FR · ES" /><LanguageGrid /><CTASection title="Vous ne savez pas par où commencer ?" copy="Un Language Map transforme un objectif général en point de départ pratique et personnel." /></>}
  />;
}
