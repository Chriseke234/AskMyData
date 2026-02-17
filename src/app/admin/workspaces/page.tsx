
import { getAllTenants } from '@/modules/admin/service';
import { Card } from '@/shared/components/ui/Card';
import { Database, Link as LinkIcon } from 'lucide-react';

export default async function AdminWorkspacesPage() {
    const tenants = await getAllTenants();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Workspaces</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage all tenant workspaces.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {tenants.map((tenant) => (
                    <Card key={tenant.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                                <Database size={24} color="var(--color-accent)" />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 600 }}>{tenant.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tenant.slug}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                            {tenant.domain ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <LinkIcon size={14} />
                                    {tenant.domain}
                                </div>
                            ) : (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No custom domain</span>
                            )}
                            <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Created {new Date(tenant.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
