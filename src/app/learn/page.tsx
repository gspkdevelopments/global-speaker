import type { Metadata } from "next";
import { LanguageCard } from "@/components/cards";
import { CTASection, PageIntro } from "@/components/ui";
import { languages } from "@/content/site";

export const metadata: Metadata = { title: "Learn English, French & Spanish", description: "Choose English, French, or Spanish and build language around your conversations, work, interests, and culture.", alternates: { canonical: "/learn" } };

export default function LearnPage() {
  return (
    <>
      <PageIntro eyebrow="Learn · Your way in" title="Three languages. One life-led method." copy="Choose the language you want to bring into your work, travel, relationships, and interests. Each path begins with what is already meaningful to you." note="EN · FR · ES" />
      <section className="section"><div className="container"><div className="language-card-grid">{languages.map((language) => <LanguageCard language={language} key={language.key} />)}</div></div></section>
      <CTASection title="Not sure where to begin?" copy="A Language Map turns a broad goal into a practical, personal starting point." />
    </>
  );
}
