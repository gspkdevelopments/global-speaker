import type { Metadata } from "next";
import { ProfessionalPathCard } from "@/components/professional-learning";
import { Localized } from "@/components/localized";
import { PageIntro } from "@/components/ui";
import { professionalPaths } from "@/content/professional";

export const metadata: Metadata = { title: "Professional Learning Paths", description: "Practical language learning paths for hospitality, restaurants, tourism, real estate, sales, and remote work.", alternates: { canonical: "/professional" } };

function PathList() {
  return <div className="professional-list professional-list--index">{professionalPaths.map((path, index) => <ProfessionalPathCard key={path.slug} path={path} index={index} />)}</div>;
}

export default function ProfessionalPage() {
  return <Localized
    en={<><PageIntro eyebrow="Professional learning · 04" title="Language for the world you work in." copy="Learn the moments that make your work move: the welcome, the question, the explanation, the recovery, the connection." accent="terracotta" note="Public curriculum · English first" /><section className="section professional-index"><div className="container"><div className="professional-index__intro"><p className="eyebrow">Choose a working world</p><p>Each path follows real communication needs rather than abstract textbook units. Start with the situations you meet, then build the language to move through them.</p></div><PathList /></div></section></>}
    es={<><PageIntro eyebrow="Aprendizaje profesional · 04" title="Idioma para el mundo en el que trabajas." copy="Aprende los momentos que hacen avanzar tu trabajo: la bienvenida, la pregunta, la explicación, la recuperación del servicio y la conexión." accent="terracotta" note="Currículo público · inglés primero" /><section className="section professional-index"><div className="container"><div className="professional-index__intro"><p className="eyebrow">Elige tu mundo de trabajo</p><p>Cada ruta parte de necesidades reales de comunicación, no de unidades abstractas de libro de texto. Empieza por las situaciones que realmente encuentras y construye el idioma para desenvolverte en ellas.</p></div><PathList /></div></section></>}
    fr={<><PageIntro eyebrow="Apprentissage professionnel · 04" title="La langue du monde dans lequel vous travaillez." copy="Apprenez les moments qui font avancer votre travail : l'accueil, la question, l'explication, la récupération du service et la connexion." accent="terracotta" note="Programme public · anglais d'abord" /><section className="section professional-index"><div className="container"><div className="professional-index__intro"><p className="eyebrow">Choisissez votre univers professionnel</p><p>Chaque parcours suit de vrais besoins de communication plutôt que des unités abstraites de manuel. Commencez par les situations que vous rencontrez, puis construisez la langue nécessaire pour les traverser.</p></div><PathList /></div></section></>}
  />;
}
