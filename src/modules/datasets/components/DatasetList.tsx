
'use client';

import { Dataset } from '@/shared/types/db';
import { Card } from '@/shared/components/ui/Card';
import { FileSpreadsheet, Calendar, HardDrive } from 'lucide-react';

export function DatasetList({ datasets }: { datasets: Dataset[] }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {datasets.map((dataset) => (
                <Card key={dataset.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                                <FileSpreadsheet size={24} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 600 }}>{dataset.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{dataset.file_type.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    {dataset.description && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {dataset.description}
                        </p>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <HardDrive size={14} />
                            {(dataset.size_bytes / 1024).toFixed(1)} KB
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} />
                            {new Date(dataset.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
