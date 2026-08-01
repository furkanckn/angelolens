import type { Locale } from "@/i18n/routing";

export type LocaleMeta = {
  code: Locale;
  /** ISO-style short label */
  short: string;
  /** Native / display name */
  name: string;
  /** Flag emoji */
  flag: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  tr: { code: "tr", short: "TR", name: "Türkçe", flag: "🇹🇷" },
  en: { code: "en", short: "EN", name: "English", flag: "🇬🇧" },
  de: { code: "de", short: "DE", name: "Deutsch", flag: "🇩🇪" },
  it: { code: "it", short: "IT", name: "Italiano", flag: "🇮🇹" },
  ru: { code: "ru", short: "RU", name: "Русский", flag: "🇷🇺" },
  ar: { code: "ar", short: "AR", name: "العربية", flag: "🇸🇦" },
  fa: { code: "fa", short: "FA", name: "فارسی", flag: "🇮🇷" },
};
