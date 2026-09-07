create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact', 'corporate')),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null,
  email text not null,
  message text not null check (char_length(message) between 1 and 2000),
  organisation text,
  sector text,
  deadline date,
  status text not null default 'new' check (status in ('new', 'contacted', 'processing', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

create table if not exists public.prescription_inquiries (
  id uuid primary key,
  name text not null check (char_length(name) between 2 and 100),
  phone text not null,
  email text,
  message text check (char_length(message) <= 2000),
  storage_path text not null unique,
  original_file_name text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'application/pdf')),
  file_size integer not null check (file_size > 0 and file_size <= 5000000),
  status text not null default 'new' check (status in ('new', 'reviewing', 'responded', 'closed')),
  consented_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists prescription_inquiries_created_at_idx on public.prescription_inquiries (created_at desc);
create index if not exists prescription_inquiries_status_idx on public.prescription_inquiries (status);

alter table public.inquiries enable row level security;
alter table public.prescription_inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;
revoke all on table public.prescription_inquiries from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'prescriptions',
  'prescriptions',
  false,
  5000000,
  array['image/jpeg', 'image/png', 'application/pdf']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No public storage policy is created. Only server-side service-role requests
-- can write or read prescription objects until staff authentication is added.
