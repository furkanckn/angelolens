import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fairPage" });
  return pageMetadata({
    locale,
    path: "/fuar",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function FairPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fairPage");
  const cta = await getTranslations("cta");

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

        <div className="mt-12 rounded-sm border border-line-soft bg-surface px-6 py-12 sm:px-10">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
            {cta("comingSoon")}
          </p>
          <h2 className="font-display mt-3 text-2xl text-ink">
            {t("comingSoonTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {t("comingSoonBody")}
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact" variant="primary">
              {cta("contactUs")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
