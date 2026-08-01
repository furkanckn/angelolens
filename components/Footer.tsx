"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSiteImage } from "@/components/SiteImagesProvider";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const year = new Date().getFullYear();
  const logoSrc = useSiteImage("logo");

  const mainLinks = [
    ["/collections", "collections"],
    ["/about", "about"],
    ["/opticians", "opticians"],
    ["/contact", "contact"],
  ] as const;

  const legalLinks = [
    ["/privacy", "privacy"],
    ["/kvkk", "kvkk"],
    ["/cookies", "cookies"],
    ["/terms", "terms"],
  ] as const;

  return (
    <footer className="border-t border-line-soft bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:px-10 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative h-8 w-[156px]">
              <Image
                src={logoSrc}
                alt={a11y("brandHome")}
                fill
                className="object-contain object-left"
                sizes="156px"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
          </div>

          <nav className="flex flex-col gap-1 text-sm text-muted">
            <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink uppercase">
              {t("explore")}
            </p>
            {mainLinks.map(([href, key]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-1 py-2 transition-colors hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {nav(key)}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-1 text-sm text-muted">
            <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink uppercase">
              {t("legal")}
            </p>
            {legalLinks.map(([href, key]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-1 py-2 transition-colors hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-5 lg:items-end">
            <a
              href="https://instagram.com/angelolens"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-soft text-muted transition-colors hover:border-gold-deep/40 hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
              </svg>
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-10 border-t border-line-soft pt-6 text-xs text-muted">
          <p>{t("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
