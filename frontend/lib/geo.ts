import type { NextRequest } from "next/server";

/**
 * Resolve ISO 3166-1 alpha-2 country code from the incoming request.
 * Prefers Vercel Edge geolocation headers; falls back to optional IP APIs.
 */
export async function getCountryFromRequest(
  request: NextRequest,
): Promise<string | null> {
  const vercelCountry =
    request.headers.get("x-vercel-ip-country") ||
    // Legacy / typed geo (when available on the platform)
    (request as NextRequest & { geo?: { country?: string } }).geo?.country;

  if (vercelCountry && vercelCountry !== "XX") {
    return vercelCountry.toUpperCase();
  }

  // Non-Vercel hosts: optional IP lookup (Edge-safe, fail soft)
  const ip = extractClientIp(request);
  if (!ip || isPrivateIp(ip)) {
    return null;
  }

  try {
    return await lookupCountryByIp(ip);
  } catch {
    return null;
  }
}

function extractClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }
  return request.headers.get("x-real-ip");
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.2") ||
    ip.startsWith("172.3")
  );
}

/**
 * Swap this implementation if you change IP geolocation providers.
 * Uses ipapi.co as a lightweight free-tier friendly option.
 */
async function lookupCountryByIp(ip: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: controller.signal,
      headers: { Accept: "text/plain" },
    });

    if (!res.ok) return null;

    const text = (await res.text()).trim().toUpperCase();
    if (text.length === 2 && /^[A-Z]{2}$/.test(text)) {
      return text;
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Parse Accept-Language into the best matching supported locale.
 */
export function localeFromAcceptLanguage(
  header: string | null,
  supported: readonly string[],
  fallback = "en",
): string {
  if (!header) return fallback;

  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";");
      const q = qPart?.includes("q=")
        ? Number.parseFloat(qPart.split("q=")[1] || "1")
        : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const exact = supported.find((l) => l === tag);
    if (exact) return exact;

    const base = tag.split("-")[0];
    const baseMatch = supported.find((l) => l === base);
    if (baseMatch) return baseMatch;
  }

  return fallback;
}
