import {
  adminStories,
  adminCategories,
  adminComments,
  adminReports,
  adminUsers,
  adminSiteSettings,
} from "./mockData";
import {
  AdminStats,
  AdminComment,
  AdminReport,
  AdminCategory,
  AdminUser,
  SiteSettings,
} from "@/types/admin";
import { Story } from "@/types/story";

export const api = {
  async getAdminStats(): Promise<AdminStats> {
    const totalViews = adminStories.reduce((sum, s) => sum + s.viewsCount, 0);
    const totalLikes = adminStories.reduce((sum, s) => sum + s.likesCount, 0);

    return {
      totalStories: adminStories.length,
      totalCategories: adminCategories.length,
      totalViews,
      totalLikes,
      pendingComments: adminComments.filter((c) => c.status === "Pending").length,
      openReports: adminReports.filter((r) => r.status === "Open").length,
    };
  },

  async getStories(): Promise<Story[]> {
    return adminStories;
  },

  async getCategories(): Promise<AdminCategory[]> {
    return adminCategories;
  },

  async getComments(): Promise<AdminComment[]> {
    return adminComments;
  },

  async getReports(): Promise<AdminReport[]> {
    return adminReports;
  },

  async getUsers(): Promise<AdminUser[]> {
    return adminUsers;
  },

  async getSiteSettings(): Promise<SiteSettings> {
    return adminSiteSettings;
  },
};
