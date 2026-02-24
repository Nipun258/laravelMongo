import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Stat card component
function StatCard({ icon, label, value, change, color }: {
    icon: string; label: string; value: string; change: string; color: string;
}) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'border-color 0.2s',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '26px' }}>{icon}</span>
                <span style={{
                    fontSize: '11px', fontWeight: 600,
                    padding: '3px 8px', borderRadius: '20px',
                    background: color + '22', color: color,
                }}>
                    {change}
                </span>
            </div>
            <div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{label}</div>
            </div>
        </div>
    );
}

// Activity row
function ActivityRow({ avatar, name, action, time }: {
    avatar: string; name: string; action: string; time: string;
}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '26px', width: '36px', textAlign: 'center' }}>{avatar}</span>
            <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{name}</span>{' '}
                <span style={{ color: '#64748b', fontSize: '14px' }}>{action}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#475569' }}>{time}</span>
        </div>
    );
}

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<span style={{ fontSize: '14px', color: '#64748b' }}>Home / Dashboard</span>}
        >
            <Head title="Dashboard" />

            {/* Page heading */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                    Welcome back! 👋
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                    Here's what's happening in your MongoDB app today.
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <StatCard icon="📄" label="Total Posts" value="24" change="+12%" color="#a78bfa" />
                <StatCard icon="👥" label="Users" value="128" change="+5%" color="#34d399" />
                <StatCard icon="🍃" label="MongoDB Docs" value="1,034" change="+8%" color="#60a5fa" />
                <StatCard icon="⚡" label="API Requests" value="9.4k" change="+23%" color="#f59e0b" />
            </div>

            {/* Two-column section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Recent Activity */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginBottom: '8px', marginTop: 0 }}>
                        Recent Activity
                    </h2>
                    <ActivityRow avatar="🧑" name="Alice" action="created a new post" time="2 min ago" />
                    <ActivityRow avatar="👩" name="Bob" action="registered an account" time="14 min ago" />
                    <ActivityRow avatar="🧑‍💻" name="Carol" action="updated their profile" time="1 hr ago" />
                    <ActivityRow avatar="🤖" name="System" action="ran database backup" time="3 hr ago" />
                    <ActivityRow avatar="🧑" name="Dave" action="deleted a post" time="5 hr ago" />
                </div>

                {/* Quick Actions */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginBottom: '16px', marginTop: 0 }}>
                        Quick Actions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { label: '📝  Create New Post', href: '/posts', color: '#7c3aed' },
                            { label: '👤  Edit Profile', href: '/profile', color: '#0ea5e9' },
                            { label: '🍃  View MongoDB Posts', href: '/posts', color: '#10b981' },
                        ].map(({ label, href, color }) => (
                            <a key={label} href={href} style={{
                                display: 'block',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                background: color + '18',
                                border: `1px solid ${color}44`,
                                color: '#e2e8f0',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'background 0.15s',
                            }}>
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Tech stack badges */}
                    <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['Laravel 12', 'React 19', 'Inertia.js', 'MongoDB', 'TypeScript', 'Tailwind'].map(tag => (
                            <span key={tag} style={{
                                padding: '3px 10px', borderRadius: '20px',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '11px', color: '#94a3b8',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
