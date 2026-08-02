import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ARTICLE_SLUGS,
  getArticle,
  getArticleCopy,
} from "@/lib/articles";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/ui/Section";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const copy = getArticleCopy(article, locale);
  return pageMetadata({
    locale,
    path: `/journal/${slug}`,
    title: copy.title,
    description: copy.description,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("journalPage");
  const copy = getArticleCopy(article, locale);
  const path = `/journal/${slug}`;

  return (
    <PageShell>
      <JsonLd
        data={articleJsonLd({
          locale,
          path,
          title: copy.title,
          description: copy.description,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
        })}
      />

      <article className="mx-auto max-w-2xl">
        <header className="text-center">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-display mt-3 text-3xl text-ink sm:text-4xl md:text-[2.75rem]">
            {copy.title}
          </h1>
          <time
            dateTime={article.publishedAt}
            className="mt-4 block text-[11px] tracking-[0.14em] text-muted uppercase"
          >
            {article.publishedAt}
          </time>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            {copy.description}
          </p>
        </header>

        <div className="mt-12 space-y-10 text-start">
          {copy.sections.map((section, index) => (
            <section key={section.heading ?? `s-${index}`}>
              {section.heading ? (
                <h2 className="font-display text-xl text-ink sm:text-2xl">
                  {section.heading}
                </h2>
              ) : null}
              <div
                className={`space-y-4 text-base leading-relaxed text-muted ${
                  section.heading ? "mt-3" : ""
                }`}
              >
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 border-t border-line-soft pt-8 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.14em] text-gold-deep uppercase transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
            {t("backToJournal")}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
