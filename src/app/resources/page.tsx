import type { Metadata } from "next";
import { Localized } from "@/components/localized";
import { ResourceExplorer } from "@/components/resource-explorer";
import { PageIntro } from "@/components/ui";
import { resources } from "@/content/resources";

export const metadata: Metadata = { title: "Language Resources", description: "Explore practical English, French, Spanish, expression, culture, and grammar-in-context resources.", alternates: { canonical: "/resources" } };

function Explorer() { return <section className="section resources-page"><div className="container"><ResourceExplorer resources={resources} /></div></section>; }

export default function ResourcesPage() {
  return <Localized
    en={<><PageIntro eyebrow="Resources · Free to explore" title="Explore the language." copy="Follow a word, an expression, or a cultural question. Each resource connects language to something you can notice and use." accent="terracotta" note="Questions welcome" /><Explorer /></>}
    es={<><PageIntro eyebrow="Recursos · Explora gratis" title="Explora el idioma." copy="Sigue una palabra, una expresión o una pregunta cultural. Cada recurso conecta el idioma con algo que puedes observar y usar." accent="terracotta" note="Las preguntas son bienvenidas" /><Explorer /></>}
    fr={<><PageIntro eyebrow="Ressources · À explorer librement" title="Explorez la langue." copy="Suivez un mot, une expression ou une question culturelle. Chaque ressource relie la langue à quelque chose que vous pouvez observer et utiliser." accent="terracotta" note="Les questions sont bienvenues" /><Explorer /></>}
  />;
}
