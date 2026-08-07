"use client";

import { useEffect } from "react";

/**
 * Dismisses the static #angelo-splash once the page is ready.
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
    let seen = false;
    try {
      seen = sessionStorage.getItem("angelo-splash-seen") === "1";
    } catch {
      seen = false;
    }
    const minMs = reduced ? 150 : seen ? 500 : 1100;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      splash.classList.add("is-done");
      try {
        sessionStorage.setItem("angelo-splash-seen", "1");
      } catch {
        /* private mode */
      }
      window.setTimeout(() => {
        splash.remove();
        document.documentElement.classList.remove("angelo-splash-active");
      }, reduced ? 50 : 700);
    };

    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, 600);
      }),
    ]);

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
      window.setTimeout(resolve, 1200);
    });

    void Promise.all([
      fontsReady,
      pageReady,
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, minMs);
      }),
    ]).then(finish);

    const failSafe = window.setTimeout(finish, 2800);
    return () => window.clearTimeout(failSafe);
  }, []);

  return null;
}
