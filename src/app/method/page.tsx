import type { Metadata } from "next";
import { LifeEnvironmentGrid } from "@/components/life-environment-grid";
import { MethodExample, MethodSequence } from "@/components/method-sequence";
import { CTASection, PageIntro, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "The Global Speaker Method", description: "See how Global Speaker turns perception, thought, environment, and interests into language you can use.", alternates: { canonical: "/method" } };

export default function MethodPage() {
  return (
    <>
      <PageIntro eyebrow="Method · Language follows experience" title="You do not begin with a list of words." copy="You begin with a world you already perceive, think about, care about, and want to share. Language becomes the bridge." accent="ink" note="Self → world → voice" />
      <section className="section"><div className="container"><SectionHeading eyebrow="The sequence" title="From noticing to belonging." intro="Each stage gives the next one a reason to exist." /><MethodSequence /><div className="method-principles">{[
        ["Perceive", "Start with what your senses and attention already notice."], ["Think", "Shape observations into opinions, questions, memories, and plans."], ["Connect", "Attach new language to an environment, relationship, or interest."], ["Express", "Build a sentence that sounds like something you would actually say."], ["Interact", "Use it with another person and let the exchange change what comes next."],
      ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="section method-live"><div className="container"><SectionHeading eyebrow="A live example" title="One view. A chain of language." intro="The sentence at the end matters because every step before it is human." /><MethodExample /></div></section>
      <section className="section life-section"><div className="container"><SectionHeading eyebrow="Your source material" title="The curriculum is already around you." intro="Open an environment and notice how much language it contains." /><LifeEnvironmentGrid /></div></section>
      <CTASection title="Turn your world into a learning path." />
    </>
  );
}
