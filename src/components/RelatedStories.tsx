import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Story } from "@/types/story";

interface RelatedStoriesProps {
  currentStoryId: string;
  allStories: Story[];
}

export default function RelatedStories({
  currentStoryId,
  allStories,
}: RelatedStoriesProps) {
  const related = allStories
    .filter((s) => s.id !== currentStoryId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 border-t border-[#ece7de]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-[var(--foreground)]">
          You May Also Like
        </h3>
        <Link
          href="/"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          View all stories →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {related.map((story) => (
          <article
            key={story.id}
            className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col"
          >
            <Link
              href={`/story/${story.slug}`}
              className="flex flex-col h-full"
            >
              <div className="relative w-full aspect-video bg-[#f0ebe1]">
                <Image
                  src={story.coverImage}
                  alt={story.coverImageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                  {story.title}
                </h4>

                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[var(--muted-text)]">
                  <Clock className="w-3 h-3" />
                  <span>{story.publishedDate}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
