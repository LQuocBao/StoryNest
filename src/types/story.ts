export interface StoryPart {
  partNumber: number;
  partTitle: string;
  paragraphs: string[];
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
  readingTime: string;   // e.g., "5 min read"
  audioLength: string;   // e.g., "6 min audio"
  location?: string;     // e.g., "Blue Mountains, NSW"
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
}
