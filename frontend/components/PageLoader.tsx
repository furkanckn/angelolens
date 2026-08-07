"use client";

import { useEffect } from "react";

/**
 * Dismisses the static #angelo-splash once fonts/assets are ready.
 * Splash HTML lives in the locale layout so it paints before hydration
 * (required for Hostinger static export).
 */
export function PageLoader() {
  useEffect(() => {
    const splash = document.getElementById("angelo-splash");
    if (!splash) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("angelo-splash-seen") === "1";
    const minMs = reduced ? 200 : seen ? 700 : 1500;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      splash.classList.add("is-done");
      sessionStorage.setItem("angelo-splash-seen", "1");
      window.setTimeout(() => {
        splash.remove();
        document.documentElement.classList.remove("angelo-splash-active");
      }, reduced ? 80 : 850);
    };

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }
        window.addEventListener("load", () => resolve(), { once: true });
      }),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, minMs);
      }),
    ]);

    void ready.then(finish);

    // Safety: never block the site if something hangs
    const failSafe = window.setTimeout(finish, 5000);
    return () => window.clearTimeout(failSafe);
  }, []);

  return null;
}
