import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ARTICLES, getArticleCopy } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/ui/Section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journalPage" });
  return pageMetadata({
    locale,
    path: "/journal",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function JournalIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journalPage");

  const sorted = [...ARTICLES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
      </div>

      <ul className="mx-auto mt-14 max-w-2xl space-y-8">
        {sorted.map((article) => {
          const copy = getArticleCopy(article, locale);
          return (
            <li key={article.slug}>
              <article className="border-t border-line-soft pt-8 text-center sm:text-start">
                <time
                  dateTime={article.publishedAt}
                  className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
                >
                  {article.publishedAt}
                </time>
                <h2 className="font-display mt-2 text-2xl text-ink sm:text-[1.75rem]">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="transition-colors hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {copy.title}
                  </Link>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mx-0 sm:text-base">
                  {copy.description}
                </p>
                <Link
                  href={`/journal/${article.slug}`}
                  className="mt-4 inline-block text-[11px] font-medium tracking-[0.14em] text-gold-deep uppercase transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {t("readArticle")}
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
