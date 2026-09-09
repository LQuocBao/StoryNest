"use client";

import { useState } from "react";
import StoryCard from "./StoryCard";
import type { Story } from "@/types/story";
import { ChevronDown } from "lucide-react";

interface StoryFeedProps {
  initialStories: Story[];
}

export default function StoryFeed({ initialStories }: StoryFeedProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedStories = initialStories.slice(0, visibleCount);
  const hasMore = visibleCount < initialStories.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 5);
      setIsLoadingMore(false);
    }, 350);
  };

  return (
    <div className="w-full">
      {/* Stories list matching Screenshot 1 */}
      <div className="space-y-3 sm:space-y-3.5">
        {displayedStories.map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            priority={index < 2}
          />
        ))}
      </div>

      {/* Load More Button matching Screenshot 1 */}
      {hasMore && (
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            {isLoadingMore ? (
              <span className="inline-block animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Load more</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
