"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const cta = useTranslations("cta");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const field =
    "mt-2 min-h-11 w-full border border-line-soft bg-cream px-4 text-sm text-ink outline-none transition-colors focus:border-gold-deep";

  return (
    <form
      className="space-y-5"
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
      <div>
        <label htmlFor="name" className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {t("name")}
        </label>
        <input id="name" name="name" required className={field} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {t("emailLabel")}
        </label>
        <input id="email" name="email" type="email" required className={field} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${field} min-h-[8rem] resize-y py-3`}
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          value="1"
          className="mt-1 h-4 w-4 shrink-0 accent-[#a67c3d]"
          onChange={() => setError(false)}
        />
        <span>
          {t("consent")}{" "}
          <Link href="/privacy" className="underline decoration-gold/50 underline-offset-2 hover:text-gold-deep">
            {t("privacyLink")}
          </Link>
          {" · "}
          <Link href="/kvkk" className="underline decoration-gold/50 underline-offset-2 hover:text-gold-deep">
            {t("kvkkLink")}
          </Link>
        </span>
      </label>
      {error ? (
        <p className="text-sm text-bordeaux" role="alert">
          {t("consentRequired")}
        </p>
      ) : null}
      <button
        type="submit"
        className="min-h-11 border border-gold-deep bg-gold-deep px-7 text-xs font-medium tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {cta("send")}
      </button>
      {sent && (
        <p className="text-sm text-muted" role="status">
          {t("success")}
        </p>
      )}
    </form>
  );
}
