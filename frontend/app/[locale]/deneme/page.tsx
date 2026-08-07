import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "denemePage" });
  return pageMetadata({
    locale,
    path: "/deneme",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function DenemePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("denemePage");

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink sm:text-5xl md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
      </div>
    </PageShell>
  );
}
