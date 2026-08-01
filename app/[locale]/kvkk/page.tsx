import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/LegalDocument";

type Props = {
  params: Promise<{ locale: string }>;
};

const KEYS = [
  "intro",
  "controller",
  "categories",
  "purposes",
  "method",
  "transfer",
  "retention",
  "rights",
  "application",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kvkkPage" });
  return { title: t("title") };
}

export default async function KvkkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument namespace="kvkkPage" keys={KEYS} />;
}
