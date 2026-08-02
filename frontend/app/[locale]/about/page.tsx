import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <article className="bg-cream">
      <div className="border-b border-line-soft bg-anthracite text-cream">
        <div className="mx-auto max-w-3xl px-5 pt-32 pb-14 text-center sm:px-6 sm:pt-36 sm:pb-16 md:px-10 md:pt-40 md:pb-20">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-light uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 md:px-10 md:py-20">
        <p className="font-display text-xl leading-snug text-ink sm:text-2xl md:text-[1.75rem]">
          {t("intro")}
        </p>
        <div className="gold-rule mx-auto my-8 w-16 md:my-10" />
        <div className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
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
