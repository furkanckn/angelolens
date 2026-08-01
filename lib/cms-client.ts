import { readFile } from "fs/promises";
import path from "path";
import type { Locale } from "@/i18n/routing";
import type { SiteImages } from "@/lib/cms-shared";
import { IMAGE_KEYS } from "@/lib/cms-shared";

const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || "").replace(
  /\/$/,
  "",
);

function deepMerge(
  base: Record<string, unknown>,
  overlay: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(
        base[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}

async function readLocalMessages(locale: Locale) {
  const file = path.join(process.cwd(), "messages", `${locale}.json`);
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

async function readLocalImages(): Promise<SiteImages> {
  const file = path.join(process.cwd(), "content", "images.json");
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as SiteImages;
}

export async function loadMessages(locale: Locale): Promise<Record<string, unknown>> {
  const local = await readLocalMessages(locale);

  if (!CMS_URL) return local;

  try {
    const res = await fetch(`${CMS_URL}/api/v1/messages/${locale}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return local;
    const json = (await res.json()) as { messages?: Record<string, unknown> };
    if (!json.messages || typeof json.messages !== "object") return local;
    return deepMerge(local, json.messages);
  } catch {
    return local;
  }
}

function normalizeImageSrc(src: string): string {
  try {
    if (src.startsWith("/")) return src;
    const url = new URL(src);
    const frontend = (
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ).replace(/\/$/, "");
    const frontendHost = new URL(frontend).host;
    // Same-origin Next public assets → keep path for next/image
    if (url.host === frontendHost || url.host === "localhost:3000") {
      return url.pathname;
    }
    return src;
  } catch {
    return src;
  }
}

export async function loadSiteImages(): Promise<SiteImages> {
  const local = await readLocalImages();

  if (!CMS_URL) return local;

  try {
    const res = await fetch(`${CMS_URL}/api/v1/images`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return local;
    const json = (await res.json()) as Partial<Record<string, string>>;
    const merged = { ...local };
    for (const key of IMAGE_KEYS) {
      if (typeof json[key] === "string" && json[key]) {
        merged[key] = normalizeImageSrc(json[key] as string);
      }
    }
    return merged;
  } catch {
    return local;
  }
}

export function cmsAdminUrl(): string {
  return `${CMS_URL || "http://127.0.0.1:8000"}/admin`;
}
