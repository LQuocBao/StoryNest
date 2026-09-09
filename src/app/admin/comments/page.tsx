"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminComment } from "@/types/admin";
import { adminComments } from "@/lib/mockData";
import { Search, CheckCircle, EyeOff, Trash2, ExternalLink } from "lucide-react";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>(adminComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminComment | null>(null);

  const filteredComments = comments.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.text.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) ||
        c.storyTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const updateStatus = (id: string, newStatus: AdminComment["status"]) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setComments(comments.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<AdminComment>[] = [
    {
      key: "text",
      header: "Reader Comment",
      render: (c) => (
        <div className="max-w-md space-y-1">
          <p className="text-xs text-haven-text font-medium leading-relaxed line-clamp-2">
            &ldquo;{c.text}&rdquo;
          </p>
          <p className="text-[11px] text-haven-text-muted">
            Posted by <strong className="text-haven-primary">{c.author}</strong>
          </p>
        </div>
      ),
    },
    {
      key: "storyTitle",
      header: "Story",
      render: (c) => (
        <div>
          <Link
            href={`/story/${c.storySlug}`}
            target="_blank"
            className="font-bold text-haven-primary hover:text-haven-accent text-xs block truncate max-w-xs"
          >
            {c.storyTitle}
          </Link>
          <span className="text-[10px] text-haven-text-muted font-mono">
            /story/{c.storySlug}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Moderation Status",
      render: (c) => (
        <Badge
          variant={
            c.status === "Approved"
              ? "success"
              : c.status === "Hidden"
              ? "error"
              : "warning"
          }
          size="sm"
        >
          {c.status}
        </Badge>
      ),
    },
    {
      key: "date",
      header: "Date",
      hideOnMobile: true,
      render: (c) => (
        <span className="text-haven-text-muted text-[11px]">{c.date}</span>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Reader Comments Moderation"
      subtitle="Review, approve, or hide reader discussions left on story chapters."
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search comments by reader, text, or story..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={15} />}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-haven-muted border border-haven-border rounded-haven-md px-3 py-2 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
            >
              <option value="">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredComments}
          keyExtractor={(c) => c.id}
          actions={(c) => (
            <div className="flex items-center justify-end gap-1.5">
              {c.status !== "Approved" && (
                <button
                  onClick={() => updateStatus(c.id, "Approved")}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-haven-sm transition-haven cursor-pointer"
                  title="Approve comment"
                >
                  <CheckCircle size={15} />
                </button>
              )}
              {c.status !== "Hidden" && (
                <button
                  onClick={() => updateStatus(c.id, "Hidden")}
                  className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-haven-sm transition-haven cursor-pointer"
                  title="Hide comment"
                >
                  <EyeOff size={15} />
                </button>
              )}
              <Link
                href={`/story/${c.storySlug}`}
                target="_blank"
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="View story on live site"
              >
                <ExternalLink size={15} />
              </Link>
              <button
                onClick={() => setDeleteTarget(c)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-haven-sm transition-haven cursor-pointer"
                title="Delete comment"
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
          title="Delete Comment"
          message={`Are you sure you want to permanently delete this comment by "${deleteTarget?.author}"?`}
          confirmLabel="Delete Comment"
        />
      </div>
    </AdminLayout>
  );
}
