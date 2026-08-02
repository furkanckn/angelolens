"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ImageKey, SiteImages } from "@/lib/cms-shared";
import { IMAGE_KEYS } from "@/lib/cms-shared";

const SiteImagesContext = createContext<SiteImages | null>(null);

function normalizeSrc(src: string): string {
  try {
    if (src.startsWith("/")) return src;
    const url = new URL(src);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return url.pathname;
    }
    return src;
  } catch {
    return src;
  }
}

export function SiteImagesProvider({
  initial,
  children,
}: {
  initial: SiteImages;
  children: ReactNode;
}) {
  const [images, setImages] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    const cms = (process.env.NEXT_PUBLIC_CMS_URL || "").replace(/\/$/, "");

    const apply = (data: Partial<Record<string, string>>) => {
      const merged = { ...initial };
      for (const key of IMAGE_KEYS) {
        if (typeof data[key] === "string" && data[key]) {
          merged[key] = normalizeSrc(data[key] as string);
        }
      }
      setImages(merged);
    };

    // Prefer Laravel CMS (works on Hostinger static). Fallback: same-origin API (Node/Vercel).
    const urls = [
      cms ? `${cms}/api/v1/images` : null,
      "/api/site-images",
    ].filter(Boolean) as string[];

    (async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = (await res.json()) as Partial<Record<string, string>>;
          if (!cancelled) apply(data);
          return;
        } catch {
          /* try next */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initial]);

  return (
    <SiteImagesContext.Provider value={images}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImage(key: ImageKey): string {
  const images = useContext(SiteImagesContext);
  if (!images) {
    throw new Error("useSiteImage must be used within SiteImagesProvider");
  }
  return images[key];
}

export function useSiteImages(): SiteImages {
  const images = useContext(SiteImagesContext);
  if (!images) {
    throw new Error("useSiteImages must be used within SiteImagesProvider");
  }
  return images;
}
