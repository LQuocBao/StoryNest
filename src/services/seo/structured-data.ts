import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_ADDRESS_COUNTRY,
  AUTHOR_ADDRESS_LOCALITY,
  AUTHOR_ADDRESS_REGION,
  OG_IMAGE_PATH,
} from "@/constants/seo";
import type { JsonLd } from "@/types/seo";
import type { Story } from "@/types/story";

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-AU",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: OG_IMAGE_PATH,
      width: 1200,
      height: 630,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: AUTHOR_ADDRESS_LOCALITY,
      addressRegion: AUTHOR_ADDRESS_REGION,
      addressCountry: AUTHOR_ADDRESS_COUNTRY,
    },
  };
}

export function storyArticleJsonLd(story: Story, url: string): JsonLd {
  const allParagraphs = story.parts.flatMap((p) => p.paragraphs).join(" ");
  const wordCount = allParagraphs.split(/\s+/).length;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: story.title,
    description: story.excerpt,
    datePublished: story.publishedIso,
    dateModified: story.modifiedIso || story.publishedIso,
    inLanguage: "en-AU",
    author: {
      "@type": "Person",
      name: story.author.name,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    image: {
      "@type": "ImageObject",
      url: story.coverImage,
      width: 1200,
      height: 675,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    wordCount,
    articleSection: story.category,
    keywords: story.tags.join(", "),
  };
}

export function breadcrumbListJsonLd(
  items: Array<{ name: string; url: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
