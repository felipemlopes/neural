<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'category_id',
        'project_id',
        'title',
        'slug',
        'summary',
        'body',
        'video_url',
        'active',
        'order',
    ];

    protected $casts = [
        'active'      => 'boolean',
        'order'       => 'integer',
        'category_id' => 'integer',
        'project_id'  => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
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
