<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('id')->constrained('categories')->nullOnDelete();
            $table->string('slug')->nullable()->after('title');
            $table->string('cover_image')->nullable()->after('description');
            $table->string('external_url')->nullable()->after('target');

            $table->index('category_id');
        });

        // Garante unicidade de slug (permite múltiplos NULL em MySQL)
        Schema::table('projects', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropForeign(['category_id']);
            $table->dropColumn(['category_id', 'slug', 'cover_image', 'external_url']);
        });
    }
};
