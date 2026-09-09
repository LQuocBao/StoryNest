# StoryNovel AU — High-Monetization Serialized Fiction & Editorial Publishing Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An enterprise-grade, high-performance web publishing application specifically designed for serialized fiction, dramatic novels, viral storytelling, and programmatic publisher monetization (Google AdSense, Amazon Shopping, Native Content & Sticky Video units).

Built from the ground up with **Next.js 16 App Router**, **React 19 Server Components**, **Tailwind CSS v4**, full **Schema.org Structured Data**, and an **Editorial Admin CMS**.

---

## 🚀 Key Architectural Highlights

### 1. High-Performance Reader Experience
* **Zero Layout Shift (CLS: 0.00)**: Strict aspect-ratio containers for cover images and thumbnail slots prevent cumulative layout shift during image decoding.
* **Progressive Serialized Story Loading**: Multi-part chapter rendering with smooth client-side *"CONTINUE READING"* state management.
* **Focused Editorial Byline**: Clean, distraction-free published date metadata (`Posted [Date]`) matching modern viral publication standards.
* **Community Engagement**: Interactive reader comment threads, identity customization, and a comprehensive story reporting modal for moderation.

### 2. Full-Funnel Programmatic Monetization Engine (AdSense / Affiliate / Native)
* **Shopping Feed Carousel**: Horizontal multi-product affiliate widget featuring the signature high-contrast **`DEMO AD`** badge, dynamic pricing, star ratings, and merchant tags.
* **In-Article Display Banners**: Responsive 728x90 & responsive display ad slots with AdChoices indicators, dismiss simulation, and clean CTA actions.
* **Native Recommendation Grid**: 3-column sponsored content placement below reader feedback (Taboola/Outbrain style).
* **Sticky Floating Video / Display Player**: Persistent bottom-right floating unit (`fixed bottom-4 right-4`) with minimize/close controls and sound toggle.
* **Interactive Client Demo Controls**: All ad slots feature `✕` dismiss and `Restore Demo` actions for prospective client reviews.

### 3. Integrated Editorial Admin CMS (`/admin`)
* **Executive Dashboard (`/admin/dashboard`)**: Key performance metrics (Total Stories, Total Categories, Total Reads, Reader Likes, Pending Moderation) and engagement analytics charts.
* **Story Management (`/admin/stories`)**: Filterable, searchable data table of all stories with direct live links (`/story/[slug]`), part counts, and engagement stats.
* **WYSIWYG Story Creator (`/admin/stories/create`)**:
  * Dual image input (direct URL input or instant file upload with live preview).
  * Auto-slug generation from headline.
  * Category selector & Tag chips.
  * Chapter serialization selectors (`Prev chapter` / `Next chapter`).
  * Full-featured **TinyMCE-style Rich Text Editor** (Menubar: *File, Edit, View, Insert, Format, Tools, Table, Help*; Toolbar: formatting, alignments, lists, tables, media embeds, blockquotes, code, and live word counter).
* **Taxonomy & Category Management (`/admin/categories`)**: Manage core genre categories (*Drama, Outback & Farm, Family Secrets, Revenge & Justice, Romance*).
* **Comment & Report Moderation (`/admin/comments`, `/admin/reports`)**: Actionable moderation workflows (Approve, Hide, Resolve, Dismiss).

### 4. Technical SEO & Rich Snippets
* **Automated JSON-LD Structured Data**: Emits `NewsArticle` / `Article` schema with publisher info, author credits, ISO-8601 timestamps, and breadcrumbs for Google Rich Results.
* **OpenGraph & Twitter Cards**: Dynamic social sharing cards generated per story.
* **RSS 2.0 Feed**: Fully syndicated `/feed.xml` route for automated aggregators and indexers.
* **Robots & Sitemap**: Production-ready canonical link derivation and crawling rules.

---

## 📐 System Architecture

```
StoryNovel Platform
 ├── Public Reader Frontend (Edge / SSR)
 │    ├── Homepage (Feed & Category Filters) -> /
 │    ├── Story Detail & Serialized Reader  -> /story/[slug]
 │    ├── Category Archive                  -> /category/[slug]
 │    ├── RSS 2.0 Syndicate Feed            -> /feed.xml
 │    └── Legal & Policy Pages              -> /terms, /privacy, /contact
 │
 ├── Programmatic Monetization Layer
 │    ├── Top In-Article Display Ads
 │    ├── Mid-Content Shopping Carousels (Red AD Badge)
 │    ├── Inter-Part Transition Ad Units
 │    ├── Post-Comment Native Grid
 │    └── Floating Sticky Video Player (Bottom-Right)
 │
 └── Editorial Admin CMS (Protected /admin)
      ├── Dashboard Analytics (/admin/dashboard)
      ├── Story Management & WYSIWYG Editor (/admin/stories)
      ├── Category Manager (/admin/categories)
      ├── Reader Comments Moderation (/admin/comments)
      ├── Story Reports & Safety (/admin/reports)
      ├── Staff & Role Directory (/admin/users)
      └── System & Site Settings (/admin/settings)
```

