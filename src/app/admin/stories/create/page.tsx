"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, STORIES } from "@/data/stories";
import {
  ArrowLeft,
  Save,
  Upload,
  Search,
  ChevronDown,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Table as TableIcon,
  Quote,
  Code,
  Smile,
  CheckCircle2,
  X,
} from "lucide-react";

export default function CreateStoryPage() {
  const router = useRouter();

  // Core fields matching screenshot
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop"
  );
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("drama");
  const [tags, setTags] = useState("Drama, Outback, Mystery");
  const [prevChapter, setPrevChapter] = useState("");
  const [nextChapter, setNextChapter] = useState("");
  const [contentHtml, setContentHtml] = useState(
    "<p>It hurt, so he stopped. Standing on the crumbling sandstone ledge at sunrise, his grip loosened around her wrist so gently it felt like rain touching stone.</p><p>Josie stared at his calloused fingers. The frost was still biting into the mountain air, turning their breath into white ribbons against the gum trees.</p><p>'Why here, Callum?' she asked, her voice smaller than the eucalyptus wind. 'Why did you bring me all the way to the edge of the world just to say goodbye?'</p>"
  );

  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(62);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Auto-generate slug when title changes
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFeaturedImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Rich Text Editor formatting commands
  const executeCommand = (command: string, value: string = "") => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        setContentHtml(editorRef.current.innerHTML);
        updateWordCount(editorRef.current.innerText);
      }
    }
  };

  const updateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setContentHtml(target.innerHTML);
    updateWordCount(target.innerText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/stories");
    }, 800);
  };

  return (
    <AdminLayout
      title="Add New Story"
      subtitle="Complete the post content, featured image, taxonomy, and chapter sequence."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl pb-16">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/stories"
            className="flex items-center gap-1.5 text-xs font-semibold text-haven-text-muted hover:text-haven-primary transition-haven"
          >
            <ArrowLeft size={16} />
            <span>Back to Stories</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/admin/stories">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="sm" className="shadow-haven-sm">
              <Save size={15} />
              <span>{saved ? "Publishing..." : "Save & Publish Story"}</span>
            </Button>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 size={16} />
            <span>Story published successfully! Redirecting to stories list...</span>
          </div>
        )}

        {/* MAIN CARD CONTAINER MATCHING USER'S SCREENSHOT */}
        <div className="bg-white border border-[#cfd6dd] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* Helper caption from screenshot */}
          <div className="text-[11px] text-neutral-400 font-medium">
            Complete the post content...
          </div>

          {/* ROW 1: Featured image URL (Left) & Title + Slug (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Featured image URL */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-semibold text-[#1e293b]">
                Featured image URL
              </label>

              <div className="bg-[#f8f9fa] border border-[#d8dce2] rounded-lg p-3.5 space-y-2.5">
                <input
                  type="text"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="Paste image URL here"
                  className="w-full bg-white border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

                {/* Preview Thumbnail if available */}
                {featuredImageUrl && (
                  <div className="relative aspect-16/9 w-full rounded-md overflow-hidden bg-neutral-200 border border-[#cbd5e1] mt-2 group">
                    <Image
                      src={featuredImageUrl}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImageUrl("")}
                      className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title * & Slug */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter story title"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                  placeholder="url-friendly-slug"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* ROW 2: Categories / Tags & Prev Chapter / Next Chapter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Categories */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Categories
              </label>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg pl-9 pr-8 py-2.5 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select categories
                  </option>
                  {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Tags
              </label>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Select tags"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#1e293b] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Prev chapter */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Prev chapter
              </label>
              <div className="relative">
                <select
                  value={prevChapter}
                  onChange={(e) => setPrevChapter(e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 pr-8 py-2.5 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">No chapter</option>
                  {STORIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Next chapter */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Next chapter
              </label>
              <div className="relative">
                <select
                  value={nextChapter}
                  onChange={(e) => setNextChapter(e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3.5 pr-8 py-2.5 text-xs text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">No chapter</option>
                  {STORIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* ROW 3: DESCRIPTION (TINYMCE-STYLE RICH TEXT EDITOR) */}
          <div className="pt-2 space-y-1.5">
            <label className="block text-xs font-semibold text-[#1e293b]">
              Description
            </label>

            {/* WYSIWYG Editor Container */}
            <div className="border border-[#cbd5e1] rounded-lg overflow-hidden bg-white shadow-2xs">
              {/* Menu Bar (File, Edit, View, Insert, Format, Tools, Table, Help) */}
              <div className="bg-[#f8f9fa] border-b border-[#e2e8f0] px-3 py-1.5 flex items-center gap-4 text-xs text-[#475569] select-none">
                {["File", "Edit", "View", "Insert", "Format", "Tools", "Table", "Help"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="hover:text-blue-600 hover:bg-neutral-200/60 px-1.5 py-0.5 rounded transition-colors text-[11px] font-medium"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* Formatting Toolbar */}
              <div className="bg-white border-b border-[#e2e8f0] px-2 py-1.5 flex items-center flex-wrap gap-1 text-neutral-600 select-none">
                {/* Undo / Redo */}
                <button
                  type="button"
                  onClick={() => executeCommand("undo")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("redo")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo size={14} />
                </button>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Format Dropdown */}
                <select
                  onChange={(e) => executeCommand("formatBlock", e.target.value)}
                  defaultValue="p"
                  className="text-xs bg-white border border-neutral-200 rounded px-2 py-1 text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="blockquote">Blockquote</option>
                  <option value="pre">Preformatted</option>
                </select>

                {/* Font Dropdown */}
                <select
                  onChange={(e) => executeCommand("fontName", e.target.value)}
                  defaultValue="Inter"
                  className="text-xs bg-white border border-neutral-200 rounded px-2 py-1 text-neutral-700 focus:outline-none cursor-pointer max-w-[130px]"
                >
                  <option value="Inter,ui-sans-serif">Inter,ui-sans-s...</option>
                  <option value="Georgia,serif">Georgia (Serif)</option>
                  <option value="Arial,sans-serif">Arial</option>
                  <option value="Times New Roman,serif">Times New Roman</option>
                </select>

                {/* Font Size Dropdown */}
                <select
                  onChange={(e) => executeCommand("fontSize", e.target.value)}
                  defaultValue="3"
                  className="text-xs bg-white border border-neutral-200 rounded px-2 py-1 text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="1">12px</option>
                  <option value="2">13px</option>
                  <option value="3">14px</option>
                  <option value="4">16px</option>
                  <option value="5">18px</option>
                </select>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Basic Formatting: B, I, U, S */}
                <button
                  type="button"
                  onClick={() => executeCommand("bold")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-700 hover:text-black font-bold text-xs w-7 h-7 flex items-center justify-center"
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("italic")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-700 hover:text-black italic text-xs w-7 h-7 flex items-center justify-center"
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("underline")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-700 hover:text-black underline text-xs w-7 h-7 flex items-center justify-center"
                  title="Underline (Ctrl+U)"
                >
                  <Underline size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("strikeThrough")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-700 hover:text-black text-xs w-7 h-7 flex items-center justify-center"
                  title="Strikethrough"
                >
                  <Strikethrough size={14} />
                </button>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Link, Image, Video */}
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter link URL:");
                    if (url) executeCommand("createLink", url);
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Insert link"
                >
                  <LinkIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter image URL:");
                    if (url) executeCommand("insertImage", url);
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Insert image"
                >
                  <ImageIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Video embed modal demo")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Insert video"
                >
                  <Video size={14} />
                </button>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Alignments */}
                <button
                  type="button"
                  onClick={() => executeCommand("justifyLeft")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Align left"
                >
                  <AlignLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyCenter")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Align center"
                >
                  <AlignCenter size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyRight")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Align right"
                >
                  <AlignRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyFull")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Justify"
                >
                  <AlignJustify size={14} />
                </button>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Lists & Indents */}
                <button
                  type="button"
                  onClick={() => executeCommand("insertUnorderedList")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Bullet list"
                >
                  <List size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("insertOrderedList")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Numbered list"
                >
                  <ListOrdered size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("outdent")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Decrease indent"
                >
                  <Outdent size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("indent")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Increase indent"
                >
                  <Indent size={14} />
                </button>

                <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

                {/* Extra widgets: Table, Quote, Code, Smile */}
                <button
                  type="button"
                  onClick={() => alert("Insert Table")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Table"
                >
                  <TableIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "blockquote")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Blockquote"
                >
                  <Quote size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "pre")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Code block"
                >
                  <Code size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Emoji picker")}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                  title="Insert emoji"
                >
                  <Smile size={14} />
                </button>
                <span className="p-1.5 text-xs font-serif text-neutral-600 hover:bg-neutral-100 rounded cursor-pointer select-none">
                  Ω
                </span>
              </div>

              {/* Text Writing Area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className="min-h-[280px] max-h-[500px] overflow-y-auto p-4 sm:p-5 text-[#1e293b] text-sm leading-relaxed focus:outline-none font-sans"
              />

              {/* Status Bar */}
              <div className="bg-[#f8f9fa] border-t border-[#e2e8f0] px-3 py-1.5 flex items-center justify-between text-[11px] text-[#64748b]">
                <div className="flex items-center gap-2">
                  <span>p</span>
                  <span>•</span>
                  <span>{wordCount} words</span>
                </div>
                <div>Powered by Story Editor</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
