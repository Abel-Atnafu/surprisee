-- ============================================================
-- SAR Burger — Supabase schema
-- Paste into Supabase Studio → SQL Editor → New query → Run.
-- Idempotent: safe to re-run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- Tables
-- ============================================================

create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text default '',
  price       numeric not null default 0,
  category    text not null default 'Menu',
  available   boolean not null default true,
  sort_order  int not null default 0,
  image_url   text,
  created_at  timestamptz not null default now()
);

create table if not exists public.combos (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text default '',
  items_included  text[] not null default '{}',
  price           numeric not null default 0,
  featured        boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists public.hours (
  day     text primary key check (day in ('mon','tue','wed','thu','fri','sat','sun')),
  open    text not null default '11:00',
  close   text not null default '22:00',
  closed  boolean not null default false
);

create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  customer_name text default '',
  phone         text default '',
  items         text default '',
  total         numeric not null default 0,
  note          text default '',
  created_at    timestamptz not null default now()
);

create table if not exists public.settings (
  id              text primary key,
  phone           text default '251000000000',
  address         text default 'Addis Ababa, Ethiopia',
  maps_embed_url  text default '',
  admin_password  text default 'sarAdmin2025',
  tagline         text default 'Hand-crafted burgers, done properly.',
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- Seed: settings/global + 7 hours rows
-- ============================================================

insert into public.settings (id) values ('global')
on conflict (id) do nothing;

insert into public.hours (day) values
  ('mon'),('tue'),('wed'),('thu'),('fri'),('sat'),('sun')
on conflict (day) do nothing;

-- ============================================================
-- Realtime: enable change notifications for these tables
-- ============================================================

do $$
declare
  t text;
begin
  for t in select unnest(array['menu_items','combos','hours','orders','settings'])
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then
      null;
    end;
  end loop;
end $$;

-- ============================================================
-- Row Level Security
-- Open policies because the admin password gate is client-side.
-- For production, replace these with rules tied to Supabase Auth
-- (e.g. only authenticated users can write).
-- ============================================================

alter table public.menu_items enable row level security;
alter table public.combos     enable row level security;
alter table public.hours      enable row level security;
alter table public.orders     enable row level security;
alter table public.settings   enable row level security;

drop policy if exists "menu read"     on public.menu_items;
drop policy if exists "menu write"    on public.menu_items;
drop policy if exists "combos read"   on public.combos;
drop policy if exists "combos write"  on public.combos;
drop policy if exists "hours read"    on public.hours;
drop policy if exists "hours write"   on public.hours;
drop policy if exists "orders read"   on public.orders;
drop policy if exists "orders write"  on public.orders;
drop policy if exists "settings read" on public.settings;
drop policy if exists "settings write" on public.settings;

create policy "menu read"     on public.menu_items for select using (true);
create policy "menu write"    on public.menu_items for all    using (true) with check (true);

create policy "combos read"   on public.combos     for select using (true);
create policy "combos write"  on public.combos     for all    using (true) with check (true);

create policy "hours read"    on public.hours      for select using (true);
create policy "hours write"   on public.hours      for all    using (true) with check (true);

create policy "orders read"   on public.orders     for select using (true);
create policy "orders write"  on public.orders     for all    using (true) with check (true);

create policy "settings read" on public.settings   for select using (true);
create policy "settings write" on public.settings  for all    using (true) with check (true);
