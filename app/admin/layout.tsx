import type { ReactNode } from "react";
import "./admin.css";

export const metadata = {
  title: "Angelo Lens — Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="admin-body">{children}</body>
    </html>
  );
}
