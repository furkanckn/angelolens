<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentEntry extends Model
{
    protected $fillable = [
        'locale',
        'section',
        'key_path',
        'value',
    ];
}
