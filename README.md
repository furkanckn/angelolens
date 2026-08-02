# Angelo Lens

Ultra-luxury coloured contact lens brand showcase for [angelolens.com](https://angelolens.com).

**Not e-commerce** — brand image only. No cart, pricing, or purchase CTAs.

## Repo layout

```
angelolens/
  frontend/   Next.js site (Vercel Root Directory = frontend)
  backend/    Laravel + Filament CMS
  assets/     local working files (not required for production)
```

## Stack

- **frontend:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + next-intl
- **backend:** Laravel + Filament (texts + images CMS)

## Develop

```bash
# CMS
cd backend && php artisan serve --host=127.0.0.1 --port=8000

# Site
cd frontend
cp .env.example .env.local   # CMS_URL=http://127.0.0.1:8000
npm install
npm run dev
```

Or from repo root:

```bash
npm run cms
npm run dev
```

Admin: http://127.0.0.1:8000/admin  
Login: `info.angelolens@gmail.com` / `angelo`  
Details: [backend/README.md](backend/README.md) · [frontend](frontend/)

## Vercel

1. Import this GitHub repo
2. **Root Directory** = `frontend`
3. Framework: Next.js
4. Env: `CMS_URL` / `NEXT_PUBLIC_CMS_URL` = your Laravel API URL

## Hostinger (static `public_html`)

Shared hosting needs plain HTML (not a Node server):

```bash
cd frontend
npm run build:hostinger
```

This writes static files to `frontend/public_html/` (includes `index.html`).  
Upload **the contents** of that folder into Hostinger’s `public_html`.

Notes:
- Geo/locale middleware is disabled for this export (language URLs like `/tr/` still work)
- CMS panel stays on Laravel (`api` / VPS); site can still read CMS if `NEXT_PUBLIC_CMS_URL` is set at build time
