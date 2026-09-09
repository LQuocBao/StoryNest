import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";
import type { Story } from "@/types/story";

interface StoryCardProps {
  story: Story;
  priority?: boolean;
}

export default function StoryCard({ story, priority = false }: StoryCardProps) {
  return (
    <article className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-3 sm:p-3.5 hover:shadow-md transition-all duration-200">
      <Link
        href={`/story/${story.slug}`}
        className="flex items-start gap-3 sm:gap-4"
        aria-label={`Read story: ${story.title}`}
      >
        {/* Left Thumbnail with fixed aspect ratio to prevent CLS */}
        <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-[#f0ebe1]">
          <Image
            src={story.coverImage}
            alt={story.coverImageAlt}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col flex-1 min-w-0 justify-between h-full">
          <div>
            {/* Title matching the uppercase dramatic style in screenshot */}
            <h2 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug tracking-tight">
              {story.title}
            </h2>

            {/* Date metadata with clock icon matching screenshot */}
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[var(--muted-text)]">
              <Clock className="w-3 h-3 shrink-0" />
              <span>Posted {story.publishedDate}</span>
            </div>
          </div>

          {/* Excerpt teaser snippet matching screenshot */}
          <p className="mt-1.5 text-[11px] sm:text-xs text-[var(--muted-text)] line-clamp-2 leading-relaxed">
            {story.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
