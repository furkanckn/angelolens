import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isValidLocale, type Locale } from "@/i18n/routing";
import { CMS_SECTIONS, readMessages, setByPath, writeMessages } from "@/lib/cms";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "tr";
  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  const section = searchParams.get("section") || "hero";
  const allowed = CMS_SECTIONS.some((s) => s.id === section);
  if (!allowed) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  const messages = await readMessages(locale as Locale);
  return NextResponse.json({
    locale,
    section,
    data: messages[section] ?? {},
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as {
    locale?: string;
    section?: string;
    updates?: Record<string, string>;
  };
  const locale = body.locale || "tr";
  const section = body.section || "";
  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  if (!CMS_SECTIONS.some((s) => s.id === section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const messages = await readMessages(locale as Locale);
  const current =
    messages[section] && typeof messages[section] === "object"
      ? (messages[section] as Record<string, unknown>)
      : {};

  for (const [dotted, value] of Object.entries(body.updates || {})) {
    setByPath(current, dotted, value);
  }
  messages[section] = current;
  await writeMessages(locale as Locale, messages);
  return NextResponse.json({ ok: true });
}
