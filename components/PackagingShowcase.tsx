"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSiteImage } from "@/components/SiteImagesProvider";

export function PackagingShowcase() {
  const spirit = useTranslations("spirit");
  const alts = useTranslations("alts");
  const packaging = useTranslations("craft.items.packaging");
  const packagingSrc = useSiteImage("packaging");

  return (
    <section className="relative overflow-hidden bg-anthracite text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 28% 48%, rgba(176,141,87,0.28), transparent 68%), radial-gradient(ellipse 45% 35% at 85% 85%, rgba(247,244,239,0.05), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl lg:max-w-none">
            <Image
              src={packagingSrc}
              alt={alts("packaging")}
              fill
              quality={95}
              className="object-contain object-center p-4 sm:p-8 lg:p-10"
              style={{
                filter:
                  "drop-shadow(0 28px 50px rgba(0,0,0,0.55)) drop-shadow(0 8px 18px rgba(176,141,87,0.18))",
              }}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="flex flex-col justify-center px-5 pb-16 pt-2 text-center sm:px-8 lg:col-span-5 lg:px-10 lg:pb-24 lg:pt-24 lg:text-start"
        >
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold-light uppercase">
            {packaging("title")}
          </p>

          <div className="mt-7 h-px w-12 bg-gold/50 max-lg:mx-auto" aria-hidden />

          <blockquote className="mt-8 space-y-4">
            <p className="font-display text-[1.65rem] leading-[1.2] text-cream sm:text-3xl md:text-[2.15rem]">
              {spirit("line1")}
            </p>
            <p className="font-display text-[1.65rem] leading-[1.2] text-cream/90 sm:text-3xl md:text-[2.15rem]">
              {spirit("line2")}
            </p>
            <p className="font-display text-xl leading-snug text-gold-light sm:text-2xl">
              {spirit("line3")}
            </p>
          </blockquote>

          <p className="mx-auto mt-10 max-w-sm text-sm leading-relaxed text-cream/55 lg:mx-0">
            {packaging("body")}
          </p>
          <p className="mx-auto mt-3 max-w-sm text-xs tracking-[0.08em] text-cream/40 lg:mx-0">
            {spirit("note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
