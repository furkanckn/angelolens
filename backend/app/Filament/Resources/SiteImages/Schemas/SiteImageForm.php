<?php

namespace App\Filament\Resources\SiteImages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class SiteImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->label('Anahtar')
                    ->helperText('hero, story, packaging, logo, ig1…ig5')
                    ->required()
                    ->maxLength(64)
                    ->unique(ignoreRecord: true),
                TextInput::make('label')
                    ->label('Etiket')
                    ->maxLength(255),
                TextInput::make('path')
                    ->label('Yol / URL')
                    ->helperText('Next public yolu (/images/...) veya cms/dosya.jpg')
                    ->required()
                    ->maxLength(500),
                FileUpload::make('upload')
                    ->label('Yeni görsel yükle')
                    ->image()
                    ->disk('public')
                    ->directory('cms')
                    ->visibility('public')
                    ->dehydrated(false)
                    ->afterStateUpdated(function ($state, Set $set): void {
                        if (blank($state)) {
                            return;
                        }
                        $file = is_array($state) ? ($state[0] ?? null) : $state;
                        if (filled($file)) {
                            $set('path', (string) $file);
                        }
                    })
                    ->helperText('Yükleyince yol alanı otomatik dolar'),
            ]);
    }
}
