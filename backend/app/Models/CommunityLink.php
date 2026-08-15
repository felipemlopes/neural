<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityLink extends Model
{
    protected $fillable = [
        'label',
        'url',
        'type',
        'active',
        'order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order'  => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true)->orderBy('order');
    }
}
