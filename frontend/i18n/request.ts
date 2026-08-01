import { getRequestConfig } from "next-intl/server";
import { routing, isValidLocale, type Locale } from "./routing";
import { loadMessages } from "@/lib/cms-client";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  const activeLocale = locale as Locale;

  return {
    locale: activeLocale,
    messages: await loadMessages(activeLocale),
  };
});
