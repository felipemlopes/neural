<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Lista todos os projetos ativos agrupados por mercado.
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
     * Lista projetos por mercado (forex | crypto).
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

    // ─── Admin ────────────────────────────────────────────────────────────────

    public function store(Request $request)
    {
        $data = $request->validate([
            'market'      => 'required|in:forex,crypto',
            'index'       => 'required|string|max:10',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'cta'         => 'sometimes|string|max:100',
            'target'      => 'sometimes|string|max:255',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        $project = Project::create($data);

        return response()->json(['project' => $project], 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'market'      => 'sometimes|in:forex,crypto',
            'index'       => 'sometimes|string|max:10',
            'title'       => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'cta'         => 'sometimes|string|max:100',
            'target'      => 'sometimes|string|max:255',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        $project->update($data);

        return response()->json(['project' => $project]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Projeto removido.']);
    }
}
