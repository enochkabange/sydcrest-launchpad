-- Market and Earn, part 3 (issue #148): briefs and pitches, booking requests
-- and their messages, expert reviews, and the public expert directory.
--
-- A booking is an agreement to meet or deliver, never a payment: its status
-- is requested, accepted, declined, completed or cancelled, and no column
-- records money. Reviews exist only for completed bookings, one per booking,
-- written by the person who booked.

-- briefs ------------------------------------------------------------------------------

create table public.briefs (
  id                    uuid primary key default gen_random_uuid(),
  kind                  text not null default 'advice' check (kind in ('advice', 'job')),
  poster_id             uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  organisation_id       uuid references public.organisations (id) on delete cascade,
  title                 text not null check (char_length(title) between 1 and 120),
  description           text not null check (char_length(description) between 1 and 4000),
  skills                text[] not null default '{}' check (cardinality(skills) <= 20),
  categories            text[] not null default '{}' check (cardinality(categories) <= 5),
  indicative_budget_ghs integer check (indicative_budget_ghs between 0 and 1000000),
  location              text check (char_length(location) <= 120),
  is_remote             boolean not null default true,
  deadline              date,
  status                text not null default 'open'
                          check (status in ('open', 'closed', 'awarded', 'cancelled')),
  awarded_at            timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint briefs_job_needs_organisation check (kind <> 'job' or organisation_id is not null),
  check ((status = 'awarded') = (awarded_at is not null))
);

comment on table public.briefs is
  'A buyer''s request for experts to pitch on. advice: any adult (Phase 3). job: posted for a verified organisation by its owner, admin or recruiter (Phase 4). Approved experts read open briefs.';
comment on column public.briefs.indicative_budget_ghs is
  'Display only, in whole cedis. Never charged, no payment state: SydCrest never custodies funds.';

create index briefs_open_idx on public.briefs (status, created_at desc);
create index briefs_poster_idx on public.briefs (poster_id);
create index briefs_organisation_idx on public.briefs (organisation_id);
create index briefs_skills_idx on public.briefs using gin (skills);

alter table public.briefs enable row level security;

create trigger briefs_set_updated_at
  before update on public.briefs
  for each row execute function private.set_updated_at();

-- pitches -------------------------------------------------------------------------------

create table public.pitches (
  id                   uuid primary key default gen_random_uuid(),
  brief_id             uuid not null references public.briefs (id) on delete cascade,
  expert_id            uuid not null default auth.uid() references public.expert_profiles (profile_id) on delete cascade,
  offer_id             uuid references public.offers (id) on delete set null,
  message              text not null check (char_length(message) between 1 and 3000),
  proposed_timeline    text check (char_length(proposed_timeline) <= 300),
  indicative_price_ghs integer check (indicative_price_ghs between 0 and 1000000),
  status               text not null default 'submitted'
                         check (status in ('submitted', 'accepted', 'declined', 'withdrawn')),
  decided_at           timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique (brief_id, expert_id)
);

comment on table public.pitches is
  'An approved expert''s response to a brief. The buyer accepts one with accept_pitch (which opens an accepted booking) or declines with decline_pitch; the expert can edit or withdraw while submitted.';
comment on column public.pitches.indicative_price_ghs is
  'Display only, in whole cedis. Never charged, no payment state.';

create index pitches_expert_idx on public.pitches (expert_id);
create index pitches_offer_idx on public.pitches (offer_id);

alter table public.pitches enable row level security;

create trigger pitches_set_updated_at
  before update on public.pitches
  for each row execute function private.set_updated_at();

-- Brief helpers ---------------------------------------------------------------------------

-- The caller manages the brief: they posted it, or they are an active owner,
-- admin or recruiter of its organisation.
create function private.can_manage_brief(p_brief_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.briefs b
    where b.id = p_brief_id
      and (b.poster_id = (select auth.uid())
           or (b.organisation_id is not null
               and coalesce(private.org_role(b.organisation_id) in ('owner', 'admin', 'recruiter'), false)))
  );
$$;

-- Who may read a brief: those who manage it, any active member of its
-- organisation, approved experts while it is open, experts who pitched on it,
-- and admins.
create function private.can_read_brief(p_brief_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.briefs b
    where b.id = p_brief_id
      and (
        b.poster_id = (select auth.uid())
        or (b.organisation_id is not null and private.org_role(b.organisation_id) is not null)
        or (b.status = 'open' and private.is_approved_expert((select auth.uid())))
        or exists (select 1 from public.pitches pt where pt.brief_id = b.id and pt.expert_id = (select auth.uid()))
        or private.is_admin()
      )
  );
$$;

create function private.can_pitch(p_brief_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_adult((select auth.uid()))
     and private.is_approved_expert((select auth.uid()))
     and exists (
       select 1 from public.briefs b
       where b.id = p_brief_id and b.status = 'open'
         and b.poster_id <> (select auth.uid())
         and (b.organisation_id is null or private.org_role(b.organisation_id) is null)
     );
$$;

revoke execute on function private.can_manage_brief(uuid) from public;
revoke execute on function private.can_read_brief(uuid) from public;
revoke execute on function private.can_pitch(uuid) from public;
grant execute on function private.can_manage_brief(uuid) to authenticated, service_role;
grant execute on function private.can_read_brief(uuid) to authenticated, service_role;
grant execute on function private.can_pitch(uuid) to authenticated, service_role;

-- Brief policies ------------------------------------------------------------------------------

create policy "Posters, their organisation, approved experts and admins read briefs"
  on public.briefs for select
  to authenticated
  using (private.can_read_brief(id));

create policy "Adults post briefs; job briefs only for a verified organisation"
  on public.briefs for insert
  to authenticated
  with check (
    poster_id = (select auth.uid())
    and private.is_adult((select auth.uid()))
    and (organisation_id is null or private.can_post_for_org(organisation_id))
  );

-- Editable while open or closed; a poster can close, reopen or cancel.
-- Awarding happens only through accept_pitch.
create policy "Brief managers edit open or closed briefs"
  on public.briefs for update
  to authenticated
  using (private.can_manage_brief(id) and status in ('open', 'closed'))
  with check (private.can_manage_brief(id) and status in ('open', 'closed', 'cancelled'));

revoke all on public.briefs from anon, authenticated;
grant select on public.briefs to authenticated;
grant insert (kind, poster_id, organisation_id, title, description, skills, categories,
              indicative_budget_ghs, location, is_remote, deadline)
  on public.briefs to authenticated;
grant update (title, description, skills, categories, indicative_budget_ghs, location,
              is_remote, deadline, status)
  on public.briefs to authenticated;
grant select, insert, update, delete on public.briefs to service_role;

-- Pitch policies ------------------------------------------------------------------------------

create policy "Experts, brief managers and admins read pitches"
  on public.pitches for select
  to authenticated
  using (
    expert_id = (select auth.uid())
    or private.can_manage_brief(brief_id)
    or private.is_admin()
  );

create policy "Approved adult experts pitch on open briefs they do not own"
  on public.pitches for insert
  to authenticated
  with check (expert_id = (select auth.uid()) and private.can_pitch(brief_id));

create policy "Experts edit or withdraw a submitted pitch"
  on public.pitches for update
  to authenticated
  using (expert_id = (select auth.uid()) and status = 'submitted')
  with check (expert_id = (select auth.uid()) and status in ('submitted', 'withdrawn'));

revoke all on public.pitches from anon, authenticated;
grant select on public.pitches to authenticated;
grant insert (brief_id, expert_id, offer_id, message, proposed_timeline, indicative_price_ghs)
  on public.pitches to authenticated;
grant update (message, proposed_timeline, indicative_price_ghs, status) on public.pitches to authenticated;
grant select, insert, update, delete on public.pitches to service_role;

-- A pitch can point only at the expert's own offer.
create function private.validate_pitch()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.offer_id is not null and not exists (
    select 1 from public.offers o where o.id = new.offer_id and o.expert_id = new.expert_id
  ) then
    raise exception 'A pitch can only include your own offer' using errcode = '22023';
  end if;
  return new;
end;
$$;

revoke execute on function private.validate_pitch() from public, anon, authenticated;

create trigger pitches_validate
  before insert or update of offer_id on public.pitches
  for each row execute function private.validate_pitch();

-- booking_requests ------------------------------------------------------------------------------

create table public.booking_requests (
  id              uuid primary key default gen_random_uuid(),
  requester_id    uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  expert_id       uuid not null references public.profiles (id) on delete cascade,
  offer_id        uuid references public.offers (id) on delete set null,
  brief_id        uuid references public.briefs (id) on delete set null,
  pitch_id        uuid references public.pitches (id) on delete set null,
  organisation_id uuid references public.organisations (id) on delete set null,
  message         text not null check (char_length(message) between 1 and 2000),
  preferred_times text check (char_length(preferred_times) <= 500),
  status          text not null default 'requested'
                    check (status in ('requested', 'accepted', 'declined', 'completed', 'cancelled')),
  status_reason   text check (char_length(status_reason) <= 1000),
  responded_at    timestamptz,
  completed_at    timestamptz,
  cancelled_by    uuid references public.profiles (id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint booking_requests_not_self check (requester_id <> expert_id),
  check ((status = 'completed') = (completed_at is not null))
);

comment on table public.booking_requests is
  'A request for a session or service from an approved expert. Never a payment. Status moves only through set_booking_status (or accept_pitch, which opens it accepted).';
comment on column public.booking_requests.organisation_id is
  'Set when the booking comes from an organisation''s brief: its active members share the requester side (read, message; owners, admins and recruiters also cancel or complete).';
comment on column public.booking_requests.responded_at is
  'When the expert accepted or declined; feeds the response time shown on their page.';

-- One open request per person per expert stops a buyer spamming an inbox.
create unique index booking_requests_one_open
  on public.booking_requests (requester_id, expert_id) where status = 'requested';
create index booking_requests_expert_idx on public.booking_requests (expert_id, status);
create index booking_requests_offer_idx on public.booking_requests (offer_id);
create index booking_requests_brief_idx on public.booking_requests (brief_id);
create index booking_requests_pitch_idx on public.booking_requests (pitch_id);
create index booking_requests_cancelled_by_idx on public.booking_requests (cancelled_by);
create index booking_requests_organisation_idx on public.booking_requests (organisation_id);

alter table public.booking_requests enable row level security;

create trigger booking_requests_set_updated_at
  before update on public.booking_requests
  for each row execute function private.set_updated_at();

-- New requests: the offer (when given) must be active and decides the
-- expert; the expert must be approved, and accepting requests unless the
-- booking comes from an accepted pitch.
create function private.validate_booking_request()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer public.offers;
begin
  if new.offer_id is not null then
    select * into v_offer from public.offers where id = new.offer_id;
    if v_offer.id is null or (not v_offer.is_active and new.pitch_id is null) then
      raise exception 'That offer is not available' using errcode = '22023';
    end if;
    new.expert_id := v_offer.expert_id;
  end if;
  if not exists (
    select 1 from public.expert_profiles e
    where e.profile_id = new.expert_id and e.status = 'approved'
      and (e.accepting_requests or new.pitch_id is not null)
  ) then
    raise exception 'This expert is not taking requests' using errcode = '22023';
  end if;
  return new;
end;
$$;

revoke execute on function private.validate_booking_request() from public, anon, authenticated;

create trigger booking_requests_validate
  before insert on public.booking_requests
  for each row execute function private.validate_booking_request();

create function private.is_booking_party(p_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.booking_requests b
    where b.id = p_booking_id
      and (b.requester_id = (select auth.uid()) or b.expert_id = (select auth.uid())
           or (b.organisation_id is not null and private.org_role(b.organisation_id) is not null))
  );
$$;

create function private.booking_open_for_messages(p_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.booking_requests b
    where b.id = p_booking_id and b.status in ('requested', 'accepted', 'completed')
  );
$$;

revoke execute on function private.is_booking_party(uuid) from public;
revoke execute on function private.booking_open_for_messages(uuid) from public;
grant execute on function private.is_booking_party(uuid) to authenticated, service_role;
grant execute on function private.booking_open_for_messages(uuid) to authenticated, service_role;

create policy "The two parties and admins read a booking"
  on public.booking_requests for select
  to authenticated
  using (
    requester_id = (select auth.uid())
    or expert_id = (select auth.uid())
    or (organisation_id is not null and private.org_role(organisation_id) is not null)
    or private.is_admin()
  );

-- Buyers are adults too: no minors in the expert market (§5.8).
create policy "Adults request bookings as themselves"
  on public.booking_requests for insert
  to authenticated
  with check (requester_id = (select auth.uid()) and private.is_adult((select auth.uid())));

revoke all on public.booking_requests from anon, authenticated;
grant select on public.booking_requests to authenticated;
grant insert (requester_id, expert_id, offer_id, message, preferred_times)
  on public.booking_requests to authenticated;
grant select, insert, update, delete on public.booking_requests to service_role;

-- booking_messages --------------------------------------------------------------------------------

create table public.booking_messages (
  id         uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.booking_requests (id) on delete cascade,
  sender_id  uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

comment on table public.booking_messages is
  'The simple thread on a booking. Append only. The two parties read and write; admins read for disputes and reports.';

create index booking_messages_thread_idx on public.booking_messages (booking_id, created_at);
create index booking_messages_sender_idx on public.booking_messages (sender_id);

alter table public.booking_messages enable row level security;

create policy "Parties and admins read the thread"
  on public.booking_messages for select
  to authenticated
  using (private.is_booking_party(booking_id) or private.is_admin());

create policy "Parties write while the booking is live or completed"
  on public.booking_messages for insert
  to authenticated
  with check (
    sender_id = (select auth.uid())
    and private.is_booking_party(booking_id)
    and private.booking_open_for_messages(booking_id)
  );

revoke all on public.booking_messages from anon, authenticated;
grant select on public.booking_messages to authenticated;
grant insert (booking_id, sender_id, body) on public.booking_messages to authenticated;
grant select, insert, update, delete on public.booking_messages to service_role;

-- expert_reviews -------------------------------------------------------------------------------------

create table public.expert_reviews (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null unique references public.booking_requests (id) on delete cascade,
  expert_id   uuid not null references public.profiles (id) on delete cascade,
  reviewer_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  rating      smallint not null check (rating between 1 and 5),
  body        text check (char_length(body) <= 2000),
  is_hidden   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.expert_reviews is
  'One review per completed booking, by the person who booked. expert_id is copied from the booking. Admins hide abusive reviews; public through public_expert_reviews.';

create index expert_reviews_expert_idx on public.expert_reviews (expert_id) where not is_hidden;
create index expert_reviews_reviewer_idx on public.expert_reviews (reviewer_id);

alter table public.expert_reviews enable row level security;

create trigger expert_reviews_set_updated_at
  before update on public.expert_reviews
  for each row execute function private.set_updated_at();

create function private.can_review_booking(p_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.booking_requests b
    where b.id = p_booking_id and b.status = 'completed'
      and b.requester_id = (select auth.uid())
  );
$$;

revoke execute on function private.can_review_booking(uuid) from public;
grant execute on function private.can_review_booking(uuid) to authenticated, service_role;

create function private.set_review_expert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  select b.expert_id into new.expert_id from public.booking_requests b where b.id = new.booking_id;
  return new;
end;
$$;

revoke execute on function private.set_review_expert() from public, anon, authenticated;

create trigger expert_reviews_set_expert
  before insert on public.expert_reviews
  for each row execute function private.set_review_expert();

create policy "Reviewer, expert and admins read a review"
  on public.expert_reviews for select
  to authenticated
  using (
    reviewer_id = (select auth.uid())
    or expert_id = (select auth.uid())
    or private.is_admin()
  );

create policy "The booker reviews a completed booking"
  on public.expert_reviews for insert
  to authenticated
  with check (reviewer_id = (select auth.uid()) and private.can_review_booking(booking_id));

create policy "Admins hide reviews"
  on public.expert_reviews for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

revoke all on public.expert_reviews from anon, authenticated;
grant select on public.expert_reviews to authenticated;
grant insert (booking_id, reviewer_id, rating, body) on public.expert_reviews to authenticated;
grant update (is_hidden) on public.expert_reviews to authenticated;
grant select, insert, update, delete on public.expert_reviews to service_role;

-- Functions ---------------------------------------------------------------------------------------

-- The only way a booking changes status.
--   requested -> accepted | declined     the expert
--   requested | accepted -> cancelled    either party, or an admin
--   accepted -> completed                either party
-- For an organisation's booking, its owners, admins and recruiters act on
-- the requester side.
create function public.set_booking_status(
  p_booking_id uuid,
  p_status text,
  p_reason text default null
)
returns public.booking_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_b public.booking_requests;
  v_is_expert boolean;
  v_is_party boolean;
begin
  select * into v_b from public.booking_requests where id = p_booking_id for update;
  if v_b.id is null then
    raise exception 'Booking not found' using errcode = 'P0002';
  end if;
  v_is_expert := v_b.expert_id = v_uid;
  v_is_party := v_is_expert or v_b.requester_id = v_uid
    or (v_b.organisation_id is not null
        and coalesce(private.org_role(v_b.organisation_id) in ('owner', 'admin', 'recruiter'), false));
  if not (v_is_party or private.is_admin()) then
    raise exception 'Not your booking' using errcode = '42501';
  end if;

  if p_status in ('accepted', 'declined') and v_b.status = 'requested' then
    if not v_is_expert then
      raise exception 'Only the expert accepts or declines' using errcode = '42501';
    end if;
    update public.booking_requests
       set status = p_status, status_reason = p_reason, responded_at = now()
     where id = p_booking_id returning * into v_b;
  elsif p_status = 'cancelled' and v_b.status in ('requested', 'accepted') then
    update public.booking_requests
       set status = 'cancelled', status_reason = p_reason, cancelled_by = v_uid
     where id = p_booking_id returning * into v_b;
  elsif p_status = 'completed' and v_b.status = 'accepted' then
    if not v_is_party then
      raise exception 'Only the two parties mark a booking completed' using errcode = '42501';
    end if;
    update public.booking_requests
       set status = 'completed', completed_at = now()
     where id = p_booking_id returning * into v_b;
  else
    raise exception 'A % booking cannot become %', v_b.status, p_status using errcode = '22023';
  end if;
  return v_b;
end;
$$;

revoke execute on function public.set_booking_status(uuid, text, text) from public, anon;
grant execute on function public.set_booking_status(uuid, text, text) to authenticated, service_role;

-- The brief's manager accepts a pitch: the pitch is accepted, the others on
-- the brief are declined, the brief is awarded, and an accepted booking
-- between the caller and the expert opens (with the thread for the details).
create function public.accept_pitch(p_pitch_id uuid)
returns public.booking_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_pitch public.pitches;
  v_brief public.briefs;
  v_booking public.booking_requests;
begin
  select * into v_pitch from public.pitches where id = p_pitch_id for update;
  if v_pitch.id is null then
    raise exception 'Pitch not found' using errcode = 'P0002';
  end if;
  if not private.can_manage_brief(v_pitch.brief_id) then
    raise exception 'Not your brief' using errcode = '42501';
  end if;
  if not private.is_adult(v_uid) then
    raise exception 'The expert market is for adults only' using errcode = '42501';
  end if;
  select * into v_brief from public.briefs where id = v_pitch.brief_id for update;
  if v_brief.status <> 'open' or v_pitch.status <> 'submitted' then
    raise exception 'This brief or pitch is no longer open' using errcode = '22023';
  end if;
  if v_pitch.expert_id = v_uid then
    raise exception 'You cannot accept your own pitch' using errcode = '22023';
  end if;

  update public.pitches set status = 'accepted', decided_at = now() where id = v_pitch.id;
  update public.pitches set status = 'declined', decided_at = now()
   where brief_id = v_brief.id and id <> v_pitch.id and status = 'submitted';
  update public.briefs set status = 'awarded', awarded_at = now() where id = v_brief.id;

  insert into public.booking_requests
    (requester_id, expert_id, offer_id, brief_id, pitch_id, organisation_id, message, status, responded_at)
  values
    (v_uid, v_pitch.expert_id, v_pitch.offer_id, v_brief.id, v_pitch.id, v_brief.organisation_id,
     v_brief.title, 'accepted', now())
  returning * into v_booking;
  return v_booking;
end;
$$;

revoke execute on function public.accept_pitch(uuid) from public, anon;
grant execute on function public.accept_pitch(uuid) to authenticated, service_role;

create function public.decline_pitch(p_pitch_id uuid)
returns public.pitches
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_pitch public.pitches;
begin
  select * into v_pitch from public.pitches where id = p_pitch_id;
  if v_pitch.id is null then
    raise exception 'Pitch not found' using errcode = 'P0002';
  end if;
  if not private.can_manage_brief(v_pitch.brief_id) then
    raise exception 'Not your brief' using errcode = '42501';
  end if;
  update public.pitches set status = 'declined', decided_at = now()
   where id = p_pitch_id and status = 'submitted'
  returning * into v_pitch;
  if v_pitch.id is null then
    raise exception 'Only a submitted pitch can be declined' using errcode = '22023';
  end if;
  return v_pitch;
end;
$$;

revoke execute on function public.decline_pitch(uuid) from public, anon;
grant execute on function public.decline_pitch(uuid) to authenticated, service_role;

-- Views ---------------------------------------------------------------------------------------------

-- The public expert directory: approved experts with name, avatar and trust
-- signals counted from real rows only. average_rating is null until there is
-- a review; median_response_hours is null until three requests have been
-- answered in the last 180 days.
create function private.public_expert_rows()
returns table (
  profile_id            uuid,
  slug                  text,
  display_name          text,
  avatar_url            text,
  headline              text,
  bio                   text,
  skills                text[],
  categories            text[],
  links                 text[],
  languages             text[],
  region                text,
  availability_note     text,
  accepting_requests    boolean,
  offers_free_intro     boolean,
  is_verified           boolean,
  is_featured           boolean,
  approved_at           timestamptz,
  completed_bookings    integer,
  review_count          integer,
  average_rating        numeric,
  median_response_hours numeric
)
language sql
stable
security definer
set search_path = ''
as $$
  select e.profile_id, e.slug, p.display_name, p.avatar_url, e.headline, e.bio, e.skills,
         e.categories, e.links, e.languages, e.region, e.availability_note,
         e.accepting_requests, e.offers_free_intro, e.is_verified, e.is_featured, e.approved_at,
         coalesce(bk.completed, 0), coalesce(rv.reviews, 0), rv.average, rs.median_hours
  from public.expert_profiles e
  join public.profiles p on p.id = e.profile_id
  left join lateral (
    select count(*)::integer as completed
    from public.booking_requests b
    where b.expert_id = e.profile_id and b.status = 'completed'
  ) bk on true
  left join lateral (
    select count(*)::integer as reviews, round(avg(r.rating), 2) as average
    from public.expert_reviews r
    where r.expert_id = e.profile_id and not r.is_hidden
  ) rv on true
  left join lateral (
    select case when count(*) >= 3 then round((percentile_cont(0.5) within group (
             order by extract(epoch from b.responded_at - b.created_at) / 3600))::numeric, 1)
           end as median_hours
    from public.booking_requests b
    where b.expert_id = e.profile_id and b.responded_at is not null and b.pitch_id is null
      and b.created_at > now() - interval '180 days'
  ) rs on true
  where e.status = 'approved';
$$;

revoke execute on function private.public_expert_rows() from public;
grant execute on function private.public_expert_rows() to anon, authenticated, service_role;

create view public.public_experts
  with (security_invoker = true)
as
  select * from private.public_expert_rows();

comment on view public.public_experts is
  'Approved experts with name, avatar and real trust signals, for /experts. Readable by anyone. Never add phone, email or role.';

revoke all on public.public_experts from anon, authenticated;
grant select on public.public_experts to anon, authenticated, service_role;

-- Visible reviews of approved experts. The reviewer is named only when their
-- own profile is public.
create function private.public_expert_review_rows()
returns table (
  id            uuid,
  expert_id     uuid,
  rating        smallint,
  body          text,
  offer_kind    text,
  reviewer_name text,
  created_at    timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select r.id, r.expert_id, r.rating, r.body, o.kind,
         case when p.is_public then p.display_name end, r.created_at
  from public.expert_reviews r
  join public.expert_profiles e on e.profile_id = r.expert_id and e.status = 'approved'
  join public.booking_requests b on b.id = r.booking_id
  left join public.offers o on o.id = b.offer_id
  join public.profiles p on p.id = r.reviewer_id
  where not r.is_hidden;
$$;

revoke execute on function private.public_expert_review_rows() from public;
grant execute on function private.public_expert_review_rows() to anon, authenticated, service_role;

create view public.public_expert_reviews
  with (security_invoker = true)
as
  select * from private.public_expert_review_rows();

comment on view public.public_expert_reviews is
  'Visible reviews of approved experts. Reviewer name only when their profile is public. Readable by anyone.';

revoke all on public.public_expert_reviews from anon, authenticated;
grant select on public.public_expert_reviews to anon, authenticated, service_role;

-- A person's bookings with both names, for the inbox and thread pages. The
-- two parties and admins; everyone else gets zero rows.
create function private.booking_thread_rows()
returns table (
  id                  uuid,
  status              text,
  requester_id        uuid,
  requester_name      text,
  requester_avatar    text,
  expert_id           uuid,
  expert_name         text,
  expert_avatar       text,
  expert_slug         text,
  offer_id            uuid,
  offer_title         text,
  offer_kind          text,
  brief_id            uuid,
  pitch_id            uuid,
  organisation_id     uuid,
  organisation_name   text,
  message             text,
  preferred_times     text,
  status_reason       text,
  responded_at        timestamptz,
  completed_at        timestamptz,
  has_review          boolean,
  last_message_at     timestamptz,
  created_at          timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select b.id, b.status, b.requester_id, rp.display_name, rp.avatar_url,
         b.expert_id, ep.display_name, ep.avatar_url, e.slug,
         b.offer_id, o.title, o.kind, b.brief_id, b.pitch_id, b.organisation_id, org.name,
         b.message, b.preferred_times,
         b.status_reason, b.responded_at, b.completed_at,
         exists (select 1 from public.expert_reviews r where r.booking_id = b.id),
         (select max(m.created_at) from public.booking_messages m where m.booking_id = b.id),
         b.created_at
  from public.booking_requests b
  join public.profiles rp on rp.id = b.requester_id
  join public.profiles ep on ep.id = b.expert_id
  left join public.expert_profiles e on e.profile_id = b.expert_id
  left join public.offers o on o.id = b.offer_id
  left join public.organisations org on org.id = b.organisation_id
  where b.requester_id = (select auth.uid())
     or b.expert_id = (select auth.uid())
     or (b.organisation_id is not null and private.org_role(b.organisation_id) is not null)
     or private.is_admin();
$$;

revoke execute on function private.booking_thread_rows() from public;
grant execute on function private.booking_thread_rows() to authenticated, service_role;

create view public.booking_threads
  with (security_invoker = true)
as
  select * from private.booking_thread_rows();

comment on view public.booking_threads is
  'Bookings with both parties'' names, the offer and the organisation (for bookings from an organisation''s brief), for the parties, that organisation''s members and admins. Never add phone or email.';

revoke all on public.booking_threads from anon, authenticated;
grant select on public.booking_threads to authenticated, service_role;

-- Briefs the caller may read, with the poster's name and organisation, the
-- number of pitches, and the caller's own pitch status.
create function private.brief_board_rows()
returns table (
  id                    uuid,
  kind                  text,
  status                text,
  title                 text,
  description           text,
  skills                text[],
  categories            text[],
  indicative_budget_ghs integer,
  location              text,
  is_remote             boolean,
  deadline              date,
  poster_id             uuid,
  poster_name           text,
  poster_avatar         text,
  organisation_id       uuid,
  organisation_name     text,
  organisation_slug     text,
  organisation_logo     text,
  organisation_verified boolean,
  pitch_count           integer,
  my_pitch_status       text,
  can_manage            boolean,
  created_at            timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select b.id, b.kind, b.status, b.title, b.description, b.skills, b.categories,
         b.indicative_budget_ghs, b.location, b.is_remote, b.deadline,
         b.poster_id, p.display_name, p.avatar_url,
         b.organisation_id, o.name, o.slug, o.logo_url, o.verification_status = 'verified',
         (select count(*)::integer from public.pitches pt where pt.brief_id = b.id and pt.status <> 'withdrawn'),
         (select pt.status from public.pitches pt where pt.brief_id = b.id and pt.expert_id = (select auth.uid())),
         private.can_manage_brief(b.id),
         b.created_at
  from public.briefs b
  join public.profiles p on p.id = b.poster_id
  left join public.organisations o on o.id = b.organisation_id
  where private.can_read_brief(b.id);
$$;

revoke execute on function private.brief_board_rows() from public;
grant execute on function private.brief_board_rows() to authenticated, service_role;

create view public.brief_board
  with (security_invoker = true)
as
  select * from private.brief_board_rows();

comment on view public.brief_board is
  'Briefs the caller may read (same rule as the briefs table) with poster name, organisation and pitch counts. Never add phone or email.';

revoke all on public.brief_board from anon, authenticated;
grant select on public.brief_board to authenticated, service_role;
