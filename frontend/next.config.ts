import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: cmsHost.protocol.replace(":", "") as "http" | "https",
        hostname: cmsHost.hostname,
        port: cmsHost.port || undefined,
        pathname: "/storage/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
