<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'market',
        'index',
        'title',
        'description',
        'cta',
        'target',
        'active',
        'order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order'  => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeForex($query)
    {
        return $query->where('market', 'forex');
    }

    public function scopeCrypto($query)
    {
        return $query->where('market', 'crypto');
    }
}
