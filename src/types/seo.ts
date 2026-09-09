export type SchemaType =
  | "WebSite"
  | "Organization"
  | "BlogPosting"
  | "NewsArticle"
  | "BreadcrumbList"
  | "CollectionPage";

export interface RouteDescriptor {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
}

export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  author: string;
}

export interface JsonLd {
  "@context": "https://schema.org";
  "@type": SchemaType;
  [key: string]: unknown;
}
