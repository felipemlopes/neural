<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    use AuditsActions;

    /**
     * Lista a mídia de um conteúdo (admin).
     */
    public function index(Request $request)
    {
        $request->validate([
            'mediable_type' => 'required|in:project,lesson,category',
            'mediable_id'   => 'required|integer',
        ]);

        $media = Media::where('mediable_type', $request->mediable_type)
            ->where('mediable_id', $request->integer('mediable_id'))
            ->orderBy('order')
            ->get();

        return response()->json(['media' => $media]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mediable_type' => 'required|in:project,lesson,category',
            'mediable_id'   => 'required|integer',
            'type'          => 'required|in:image,pdf,video,link',
            'title'         => 'nullable|string|max:255',
            'order'         => 'sometimes|integer',
            'external_url'  => 'nullable|string|max:2048',
            'file'          => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg,pdf|max:20480',
        ]);

        if (in_array($data['type'], ['image', 'pdf']) && ! $request->hasFile('file') && ! $request->filled('external_url')) {
            return response()->json(['error' => 'Envie um arquivo ou informe uma URL externa.'], 422);
        }

        if (in_array($data['type'], ['video', 'link']) && ! $request->filled('external_url')) {
            return response()->json(['error' => 'Informe uma URL para vídeo ou link externo.'], 422);
        }

        $filePath = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $dir = 'media/'.now()->format('Y/m');
            $name = Str::uuid().'.'.$file->extension();
            $filePath = $file->storeAs($dir, $name, 'public');
        }

        $media = Media::create([
            'mediable_type' => $data['mediable_type'],
            'mediable_id'   => $data['mediable_id'],
            'type'          => $data['type'],
            'title'         => $data['title'] ?? null,
            'file_path'     => $filePath,
            'external_url'  => $data['external_url'] ?? null,
            'order'         => $data['order'] ?? 0,
        ]);

        $this->audit($request, 'media_create', ['media_id' => $media->id, 'type' => $media->type]);

        return response()->json(['media' => $media], 201);
    }

    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'title'        => 'sometimes|nullable|string|max:255',
            'external_url' => 'sometimes|nullable|string|max:2048',
            'order'        => 'sometimes|integer',
            'file'         => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg,pdf|max:20480',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $dir = 'media/'.now()->format('Y/m');
            $name = Str::uuid().'.'.$file->extension();
            $newPath = $file->storeAs($dir, $name, 'public');

            if ($media->file_path) {
                Storage::disk('public')->delete($media->file_path);
            }
            $media->file_path = $newPath;
        }

        $media->update($data);

        $this->audit($request, 'media_update', ['media_id' => $media->id]);

        return response()->json(['media' => $media->fresh()]);
    }

    public function destroy(Request $request, Media $media)
    {
        if ($media->file_path) {
            Storage::disk('public')->delete($media->file_path);
        }

        $this->audit($request, 'media_delete', ['media_id' => $media->id, 'type' => $media->type]);

        $media->delete();

        return response()->json(['message' => 'Mídia removida.']);
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer',
        ]);

        foreach ($data['ids'] as $position => $id) {
            Media::whereKey($id)->update(['order' => $position]);
        }

        $this->audit($request, 'media_reorder', ['count' => count($data['ids'])]);

        return response()->json(['message' => 'Ordem atualizada.']);
    }
}
