-- Schema B (issue #158), part 1: in app notifications.
--
-- One row per message to one person: a kind from a fixed list, a small
-- payload the UI renders (title, body, href and any ids it needs), and
-- read_at. Recipients read, mark read and delete their own rows. Nobody
-- inserts over the API: database code calls private.notify (replies,
-- waitlist promotion, verified skills, chapter posts) and server code with
-- the secret key calls public.notify_user (bookings, reviews, cohort and
-- opportunity news). Email and WhatsApp hooks stay in server code and no op
-- unkeyed; this table is the in app centre only.

create table public.notifications (
  id           uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  kind         text not null check (kind in (
                 'community_reply', 'chapter_post', 'event_update',
                 'event_waitlist_promoted', 'verified_skill',
                 'skill_review', 'booking', 'review', 'cohort',
                 'opportunity', 'system'
               )),
  payload      jsonb not null default '{}'
                 check (jsonb_typeof(payload) = 'object' and pg_column_size(payload) <= 4096),
  read_at      timestamptz,
  created_at   timestamptz not null default now()
);

comment on table public.notifications is
  'In app notification centre. Recipient reads, marks read and deletes; inserts only through private.notify or the service role notify_user.';
comment on column public.notifications.payload is
  'Object the UI renders, by convention {"title","body","href"} plus ids. No phone or email.';

create index notifications_recipient_idx on public.notifications (recipient_id, created_at desc);
create index notifications_unread_idx on public.notifications (recipient_id) where read_at is null;

alter table public.notifications enable row level security;

create policy "Recipients read their notifications"
  on public.notifications for select
  to authenticated
  using ((select auth.uid()) = recipient_id);

create policy "Recipients mark their notifications read"
  on public.notifications for update
  to authenticated
  using ((select auth.uid()) = recipient_id)
  with check ((select auth.uid()) = recipient_id);

create policy "Recipients delete their notifications"
  on public.notifications for delete
  to authenticated
  using ((select auth.uid()) = recipient_id);

-- read_at is the only field a recipient changes.
revoke all on public.notifications from anon, authenticated;
grant select, delete on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select, insert, update, delete on public.notifications to service_role;

-- The single writer. Not callable over the API; database functions and
-- triggers in this schema call it, and server code uses notify_user.
create function private.notify(p_recipient_id uuid, p_kind text, p_payload jsonb default '{}')
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if p_recipient_id is null then
    return null;
  end if;
  insert into public.notifications (recipient_id, kind, payload)
  values (p_recipient_id, p_kind, coalesce(p_payload, '{}'))
  returning id into v_id;
  return v_id;
end;
$$;

revoke execute on function private.notify(uuid, text, jsonb) from public, anon, authenticated;
grant execute on function private.notify(uuid, text, jsonb) to service_role;

-- Server code (secret key) notifies for bookings, reviews, cohorts and
-- opportunities through this wrapper.
create function public.notify_user(p_recipient_id uuid, p_kind text, p_payload jsonb default '{}')
returns uuid
language sql
security definer
set search_path = ''
as $$
  select private.notify(p_recipient_id, p_kind, p_payload);
$$;

revoke execute on function public.notify_user(uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.notify_user(uuid, text, jsonb) to service_role;

-- Mark some (or, with null, all) of the caller's notifications read.
-- Returns how many changed.
create function public.mark_notifications_read(p_ids uuid[] default null)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  update public.notifications
     set read_at = now()
   where recipient_id = (select auth.uid())
     and read_at is null
     and (p_ids is null or id = any (p_ids));
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function public.mark_notifications_read(uuid[]) from public, anon;
grant execute on function public.mark_notifications_read(uuid[]) to authenticated, service_role;
