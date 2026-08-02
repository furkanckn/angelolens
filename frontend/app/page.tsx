import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Hostinger / static: no middleware — send `/` to default locale */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
