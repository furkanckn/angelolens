<?php

namespace Database\Seeders;

use App\Models\ContentEntry;
use App\Models\SiteImage;
use App\Support\ContentTree;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
{
    public function run(): void
    {
        $messagesRoot = dirname(base_path()).'/frontend/messages';
        $imagesFile = dirname(base_path()).'/frontend/content/images.json';

        if (is_dir($messagesRoot)) {
            foreach (glob($messagesRoot.'/*.json') ?: [] as $file) {
                $locale = basename($file, '.json');
                $data = json_decode((string) file_get_contents($file), true);
                if (! is_array($data)) {
                    continue;
                }

                foreach ($data as $section => $payload) {
                    if (! is_array($payload) && ! is_string($payload)) {
                        continue;
                    }

                    $flat = is_string($payload)
                        ? ['value' => $payload]
                        : ContentTree::flatten($payload);

                    foreach ($flat as $keyPath => $value) {
                        ContentEntry::query()->updateOrCreate(
                            [
                                'locale' => $locale,
                                'section' => (string) $section,
                                'key_path' => $keyPath,
                            ],
                            ['value' => $value],
                        );
                    }
                }
            }
        }

        $labels = [
            'hero' => 'Hero',
            'story' => 'Hikaye / About',
            'packaging' => 'Paketleme kutusu',
            'logo' => 'Logo (footer)',
            'ig1' => 'Instagram 1',
            'ig2' => 'Instagram 2',
            'ig3' => 'Instagram 3',
            'ig4' => 'Instagram 4',
            'ig5' => 'Instagram 5',
        ];

        if (is_file($imagesFile)) {
            $images = json_decode((string) file_get_contents($imagesFile), true);
            if (is_array($images)) {
                foreach ($images as $key => $path) {
                    SiteImage::query()->updateOrCreate(
                        ['key' => (string) $key],
                        [
                            'label' => $labels[$key] ?? (string) $key,
                            'path' => (string) $path,
                        ],
                    );
                }
            }
        }
    }
}
