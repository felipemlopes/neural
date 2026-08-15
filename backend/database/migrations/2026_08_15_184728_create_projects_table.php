<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->enum('market', ['forex', 'crypto']); // forex ou criptoativos
            $table->string('index', 10);                  // "01", "02", etc.
            $table->string('title');
            $table->text('description');
            $table->string('cta')->default('Conhecer');   // texto do botão
            $table->string('target')->default('#');       // link do botão
            $table->boolean('active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
