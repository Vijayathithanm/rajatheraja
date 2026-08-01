-- ============================================================================
-- Ilaiyaraaja website — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Every collection is one table with the same shape:
--   id text primary key, position int, data jsonb, updated_at timestamptz
-- The `data` column stores the full record exactly as the app expects it.
--
-- Row-Level Security:
--   • anyone (anon) may READ  — the public website needs this
--   • only AUTHENTICATED users may WRITE — protects the data from the public
--     anon key. Create an admin user under Authentication → Users, and log in
--     from the Admin dashboard to manage content.
-- ============================================================================

do $$
declare
  t text;
  tables text[] := array[
    'slides', 'news', 'posts', 'concerts', 'compositions',
    'products', 'gallery', 'quiz', 'awards'
  ];
begin
  foreach t in array tables loop
    execute format($f$
      create table if not exists public.%1$I (
        id text primary key,
        position integer not null default 0,
        data jsonb not null,
        updated_at timestamptz not null default now()
      );
      alter table public.%1$I enable row level security;
    $f$, t);

    execute format('drop policy if exists "%1$s_public_read" on public.%1$I;', t);
    execute format(
      'create policy "%1$s_public_read" on public.%1$I for select using (true);', t);

    execute format('drop policy if exists "%1$s_auth_write" on public.%1$I;', t);
    execute format(
      'create policy "%1$s_auth_write" on public.%1$I for all to authenticated using (true) with check (true);',
      t);
  end loop;
end $$;

-- Next: run seed.sql to populate the tables with the current content.
