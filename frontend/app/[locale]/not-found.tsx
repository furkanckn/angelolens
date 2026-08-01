import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-5xl text-ivory">404</p>
      <p className="mt-4 text-muted">{t("home")}</p>
    </div>
  );
}
