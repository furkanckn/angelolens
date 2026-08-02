"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSiteImage } from "@/components/SiteImagesProvider";

export function Hero() {
  const t = useTranslations("hero");
  const cta = useTranslations("cta");
  const alts = useTranslations("alts");
  const heroSrc = useSiteImage("hero");

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-anthracite text-cream">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroSrc}
          alt={alts("hero")}
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-anthracite/55 via-anthracite/50 to-anthracite" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-end px-5 pb-24 pt-36 text-center sm:px-6 md:px-10 md:pb-28 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xs font-medium tracking-[0.16em] text-gold-light uppercase"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-[1.12] text-cream sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <ButtonLink href="/collections" variant="primaryOnDark">
            {cta("exploreCollections")}
          </ButtonLink>
          <ButtonLink href="/opticians" variant="ghostOnDark">
            {cta("findOpticians")}
          </ButtonLink>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] font-medium tracking-[0.16em] text-cream/80 uppercase">
          {cta("scroll")}
        </span>
        <span className="block h-7 w-px bg-gold/55" aria-hidden />
      </div>
    </section>
  );
}
