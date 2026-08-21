import type { Metadata } from "next";
import { ProfessionalPathCard } from "@/components/professional-learning";
import { PageIntro } from "@/components/ui";
import { professionalPaths } from "@/content/professional";

export const metadata: Metadata = { title: "Professional Learning Paths", description: "Practical language learning paths for hospitality, restaurants, tourism, real estate, sales, and remote work.", alternates: { canonical: "/professional" } };

export default function ProfessionalPage() {
  return <><PageIntro eyebrow="Professional learning · 04" title="Language for the world you work in." copy="Learn the moments that make your work move: the welcome, the question, the explanation, the recovery, the connection." accent="terracotta" note="Public curriculum · English first" /><section className="section professional-index"><div className="container"><div className="professional-index__intro"><p className="eyebrow">Choose a working world</p><p>Each path follows real communication needs rather than abstract textbook units. Start with the situations you meet, then build the language to move through them.</p></div><div className="professional-list professional-list--index">{professionalPaths.map((path, index) => <ProfessionalPathCard key={path.slug} path={path} index={index} />)}</div></div></section></>;
}
