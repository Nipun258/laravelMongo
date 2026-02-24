<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * GET /api/posts — list all posts (newest first)
     */
    public function index(): JsonResponse
    {
        $posts = Post::latest()->get();

        return response()->json([
            'data'    => $posts,
            'total'   => $posts->count(),
            'message' => 'Posts retrieved successfully.',
        ]);
    }

    /**
     * POST /api/posts — create a new post
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'author'  => 'required|string|max:100',
        ]);

        $post = Post::create($validated);

        return response()->json([
            'data'    => $post,
            'message' => 'Post created successfully.',
        ], 201);
    }

    /**
     * DELETE /api/posts/{post} — delete a post
     */
    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.',
        ]);
    }
}
