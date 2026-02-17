
import { getUserTenants } from '@/modules/tenants/service';
import { createClient } from '@/shared/lib/supabase/server';
import { ChatInterface } from '@/modules/chat/components/ChatInterface';

export default async function ChatPage() {
    const tenants = await getUserTenants();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!tenants.length || !user) {
        return <div>Please join a workspace first.</div>;
    }

    const currentTenant = tenants[0];

    return (
        <div style={{ height: '100%' }}>
            <ChatInterface tenantId={currentTenant.id} userId={user.id} />
        </div>
    );
}
