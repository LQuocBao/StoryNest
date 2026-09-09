'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text flex">
      {/* Shared Admin Sidebar (Permanent source of truth) */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};
