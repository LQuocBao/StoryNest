"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Flag,
  X,
  Check,
} from "lucide-react";
import { STORIES } from "@/data/stories";
import type { Story } from "@/types/story";
import { DemoAdSlot } from "@/components/ads/DemoAdSlot";
import { FloatingStickyAd } from "@/components/ads/FloatingStickyAd";

interface StoryReaderProps {
  story: Story;
}

interface CommentItem {
  id: string;
  author: string;
  date: string;
  text: string;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const router = useRouter();

  // Multi-part reading state
  const [visiblePartsCount, setVisiblePartsCount] = useState(1);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState("");
  const [guestName, setGuestName] = useState("Guest");
  const [isChangingName, setIsChangingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  // Report modal state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("Inappropriate content");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Find next story for seamless continuous reading
  const currentStoryIndex = STORIES.findIndex((s) => s.id === story.id);
  const nextStory =
    currentStoryIndex !== -1 && currentStoryIndex < STORIES.length - 1
      ? STORIES[currentStoryIndex + 1]
      : STORIES[0];

  // Load guest name and comments from localStorage
  useEffect(() => {
    try {
      const savedName = localStorage.getItem("aussie_guest_name");
      if (savedName) {
        setGuestName(savedName);
        setNameInput(savedName);
      } else {
        setNameInput("Guest");
      }

      const savedComments = JSON.parse(
        localStorage.getItem(`aussie_comments_${story.slug}`) || "[]"
      );
      setComments(savedComments);
    } catch {
      // ignore
    }
  }, [story.slug]);

  const handleContinueReading = () => {
    if (visiblePartsCount < story.parts.length) {
      // Reveal the next part of this story and scroll smoothly
      setVisiblePartsCount((prev) => prev + 1);
      setTimeout(() => {
        window.scrollBy({ top: 380, behavior: "smooth" });
      }, 100);
    } else if (nextStory) {
      // Navigates to the next story in the feed
      router.push(`/story/${nextStory.slug}`);
    }
  };

  const handleSaveName = () => {
    const trimmed = nameInput.trim() || "Guest";
    setGuestName(trimmed);
    setIsChangingName(false);
    try {
      localStorage.setItem("aussie_guest_name", trimmed);
    } catch {
      // ignore
    }
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: guestName,
      date: "Just now",
      text: commentText.trim(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    setCommentText("");

    try {
      localStorage.setItem(
        `aussie_comments_${story.slug}`,
        JSON.stringify(updated)
      );
    } catch {
      // ignore
    }
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportOpen(false);
      setReportSubmitted(false);
    }, 1800);
  };

  // Slice visible parts
  const displayedParts = story.parts.slice(0, visiblePartsCount);
  const isLastPart = visiblePartsCount >= story.parts.length;

