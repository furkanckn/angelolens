"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";

export function Manifesto() {
  const t = useTranslations("manifesto");

  return (
    <Section className="bg-cream" tight>
      <div className="mx-auto max-w-2xl text-center">
        <div className="gold-rule mx-auto mb-10 w-16" />
        {[t("line1"), t("line2"), t("line3")].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className={`font-display text-balance text-ink ${
              i === 2
                ? "mt-6 text-xl text-gold-deep sm:text-2xl"
                : i === 1
                  ? "mt-5 text-2xl leading-snug sm:text-3xl"
                  : "text-2xl leading-snug sm:text-3xl"
            }`}
          >
            {line}
          </motion.p>
        ))}
        <div className="gold-rule mx-auto mt-10 w-16" />
      </div>
    </Section>
  );
}
