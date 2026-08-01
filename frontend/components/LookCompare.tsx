"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { COLLECTIONS } from "@/lib/collections";
import { Section, SectionIntro } from "@/components/ui/Section";

const LOOKS = COLLECTIONS.flatMap((c) =>
  c.shades.map((s) => ({
    id: s.id,
    name: s.name,
    hex: s.hex,
    swatch: s.swatch,
    before: `/images/lenses/compare/${s.id}-before.webp`,
    after: `/images/lenses/compare/${s.id}-after.webp`,
  })),
);

export function LookCompare() {
  const t = useTranslations("lookCompare");
  const [activeId, setActiveId] = useState(LOOKS[0]?.id ?? "vibe-green");
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const current = LOOKS.find((l) => l.id === activeId) ?? LOOKS[0];

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    frameRef.current?.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  if (!current) return null;

  return (
    <Section id="look" className="bg-cream">
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-12">
        <div
          ref={frameRef}
          className="relative mx-auto aspect-square w-full max-w-[560px] touch-none select-none overflow-hidden bg-anthracite sm:aspect-[5/4] sm:max-w-3xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="img"
          aria-labelledby={labelId}
        >
          <Image
            key={`after-${current.id}`}
            src={current.after}
            alt=""
            fill
            unoptimized
            draggable={false}
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              key={`before-${current.id}`}
              src={current.before}
              alt=""
              fill
              unoptimized
              draggable={false}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-px bg-cream/85"
            style={{ left: `${pos}%` }}
            aria-hidden
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/90 bg-cream shadow-[0_10px_28px_rgba(0,0,0,0.4)]">
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                className="text-anthracite"
                aria-hidden
              >
                <path
                  d="M6 1L1 6l5 5M12 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <input
            type="range"
            min={2}
            max={98}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-label={t("sliderLabel")}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-anthracite/75 via-anthracite/25 to-transparent px-4 pb-3.5 pt-10 sm:px-5 sm:pb-4">
            <span className="text-[10px] font-medium tracking-[0.16em] text-cream/90 uppercase">
              {t("before")}
            </span>
            <span className="text-[10px] font-medium tracking-[0.16em] text-gold-light uppercase">
              {t("after")}
            </span>
          </div>
        </div>

        <p id={labelId} className="sr-only">
          {t("sliderLabel")}: {current.name}
        </p>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted sm:text-base">
          {t("body")}
        </p>

        <p className="mt-8 text-center text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          {t("chooseShade")}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {LOOKS.map((look) => {
            const isActive = look.id === activeId;
            return (
              <button
                key={look.id}
                type="button"
                onClick={() => {
                  setActiveId(look.id);
                  setPos(52);
                }}
                title={look.name}
                aria-label={look.name}
                aria-pressed={isActive}
                className="relative h-11 w-11 overflow-hidden rounded-full transition-transform duration-elegant hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                style={{
                  boxShadow: isActive
                    ? `0 0 0 2px #F7F4EF, 0 0 0 3px ${look.hex}`
                    : "0 0 0 1px rgba(26,26,26,0.12)",
                }}
              >
                <Image
                  src={look.swatch}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover scale-110"
                  sizes="44px"
                />
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-center font-display text-lg text-ink">
          {current.name}
        </p>
      </div>
    </Section>
  );
}
