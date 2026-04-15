-- Run once in the Supabase SQL Editor.
-- Creates the `insights` table with RLS allowing public reads of
-- published rows. Service-role access bypasses RLS automatically.

create table if not exists public.insights (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null,
  content         text not null,
  published_date  date not null,
  is_published    boolean not null default false,
  read_time       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists insights_published_date_idx
  on public.insights (published_date desc)
  where is_published = true;

alter table public.insights enable row level security;

drop policy if exists "insights_public_read_published" on public.insights;
create policy "insights_public_read_published"
  on public.insights
  for select
  to anon, authenticated
  using (is_published = true);
