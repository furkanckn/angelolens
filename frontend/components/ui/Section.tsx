import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Extra vertical rhythm; default comfortable for reading */
  tight?: boolean;
};

/**
 * Shared section shell — use for new homepage / page blocks
 * so spacing and max-width stay consistent.
 */
export function Section({ children, id, className = "", tight }: Props) {
  return (
    <section
      id={id}
      className={`px-5 sm:px-6 md:px-10 ${
        tight ? "py-14 md:py-20" : "py-16 md:py-24"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

type IntroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  dark,
  className = "",
}: IntroProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-medium tracking-[0.16em] uppercase ${
            dark ? "text-gold-light" : "text-gold-deep"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-cream/90" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type PageProps = {
  children: ReactNode;
  className?: string;
};

/** Top padding clears the fixed header on inner pages */
export function PageShell({ children, className = "" }: PageProps) {
  return (
    <div
      className={`bg-cream pt-32 pb-16 sm:pt-36 md:pt-40 md:pb-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-10">
        {children}
      </div>
    </div>
  );
}
