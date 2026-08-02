import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  COLLECTION_SLUGS,
  getCollection,
  type CollectionSlug,
} from "@/lib/collections";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  const t = await getTranslations({ locale, namespace: "collections" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const key = collection.slug;
  return {
    title: t(`${key}.name`),
    description: t(`${key}.description`),
    openGraph: {
      title: t(`${key}.name`),
      description: t(`${key}.description`),
      url: `${SITE_URL}/${locale}/collections/${key}`,
      siteName: meta("siteName"),
      locale,
      type: "website",
      images: [{ url: collection.shades[0]?.image ?? collection.detailImage, alt: t(`${key}.name`) }],
    },
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const collection = getCollection(slug);
  if (!collection) notFound();

  const key = collection.slug as CollectionSlug;
  const t = await getTranslations("collections");
  const cta = await getTranslations("cta");

  return (
    <article className="bg-cream">
      <header className="border-b border-line-soft bg-cream">
        <div className="mx-auto max-w-6xl px-5 pt-32 pb-14 text-center sm:px-6 sm:pt-36 md:px-10 md:pt-40 md:pb-20">
          <p className="text-[11px] font-medium tracking-brand text-gold-deep uppercase">
            {t(`${key}.tagline`)}
          </p>
          <h1 className="font-display mt-4 text-4xl text-ink sm:text-5xl md:text-6xl">
            {t(`${key}.name`)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t(`${key}.editorial`)}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {t(`${key}.description`)}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:px-10 md:py-20">
        <p className="text-center text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          {t("shadesLabel")}
        </p>

        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:gap-12">
          {collection.shades.map((shade) => (
            <figure key={shade.id} className="group">
              <div className="relative aspect-square overflow-hidden bg-anthracite">
                <Image
                  src={shade.image}
                  alt={shade.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 92vw, 45vw"
                  priority={shade.id === collection.shades[0]?.id}
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: shade.hex }}
                  aria-hidden
                />
                <span className="font-display text-2xl text-ink sm:text-[1.75rem]">
                  {shade.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-xl border-t border-line-soft pt-10 text-center">
          <p className="text-[11px] font-medium tracking-elegant text-muted uppercase">
            {t("suitsLabel")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">
            {t(`${key}.suits`)}
          </p>
          <Link
            href="/collections"
            className="mt-8 inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-elegant text-gold-deep uppercase transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
            {cta("exploreCollections")}
          </Link>
        </div>
      </section>
    </article>
  );
}
