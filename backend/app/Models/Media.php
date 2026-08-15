<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = [
        'mediable_type',
        'mediable_id',
        'type',
        'title',
        'file_path',
        'external_url',
        'order',
    ];

    protected $casts = [
        'order'        => 'integer',
        'mediable_id'  => 'integer',
    ];

    protected $appends = ['file_url'];

    public function mediable()
    {
        return $this->morphTo();
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? Storage::disk('public')->url($this->file_path) : null;
    }
}
