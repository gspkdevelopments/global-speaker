import type { Metadata } from "next";
import { ResourceExplorer } from "@/components/resource-explorer";
import { PageIntro } from "@/components/ui";
import { resources } from "@/content/resources";

export const metadata: Metadata = { title: "Language Resources", description: "Explore practical English, French, Spanish, expression, culture, and grammar-in-context resources.", alternates: { canonical: "/resources" } };

export default function ResourcesPage() {
  return <><PageIntro eyebrow="Resources · Free to explore" title="Explore the language." copy="Follow a word, an expression, or a cultural question. Each resource connects language to something you can notice and use." accent="terracotta" note="Questions welcome" /><section className="section resources-page"><div className="container"><ResourceExplorer resources={resources} /></div></section></>;
}
