-- Apply to lead a chapter in your town (#301).
--
-- SydCrest is community led (founder, 7 Nov 2026): people outside the six
-- chapter areas can join any chapter, and are nudged to start one where they
-- live. They apply to lead it; an admin approves in one step, which creates
-- the chapter as 'launching' (open to join) with the applicant as its lead,
-- or declines. Either way the applicant gets an in app notification.

create table public.chapter_applications (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  town          text not null check (char_length(btrim(town)) between 2 and 80),
  region        text not null check (region in (
                  'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                  'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                  'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                )),
  motivation    text not null check (char_length(btrim(motivation)) between 20 and 2000),
  plan          text not null check (char_length(btrim(plan)) between 20 and 2000),
  status        text not null default 'submitted'
                  check (status in ('submitted', 'approved', 'declined', 'withdrawn')),
  decision_note text check (char_length(decision_note) <= 1000),
  decided_by    uuid references public.profiles (id) on delete set null,
  decided_at    timestamptz,
  chapter_id    uuid references public.chapters (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.chapter_applications is
  'Requests to start and lead a chapter (#301). Applicants insert and withdraw their own; admins decide with decide_chapter_application.';
comment on column public.chapter_applications.chapter_id is
  'The chapter an approval created.';

create unique index chapter_applications_one_open
  on public.chapter_applications (profile_id) where status = 'submitted';
create index chapter_applications_queue_idx on public.chapter_applications (status, created_at);
create index chapter_applications_decided_by_idx on public.chapter_applications (decided_by);
create index chapter_applications_chapter_idx on public.chapter_applications (chapter_id);

alter table public.chapter_applications enable row level security;

create trigger chapter_applications_set_updated_at
  before update on public.chapter_applications
  for each row execute function private.set_updated_at();

create policy "Applicants and admins read chapter applications"
  on public.chapter_applications for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

create policy "Adults apply as themselves"
  on public.chapter_applications for insert
  to authenticated
  with check (profile_id = (select auth.uid()) and private.is_adult((select auth.uid())));

-- The only change an applicant makes is withdrawing an open application;
-- the column grant below limits the update to status.
create policy "Applicants withdraw an open application"
  on public.chapter_applications for update
  to authenticated
  using (profile_id = (select auth.uid()) and status = 'submitted')
  with check (profile_id = (select auth.uid()) and status = 'withdrawn');

grant select on public.chapter_applications to authenticated;
grant insert (town, region, motivation, plan) on public.chapter_applications to authenticated;
grant update (status) on public.chapter_applications to authenticated;
grant select, insert, update, delete on public.chapter_applications to service_role;

-- Approve: create the chapter (open to join) with the applicant as lead.
-- Decline: record the note. Both notify the applicant.
create function public.decide_chapter_application(
  p_application_id uuid,
  p_decision text,
  p_slug text default null,
  p_name text default null,
  p_note text default null
)
returns public.chapter_applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_app public.chapter_applications;
  v_chapter_id uuid;
  v_slug text;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_decision not in ('approved', 'declined') then
    raise exception 'Decision must be approved or declined' using errcode = '22023';
  end if;

  update public.chapter_applications
     set status = p_decision, decision_note = nullif(btrim(p_note), ''),
         decided_by = (select auth.uid()), decided_at = now()
   where id = p_application_id and status = 'submitted'
  returning * into v_app;
  if v_app.id is null then
    raise exception 'No open application with that id' using errcode = 'P0002';
  end if;

  if p_decision = 'approved' then
    v_slug := coalesce(nullif(btrim(p_slug), ''), private.slugify_town(v_app.town));
    if v_slug = 'start' then
      raise exception 'The address start is the Start a chapter page' using errcode = '23514';
    end if;
    insert into public.chapters (slug, name, region, city, status)
    values (v_slug, coalesce(nullif(btrim(p_name), ''), v_app.town || ' chapter'), v_app.region, btrim(v_app.town), 'launching')
    returning id into v_chapter_id;
    insert into public.chapter_members (chapter_id, profile_id, role)
    values (v_chapter_id, v_app.profile_id, 'lead');
    update public.chapter_applications set chapter_id = v_chapter_id where id = v_app.id
    returning * into v_app;
    perform private.notify(v_app.profile_id, 'system', jsonb_build_object(
      'title', 'Your chapter is approved',
      'body', 'You lead the ' || btrim(v_app.town) || ' chapter. Add a summary and a WhatsApp link, then invite people.',
      'href', '/chapters/' || v_slug
    ));
  else
    perform private.notify(v_app.profile_id, 'system', jsonb_build_object(
      'title', 'About your chapter application',
      'body', coalesce(v_app.decision_note, 'We cannot start a chapter in ' || btrim(v_app.town) || ' just now. You are welcome to join any chapter.'),
      'href', '/chapters/start'
    ));
  end if;
  return v_app;
end;
$$;

revoke execute on function public.decide_chapter_application(uuid, text, text, text, text) from public, anon;
grant execute on function public.decide_chapter_application(uuid, text, text, text, text) to authenticated, service_role;

-- A chapter slug from a town name: lowercase, letters and digits joined by
-- single hyphens, the same shape chapters.slug checks.
create function private.slugify_town(p_town text)
returns text
language sql
immutable
set search_path = ''
as $$
  select left(btrim(regexp_replace(lower(p_town), '[^a-z0-9]+', '-', 'g'), '-'), 50);
$$;

revoke execute on function private.slugify_town(text) from public;
grant execute on function private.slugify_town(text) to authenticated, service_role;

-- The admin queue with the applicant's name (admins cannot read every
-- profile directly). Same pattern as expert_application_queue.
create function private.chapter_application_queue_rows()
returns table (
  application_id uuid,
  profile_id     uuid,
  display_name   text,
  town           text,
  region         text,
  motivation     text,
  plan           text,
  status         text,
  created_at     timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.profile_id, p.display_name, a.town, a.region, a.motivation, a.plan, a.status, a.created_at
  from public.chapter_applications a
  join public.profiles p on p.id = a.profile_id
  where private.is_admin();
$$;

revoke execute on function private.chapter_application_queue_rows() from public;
grant execute on function private.chapter_application_queue_rows() to authenticated, service_role;

create view public.chapter_application_queue
  with (security_invoker = true)
as
  select * from private.chapter_application_queue_rows();

comment on view public.chapter_application_queue is
  'Chapter applications with the applicant''s name, for the admin queue (#301). Admins only. Never add phone or email.';

revoke all on public.chapter_application_queue from anon, authenticated;
grant select on public.chapter_application_queue to authenticated, service_role;
