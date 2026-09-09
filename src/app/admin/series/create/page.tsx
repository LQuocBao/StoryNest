"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CATEGORIES, STORIES } from "@/data/stories";
import {
  ArrowLeft,
  Save,
  Upload,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function CreateSeriesPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categorySlug, setCategorySlug] = useState("outback-farm");
  const [status, setStatus] = useState<"Ongoing" | "Completed">("Ongoing");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?w=800&h=600&fit=crop"
  );
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([
    "story-2",
    "story-3",
  ]);

  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddChapter = (storyId: string) => {
    if (!storyId || selectedChapterIds.includes(storyId)) return;
    setSelectedChapterIds([...selectedChapterIds, storyId]);
  };

  const handleRemoveChapter = (storyId: string) => {
    setSelectedChapterIds(selectedChapterIds.filter((id) => id !== storyId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/series");
    }, 800);
  };

  return (
    <AdminLayout
      title="Create New Series"
      subtitle="Group related story entries into a sequential fiction saga with next/previous chapter navigation."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl pb-16">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/series"
            className="flex items-center gap-1.5 text-xs font-semibold text-haven-text-muted hover:text-haven-primary transition-haven"
          >
            <ArrowLeft size={16} />
            <span>Back to Series</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/admin/series">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="sm" className="shadow-haven-sm">
              <Save size={15} />
              <span>{saved ? "Saving..." : "Save Series"}</span>
            </Button>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 size={16} />
            <span>Series saved successfully! Redirecting...</span>
          </div>
        )}

        {/* 1. Series Information */}
        <div className="bg-white border border-[#cfd6dd] rounded-xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e293b] border-b border-neutral-200 pb-3 flex items-center gap-2">
            <Layers size={16} className="text-haven-accent" />
            <span>Series General Details</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Cover Image */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-semibold text-[#1e293b]">
                Series Cover Image
              </label>

              <div className="bg-[#f8f9fa] border border-[#d8dce2] rounded-lg p-3.5 space-y-2.5">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Paste image URL here"
                  className="w-full bg-white border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="relative flex items-center justify-center my-1.5">
                  <div className="border-t border-[#e2e8f0] w-full" />
                  <span className="bg-[#f8f9fa] px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider relative">
                    OR
                  </span>
                </div>

                <div className="flex justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-neutral-50 border border-[#cbd5e1] rounded-md text-xs font-semibold text-[#334155] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  >
                    <Upload size={13} className="text-[#64748b]" />
                    <span>Choose image</span>
                  </button>
                </div>

                {coverImage && (
                  <div className="relative aspect-16/9 w-full rounded-md overflow-hidden bg-neutral-200 border border-[#cbd5e1] mt-2 group">
                    <Image
                      src={coverImage}
                      alt="Series cover preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Series Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Darling Downs Farm Saga"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="the-darling-downs-farm-saga"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                    Category
                  </label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "Ongoing" | "Completed")
                    }
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] focus:outline-none focus:border-blue-500"
                  >
                    <option value="Ongoing">Ongoing (Adding more chapters)</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Series Synopsis / Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the overarching plot, characters, and drama..."
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg p-3 text-xs text-[#1e293b] focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Chapter Sequencing Manager */}
        <div className="bg-white border border-[#cfd6dd] rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e293b] flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600" />
                <span>Chapter Sequencing & Progression</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Ordered chapters will automatically display "Next Chapter →" and "← Previous Chapter" buttons on the reader page.
              </p>
            </div>
          </div>

          {/* Add Chapter Selector */}
          <div className="flex items-center gap-3 bg-[#f8f9fa] border border-[#e2e8f0] p-3 rounded-lg">
            <select
              id="chapter-selector"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  handleAddChapter(e.target.value);
                  e.target.value = "";
                }
              }}
              className="flex-1 bg-white border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#1e293b] focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                + Assign an existing story/chapter to this series sequence...
              </option>
              {STORIES.filter((s) => !selectedChapterIds.includes(s.id)).map(
                (s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Chapters List */}
          <div className="space-y-2.5">
            {selectedChapterIds.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center italic">
                No chapters added yet. Assign stories above to build the sequence.
              </p>
            ) : (
              selectedChapterIds.map((id, index) => {
                const story = STORIES.find((s) => s.id === id);
                if (!story) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 bg-white border border-[#e2e8f0] rounded-lg shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#1e293b] block truncate">
                          Chapter {index + 1}: {story.title}
                        </span>
                        <span className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                          <span>{story.category}</span>
                          <span>•</span>
                          <span>{story.parts.length} parts</span>
                          {index < selectedChapterIds.length - 1 && (
                            <span className="text-blue-600 font-semibold flex items-center gap-0.5 ml-2">
                              <span>Next: Chapter {index + 2}</span>
                              <ArrowRight size={11} />
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveChapter(id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Remove from series"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
