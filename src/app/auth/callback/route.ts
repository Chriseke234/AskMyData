
import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Auto-provisioning logic
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // Check if user has any tenants
                const { data: memberships } = await supabase
                    .from('memberships')
                    .select('id')
                    .eq('user_id', user.id)
                    .limit(1)

                if (!memberships || memberships.length === 0) {
                    // Create default tenant
                    const tenantName = `${user.email?.split('@')[0]}'s Workspace`
                    const slug = `${user.email?.split('@')[0]}-personal-${Math.random().toString(36).substring(7)}`

                    const { data: tenant } = await supabase
                        .from('tenants')
                        .insert({
                            name: tenantName,
                            slug: slug,
                            created_by: user.id
                        })
                        .select()
                        .single()

                    if (tenant) {
                        // Create membership
                        await supabase
                            .from('memberships')
                            .insert({
                                user_id: user.id,
                                tenant_id: tenant.id,
                                role: 'owner'
                            })
                    }
                }
            }

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
