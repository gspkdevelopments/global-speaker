import type { Metadata } from "next";
import { Localized } from "@/components/localized";
import { ButtonLink, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Locations", description: "Explore place-specific Global Speaker language learning, beginning in Tulum and the Riviera Maya.", alternates: { canonical: "/locations" } };

function LocationCard({ body, action }: { body: string; action: string }) {
  return <section className="section"><div className="container location-index-card"><span>MX · 20.2114° N</span><h2>Tulum & the Riviera Maya</h2><p>{body}</p><ButtonLink href="/locations/tulum">{action}</ButtonLink></div></section>;
}

export default function LocationsPage() {
  return <Localized
    en={<><PageIntro eyebrow="Locations · Local context" title="Learn where language becomes daily life." copy="Place changes the conversations that matter. Our first local learning context begins in Tulum and the Riviera Maya, with a wider world always in view." accent="terracotta" /><LocationCard body="English, French, and Spanish for hospitality, work, travel, community, and living in Mexico." action="Explore Tulum" /></>}
    es={<><PageIntro eyebrow="Lugares · Contexto local" title="Aprende donde el idioma se vuelve vida cotidiana." copy="El lugar cambia las conversaciones que importan. Nuestro primer contexto local de aprendizaje comienza en Tulum y la Riviera Maya, siempre con una mirada hacia el mundo." accent="terracotta" /><LocationCard body="Inglés, francés y español para hospitalidad, trabajo, viajes, comunidad y vida en México." action="Explorar Tulum" /></>}
    fr={<><PageIntro eyebrow="Lieux · Contexte local" title="Apprenez là où la langue devient vie quotidienne." copy="Le lieu change les conversations qui comptent. Notre premier contexte local d’apprentissage commence à Tulum et dans la Riviera Maya, tout en gardant le monde en perspective." accent="terracotta" /><LocationCard body="Anglais, français et espagnol pour l’hôtellerie, le travail, les voyages, la communauté et la vie au Mexique." action="Explorer Tulum" /></>}
  />;
}
