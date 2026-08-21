import type { MetadataRoute } from "next";
import { resources } from "@/content/resources";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const staticRoutes = ["", "/learn", "/learn/english", "/learn/french", "/learn/spanish", "/method", "/resources", "/culture", "/locations", "/locations/tulum", "/about", "/language-map"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-08-20"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...resources.map((resource) => ({ url: `${baseUrl}/resources/${resource.slug}`, lastModified: new Date(resource.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
