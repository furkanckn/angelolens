<?php

namespace App\Filament\Resources\SiteImages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteImagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')->label('Anahtar')->sortable()->searchable(),
                TextColumn::make('label')->label('Etiket')->searchable(),
                ImageColumn::make('path')
                    ->label('Önizleme')
                    ->getStateUsing(fn ($record) => $record->publicUrl()),
                TextColumn::make('path')->label('Yol')->limit(40),
                TextColumn::make('updated_at')->label('Güncelleme')->dateTime()->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('key');
    }
}
