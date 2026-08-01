import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { CollectionsHome } from "@/components/CollectionsHome";
import { Craftsmanship } from "@/components/Craftsmanship";
import { LensCare } from "@/components/LensCare";
import { PackagingShowcase } from "@/components/PackagingShowcase";
import { LookCompare } from "@/components/LookCompare";
import { StoryTeaser } from "@/components/StoryTeaser";
import { InstagramStrip } from "@/components/InstagramStrip";
import { Newsletter } from "@/components/Newsletter";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PackagingShowcase />
      <CollectionsHome />
      <LookCompare />
      <Manifesto />
      <StoryTeaser />
      <Craftsmanship />
      <LensCare />
      <InstagramStrip />
      <Newsletter />
    </>
  );
}
