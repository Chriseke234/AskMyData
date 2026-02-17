
import { createClient } from '@/shared/lib/supabase/server';
import { Tenant } from '@/shared/types/db';

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data;
}

export async function getUserTenants(): Promise<Tenant[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('memberships')
        .select('tenant_id, tenants(*)')
        .eq('user_id', user.id);

    if (error || !data) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((d: any) => d.tenants) as Tenant[];
}

export async function createTenant(name: string, slug: string): Promise<Tenant | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // 1. Create Tenant
    const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({ name, slug })
        .select()
        .single();

    if (tenantError || !tenant) return null;

    // 2. Create Membership (Owner)
    const { error: memberError } = await supabase
        .from('memberships')
        .insert({
            user_id: user.id,
            tenant_id: tenant.id,
            role: 'owner'
        });

    if (memberError) {
        // Rollback (delete tenant) - ideal to use RPC/Transaction.
        // For now logging error.
        console.error('Failed to create membership for new tenant', memberError);
        return null;
    }

    return tenant;
}
