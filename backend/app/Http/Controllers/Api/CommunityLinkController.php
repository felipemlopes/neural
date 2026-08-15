<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\CommunityLink;
use Illuminate\Http\Request;

class CommunityLinkController extends Controller
{
    use AuditsActions;

    /**
     * Lista links ativos da comunidade (público).
     */
    public function index()
    {
        $links = CommunityLink::active()->get();

        return response()->json(['links' => $links]);
    }

    /**
     * Lista TODOS os links (admin), incluindo inativos.
     */
    public function adminIndex()
    {
        return response()->json(['links' => CommunityLink::orderBy('order')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label'  => 'required|string|max:100',
            'url'    => 'required|url',
            'type'   => 'required|in:telegram,whatsapp,other',
            'active' => 'sometimes|boolean',
            'order'  => 'sometimes|integer',
        ]);

        $data['active'] = $data['active'] ?? true;
        $data['order'] = $data['order'] ?? 0;

        $link = CommunityLink::create($data);

        $this->audit($request, 'link_create', ['link_id' => $link->id, 'type' => $link->type]);

        return response()->json(['link' => $link], 201);
    }

    public function update(Request $request, CommunityLink $communityLink)
    {
        $data = $request->validate([
            'label'  => 'sometimes|string|max:100',
            'url'    => 'sometimes|url',
            'type'   => 'sometimes|in:telegram,whatsapp,other',
            'active' => 'sometimes|boolean',
            'order'  => 'sometimes|integer',
        ]);

        $communityLink->update($data);

        $this->audit($request, 'link_update', ['link_id' => $communityLink->id]);

        return response()->json(['link' => $communityLink->fresh()]);
    }

    public function destroy(Request $request, CommunityLink $communityLink)
    {
        $this->audit($request, 'link_delete', ['link_id' => $communityLink->id, 'type' => $communityLink->type]);

        $communityLink->delete();

        return response()->json(['message' => 'Link removido.']);
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer',
        ]);

        foreach ($data['ids'] as $position => $id) {
            CommunityLink::whereKey($id)->update(['order' => $position]);
        }

        $this->audit($request, 'link_reorder', ['count' => count($data['ids'])]);

        return response()->json(['message' => 'Ordem atualizada.']);
    }
}
