import { FormEventHandler, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

interface Props {
    posts: Post[];
    flash?: { success?: string };
}

export default function Index({ posts, flash }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        author: '',
    });

    const [showForm, setShowForm] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const deletePost = (id: string) => {
        if (confirm('Delete this post?')) {
            router.delete(route('posts.destroy', id));
        }
    };

    return (
        <>
            <Head title="Posts" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
                {/* Header */}
                <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🍃</span>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">Laravel + MongoDB</h1>
                                <p className="text-xs text-purple-300">React · Inertia.js · MongoDB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all text-sm font-semibold shadow-lg shadow-purple-900/40"
                        >
                            {showForm ? '✕ Cancel' : '+ New Post'}
                        </button>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto px-6 py-10">
                    {/* Flash message */}
                    {flash?.success && (
                        <div className="mb-6 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm">
                            ✓ {flash.success}
                        </div>
                    )}

                    {/* Create Post Form */}
                    {showForm && (
                        <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                            <h2 className="text-lg font-semibold mb-5 text-purple-200">Create New Post</h2>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-slate-500"
                                        placeholder="Post title..."
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Author</label>
                                    <input
                                        type="text"
                                        value={data.author}
                                        onChange={e => setData('author', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-slate-500"
                                        placeholder="Author name..."
                                    />
                                    {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Content</label>
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-slate-500 resize-none"
                                        placeholder="Write your post content..."
                                    />
                                    {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
                                </div>
                                <div className="flex justify-end gap-3 pt-1">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-all text-sm font-semibold"
                                    >
                                        {processing ? 'Publishing...' : 'Publish Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Posts List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Posts
                                <span className="ml-2 text-sm font-normal text-slate-400">({posts.length})</span>
                            </h2>
                        </div>

                        {posts.length === 0 ? (
                            <div className="text-center py-20 text-slate-500">
                                <div className="text-5xl mb-4">📝</div>
                                <p className="text-lg font-medium">No posts yet</p>
                                <p className="text-sm mt-1">Click "New Post" to create your first MongoDB document.</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <article
                                    key={post._id}
                                    className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                                <span>✍️ {post.author}</span>
                                                <span>·</span>
                                                <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                <span className="ml-1 px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 font-mono text-[10px]">
                                                    _id: {post._id.slice(-8)}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3">
                                                {post.content}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deletePost(post._id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-2 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400"
                                            title="Delete post"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
