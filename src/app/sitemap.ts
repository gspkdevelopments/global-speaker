import type { MetadataRoute } from "next";
import { resources } from "@/content/resources";
import { professionalPaths } from "@/content/professional";
import { siteConfig } from "@/config/site";
import { getCurriculumLessons } from "@/lib/curriculum";

export const dynamic = "force-static";

const curriculumLanguages = ["english", "french", "spanish"] as const;
const lifeAreas = ["home", "work", "people", "travel", "interests", "culture"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const staticRoutes = ["", "/learn", "/learn/english", "/learn/french", "/learn/spanish", "/method", "/resources", "/culture", "/locations", "/locations/tulum", "/about", "/language-map", "/professional"];
  const professionalRoutes = professionalPaths.flatMap((path) => [{ url: `${baseUrl}/professional/${path.slug}`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly" as const, priority: 0.8 }, ...path.modules.flatMap((module) => module.lessons.map((lesson) => ({ url: `${baseUrl}/professional/${path.slug}/${lesson.slug}`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly" as const, priority: 0.7 })))]);
  const curriculumRoutes = getCurriculumLessons().map((lesson) => ({
    url: `${baseUrl}${lesson.seo.canonicalPath}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const semanticRoutes = curriculumLanguages.flatMap((language) => lifeAreas.map((area) => ({
    url: `${baseUrl}/learn/${language}/life/${area}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })));
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-08-24"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...professionalRoutes,
    ...semanticRoutes,
    ...curriculumRoutes,
    ...resources.map((resource) => ({ url: `${baseUrl}/resources/${resource.slug}`, lastModified: new Date(resource.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
