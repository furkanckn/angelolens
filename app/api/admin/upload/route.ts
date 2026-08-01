import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { IMAGE_KEYS, saveUploadedImage, type ImageKey } from "@/lib/cms";
import path from "path";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const key = String(form.get("key") || "");
  const file = form.get("file");

  if (!IMAGE_KEYS.includes(key as ImageKey)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const publicPath = await saveUploadedImage(key as ImageKey, buffer, ext);
  return NextResponse.json({ path: publicPath });
}
