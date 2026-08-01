"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSiteImage } from "@/components/SiteImagesProvider";

export function StoryTeaser() {
  const t = useTranslations("storyTeaser");
  const cta = useTranslations("cta");
  const alts = useTranslations("alts");
  const storySrc = useSiteImage("story");

  return (
    <section className="bg-anthracite text-cream">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative min-h-[44vh] sm:min-h-[52vh] lg:min-h-[560px]">
          <Image
            src={storySrc}
            alt={alts("story")}
            fill
            unoptimized
            className="object-cover object-[center_22%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-anthracite/25 via-transparent to-transparent max-lg:bg-gradient-to-t max-lg:from-anthracite/40 max-lg:via-transparent"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 md:px-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-xs font-medium tracking-[0.16em] text-gold-light uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/90">
              {t("body")}
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="primaryOnDark">
                {cta("readStory")}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
