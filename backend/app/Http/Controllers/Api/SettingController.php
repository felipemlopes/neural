<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\AuditsActions;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    use AuditsActions;

    /**
     * Configurações públicas (chave => valor).
     */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');

        return response()->json(['settings' => $settings]);
    }

    /**
     * Configurações (admin).
     */
    public function adminIndex()
    {
        return response()->json([
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    /**
     * Salva um lote de configurações (admin).
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'settings'   => 'required|array',
            'settings.*' => 'nullable|string',
        ]);

        foreach ($data['settings'] as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        $this->audit($request, 'settings_update', ['keys' => array_keys($data['settings'])]);

        return response()->json(['settings' => Setting::all()->pluck('value', 'key')]);
    }
}
