"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminReport } from "@/types/admin";
import { adminReports } from "@/lib/mockData";
import { Search, CheckCircle2, XCircle, Trash2, ExternalLink } from "lucide-react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>(adminReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminReport | null>(null);

  const filteredReports = reports.filter((r) => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.storyTitle.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        r.reporterName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const updateStatus = (id: string, newStatus: AdminReport["status"]) => {
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setReports(reports.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<AdminReport>[] = [
    {
      key: "storyTitle",
      header: "Reported Story & Reason",
      render: (r) => (
        <div className="space-y-1">
          <Link
            href={`/story/${r.storySlug}`}
            target="_blank"
            className="font-bold text-xs sm:text-sm text-haven-primary hover:text-haven-accent block truncate max-w-sm"
          >
            {r.storyTitle}
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-haven-sm border border-red-200">
              {r.reason}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "reporterName",
      header: "Reporter",
      hideOnMobile: true,
      render: (r) => (
        <span className="text-xs font-medium text-haven-text">
          {r.reporterName}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (r) => (
        <Badge
          variant={
            r.priority === "High"
              ? "error"
              : r.priority === "Medium"
              ? "warning"
              : "default"
          }
          size="sm"
        >
          {r.priority}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge
          variant={
            r.status === "Resolved"
              ? "success"
              : r.status === "Open"
              ? "error"
              : "default"
          }
          size="sm"
        >
          {r.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Date Filed",
      hideOnMobile: true,
      render: (r) => (
        <span className="text-haven-text-muted text-[11px]">
          {r.createdAt}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Content Reports & Moderation"
      subtitle="Review copyright, formatting or content complaints submitted by readers."
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search reports by story, reason, or reporter..."
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
              <option value="Open">Open</option>
              <option value="Resolved">Resolved</option>
              <option value="Dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredReports}
          keyExtractor={(r) => r.id}
          actions={(r) => (
            <div className="flex items-center justify-end gap-1.5">
              {r.status !== "Resolved" && (
                <button
                  onClick={() => updateStatus(r.id, "Resolved")}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-haven-sm transition-haven cursor-pointer"
                  title="Mark resolved"
                >
                  <CheckCircle2 size={15} />
                </button>
              )}
              {r.status !== "Dismissed" && (
                <button
                  onClick={() => updateStatus(r.id, "Dismissed")}
                  className="p-1.5 text-haven-text-muted hover:bg-haven-muted rounded-haven-sm transition-haven cursor-pointer"
                  title="Dismiss report"
                >
                  <XCircle size={15} />
                </button>
              )}
              <Link
                href={`/story/${r.storySlug}`}
                target="_blank"
                className="p-1.5 text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted rounded-haven-sm transition-haven"
                title="Inspect live story"
              >
                <ExternalLink size={15} />
              </Link>
              <button
                onClick={() => setDeleteTarget(r)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-haven-sm transition-haven cursor-pointer"
                title="Delete record"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        />

        {/* Delete Modal */}
        <ConfirmModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Report Record"
          message={`Are you sure you want to remove this report for "${deleteTarget?.storyTitle}"?`}
          confirmLabel="Delete Record"
        />
      </div>
    </AdminLayout>
  );
}
