-- Phase 1, part 4: social graph, analytics, safety reports and the waitlist.

-- follows -----------------------------------------------------------------------

create table public.follows (
  follower_id  uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint follows_not_self check (follower_id <> following_id)
);

comment on table public.follows is
  'Who follows whom. Signed in users can see the graph and manage their own follows.';

-- The primary key covers lookups by follower; this covers "my followers".
create index follows_following_idx on public.follows (following_id);

alter table public.follows enable row level security;

create policy "Signed in users can see follows"
  on public.follows for select
  to authenticated
  using (true);

create policy "Users follow as themselves"
  on public.follows for insert
  to authenticated
  with check ((select auth.uid()) = follower_id);

create policy "Users unfollow as themselves"
  on public.follows for delete
  to authenticated
  using ((select auth.uid()) = follower_id);

revoke all on public.follows from anon, authenticated;
grant select, delete on public.follows to authenticated;
grant insert (follower_id, following_id) on public.follows to authenticated;
grant select, insert, update, delete on public.follows to service_role;

-- events ------------------------------------------------------------------------

-- First party product analytics. Write only from the client: anyone can add
-- an event, nobody but admins can read them back. The name list is fixed so
-- typos and junk don't pollute the funnel; extend it in a migration.
create table public.events (
  id           bigint generated always as identity primary key,
  name         text not null check (name in (
                 'page_view', 'signup_started', 'signup_completed',
                 'onboarding_completed', 'roadmap_viewed', 'node_opened',
                 'node_completed', 'quiz_submitted', 'path_quiz_started',
                 'path_quiz_completed', 'achievement_shared', 'profile_published',
                 'study_buddy_message', 'waitlist_joined'
               )),
  profile_id   uuid references public.profiles (id) on delete set null,
  anonymous_id text check (char_length(anonymous_id) <= 64),
  props        jsonb not null default '{}'
                 check (jsonb_typeof(props) = 'object' and pg_column_size(props) <= 4096),
  created_at   timestamptz not null default now()
);

comment on table public.events is
  'Analytics events. Insert only for anon and signed in users; admins read.';

create index events_name_created_idx on public.events (name, created_at);
create index events_profile_idx on public.events (profile_id);

alter table public.events enable row level security;

-- A signed in user may attach only their own id; visitors attach none.
create policy "Anyone can record an event"
  on public.events for insert
  to anon, authenticated
  with check (profile_id is null or profile_id = (select auth.uid()));

create policy "Admins read events"
  on public.events for select
  to authenticated
  using ((select private.is_admin()));

revoke all on public.events from anon, authenticated;
grant insert (name, profile_id, anonymous_id, props) on public.events to anon, authenticated;
grant select on public.events to authenticated;
grant select, insert, update, delete on public.events to service_role;

-- reports -----------------------------------------------------------------------

create table public.reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  target_type text not null check (target_type in (
                'profile', 'achievement', 'roadmap_node', 'node_resource', 'other'
              )),
  target_id   text not null check (char_length(target_id) between 1 and 100),
  reason      text not null check (char_length(reason) between 1 and 1000),
  status      text not null default 'open'
                check (status in ('open', 'reviewing', 'actioned', 'dismissed')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.reports is
  'Safety reports from signed in users. Reporters file; admins triage via status.';

create index reports_reporter_idx on public.reports (reporter_id);
create index reports_status_idx on public.reports (status, created_at);

alter table public.reports enable row level security;

create trigger reports_set_updated_at
  before update on public.reports
  for each row execute function private.set_updated_at();

create policy "Users file reports as themselves"
  on public.reports for insert
  to authenticated
  with check ((select auth.uid()) = reporter_id);

create policy "Admins read reports"
  on public.reports for select
  to authenticated
  using ((select private.is_admin()));

create policy "Admins update reports"
  on public.reports for update
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- status is the only field that changes after filing.
revoke all on public.reports from anon, authenticated;
grant insert (reporter_id, target_type, target_id, reason) on public.reports to authenticated;
grant select, update (status) on public.reports to authenticated;
grant select, insert, update, delete on public.reports to service_role;

-- waitlist ----------------------------------------------------------------------

create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null
               check (char_length(email) <= 254
                      and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  name       text check (char_length(name) <= 120),
  region     text check (region in (
               'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
               'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
               'upper_east', 'upper_west', 'volta', 'western', 'western_north'
             )),
  interest   text check (char_length(interest) <= 200),
  created_at timestamptz not null default now()
);

comment on table public.waitlist is
  'Marketing site sign ups. Anyone can join; only admins can read the list.';

-- One entry per address, case insensitive. A repeat sign up gets 23505,
-- which the site should treat as success.
create unique index waitlist_email_idx on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

create policy "Admins read the waitlist"
  on public.waitlist for select
  to authenticated
  using ((select private.is_admin()));

revoke all on public.waitlist from anon, authenticated;
grant insert (email, name, region, interest) on public.waitlist to anon, authenticated;
grant select on public.waitlist to authenticated;
grant select, insert, update, delete on public.waitlist to service_role;
