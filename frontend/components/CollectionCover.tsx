"use client";

import Image from "next/image";
import type { CollectionShade } from "@/lib/collections";

type Props = {
  shades: CollectionShade[];
  alt: string;
  className?: string;
};

/**
 * Editorial cover mosaic — every shade in the series visible.
 * Layout adapts to 2 / 3 / 4 images.
 */
export function CollectionCover({ shades, alt, className = "" }: Props) {
  const n = shades.length;

  if (n === 0) return null;

  if (n === 1) {
    return (
      <div className={`relative overflow-hidden bg-anthracite ${className}`}>
        <Image
          src={shades[0].image}
          alt={alt}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
        />
      </div>
    );
  }

  if (n === 2) {
    return (
      <div
        className={`relative grid grid-cols-2 gap-px overflow-hidden bg-[#e8e2d8] ${className}`}
      >
        {shades.map((shade, i) => (
          <div
            key={shade.id}
            className="relative min-h-0 overflow-hidden bg-anthracite"
          >
            <Image
              src={shade.image}
              alt={`${alt} — ${shade.name}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ transitionDelay: `${i * 40}ms` }}
              sizes="(max-width: 640px) 46vw, 140px"
            />
          </div>
        ))}
      </div>
    );
  }

  if (n === 3) {
    const [a, b, c] = shades;
    return (
      <div
        className={`relative grid grid-cols-2 grid-rows-2 gap-px overflow-hidden bg-[#e8e2d8] ${className}`}
      >
        <div className="relative row-span-2 min-h-0 overflow-hidden bg-anthracite">
          <Image
            src={a.image}
            alt={`${alt} — ${a.name}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 46vw, 160px"
          />
        </div>
        <div className="relative min-h-0 overflow-hidden bg-anthracite">
          <Image
            src={b.image}
            alt={`${alt} — ${b.name}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 46vw, 140px"
          />
        </div>
        <div className="relative min-h-0 overflow-hidden bg-anthracite">
          <Image
            src={c.image}
            alt={`${alt} — ${c.name}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 46vw, 140px"
          />
        </div>
      </div>
    );
  }

  const quad = shades.slice(0, 4);
  return (
    <div
      className={`relative grid grid-cols-2 grid-rows-2 gap-px overflow-hidden bg-[#e8e2d8] ${className}`}
    >
      {quad.map((shade, i) => (
        <div
          key={shade.id}
          className="relative min-h-0 overflow-hidden bg-anthracite"
        >
          <Image
            src={shade.image}
            alt={`${alt} — ${shade.name}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ transitionDelay: `${i * 35}ms` }}
            sizes="(max-width: 640px) 46vw, 140px"
          />
        </div>
      ))}
    </div>
  );
}