  return (
    <div className="w-full min-h-screen bg-[#fbf9f5]">
      {/* Top Bar matching screenshot */}
      <header className="sticky top-0 z-30 bg-[#fbf9f5]/95 backdrop-blur-xs border-b border-[#ece7de]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
          {/* Left: Feed link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#221f1d] hover:opacity-75 font-normal transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Feed</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-[#78716c]">
            <li>
              <Link href="/" className="hover:underline text-[#78716c]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="truncate max-w-[280px] sm:max-w-md uppercase font-normal text-[#78716c]">
              {story.title}
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-[32px] font-black text-[#18181b] uppercase tracking-tight leading-[1.2] mb-3">
          {story.title}
        </h1>

        {/* Subtitle quote */}
        {story.subtitle && (
          <p className="text-base sm:text-lg text-[#52525b] italic font-normal leading-relaxed mb-5 font-serif">
            &ldquo;{story.subtitle}&rdquo;
          </p>
        )}

        {/* Divider */}
        <hr className="border-t border-[#e5e0d8] my-5" />

        {/* Published Date Row */}
        <div className="flex items-center gap-1.5 text-xs text-[#71717a] mb-6">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Posted {story.publishedDate}</span>
        </div>

        {/* Top In-Article Banner Ad Demo */}
        <DemoAdSlot
          format="in-article-banner"
          slotId="top-in-article"
          className="mb-6"
        />

        {/* Featured Cover Image */}
        <div className="relative w-full aspect-video sm:aspect-16/9 rounded-2xl overflow-hidden mb-8 bg-[#eee8df]">
          <Image
            src={story.coverImage}
            alt={story.coverImageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {/* Story Body Paragraphs */}
        <article
          className="space-y-6 text-[#221f1d] font-serif-reading text-base sm:text-[17px] leading-[1.8]"
        >
          {displayedParts.map((part, partIdx) => (
            <div key={part.partNumber || partIdx} className="space-y-6">
              {/* If continuing past part 1, show ad slot & clean part header */}
              {partIdx > 0 && (
                <div className="pt-4 pb-2">
                  <DemoAdSlot
                    format="shopping-feed"
                    slotId={`between-parts-${part.partNumber}`}
                  />
                  <div className="pt-4 pb-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Part {part.partNumber}
                  </div>
                </div>
              )}

              {part.paragraphs.map((paragraph, pIdx) => (
                <React.Fragment key={pIdx}>
                  <p>{paragraph}</p>
                  {/* Shopping carousel ad inserted after paragraph 1 (like in user screenshot) */}
                  {pIdx === 0 && (
                    <DemoAdSlot
                      format="shopping-feed"
                      slotId={`part-${part.partNumber}-p1-shopping`}
                    />
                  )}
                  {/* In-article display banner inserted after paragraph 3 */}
                  {pIdx === 2 && (
                    <DemoAdSlot
                      format="in-article-banner"
                      slotId={`part-${part.partNumber}-p3-banner`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </article>

        {/* Ad Slot directly above Continue Reading Button */}
        <DemoAdSlot
          format="in-article-banner"
          slotId="pre-continue-reading"
          className="my-6"
        />

        {/* CONTINUE READING Button matching screenshot */}
        <div className="flex justify-center my-8">
          <button
            type="button"
            onClick={handleContinueReading}
            className="px-8 sm:px-10 py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <span>CONTINUE READING</span>
            <span>→</span>
          </button>
        </div>

        {/* Divider matching screenshot */}
        <hr className="border-t border-[#e2ddd5] my-8" />

        {/* Pre-Comments Shopping Ad Slot */}
        <DemoAdSlot
          format="shopping-feed"
          slotId="pre-comments-shopping"
          className="mb-8"
        />

        {/* Report Button on the right matching screenshot */}
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 bg-white border border-[#dcd6cb] hover:border-neutral-400 hover:text-neutral-700 rounded-md transition-colors shadow-2xs cursor-pointer"
            title="Report this story"
          >
            <Flag className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Report</span>
          </button>
        </div>

        {/* COMMENTS Card matching screenshot */}
        <div className="bg-white rounded-xl border border-[#e2ddd5] p-5 sm:p-6 shadow-2xs">
          {/* Header */}
          <h3 className="font-black text-base sm:text-lg text-[#0f172a] uppercase tracking-tight">
            COMMENTS ({comments.length})
          </h3>

          {/* Comments list or empty state */}
          {comments.length === 0 ? (
            <p className="text-sm text-neutral-500 my-4 font-normal">
              No comments yet.
            </p>
          ) : (
            <div className="my-4 space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-[#faf8f5] rounded-lg border border-[#eee7dc] text-xs text-[#221f1d]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#0f172a]">{c.author}</span>
                    <span className="text-[11px] text-neutral-400">{c.date}</span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          <hr className="border-t border-neutral-100 my-4" />

          {/* Identity row: Posting as Guest Change name */}
          <div className="text-xs text-neutral-600 mb-2 flex items-center flex-wrap gap-1">
            <span>Posting as </span>
            <strong className="text-neutral-900 font-bold">{guestName}</strong>
            <button
              type="button"
              onClick={() => setIsChangingName(!isChangingName)}
              className="text-blue-600 hover:underline cursor-pointer ml-1 font-medium"
            >
              Change name
            </button>
          </div>

          {/* Inline Change Name Box */}
          {isChangingName && (
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="px-2.5 py-1 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="px-3 py-1 bg-[#221f1d] text-white text-xs font-semibold rounded-md hover:opacity-90 cursor-pointer"
              >
                Save
              </button>
            </div>
          )}

          {/* Textarea */}
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y text-[#221f1d] placeholder:text-neutral-400 font-sans"
          />

          {/* Post comment button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handlePostComment}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors shadow-2xs cursor-pointer"
            >
              Post comment
            </button>
          </div>
        </div>

        {/* Sponsored Native Recommendations Grid below Comments */}
        <DemoAdSlot
          format="native-recommendations"
          slotId="post-comments-native"
          className="mt-8"
        />
      </main>

      {/* Floating Sticky Video/Display Demo Ad (Matching Screenshot Bottom-Right) */}
      <FloatingStickyAd />

      {/* Report Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-xl border border-neutral-200 relative">
            <button
              onClick={() => setIsReportOpen(false)}
              className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {reportSubmitted ? (
              <div className="py-6 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2.5">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-neutral-900">
                  Report Received
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Thank you for helping keep our reading community safe.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendReport}>
                <h4 className="font-bold text-sm text-neutral-900 mb-3 flex items-center gap-1.5">
                  <Flag className="w-4 h-4 text-red-500" />
                  <span>Report Story</span>
                </h4>
                <p className="text-xs text-neutral-500 mb-3">
                  Please select why you are reporting this story:
                </p>

                <div className="space-y-2 mb-4 text-xs">
                  {[
                    "Inappropriate content",
                    "Copyright infringement",
                    "Misinformation or harmful content",
                    "Spam or broken text",
                  ].map((reason) => (
                    <label
                      key={reason}
                      className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason}
                        checked={reportReason === reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors cursor-pointer shadow-2xs"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
