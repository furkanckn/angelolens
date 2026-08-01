import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#main-content"
      className="absolute left-4 top-4 z-[100] -translate-y-[200%] rounded-sm bg-anthracite px-4 py-3 text-sm font-medium tracking-elegant text-cream uppercase outline-none transition-transform focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {t("skipToContent")}
    </a>
  );
}
