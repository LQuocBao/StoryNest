import { notFound } from "next/navigation";
import { STORIES, CATEGORIES } from "@/data/stories";
import StoryFeed from "@/components/StoryFeed";
import { buildMetadata, canonicalUrl } from "@/services/seo";
import { breadcrumbListJsonLd } from "@/services/seo/structured-data";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.filter((c) => c.slug !== "all").map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return buildMetadata({
    path: `/category/${category.slug}`,
    title: `${category.name} Stories & Australian Tales`,
    description: `Read the most captivating ${category.name.toLowerCase()} stories, emotional dramas, and true-life accounts from across Australia.`,
  });
}

export default async function CategoryArchivePage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const breadcrumbSchema = breadcrumbListJsonLd([
    { name: "Home", url: canonicalUrl("/") },
    { name: category.name, url: canonicalUrl(`/category/${category.slug}`) },
  ]);

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[var(--foreground)]">
          {category.name}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
          Explore gripping Australian stories and real-life emotional dramas in{" "}
          {category.name}.
        </p>
      </div>

      <StoryFeed
        initialStories={STORIES.filter((s) => s.categorySlug === category.slug)}
      />
    </div>
  );
}
