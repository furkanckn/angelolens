import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { ARTICLES } from "@/lib/articles";
import { COLLECTION_SLUGS } from "@/lib/collections";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "",
  "/about",
  "/collections",
  "/contact",
  "/opticians",
  "/deneme",
  "/talimatlar",
  "/journal",
  "/privacy",
  "/terms",
  "/kvkk",
  "/cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      const isHome = path === "";
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: isHome ? "weekly" : path === "/journal" ? "weekly" : "monthly",
        priority: isHome ? 1 : path === "/collections" || path === "/journal" ? 0.9 : 0.7,
      });
    }

    for (const slug of COLLECTION_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/collections/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }

    for (const article of ARTICLES) {
      entries.push({
        url: `${SITE_URL}/${locale}/journal/${article.slug}`,
        lastModified: new Date(article.updatedAt ?? article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
