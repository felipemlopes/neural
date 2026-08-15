<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use AuditsActions;

    /**
     * Árvore de categorias ativas (público).
     */
    public function index()
    {
        $all = Category::active()->get();

        return response()->json([
            'categories' => $this->nest($all, null),
        ]);
    }

    /**
     * Detalhe de uma categoria (público) com subcategorias, projetos, aulas e mídia.
     */
    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)->where('active', true)
            ->with(['media'])
            ->firstOrFail();

        $all = Category::active()->get();

        return response()->json([
            'category' => $category,
            'children' => $this->nest($all->where('parent_id', $category->id), null),
            'projects' => $category->projects()->active()->orderBy('order')->get(),
            'lessons'  => $category->lessons()->active()->orderBy('order')->get(),
        ]);
    }

    /**
     * Lista plana de TODAS as categorias (admin), incluindo inativas.
     */
    public function adminIndex()
    {
        $categories = Category::orderBy('order')->get();

        return response()->json(['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'parent_id'   => 'nullable|integer|exists:categories,id',
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:categories,slug',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string|max:2048',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        $data['slug'] = $this->uniqueSlug($data['name'], $data['slug'] ?? null);
        $data['active'] = $data['active'] ?? true;
        $data['order'] = $data['order'] ?? 0;

        $category = Category::create($data);

        $this->audit($request, 'category_create', ['category_id' => $category->id, 'name' => $category->name]);

        return response()->json(['category' => $category], 201);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'parent_id'   => 'sometimes|nullable|integer|exists:categories,id|not_in:'.$category->id,
            'name'        => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|max:255|unique:categories,slug,'.$category->id,
            'description' => 'sometimes|nullable|string',
            'cover_image' => 'sometimes|nullable|string|max:2048',
            'active'      => 'sometimes|boolean',
            'order'       => 'sometimes|integer',
        ]);

        if (isset($data['name']) && ! isset($data['slug'])) {
            $data['slug'] = $this->uniqueSlug($data['name'], null, $category->id);
        }

        $category->update($data);

        $this->audit($request, 'category_update', ['category_id' => $category->id]);

        return response()->json(['category' => $category->fresh()]);
    }

    public function destroy(Request $request, Category $category)
    {
        // Move filhos para o pai da categoria (ou para a raiz)
        $category->children()->update(['parent_id' => $category->parent_id]);

        $this->audit($request, 'category_delete', ['category_id' => $category->id, 'name' => $category->name]);

        $category->delete();

        return response()->json(['message' => 'Categoria removida.']);
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer',
        ]);

        foreach ($data['ids'] as $position => $id) {
            Category::whereKey($id)->update(['order' => $position]);
        }

        $this->audit($request, 'category_reorder', ['count' => count($data['ids'])]);

        return response()->json(['message' => 'Ordem atualizada.']);
    }

    private function uniqueSlug(string $name, ?string $slug = null, ?int $ignoreId = null): string
    {
        $slug = $slug ? Str::slug($slug) : Str::slug($name);

        $query = Category::where('slug', $slug);
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        if (! $query->exists()) {
            return $slug;
        }

        return $slug.'-'.Str::random(5);
    }

    private function nest($items, $parentId)
    {
        return $items->where('parent_id', $parentId)
            ->map(function ($item) use ($items) {
                $item->children = $this->nest($items, $item->id);

                return $item;
            })
            ->values();
    }
}
