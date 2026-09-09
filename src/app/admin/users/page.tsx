"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminUser } from "@/types/admin";
import { adminUsers } from "@/lib/mockData";
import { Search, UserX, UserCheck, ShieldCheck } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusTarget, setStatusTarget] = useState<AdminUser | null>(null);

  const filteredUsers = users.filter((u) => {
    if (roleFilter && u.role !== roleFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleStatus = (user: AdminUser) => {
    const nextStatus: AdminUser["status"] =
      user.status === "Active" ? "Suspended" : "Active";
    setUsers(
      users.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
    setStatusTarget(null);
  };

  const columns: Column<AdminUser>[] = [
    {
      key: "name",
      header: "Staff / Identity",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-haven-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-haven-primary truncate">
              {user.name}
            </h4>
            <p className="text-[11px] text-haven-text-muted truncate">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "System Role",
      render: (user) => (
        <span className="font-semibold text-xs text-haven-primary flex items-center gap-1">
          {user.role === "Admin" && (
            <ShieldCheck size={14} className="text-haven-accent" />
          )}
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <Badge
          variant={user.status === "Active" ? "success" : "error"}
          size="sm"
        >
          {user.status}
        </Badge>
      ),
    },
    {
      key: "lastActive",
      header: "Last Active",
      hideOnMobile: true,
      render: (user) => (
        <span className="text-haven-text-muted text-[11px]">
          {user.lastActive}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Staff & Administrative Roles"
      subtitle="Manage editorial team members, story writers, and community moderation privileges."
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Input
              placeholder="Search staff by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={15} />}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-haven-muted border border-haven-border rounded-haven-md px-3 py-2 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredUsers}
          keyExtractor={(u) => u.id}
          actions={(user) => (
            <div className="flex items-center justify-end">
              <button
                onClick={() => setStatusTarget(user)}
                className={`p-1.5 rounded-haven-sm transition-haven cursor-pointer ${
                  user.status === "Active"
                    ? "text-red-500 hover:text-red-700 hover:bg-red-50"
                    : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                }`}
                title={user.status === "Active" ? "Suspend user" : "Reactivate user"}
              >
                {user.status === "Active" ? (
                  <UserX size={15} />
                ) : (
                  <UserCheck size={15} />
                )}
              </button>
            </div>
          )}
        />

        {/* Status Confirmation Modal */}
        <ConfirmModal
          isOpen={!!statusTarget}
          onClose={() => setStatusTarget(null)}
          onConfirm={() => statusTarget && toggleStatus(statusTarget)}
          title={
            statusTarget?.status === "Active"
              ? "Suspend Staff Access"
              : "Reactivate Staff Access"
          }
          message={`Are you sure you want to ${
            statusTarget?.status === "Active" ? "suspend" : "reactivate"
          } privileges for ${statusTarget?.name}?`}
          confirmLabel={
            statusTarget?.status === "Active" ? "Suspend Staff" : "Reactivate"
          }
        />
      </div>
    </AdminLayout>
  );
}
