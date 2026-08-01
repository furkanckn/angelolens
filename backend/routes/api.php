<?php

use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/messages/{locale}', [ContentController::class, 'messages']);
    Route::get('/images', [ContentController::class, 'images']);
});
