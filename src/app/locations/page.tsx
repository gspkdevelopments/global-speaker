import type { Metadata } from "next";
import { ButtonLink, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Locations", description: "Explore place-specific Global Speaker language learning, beginning in Tulum and the Riviera Maya.", alternates: { canonical: "/locations" } };

export default function LocationsPage() { return <><PageIntro eyebrow="Locations · Local context" title="Learn where language becomes daily life." copy="Place changes the conversations that matter. Our first local learning context begins in Tulum and the Riviera Maya, with a wider world always in view." accent="terracotta" /><section className="section"><div className="container location-index-card"><span>MX · 20.2114° N</span><h2>Tulum & the Riviera Maya</h2><p>English, French, and Spanish for hospitality, work, travel, community, and living in Mexico.</p><ButtonLink href="/locations/tulum">Explore Tulum</ButtonLink></div></section></>; }
