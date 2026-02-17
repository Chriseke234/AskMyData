
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Database, MessageSquare, BarChart2, Users, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { createClient } from '@/shared/lib/supabase/client';
import { Button } from '@/shared/components/ui/Button';
import styles from './AppShell.module.css';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Datasets', href: '/datasets', icon: Database },
    { label: 'Chat', href: '/chat', icon: MessageSquare },
    { label: 'Analysis', href: '/analysis', icon: BarChart2 },
    { label: 'Team', href: '/team', icon: Users },
    { label: 'Settings', href: '/settings', icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon} />
                        Ask My Data
                    </div>
                </div>

                <nav className={styles.nav}>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(styles.navItem, isActive && styles.navItemActive)}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Button variant="ghost" size="sm" fullWidth onClick={handleSignOut} style={{ justifyContent: 'flex-start', gap: '0.75rem', paddingLeft: '0.75rem' }}>
                        <LogOut size={18} />
                        Sign Out
                    </Button>
                </div>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h2 style={{ fontSize: '1.25rem' }}>
                        {/* Simple breadcrumb or title based on path */}
                        {pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1) || 'Dashboard'}
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* User Profile or Theme Toggle placeholder */}
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border)' }} />
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
