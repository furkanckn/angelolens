"use client";

import { useState } from "react";
import Image from "next/image";
import type { CollectionShade } from "@/lib/collections";

type Props = {
  shades: CollectionShade[];
  label: string;
};

export function ColorSwatches({ shades, label }: Props) {
  const [active, setActive] = useState(shades[0]?.id);
  const current = shades.find((s) => s.id === active) ?? shades[0];

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
        {label}
      </p>

      {current ? (
        <div className="mt-5">
          {/* Cap CSS size near ~500px so 1000px source stays sharp on retina */}
          <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] overflow-hidden bg-anthracite sm:max-w-[380px]">
            <Image
              key={current.id}
              src={current.image}
              alt={current.name}
              fill
              unoptimized
              className="object-cover"
              sizes="420px"
            />
          </div>
          <p className="mt-4 text-center font-display text-lg text-ink">
            {current.name}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {shades.map((shade) => {
          const isActive = active === shade.id;
          return (
            <button
              key={shade.id}
              type="button"
              onMouseEnter={() => setActive(shade.id)}
              onFocus={() => setActive(shade.id)}
              onClick={() => setActive(shade.id)}
              aria-label={shade.name}
              aria-pressed={isActive}
              title={shade.name}
              className="relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-elegant hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              style={{
                boxShadow: isActive
                  ? `0 0 0 2px #F7F4EF, 0 0 0 3px ${shade.hex}, 0 0 16px ${shade.hex}55`
                  : `0 0 0 1px rgba(26,26,26,0.12)`,
              }}
            >
              <Image
                src={shade.swatch}
                alt=""
                fill
                unoptimized
                className="object-cover scale-[1.08]"
                sizes="48px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
