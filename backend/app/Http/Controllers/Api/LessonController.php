<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    use AuditsActions;

    /**
     * Lista aulas ativas (público), opcionalmente filtradas por categoria/projeto.
     */
    public function index(Request $request)
    {
        $query = Lesson::active()->with(['category', 'media']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }
        if ($request->filled('project_id')) {
            $query->where('project_id', $request->integer('project_id'));
        }

        return response()->json(['lessons' => $query->get()]);
    }

    /**
     * Detalhe de uma aula (público).
     */
    public function show(string $slug)
    {
        $lesson = Lesson::where('slug', $slug)->where('active', true)
            ->with(['category', 'project', 'media'])
            ->firstOrFail();

        return response()->json(['lesson' => $lesson]);
    }

    /**
     * Lista TODAS as aulas (admin), incluindo inativas.
     */
    public function adminIndex()
    {
        return response()->json([
            'lessons' => Lesson::with(['category:id,name', 'project:id,title'])
                ->orderBy('order')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'nullable|integer|exists:categories,id',
            'project_id'  => 'nullable|integer|exists:projects,id',
            'title'       => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:lessons,slug',
            'summary'     => 'nullable|string',
            'body'        => 'nullable|string',
            'video_url'   => 'nullable|url|max:2048',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        $data['slug'] = $this->uniqueSlug($data['title'], $data['slug'] ?? null);
        $data['active'] = $data['active'] ?? true;
        $data['order'] = $data['order'] ?? 0;

        $lesson = Lesson::create($data);

        $this->audit($request, 'lesson_create', ['lesson_id' => $lesson->id, 'title' => $lesson->title]);

        return response()->json(['lesson' => $lesson], 201);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'category_id' => 'sometimes|nullable|integer|exists:categories,id',
            'project_id'  => 'sometimes|nullable|integer|exists:projects,id',
            'title'       => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|max:255|unique:lessons,slug,'.$lesson->id,
            'summary'     => 'sometimes|nullable|string',
            'body'        => 'sometimes|nullable|string',
            'video_url'   => 'sometimes|nullable|url|max:2048',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        if (isset($data['title']) && ! isset($data['slug'])) {
            $data['slug'] = $this->uniqueSlug($data['title'], null, $lesson->id);
        }

        $lesson->update($data);

        $this->audit($request, 'lesson_update', ['lesson_id' => $lesson->id]);

        return response()->json(['lesson' => $lesson->fresh()]);
    }

    public function destroy(Request $request, Lesson $lesson)
    {
        $this->audit($request, 'lesson_delete', ['lesson_id' => $lesson->id, 'title' => $lesson->title]);

        $lesson->delete();

        return response()->json(['message' => 'Aula removida.']);
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer',
        ]);

        foreach ($data['ids'] as $position => $id) {
            Lesson::whereKey($id)->update(['order' => $position]);
        }

        $this->audit($request, 'lesson_reorder', ['count' => count($data['ids'])]);

        return response()->json(['message' => 'Ordem atualizada.']);
    }

    private function uniqueSlug(string $title, ?string $slug = null, ?int $ignoreId = null): string
    {
        $slug = $slug ? Str::slug($slug) : Str::slug($title);

        $query = Lesson::where('slug', $slug);
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        if (! $query->exists()) {
            return $slug;
        }

        return $slug.'-'.Str::random(5);
    }
}
