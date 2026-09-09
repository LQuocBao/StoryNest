import { Story } from "./story";

export interface AdminStats {
  totalStories: number;
  totalCategories: number;
  totalViews: number;
  totalLikes: number;
  pendingComments: number;
  openReports: number;
}

export interface AdminComment {
  id: string;
  storySlug: string;
  storyTitle: string;
  author: string;
  date: string;
  text: string;
  status: "Approved" | "Pending" | "Hidden";
}

export interface AdminReport {
  id: string;
  storySlug: string;
  storyTitle: string;
  reporterName: string;
  reason: string;
  createdAt: string;
  status: "Open" | "Resolved" | "Dismissed";
  priority: "Low" | "Medium" | "High";
}

export interface AdminCategory {
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Moderator";
  status: "Active" | "Suspended";
  joinedAt: string;
  lastActive: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  contactEmail: string;
  defaultReadingFont: string;
  defaultFontSize: string;
  enableComments: boolean;
  enableReports: boolean;
}
