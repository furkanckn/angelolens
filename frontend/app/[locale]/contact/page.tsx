import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/ui/Section";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: {
      title: t("title"),
      description: t("intro"),
      url: `${SITE_URL}/${locale}/contact`,
      siteName: meta("siteName"),
      locale,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <PageShell>
      <div className="max-w-xl">
        <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">{t("intro")}</p>
        <a
          href={`mailto:${t("email")}`}
          className="mt-6 inline-block text-sm text-gold-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {t("email")}
        </a>
      </div>
    </PageShell>
  );
}
