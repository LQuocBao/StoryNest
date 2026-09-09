"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide public header on story reading pages and all admin portal routes
  if (pathname?.startsWith("/story/") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--card-border)] transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo matching the screenshot */}
        <Link
          href="/"
          className="flex items-center gap-2 group tracking-tight"
          aria-label="Aussie Stories Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#221f1d] text-white flex items-center justify-center font-bold text-xs tracking-wider uppercase transition-transform group-hover:scale-105 shadow-xs">
            AU
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase leading-none">
              NOVEL FEED
            </span>
            <span className="text-[10px] text-[var(--muted-text)] tracking-widest font-medium uppercase">
              Stories & Drama
            </span>
          </div>
        </Link>

        {/* Minimal Nav Links matching screenshot (Home, Drama) */}
        <nav className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-[var(--accent)] ${
              pathname === "/" ? "text-[var(--accent)] font-semibold" : "text-[var(--muted-text)]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/category/drama"
            className={`transition-colors hover:text-[var(--accent)] ${
              pathname.includes("/category/drama")
                ? "text-[var(--accent)] font-semibold"
                : "text-[var(--muted-text)]"
            }`}
          >
            Drama
          </Link>
        </nav>
      </div>
    </header>
  );
}
