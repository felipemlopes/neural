<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Lesson;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    private function seedBase(): void
    {
        $this->seed();
    }

    public function test_public_categories_tree_is_returned(): void
    {
        $this->seedBase();

        $response = $this->getJson('/api/categories');

        $response->assertOk()
            ->assertJsonStructure(['categories']);
    }

    public function test_public_projects_are_grouped_by_market(): void
    {
        $this->seedBase();

        $response = $this->getJson('/api/projects');

        $response->assertOk()
            ->assertJsonStructure(['forex', 'crypto']);
    }

    public function test_admin_can_create_project(): void
    {
        $this->seedBase();
        Sanctum::actingAs($this->admin(), ['*']);

        $response = $this->postJson('/api/admin/projects', [
            'market'      => 'forex',
            'index'       => '03',
            'title'       => 'Projeto de Teste',
            'description' => 'Descrição de teste',
        ]);

        $response->assertCreated()
            ->assertJsonPath('project.title', 'Projeto de Teste')
            ->assertJsonPath('project.slug', 'projeto-de-teste');
    }

    public function test_admin_can_create_category_and_reorder(): void
    {
        $this->seedBase();
        Sanctum::actingAs($this->admin(), ['*']);

        $a = $this->postJson('/api/admin/categories', ['name' => 'Categoria A'])
            ->assertCreated()
            ->json('category');

        $b = $this->postJson('/api/admin/categories', ['name' => 'Categoria B'])
            ->assertCreated()
            ->json('category');

        $this->patchJson('/api/admin/categories/reorder', [
            'ids' => [$b['id'], $a['id']],
        ])->assertOk();

        $this->assertSame(0, Category::find($b['id'])->order);
        $this->assertSame(1, Category::find($a['id'])->order);
    }

    public function test_admin_can_upload_media(): void
    {
        $this->seedBase();
        Storage::fake('public');
        Sanctum::actingAs($this->admin(), ['*']);

        $project = Project::first();

        $response = $this->postJson('/api/admin/media', [
            'mediable_type' => 'project',
            'mediable_id'   => $project->id,
            'type'          => 'image',
            'title'         => 'Capa',
            'file'          => UploadedFile::fake()->image('capa.jpg'),
        ]);

        $response->assertCreated()
            ->assertJsonPath('media.type', 'image')
            ->assertJsonPath('media.file_url', fn ($url) => str_contains($url, '/storage/'));

        Storage::disk('public')->assertExists($response->json('media.file_path'));
    }

    public function test_admin_can_manage_lessons(): void
    {
        $this->seedBase();
        Sanctum::actingAs($this->admin(), ['*']);

        $category = Category::where('slug', 'forex')->first();

        $response = $this->postJson('/api/admin/lessons', [
            'category_id' => $category->id,
            'title'       => 'Aula de Teste',
            'video_url'   => 'https://www.youtube.com/watch?v=abc',
        ]);

        $response->assertCreated()
            ->assertJsonPath('lesson.slug', 'aula-de-teste');

        $this->assertDatabaseHas('lessons', ['title' => 'Aula de Teste']);
    }

    public function test_guest_cannot_access_admin(): void
    {
        $this->seedBase();

        $this->getJson('/api/admin/projects')->assertStatus(401);
    }

    public function test_member_cannot_access_admin(): void
    {
        $this->seedBase();
        $member = User::factory()->create(['role' => 'member']);
        Sanctum::actingAs($member, ['*']);

        $this->getJson('/api/admin/projects')->assertStatus(403);
    }

    public function test_admin_can_save_settings(): void
    {
        $this->seedBase();
        Sanctum::actingAs($this->admin(), ['*']);

        $this->postJson('/api/admin/settings', [
            'settings' => ['site_name' => 'Novo Nome'],
        ])->assertOk()
            ->assertJsonPath('settings.site_name', 'Novo Nome');
    }

    public function test_public_show_endpoints_return_content(): void
    {
        $this->seedBase();

        $this->getJson('/api/projects/ea-robo-gratis')
            ->assertOk()
            ->assertJsonPath('project.title', 'EA — Robô 100% grátis');

        $this->getJson('/api/categories/forex')
            ->assertOk()
            ->assertJsonPath('category.name', 'Forex');

        $this->getJson('/api/lessons/como-configurar-o-ea')
            ->assertOk()
            ->assertJsonPath('lesson.title', 'Como configurar o EA (Robô)');
    }
}
