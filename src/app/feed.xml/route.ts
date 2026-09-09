import { STORIES } from "@/data/stories";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/constants/seo";
import { canonicalUrl } from "@/services/seo";

export function GET(): Response {
  const itemsXml = STORIES.map((story) => {
    const link = canonicalUrl(`/story/${story.slug}`);
    return `    <item>
      <title><![CDATA[${story.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${story.excerpt}]]></description>
      <pubDate>${new Date(story.publishedIso).toUTCString()}</pubDate>
      <guid>${link}</guid>
      <category>${story.category}</category>
      <author><![CDATA[${story.author.name}]]></author>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en-au</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
