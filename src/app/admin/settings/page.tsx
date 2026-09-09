"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { adminSiteSettings } from "@/lib/mockData";
import { SiteSettings } from "@/types/admin";
import {
  Save,
  CheckCircle2,
  Globe,
  BookOpen,
  Sliders,
  Server,
} from "lucide-react";
import clsx from "clsx";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(adminSiteSettings);
  const [activeTab, setActiveTab] = useState<
    "general" | "reading" | "seo" | "system"
  >("general");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout
      title="Website Settings"
      subtitle="Configure website identity, reading defaults, SEO metadata, and moderation switches."
    >
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
        {/* Top Actions */}
        <div className="flex items-center justify-between">
          <div>
            {saved && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 size={16} />
                <span>Settings saved successfully!</span>
              </span>
            )}
          </div>
          <Button type="submit" size="sm" className="shadow-haven-sm">
            <Save size={15} />
            <span>Save Settings</span>
          </Button>
        </div>

        {/* Settings Tab Navigation */}
        <div className="flex items-center gap-1.5 border-b border-haven-border pb-2 overflow-x-auto">
          {[
            { id: "general", label: "General & Branding", icon: Globe },
            { id: "reading", label: "Reading & Engagement", icon: BookOpen },
            { id: "seo", label: "SEO & Discovery", icon: Sliders },
            { id: "system", label: "System Maintenance", icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-2 rounded-haven-md text-xs font-semibold whitespace-nowrap transition-haven cursor-pointer",
                  active
                    ? "bg-haven-primary text-white shadow-haven-sm"
                    : "bg-haven-surface border border-haven-border text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted"
                )}
              >
                <Icon size={14} className={active ? "text-haven-accent" : ""} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: General */}
        {activeTab === "general" && (
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-6 space-y-4 shadow-haven-sm animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-haven-primary border-b border-haven-border/60 pb-3">
              Site Brand & Identity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Site Name"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
              <Input
                label="Tagline"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Canonical Site URL"
                value={settings.siteUrl}
                onChange={(e) =>
                  setSettings({ ...settings, siteUrl: e.target.value })
                }
              />
              <Input
                label="Editorial Contact Email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-haven-text-muted mb-1.5">
                Site Description
              </label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                className="w-full bg-haven-muted border border-haven-border rounded-haven-md p-3 text-xs text-haven-text focus:outline-none focus:border-haven-primary leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Reading & Engagement */}
        {activeTab === "reading" && (
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-6 space-y-4 shadow-haven-sm animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-haven-primary border-b border-haven-border/60 pb-3">
              Story Reader Defaults & Community
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-haven-text-muted mb-1.5">
                  Default Reading Typography
                </label>
                <select
                  value={settings.defaultReadingFont}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultReadingFont: e.target.value,
                    })
                  }
                  className="w-full bg-haven-muted border border-haven-border rounded-haven-md p-2.5 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
                >
                  <option value="Serif">Serif (Editorial Book Font)</option>
                  <option value="Sans">Sans-Serif (Modern Crisp Font)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-haven-text-muted mb-1.5">
                  Default Font Size
                </label>
                <select
                  value={settings.defaultFontSize}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultFontSize: e.target.value,
                    })
                  }
                  className="w-full bg-haven-muted border border-haven-border rounded-haven-md p-2.5 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
                >
                  <option value="SM">SM (Standard 16px)</option>
                  <option value="MD">MD (Medium 18px)</option>
                  <option value="LG">LG (Large 20px)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 bg-haven-muted/50 rounded-haven-md border border-haven-border cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-haven-primary block">
                    Enable Reader Comments Section
                  </span>
                  <span className="text-[11px] text-haven-text-muted">
                    Allows visitors to leave comments and feedback at the bottom of stories.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableComments}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableComments: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-haven-accent rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-haven-muted/50 rounded-haven-md border border-haven-border cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-haven-primary block">
                    Enable Reader Content Reporting
                  </span>
                  <span className="text-[11px] text-haven-text-muted">
                    Displays report flag button allowing readers to flag inappropriate content.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableReports}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableReports: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-haven-accent rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 3: SEO */}
        {activeTab === "seo" && (
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-6 space-y-4 shadow-haven-sm animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-haven-primary border-b border-haven-border/60 pb-3">
              Search Engine Optimization (SEO)
            </h3>
            <Input
              label="Global Meta Title"
              value={settings.siteName + " - " + settings.tagline}
              onChange={(e) =>
                setSettings({ ...settings, tagline: e.target.value })
              }
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-haven-text-muted mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                className="w-full bg-haven-muted border border-haven-border rounded-haven-md p-3 text-xs text-haven-text focus:outline-none focus:border-haven-primary"
              />
            </div>
          </div>
        )}

        {/* Tab 4: System */}
        {activeTab === "system" && (
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-6 space-y-4 shadow-haven-sm animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-haven-primary border-b border-haven-border/60 pb-3">
              System Environment
            </h3>
            <div className="text-xs space-y-2 text-haven-text">
              <p>
                <strong>Framework:</strong> Next.js (App Router)
              </p>
              <p>
                <strong>Styling:</strong> Tailwind CSS v4
              </p>
              <p>
                <strong>Status:</strong> All systems operational (Staging / Production)
              </p>
            </div>
          </div>
        )}
      </form>
    </AdminLayout>
  );
}
