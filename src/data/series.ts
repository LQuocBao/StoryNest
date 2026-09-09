import { Series } from "@/types/story";

export const SERIES: Series[] = [
  {
    id: "series-1",
    slug: "the-darling-downs-farm-saga",
    title: "The Darling Downs Farm Saga",
    description:
      "The gripping legal and family battle of a twelve-year-old girl defending her grandfather's Queensland cattle station against ruthless corporate buyers.",
    coverImage:
      "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?w=800&h=600&fit=crop",
    category: "Outback & Farm",
    categorySlug: "outback-farm",
    totalChapters: 2,
    viewsCount: 98400,
    status: "Ongoing",
    chapters: [
      {
        id: "story-2",
        slug: "twelve-year-old-girl-raised-notebook-grandfather-farm-auction",
        title:
          "A TWELVE-YEAR-OLD GIRL RAISED HER NOTEBOOK AT HER GRANDFATHER'S FARM AUCTION...",
        chapterNumber: 1,
      },
      {
        id: "story-3",
        slug: "part-2-twelve-year-old-girl-raised-notebook-aftermath",
        title:
          "PART 2: A TWELVE-YEAR-OLD GIRL RAISED HER NOTEBOOK (THE AFTERMATH)",
        chapterNumber: 2,
      },
    ],
  },
  {
    id: "series-2",
    slug: "the-blue-mountains-legacy",
    title: "The Blue Mountains Legacy",
    description:
      "A seven-year secret vow buried under the crumbling sandstone ridge of the Jamison Valley is finally unsealed at sunrise.",
    coverImage:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop",
    category: "Drama",
    categorySlug: "drama",
    totalChapters: 1,
    viewsCount: 38420,
    status: "Ongoing",
    chapters: [
      {
        id: "story-1",
        slug: "it-hurt-so-he-stopped-mountain-revealed-why",
        title:
          "IT HURT, SO HE STOPPED. THEN THE MOUNTAIN REVEALED WHY HE HAD...",
        chapterNumber: 1,
      },
    ],
  },
  {
    id: "series-3",
    slug: "the-outback-heritage-mystery",
    title: "The Outback Heritage Mystery",
    description:
      "Generational Australian country secrets, lost homestead deeds, and rural family reconciliation.",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop",
    category: "Family Secrets",
    categorySlug: "family-secrets",
    totalChapters: 1,
    viewsCount: 24100,
    status: "Completed",
    chapters: [],
  },
];
