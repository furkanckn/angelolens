import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "primaryOnDark" | "ghostOnDark";

const styles: Record<Variant, string> = {
  primary:
    "border border-gold-deep bg-gold-deep text-cream hover:bg-ink hover:border-ink",
  secondary:
    "border border-gold-deep/70 text-gold-deep hover:bg-gold-deep hover:text-cream",
  ghost: "text-ink/80 hover:text-gold-deep underline-offset-4 hover:underline",
  primaryOnDark:
    "border border-gold-light bg-gold-light text-anthracite hover:bg-cream hover:border-cream",
  ghostOnDark: "text-cream hover:text-gold-light",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Consistent CTA — prefer this in new sections */
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-elegant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