---

## 📁 Repository Structure

```
src/
├── app/
│   ├── admin/                 # Editorial Admin CMS Routes
│   │   ├── categories/        # Category taxonomy manager
│   │   ├── comments/          # Reader comment moderation
│   │   ├── dashboard/         # Metrics, KPI cards & engagement analytics
│   │   ├── login/             # Branded admin sign-in
│   │   ├── reports/           # Story report moderation
│   │   ├── settings/          # System, reading defaults & SEO switches
│   │   ├── stories/           # Story data table & actions
│   │   │   └── create/        # TinyMCE-styled WYSIWYG Story Creator
│   │   └── users/             # Staff & role directory
│   ├── category/[slug]/       # Category archive feed
│   ├── story/[slug]/          # Serialized reading page & structured data
│   ├── feed.xml/              # Automated RSS 2.0 feed generator
│   ├── layout.tsx             # Root layout with Tailwind v4 & typography
│   ├── page.tsx               # Homepage story listing & hero feed
│   └── globals.css            # Tailwind CSS v4 @theme design tokens
├── components/
│   ├── admin/                 # Admin layout, sidebar, header, tables & modals
│   ├── ads/                   # DemoAdSlot & FloatingStickyAd components
│   ├── ui/                    # Reusable UI primitives (Button, Badge, Modal, Input)
│   ├── Footer.tsx             # Semantic footer with AdSense compliance links
│   ├── Header.tsx             # Responsive public navigation header
│   ├── RelatedStories.tsx     # Algorithm-driven recommendation cards
│   ├── StoryCard.tsx          # Homepage feed card with anti-CLS image boxes
│   └── StoryReader.tsx        # Serialized fiction reading engine
├── data/
│   └── stories.ts             # Source-of-truth dataset & taxonomies
├── lib/
│   ├── api.ts                 # Type-safe API methods & admin stats aggregation
│   └── mockData.ts            # Mock database adapters & seeds
├── services/
│   └── seo/                   # Canonical builder, JSON-LD schemas & metadata
└── types/
    ├── admin.ts               # CMS interfaces & stats types
    ├── seo.ts                 # Metadata & OpenGraph types
    └── story.ts               # Single source-of-truth Story & StoryPart models
```

---

## 🛠️ Technology Stack

| Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.3.4` | Server Components, Streaming, Optimized Bundles |
| **Runtime** | React | `19.2.8` | Component model & concurrent features |
| **Styling** | Tailwind CSS | `v4.0.0` | Design tokens via `@theme`, zero-runtime CSS |
| **Type Safety** | TypeScript | `5.x` | Strict mode end-to-end typing |
| **Icons** | Lucide React | `1.42.0` | Modern, lightweight SVG iconography |
| **Utilities** | `clsx`, `tailwind-merge` | Latest | Conditional styling and class deduplication |
| **Deployment** | Vercel Serverless | Edge/Node | Global CDN caching, instant invalidation |

---

## 💻 Getting Started Locally

### Prerequisites
* **Node.js**: `v18.18.0` or `v20.x+` (recommended: `v20.x LTS`)
* **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`

### 1. Clone the repository
```bash
git clone https://github.com/LQuocBao/StoryNest.git
cd StoryNovel2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
* **Public Homepage**: `http://localhost:3000`
* **Reading Page Demo**: `http://localhost:3000/story/it-hurt-so-he-stopped-mountain-revealed-why`
* **Editorial Admin CMS**: `http://localhost:3000/admin`
* **Story Creator**: `http://localhost:3000/admin/stories/create`
* **RSS Feed**: `http://localhost:3000/feed.xml`

### 4. Verify TypeScript & Production Build
```bash
# Type check with 0 errors
npx tsc --noEmit

# Test production build
npm run build
```

---

## ☁️ Deployment on Vercel

This repository is pre-configured for zero-configuration, instant deployment on **Vercel**:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete StoryNovel publishing platform and admin CMS"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository (`StoryNest` or `StoryNovel2`).
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your live production website and admin portal will be live in under 60 seconds.

---

## 🛡️ Best Practices & Quality Standards

* **Semantic HTML5**: Native `<article>`, `<main>`, `<aside>`, `<nav>`, and `<header>` tags for accessibility (a11y) and search engine crawlers.
* **Google AdSense Policy Compliance**: Clear privacy policies, terms of service, editorial contact information, and publisher disclaimer blocks in `Footer.tsx`.
* **Mobile-First Responsive Layout**: 100% fluid layouts across mobile (360px+), tablet, and desktop (1440px+).
* **Strict Type Safety**: Fully typed interfaces across all data models, components, and API boundaries.

---

## 👨‍💻 Maintainer & Engineering

Engineered by **Quoc Bao** & Team.
Licensed under the [MIT License](LICENSE).
