create table if not exists public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (char_length(slug) between 2 and 90),
  category text not null check (category in ('Over-the-counter products','First aid','Vitamins and supplements','Personal care','Medical supplies and devices','Mother and baby','Wellness products','Prescription medicines')),
  pack_size text check (pack_size is null or char_length(pack_size) <= 100),
  description text not null check (char_length(description) between 10 and 600),
  price_ugx integer check (price_ugx is null or price_ugx between 0 and 100000000),
  show_price boolean not null default false,
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock','low_stock','out_of_stock','coming_soon')),
  requires_prescription boolean not null default false,
  image_path text,
  image_url text,
  is_published boolean not null default false,
  is_archived boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not show_price or (price_ugx is not null and price_ugx > 0))
);

alter table public.catalog_products enable row level security;
revoke all on table public.catalog_products from anon, authenticated;

create index if not exists catalog_products_public_order_idx
  on public.catalog_products (is_published, is_archived, display_order, name);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5000000, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

