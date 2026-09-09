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
import { Series } from "@/types/story";
import { adminSeries } from "@/lib/mockData";
import { CATEGORIES } from "@/data/stories";
import { Plus, Search, Edit3, Trash2, Eye, Layers } from "lucide-react";

export default function AdminSeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>(adminSeries);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Series | null>(null);

  const filteredSeries = seriesList.filter((s) => {
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
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = () => {
    if (deleteTarget) {
      setSeriesList(seriesList.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<Series>[] = [
    {
      key: "title",
      header: "Series Title & Synopsis",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-14 rounded-haven-sm overflow-hidden bg-haven-muted shrink-0 border border-haven-border">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 max-w-sm">
            <h4 className="font-bold text-xs sm:text-sm text-haven-primary truncate leading-snug">
              {item.title}
            </h4>
            <p className="text-[11px] text-haven-text-muted line-clamp-2 mt-0.5 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-xs font-semibold text-haven-primary">
          {item.category}
        </span>
      ),
    },
    {
      key: "totalChapters",
      header: "Chapters",
      render: (item) => (
        <div className="text-xs">
          <span className="font-bold text-haven-primary block">
            {item.totalChapters} chapters
          </span>
          <span className="text-[11px] text-haven-text-muted">
            Sequential ordering
          </span>
        </div>
      ),
    },
    {
      key: "viewsCount",
      header: "Engagement",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-xs font-semibold text-haven-primary">
          {item.viewsCount.toLocaleString()} total reads
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <Badge
          variant={item.status === "Completed" ? "success" : "accent"}
          size="sm"
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Series Management"
      subtitle="Organize serialized fiction sagas and manage chapter progression sequences."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search by series title or category..."
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
              {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Link href="/admin/series/create">
            <Button size="sm">
              <Plus size={15} />
              <span>Create New Series</span>
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredSeries}
          keyExtractor={(item) => item.id}
          actions={(item) => (
            <div className="flex items-center justify-end gap-1.5">
              <Link
                href={`/admin/series/create?id=${item.id}`}
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="Edit series & sequence"
              >
                <Edit3 size={15} />
              </Link>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-haven-sm transition-haven cursor-pointer"
                title="Delete series"
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
          title="Delete Series"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? Chapters inside will be unlinked from this series sequence.`}
          confirmLabel="Delete Series"
        />
      </div>
    </AdminLayout>
  );
}
