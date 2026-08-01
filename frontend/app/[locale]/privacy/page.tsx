import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/LegalDocument";

type Props = {
  params: Promise<{ locale: string }>;
};

const KEYS = [
  "intro",
  "controller",
  "data",
  "purpose",
  "cookies",
  "retention",
  "share",
  "rights",
  "contact",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="privacyPage" keys={KEYS} />;
}
