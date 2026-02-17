
'use client';

import { useState } from 'react';
import { createClient } from '@/shared/lib/supabase/client';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Upload, X, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DatasetUploadFormProps {
    tenantId: string;
    onSuccess: () => void;
}

export function DatasetUploadForm({ tenantId, onSuccess }: DatasetUploadFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (!name) {
                setName(selectedFile.name.split('.')[0]);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${tenantId}/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('datasets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Insert into DB
            const { error: dbError } = await supabase
                .from('datasets')
                .insert({
                    tenant_id: tenantId,
                    name,
                    description,
                    file_path: filePath,
                    file_type: fileExt || 'unknown',
                    size_bytes: file.size,
                    row_count: 0, // Pending analysis
                });

            if (dbError) throw dbError;

            router.refresh();
            onSuccess();
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--color-error)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            {!file ? (
                <div
                    style={{
                        border: '2px dashed var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                    }}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <Upload size={32} />
                        <p>Click to select a file (CSV, Excel)</p>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FileText size={20} color="var(--color-primary)" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{file.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFile(null)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            padding: '0.25rem'
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Dataset name"
            />

            <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <Button type="button" variant="outline" onClick={onSuccess} disabled={uploading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!file || uploading} loading={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
        </form>
    );
}
