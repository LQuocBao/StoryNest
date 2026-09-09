import { buildMetadata } from "@/services/seo";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = buildMetadata({
  path: "/contact",
  title: "Contact & Editorial Office",
  description: "Get in touch with the Aussie Stories editorial and licensing team in Sydney, Australia.",
});

export default function ContactPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 text-[var(--foreground)]">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-2">
        Contact Editorial
      </h1>
      <p className="text-xs text-[var(--muted-text)] mb-6">
        Have a real-life Australian story, feedback, or syndication inquiry? We&apos;d love to hear from you.
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold uppercase text-[var(--foreground)]">
              Editorial Submissions
            </h3>
            <p className="text-xs text-[var(--muted-text)] mt-0.5">
              editor@aussiestories.com.au
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] flex items-start gap-3">
          <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold uppercase text-[var(--foreground)]">
              Sydney Bureau
            </h3>
            <p className="text-xs text-[var(--muted-text)] mt-0.5">
              Level 14, 175 Pitt Street, Sydney NSW 2000, Australia
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-3.5 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
        <h3 className="text-sm font-bold uppercase tracking-tight">
          Send a Message
        </h3>
        <div>
          <label className="block text-xs font-medium text-[var(--muted-text)] mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Jack Thomson"
            className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--card-border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted-text)] mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="jack@example.com.au"
            className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--card-border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted-text)] mb-1">
            Story Pitch / Message
          </label>
          <textarea
            rows={4}
            required
            placeholder="Tell us your story or question..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--card-border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="w-full py-2.5 bg-[#221f1d] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit Message
        </button>
      </form>
    </div>
  );
}
