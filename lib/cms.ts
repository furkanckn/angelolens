import { promises as fs } from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import {
  IMAGE_KEYS,
  type ImageKey,
  type SiteImages,
} from "@/lib/cms-shared";

export * from "@/lib/cms-shared";

const root = process.cwd();

function imagesPath() {
  return path.join(root, "content", "images.json");
}

function messagesPath(locale: Locale) {
  return path.join(root, "messages", `${locale}.json`);
}

export async function readSiteImages(): Promise<SiteImages> {
  const raw = await fs.readFile(imagesPath(), "utf8");
  return JSON.parse(raw) as SiteImages;
}

export async function writeSiteImages(images: SiteImages) {
  await fs.writeFile(imagesPath(), JSON.stringify(images, null, 2) + "\n", "utf8");
}

export async function getSiteImage(key: ImageKey): Promise<string> {
  const images = await readSiteImages();
  return images[key];
}

export async function readMessages(locale: Locale) {
  const raw = await fs.readFile(messagesPath(locale), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function writeMessages(locale: Locale, data: Record<string, unknown>) {
  if (!locales.includes(locale)) {
    throw new Error("Invalid locale");
  }
  await fs.writeFile(
    messagesPath(locale),
    JSON.stringify(data, null, 2) + "\n",
    "utf8",
  );
}

export async function saveUploadedImage(
  key: ImageKey,
  buffer: Buffer,
  ext: string,
): Promise<string> {
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(
    ext.toLowerCase(),
  )
    ? ext.toLowerCase()
    : ".jpg";
  const dir = path.join(root, "public", "images", "cms");
  await fs.mkdir(dir, { recursive: true });
  const filename = `${key}-${Date.now()}${safeExt}`;
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buffer);
  const publicPath = `/images/cms/${filename}`;
  const images = await readSiteImages();
  images[key] = publicPath;
  await writeSiteImages(images);
  return publicPath;
}

// re-export for typecheck that IMAGE_KEYS used in upload
void IMAGE_KEYS;
