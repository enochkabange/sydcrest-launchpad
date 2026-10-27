-- Schema B (issue #158), part 3: events, RSVPs, check in, feedback and the
-- recordings library.
--
-- Named community_events because public.events is the Phase 1 analytics
-- table (track()); renaming it would not be additive. The child tables keep
-- the short event_ prefix.
--
-- The four event types of the events playbook (Planning 04 §1): in person
-- Skillshops, Launchpad Blueprint webinars (online, recorded), flagship
-- events and partner or campus activations. An event is online, in person or
-- both, optionally belongs to a chapter, and may have a capacity.
--
-- Hosts: admins for every event, chapter leads for their chapter's events.
-- Published, cancelled and completed events are public (and indexable);
-- drafts are hosts only. The join link and the check in code live in
-- event_access, which only hosts read: attendees get the join link from
-- event_join_link once they are going, and check in with the code through
-- check_in_event, which verifies it server side. RSVPs (capacity and
-- waitlist) and check ins are written only by functions. Feedback follows
-- the post event loop (Planning 04 §8): the impact snapshot questions, from
-- people who checked in.

-- community_events ------------------------------------------------------------

create table public.community_events (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  kind          text not null check (kind in ('skillshop', 'webinar', 'flagship', 'activation')),
  title         text not null check (char_length(title) between 1 and 120),
  summary       text check (char_length(summary) <= 500),
  description   text check (char_length(description) <= 8000),
  format        text not null check (format in ('online', 'in_person', 'hybrid')),
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  venue_name    text check (char_length(venue_name) <= 120),
  venue_address text check (char_length(venue_address) <= 300),
  city          text check (char_length(city) <= 80),
  region        text check (region in (
                  'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                  'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                  'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                )),
  chapter_id    uuid references public.chapters (id) on delete set null,
  capacity      integer check (capacity between 1 and 100000),
  status        text not null default 'draft'
                  check (status in ('draft', 'published', 'cancelled', 'completed')),
  created_by    uuid default auth.uid() references public.profiles (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint community_events_ends_after_start check (ends_at > starts_at),
  -- An in person event needs a venue before it goes out.
  constraint community_events_venue_when_published
    check (status = 'draft' or format = 'online' or venue_name is not null)
);

comment on table public.community_events is
  'Skillshops, webinars, flagship events and activations. Public unless draft. Admins host every event; chapter leads host their chapter''s.';
comment on column public.community_events.capacity is
  'Seats for going RSVPs; null is unlimited. Past capacity, RSVPs join the waitlist.';
comment on column public.community_events.status is
  'draft (hosts only), published, cancelled (kept public so links still explain), completed.';

create index community_events_starts_idx on public.community_events (starts_at) where status <> 'draft';
create index community_events_chapter_idx on public.community_events (chapter_id, starts_at);

alter table public.community_events enable row level security;

create trigger community_events_set_updated_at
  before update on public.community_events
  for each row execute function private.set_updated_at();

-- Admins, or a lead of the chapter the event belongs to.
create function private.hosts_chapter_event(p_chapter_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin()
      or (p_chapter_id is not null and private.is_chapter_lead(p_chapter_id));
$$;

revoke execute on function private.hosts_chapter_event(uuid) from public;
grant execute on function private.hosts_chapter_event(uuid) to anon, authenticated, service_role;

create function private.hosts_event(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_events e
    where e.id = p_event_id and private.hosts_chapter_event(e.chapter_id)
  );
$$;

revoke execute on function private.hosts_event(uuid) from public;
grant execute on function private.hosts_event(uuid) to anon, authenticated, service_role;

create function private.event_is_public(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.community_events where id = p_event_id and status <> 'draft');
$$;

revoke execute on function private.event_is_public(uuid) from public;
grant execute on function private.event_is_public(uuid) to anon, authenticated, service_role;

create policy "Events are public unless draft; hosts see drafts"
  on public.community_events for select
  to anon, authenticated
  using (status <> 'draft' or private.hosts_chapter_event(chapter_id));

create policy "Hosts create events"
  on public.community_events for insert
  to authenticated
  with check (private.hosts_chapter_event(chapter_id));

-- A lead cannot move an event to a chapter they do not lead.
create policy "Hosts edit events"
  on public.community_events for update
  to authenticated
  using (private.hosts_chapter_event(chapter_id))
  with check (private.hosts_chapter_event(chapter_id));

create policy "Admins delete events; leads delete drafts"
  on public.community_events for delete
  to authenticated
  using ((select private.is_admin()) or (status = 'draft' and private.hosts_chapter_event(chapter_id)));

revoke all on public.community_events from anon, authenticated;
grant select on public.community_events to anon, authenticated;
grant insert (slug, kind, title, summary, description, format, starts_at, ends_at, venue_name,
              venue_address, city, region, chapter_id, capacity, status)
  on public.community_events to authenticated;
grant update (slug, kind, title, summary, description, format, starts_at, ends_at, venue_name,
              venue_address, city, region, chapter_id, capacity, status)
  on public.community_events to authenticated;
grant delete on public.community_events to authenticated;
grant select, insert, update, delete on public.community_events to service_role;

-- event_access ----------------------------------------------------------------

-- Eight characters from an alphabet without look alikes (no 0, O, 1, I):
-- easy to read out at a venue, about 10^12 combinations.
create function private.new_checkin_code()
returns text
language sql
volatile
set search_path = ''
as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', (get_byte(b, i) % 32) + 1, 1), '' order by i)
  from (select extensions.gen_random_bytes(8) as b) r, generate_series(0, 7) as i;
$$;

revoke execute on function private.new_checkin_code() from public;
grant execute on function private.new_checkin_code() to service_role;

create table public.event_access (
  event_id     uuid primary key references public.community_events (id) on delete cascade,
  join_url     text check (char_length(join_url) <= 500 and join_url ~ '^https://'),
  checkin_code text not null default private.new_checkin_code()
                 check (checkin_code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  updated_at   timestamptz not null default now()
);

comment on table public.event_access is
  'Hosts only: the online join link and the check in code. Attendees get the link through event_join_link and check in through check_in_event.';

alter table public.event_access enable row level security;

create trigger event_access_set_updated_at
  before update on public.event_access
  for each row execute function private.set_updated_at();

create policy "Hosts read event access"
  on public.event_access for select
  to authenticated
  using (private.hosts_event(event_id));

create policy "Hosts set the join link"
  on public.event_access for update
  to authenticated
  using (private.hosts_event(event_id))
  with check (private.hosts_event(event_id));

revoke all on public.event_access from anon, authenticated;
grant select on public.event_access to authenticated;
grant update (join_url) on public.event_access to authenticated;
grant select, insert, update, delete on public.event_access to service_role;

-- Every event gets its access row (and a code) when created.
create function private.create_event_access()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.event_access (event_id) values (new.id);
  return new;
end;
$$;

revoke execute on function private.create_event_access() from public, anon, authenticated;

create trigger community_events_create_access
  after insert on public.community_events
  for each row execute function private.create_event_access();

-- A new code, for when the old one leaked. Hosts only; returns the code.
create function public.rotate_event_checkin_code(p_event_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_code text;
begin
  if not private.hosts_event(p_event_id) then
    raise exception 'Hosts only' using errcode = '42501';
  end if;
  update public.event_access set checkin_code = private.new_checkin_code()
  where event_id = p_event_id
  returning checkin_code into v_code;
  return v_code;
end;
$$;

revoke execute on function public.rotate_event_checkin_code(uuid) from public, anon;
grant execute on function public.rotate_event_checkin_code(uuid) to authenticated, service_role;

-- event_rsvps -----------------------------------------------------------------

create table public.event_rsvps (
  event_id     uuid not null references public.community_events (id) on delete cascade,
  profile_id   uuid not null references public.profiles (id) on delete cascade,
  status       text not null check (status in ('going', 'waitlisted', 'cancelled')),
  responded_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (event_id, profile_id)
);

comment on table public.event_rsvps is
  'One RSVP per person per event. Written only by rsvp_event, cancel_rsvp and check in. The waitlist is ordered by responded_at.';

create index event_rsvps_profile_idx on public.event_rsvps (profile_id);
create index event_rsvps_waitlist_idx on public.event_rsvps (event_id, responded_at) where status = 'waitlisted';

alter table public.event_rsvps enable row level security;

create trigger event_rsvps_set_updated_at
  before update on public.event_rsvps
  for each row execute function private.set_updated_at();

create policy "People read their RSVPs; hosts read their events'"
  on public.event_rsvps for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.hosts_event(event_id));

revoke all on public.event_rsvps from anon, authenticated;
grant select on public.event_rsvps to authenticated;
grant select, insert, update, delete on public.event_rsvps to service_role;

-- Move waitlisted people up while there are free seats, oldest first, and
-- tell them. The caller holds the event row lock.
create function private.fill_event_from_waitlist(p_event_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_event    public.community_events%rowtype;
  v_free     integer;
  v_promoted integer := 0;
  v_profile  uuid;
begin
  select * into v_event from public.community_events where id = p_event_id;
  if v_event.status <> 'published' or v_event.ends_at <= now() then
    return 0;
  end if;
  if v_event.capacity is null then
    v_free := 2147483647;
  else
    select v_event.capacity - count(*) into v_free
    from public.event_rsvps where event_id = p_event_id and status = 'going';
  end if;
  while v_free > 0 loop
    select profile_id into v_profile from public.event_rsvps
    where event_id = p_event_id and status = 'waitlisted'
    order by responded_at, profile_id
    limit 1
    for update;
    exit when v_profile is null;
    update public.event_rsvps set status = 'going'
    where event_id = p_event_id and profile_id = v_profile;
    perform private.notify(v_profile, 'event_waitlist_promoted',
      jsonb_build_object('event_id', v_event.id, 'event_slug', v_event.slug,
                         'event_title', v_event.title, 'starts_at', v_event.starts_at));
    v_promoted := v_promoted + 1;
    v_free := v_free - 1;
    v_profile := null;
  end loop;
  return v_promoted;
end;
$$;

revoke execute on function private.fill_event_from_waitlist(uuid) from public, anon, authenticated;

-- RSVP to a published event that has not ended. Returns 'going' or
-- 'waitlisted'. Repeating an RSVP keeps the current place.
create function public.rsvp_event(p_event_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid    uuid := (select auth.uid());
  v_event  public.community_events%rowtype;
  v_status text;
  v_going  integer;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  -- Lock the event so two people cannot take the last seat.
  select * into v_event from public.community_events where id = p_event_id for update;
  if not found or v_event.status = 'draft' then
    raise exception 'Event not found' using errcode = 'P0002';
  end if;
  if v_event.status <> 'published' or v_event.ends_at <= now() then
    raise exception 'This event is not taking RSVPs' using errcode = '22023';
  end if;

  select status into v_status from public.event_rsvps
  where event_id = p_event_id and profile_id = v_uid;
  if v_status in ('going', 'waitlisted') then
    return v_status;
  end if;

  select count(*) into v_going from public.event_rsvps
  where event_id = p_event_id and status = 'going';
  v_status := case
    when v_event.capacity is null or v_going < v_event.capacity then 'going'
    else 'waitlisted'
  end;

  insert into public.event_rsvps (event_id, profile_id, status, responded_at)
  values (p_event_id, v_uid, v_status, now())
  on conflict (event_id, profile_id)
  do update set status = excluded.status, responded_at = excluded.responded_at;
  return v_status;
end;
$$;

revoke execute on function public.rsvp_event(uuid) from public, anon;
grant execute on function public.rsvp_event(uuid) to authenticated, service_role;

-- Cancel the caller's RSVP. A freed seat goes to the first waitlisted person.
create function public.cancel_rsvp(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  perform 1 from public.community_events where id = p_event_id for update;
  update public.event_rsvps set status = 'cancelled'
  where event_id = p_event_id and profile_id = v_uid and status <> 'cancelled';
  if found then
    perform private.fill_event_from_waitlist(p_event_id);
  end if;
end;
$$;

revoke execute on function public.cancel_rsvp(uuid) from public, anon;
grant execute on function public.cancel_rsvp(uuid) to authenticated, service_role;

-- Hosts changing an event: more seats fill from the waitlist; cancelling or
-- moving it tells everyone going or waitlisted.
create function private.after_event_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'published'
     and (new.capacity is distinct from old.capacity or old.status <> 'published') then
    perform private.fill_event_from_waitlist(new.id);
  end if;
  if old.status = 'published'
     and (new.status = 'cancelled' or new.starts_at is distinct from old.starts_at
          or new.venue_name is distinct from old.venue_name) then
    perform private.notify(r.profile_id, 'event_update',
      jsonb_build_object('event_id', new.id, 'event_slug', new.slug, 'event_title', new.title,
                         'status', new.status, 'starts_at', new.starts_at))
    from public.event_rsvps r
    where r.event_id = new.id and r.status in ('going', 'waitlisted');
  end if;
  return new;
end;
$$;

revoke execute on function private.after_event_change() from public, anon, authenticated;

create trigger community_events_after_change
  after update of capacity, status, starts_at, venue_name on public.community_events
  for each row execute function private.after_event_change();

-- The join link for people going (and hosts). Null when there is none.
create function public.event_join_link(p_event_id uuid)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_url text;
begin
  if not (private.hosts_event(p_event_id) or exists (
    select 1 from public.event_rsvps
    where event_id = p_event_id and profile_id = (select auth.uid()) and status = 'going'
  )) then
    raise exception 'RSVP first' using errcode = '42501';
  end if;
  select join_url into v_url from public.event_access where event_id = p_event_id;
  return v_url;
end;
$$;

revoke execute on function public.event_join_link(uuid) from public, anon;
grant execute on function public.event_join_link(uuid) to authenticated, service_role;

-- event_attendance (view) -----------------------------------------------------

-- Real counts for public event pages: going, waitlisted, seats left.
create function private.event_attendance_rows()
returns table (
  event_id       uuid,
  going_count    integer,
  waitlist_count integer,
  seats_left     integer
)
language sql
stable
security definer
set search_path = ''
as $$
  select e.id,
         count(*) filter (where r.status = 'going')::integer,
         count(*) filter (where r.status = 'waitlisted')::integer,
         case when e.capacity is null then null
              else greatest(e.capacity - count(*) filter (where r.status = 'going'), 0)::integer end
  from public.community_events e
  left join public.event_rsvps r on r.event_id = e.id
  where e.status <> 'draft' or private.hosts_chapter_event(e.chapter_id)
  group by e.id, e.capacity;
$$;

revoke execute on function private.event_attendance_rows() from public;
grant execute on function private.event_attendance_rows() to anon, authenticated, service_role;

create view public.event_attendance
  with (security_invoker = true)
as
  select * from private.event_attendance_rows();

comment on view public.event_attendance is
  'Going and waitlisted counts and seats left per visible event. Numbers only, no names.';

revoke all on public.event_attendance from anon, authenticated;
grant select on public.event_attendance to anon, authenticated, service_role;

-- event_checkins --------------------------------------------------------------

create table public.event_checkins (
  event_id      uuid not null references public.community_events (id) on delete cascade,
  profile_id    uuid not null references public.profiles (id) on delete cascade,
  method        text not null check (method in ('code', 'host')),
  checked_in_by uuid references public.profiles (id) on delete set null,
  checked_in_at timestamptz not null default now(),
  primary key (event_id, profile_id)
);

comment on table public.event_checkins is
  'Attendance. Written only by check_in_event (the code, verified server side) or host_check_in.';

create index event_checkins_profile_idx on public.event_checkins (profile_id);

alter table public.event_checkins enable row level security;

create policy "People read their check ins; hosts read their events'"
  on public.event_checkins for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.hosts_event(event_id));

revoke all on public.event_checkins from anon, authenticated;
grant select on public.event_checkins to authenticated;
grant select, insert, update, delete on public.event_checkins to service_role;

-- Check in during the event (from two hours before the start to two hours
-- after the end) with the code shown at the venue or in the webinar. Case,
-- spaces and hyphens are ignored. Walk ins count: checking in makes the
-- RSVP going. Idempotent.
create function public.check_in_event(p_event_id uuid, p_code text)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid   uuid := (select auth.uid());
  v_event public.community_events%rowtype;
  v_code  text;
  v_at    timestamptz;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  select * into v_event from public.community_events where id = p_event_id;
  if not found or v_event.status = 'draft' then
    raise exception 'Event not found' using errcode = 'P0002';
  end if;
  if v_event.status <> 'published'
     or now() < v_event.starts_at - interval '2 hours'
     or now() > v_event.ends_at + interval '2 hours' then
    raise exception 'Check in is not open' using errcode = '22023';
  end if;
  select checkin_code into v_code from public.event_access where event_id = p_event_id;
  if v_code is null
     or upper(regexp_replace(coalesce(p_code, ''), '[[:space:]-]', '', 'g')) <> v_code then
    raise exception 'Wrong code' using errcode = '22023';
  end if;

  insert into public.event_checkins (event_id, profile_id, method)
  values (p_event_id, v_uid, 'code')
  on conflict (event_id, profile_id) do nothing;
  insert into public.event_rsvps (event_id, profile_id, status)
  values (p_event_id, v_uid, 'going')
  on conflict (event_id, profile_id) do update set status = 'going';

  select checked_in_at into v_at from public.event_checkins
  where event_id = p_event_id and profile_id = v_uid;
  return v_at;
end;
$$;

revoke execute on function public.check_in_event(uuid, text) from public, anon;
grant execute on function public.check_in_event(uuid, text) to authenticated, service_role;

-- Hosts check in someone who RSVPed (no phone with them, say).
create function public.host_check_in(p_event_id uuid, p_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.hosts_event(p_event_id) then
    raise exception 'Hosts only' using errcode = '42501';
  end if;
  if not exists (select 1 from public.event_rsvps where event_id = p_event_id and profile_id = p_profile_id) then
    raise exception 'No RSVP for this person' using errcode = 'P0002';
  end if;
  insert into public.event_checkins (event_id, profile_id, method, checked_in_by)
  values (p_event_id, p_profile_id, 'host', (select auth.uid()))
  on conflict (event_id, profile_id) do nothing;
  update public.event_rsvps set status = 'going'
  where event_id = p_event_id and profile_id = p_profile_id;
end;
$$;

revoke execute on function public.host_check_in(uuid, uuid) from public, anon;
grant execute on function public.host_check_in(uuid, uuid) to authenticated, service_role;

-- event_attendees (view) ------------------------------------------------------

-- Hosts see who RSVPed and who came, with names. Nobody else.
create function private.event_attendee_rows()
returns table (
  event_id      uuid,
  profile_id    uuid,
  display_name  text,
  avatar_url    text,
  public_slug   text,
  rsvp_status   text,
  responded_at  timestamptz,
  checked_in_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select r.event_id, r.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         r.status, r.responded_at, c.checked_in_at
  from public.event_rsvps r
  join public.profiles p on p.id = r.profile_id
  left join public.event_checkins c on c.event_id = r.event_id and c.profile_id = r.profile_id
  where private.hosts_event(r.event_id);
$$;

revoke execute on function private.event_attendee_rows() from public;
grant execute on function private.event_attendee_rows() to authenticated, service_role;

create view public.event_attendees
  with (security_invoker = true)
as
  select * from private.event_attendee_rows();

comment on view public.event_attendees is
  'For hosts: RSVPs and check ins of their events with name and avatar. Never phone or email.';

revoke all on public.event_attendees from anon, authenticated;
grant select on public.event_attendees to authenticated, service_role;

-- event_feedback --------------------------------------------------------------

create function private.attended_event(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.event_checkins
    where event_id = p_event_id and profile_id = (select auth.uid())
  );
$$;

revoke execute on function private.attended_event(uuid) from public;
grant execute on function private.attended_event(uuid) to authenticated, service_role;

create function private.event_has_started(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.community_events where id = p_event_id and starts_at <= now());
$$;

revoke execute on function private.event_has_started(uuid) from public;
grant execute on function private.event_has_started(uuid) to authenticated, service_role;

-- The impact snapshot from the events playbook: scores 1 to 5, recommend 0
-- to 10, attend again, an optional comment and consent to quote it.
create table public.event_feedback (
  event_id      uuid not null references public.community_events (id) on delete cascade,
  profile_id    uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  confidence    smallint check (confidence between 1 and 5),
  usefulness    smallint check (usefulness between 1 and 5),
  clarity       smallint check (clarity between 1 and 5),
  logistics     smallint check (logistics between 1 and 5),
  recommend     smallint check (recommend between 0 and 10),
  attend_again  boolean,
  comment       text check (char_length(comment) <= 2000),
  quote_consent boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (event_id, profile_id),
  constraint event_feedback_not_empty check (
    num_nonnulls(confidence, usefulness, clarity, logistics, recommend, attend_again, comment) > 0
  )
);

comment on table public.event_feedback is
  'Post event feedback from people who checked in. Owner and hosts read; quote_consent gates any public use of the comment.';

alter table public.event_feedback enable row level security;

create trigger event_feedback_set_updated_at
  before update on public.event_feedback
  for each row execute function private.set_updated_at();

create policy "Attendees and hosts read feedback"
  on public.event_feedback for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.hosts_event(event_id));

create policy "Attendees give feedback once the event has started"
  on public.event_feedback for insert
  to authenticated
  with check (
    profile_id = (select auth.uid())
    and private.attended_event(event_id)
    and private.event_has_started(event_id)
  );

create policy "Attendees edit their feedback"
  on public.event_feedback for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

revoke all on public.event_feedback from anon, authenticated;
grant select on public.event_feedback to authenticated;
grant insert (event_id, profile_id, confidence, usefulness, clarity, logistics, recommend,
              attend_again, comment, quote_consent) on public.event_feedback to authenticated;
grant update (confidence, usefulness, clarity, logistics, recommend, attend_again, comment,
              quote_consent) on public.event_feedback to authenticated;
grant select, insert, update, delete on public.event_feedback to service_role;

-- The impact snapshot for hosts: counts and averages, real numbers only
-- (null when nobody answered).
create function public.event_feedback_summary(p_event_id uuid)
returns table (
  rsvps_going       integer,
  checked_in        integer,
  responses         integer,
  avg_confidence    numeric,
  avg_usefulness    numeric,
  avg_clarity       numeric,
  avg_logistics     numeric,
  avg_recommend     numeric,
  attend_again_rate numeric
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.hosts_event(p_event_id) then
    raise exception 'Hosts only' using errcode = '42501';
  end if;
  return query
    select
      (select count(*)::integer from public.event_rsvps where event_id = p_event_id and status = 'going'),
      (select count(*)::integer from public.event_checkins where event_id = p_event_id),
      count(*)::integer,
      round(avg(f.confidence), 2), round(avg(f.usefulness), 2), round(avg(f.clarity), 2),
      round(avg(f.logistics), 2), round(avg(f.recommend), 2),
      round(avg(case when f.attend_again then 1.0 when f.attend_again is not null then 0.0 end), 2)
    from public.event_feedback f
    where f.event_id = p_event_id;
end;
$$;

revoke execute on function public.event_feedback_summary(uuid) from public, anon;
grant execute on function public.event_feedback_summary(uuid) to authenticated, service_role;

-- event_recordings ------------------------------------------------------------

create table public.event_recordings (
  id               uuid primary key default gen_random_uuid(),
  event_id         uuid not null references public.community_events (id) on delete cascade,
  title            text not null check (char_length(title) between 1 and 160),
  summary          text check (char_length(summary) <= 2000),
  video_url        text not null check (char_length(video_url) <= 500 and video_url ~ '^https://'),
  duration_minutes integer check (duration_minutes between 1 and 1440),
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.event_recordings is
  'Recordings library (webinars first). Published recordings of public events are public; hosts manage.';

create index event_recordings_event_idx on public.event_recordings (event_id);

alter table public.event_recordings enable row level security;

create trigger event_recordings_set_updated_at
  before update on public.event_recordings
  for each row execute function private.set_updated_at();

create policy "Published recordings are public; hosts see all"
  on public.event_recordings for select
  to anon, authenticated
  using ((is_published and private.event_is_public(event_id)) or private.hosts_event(event_id));

create policy "Hosts add recordings"
  on public.event_recordings for insert
  to authenticated
  with check (private.hosts_event(event_id));

create policy "Hosts edit recordings"
  on public.event_recordings for update
  to authenticated
  using (private.hosts_event(event_id))
  with check (private.hosts_event(event_id));

create policy "Hosts remove recordings"
  on public.event_recordings for delete
  to authenticated
  using (private.hosts_event(event_id));

revoke all on public.event_recordings from anon, authenticated;
grant select on public.event_recordings to anon, authenticated;
grant insert (event_id, title, summary, video_url, duration_minutes, is_published)
  on public.event_recordings to authenticated;
grant update (title, summary, video_url, duration_minutes, is_published)
  on public.event_recordings to authenticated;
grant delete on public.event_recordings to authenticated;
grant select, insert, update, delete on public.event_recordings to service_role;
