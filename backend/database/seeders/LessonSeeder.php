<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::where('slug', 'robos')->first();
        if (! $category || Lesson::where('slug', 'como-configurar-o-ea')->exists()) {
            return;
        }

        Lesson::create([
            'category_id' => $category->id,
            'title'       => 'Como configurar o EA (Robô)',
            'slug'        => 'como-configurar-o-ea',
            'summary'     => 'Passo a passo para instalar e configurar o Expert Advisor na sua plataforma.',
            'body'        => "Nesta aula você aprende a instalar o Expert Advisor, definir os parâmetros de risco e acompanhar as operações.\n\n1. Baixe o arquivo do robô.\n2. Copie para a pasta de Experts da plataforma.\n3. Anexe ao gráfico e configure o lote.",
            'video_url'   => null,
            'active'      => true,
            'order'       => 1,
        ]);
    }
}
