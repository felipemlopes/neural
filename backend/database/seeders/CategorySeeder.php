<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $forex = Category::firstOrCreate(
            ['slug' => 'forex'],
            [
                'name'        => 'Forex',
                'description' => 'Tecnologia e automação para o mercado de câmbio.',
                'active'      => true,
                'order'       => 1,
            ]
        );

        $crypto = Category::firstOrCreate(
            ['slug' => 'criptoativos'],
            [
                'name'        => 'Criptoativos',
                'description' => 'Ativos digitais, DeFi e ecossistema cripto.',
                'active'      => true,
                'order'       => 2,
            ]
        );

        Category::firstOrCreate(
            ['slug' => 'robos'],
            ['parent_id' => $forex->id, 'name' => 'Robôs (EA)', 'active' => true, 'order' => 1]
        );

        Category::firstOrCreate(
            ['slug' => 'copy-trading'],
            ['parent_id' => $forex->id, 'name' => 'Copy Trading', 'active' => true, 'order' => 2]
        );

        Category::firstOrCreate(
            ['slug' => 'defi'],
            ['parent_id' => $crypto->id, 'name' => 'DeFi', 'active' => true, 'order' => 1]
        );

        Category::firstOrCreate(
            ['slug' => 'cartoes'],
            ['parent_id' => $crypto->id, 'name' => 'Cartões', 'active' => true, 'order' => 2]
        );
    }
}
