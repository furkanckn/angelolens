import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTIONS, type CollectionSlug } from "@/lib/collections";
import { CollectionCover } from "@/components/CollectionCover";
import { PageShell } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const ACCENT: Record<CollectionSlug, string> = {
  vibe: "bg-lens-emerald",
  line: "bg-lens-sapphire",
  leo: "bg-lens-amber",
  essence: "bg-lens-hazel",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return pageMetadata({
    locale,
    path: "/collections",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collections");
  const cta = await getTranslations("cta");
  const alts = await getTranslations("alts");

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-gold-deep uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <div className="relative">
              <CollectionCover
                shades={collection.shades}
                alt={alts(collection.slug)}
                className="aspect-square"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite/85 via-anthracite/35 to-transparent px-4 pb-4 pt-16 text-center">
                <h2 className="font-display text-3xl tracking-wide text-cream sm:text-[2rem]">
                  {t(`${collection.slug}.name`)}
                </h2>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center text-center">
              <div
                className={`h-px w-10 ${ACCENT[collection.slug]} opacity-80`}
                aria-hidden
              />
              <p className="mt-3 text-[11px] font-medium tracking-[0.18em] text-gold-deep uppercase">
                {t(`${collection.slug}.tagline`)}
              </p>
              <ul className="mt-3 flex flex-wrap justify-center gap-x-2.5 gap-y-1">
                {collection.shades.map((shade) => (
                  <li
                    key={shade.id}
                    className="text-xs tracking-wide text-muted"
                  >
                    <span
                      className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ backgroundColor: shade.hex }}
                      aria-hidden
                    />
                    {shade.name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`${collection.slug}.description`)}
              </p>
              <span className="mt-4 inline-block text-xs font-medium tracking-[0.14em] text-gold-deep uppercase">
                {cta("exploreCollection")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
