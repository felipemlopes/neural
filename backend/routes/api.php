<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommunityLinkController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Neural Capital — API Routes
|--------------------------------------------------------------------------
|
| Prefixo base: /api
|
| Públicas:    GET  /api/projects
|              GET  /api/projects/{market}
|              GET  /api/community-links
|              POST /api/auth/login
|
| Autenticadas (Sanctum): /api/auth/me, /api/auth/logout
|
| Admin only:  /api/admin/*
|
*/

// ─── Rotas públicas ───────────────────────────────────────────────────────────
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{market}', [ProjectController::class, 'byMarket']);
Route::get('/community-links', [CommunityLinkController::class, 'index']);

// ─── Autenticação ─────────────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// ─── Rotas protegidas (usuário autenticado) ───────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    // futuros endpoints de conta do usuário aqui
});

// ─── Rotas de admin ───────────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Usuários
    Route::get('/users', [AdminController::class, 'users']);
    Route::post('/users', [AdminController::class, 'createUser']);
    Route::patch('/users/{user}/role', [AdminController::class, 'updateRole']);

    // Auditoria
    Route::get('/audit-logs', [AdminController::class, 'auditLogs']);

    // Projetos
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Links da comunidade
    Route::post('/community-links', [CommunityLinkController::class, 'store']);
    Route::put('/community-links/{communityLink}', [CommunityLinkController::class, 'update']);
    Route::delete('/community-links/{communityLink}', [CommunityLinkController::class, 'destroy']);
});
