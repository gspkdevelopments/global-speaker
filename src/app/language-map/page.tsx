import type { Metadata } from "next";
import { LanguageMapForm } from "@/components/language-map-form";
import { LanguageMapPreview } from "@/components/language-map-preview";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Build Your Language Map", description: "Create a personal language-learning starting point from your goals, environments, interests, challenges, and current level.", alternates: { canonical: "/language-map" } };

export default function LanguageMapPage() {
  return (
    <>
      <PageIntro eyebrow="Personal Language Map · Start here" title="Your curriculum begins with your life." copy="Tell us what language needs to do for you. This first map turns your goals, environments, interests, and challenges into a clearer direction." accent="blue" note="About 4 minutes" />
      <section className="map-form-intro"><div className="container map-form-intro__grid"><div><p className="eyebrow">A map, not a test</p><h2>There are no wrong answers.</h2><p>You do not need to know your exact level or use educational language. Describe your world in your own words.</p></div><LanguageMapPreview /></div></section>
      <section className="section map-form-section"><div className="container"><LanguageMapForm /></div></section>
    </>
  );
}
