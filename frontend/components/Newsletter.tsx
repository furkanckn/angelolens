"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const contact = useTranslations("contactPage");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <Section className="border-y border-line-soft bg-surface" tight>
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>

          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              if (!fd.get("consent")) {
                setError(true);
                setSent(false);
                return;
              }
              setError(false);
              setSent(true);
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                {t("placeholder")}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder={t("placeholder")}
                className="min-h-11 w-full border border-line-soft bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-light focus:border-gold-deep"
              />
              <button
                type="submit"
                className="min-h-11 shrink-0 border border-gold-deep bg-gold-deep px-6 text-xs font-medium tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {t("submit")}
              </button>
            </div>
            <label className="flex items-start gap-3 text-left text-xs leading-relaxed text-muted sm:text-sm">
              <input
                type="checkbox"
                name="consent"
                value="1"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#a67c3d]"
                onChange={() => setError(false)}
              />
              <span>
                {t("consentNewsletter")}{" "}
                <Link
                  href="/kvkk"
                  className="underline decoration-gold/50 underline-offset-2 hover:text-gold-deep"
                >
                  {contact("kvkkLink")}
                </Link>
              </span>
            </label>
            {error ? (
              <p className="text-left text-sm text-bordeaux" role="alert">
                {contact("consentRequired")}
              </p>
            ) : null}
            {sent ? (
              <p className="text-sm text-muted" role="status">
                {contact("success")}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
