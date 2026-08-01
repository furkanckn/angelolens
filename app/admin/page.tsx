import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminApp } from "./AdminApp";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  return <AdminApp initiallyAuthed={authed} />;
}
