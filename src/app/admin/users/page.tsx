
import { getAllUsers } from '@/modules/admin/service';
import { Card } from '@/shared/components/ui/Card';
import { User } from 'lucide-react';

export default async function AdminUsersPage() {
    const users = await getAllUsers();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Users</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage system users and their roles.</p>
            </div>

            <Card>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>User</th>
                                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email</th>
                                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Role</th>
                                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Joined</th>
                                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{user.full_name || 'No Name'}</span>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>{user.email}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        {user.is_super_admin ? (
                                            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '999px', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.75rem' }}>Admin</span>
                                        ) : (
                                            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '999px', backgroundColor: 'var(--border)', fontSize: '0.75rem' }}>User</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span style={{ color: 'var(--color-success)' }}>Active</span>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
