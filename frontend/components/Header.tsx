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
    // Closing after a client-side route change is intentional UI synchronization.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    { href: "/talimatlar", label: t("instructions") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const solid = !isHome || scrolled || open;
  const onDark = isHome && !solid;
  const logoSrc = onDark
    ? "/images/brand/logo-white.png"
    : "/images/brand/logo-black.png";

  const pillBase =
    "box-border inline-flex h-8 min-h-8 max-h-8 items-center justify-center gap-1 rounded-full border px-3 text-[11px] leading-none font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold xl:px-3.5";

  const pillIdle = onDark
    ? "border-cream/20 text-cream/85 hover:border-cream/35 hover:bg-cream/10 hover:text-cream"
    : "border-line-soft text-ink/70 hover:border-gold-deep/35 hover:bg-surface hover:text-ink";

  const pillActive = onDark
    ? "border-cream/35 bg-cream/10 text-gold-light"
    : "border-gold-deep/35 bg-surface text-gold-deep";

  const circleBtn = onDark
    ? "border-cream/25 bg-cream/5 text-cream hover:bg-cream/10"
    : "border-line-soft bg-cream text-ink hover:border-gold-deep/40";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? "border-b border-line-soft bg-cream/97 text-ink shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-cream"
      }`}
    >
      <div className="relative mx-auto max-w-6xl px-5 py-3.5 sm:px-6 md:px-10 md:py-4">
        <div className="relative flex h-12 items-center justify-between sm:h-14">
          <div className="z-10 flex w-10 shrink-0 items-center justify-start">
            <LanguageSwitcher onDark={onDark} circle />
          </div>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-0 block h-10 w-[160px] -translate-x-1/2 -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-11 sm:w-[180px] md:h-12 md:w-[200px]"
            aria-label={a11y("brandHome")}
          >
            <Image
              src={logoSrc}
              alt={a11y("brandHome")}
              fill
              className="object-contain object-center"
              sizes="200px"
              priority
            />
          </Link>

          <div className="z-10 flex w-10 shrink-0 items-center justify-end">
            <button
              type="button"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${circleBtn}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? a11y("closeMenu") : a11y("openMenu")}
            >
              <HamburgerIcon open={open} />
            </button>
            <span className="hidden h-10 w-10 lg:block" aria-hidden />
          </div>
        </div>

        <nav
          className="mt-3 hidden flex-wrap items-center justify-center gap-1.5 lg:flex"
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
                className={`${pillBase} ${active ? pillActive : pillIdle}`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

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
          <nav
            className="flex flex-col items-stretch gap-1 text-center"
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
