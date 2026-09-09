import { STORIES } from "@/data/stories";
import StoryFeed from "@/components/StoryFeed";

export default function HomePage() {
  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Minimalist Story Feed matching Screenshot 1 */}
      <StoryFeed initialStories={STORIES} />
    </div>
  );
}
