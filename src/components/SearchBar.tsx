"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearchChange?: (query: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({
  initialValue = "",
  onSearchChange,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative mb-4">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search blogs..."
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
