import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

/**
 * Root layout passes through — locale layout owns <html>/<body>
 * so lang + dir can follow the active locale (incl. RTL).
 */
export default function RootLayout({ children }: Props) {
  return children;
}
