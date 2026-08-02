/** Original Angelo Lens line diagrams for insert / remove steps. */

const STEPS = [
  "insert1",
  "insert2",
  "insert3",
  "remove1",
  "remove2",
  "remove3",
] as const;

function Diagram({ id }: { id: (typeof STEPS)[number] }) {
  switch (id) {
    case "insert1":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <ellipse cx="72" cy="42" rx="28" ry="18" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="72" cy="42" rx="12" ry="12" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="72" cy="42" r="5" fill="currentColor" />
          <path
            d="M22 78c2-18 10-30 22-36"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="46" cy="40" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M38 86c4-10 10-16 18-20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "insert2":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <path
            d="M28 55c8-22 28-34 48-28 14 4 22 18 22 32 0 18-14 30-30 30-20 0-36-14-40-34z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M52 48c6-2 14-2 20 2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <ellipse cx="68" cy="52" rx="14" ry="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M54 70h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "insert3":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <ellipse cx="62" cy="40" rx="30" ry="20" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="62" cy="40" rx="13" ry="13" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="62" cy="40" r="5.5" fill="currentColor" />
          <path
            d="M28 78c4-14 12-24 24-30"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="54" cy="46" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M78 72c6-8 10-14 12-22"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "remove1":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <ellipse cx="62" cy="38" rx="30" ry="20" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="62" cy="38" rx="13" ry="13" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="62" cy="38" r="5.5" fill="currentColor" />
          <path
            d="M40 78c6-16 14-26 26-32"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="68" cy="48" r="6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M68 54v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "remove2":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <ellipse cx="62" cy="36" rx="28" ry="18" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="62" cy="36" rx="12" ry="12" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="62" cy="36" r="5" fill="currentColor" />
          <path
            d="M34 80c4-14 12-24 22-30"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            d="M88 80c-4-14-12-24-22-30"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <ellipse cx="62" cy="52" rx="8" ry="4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "remove3":
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden className="h-full w-full">
          <rect x="28" y="48" width="64" height="36" rx="4" stroke="currentColor" strokeWidth="1.4" />
          <line x1="60" y1="48" x2="60" y2="84" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="44" cy="66" r="10" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="76" cy="66" r="10" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M44 28c0 8 0 14 0 20"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <ellipse cx="44" cy="26" rx="8" ry="4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
  }
}

type Props = {
  labels: Record<(typeof STEPS)[number], string>;
  caption: string;
};

export function InstructionsDiagrams({ labels, caption }: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {STEPS.map((id) => (
          <figure
            key={id}
            className="flex flex-col items-center rounded-sm border border-line-soft bg-surface px-3 py-4"
          >
            <div className="h-24 w-full text-ink sm:h-28">
              <Diagram id={id} />
            </div>
            <figcaption className="mt-2 text-center text-[11px] leading-snug text-muted">
              {labels[id]}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">{caption}</p>
    </div>
  );
}
