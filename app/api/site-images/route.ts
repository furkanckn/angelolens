import { NextResponse } from "next/server";
import { readSiteImages } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const images = await readSiteImages();
  return NextResponse.json(images, {
    headers: { "Cache-Control": "no-store" },
  });
}
