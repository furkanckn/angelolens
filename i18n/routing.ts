import { defineRouting } from "next-intl/routing";

export const locales = ["en", "tr", "de", "it", "ru", "ar", "fa"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar", "fa"];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
