import { NextResponse } from "next/server";
import { loadSiteImages } from "@/lib/cms-client";

export const dynamic = "force-static";

/** Used on Node/Vercel. Hostinger static export uses CMS URL from the client instead. */
export async function GET() {
  const images = await loadSiteImages();
  return NextResponse.json(images);
}
