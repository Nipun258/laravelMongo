import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTheme } from '@/contexts/ThemeContext';

function StatCard({ icon, label, value, change, color }: { icon: string; label: string; value: string; change: string; color: string }) {
    const { tokens: t } = useTheme();
    return (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, transition: 'background 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 26 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: color + '22', color }}>{change}</span>
            </div>
            <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: t.text, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4 }}>{label}</div>
            </div>
        </div>
    );
}

function ActivityRow({ avatar, name, action, time }: { avatar: string; name: string; action: string; time: string }) {
    const { tokens: t } = useTheme();
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 24, width: 36, textAlign: 'center' }}>{avatar}</span>
            <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, color: t.text, fontSize: 14 }}>{name}</span>{' '}
                <span style={{ color: t.textMuted, fontSize: 14 }}>{action}</span>
            </div>
            <span style={{ fontSize: 12, color: t.textFaint }}>{time}</span>
        </div>
    );
}

export default function Dashboard() {
    const { tokens: t } = useTheme();

    return (
        <AuthenticatedLayout header={<span style={{ fontSize: 14, color: t.textMuted }}>Home / Dashboard</span>}>
            <Head title="Dashboard" />

            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: t.text, margin: 0 }}>Welcome back! 👋</h1>
                <p style={{ color: t.textMuted, fontSize: 14, marginTop: 4 }}>Here's what's happening in your MongoDB app today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
                <StatCard icon="📄" label="Total Posts" value="24" change="+12%" color="#a78bfa" />
                <StatCard icon="👥" label="Users" value="128" change="+5%" color="#34d399" />
                <StatCard icon="🍃" label="MongoDB Docs" value="1,034" change="+8%" color="#60a5fa" />
                <StatCard icon="⚡" label="API Requests" value="9.4k" change="+23%" color="#f59e0b" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Recent Activity */}
                <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 8, marginTop: 0 }}>Recent Activity</h2>
                    <ActivityRow avatar="🧑" name="Alice" action="created a new post" time="2 min ago" />
                    <ActivityRow avatar="👩" name="Bob" action="registered an account" time="14 min ago" />
                    <ActivityRow avatar="🧑‍💻" name="Carol" action="updated their profile" time="1 hr ago" />
                    <ActivityRow avatar="🤖" name="System" action="ran database backup" time="3 hr ago" />
                    <ActivityRow avatar="🧑" name="Dave" action="deleted a post" time="5 hr ago" />
                </div>

                {/* Quick Actions */}
                <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 16, marginTop: 0 }}>Quick Actions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { label: '📝  Create New Post', href: '/posts', color: '#7c3aed' },
                            { label: '👤  Edit Profile', href: '/profile', color: '#0ea5e9' },
                            { label: '🍃  View MongoDB Posts', href: '/posts', color: '#10b981' },
                        ].map(({ label, href, color }) => (
                            <a key={label} href={href} style={{ display: 'block', padding: '12px 16px', borderRadius: 10, background: color + '18', border: `1px solid ${color}44`, color: t.text, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                                {label}
                            </a>
                        ))}
                    </div>
                    <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Laravel 12', 'React 19', 'Inertia.js', 'MongoDB', 'TypeScript', 'Tailwind'].map(tag => (
                            <span key={tag} style={{ padding: '3px 10px', borderRadius: 20, background: t.badgeBg, border: `1px solid ${t.border}`, fontSize: 11, color: t.badgeText }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
