import { STORIES, CATEGORIES } from "@/data/stories";
import {
  AdminComment,
  AdminReport,
  AdminUser,
  SiteSettings,
  AdminCategory,
} from "@/types/admin";
import { Story } from "@/types/story";

export const adminStories: Story[] = [...STORIES];

export const adminCategories: AdminCategory[] = CATEGORIES.map((c) => ({
  name: c.name,
  slug: c.slug,
  description: `Curated collection of ${c.name} fiction`,
  count:
    c.slug === "all"
      ? STORIES.length
      : STORIES.filter((s) => s.categorySlug === c.slug).length,
}));

export const adminComments: AdminComment[] = [
  {
    id: "com-1",
    storySlug: "it-hurt-so-he-stopped-mountain-revealed-why",
    storyTitle:
      "IT HURT, SO HE STOPPED. THEN THE MOUNTAIN REVEALED WHY HE HAD...",
    author: "Grace Kelly",
    date: "2 hours ago",
    text: "This chapter left me in absolute tears! Callum is such an incredible character.",
    status: "Approved",
  },
  {
    id: "com-2",
    storySlug: "twelve-year-old-girl-raised-notebook-grandfather-auction",
    storyTitle:
      "A TWELVE-YEAR-OLD GIRL RAISED HER NOTEBOOK AT HER GRANDFATHER'S FARM AUCTION...",
    author: "Liam Dawson",
    date: "5 hours ago",
    text: "I didn't expect the banker's confession at all. Beautifully written Australian country drama.",
    status: "Approved",
  },
  {
    id: "com-3",
    storySlug: "she-bought-the-blue-and-white-chicks-everyone-mocked",
    storyTitle:
      "SHE BOUGHT THE BLUE-AND-WHITE CHICKS EVERYONE MOCKED. TWO YEARS LATER...",
    author: "Guest_842",
    date: "1 day ago",
    text: "Can someone explain part 2 ending please? The twist caught me off guard!",
    status: "Pending",
  },
];

export const adminReports: AdminReport[] = [
  {
    id: "rep-1",
    storySlug: "it-hurt-so-he-stopped-mountain-revealed-why",
    storyTitle:
      "IT HURT, SO HE STOPPED. THEN THE MOUNTAIN REVEALED WHY HE HAD...",
    reporterName: "Reader_Anon",
    reason: "Spam or broken text",
    createdAt: "September 8, 2026",
    status: "Open",
    priority: "Low",
  },
  {
    id: "rep-2",
    storySlug: "she-slapped-me-into-silence-never-expected-what-next",
    storyTitle:
      "SHE SLAPPED ME INTO SILENCE. THEY NEVER EXPECTED WHAT I'D SAY NEXT",
    reporterName: "Sarah M.",
    reason: "Inappropriate content",
    createdAt: "September 7, 2026",
    status: "Open",
    priority: "Medium",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "usr-1",
    name: "Eleanor Bennett",
    email: "eleanor.b@novelfeed.com",
    role: "Admin",
    status: "Active",
    joinedAt: "Jan 15, 2026",
    lastActive: "Just now",
  },
  {
    id: "usr-2",
    name: "Clara Jennings",
    email: "clara.j@novelfeed.com",
    role: "Editor",
    status: "Active",
    joinedAt: "Feb 02, 2026",
    lastActive: "1 hour ago",
  },
  {
    id: "usr-3",
    name: "Thomas Wright",
    email: "thomas.w@novelfeed.com",
    role: "Moderator",
    status: "Active",
    joinedAt: "Mar 10, 2026",
    lastActive: "3 hours ago",
  },
];

export const adminSiteSettings: SiteSettings = {
  siteName: "Novel Feed",
  tagline: "Stories & Drama",
  description:
    "Captivating serialized drama, country secrets, romance and emotional Australian fiction.",
  siteUrl: "https://novelfeed.com.au",
  contactEmail: "editor@novelfeed.com.au",
  defaultReadingFont: "Serif",
  defaultFontSize: "SM",
  enableComments: true,
  enableReports: true,
};
