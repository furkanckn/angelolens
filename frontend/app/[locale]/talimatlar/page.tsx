import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InstructionsDiagrams } from "@/components/InstructionsDiagrams";
import { PageShell } from "@/components/ui/Section";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

const PACK_SECTIONS = [
  "insert",
  "remove",
  "warnings",
  "contents",
  "disinfect",
  "wash",
] as const;

const DETAIL_SECTIONS = [
  "hygiene",
  "orientation",
  "solutions",
  "case",
  "daily",
  "whenToStop",
  "disclaimer",
] as const;

const DIAGRAM_KEYS = [
  "insert1",
  "insert2",
  "insert3",
  "remove1",
  "remove2",
  "remove3",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "instructionsPage" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: {
      title: t("title"),
      description: t("intro"),
      url: `${SITE_URL}/${locale}/talimatlar`,
      siteName: meta("siteName"),
      locale,
      type: "website",
    },
  };
}

export default async function InstructionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("instructionsPage");

  const diagramLabels = Object.fromEntries(
    DIAGRAM_KEYS.map((key) => [key, t(`diagrams.${key}`)]),
  ) as Record<(typeof DIAGRAM_KEYS)[number], string>;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Ambalaj metni — görseldeki yazının okunaklı dökümü */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:items-start lg:gap-14">
          <div className="space-y-9">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t("packTitle")}
            </h2>

            {PACK_SECTIONS.map((key) => {
              const items = t.raw(`pack.${key}.items`) as string[];
              return (
                <section key={key}>
                  <h3 className="font-display text-xl text-ink sm:text-[1.35rem]">
                    {t(`pack.${key}.title`)}
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted sm:text-base">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <p className="border-s-2 border-gold/40 ps-4 text-sm leading-relaxed text-muted italic">
              {t("packageInsertNote")}
            </p>
          </div>

          <aside className="lg:sticky lg:top-36">
            <h2 className="font-display text-xl text-ink sm:text-2xl">
              {t("diagramsTitle")}
            </h2>
            <div className="mt-5">
              <InstructionsDiagrams
                labels={diagramLabels}
                caption={t("diagramsCaption")}
              />
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-line-soft pt-14">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
            {t("detailEyebrow")}
          </p>
          <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
            {t("detailTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t("detailIntro")}</p>

          <div className="mt-10 space-y-9">
            {DETAIL_SECTIONS.map((key) => {
              const items = t.raw(`detail.${key}.items`) as string[] | undefined;
              const body =
                key === "disclaimer" ? t("detail.disclaimer.body") : null;
              return (
                <section key={key}>
                  <h3 className="font-display text-xl text-ink sm:text-[1.35rem]">
                    {t(`detail.${key}.title`)}
                  </h3>
                  {body ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {body}
                    </p>
                  ) : null}
                  {Array.isArray(items) && items.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted sm:text-base">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
