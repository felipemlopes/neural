<?php

namespace App\Providers;

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
    }
}
