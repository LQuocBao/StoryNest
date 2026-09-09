import { buildMetadata } from "@/services/seo";

export const metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description: "Privacy policy complying with the Australian Privacy Principles (APPs) and Privacy Act 1988.",
});

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 text-[var(--foreground)]">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="text-xs text-[var(--muted-text)] mb-6">
        Last updated: September 2026 • Compliant with Privacy Act 1988 (Cth)
      </p>

      <div className="space-y-4 text-sm text-[var(--muted-text)] leading-relaxed">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          1. Australian Privacy Principles (APPs)
        </h2>
        <p>
          Aussie Stories is committed to respecting your privacy and safeguarding
          your personal information in accordance with the 13 Australian Privacy
          Principles under the Privacy Act 1988 (Cth).
        </p>

        <h2 className="text-base font-bold text-[var(--foreground)]">
          2. Information We Collect
        </h2>
        <p>
          We do not require account registration to read our stories. We collect
          standard anonymous analytical data (page views, reading time, referring
          domain) to enhance content quality and reader experience.
        </p>

        <h2 className="text-base font-bold text-[var(--foreground)]">
          3. Cookies & Advertising
        </h2>
        <p>
          We may partner with third-party advertising networks (including Google
          AdSense) to serve contextually relevant ads. These networks may utilize
          cookies to optimize advertising delivery in accordance with industry
          standards.
        </p>

        <h2 className="text-base font-bold text-[var(--foreground)]">
          4. Contact Our Privacy Officer
        </h2>
        <p>
          If you have any questions or wish to submit an inquiry regarding your
          data, please contact us at{" "}
          <span className="text-[var(--foreground)] font-semibold">
            privacy@aussiestories.com.au
          </span>
          .
        </p>
      </div>
    </div>
  );
}
