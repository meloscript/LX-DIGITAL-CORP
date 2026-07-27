import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { getAllServiceSlugs } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${siteConfig.url}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
  ];
}
