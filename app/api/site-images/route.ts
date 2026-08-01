import { NextResponse } from "next/server";
import { loadSiteImages } from "@/lib/cms-client";

export const dynamic = "force-dynamic";

export async function GET() {
  const images = await loadSiteImages();
  return NextResponse.json(images, {
    headers: { "Cache-Control": "no-store" },
  });
}
