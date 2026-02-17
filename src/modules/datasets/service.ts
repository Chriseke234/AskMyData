
import { createClient } from '@/shared/lib/supabase/server';
import { Dataset, DatasetInsert } from '@/shared/types/db';

export async function getDatasets(tenantId: string): Promise<Dataset[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching datasets:', error);
        return [];
    }
    return data;
}

export async function createDataset(dataset: DatasetInsert): Promise<Dataset | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('datasets')
        .insert(dataset)
        .select()
        .single();

    if (error) {
        console.error('Error creating dataset:', error);
        return null;
    }
    return data;
}
