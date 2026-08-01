<?php

namespace App\Filament\Resources\ContentEntries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ContentEntriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('locale')->label('Dil')->sortable()->searchable(),
                TextColumn::make('section')->label('Bölüm')->sortable()->searchable(),
                TextColumn::make('key_path')->label('Alan')->sortable()->searchable(),
                TextColumn::make('value')->label('Metin')->limit(60)->wrap(),
                TextColumn::make('updated_at')->label('Güncelleme')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('locale')
                    ->label('Dil')
                    ->options([
                        'tr' => 'Türkçe',
                        'en' => 'English',
                        'de' => 'Deutsch',
                        'it' => 'Italiano',
                        'ru' => 'Русский',
                        'ar' => 'العربية',
                        'fa' => 'فارسی',
                    ]),
                SelectFilter::make('section')
                    ->label('Bölüm')
                    ->options(fn () => \App\Models\ContentEntry::query()
                        ->distinct()
                        ->orderBy('section')
                        ->pluck('section', 'section')
                        ->all()),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('section');
    }
}
