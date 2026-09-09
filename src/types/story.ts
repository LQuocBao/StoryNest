export interface StoryPart {
  partNumber: number;
  partTitle: string;
  paragraphs: string[];
}

export interface ChapterLink {
  id: string;
  slug: string;
  title: string;
  chapterNumber?: number;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categorySlug: string;
  coverImage: string;
  coverImageAlt: string;
  publishedDate: string; // e.g., "September 7, 2026"
  publishedIso: string;  // ISO-8601
  modifiedIso?: string;
  readingTime?: string;
  audioLength?: string;
  location?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  excerpt: string;
  parts: StoryPart[];
  tags: string[];
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  featured?: boolean;

  // Series & Chapter Sequencing
  seriesId?: string;
  seriesTitle?: string;
  seriesSlug?: string;
  chapterNumber?: number;
  prevChapter?: ChapterLink;
  nextChapter?: ChapterLink;
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  totalChapters: number;
  viewsCount: number;
  status: "Ongoing" | "Completed";
  chapters?: ChapterLink[];
}
