
import { getUserTenants } from '@/modules/tenants/service';
import { getDatasets } from '@/modules/datasets/service';
import { DatasetList } from '@/modules/datasets/components/DatasetList';
import { UploadDatasetButton } from '@/modules/datasets/components/UploadDatasetButton';
import { Card } from '@/shared/components/ui/Card';

export default async function DatasetsPage() {
    const tenants = await getUserTenants();

    if (!tenants.length) {
        return (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <p>You don't belong to any workspace. Please ask an admin to invite you.</p>
            </div>
        );
    }

    const currentTenant = tenants[0]; // Simplification for now
    const datasets = await getDatasets(currentTenant.id);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Datasets</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and analyze your data sources.</p>
                </div>
                <UploadDatasetButton tenantId={currentTenant.id} />
            </div>

            {datasets.length === 0 ? (
                <Card style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No datasets found. Upload one to get started.</p>
                </Card>
            ) : (
                <DatasetList datasets={datasets} />
            )}
        </div>
    );
}
