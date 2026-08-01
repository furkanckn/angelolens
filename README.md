# Angelo Lens

Ultra-luxury coloured contact lens brand showcase for [angelolens.com](https://angelolens.com).

**Not e-commerce** — brand image only. No cart, pricing, or purchase CTAs. Cosmetic / non-prescription positioning for this site.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 — cream `#F7F4EF` + anthracite `#0E0D0C` + gold accents (AA-checked)
- Framer Motion (+ `prefers-reduced-motion`)
- next-intl — EN / TR / DE / IT / RU / AR / FA (RTL for AR & FA)
- Typography via `next/font`: Cormorant Garamond + Manrope; Noto Naskh Arabic / Vazirmatn
- Geo locale redirect via middleware (`NEXT_LOCALE` cookie, 1 year)

## Develop

```bash
npm run dev
```

Optional: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_SITE_URL`.

## Accessibility & performance notes

- Skip link, focus outlines, localized image `alt` strings in all 7 locales
- Sticky header opacifies on scroll; language switcher always visible (VPN/geo mismatches are expected)
- Images via `next/image`; fonts via `next/font` (CLS-safe)
- Contrast targets WCAG AA (cream↔anthracite, ink/muted/gold-deep on cream)

### Lighthouse (suggested)

After `npm run build && npm start`, run Chrome Lighthouse on `/en` and `/tr` (mobile):

1. Performance — confirm LCP image priority on hero; keep SVG placeholders until real assets
2. Accessibility — axe/Lighthouse: contrast, names, landmarks (`#main-content`)
3. SEO — localized title/description/OG; hreflang via `alternates.languages`

## Brand / legal guardrails

- Italian positioning is **design heritage / narrative** only — no fake Italian company address, registration number, or confusingly similar third-party marks
- No unverified medical claims; comfort language only
- Geo IP can mis-detect (VPN); manual language switcher is intentional

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home (hero → manifesto → collections → craft → story → IG → newsletter) |
| `/collections` · `/collections/[slug]` | Gallery + detail + swatches |
| `/about` · `/opticians` · `/contact` | Story, optician locator, contact |
| `/privacy` · `/terms` | Legal |
