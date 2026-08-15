<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Lesson;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fix para MySQL < 5.7.7 — evita erro de key length com utf8mb4
        Builder::defaultStringLength(191);

        Relation::morphMap([
            'project'  => Project::class,
            'lesson'   => Lesson::class,
            'category' => Category::class,
        ]);

        Relation::requireMorphMap();
    }
}
