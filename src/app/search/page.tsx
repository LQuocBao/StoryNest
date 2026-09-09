import { Suspense } from "react";
import { STORIES } from "@/data/stories";
import StoryFeed from "@/components/StoryFeed";
import { buildMetadata } from "@/services/seo";

export const metadata = buildMetadata({
  path: "/search",
  title: "Search Stories & Outback Tales",
  description: "Search across hundreds of captivating Australian stories, dramas, and viral novel tales.",
});

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const initialQuery = q || "";

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[var(--foreground)]">
          Search Stories
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
          {initialQuery
            ? `Showing results for "${initialQuery}"`
            : "Search stories by keyword, character, or topic"}
        </p>
      </div>

      <StoryFeed
        initialStories={STORIES.filter(
          (s) =>
            !initialQuery.trim() ||
            s.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
            s.excerpt.toLowerCase().includes(initialQuery.toLowerCase())
        )}
      />
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-xl mx-auto px-4 py-12 text-center text-xs text-[var(--muted-text)]">
          Loading search results...
        </div>
      }
    >
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}
