<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SiteImage extends Model
{
    protected $fillable = [
        'key',
        'label',
        'path',
    ];

    public function publicUrl(): string
    {
        $path = $this->path;

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/storage/')) {
            return url($path);
        }

        if (str_starts_with($path, 'cms/') || str_starts_with($path, 'images/')) {
            return Storage::disk('public')->url($path);
        }

        // Paths like /images/hero-v1-kept.jpg are Next.js public assets
        $base = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');

        return $base.$path;
    }
}
