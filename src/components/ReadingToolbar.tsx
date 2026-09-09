"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  BookmarkCheck,
  Type,
} from "lucide-react";

interface ReadingToolbarProps {
  storyTitle: string;
  audioLength?: string;
  fontSize: "sm" | "md" | "lg" | "xl";
  setFontSize: (size: "sm" | "md" | "lg" | "xl") => void;
  fontFamily: "serif" | "sans";
  setFontFamily: (family: "serif" | "sans") => void;
  storySlug: string;
}

export default function ReadingToolbar({
  storyTitle,
  audioLength = "6 min audio",
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  storySlug,
}: ReadingToolbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");

  useEffect(() => {
    // Scroll progress listener
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check saved bookmarks
    try {
      const bookmarks = JSON.parse(
        localStorage.getItem("aussie_bookmarks") || "[]"
      );
      setIsBookmarked(bookmarks.includes(storySlug));
    } catch {
      // ignore
    }
  }, [storySlug]);

  const toggleBookmark = () => {
    try {
      const bookmarks: string[] = JSON.parse(
        localStorage.getItem("aussie_bookmarks") || "[]"
      );
      let updated: string[];
      if (bookmarks.includes(storySlug)) {
        updated = bookmarks.filter((id) => id !== storySlug);
        setIsBookmarked(false);
      } else {
        updated = [...bookmarks, storySlug];
        setIsBookmarked(true);
      }
      localStorage.setItem("aussie_bookmarks", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const cycleFontSize = () => {
    const order: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"];
    const currentIndex = order.indexOf(fontSize);
    const nextSize = order[(currentIndex + 1) % order.length];
    setFontSize(nextSize);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: storyTitle,
          url: window.location.href,
        });
      } catch {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-amber-500 to-indigo-600 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Reader secondary control bar */}
      <div className="sticky top-14 z-30 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--card-border)] py-2 px-4 transition-colors">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-[var(--muted-text)]">
          {/* Back button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[var(--foreground)] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Feed</span>
          </Link>

          {/* Controls right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio narrator button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all ${
                isPlayingAudio
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-[var(--card-border)] hover:text-[var(--foreground)]"
              }`}
              title="Listen to AI narration"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-blue-600" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden xs:inline">{audioLength}</span>
            </button>

            {/* Font Size Button */}
            <button
              onClick={cycleFontSize}
              className="p-1.5 rounded-md hover:bg-black/5 hover:text-[var(--foreground)] transition-colors flex items-center gap-0.5"
              title={`Font size: ${fontSize.toUpperCase()}. Click to enlarge.`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase">{fontSize}</span>
            </button>

            {/* Serif / Sans switch */}
            <button
              onClick={() =>
                setFontFamily(fontFamily === "serif" ? "sans" : "serif")
              }
              className={`px-2 py-1 rounded-md text-[11px] font-semibold border transition-colors ${
                fontFamily === "serif"
                  ? "border-amber-700/40 text-amber-900 bg-amber-50/60 font-serif"
                  : "border-gray-200 text-gray-700 bg-white"
              }`}
              title="Switch Reading Font (Serif Book vs Modern Sans)"
            >
              {fontFamily === "serif" ? "Serif" : "Sans"}
            </button>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? "text-blue-600"
                  : "hover:bg-black/5 hover:text-[var(--foreground)]"
              }`}
              title={isBookmarked ? "Story saved" : "Bookmark this story"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 fill-current text-blue-600" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-md hover:bg-black/5 hover:text-[var(--foreground)] transition-colors"
              title="Share story"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
