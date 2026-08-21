import type { Metadata } from "next";
import { ButtonLink, CTASection, PageIntro, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Language Learning in Tulum", description: "English, French, and Spanish learning in Tulum and the Riviera Maya for work, hospitality, daily life, and connection.", alternates: { canonical: "/locations/tulum" } };

export default function TulumPage() {
  const audiences = [["Hospitality", "Welcome guests, solve problems, explain places, and create trust."], ["Tourism", "Guide, recommend, tell stories, and respond clearly."], ["Living in Mexico", "Participate in daily life, relationships, services, and community."], ["Professionals", "Meet, present, negotiate, collaborate, and follow up."], ["Long-stay travelers", "Move beyond transactions into genuine interaction."], ["Personal learning", "Learn through culture, music, food, people, and place."]];
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "Global Speaker language learning in Tulum", serviceType: "English, French, and Spanish language learning", areaServed: ["Tulum", "Riviera Maya"], provider: { "@type": "Organization", name: "Global Speaker" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PageIntro eyebrow="Tulum · Riviera Maya" title="Speak the language of where you live." copy="English, French, and Spanish learning shaped by the real conversations of work, community, travel, and daily life in the Riviera Maya." accent="terracotta" note="Local roots · International outlook" />
      <section className="section location-story"><div className="container location-story__grid"><div className="location-story__visual" aria-label="A conversation atlas for daily life in Tulum"><span className="location-story__coordinates">20.2114° N<br />87.4654° W</span><div className="location-story__atlas"><span><i>01</i>Welcome</span><span><i>02</i>Explain</span><span><i>03</i>Belong</span></div><b>Conversation<br />atlas</b><strong>Tulum · Riviera Maya</strong></div><div><SectionHeading eyebrow="A place of crossings" title="Many worlds meet here." intro="Tulum is local and international at once. Hospitality teams welcome visitors from everywhere. People arrive to travel, work, build businesses, or create a new life. Language is not an abstract subject here — it is part of the day." /><p>Global Speaker uses that reality without turning the entire brand into a destination cliché. The local environment is rich source material; the method travels anywhere.</p></div></div></section>
      <section className="section local-audiences"><div className="container"><SectionHeading eyebrow="Made relevant" title="Language for the moments around you." /><div className="audience-grid">{audiences.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="local-actions"><ButtonLink href="/learn/english">Explore English</ButtonLink><ButtonLink href="/learn/spanish" variant="secondary">Explorar español</ButtonLink></div></div></section>
      <CTASection eyebrow="Start locally" title="Map the language your life in Tulum needs." copy="Tell us about your role, routines, relationships, and the conversations you want to join." />
    </>
  );
}
