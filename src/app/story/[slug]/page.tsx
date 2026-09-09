import { notFound } from "next/navigation";
import { STORIES } from "@/data/stories";
import StoryReader from "@/components/StoryReader";
import RelatedStories from "@/components/RelatedStories";
import { buildMetadata, canonicalUrl } from "@/services/seo";
import {
  storyArticleJsonLd,
  breadcrumbListJsonLd,
} from "@/services/seo/structured-data";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return buildMetadata({
    path: `/story/${story.slug}`,
    title: story.title,
    description: story.excerpt,
    ogImage: story.coverImage,
    publishedTime: story.publishedIso,
    modifiedTime: story.modifiedIso,
    type: "article",
  });
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const url = canonicalUrl(`/story/${story.slug}`);
  const articleSchema = storyArticleJsonLd(story, url);
  const breadcrumbSchema = breadcrumbListJsonLd([
    { name: "Home", url: canonicalUrl("/") },
    { name: story.category, url: canonicalUrl(`/category/${story.categorySlug}`) },
    { name: story.title, url },
  ]);

  return (
    <>
      {/* Article Schema & Breadcrumbs for Googlebot Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <StoryReader story={story} />
      <RelatedStories currentStoryId={story.id} allStories={STORIES} />
    </>
  );
}
