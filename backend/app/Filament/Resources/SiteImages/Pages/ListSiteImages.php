<?php

namespace App\Filament\Resources\SiteImages\Pages;

use App\Filament\Resources\SiteImages\SiteImageResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSiteImages extends ListRecords
{
    protected static string $resource = SiteImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
