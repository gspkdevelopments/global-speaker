import type { MetadataRoute } from "next";
import { resources } from "@/content/resources";
import { professionalPaths } from "@/content/professional";
import { siteConfig } from "@/config/site";
import { getCurriculumLessons } from "@/lib/curriculum";
import { activeLanguages } from "@/content/site";
import { polyglotArticles } from "@/content/polyglot";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  // "/learn/english" etc. used to be hardcoded here. Now it's generated from
  // activeLanguages, so a "planned" language never gets a sitemap entry, and
  // flipping one to "active" doesn't require remembering to edit this file.
  const staticRoutes = [
    "",
    "/learn",
    ...activeLanguages.map((language) => `/learn/${language.key}`),
    "/polyglot",
    "/method",
    "/resources",
    "/culture",
    "/locations",
    "/locations/tulum",
    "/about",
    "/language-map",
    "/professional",
  ];
  const professionalRoutes = professionalPaths.flatMap((path) => [{ url: `${baseUrl}/professional/${path.slug}`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly" as const, priority: 0.8 }, ...path.modules.flatMap((module) => module.lessons.map((lesson) => ({ url: `${baseUrl}/professional/${path.slug}/${lesson.slug}`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly" as const, priority: 0.7 })))]);
  const curriculumRoutes = getCurriculumLessons().map((lesson) => ({
    url: `${baseUrl}${lesson.seo.canonicalPath}`,
    lastModified: new Date("2026-08-22"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const polyglotRoutes = polyglotArticles.map((article) => ({
    url: `${baseUrl}/polyglot/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-08-20"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...professionalRoutes,
    ...curriculumRoutes,
    ...resources.map((resource) => ({ url: `${baseUrl}/resources/${resource.slug}`, lastModified: new Date(resource.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...polyglotRoutes,
  ];
}