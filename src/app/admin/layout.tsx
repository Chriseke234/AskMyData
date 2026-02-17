
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Database, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { createClient } from '@/shared/lib/supabase/client';
import { Button } from '@/shared/components/ui/Button';
import styles from '@/shared/components/layout/AppShell.module.css'; // Reusing AppShell styles

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Workspaces', href: '/admin/workspaces', icon: Database },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar} style={{ borderRight: '1px solid var(--color-error)' }}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon} style={{ backgroundColor: 'var(--color-error)' }} />
                        Admin Panel
                    </div>
                </div>

                <nav className={styles.nav}>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href; // Exact match or startWith logic needed?

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
                    <Link href="/dashboard" style={{ display: 'block', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-primary)' }}>
                        &larr; Back to App
                    </Link>
                    <Button variant="ghost" size="sm" fullWidth onClick={handleSignOut} style={{ justifyContent: 'flex-start', gap: '0.75rem', paddingLeft: '0.75rem' }}>
                        <LogOut size={18} />
                        Sign Out
                    </Button>
                </div>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h2 style={{ fontSize: '1.25rem' }}>Admin Control Center</h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-error)' }} />
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
