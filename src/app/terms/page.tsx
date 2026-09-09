import { buildMetadata } from "@/services/seo";

export const metadata = buildMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: "Terms and conditions for accessing and enjoying Aussie Stories publications.",
});

export default function TermsPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 text-[var(--foreground)]">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="text-xs text-[var(--muted-text)] mb-6">
        Last updated: September 2026 • Governing Law: New South Wales, Australia
      </p>

      <div className="space-y-4 text-sm text-[var(--muted-text)] leading-relaxed">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or reading stories published on Aussie Stories, you agree
          to comply with these Terms of Service, all applicable Australian laws,
          and any community guidelines.
        </p>

        <h2 className="text-base font-bold text-[var(--foreground)]">
          2. Intellectual Property & Copyright
        </h2>
        <p>
          All creative literature, narrative arcs, custom photography, audio
          narration, and digital artwork featured across this platform are protected
          under the Australian Copyright Act 1968 and international copyright conventions.
        </p>

        <h2 className="text-base font-bold text-[var(--foreground)]">
          3. Fair Dealing & User Sharing
        </h2>
        <p>
          You are welcome to share excerpts and links across social networks
          (Facebook, X, Instagram, TikTok) provided clear attribution and direct
          links to the original publication are maintained.
        </p>
      </div>
    </div>
  );
}
