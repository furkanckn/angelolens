import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** Hostinger shared hosting → static HTML into public_html */
const isHostinger = process.env.HOSTINGER_EXPORT === "1";

const cmsHost = (() => {
  try {
    const raw =
      process.env.CMS_URL ||
      process.env.NEXT_PUBLIC_CMS_URL ||
      "http://127.0.0.1:8000";
    return new URL(raw);
  } catch {
    return new URL("http://127.0.0.1:8000");
  }
})();

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: cmsHost.protocol.replace(":", "") as "http" | "https",
    hostname: cmsHost.hostname,
    port: cmsHost.port || undefined,
    pathname: "/storage/**",
  },
];

const nextConfig: NextConfig = {
  ...(isHostinger
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
          remotePatterns,
        },
      }
    : {
        images: {
          remotePatterns,
        },
      }),
};

export default withNextIntl(nextConfig);
