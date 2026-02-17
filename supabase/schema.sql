
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS (Public Profiles)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  is_super_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TENANTS (Workspaces)
create table public.tenants (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  domain text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MEMBERSHIPS (Users <-> Tenants)
create type public.membership_role as enum ('owner', 'admin', 'analyst', 'viewer');

create table public.memberships (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  tenant_id uuid references public.tenants(id) not null,
  role public.membership_role not null default 'viewer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tenant_id)
);

-- DATASETS
create table public.datasets (
  id uuid default uuid_generate_v4() primary key,
  tenant_id uuid references public.tenants(id) not null,
  name text not null,
  description text,
  file_path text not null,
  file_type text not null,
  size_bytes bigint not null,
  row_count bigint,
  created_by uuid references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CHAT SESSIONS
create table public.chat_sessions (
  id uuid default uuid_generate_v4() primary key,
  tenant_id uuid references public.tenants(id) not null,
  user_id uuid references public.users(id) not null,
  title text default 'New Chat',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CHAT MESSAGES
create table public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.chat_sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  code_snippet text,
  visualization_config jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Helper function to check if user is super admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.users
    where id = auth.uid() and is_super_admin = true
  );
end;
$$ language plpgsql security definer;

-- Users
alter table public.users enable row level security;
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);
create policy "Admins can view all profiles" on public.users
  for select using (public.is_admin());
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Tenants
alter table public.tenants enable row level security;
create policy "Members can view tenant details" on public.tenants
  for select using (
    exists (
      select 1 from public.memberships
      where memberships.tenant_id = tenants.id
      and memberships.user_id = auth.uid()
    ) or public.is_admin()
  );

-- Memberships
alter table public.memberships enable row level security;
create policy "Members can view memberships of their tenant" on public.memberships
  for select using (
    exists (
      select 1 from public.memberships as m
      where m.tenant_id = memberships.tenant_id
      and m.user_id = auth.uid()
    ) or public.is_admin()
  );

-- Datasets
alter table public.datasets enable row level security;
create policy "Members can view datasets of their tenant" on public.datasets
  for select using (
    exists (
      select 1 from public.memberships
      where memberships.tenant_id = datasets.tenant_id
      and memberships.user_id = auth.uid()
    ) or public.is_admin()
  );
create policy "Members can insert their own datasets" on public.datasets
  for insert with check (
    exists (
      select 1 from public.memberships
      where memberships.tenant_id = datasets.tenant_id
      and memberships.user_id = auth.uid()
    ) or public.is_admin()
  );
create policy "Members can update their own datasets" on public.datasets
  for update using (
    exists (
      select 1 from public.memberships
      where memberships.tenant_id = datasets.tenant_id
      and memberships.user_id = auth.uid()
    ) or public.is_admin()
  );

-- Chat Sessions
alter table public.chat_sessions enable row level security;
create policy "Users can view their own sessions" on public.chat_sessions
  for select using (auth.uid() = user_id);
create policy "Users can create their own sessions" on public.chat_sessions
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own sessions" on public.chat_sessions
  for update using (auth.uid() = user_id);

-- Chat Messages
alter table public.chat_messages enable row level security;
create policy "Users can view messages of their sessions" on public.chat_messages
  for select using (
    exists (
      select 1 from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );
create policy "Users can insert messages to their sessions" on public.chat_messages
  for insert with check (
    exists (
      select 1 from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
