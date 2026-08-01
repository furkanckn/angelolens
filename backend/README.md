# Angelo Lens CMS (Laravel + Filament)

Panel: http://127.0.0.1:8000/admin  
Login: `info@angelolens.com` / `angelo`  
API:
- `GET /api/v1/messages/{locale}`
- `GET /api/v1/images`

## Setup

```bash
cd backend
php ../optik-sepeti/composer.phar install   # or: composer install
cp .env.example .env   # if needed
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

Seed imports texts from `../messages/*.json` and images from `../content/images.json`.

## Notes

- SQLite by default (`DB_CONNECTION=sqlite`)
- Uploaded images go to `storage/app/public/cms` → `/storage/cms/...`
- Set `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` for your Next.js origin
