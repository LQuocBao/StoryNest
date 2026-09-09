"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminCategory } from "@/types/admin";
import { adminCategories } from "@/lib/mockData";
import { Plus, Search, Trash2, Tag, ExternalLink } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] =
    useState<AdminCategory[]>(adminCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const filteredCategories = categories.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: AdminCategory = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description,
      count: 0,
    };
    setCategories([...categories, newCat]);
    setName("");
    setSlug("");
    setDescription("");
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setCategories(categories.filter((c) => c.slug !== deleteTarget.slug));
      setDeleteTarget(null);
    }
  };

  const columns: Column<AdminCategory>[] = [
    {
      key: "name",
      header: "Category Name",
      render: (item) => (
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-haven-primary">
            {item.name}
          </h4>
          <span className="text-[11px] text-haven-text-muted font-mono">
            /category/{item.slug}
          </span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-xs text-haven-text-muted line-clamp-1">
          {item.description || "—"}
        </span>
      ),
    },
    {
      key: "count",
      header: "Live Stories",
      render: (item) => (
        <span className="font-bold text-xs text-haven-primary">
          {item.count} stories
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: () => (
        <Badge variant="success" size="sm">
          Active
        </Badge>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Category Management"
      subtitle="Manage thematic story categories and taxonomies for reader browsing and SEO routing."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search category by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={15} />}
            />
          </div>

          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={15} />
            <span>Add New Category</span>
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredCategories}
          keyExtractor={(c) => c.slug}
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <Link
                href={item.slug === "all" ? "/" : `/category/${item.slug}`}
                target="_blank"
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="View live category page"
              >
                <ExternalLink size={15} />
              </Link>
              {item.slug !== "all" && item.slug !== "drama" && (
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-haven-sm transition-haven cursor-pointer"
                  title="Delete category"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          )}
        />

        {/* Create Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Category"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Category Display Name"
              required
              placeholder="e.g. Wilderness & Survival"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(
                  e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                );
              }}
            />
            <Input
              label="URL Route Slug"
              required
              placeholder="e.g. wilderness-survival"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-haven-text-muted mb-1.5">
                Description (SEO Meta)
              </label>
              <textarea
                rows={3}
                placeholder="Brief category summary for SEO and indexing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-haven-muted border border-haven-border rounded-haven-md p-3 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Category
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Category"
          message={`Are you sure you want to remove the "${deleteTarget?.name}" category?`}
          confirmLabel="Delete"
        />
      </div>
    </AdminLayout>
  );
}
