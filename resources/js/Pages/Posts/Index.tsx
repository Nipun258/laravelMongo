import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState, FormEvent } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

interface FormData {
    title: string;
    content: string;
    author: string;
}

interface FormErrors {
    title?: string;
    content?: string;
    author?: string;
    general?: string;
}

export default function Index() {
    const { tokens: t } = useTheme();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [flash, setFlash] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [form, setForm] = useState<FormData>({ title: '', content: '', author: '' });

    // ── Fetch posts from GET /api/posts ──
    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Ensure Sanctum CSRF cookie is set before any API call
            await window.axios.get('/sanctum/csrf-cookie');
            const res = await window.axios.get('/api/posts');
            setPosts(res.data.data);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setErrors({ general: 'Session expired. Please refresh the page.' });
            } else {
                setErrors({ general: 'Failed to load posts from API.' });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    // ── Create post via POST /api/posts ──
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        try {
            await window.axios.post('/api/posts', form);
            setForm({ title: '', content: '', author: '' });
            setShowForm(false);
            setFlash('Post created successfully!');
            fetchPosts();
        } catch (err: any) {
            if (err.response?.status === 422) {
                // Laravel validation errors
                const ve = err.response.data.errors as Record<string, string[]>;
                setErrors({
                    title: ve.title?.[0],
                    content: ve.content?.[0],
                    author: ve.author?.[0],
                });
            } else {
                setErrors({ general: 'Failed to create post. Please try again.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    // ── Delete post via DELETE /api/posts/{id} ──
    const deletePost = async (id: string) => {
        if (!confirm('Delete this post?')) return;
        try {
            await window.axios.delete(`/api/posts/${id}`);
            setFlash('Post deleted.');
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch {
            setFlash('Failed to delete post.');
        }
    };

    const setField = (field: keyof FormData, val: string) =>
        setForm(prev => ({ ...prev, [field]: val }));

    const inputStyle = (hasError?: string) => ({
        width: '100%', padding: '10px 14px', borderRadius: '8px', boxSizing: 'border-box' as const,
        background: t.inputBg,
        border: `1px solid ${hasError ? t.danger : t.inputBorder}`,
        color: t.text, fontSize: '13px', outline: 'none',
    });

    return (
        <AuthenticatedLayout header={<span style={{ fontSize: '14px', color: t.textMuted }}>Home / Posts</span>}>
            <Head title="Posts" />

            {/* Page heading */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 700, color: t.text, margin: 0 }}>Posts</h1>
                    <p style={{ color: t.textMuted, fontSize: '13px', marginTop: '4px' }}>
                        API: <code style={{ color: t.accent }}>/api/posts</code> · MongoDB collection · {posts.length} document{posts.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setErrors({}); }}
                    style={{
                        padding: '10px 18px', borderRadius: '10px', border: 'none', color: '#fff', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600,
                        background: showForm ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                        boxShadow: showForm ? 'none' : '0 4px 15px rgba(124,58,237,0.4)',
                    }}
                >
                    {showForm ? '✕ Cancel' : '+ New Post'}
                </button>
            </div>

            {/* Flash message */}
            {flash && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', background: t.successBg, border: `1px solid ${t.successBorder}`, color: t.success, fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>✓ {flash}</span>
                    <button onClick={() => setFlash(null)} style={{ background: 'none', border: 'none', color: t.success, cursor: 'pointer' }}>✕</button>
                </div>
            )}

            {errors.general && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', background: t.dangerBg, border: `1px solid ${t.danger}44`, color: t.danger, fontSize: '14px' }}>
                    {errors.general}
                </div>
            )}

            {/* Create form */}
            {showForm && (
                <div style={{ marginBottom: '28px', padding: '24px', borderRadius: '16px', background: t.surface, border: `1px solid ${t.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '15px', fontWeight: 600, color: t.accent, margin: 0 }}>New Post</h2>
                        <span style={{ fontSize: '11px', color: t.textFaint, background: t.accentBg, padding: '2px 8px', borderRadius: '20px', border: `1px solid ${t.accentBorder}` }}>
                            POST /api/posts
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Title *</label>
                                <input type="text" value={form.title} onChange={e => setField('title', e.target.value)} placeholder="Post title..." style={inputStyle(errors.title)} />
                                {errors.title && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.title}</p>}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Author *</label>
                                <input type="text" value={form.author} onChange={e => setField('author', e.target.value)} placeholder="Author name..." style={inputStyle(errors.author)} />
                                {errors.author && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.author}</p>}
                            </div>
                        </div>
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Content *</label>
                            <textarea value={form.content} onChange={e => setField('content', e.target.value)} rows={4} placeholder="Write your post content..." style={{ ...inputStyle(errors.content), resize: 'vertical' }} />
                            {errors.content && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.content}</p>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" disabled={processing}
                                style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', opacity: processing ? 0.6 : 1 }}>
                                {processing ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Posts list */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: t.textFaint }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                    <p style={{ fontSize: '14px' }}>Loading posts from API...</p>
                </div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                    <p style={{ fontSize: '16px', fontWeight: 500, color: t.textMuted }}>No posts yet</p>
                    <p style={{ fontSize: '13px', color: t.textFaint, marginTop: '4px' }}>Click "+ New Post" to create your first MongoDB document via the API.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {posts.map(p => (
                        <article key={p.id} style={{ padding: '20px 24px', borderRadius: '14px', background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: 0 }}>{p.title}</h3>
                                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: t.accentBg, color: t.accent, fontFamily: 'monospace', border: `1px solid ${t.accentBorder}` }}>
                                        {p.id.slice(-8)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '12px', color: t.textMuted, marginTop: '4px' }}>
                                    ✍️ {p.author} &nbsp;·&nbsp; {new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </div>
                                <p style={{ fontSize: '13px', color: t.textFaint, marginTop: '8px', lineHeight: 1.6, marginBottom: 0, WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>
                                    {p.content}
                                </p>
                            </div>
                            <button onClick={() => deletePost(p.id)} title="Delete post"
                                style={{ flexShrink: 0, padding: '8px', borderRadius: '8px', border: 'none', background: 'rgba(248,113,113,0.1)', color: '#f87171', cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
