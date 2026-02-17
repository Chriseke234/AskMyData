
import { createClient } from '@/shared/lib/supabase/server';
import { User, Tenant } from '@/shared/types/db';

export async function getAllUsers(): Promise<User[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    return data;
}

export async function getAllTenants(): Promise<Tenant[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tenants:', error);
        return [];
    }
    return data;
}
