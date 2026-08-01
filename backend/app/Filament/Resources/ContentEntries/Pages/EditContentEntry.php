<?php

namespace App\Filament\Resources\ContentEntries\Pages;

use App\Filament\Resources\ContentEntries\ContentEntryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContentEntry extends EditRecord
{
    protected static string $resource = ContentEntryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
