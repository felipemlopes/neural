<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'cover_image',
        'active',
        'order',
    ];

    protected $casts = [
        'parent_id' => 'integer',
        'active'    => 'boolean',
        'order'     => 'integer',
    ];

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('order');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable')->orderBy('order');
    }

    public function scopeActive($query)
    {
        return $query->where('active', true)->orderBy('order');
    }
}
