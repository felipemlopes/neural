<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login com email e senha — retorna token Sanctum.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas.'],
            ]);
        }

        $user->update(['last_seen_at' => now()]);

        AuditLog::create([
            'user_id'    => $user->id,
            'action'     => 'login',
            'meta'       => ['email' => $user->email],
            'ip_address' => $request->ip(),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'  => $user->only(['id', 'email', 'full_name', 'role']),
            'token' => $token,
        ]);
    }

    /**
     * Logout — revoga o token atual.
     */
    public function logout(Request $request)
    {
        AuditLog::create([
            'user_id'    => $request->user()->id,
            'action'     => 'logout',
            'ip_address' => $request->ip(),
        ]);

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }

    /**
     * Retorna o usuário autenticado.
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->only(['id', 'email', 'full_name', 'role']),
        ]);
    }
}
