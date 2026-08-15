<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'market',
        'category_id',
        'index',
        'title',
        'slug',
        'description',
        'cover_image',
        'cta',
        'target',
        'external_url',
        'active',
        'order',
    ];

    protected $casts = [
        'active'      => 'boolean',
        'order'       => 'integer',
        'category_id' => 'integer',
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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable')->orderBy('order');
    }
}
