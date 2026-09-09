import React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardAnalytics } from "@/components/admin/DashboardAnalytics";
import { api } from "@/lib/api";
import {
  BookOpen,
  Tag,
  Eye,
  Heart,
  MessageSquare,
  AlertTriangle,
  Plus,
  ArrowRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Admin Dashboard & Editorial Overview",
};

export default async function AdminDashboardPage() {
  const [stats, stories, comments, reports] = await Promise.all([
    api.getAdminStats(),
    api.getStories(),
    api.getComments(),
    api.getReports(),
  ]);

  const statCards = [
    {
      title: "Total Stories",
      value: stats.totalStories,
      icon: BookOpen,
      color: "text-haven-primary bg-haven-primary/10",
      href: "/admin/stories",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Tag,
      color: "text-haven-accent bg-haven-accent/15",
      href: "/admin/categories",
    },
    {
      title: "Total Reads",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-blue-700 bg-blue-50",
      href: "/admin/stories",
    },
    {
      title: "Reader Likes",
      value: stats.totalLikes.toLocaleString(),
      icon: Heart,
      color: "text-pink-700 bg-pink-50",
      href: "/admin/stories",
    },
    {
      title: "Pending Comments",
      value: stats.pendingComments,
      icon: MessageSquare,
      color: "text-amber-700 bg-amber-50",
      href: "/admin/comments",
    },
    {
      title: "Open Reports",
      value: stats.openReports,
      icon: AlertTriangle,
      color: "text-red-700 bg-red-50",
      href: "/admin/reports",
    },
  ];

  return (
    <AdminLayout
      title="Editorial & Content Dashboard"
      subtitle="Overview of published stories, reader engagement, comments moderation, and system health."
    >
      <div className="space-y-8">
        {/* Top Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm">
          <div>
            <h2 className="text-sm font-bold text-haven-primary">
              Quick Editorial Actions
            </h2>
            <p className="text-xs text-haven-text-muted mt-0.5">
              Draft stories, manage categories, review community comments or configure SEO
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/admin/stories/create">
              <Button size="sm">
                <Plus size={14} />
                <span>Write Story</span>
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" size="sm">
                <Tag size={14} />
                <span>Categories</span>
              </Button>
            </Link>
            <Link href="/admin/comments">
              <Button variant="outline" size="sm">
                <MessageSquare size={14} />
                <span>Comments ({stats.pendingComments})</span>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" size="sm">
                <Settings size={14} />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="bg-haven-surface border border-haven-border rounded-haven-lg p-4 shadow-haven-sm hover:border-haven-primary/40 hover:shadow-haven-md transition-haven group"
              >
                <div
                  className={`w-8 h-8 rounded-haven-sm flex items-center justify-center mb-3 ${stat.color}`}
                >
                  <Icon size={16} />
                </div>
                <p className="text-xl font-extrabold text-haven-primary group-hover:text-haven-accent transition-haven">
                  {stat.value}
                </p>
                <p className="text-xs text-haven-text-muted font-medium mt-0.5 truncate">
                  {stat.title}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Traffic & Engagement Analytics */}
        <DashboardAnalytics />

        {/* Two-column Recent Content & Moderation Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Latest Stories */}
          <div className="lg:col-span-7 bg-haven-surface border border-haven-border rounded-haven-lg overflow-hidden shadow-haven-sm">
            <div className="px-5 py-4 border-b border-haven-border flex items-center justify-between bg-haven-bg/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-haven-primary flex items-center gap-2">
                <BookOpen size={14} className="text-haven-accent" />
                <span>Published Stories ({stories.length})</span>
              </h3>
              <Link
                href="/admin/stories"
                className="text-xs font-semibold text-haven-primary hover:text-haven-accent"
              >
                Manage All →
              </Link>
            </div>

            <div className="divide-y divide-haven-border/60">
              {stories.slice(0, 5).map((story) => (
                <div
                  key={story.id}
                  className="p-4 flex items-center justify-between hover:bg-haven-bg transition-haven"
                >
                  <div className="min-w-0 pr-4">
                    <Link
                      href={`/story/${story.slug}`}
                      target="_blank"
                      className="text-xs sm:text-sm font-bold text-haven-primary hover:text-haven-accent truncate block"
                    >
                      {story.title}
                    </Link>
                    <p className="text-[11px] text-haven-text-muted mt-0.5">
                      {story.parts.length} parts • {story.category}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-haven-sm bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {story.featured ? "Featured" : "Published"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reports & Moderation */}
          <div className="lg:col-span-5 bg-haven-surface border border-haven-border rounded-haven-lg overflow-hidden shadow-haven-sm">
            <div className="px-5 py-4 border-b border-haven-border flex items-center justify-between bg-haven-bg/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-haven-primary flex items-center gap-2">
                <AlertTriangle size={14} className="text-haven-accent" />
                <span>
                  Pending Reports ({reports.filter((r) => r.status === "Open").length})
                </span>
              </h3>
              <Link
                href="/admin/reports"
                className="text-xs font-semibold text-haven-primary hover:text-haven-accent"
              >
                Review →
              </Link>
            </div>

            <div className="divide-y divide-haven-border/60">
              {reports.length === 0 ? (
                <div className="p-6 text-center text-xs text-haven-text-muted">
                  No open reports. All clear!
                </div>
              ) : (
                reports.slice(0, 4).map((report) => (
                  <div
                    key={report.id}
                    className="p-4 space-y-1 hover:bg-haven-bg transition-haven"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-haven-primary">
                        {report.reason}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-haven-sm bg-red-50 text-haven-error border border-red-200">
                        {report.priority}
                      </span>
                    </div>
                    <p className="text-xs text-haven-text-muted line-clamp-1">
                      {report.storyTitle}
                    </p>
                    <p className="text-[10px] text-haven-text-muted/80">
                      Reported by {report.reporterName} • {report.createdAt}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
