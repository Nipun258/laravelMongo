<?php

use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Return the authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Posts CRUD — protected by Sanctum session auth
Route::middleware('auth:sanctum')->apiResource('posts', PostController::class)->only([
    'index', 'store', 'destroy',
]);
