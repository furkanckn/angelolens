import type { Locale } from "@/i18n/routing";

export type SiteImages = {
  hero: string;
  story: string;
  packaging: string;
  logo: string;
  ig1: string;
  ig2: string;
  ig3: string;
  ig4: string;
  ig5: string;
};

export const IMAGE_KEYS = [
  "hero",
  "story",
  "packaging",
  "logo",
  "ig1",
  "ig2",
  "ig3",
  "ig4",
  "ig5",
] as const;

export type ImageKey = (typeof IMAGE_KEYS)[number];

export const IMAGE_LABELS: Record<ImageKey, string> = {
  hero: "Hero",
  story: "Hikaye / About",
  packaging: "Paketleme kutusu",
  logo: "Logo (footer)",
  ig1: "Instagram 1",
  ig2: "Instagram 2",
  ig3: "Instagram 3",
  ig4: "Instagram 4",
  ig5: "Instagram 5",
};

export const CMS_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "manifesto", label: "Manifesto" },
  { id: "spirit", label: "Paketleme metinleri (spirit)" },
  { id: "collections", label: "Koleksiyonlar" },
  { id: "craft", label: "Craft / Neden Angelo" },
  { id: "storyTeaser", label: "Hikaye teaser" },
  { id: "lookCompare", label: "Karşılaştırma" },
  { id: "lensCare", label: "Lens bakımı" },
  { id: "instagram", label: "Instagram" },
  { id: "newsletter", label: "Bülten" },
  { id: "aboutPage", label: "Hikayemiz sayfası" },
  { id: "opticiansPage", label: "Optik bayiler" },
  { id: "contactPage", label: "İletişim" },
  { id: "instructionsPage", label: "Kullanım talimatı" },
  { id: "nav", label: "Navigasyon" },
  { id: "cta", label: "CTA butonları" },
  { id: "footer", label: "Footer" },
  { id: "meta", label: "SEO meta" },
  { id: "privacyPage", label: "Gizlilik" },
  { id: "termsPage", label: "Kullanım şartları" },
  { id: "kvkkPage", label: "KVKK" },
  { id: "cookiesPage", label: "Çerezler" },
] as const;

export type CmsSectionId = (typeof CMS_SECTIONS)[number]["id"];

export function flattenStrings(
  obj: unknown,
  prefix = "",
): { path: string; value: string }[] {
  if (typeof obj === "string") {
    return prefix ? [{ path: prefix, value: obj }] : [];
  }
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return [];
  const out: { path: string; value: string }[] = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const next = prefix ? `${prefix}.${k}` : k;
    out.push(...flattenStrings(v, next));
  }
  return out;
}

export function setByPath(
  obj: Record<string, unknown>,
  dotted: string,
  value: string,
) {
  const parts = dotted.split(".");
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = cur[p];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cur[p] = {};
    }
    cur = cur[p] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
}

export type { Locale };
