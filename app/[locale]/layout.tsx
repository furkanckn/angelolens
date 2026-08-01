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
import { SkipToContent } from "@/components/SkipToContent";
import { SiteImagesProvider } from "@/components/SiteImagesProvider";
import { isRtlLocale, routing } from "@/i18n/routing";
import { loadSiteImages } from "@/lib/cms-client";
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

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: `${SITE_URL}/${locale}`,
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
    },
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
      className={`${display.variable} ${body.variable} ${arabic.variable} ${persian.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
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
