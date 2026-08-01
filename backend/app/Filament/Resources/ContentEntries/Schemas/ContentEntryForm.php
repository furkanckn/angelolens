<?php

namespace App\Filament\Resources\ContentEntries\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ContentEntryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('locale')
                    ->label('Dil')
                    ->options([
                        'tr' => 'Türkçe',
                        'en' => 'English',
                        'de' => 'Deutsch',
                        'it' => 'Italiano',
                        'ru' => 'Русский',
                        'ar' => 'العربية',
                        'fa' => 'فارسی',
                    ])
                    ->required()
                    ->native(false),
                TextInput::make('section')
                    ->label('Bölüm')
                    ->helperText('Örn: hero, manifesto, storyTeaser, contactPage')
                    ->required()
                    ->maxLength(64),
                TextInput::make('key_path')
                    ->label('Alan')
                    ->helperText('Örn: title, subtitle, items.sleep.body')
                    ->required()
                    ->maxLength(191),
                Textarea::make('value')
                    ->label('Metin')
                    ->rows(5)
                    ->columnSpanFull(),
            ]);
    }
}
