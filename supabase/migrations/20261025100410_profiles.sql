-- Profiles: one row per auth user, created by trigger on sign up.
-- Public profile fields (slug, headline, skills) arrive with Profile v1.

create schema if not exists private;

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) between 1 and 80),
  region       text check (region in (
                 'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                 'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                 'upper_east', 'upper_west', 'volta', 'western', 'western_north'
               )),
  avatar_url   text,
  role         text not null default 'learner'
                 check (role in ('learner', 'mentor', 'admin')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on column public.profiles.region is
  'Ghana region slug; regional leaderboards and chapter routing key on this.';

-- Explicit even though the hosted project auto-enables RLS: local stacks don't.
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- RLS decides which rows; column grants decide which fields. Users can edit
-- their own name, region and avatar, never their role.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name, region, avatar_url) on public.profiles to authenticated;

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

-- Email sign up passes full_name in options.data; Google supplies full_name,
-- name and avatar_url itself. Both land in raw_user_meta_data.
create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    nullif(left(trim(coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    )), 80), ''),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

revoke execute on function private.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();
