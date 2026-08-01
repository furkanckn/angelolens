<?php

namespace App\Filament\Resources\SiteImages\Pages;

use App\Filament\Resources\SiteImages\SiteImageResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSiteImage extends EditRecord
{
    protected static string $resource = SiteImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
