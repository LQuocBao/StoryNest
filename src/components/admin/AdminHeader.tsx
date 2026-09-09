'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, Bell, Search, ShieldCheck } from 'lucide-react';

export interface AdminHeaderProps {
  onMenuToggle?: () => void;
  title?: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMenuToggle,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-haven-surface/95 backdrop-blur-md border-b border-haven-border h-16 flex items-center justify-between px-4 sm:px-8 shadow-haven-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 text-haven-text-muted hover:text-haven-primary rounded-haven-md hover:bg-haven-muted lg:hidden"
          aria-label="Toggle admin sidebar"
        >
          <Menu size={20} />
        </button>

        {title ? (
          <div>
            <h1 className="text-base sm:text-lg font-bold text-haven-primary leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-haven-text-muted hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        ) : (
          <div className="text-xs font-semibold text-haven-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>NOVEL FEED CMS</span>
          </div>
        )}
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative">
          <button
            className="p-2 text-haven-text-muted hover:text-haven-primary rounded-haven-md hover:bg-haven-muted transition-haven relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-haven-accent rounded-full ring-2 ring-white" />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-haven-border hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-haven-primary text-white flex items-center justify-center font-bold text-xs border border-haven-border">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
              alt="Admin Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-haven-primary leading-none">
              Eleanor Bennett
            </span>
            <span className="text-[10px] text-haven-text-muted flex items-center gap-1 mt-0.5">
              <ShieldCheck size={11} className="text-haven-accent" />
              <span>Super Administrator</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
