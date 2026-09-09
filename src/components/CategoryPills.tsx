"use client";

import { CATEGORIES } from "@/data/stories";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryPillsProps {
  selectedSlug?: string;
  onSelectCategory?: (slug: string) => void;
}

export default function CategoryPills({
  selectedSlug = "all",
  onSelectCategory,
}: CategoryPillsProps) {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 mb-4">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max pb-1">
        {CATEGORIES.map((cat) => {
          const isActive =
            selectedSlug === cat.slug ||
            (pathname === `/category/${cat.slug}` && cat.slug !== "all");

          if (onSelectCategory) {
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? "bg-[#221f1d] text-white shadow-xs scale-[1.02]"
                    : "bg-[#eee7dc] text-gray-700 hover:bg-[#e4ddd0]"
                }`}
              >
                {cat.name}
              </button>
            );
          }

          return (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                isActive
                  ? "bg-[#221f1d] text-white shadow-xs"
                  : "bg-[#eee7dc] text-gray-700 hover:bg-[#e4ddd0]"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
