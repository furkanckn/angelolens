<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_entries', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 8);
            $table->string('section', 64);
            $table->string('key_path', 191);
            $table->text('value')->nullable();
            $table->timestamps();

            $table->unique(['locale', 'section', 'key_path']);
            $table->index(['locale', 'section']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_entries');
    }
};
