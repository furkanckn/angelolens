export type CollectionSlug = "vibe" | "line" | "leo" | "essence";

export type CollectionShade = {
  id: string;
  /** Brand product name — kept in English across locales */
  name: string;
  hex: string;
  image: string;
  /** Circular crop for swatch buttons */
  swatch: string;
};

export type CollectionDef = {
  slug: CollectionSlug;
  image: string;
  detailImage: string;
  shades: CollectionShade[];
};

const L = "/images/lenses";

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: "vibe",
    image: `${L}/vibe.webp`,
    detailImage: `${L}/vibe-detail.webp`,
    shades: [
      {
        id: "vibe-green",
        name: "Vibe Green",
        hex: "#4A8B52",
        image: `${L}/vibe-green.webp`,
        swatch: `${L}/shade-vibe-green.png`,
      },
      {
        id: "vibe-blue",
        name: "Vibe Blue",
        hex: "#4A6FA3",
        image: `${L}/vibe-blue.webp`,
        swatch: `${L}/shade-vibe-blue.png`,
      },
      {
        id: "vibe-gray",
        name: "Vibe Gray",
        hex: "#7A828C",
        image: `${L}/vibe-gray.webp`,
        swatch: `${L}/shade-vibe-gray.png`,
      },
      {
        id: "vibe-hazel",
        name: "Vibe Hazel",
        hex: "#A07A45",
        image: `${L}/vibe-hazel.webp`,
        swatch: `${L}/shade-vibe-hazel.png`,
      },
    ],
  },
  {
    slug: "line",
    image: `${L}/line.webp`,
    detailImage: `${L}/line-detail.webp`,
    shades: [
      {
        id: "line-green",
        name: "Line Green",
        hex: "#3A6B42",
        image: `${L}/line-green.webp`,
        swatch: `${L}/shade-line-green.png`,
      },
      {
        id: "line-blue",
        name: "Line Blue",
        hex: "#3A5F94",
        image: `${L}/line-blue.webp`,
        swatch: `${L}/shade-line-blue.png`,
      },
      {
        id: "line-olive",
        name: "Line Olive",
        hex: "#6B7540",
        image: `${L}/line-olive.webp`,
        swatch: `${L}/shade-line-olive.png`,
      },
    ],
  },
  {
    slug: "leo",
    image: `${L}/leo.webp`,
    detailImage: `${L}/leo-detail.webp`,
    shades: [
      {
        id: "leo-green",
        name: "Leo Green",
        hex: "#2F5C38",
        image: `${L}/leo-green.webp`,
        swatch: `${L}/shade-leo-green.png`,
      },
      {
        id: "leo-brown",
        name: "Leo Brown",
        hex: "#7A4A28",
        image: `${L}/leo-brown.webp`,
        swatch: `${L}/shade-leo-brown.png`,
      },
    ],
  },
  {
    slug: "essence",
    image: `${L}/essence.webp`,
    detailImage: `${L}/essence-detail.webp`,
    shades: [
      {
        id: "sage",
        name: "Sage",
        hex: "#7A8B6E",
        image: `${L}/sage.webp`,
        swatch: `${L}/shade-sage.png`,
      },
      {
        id: "zone",
        name: "Zone",
        hex: "#5A6B7A",
        image: `${L}/zone.webp`,
        swatch: `${L}/shade-zone.png`,
      },
    ],
  },
];

export function getCollection(slug: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export const COLLECTION_SLUGS = COLLECTIONS.map((c) => c.slug);
