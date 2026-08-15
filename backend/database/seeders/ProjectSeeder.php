<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $category = fn (string $slug) => Category::where('slug', $slug)->first()?->id;

        $projects = [
            // Forex
            [
                'market'      => 'forex',
                'category_id' => $category('robos'),
                'index'       => '01',
                'title'       => 'EA — Robô 100% grátis',
                'slug'        => 'ea-robo-gratis',
                'description' => 'Automação desenvolvida para operações no mercado Forex. Conheça o funcionamento, configuração e acesso ao nosso Expert Advisor.',
                'cta'         => 'Conhecer o EA',
                'target'      => '#forex',
                'order'       => 1,
            ],
            [
                'market'      => 'forex',
                'category_id' => $category('copy-trading'),
                'index'       => '02',
                'title'       => 'Copy Trading',
                'slug'        => 'copy-trading',
                'description' => 'Conheça nossa estrutura de Copy Trading e como funciona o acompanhamento e replicação das operações.',
                'cta'         => 'Conhecer Copy Trading',
                'target'      => '#forex',
                'order'       => 2,
            ],
            // Crypto
            [
                'market'      => 'crypto',
                'category_id' => $category('defi'),
                'index'       => '01',
                'title'       => 'BitradeX',
                'slug'        => 'bitradex',
                'description' => 'Conheça o projeto e acompanhe os próximos conteúdos da Neural Capital.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 1,
            ],
            [
                'market'      => 'crypto',
                'category_id' => $category('defi'),
                'index'       => '02',
                'title'       => 'Polar Tensor',
                'slug'        => 'polar-tensor',
                'description' => 'Informações, materiais e conteúdos do projeto estarão disponíveis em breve.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 2,
            ],
            [
                'market'      => 'crypto',
                'category_id' => $category('defi'),
                'index'       => '03',
                'title'       => 'Zhyper DAO',
                'slug'        => 'zhyper-dao',
                'description' => 'Acesse futuramente uma visão organizada sobre o projeto e seu ecossistema.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 3,
            ],
            [
                'market'      => 'crypto',
                'category_id' => $category('defi'),
                'index'       => '04',
                'title'       => 'Pool de Liquidez',
                'slug'        => 'pool-de-liquidez',
                'description' => 'Conteúdo introdutório e materiais educacionais serão adicionados na próxima etapa.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 4,
            ],
            [
                'market'      => 'crypto',
                'category_id' => $category('cartoes'),
                'index'       => '05',
                'title'       => 'Cartão Ether.fi',
                'slug'        => 'cartao-ether-fi',
                'description' => 'Conheça o Cartão Ether.fi. Mais informações e conteúdos serão adicionados em breve.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }
}
