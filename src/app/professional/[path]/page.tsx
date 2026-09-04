import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  ModuleList,
  PracticeTeacherCTA,
} from "@/components/professional-learning";
import { ButtonLink } from "@/components/ui";
import { getProfessionalPath, professionalPaths } from "@/content/professional";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy } from "@/lib/locale-copy";

const copy = {
  en: {
    professional: "Professional",
    path: "Professional path",
    languages: "Languages",
    available: "Available now",
    structure: "Path structure",
    lesson: "lesson",
    lessons: "lessons",
    curriculum: "The curriculum",
    title: "Learn the moments that matter.",
    intro:
      "Move through the path as a simple sequence. Available lessons open into practical study; the rest show what is coming next.",
    needs: "Communication needs",
    map: "Build my Language Map",
  },
  es: {
    professional: "Profesional",
    path: "Ruta profesional",
    languages: "Idiomas",
    available: "Disponible ahora",
    structure: "Estructura de la ruta",
    lesson: "lección",
    lessons: "lecciones",
    curriculum: "El currículo",
    title: "Aprende los momentos que importan.",
    intro:
      "Avanza por la ruta como una secuencia simple. Las lecciones disponibles se abren al estudio práctico; el resto muestra lo que viene después.",
    needs: "Necesidades de comunicación",
    map: "Crear mi Mapa de Idioma",
  },
  fr: {
    professional: "Professionnel",
    path: "Parcours professionnel",
    languages: "Langues",
    available: "Disponible maintenant",
    structure: "Structure du parcours",
    lesson: "leçon",
    lessons: "leçons",
    curriculum: "Le programme",
    title: "Apprenez les moments qui comptent.",
    intro:
      "Progressez dans le parcours comme dans une séquence simple. Les leçons disponibles s’ouvrent sur une étude pratique ; le reste montre ce qui arrive ensuite.",
    needs: "Besoins de communication",
    map: "Créer ma carte linguistique",
  },
} as const;

export function generateStaticParams() {
  return professionalPaths.map((path) => ({ path: path.slug }));
}
export async function generateMetadata({
  params,
}: PageProps<"/professional/[path]">): Promise<Metadata> {
  const { path: slug } = await params;
  const path = getProfessionalPath(slug);
  if (!path) return {};
  return {
    title: path.seoTitle,
    description: path.seoDescription,
    alternates: { canonical: `/professional/${path.slug}` },
  };
}
export default async function ProfessionalPathPage({
  params,
}: PageProps<"/professional/[path]">) {
  const { path: slug } = await params;
  const locale = await getInterfaceLocale();
  const c = pickLocaleCopy(copy, locale);
  const path = getProfessionalPath(slug);
  if (!path) notFound();
  const lessonCount = path.modules.reduce(
    (count, module) => count + module.lessons.length,
    0,
  );
  const availability =
    lessonCount === 0
      ? c.structure
      : `${lessonCount} ${lessonCount === 1 ? c.lesson : c.lessons}`;
  return (
    <>
      <header className="learning-path-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: c.professional, href: "/professional" },
              { label: path.title },
            ]}
          />
          <div className="learning-path-header__grid">
            <div>
              <p className="eyebrow">
                {path.shortCode} · {c.path}
              </p>
              <h1>{path.title}</h1>
              <p>{path.description}</p>
            </div>
            <dl>
              <div>
                <dt>{c.languages}</dt>
                <dd>English · Français · Español</dd>
              </div>
              <div>
                <dt>{c.available}</dt>
                <dd>{availability}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>
      <main>
        <section className="section learning-path-overview">
          <div className="container">
            <div className="learning-path-overview__heading">
              <div>
                <p className="eyebrow">{c.curriculum}</p>
                <h2>{c.title}</h2>
              </div>
              <p>{c.intro}</p>
            </div>
            <ModuleList path={path} />
          </div>
        </section>
        <section className="section learning-needs">
          <div className="container">
            <p className="eyebrow">{c.needs}</p>
            <div>
              {path.communicationNeeds.map((need) => (
                <span key={need}>{need}</span>
              ))}
            </div>
            <ButtonLink href="/language-map" variant="secondary">
              {c.map}
            </ButtonLink>
          </div>
        </section>
      </main>
      <div className="container">
        <PracticeTeacherCTA />
      </div>
    </>
  );
}
