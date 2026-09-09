import type { MetadataRoute } from "next";
import { STORIES, CATEGORIES } from "@/data/stories";
import { canonicalUrl } from "@/services/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Root and primary pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: canonicalUrl("/search"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/terms"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/privacy"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: canonicalUrl("/contact"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => c.slug !== "all"
  ).map((cat) => ({
    url: canonicalUrl(`/category/${cat.slug}`),
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Story detail pages
  const storyRoutes: MetadataRoute.Sitemap = STORIES.map((story) => ({
    url: canonicalUrl(`/story/${story.slug}`),
    lastModified: new Date(story.publishedIso),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...storyRoutes];
}
