import type { Metadata } from "next";
import { CTASection, PageIntro, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "About", description: "Global Speaker grew from self-directed language learning and the idea that language sticks when it connects to real life.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About · The human starting point" title="Built by a language learner." copy="Global Speaker began with a simple observation: language becomes easier to remember when it belongs to a place, a feeling, an interest, or something you genuinely want to say." accent="ink" note="Not a corporate origin story" />
      <section className="section founder-story"><div className="container founder-story__grid"><div className="founder-image-slot" role="img" aria-label="Reserved portrait space for the Global Speaker founder"><span>Founder portrait</span><i>coming into view</i></div><div className="founder-story__copy"><SectionHeading eyebrow="The origin" title="Learning changed when the world became the textbook." /><p>Years of self-directed language learning revealed a pattern. Vocabulary attached to a real street, a song, a conversation, or an emotional moment stayed alive. Vocabulary isolated on a page often disappeared.</p><p>That insight became a method: begin with the learner’s environments, attention, identity, and communication needs. Then build the language that lets them participate more fully.</p><blockquote>“The goal is not to sound like a textbook. It is to become more yourself in another language.”</blockquote></div></div></section>
      <section className="section values-section"><div className="container"><SectionHeading eyebrow="What stays central" title="Meaning before machinery." /><div className="values-grid">{[["Real environments", "Language should return to the places where it will be used."], ["Meaningful situations", "A sentence is easier to keep when there is a reason to say it."], ["Interests", "Curiosity creates attention, repetition, and a personal point of view."], ["Emotion", "Feeling gives language weight and makes memory less mechanical."], ["Identity", "Learning another language should expand who you can be, not erase who you are."], ["Communication", "The point is connection: understanding, responding, and being understood."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <CTASection eyebrow="Your story is source material" title="What do you want to be able to say?" />
    </>
  );
}
