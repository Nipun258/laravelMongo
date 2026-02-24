import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

// ───── Nav items for sidebar ─────
const navItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        routeName: 'dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        label: 'Posts',
        href: '/posts',
        routeName: 'posts.index',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
            </svg>
        ),
    },
    {
        label: 'Profile',
        href: '/profile',
        routeName: 'profile.edit',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        label: 'Settings',
        href: '#',
        routeName: '',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage<any>().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href: string) => currentPath === href;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* ── TOP HEADER ── */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                height: '64px',
                display: 'flex', alignItems: 'center',
                padding: '0 24px', gap: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}>
                {/* Hamburger */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
                    title="Toggle sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo / Brand */}
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <span style={{ fontSize: '22px' }}>🍃</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
                        LaravelMongo
                    </span>
                </Link>

                {/* Page title (from header prop) */}
                {header && (
                    <div style={{ flex: 1, marginLeft: '8px', color: '#94a3b8', fontSize: '14px' }}>
                        {header}
                    </div>
                )}

                <div style={{ flex: 1 }} />

                {/* Notification bell */}
                <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* User avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: 700, color: '#fff',
                    }}>
                        {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                    </div>
                    <div style={{ lineHeight: 1.2 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>{user?.name ?? 'User'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{user?.email ?? ''}</div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px', marginLeft: '4px' }}
                        title="Log out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </Link>
                </div>
            </header>

            {/* ── BODY (sidebar + main) ── */}
            <div style={{ display: 'flex', flex: 1 }}>

                {/* ── SIDEBAR ── */}
                <aside style={{
                    width: sidebarOpen ? '240px' : '68px',
                    background: '#0f172a',
                    borderRight: '1px solid rgba(255,255,255,0.07)',
                    transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '24px',
                }}>
                    {/* Nav links */}
                    <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: isActive(item.href) ? '#a78bfa' : '#94a3b8',
                                    background: isActive(item.href) ? 'rgba(139,92,246,0.15)' : 'transparent',
                                    fontWeight: isActive(item.href) ? 600 : 400,
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s',
                                    border: isActive(item.href) ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                                }}
                            >
                                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar footer — version tag */}
                    {sidebarOpen && (
                        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '11px', color: '#475569' }}>
                            <div>Laravel 12 · React · MongoDB</div>
                        </div>
                    )}
                </aside>

                {/* ── MAIN CONTENT ── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                        {children}
                    </main>

                    {/* ── FOOTER ── */}
                    <footer style={{
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(15,23,42,0.8)',
                        padding: '14px 32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#475569',
                    }}>
                        <span>© {new Date().getFullYear()} LaravelMongo App. All rights reserved.</span>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Privacy</a>
                            <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Terms</a>
                            <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Support</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
