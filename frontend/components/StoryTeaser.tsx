"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function StoryTeaser() {
  const t = useTranslations("storyTeaser");
  const cta = useTranslations("cta");

  return (
    <section className="bg-anthracite text-cream">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20 md:py-24">
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
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/90">
            {t("body")}
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/about" variant="primaryOnDark">
              {cta("readStory")}
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
