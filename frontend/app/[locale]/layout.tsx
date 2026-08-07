import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Naskh_Arabic,
  Vazirmatn,
} from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageLoader } from "@/components/PageLoader";
import { SkipToContent } from "@/components/SkipToContent";
import { SiteImagesProvider } from "@/components/SiteImagesProvider";
import { isRtlLocale, routing } from "@/i18n/routing";
import { loadSiteImages } from "@/lib/cms-client";
import {
  languageAlternates,
  localeUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rtl-ar",
  display: "swap",
});

const persian = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-rtl-fa",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: t("siteName") }],
    creator: t("siteName"),
    publisher: t("siteName"),
    alternates: {
      canonical: localeUrl(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale,
      url: localeUrl(locale),
      siteName: t("siteName"),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/images/og-default.svg",
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/images/og-default.svg"],
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
    ...(verification
      ? { verification: { google: verification } }
      : {}),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const siteImages = await loadSiteImages();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${display.variable} ${body.variable} ${arabic.variable} ${persian.variable} h-full antialiased angelo-splash-active`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <div
          id="angelo-splash"
          className="angelo-splash"
          role="status"
          aria-live="polite"
          aria-label="Angelo Lens"
        >
          <div className="angelo-splash__inner">
            {/* Plain img: paints before Next/Image JS on static Hostinger */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="angelo-splash__logo"
              src="/images/brand/logo-white.png"
              alt="Angelo Lens"
              width={220}
              height={52}
              decoding="async"
            />
            <div className="angelo-splash__rule" aria-hidden />
            <p className="angelo-splash__mark">Angelo Lens</p>
            <div className="angelo-splash__bar" aria-hidden />
          </div>
        </div>
        <PageLoader />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <NextIntlClientProvider messages={messages}>
          <SiteImagesProvider initial={siteImages}>
            <SkipToContent />
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SiteImagesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
