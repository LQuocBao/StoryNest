'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Eye,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  PieChart,
  BarChart3
} from 'lucide-react';
import clsx from 'clsx';

export const DashboardAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'month' | 'year'>('30d');

  // Traffic data per day (Last 7 days mock)
  const dailyTraffic = [
    { day: 'Mon', views: 64200, readers: 12400, revenue: 118.5 },
    { day: 'Tue', views: 71500, readers: 14200, revenue: 132.0 },
    { day: 'Wed', views: 68900, readers: 13100, revenue: 127.4 },
    { day: 'Thu', views: 82400, readers: 16800, revenue: 154.2 },
    { day: 'Fri', views: 94100, readers: 19500, revenue: 178.6 },
    { day: 'Sat', views: 112000, readers: 24800, revenue: 215.0 },
    { day: 'Sun', views: 108400, readers: 23200, revenue: 202.8 },
  ];

  const maxViews = Math.max(...dailyTraffic.map((d) => d.views));

  // Ad placement distribution
  const adPlacements = [
    { name: 'Reading In-Content & Between Chapters', percent: 48, amount: '$1,645.70 AUD', color: 'bg-haven-primary' },
    { name: 'Homepage & Catalogue Banners', percent: 32, amount: '$1,097.10 AUD', color: 'bg-haven-accent' },
    { name: 'Reading Sidebar Placements', percent: 20, amount: '$685.70 AUD', color: 'bg-emerald-600' },
  ];

  // Top Monetised Stories
  const topStories = [
    { title: 'The Amber Sanctuary of Elyria', author: 'Elena Thorne', views: '142,800', impressions: '482,100', revenue: '$892.40 AUD' },
    { title: 'Song of the Silk Serpent', author: 'Li Wei & Anne Bailey', views: '124,500', impressions: '418,900', revenue: '$774.20 AUD' },
    { title: 'The Iron Sovereign of Gilded Sands', author: 'Kaelen Thorne', views: '98,200', impressions: '330,400', revenue: '$611.50 AUD' },
    { title: 'Neon Harbor: Sydney 2142', author: 'Marcus Vance', views: '74,600', impressions: '251,200', revenue: '$464.80 AUD' },
    { title: 'The Botanist of Moonlit Vale', author: 'Claire Delacroix', views: '42,820', impressions: '144,300', revenue: '$267.00 AUD' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header with Timeframe Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-haven-border pb-4">
        <div>
          <h2 className="text-base font-bold text-haven-primary flex items-center gap-2">
            <TrendingUp size={18} className="text-haven-accent" />
            <span>Traffic & Advertising Revenue Analytics</span>
          </h2>
          <p className="text-xs text-haven-text-muted mt-0.5">
            Real-time reader impressions, traffic trajectory, and estimated ad earnings.
          </p>
        </div>

        {/* Timeframe Chips */}
        <div className="flex items-center gap-1.5 bg-haven-surface p-1 rounded-haven-md border border-haven-border shadow-haven-sm">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'month', label: 'This Month' },
            { id: 'year', label: 'This Year' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id as typeof timeRange)}
              className={clsx(
                'px-3 py-1 rounded-haven-sm text-xs font-semibold transition-haven',
                timeRange === t.id
                  ? 'bg-haven-primary text-white shadow-xs'
                  : 'text-haven-text-muted hover:text-haven-primary hover:bg-haven-muted'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Financial & Traffic KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ad Revenue */}
        <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm space-y-2 relative overflow-hidden group hover:border-haven-accent/50 transition-haven">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-haven-text-muted">Total Ad Revenue</span>
            <div className="w-7 h-7 rounded-haven-sm bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-haven-primary tracking-tight">
              $3,428.50 <span className="text-xs font-medium text-haven-text-muted">AUD</span>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <ArrowUpRight size={14} />
            <span>+12.8% vs last period</span>
            <span className="text-[11px] text-haven-text-muted font-normal ml-auto">~56.8M VND</span>
          </div>
        </div>

        {/* Total Page Views */}
        <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm space-y-2 relative overflow-hidden group hover:border-haven-primary/50 transition-haven">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-haven-text-muted">Total Page Views</span>
            <div className="w-7 h-7 rounded-haven-sm bg-haven-primary/10 text-haven-primary flex items-center justify-center">
              <Eye size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-haven-primary tracking-tight">
              601,500
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <ArrowUpRight size={14} />
            <span>+14.2% reader activity</span>
          </div>
        </div>

        {/* Unique Active Readers */}
        <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm space-y-2 relative overflow-hidden group hover:border-haven-primary/50 transition-haven">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-haven-text-muted">Active Readers</span>
            <div className="w-7 h-7 rounded-haven-sm bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-haven-primary tracking-tight">
              64,150
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <ArrowUpRight size={14} />
            <span>+8.5% new visitors</span>
          </div>
        </div>

        {/* Average eCPM */}
        <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm space-y-2 relative overflow-hidden group hover:border-haven-accent/50 transition-haven">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-haven-text-muted">Effective CPM</span>
            <div className="w-7 h-7 rounded-haven-sm bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-haven-primary tracking-tight">
              $1.85 <span className="text-xs font-medium text-haven-text-muted">AUD</span>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <ArrowUpRight size={14} />
            <span>1,853,200 ad impressions</span>
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart & Ad Placement Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Traffic & Revenue Bar Chart */}
        <div className="lg:col-span-8 bg-haven-surface border border-haven-border rounded-haven-lg p-6 shadow-haven-sm space-y-6">
          <div className="flex items-center justify-between border-b border-haven-border/60 pb-3">
            <div>
              <h3 className="text-sm font-bold text-haven-primary flex items-center gap-2">
                <BarChart3 size={16} className="text-haven-accent" />
                <span>Daily Traffic & Impression Volume</span>
              </h3>
              <p className="text-[11px] text-haven-text-muted">Daily reader page views across all story chapters</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-haven-text-muted">
                <span className="w-3 h-3 rounded-xs bg-haven-primary inline-block" />
                Page Views
              </span>
              <span className="flex items-center gap-1.5 text-haven-text-muted">
                <span className="w-3 h-3 rounded-xs bg-haven-accent inline-block" />
                Revenue ($)
              </span>
            </div>
          </div>

          {/* Custom Visual Bar Graphic */}
          <div className="pt-2">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {dailyTraffic.map((d) => {
                const heightPercent = Math.round((d.views / maxViews) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Hover Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-14 bg-haven-primary-dark text-white text-[10px] rounded-haven-sm py-1 px-2 pointer-events-none shadow-haven-md whitespace-nowrap z-20">
                      <p className="font-bold">{d.views.toLocaleString()} views</p>
                      <p className="text-haven-accent">${d.revenue} AUD earned</p>
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[36px] bg-haven-muted rounded-t-haven-sm overflow-hidden h-40 flex items-end">
                      <div
                        className="w-full bg-gradient-to-t from-haven-primary-dark to-haven-primary group-hover:from-haven-accent group-hover:to-haven-accent transition-all duration-300 rounded-t-haven-sm relative"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <span className="sr-only">{d.views} views</span>
                      </div>
                    </div>

                    {/* Day label */}
                    <span className="text-[11px] font-semibold text-haven-text-muted group-hover:text-haven-primary">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Revenue by Placement & Devices */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ad Placement Breakdown */}
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-6 shadow-haven-sm space-y-4">
            <h3 className="text-sm font-bold text-haven-primary flex items-center gap-2 border-b border-haven-border/60 pb-3">
              <PieChart size={16} className="text-haven-accent" />
              <span>Earnings by Ad Placement</span>
            </h3>

            <div className="space-y-3">
              {adPlacements.map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-haven-text line-clamp-1">{p.name}</span>
                    <span className="font-bold text-haven-primary">{p.amount} ({p.percent}%)</span>
                  </div>
                  <div className="w-full bg-haven-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={clsx('h-full rounded-full transition-all', p.color)}
                      style={{ width: `${p.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-5 shadow-haven-sm space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-haven-primary text-[11px]">
              Reader Device Distribution
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-haven-muted/50 p-2.5 rounded-haven-sm border border-haven-border/60">
                <Smartphone size={16} className="text-haven-accent mx-auto mb-1" />
                <span className="font-bold text-haven-primary block text-sm">68%</span>
                <span className="text-[10px] text-haven-text-muted">Mobile</span>
              </div>
              <div className="bg-haven-muted/50 p-2.5 rounded-haven-sm border border-haven-border/60">
                <Monitor size={16} className="text-haven-primary mx-auto mb-1" />
                <span className="font-bold text-haven-primary block text-sm">28%</span>
                <span className="text-[10px] text-haven-text-muted">Desktop</span>
              </div>
              <div className="bg-haven-muted/50 p-2.5 rounded-haven-sm border border-haven-border/60">
                <Tablet size={16} className="text-emerald-700 mx-auto mb-1" />
                <span className="font-bold text-haven-primary block text-sm">4%</span>
                <span className="text-[10px] text-haven-text-muted">Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Stories Table by Ad Revenue */}
      <div className="bg-haven-surface border border-haven-border rounded-haven-lg overflow-hidden shadow-haven-sm">
        <div className="px-6 py-4 border-b border-haven-border flex items-center justify-between bg-haven-bg/50">
          <div>
            <h3 className="text-sm font-bold text-haven-primary">Top Performing Stories by Ad Revenue</h3>
            <p className="text-[11px] text-haven-text-muted">Serialized titles generating the highest reader volume & earnings</p>
          </div>
          <span className="text-xs font-semibold text-haven-accent">Monetisation Rank</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-haven-muted/60 border-b border-haven-border text-[10px] uppercase font-bold text-haven-primary tracking-wider">
                <th className="py-3 px-4">Story & Author</th>
                <th className="py-3 px-4">Page Views</th>
                <th className="py-3 px-4">Ad Impressions</th>
                <th className="py-3 px-4 text-right">Estimated Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-haven-border/60">
              {topStories.map((story, i) => (
                <tr key={story.title} className="hover:bg-haven-bg/60 transition-haven">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-haven-muted text-haven-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-bold text-haven-primary block">{story.title}</span>
                        <span className="text-[11px] text-haven-text-muted">{story.author}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-haven-text">{story.views}</td>
                  <td className="py-3 px-4 text-haven-text-muted">{story.impressions}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-emerald-700">{story.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
