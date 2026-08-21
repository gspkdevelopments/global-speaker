import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ModuleList, PracticeTeacherCTA } from "@/components/professional-learning";
import { ButtonLink } from "@/components/ui";
import { getProfessionalPath, professionalPaths } from "@/content/professional";

export function generateStaticParams() { return professionalPaths.map((path) => ({ path: path.slug })); }

export async function generateMetadata({ params }: PageProps<"/professional/[path]">): Promise<Metadata> {
  const { path: slug } = await params;
  const path = getProfessionalPath(slug);
  if (!path) return {};
  return { title: path.seoTitle, description: path.seoDescription, alternates: { canonical: `/professional/${path.slug}` } };
}

export default async function ProfessionalPathPage({ params }: PageProps<"/professional/[path]">) {
  const { path: slug } = await params;
  const path = getProfessionalPath(slug);
  if (!path) notFound();
  const lessonCount = path.modules.reduce((count, module) => count + module.lessons.length, 0);
  const lessonLabel = lessonCount === 1 ? "lesson" : "lessons";
  const availability = lessonCount === 0 ? "Path structure" : `${lessonCount} ${lessonLabel}`;
  return <><header className="learning-path-header"><div className="container"><Breadcrumbs items={[{ label: "Professional", href: "/professional" }, { label: path.title }]} /><div className="learning-path-header__grid"><div><p className="eyebrow">{path.shortCode} · Professional path</p><h1>{path.title}</h1><p>{path.description}</p></div><dl><div><dt>Languages</dt><dd>English · Français · Español</dd></div><div><dt>Available now</dt><dd>{availability}</dd></div></dl></div></div></header><main><section className="section learning-path-overview"><div className="container"><div className="learning-path-overview__heading"><div><p className="eyebrow">The curriculum</p><h2>Learn the moments that matter.</h2></div><p>Move through the path as a simple sequence. Available lessons open into practical study; the rest show what is coming next.</p></div><ModuleList path={path} /></div></section><section className="section learning-needs"><div className="container"><p className="eyebrow">Communication needs</p><div>{path.communicationNeeds.map((need) => <span key={need}>{need}</span>)}</div><ButtonLink href="/language-map" variant="secondary">Build my Language Map</ButtonLink></div></section></main><div className="container"><PracticeTeacherCTA /></div></>;
}
