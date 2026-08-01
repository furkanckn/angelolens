import { redirect } from "next/navigation";
import { cmsAdminUrl } from "@/lib/cms-client";

/** Legacy Next admin → Laravel Filament panel */
export default function AdminRedirectPage() {
  redirect(cmsAdminUrl());
}
