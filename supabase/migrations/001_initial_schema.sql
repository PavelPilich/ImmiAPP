-- ImmiGuide Initial Schema
-- Run this in Supabase SQL Editor after creating your project

-- ============================================================
-- 1. PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null default '',
  email text not null default '',
  phone text,
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.email, '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 2. SAVED FORMS
-- ============================================================
create table if not exists public.saved_forms (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  form_type text not null,
  form_data jsonb not null default '{}',
  current_section int not null default 0,
  status text not null default 'draft',
  package_type text,
  case_reference text,
  uscis_confirmation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_saved_forms_user on public.saved_forms(user_id);

alter table public.saved_forms enable row level security;

create policy "Users can view own forms"
  on public.saved_forms for select using (auth.uid() = user_id);
create policy "Users can insert own forms"
  on public.saved_forms for insert with check (auth.uid() = user_id);
create policy "Users can update own forms"
  on public.saved_forms for update using (auth.uid() = user_id);
create policy "Users can delete own forms"
  on public.saved_forms for delete using (auth.uid() = user_id);

-- ============================================================
-- 3. UPLOADS
-- ============================================================
create table if not exists public.uploads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  saved_form_id uuid references public.saved_forms(id) on delete cascade not null,
  document_type text not null,
  storage_path text not null,
  file_name text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

alter table public.uploads enable row level security;

create policy "Users can view own uploads"
  on public.uploads for select using (auth.uid() = user_id);
create policy "Users can insert own uploads"
  on public.uploads for insert with check (auth.uid() = user_id);
create policy "Users can delete own uploads"
  on public.uploads for delete using (auth.uid() = user_id);

-- ============================================================
-- 4. PAYMENTS
-- ============================================================
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  saved_form_id uuid references public.saved_forms(id) on delete cascade not null,
  stripe_payment_intent_id text,
  paypal_order_id text,
  method text not null,
  amount_cents int not null,
  currency text not null default 'usd',
  status text not null default 'pending',
  promo_code text,
  discount_cents int not null default 0,
  receipt_url text,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select using (auth.uid() = user_id);
create policy "Users can insert own payments"
  on public.payments for insert with check (auth.uid() = user_id);

-- ============================================================
-- 5. PROMO CODES
-- ============================================================
create table if not exists public.promo_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  discount_percent int not null,
  max_uses int,
  current_uses int not null default 0,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  is_active boolean not null default true
);

alter table public.promo_codes enable row level security;

-- Anyone authenticated can read promo codes (to validate them)
create policy "Authenticated users can read promo codes"
  on public.promo_codes for select to authenticated using (true);

-- Seed WELCOME10
insert into public.promo_codes (code, discount_percent, max_uses, is_active)
values ('WELCOME10', 10, null, true)
on conflict (code) do nothing;

-- ============================================================
-- 6. UPDATED_AT TRIGGERS
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_saved_forms_updated_at
  before update on public.saved_forms
  for each row execute function public.set_updated_at();

-- ============================================================
-- 7. STORAGE BUCKET
-- ============================================================
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Users can upload to their own folder
create policy "Users can upload own documents"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Users can read own documents
create policy "Users can read own documents"
  on storage.objects for select to authenticated
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Users can delete own documents
create policy "Users can delete own documents"
  on storage.objects for delete to authenticated
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
