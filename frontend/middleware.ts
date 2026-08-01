import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, isValidLocale, type Locale } from "./i18n/routing";
import { countryToLocale } from "./lib/locale-map";
import { getCountryFromRequest, localeFromAcceptLanguage } from "./lib/geo";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const intlMiddleware = createMiddleware(routing);

function pathnameLocale(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : null;
}

async function resolvePreferredLocale(request: NextRequest): Promise<Locale> {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  const country = await getCountryFromRequest(request);
  if (country) {
    const mapped = countryToLocale(country);
    if (isValidLocale(mapped)) return mapped;
  }

  const fromHeader = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
    routing.locales,
    routing.defaultLocale,
  );

  return isValidLocale(fromHeader) ? fromHeader : routing.defaultLocale;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    return NextResponse.next();
  }

  const activeLocale = pathnameLocale(pathname);

  // First visit / no locale in path: geo → Accept-Language → en
  if (!activeLocale) {
    const locale = await resolvePreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, locale, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // Locale already in path (incl. manual language switch): persist preference
  const response = intlMiddleware(request);
  response.cookies.set(LOCALE_COOKIE, activeLocale, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(tr|en|de|it|ru|ar|fa)/:path*",
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
  ],
};
