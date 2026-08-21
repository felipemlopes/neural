<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommunityLinkController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Neural Capital — API Routes
|--------------------------------------------------------------------------
|
| Prefixo base: /api
|
| Públicas:    GET  /api/projects
|              GET  /api/projects/{slug}
|              GET  /api/categories
|              GET  /api/categories/{slug}
|              GET  /api/lessons
|              GET  /api/lessons/{slug}
|              GET  /api/community-links
|              GET  /api/settings
|              POST /api/auth/login
|
| Autenticadas (Sanctum): /api/auth/me, /api/auth/logout
|
| Admin only:  /api/admin/*
|
*/

// ─── Rotas públicas ───────────────────────────────────────────────────────────
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/market/{market}', [ProjectController::class, 'byMarket']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{slug}', [LessonController::class, 'show']);

Route::get('/community-links', [CommunityLinkController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);

// ─── Autenticação ─────────────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
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
    Route::get('/projects', [ProjectController::class, 'adminIndex']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::patch('/projects/reorder', [ProjectController::class, 'reorder']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Categorias
    Route::get('/categories', [CategoryController::class, 'adminIndex']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::patch('/categories/reorder', [CategoryController::class, 'reorder']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Aulas
    Route::get('/lessons', [LessonController::class, 'adminIndex']);
    Route::post('/lessons', [LessonController::class, 'store']);
    Route::patch('/lessons/reorder', [LessonController::class, 'reorder']);
    Route::put('/lessons/{lesson}', [LessonController::class, 'update']);
    Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy']);

    // Mídia
    Route::get('/media', [MediaController::class, 'index']);
    Route::post('/media', [MediaController::class, 'store']);
    Route::patch('/media/reorder', [MediaController::class, 'reorder']);
    Route::put('/media/{media}', [MediaController::class, 'update']);
    Route::delete('/media/{media}', [MediaController::class, 'destroy']);

    // Links da comunidade
    Route::get('/community-links', [CommunityLinkController::class, 'adminIndex']);
    Route::post('/community-links', [CommunityLinkController::class, 'store']);
    Route::patch('/community-links/reorder', [CommunityLinkController::class, 'reorder']);
    Route::put('/community-links/{communityLink}', [CommunityLinkController::class, 'update']);
    Route::delete('/community-links/{communityLink}', [CommunityLinkController::class, 'destroy']);

    // Configurações
    Route::get('/settings', [SettingController::class, 'adminIndex']);
    Route::post('/settings', [SettingController::class, 'store']);
});
