<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    use AuditsActions;

    /**
     * Lista todos os projetos ativos agrupados por mercado (público).
     */
    public function index()
    {
        $projects = Project::active()->orderBy('market')->orderBy('order')->get();

        return response()->json([
            'forex'  => $projects->where('market', 'forex')->values(),
            'crypto' => $projects->where('market', 'crypto')->values(),
        ]);
    }

    /**
     * Lista projetos por mercado (forex | crypto) (público).
     */
    public function byMarket(string $market)
    {
        if (! in_array($market, ['forex', 'crypto'])) {
            return response()->json(['error' => 'Mercado inválido.'], 422);
        }

        $projects = Project::active()
            ->where('market', $market)
            ->orderBy('order')
            ->get();

        return response()->json(['projects' => $projects]);
    }

    /**
     * Detalhe de um projeto pelo slug (público).
     */
    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->where('active', true)
            ->with(['category', 'lessons' => fn ($q) => $q->active(), 'media'])
            ->firstOrFail();

        return response()->json(['project' => $project]);
    }

    /**
     * Lista TODOS os projetos (admin), incluindo inativos.
     */
    public function adminIndex()
    {
        return response()->json([
            'projects' => Project::with('category:id,name')
                ->orderBy('market')
                ->orderBy('order')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'market'       => 'required|in:forex,crypto',
            'category_id'  => 'nullable|integer|exists:categories,id',
            'index'        => 'required|string|max:10',
            'title'        => 'required|string|max:255',
            'slug'         => 'nullable|string|max:255|unique:projects,slug',
            'description'  => 'required|string',
            'cover_image'  => 'nullable|string|max:2048',
            'cta'          => 'sometimes|string|max:100',
            'target'       => 'sometimes|string|max:255',
            'external_url' => 'nullable|url|max:2048',
            'active'       => 'sometimes|boolean',
            'order'        => 'sometimes|integer',
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['active'] = $data['active'] ?? true;
        $data['order'] = $data['order'] ?? 0;

        $project = Project::create($data);

        $this->audit($request, 'project_create', ['project_id' => $project->id, 'title' => $project->title]);

        return response()->json(['project' => $project], 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'market'       => 'sometimes|in:forex,crypto',
            'category_id'  => 'sometimes|nullable|integer|exists:categories,id',
            'index'        => 'sometimes|string|max:10',
            'title'        => 'sometimes|string|max:255',
            'slug'         => 'sometimes|string|max:255|unique:projects,slug,'.$project->id,
            'description'  => 'sometimes|string',
            'cover_image'  => 'sometimes|nullable|string|max:2048',
            'cta'          => 'sometimes|string|max:100',
            'target'       => 'sometimes|string|max:255',
            'external_url' => 'sometimes|nullable|url|max:2048',
            'active'       => 'sometimes|boolean',
            'order'        => 'sometimes|integer',
        ]);

        $project->update($data);

        $this->audit($request, 'project_update', ['project_id' => $project->id]);

        return response()->json(['project' => $project->fresh()]);
    }

    public function destroy(Request $request, Project $project)
    {
        $this->audit($request, 'project_delete', ['project_id' => $project->id, 'title' => $project->title]);

        $project->delete();

        return response()->json(['message' => 'Projeto removido.']);
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer',
        ]);

        foreach ($data['ids'] as $position => $id) {
            Project::whereKey($id)->update(['order' => $position]);
        }

        $this->audit($request, 'project_reorder', ['count' => count($data['ids'])]);

        return response()->json(['message' => 'Ordem atualizada.']);
    }
}
