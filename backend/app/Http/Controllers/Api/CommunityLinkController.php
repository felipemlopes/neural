<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommunityLink;
use Illuminate\Http\Request;

class CommunityLinkController extends Controller
{
    /**
     * Lista links ativos da comunidade (público).
     */
    public function index()
    {
        $links = CommunityLink::active()->get();

        return response()->json(['links' => $links]);
    }

    // ─── Admin ────────────────────────────────────────────────────────────────

    public function store(Request $request)
    {
        $data = $request->validate([
            'label'  => 'required|string|max:100',
            'url'    => 'required|url',
            'type'   => 'required|in:telegram,whatsapp,other',
            'active' => 'sometimes|boolean',
            'order'  => 'sometimes|integer',
        ]);

        $link = CommunityLink::create($data);

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

        return response()->json(['link' => $communityLink]);
    }

    public function destroy(CommunityLink $communityLink)
    {
        $communityLink->delete();

        return response()->json(['message' => 'Link removido.']);
    }
}
