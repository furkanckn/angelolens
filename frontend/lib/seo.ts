import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Absolute URL for a locale + path (`path` like `/about` or ``). */
export function localeUrl(locale: string, path = ""): string {
  const clean = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const clean = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${clean}`]),
  );
  return {
    ...languages,
    "x-default": `${SITE_URL}/en${clean}`,
  };
}

type PageMetaInput = {
  locale: string;
  /** Path after locale, e.g. `/about` or `/journal/slug` */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: PageMetaInput): Metadata {
  const url = localeUrl(locale, path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      locale,
      url,
      siteName: SITE_NAME,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-black.png`,
    email: "info.angelolens@gmail.com",
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: [...routing.locales],
  };
}

export function articleJsonLd(input: {
  locale: string;
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}) {
  const url = localeUrl(input.locale, input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/logo-black.png`,
      },
    },
    mainEntityOfPage: url,
    inLanguage: input.locale,
  };
}
