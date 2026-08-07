"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_META } from "@/lib/locales";

type Props = {
  /** Visual tone when header sits on dark hero */
  onDark?: boolean;
  /** Match header nav link size (flag + short code) */
  compact?: boolean;
  /** Circle control mirroring the hamburger (flag above, code below) */
  circle?: boolean;
  /** Override trigger classes (e.g. shared nav pill) */
  triggerClassName?: string;
  className?: string;
};

export function LanguageSwitcher({
  onDark = false,
  compact = false,
  circle = false,
  triggerClassName,
  className = "",
}: Props) {
  const t = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = LOCALE_META[locale];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(code: Locale) {
    setOpen(false);

    // Static Hostinger exports have no middleware response to persist this.
    // Remember the visitor's explicit choice for the next visit to `/`.
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    // eslint-disable-next-line react-hooks/immutability -- Static hosting has no response middleware to set this preference cookie.
    document.cookie =
      `NEXT_LOCALE=${code}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;

    if (code === locale) return;
    router.replace(pathname, { locale: code });
  }

  const circleClass = `relative inline-flex h-10 w-10 flex-col items-center justify-center gap-0.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
    onDark
      ? open
        ? "border-cream/40 bg-cream/10 text-cream"
        : "border-cream/25 bg-cream/5 text-cream hover:bg-cream/10"
      : open
        ? "border-gold-deep/40 bg-surface text-ink"
        : "border-line-soft bg-cream text-ink hover:border-gold-deep/40"
  }`;

  const triggerClass =
    triggerClassName ??
    (circle
      ? circleClass
      : compact
        ? `box-border inline-flex h-8 min-h-8 max-h-8 items-center justify-center gap-1 rounded-full border px-3 text-[11px] leading-none font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
            onDark
              ? open
                ? "border-cream/35 bg-cream/10 text-gold-light"
                : "border-cream/20 text-cream/85 hover:border-cream/35 hover:bg-cream/10 hover:text-cream"
              : open
                ? "border-gold-deep/35 bg-surface text-gold-deep"
                : "border-line-soft text-ink/70 hover:border-gold-deep/35 hover:bg-surface hover:text-ink"
          }`
        : `inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
            onDark
              ? "border-cream/25 bg-cream/5 text-cream hover:bg-cream/10"
              : "border-line-soft bg-cream text-ink hover:border-gold-deep/40"
          }`);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className={triggerClass}
        aria-label={t("language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        {circle ? (
          <>
            <span className="text-[13px] leading-none" aria-hidden>
              {current.flag}
            </span>
            <span className="text-[8px] font-medium leading-none tracking-[0.12em] uppercase">
              {current.short}
            </span>
          </>
        ) : compact ? (
          <>
            <span className="text-[11px] leading-none" aria-hidden>
              {current.flag}
            </span>
            <span className="leading-none">{current.short}</span>
          </>
        ) : (
          <>
            <span className="text-base leading-none" aria-hidden>
              {current.flag}
            </span>
            <span className="tracking-[0.08em]">{current.short}</span>
            <Chevron open={open} />
          </>
        )}
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("language")}
          className={`absolute z-50 mt-2 min-w-[11.5rem] overflow-hidden rounded-xl border border-line-soft bg-cream py-1.5 text-ink shadow-[0_12px_40px_rgba(14,13,12,0.14)] ${
            circle || compact ? "start-0" : "end-0"
          }`}
        >
          {locales.map((code) => {
            const meta = LOCALE_META[code];
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  lang={code}
                  onClick={() => select(code)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none ${
                    active ? "bg-surface text-gold-deep" : "text-ink"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {meta.flag}
                  </span>
                  <span className="flex-1">{meta.name}</span>
                  <span className="text-[11px] tracking-[0.1em] text-muted">
                    {meta.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
