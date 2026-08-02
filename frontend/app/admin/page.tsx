"use client";

import { useEffect } from "react";

/** Legacy /admin → Laravel Filament (works with static export) */
export default function AdminRedirectPage() {
  const base = (
    process.env.NEXT_PUBLIC_CMS_URL || "http://127.0.0.1:8000"
  ).replace(/\/$/, "");
  const href = `${base}/admin`;

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <p>
        Yönlendiriliyor…{" "}
        <a href={href}>Admin paneli</a>
      </p>
    </main>
  );
}
