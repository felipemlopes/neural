<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Lista todos os usuários.
     */
    public function users()
    {
        $users = User::orderBy('created_at', 'desc')->get()
            ->map(fn ($u) => $u->only(['id', 'email', 'full_name', 'role', 'last_seen_at', 'created_at']));

        return response()->json(['users' => $users]);
    }

    /**
     * Cria um novo usuário (admin pode criar outros admins).
     */
    public function createUser(Request $request)
    {
        $data = $request->validate([
            'email'     => 'required|email|unique:users,email',
            'full_name' => 'sometimes|string|max:255',
            'password'  => 'required|string|min:8',
            'role'      => 'sometimes|in:member,admin',
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return response()->json([
            'user' => $user->only(['id', 'email', 'full_name', 'role']),
        ], 201);
    }

    /**
     * Muda o role de um usuário.
     */
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:member,admin',
        ]);

        AuditLog::create([
            'user_id'    => $request->user()->id,
            'action'     => 'role_change',
            'meta'       => [
                'target_user' => $user->email,
                'old_role'    => $user->role,
                'new_role'    => $request->role,
            ],
            'ip_address' => $request->ip(),
        ]);

        $user->update(['role' => $request->role]);

        return response()->json(['user' => $user->only(['id', 'email', 'role'])]);
    }

    /**
     * Logs de auditoria paginados.
     */
    public function auditLogs(Request $request)
    {
        $logs = AuditLog::with('user:id,email')
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return response()->json($logs);
    }
}
