"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionIntro } from "@/components/ui/Section";
import { useSiteImages } from "@/components/SiteImagesProvider";
import type { ImageKey } from "@/lib/cms-shared";

const FRAMES: { key: ImageKey; alt: "ig1" | "ig2" | "ig3" | "ig4" | "ig5" }[] = [
  { key: "ig1", alt: "ig1" },
  { key: "ig2", alt: "ig2" },
  { key: "ig3", alt: "ig3" },
  { key: "ig4", alt: "ig4" },
  { key: "ig5", alt: "ig5" },
];

export function InstagramStrip() {
  const t = useTranslations("instagram");
  const alts = useTranslations("alts");
  const images = useSiteImages();

  return (
    <Section className="bg-cream" tight>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <SectionIntro eyebrow={t("eyebrow")} title={t("title")} />
        <a
          href="https://instagram.com/angelolens"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {t("handle")}
        </a>
      </div>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
        {FRAMES.map((frame, i) => (
          <motion.a
            key={frame.key}
            href="https://instagram.com/angelolens"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group relative aspect-square min-w-[70%] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-w-[40%] md:min-w-0"
          >
            <Image
              src={images[frame.key]}
              alt={alts(frame.alt)}
              fill
              unoptimized
              className="object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 70vw, 220px"
            />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
