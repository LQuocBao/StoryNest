import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_HANDLE,
  SITE_LOCALE,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/constants/seo";
import type { RouteDescriptor } from "@/types/seo";

/**
 * Normalizes any route path into a canonical absolute URL without trailing slashes.
 */
export function canonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  const withoutTrailing = normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;
  return `${SITE_URL}${withoutTrailing}`;
}

/**
 * Framework adapter to build Next.js Metadata object from a RouteDescriptor.
 */
export function buildMetadata(route: RouteDescriptor): Metadata {
  const canonical = canonicalUrl(route.path);
  const ogImageUrl = route.ogImage
    ? (route.ogImage.startsWith("http") ? route.ogImage : canonicalUrl(route.ogImage))
    : OG_IMAGE_PATH;

  const isArticle = route.type === "article";

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical },
    openGraph: {
      type: isArticle ? "article" : "website",
      locale: SITE_LOCALE,
      url: canonical,
      siteName: SITE_NAME,
      title: route.title,
      description: route.description,
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: route.title,
        },
      ],
      ...(isArticle && route.publishedTime
        ? {
            publishedTime: route.publishedTime,
            modifiedTime: route.modifiedTime || route.publishedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_HANDLE,
      creator: SITE_HANDLE,
      title: route.title,
      description: route.description,
      images: [ogImageUrl],
    },
  };
}
