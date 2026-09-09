"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Story } from "@/types/story";
import { adminStories } from "@/lib/mockData";
import { CATEGORIES } from "@/data/stories";
import { Plus, Search, Edit3, Trash2, Eye } from "lucide-react";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>(adminStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Story | null>(null);

  const filteredStories = stories.filter((s) => {
    if (
      categoryFilter &&
      s.categorySlug.toLowerCase() !== categoryFilter.toLowerCase() &&
      categoryFilter !== "all"
    )
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = () => {
    if (deleteTarget) {
      setStories(stories.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<Story>[] = [
    {
      key: "title",
      header: "Story Details",
      render: (story) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-14 rounded-haven-sm overflow-hidden bg-haven-muted shrink-0 border border-haven-border">
            <Image
              src={story.coverImage}
              alt={story.coverImageAlt || story.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 max-w-sm">
            <h4 className="font-bold text-xs sm:text-sm text-haven-primary truncate leading-snug">
              {story.title}
            </h4>
            {story.subtitle && (
              <p className="text-[11px] text-haven-text-muted italic truncate mt-0.5">
                &ldquo;{story.subtitle}&rdquo;
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category & Tags",
      hideOnMobile: true,
      render: (story) => (
        <div className="space-y-1">
          <span className="text-xs font-semibold text-haven-primary block">
            {story.category}
          </span>
          <div className="flex flex-wrap gap-1">
            {story.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-haven-muted px-1.5 py-0.5 rounded-sm text-haven-text-muted font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "parts",
      header: "Length",
      render: (story) => (
        <div>
          <span className="font-bold text-xs text-haven-primary block">
            {story.parts.length} parts
          </span>
        </div>
      ),
    },
    {
      key: "views",
      header: "Engagement",
      hideOnMobile: true,
      render: (story) => (
        <div className="text-xs">
          <span className="font-semibold text-haven-primary block">
            {story.viewsCount.toLocaleString()} reads
          </span>
          <span className="text-[11px] text-haven-text-muted">
            {story.likesCount.toLocaleString()} likes
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (story) => (
        <Badge variant={story.featured ? "accent" : "success"} size="sm">
          {story.featured ? "Featured" : "Published"}
        </Badge>
      ),
    },
    {
      key: "publishedDate",
      header: "Published",
      hideOnMobile: true,
      render: (story) => (
        <span className="text-haven-text-muted text-xs">
          {story.publishedDate}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Stories Management"
      subtitle="Publish, edit, and organize serialized fiction and viral drama stories."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={15} />}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-haven-muted border border-haven-border rounded-haven-md px-3 py-2 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Link href="/admin/stories/create">
            <Button size="sm">
              <Plus size={15} />
              <span>Create New Story</span>
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredStories}
          keyExtractor={(s) => s.id}
          actions={(story) => (
            <div className="flex items-center justify-end gap-1.5">
              <Link
                href={`/story/${story.slug}`}
                target="_blank"
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="View live story"
              >
                <Eye size={15} />
              </Link>
              <Link
                href={`/admin/stories/create?id=${story.id}`}
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="Edit story"
              >
                <Edit3 size={15} />
              </Link>
              <button
                onClick={() => setDeleteTarget(story)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-haven-sm transition-haven cursor-pointer"
                title="Delete story"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Story"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
          confirmLabel="Delete Story"
        />
      </div>
    </AdminLayout>
  );
}
