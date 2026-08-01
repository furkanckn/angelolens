import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadSiteImages } from "@/lib/cms-client";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: {
      title: t("title"),
      description: t("intro"),
      url: `${SITE_URL}/${locale}/about`,
      siteName: meta("siteName"),
      locale,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const alts = await getTranslations("alts");
  const images = await loadSiteImages();
  const storySrc = images.story;

  return (
    <article className="bg-cream">
      <div className="relative h-[42vh] min-h-[260px] bg-anthracite sm:h-[48vh]">
        <Image
          src={storySrc}
          alt={alts("story")}
          fill
          unoptimized
          className="object-cover object-[center_35%] opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-5 pb-10 sm:px-6 md:px-10 md:pb-12">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-light uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display mt-3 text-3xl text-cream sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 md:px-10 md:py-20">
        <p className="font-display text-xl leading-snug text-ink sm:text-2xl md:text-[1.75rem]">
          {t("intro")}
        </p>
        <div className="gold-rule my-8 w-16 md:my-10" />
        <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
        <p className="mt-12 text-xs font-medium tracking-[0.14em] text-gold-deep uppercase">
          {t("closing")}
        </p>
      </div>
    </article>
  );
}
