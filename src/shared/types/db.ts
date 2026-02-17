
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    is_super_admin: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    is_super_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    is_super_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            tenants: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    domain: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    domain?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    domain?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            memberships: {
                Row: {
                    id: string
                    user_id: string
                    tenant_id: string
                    role: 'owner' | 'admin' | 'analyst' | 'viewer'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    tenant_id: string
                    role?: 'owner' | 'admin' | 'analyst' | 'viewer'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    tenant_id?: string
                    role?: 'owner' | 'admin' | 'analyst' | 'viewer'
                    created_at?: string
                    updated_at?: string
                }
            }
            datasets: {
                Row: {
                    id: string
                    tenant_id: string
                    name: string
                    description: string | null
                    file_path: string
                    file_type: string
                    size_bytes: number
                    row_count: number | null
                    created_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    tenant_id: string
                    name: string
                    description?: string | null
                    file_path: string
                    file_type: string
                    size_bytes: number
                    row_count?: number | null
                    created_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    tenant_id?: string
                    name?: string
                    description?: string | null
                    file_path?: string
                    file_type?: string
                    size_bytes?: number
                    row_count?: number | null
                    created_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            chat_sessions: {
                Row: {
                    id: string
                    tenant_id: string
                    user_id: string
                    title: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    tenant_id: string
                    user_id: string
                    title?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    tenant_id?: string
                    user_id?: string
                    title?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            chat_messages: {
                Row: {
                    id: string
                    session_id: string
                    role: 'user' | 'assistant' | 'system'
                    content: string
                    code_snippet: string | null
                    visualization_config: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    session_id: string
                    role: 'user' | 'assistant' | 'system'
                    content: string
                    code_snippet?: string | null
                    visualization_config?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    session_id?: string
                    role?: 'user' | 'assistant' | 'system'
                    content?: string
                    code_snippet?: string | null
                    visualization_config?: Json | null
                    created_at?: string
                }
            }
        }
    }
}

export type Tenant = Database['public']['Tables']['tenants']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Membership = Database['public']['Tables']['memberships']['Row']
export type Dataset = Database['public']['Tables']['datasets']['Row']
export type DatasetInsert = Database['public']['Tables']['datasets']['Insert']
export type ChatSession = Database['public']['Tables']['chat_sessions']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
