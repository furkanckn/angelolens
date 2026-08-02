import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  return (
    <article className="bg-cream">
      <div className="border-b border-line-soft bg-anthracite text-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-light uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl">
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
