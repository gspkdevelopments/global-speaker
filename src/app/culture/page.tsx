import type { Metadata } from "next";
import Link from "next/link";
import { CultureCard } from "@/components/cards";
import { CTASection, PageIntro, SectionHeading } from "@/components/ui";
import { cultureIdeas } from "@/content/resources";

export const metadata: Metadata = { title: "Language & Culture", description: "Explore how culture moves through everyday English, French, Spanish, humor, politeness, music, and social behavior.", alternates: { canonical: "/culture" } };

export default function CulturePage() {
  const topics = ["Mexico", "France", "English-speaking cultures", "Cross-cultural communication", "Humor", "Politeness", "Everyday expressions", "Music", "Film", "Social behavior"];
  return (
    <>
      <PageIntro eyebrow="Culture · Meaning in motion" title="Language is culture in motion." copy="Words carry habits, humor, distance, warmth, history, and ways of seeing. Learn what is happening around the sentence." accent="wine" note="Observe before translating" />
      <section className="section culture-feature"><div className="container culture-feature__grid"><div className="culture-feature__visual" aria-hidden="true"><span>AHORITA</span><i>now / soon / later</i><b>context decides</b></div><div><p className="eyebrow">Field note · Mexico</p><h2>The dictionary gives you a definition. Life gives you the meaning.</h2><p>Why can one word mean now, soon, in a little while, or perhaps not today? Because people communicate with situations as much as vocabulary.</p><Link href="/resources/what-ahorita-means-in-mexico">Read the field note <span aria-hidden="true">→</span></Link></div></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="Culture notes" title="Read between the words." intro="Short editorial explorations of the social worlds inside language." /><div className="culture-list">{cultureIdeas.map((item, index) => <CultureCard key={item.title} item={item} index={index} />)}</div></div></section>
      <section className="section topic-index"><div className="container"><p className="eyebrow">Future shelves</p><h2>A growing index of culture.</h2><div>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div></div></section>
      <CTASection eyebrow="Culture becomes personal" title="What world do you want to enter?" copy="Build a Language Map around the people, places, media, and cultural questions that already pull you in." />
    </>
  );
}
