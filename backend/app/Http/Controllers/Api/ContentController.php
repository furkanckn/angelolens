<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContentEntry;
use App\Models\SiteImage;
use App\Support\ContentTree;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function messages(string $locale): JsonResponse
    {
        $locale = strtolower($locale);
        $entries = ContentEntry::query()
            ->where('locale', $locale)
            ->orderBy('section')
            ->orderBy('key_path')
            ->get();

        if ($entries->isEmpty()) {
            return response()->json([
                'locale' => $locale,
                'messages' => new \stdClass,
            ]);
        }

        $bySection = [];
        foreach ($entries as $entry) {
            $bySection[$entry->section][$entry->key_path] = $entry->value;
        }

        $messages = [];
        foreach ($bySection as $section => $flat) {
            $messages[$section] = ContentTree::nest($flat);
        }

        return response()->json([
            'locale' => $locale,
            'messages' => $messages,
        ]);
    }

    public function images(): JsonResponse
    {
        $images = SiteImage::query()->orderBy('key')->get();

        $map = [];
        foreach ($images as $image) {
            $map[$image->key] = $image->publicUrl();
        }

        return response()->json($map);
    }
}
