import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--card-border)] py-8 px-4 text-center text-xs text-[var(--muted-text)] mt-auto bg-[var(--background)]">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Powered by tag matching screenshot */}
        <p className="text-[11px]">
          Powered by{" "}
          <Link
            href="/"
            className="text-blue-600 font-bold hover:underline"
          >
            AussieStory AU
          </Link>
        </p>

        {/* Legal and policy links matching screenshot */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-medium"
        >
          <Link
            href="/terms"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Term of Services
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            href="/contact"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Contact
          </Link>
          <span>•</span>
          <Link
            href="/feed.xml"
            prefetch={false}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            RSS Feed
          </Link>
          <span>•</span>
          <Link
            href="/admin"
            className="hover:text-[var(--accent)] font-semibold transition-colors"
          >
            Admin CMS
          </Link>
        </nav>

        {/* Australia copyright disclaimer for Google AdSense and publisher approval */}
        <p className="text-[10px] text-[var(--muted-text)] opacity-80 pt-2">
          © {new Date().getFullYear()} Aussie Stories Media Group. Sydney, NSW, Australia. All rights reserved.
          Content protected under the Australian Copyright Act 1968.
        </p>
      </div>
    </footer>
  );
}
