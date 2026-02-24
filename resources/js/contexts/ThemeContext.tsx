import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';

// ── Color tokens ────────────────────────────────
export type Theme = 'dark' | 'light';

export interface ThemeTokens {
    bg: string;
    bgHeader: string;
    bgSidebar: string;
    surface: string;
    surfaceHover: string;
    border: string;
    text: string;
    textMuted: string;
    textFaint: string;
    accent: string;
    accentBg: string;
    accentBorder: string;
    inputBg: string;
    inputBorder: string;
    danger: string;
    dangerBg: string;
    success: string;
    successBg: string;
    successBorder: string;
    badgeBg: string;
    badgeText: string;
}

const dark: ThemeTokens = {
    bg: '#0f172a',
    bgHeader: 'rgba(15,23,42,0.85)',
    bgSidebar: '#0f172a',
    surface: 'rgba(255,255,255,0.04)',
    surfaceHover: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.08)',
    text: '#f1f5f9',
    textMuted: '#64748b',
    textFaint: '#475569',
    accent: '#a78bfa',
    accentBg: 'rgba(139,92,246,0.15)',
    accentBorder: 'rgba(139,92,246,0.3)',
    inputBg: 'rgba(255,255,255,0.06)',
    inputBorder: 'rgba(255,255,255,0.1)',
    danger: '#f87171',
    dangerBg: 'rgba(248,113,113,0.1)',
    success: '#34d399',
    successBg: 'rgba(52,211,153,0.12)',
    successBorder: 'rgba(52,211,153,0.3)',
    badgeBg: 'rgba(255,255,255,0.07)',
    badgeText: '#94a3b8',
};

const light: ThemeTokens = {
    bg: '#f1f5f9',
    bgHeader: 'rgba(255,255,255,0.92)',
    bgSidebar: '#ffffff',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    border: '#e2e8f0',
    text: '#0f172a',
    textMuted: '#64748b',
    textFaint: '#94a3b8',
    accent: '#7c3aed',
    accentBg: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.2)',
    inputBg: '#f8fafc',
    inputBorder: '#cbd5e1',
    danger: '#ef4444',
    dangerBg: 'rgba(239,68,68,0.08)',
    success: '#10b981',
    successBg: 'rgba(16,185,129,0.08)',
    successBorder: 'rgba(16,185,129,0.25)',
    badgeBg: '#f1f5f9',
    badgeText: '#64748b',
};

// ── Context ─────────────────────────────────────
interface ThemeCtx {
    theme: Theme;
    tokens: ThemeTokens;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
    theme: 'dark', tokens: dark, toggle: () => { },
});

export function ThemeProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            return (localStorage.getItem('theme') as Theme) || 'dark';
        } catch { return 'dark'; }
    });

    const toggle = () => setTheme(t => {
        const next = t === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        return next;
    });

    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, tokens: theme === 'dark' ? dark : light, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
