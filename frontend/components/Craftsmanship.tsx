"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionIntro } from "@/components/ui/Section";

const KEYS = ["design", "comfort", "palette", "packaging"] as const;

const ICONS = {
  design: <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />,
  comfort: (
    <path d="M12 21s-7-4.5-7-10a4 4 0 018 0c0 5.5-7 10-7 10zm0 0s7-4.5 7-10a4 4 0 00-8 0" />
  ),
  palette: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
    </>
  ),
  packaging: <path d="M4 8l8-4 8 4v8l-8 4-8-4V8zm8 4l8-4M12 12v8M12 12L4 8" />,
};

export function Craftsmanship() {
  const t = useTranslations("craft");

  return (
    <Section className="bg-cream">
      <SectionIntro eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {KEYS.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className="rounded-sm border border-line-soft bg-surface/60 p-5 text-center sm:p-6"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="mx-auto text-gold-deep"
              aria-hidden
            >
              {ICONS[key]}
            </svg>
            <h3 className="font-display mt-4 text-lg text-ink sm:text-xl">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {t(`items.${key}.body`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
