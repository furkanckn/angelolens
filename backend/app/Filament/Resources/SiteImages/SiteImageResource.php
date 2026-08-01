<?php

namespace App\Filament\Resources\SiteImages;

use App\Filament\Resources\SiteImages\Pages\CreateSiteImage;
use App\Filament\Resources\SiteImages\Pages\EditSiteImage;
use App\Filament\Resources\SiteImages\Pages\ListSiteImages;
use App\Filament\Resources\SiteImages\Schemas\SiteImageForm;
use App\Filament\Resources\SiteImages\Tables\SiteImagesTable;
use App\Models\SiteImage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SiteImageResource extends Resource
{
    protected static ?string $model = SiteImage::class;

    protected static ?string $navigationLabel = 'Görseller';

    protected static ?string $modelLabel = 'Görsel';

    protected static ?string $pluralModelLabel = 'Görseller';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $recordTitleAttribute = 'key';

    public static function form(Schema $schema): Schema
    {
        return SiteImageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SiteImagesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSiteImages::route('/'),
            'create' => CreateSiteImage::route('/create'),
            'edit' => EditSiteImage::route('/{record}/edit'),
        ];
    }
}
