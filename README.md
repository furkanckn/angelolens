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

## Hostinger deploy (automatic)

Flow: **Cursor → `git push` `main` → GitHub Actions (lint + build) → Hostinger**

| Workflow | When | What |
|----------|------|------|
| **CI** | PR + `main` | `npm run lint` + `npm run build` |
| **Hostinger Deploy** | `main` push or manual | Lint/build → SSH Laravel panel → static export → force-push `hostinger` branch |

Hostinger Git deployment pulls the `hostinger` branch into site `public_html`.

**Required secret:** `HOSTINGER_SSH_KEY` (GitHub → Settings → Secrets → Actions)

Optional variable: `NEXT_PUBLIC_SITE_URL` = `https://angelolens.com`

Manual run: **Actions → Hostinger Deploy → Run workflow**

### Manual static build (local)

```bash
cd frontend
npm run build:hostinger
```

Writes `frontend/public_html/`. Use only if you are not relying on Actions.

Notes:
- Geo/locale middleware is disabled for this export (language URLs like `/tr/` still work)
- CMS lives under `/panel` on Hostinger; static builds use `CMS_URL=https://angelolens.com/panel`
