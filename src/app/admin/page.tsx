
import { Card } from '@/shared/components/ui/Card';
import { Users, Database, Activity, Server } from 'lucide-react';

export default function AdminDashboardPage() {
    // Mock data for now
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'var(--color-primary)' },
        { label: 'Active Workspaces', value: '85', icon: Database, color: 'var(--color-accent)' },
        { label: 'Jobs Running', value: '12', icon: Activity, color: 'var(--color-warning)' },
        { label: 'System Uptime', value: '99.9%', icon: Server, color: 'var(--color-success)' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {stats.map((stat) => (
                    <Card key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                        <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                            <stat.icon size={24} color={stat.color} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <Card>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>User Growth</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)' }}>
                        Chart Placeholder
                    </div>
                </Card>
                <Card>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                <span>User {i} uploaded a dataset</span>
                                <span style={{ color: 'var(--text-muted)' }}>2m ago</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
