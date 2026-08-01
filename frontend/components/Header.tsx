"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/collections", label: t("collections") },
    { href: "/about", label: t("about") },
    { href: "/opticians", label: t("opticians") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const solid = !isHome || scrolled || open;
  const onDark = isHome && !solid;
  const logoSrc = onDark
    ? "/images/brand/logo-white.png"
    : "/images/brand/logo-black.png";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? "border-b border-line-soft bg-cream/97 text-ink shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-cream"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6 md:px-10 md:py-3.5">
        <Link
          href="/"
          className="relative block h-8 w-[148px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-9 sm:w-[168px]"
          aria-label={a11y("brandHome")}
        >
          <Image
            src={logoSrc}
            alt={a11y("brandHome")}
            fill
            className="object-contain object-left"
            sizes="168px"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={a11y("mainNav")}
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                  onDark
                    ? active
                      ? "bg-cream/10 text-gold-light"
                      : "text-cream/85 hover:bg-cream/10 hover:text-cream"
                    : active
                      ? "bg-surface text-gold-deep"
                      : "text-ink/70 hover:bg-surface hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher onDark={onDark} />

          <button
            type="button"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              onDark
                ? "border-cream/25 bg-cream/5 text-cream hover:bg-cream/10"
                : "border-line-soft bg-cream text-ink hover:border-gold-deep/40"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? a11y("closeMenu") : a11y("openMenu")}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`border-t px-5 py-5 sm:px-6 ${
            solid ? "border-line-soft bg-cream" : "border-gold/15 bg-anthracite"
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label={a11y("mainNav")}>
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-[15px] font-medium tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    solid
                      ? active
                        ? "bg-surface text-gold-deep"
                        : "text-ink hover:bg-surface"
                      : active
                        ? "bg-cream/10 text-gold-light"
                        : "text-cream hover:bg-cream/5"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-4" aria-hidden>
      <span
        className={`absolute start-0 h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
          open ? "top-[6px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute start-0 top-[6px] h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
          open ? "opacity-0 scale-x-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute start-0 h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
          open ? "top-[6px] -rotate-45" : "top-[12px]"
        }`}
      />
    </span>
  );
}
