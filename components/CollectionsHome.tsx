"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { COLLECTIONS, type CollectionSlug } from "@/lib/collections";
import { CollectionCover } from "@/components/CollectionCover";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section, SectionIntro } from "@/components/ui/Section";

const ACCENT: Record<CollectionSlug, string> = {
  vibe: "bg-lens-emerald",
  line: "bg-lens-sapphire",
  leo: "bg-lens-amber",
  essence: "bg-lens-hazel",
};

export function CollectionsHome() {
  const t = useTranslations("collections");
  const cta = useTranslations("cta");
  const alts = useTranslations("alts");

  return (
    <Section id="collections" className="bg-surface">
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {COLLECTIONS.map((collection, index) => (
          <motion.div
            key={collection.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <Link
              href={`/collections/${collection.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <div className="relative">
                <CollectionCover
                  shades={collection.shades}
                  alt={alts(collection.slug)}
                  className="aspect-square"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite/85 via-anthracite/35 to-transparent px-4 pb-4 pt-16">
                  <h3 className="font-display text-3xl tracking-wide text-cream sm:text-[2rem]">
                    {t(`${collection.slug}.name`)}
                  </h3>
                </div>
              </div>

              <div
                className={`mt-5 h-px w-10 ${ACCENT[collection.slug]} opacity-80`}
              />

              <p className="mt-3 text-[11px] font-medium tracking-[0.18em] text-gold-deep uppercase">
                {t(`${collection.slug}.tagline`)}
              </p>

              <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1">
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
              <span className="mt-4 inline-block text-[11px] font-medium tracking-elegant text-gold-deep uppercase transition-colors group-hover:text-ink">
                {cta("exploreCollection")}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <ButtonLink href="/collections" variant="secondary">
          {cta("exploreCollections")}
        </ButtonLink>
      </div>
    </Section>
  );
}
