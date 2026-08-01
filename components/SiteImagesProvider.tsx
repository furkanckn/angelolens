"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ImageKey, SiteImages } from "@/lib/cms-shared";

const SiteImagesContext = createContext<SiteImages | null>(null);

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
    fetch("/api/site-images")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) setImages(data as SiteImages);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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
