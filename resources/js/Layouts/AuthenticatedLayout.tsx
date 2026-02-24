import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
    {
        label: 'Dashboard', href: '/dashboard',
        icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    },
    {
        label: 'Posts', href: '/posts',
        icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    },
    {
        label: 'Profile', href: '/profile',
        icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
    {
        label: 'Settings', href: '#',
        icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    },
];

export default function AuthenticatedLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage<any>().props.auth.user;
    const { theme, tokens: t, toggle } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href: string) => currentPath === href;

    const isDark = theme === 'dark';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: t.bg, color: t.text, fontFamily: 'Inter,system-ui,sans-serif', transition: 'background 0.2s,color 0.2s' }}>

            {/* ── HEADER ── */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: t.bgHeader,
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${t.border}`,
                height: 64, display: 'flex', alignItems: 'center',
                padding: '0 24px', gap: 16,
                boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 1px 8px rgba(0,0,0,0.08)',
            }}>
                {/* Hamburger */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Brand */}
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <span style={{ fontSize: 22 }}>🍃</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: t.text, letterSpacing: '-0.3px' }}>LaravelMongo</span>
                </Link>

                {/* Breadcrumb */}
                {header && <div style={{ flex: 1, marginLeft: 8, color: t.textMuted, fontSize: 14 }}>{header}</div>}
                <div style={{ flex: 1 }} />

                {/* ── THEME TOGGLE ── */}
                <button onClick={toggle} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
                        border: `1px solid ${t.border}`,
                        background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                        color: t.textMuted, fontSize: 13, fontWeight: 500,
                        transition: 'all 0.2s',
                    }}>
                    {isDark
                        ? <><svg xmlns="http://www.w3.org/2000/svg" style={{ width: 15, height: 15 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg> Light</>
                        : <><svg xmlns="http://www.w3.org/2000/svg" style={{ width: 15, height: 15 }} fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> Dark</>
                    }
                </button>

                {/* Notification */}
                <button style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: `1px solid ${t.border}`, color: t.textMuted, cursor: 'pointer', padding: 8, borderRadius: 10, display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>

                {/* User */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', borderRadius: 10, border: `1px solid ${t.border}` }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                        {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                    </div>
                    <div style={{ lineHeight: 1.2 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{user?.name ?? 'User'}</div>
                        <div style={{ fontSize: 11, color: t.textMuted }}>{user?.email ?? ''}</div>
                    </div>
                    <Link href={route('logout')} method="post" as="button"
                        style={{ background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', marginLeft: 4 }} title="Log out">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </Link>
                </div>
            </header>

            {/* ── BODY ── */}
            <div style={{ display: 'flex', flex: 1 }}>

                {/* ── SIDEBAR ── */}
                <aside style={{ width: sidebarOpen ? 240 : 68, background: t.bgSidebar, borderRight: `1px solid ${t.border}`, transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', paddingTop: 24 }}>
                    <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {navItems.map(item => (
                            <Link key={item.label} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                                borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap',
                                fontSize: 14, fontWeight: isActive(item.href) ? 600 : 400,
                                color: isActive(item.href) ? t.accent : t.textMuted,
                                background: isActive(item.href) ? t.accentBg : 'transparent',
                                border: isActive(item.href) ? `1px solid ${t.accentBorder}` : '1px solid transparent',
                                transition: 'all 0.15s',
                            }}>
                                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        ))}
                    </nav>
                    {sidebarOpen && (
                        <div style={{ padding: 16, borderTop: `1px solid ${t.border}`, fontSize: 11, color: t.textFaint }}>
                            Laravel 12 · React · MongoDB
                        </div>
                    )}
                </aside>

                {/* ── MAIN ── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>{children}</main>

                    {/* ── FOOTER ── */}
                    <footer style={{ borderTop: `1px solid ${t.border}`, background: isDark ? 'rgba(15,23,42,0.8)' : t.surface, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: t.textFaint }}>
                        <span>© {new Date().getFullYear()} LaravelMongo App. All rights reserved.</span>
                        <div style={{ display: 'flex', gap: 20 }}>
                            {['Privacy', 'Terms', 'Support'].map(l => <a key={l} href="#" style={{ color: t.textFaint, textDecoration: 'none' }}>{l}</a>)}
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
