-- Favourites: products a signed-in shopper has saved.
-- Applied to kanta-dev on 2026-11-21. Each user can only read, add and remove their own rows.
create table public.favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
create index favourites_user_created_idx on public.favourites (user_id, created_at desc);
create index favourites_product_idx on public.favourites (product_id);

alter table public.favourites enable row level security;

revoke all on public.favourites from anon, authenticated;
grant select, insert, delete on public.favourites to authenticated;

create policy "Users read their own favourites" on public.favourites
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users add their own favourites" on public.favourites
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users remove their own favourites" on public.favourites
  for delete to authenticated using ((select auth.uid()) = user_id);

comment on table public.favourites is 'Products a signed-in shopper has saved. Each user can only see and change their own rows.';
