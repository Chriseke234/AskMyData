
'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Modal } from '@/shared/components/ui/Modal';
import { Upload } from 'lucide-react';
import { DatasetUploadForm } from './DatasetUploadForm';

export function UploadDatasetButton({ tenantId }: { tenantId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Upload size={16} style={{ marginRight: '0.5rem' }} />
                Upload Dataset
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Upload Dataset">
                <DatasetUploadForm tenantId={tenantId} onSuccess={() => setIsOpen(false)} />
            </Modal>
        </>
    );
}
