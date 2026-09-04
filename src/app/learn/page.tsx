import type { Metadata } from "next";
import { LanguageCard } from "@/components/cards";
import { CTASection, PageIntro } from "@/components/ui";
import { activeLanguages } from "@/content/site";

// Names/codes generated from activeLanguages instead of hardcoded, so this
// page's copy stays correct the moment a language's status flips — no
// separate edit to remember here.
const activeNames = activeLanguages.map((l) => l.name);
const activeCodesLabel = activeLanguages.map((l) => l.code).join(" · ");
const titleList =
  activeNames.length > 1
    ? `${activeNames.slice(0, -1).join(", ")} & ${activeNames[activeNames.length - 1]}`
    : activeNames[0];

export const metadata: Metadata = {
  title: `Learn ${titleList}`,
  description: `Choose ${titleList} and build language around your conversations, work, interests, and culture.`,
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="Learn · Your way in"
        title={`${activeLanguages.length === 3 ? "Three" : activeLanguages.length} languages. One life-led method.`}
        copy="Choose the language you want to bring into your work, travel, relationships, and interests. Each path begins with what is already meaningful to you."
        note={activeCodesLabel}
      />
      <section className="section">
        <div className="container">
          <div className="language-card-grid">
            {activeLanguages.map((language) => (
              <LanguageCard key={language.key} language={language} />
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Not sure where to begin?"
        copy="A Language Map turns a broad goal into a practical, personal starting point."
      />
    </>
  );
}