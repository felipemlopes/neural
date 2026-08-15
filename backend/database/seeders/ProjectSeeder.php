<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            // Forex
            [
                'market'      => 'forex',
                'index'       => '01',
                'title'       => 'EA — Robô 100% grátis',
                'description' => 'Automação desenvolvida para operações no mercado Forex. Conheça o funcionamento, configuração e acesso ao nosso Expert Advisor.',
                'cta'         => 'Conhecer o EA',
                'target'      => '#forex',
                'order'       => 1,
            ],
            [
                'market'      => 'forex',
                'index'       => '02',
                'title'       => 'Copy Trading',
                'description' => 'Conheça nossa estrutura de Copy Trading e como funciona o acompanhamento e replicação das operações.',
                'cta'         => 'Conhecer Copy Trading',
                'target'      => '#forex',
                'order'       => 2,
            ],
            // Crypto
            [
                'market'      => 'crypto',
                'index'       => '01',
                'title'       => 'BitradeX',
                'description' => 'Conheça o projeto e acompanhe os próximos conteúdos da Neural Capital.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 1,
            ],
            [
                'market'      => 'crypto',
                'index'       => '02',
                'title'       => 'Polar Tensor',
                'description' => 'Informações, materiais e conteúdos do projeto estarão disponíveis em breve.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 2,
            ],
            [
                'market'      => 'crypto',
                'index'       => '03',
                'title'       => 'Zhyper DAO',
                'description' => 'Acesse futuramente uma visão organizada sobre o projeto e seu ecossistema.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 3,
            ],
            [
                'market'      => 'crypto',
                'index'       => '04',
                'title'       => 'Pool de Liquidez',
                'description' => 'Conteúdo introdutório e materiais educacionais serão adicionados na próxima etapa.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 4,
            ],
            [
                'market'      => 'crypto',
                'index'       => '05',
                'title'       => 'Cartão Ether.fi',
                'description' => 'Conheça o Cartão Ether.fi. Mais informações e conteúdos serão adicionados em breve.',
                'cta'         => 'Conhecer',
                'target'      => '#criptoativos',
                'order'       => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(
                ['market' => $project['market'], 'title' => $project['title']],
                $project
            );
        }
    }
}
