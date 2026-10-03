import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config/site";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dog-translator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dog-bark-analyzer`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dog-sounds`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const soundRoutes: MetadataRoute.Sitemap = Object.keys(DOG_SOUNDS_DATA).map(
    (slug) => ({
      url: `${baseUrl}/dog-sounds/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const behaviorSlugs = [
    "barking-at-night",
    "play-growling-vs-warning",
    "whining-at-night",
    "howling-at-sirens",
    "whimpering-in-sleep",
  ];

  const behaviorRoutes: MetadataRoute.Sitemap = behaviorSlugs.map((slug) => ({
    url: `${baseUrl}/dog-behavior/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...soundRoutes, ...behaviorRoutes];
}
