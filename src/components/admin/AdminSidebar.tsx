'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  FileText,
  Tag,
  Users,
  MessageSquare,
  AlertTriangle,
  Megaphone,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import clsx from 'clsx';

export const AdminSidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();

  const navSections = [
    {
      title: 'Overview',
      items: [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Content',
      items: [
        { href: '/admin/stories', label: 'Stories & Chapters', icon: BookOpen },
        { href: '/admin/series', label: 'Series', icon: Layers },
        { href: '/admin/categories', label: 'Categories', icon: Tag },
      ],
    },
    {
      title: 'Moderation',
      items: [
        { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
        { href: '/admin/reports', label: 'Reports', icon: AlertTriangle },
        { href: '/admin/users', label: 'Staff & Roles', icon: Users },
      ],
    },
    {
      title: 'System',
      items: [
        { href: '/admin/settings', label: 'Site Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-haven-primary-dark text-white flex flex-col border-r border-haven-primary transition-transform duration-200 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-haven-md bg-haven-accent flex items-center justify-center text-haven-primary font-bold">
            <BookOpen size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white leading-none">
              NOVEL FEED
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-haven-accent leading-tight mt-0.5">
              Editorial CMS
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-haven-border/60 mb-2">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-haven-md text-xs font-medium transition-haven',
                      isActive
                        ? 'bg-haven-primary text-white font-semibold shadow-inner border-l-2 border-haven-accent'
                        : 'text-haven-border/80 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon size={16} className={isActive ? 'text-haven-accent' : 'text-haven-border/60'} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-white/10 shrink-0 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-haven-md text-xs text-haven-border/80 hover:bg-white/5 hover:text-white transition-haven"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-haven-accent" />
            <span>View Live Website</span>
          </span>
          <ExternalLink size={12} />
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2.5 px-3 py-2 rounded-haven-md text-xs text-red-300 hover:bg-white/5 hover:text-red-200 transition-haven"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};
