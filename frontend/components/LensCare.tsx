"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionIntro } from "@/components/ui/Section";

const KEYS = ["sleep", "share", "water", "exam"] as const;

const ICONS: Record<(typeof KEYS)[number], ReactNode> = {
  sleep: (
    <>
      <path d="M14 4a7 7 0 106.5 9.5A6 6 0 0114 4z" />
      <path d="M17.5 3.5c.4 1.2 1.3 2.1 2.5 2.5-1.2.4-2.1 1.3-2.5 2.5-.4-1.2-1.3-2.1-2.5-2.5 1.2-.4 2.1-1.3 2.5-2.5z" />
    </>
  ),
  share: (
    <>
      <circle cx="9" cy="10" r="3.2" />
      <circle cx="15.5" cy="10" r="3.2" />
      <path d="M4.5 19c.8-2.4 2.6-3.8 4.5-3.8M19.5 19c-.8-2.4-2.6-3.8-4.5-3.8" />
      <path d="M12 8.5v7M10 12h4" strokeLinecap="round" />
    </>
  ),
  water: (
    <>
      <path d="M12 3.5c2.8 3.2 5.5 6.2 5.5 9.2a5.5 5.5 0 11-11 0c0-3 2.7-6 5.5-9.2z" />
      <path d="M9.5 14.5c.6 1.2 1.5 1.8 2.5 1.8" strokeLinecap="round" />
    </>
  ),
  exam: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M4 9h16M9 5V3.5M15 5V3.5" strokeLinecap="round" />
      <path d="M8 13h3M13 13h3M8 16.5h8" strokeLinecap="round" />
    </>
  ),
};

export function LensCare() {
  const t = useTranslations("lensCare");

  return (
    <Section className="bg-surface">
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {KEYS.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="flex flex-col items-center gap-4 text-center sm:gap-5"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-gold-deep"
              aria-hidden
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                {ICONS[key]}
              </svg>
            </div>
            <div className="max-w-sm">
              <h3 className="font-display text-xl text-ink sm:text-[1.35rem]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {t(`items.${key}.body`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
