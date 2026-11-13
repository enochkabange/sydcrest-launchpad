-- Audience messaging and the chapter lead toolkit (epic #320, issues #334 and #335).
--
-- 1. public.message_sends: one row per message staff or a chapter lead sends
--    to an audience (who, what, the filters, the holdout share, the counts).
-- 2. public.message_recipients: who was in the audience, who was held out,
--    and what happened (sent, queued for WhatsApp, skipped, failed), plus
--    when the in app notification was opened (a trigger on notifications).
-- 3. private.message_audience(): the one place an audience is worked out,
--    from profiles, chapter and cohort membership, the recommended track,
--    learner_attributes (stage, last active) and the first touch campaign.
--    WhatsApp audiences only include members with a live WhatsApp consent for
--    the number on their profile. Anyone sent a message in the last 2 days is
--    left out (a per member frequency cap).
-- 4. public.message_audience_size, public.send_message, public.message_results:
--    the only way in. Staff (admins) send to anyone; a chapter lead sends only
--    to members of a chapter they lead, whatever the filters say. A hard cap
--    of 1000 people per send and a daily send limit per sender (5 for leads,
--    20 for staff). The holdout is a random share (0 to 50 percent) of the
--    audience that gets nothing, so results compare against it.
-- 5. public.chapter_dashboard(): counts for a chapter's leads (members, new
--    joins by first touch source, members by stage, events and check ins).
--    Aggregates only: leads never see another member's stage or source.
-- 6. New event names: message_sent, campaign_link_copied.
--
-- Email is not a channel: public.consents has no email consent kind, so
-- nothing here sends email.
--
-- Later: the holdout here is a simple share; experiments (#327) can own the
-- split. The stage filter can take the early warning risk level (#325).

-- 1. message_sends --------------------------------------------------------------------------

create table public.message_sends (
  id             uuid primary key default gen_random_uuid(),
  sender_id      uuid references public.profiles (id) on delete set null,
  chapter_id     uuid references public.chapters (id) on delete cascade,
  channel        text not null check (channel in ('in_app', 'whatsapp')),
  template       text not null check (template ~ '^[a-z][a-z_]{0,39}$'),
  title          text not null check (char_length(title) between 1 and 140),
  body           text check (char_length(body) <= 300),
  href           text check (char_length(href) <= 300 and href ~ '^/([^/\\\s][^\\\s]*)?$'),
  filters        jsonb not null default '{}' check (jsonb_typeof(filters) = 'object' and pg_column_size(filters) <= 2048),
  holdout_share  integer not null default 0 check (holdout_share between 0 and 50),
  audience_count integer not null default 0 check (audience_count >= 0),
  holdout_count  integer not null default 0 check (holdout_count >= 0),
  created_at     timestamptz not null default now()
);

comment on table public.message_sends is
  'A message to an audience. chapter_id set: sent by (or for) that chapter''s leads to its members only; null: a staff send. Written only by public.send_message.';
comment on column public.message_sends.filters is
  'The audience filters as sent: track, region, chapter_id, cohort_id, stages, inactive_days, campaign. Ids and slugs only.';
comment on column public.message_sends.holdout_share is
  'Percent of the audience held out at random (they get nothing), to compare who came back.';

create index message_sends_chapter_idx on public.message_sends (chapter_id, created_at desc);
create index message_sends_sender_idx on public.message_sends (sender_id, created_at desc);
create index message_sends_created_idx on public.message_sends (created_at desc);

alter table public.message_sends enable row level security;

create policy "Staff read every send; leads read their chapter's"
  on public.message_sends for select to authenticated
  using ((select private.is_admin()) or (chapter_id is not null and private.is_chapter_lead(chapter_id)));

revoke all on public.message_sends from public, anon, authenticated;
grant select on public.message_sends to authenticated;
grant select, insert, update, delete on public.message_sends to service_role;

-- 2. message_recipients ---------------------------------------------------------------------

create table public.message_recipients (
  message_id      uuid not null references public.message_sends (id) on delete cascade,
  profile_id      uuid not null references public.profiles (id) on delete cascade,
  held_out        boolean not null default false,
  status          text not null check (status in ('held_out', 'queued', 'sent', 'skipped', 'failed')),
  notification_id uuid references public.notifications (id) on delete set null,
  sent_at         timestamptz,
  opened_at       timestamptz,
  primary key (message_id, profile_id),
  check (held_out = (status = 'held_out'))
);

comment on table public.message_recipients is
  'Who a message went to, or was held back from. Staff read it; leads see only counts through message_results.';
comment on column public.message_recipients.opened_at is
  'When the in app notification was opened or marked read (set by a trigger on notifications).';

create index message_recipients_profile_idx on public.message_recipients (profile_id, message_id);
create index message_recipients_notification_idx on public.message_recipients (notification_id) where notification_id is not null;
create index message_recipients_queued_idx on public.message_recipients (message_id) where status = 'queued';

alter table public.message_recipients enable row level security;

create policy "Staff read recipients"
  on public.message_recipients for select to authenticated
  using ((select private.is_admin()));

revoke all on public.message_recipients from public, anon, authenticated;
grant select on public.message_recipients to authenticated;
grant select, insert, update, delete on public.message_recipients to service_role;

-- Opening (or marking read) a message notification records the open.
create function private.record_message_open()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.message_recipients
     set opened_at = new.read_at
   where notification_id = new.id
     and opened_at is null;
  return new;
end;
$$;

revoke execute on function private.record_message_open() from public, anon, authenticated;

create trigger notifications_record_message_open
  after update of read_at on public.notifications
  for each row
  when (old.read_at is null and new.read_at is not null and new.payload ? 'message_id')
  execute function private.record_message_open();

-- 3. The audience ----------------------------------------------------------------------------

-- Who may send for this scope: staff for a staff send (chapter null); a lead
-- of the chapter, or staff, for a chapter send. Raises 42501 otherwise.
create function private.assert_message_sender(p_chapter_id uuid)
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if private.is_admin() then
    return;
  end if;
  if p_chapter_id is null or not private.is_chapter_lead(p_chapter_id) then
    raise exception 'Staff or the chapter''s leads only' using errcode = '42501';
  end if;
end;
$$;

revoke execute on function private.assert_message_sender(uuid) from public, anon, authenticated;

-- Members matching the filters. A chapter send (p_chapter_id set) only ever
-- reaches that chapter's members, whatever chapter the filters name.
create function private.message_audience(p_chapter_id uuid, p_filters jsonb, p_channel text, p_sender uuid)
returns table (profile_id uuid)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_filters jsonb := case when jsonb_typeof(p_filters) = 'object' then p_filters else '{}'::jsonb end;
  v_track text := nullif(trim(v_filters ->> 'track'), '');
  v_region text := nullif(trim(v_filters ->> 'region'), '');
  v_chapter uuid;
  v_cohort uuid;
  v_stages text[];
  v_inactive integer;
  v_campaign text := nullif(trim(v_filters ->> 'campaign'), '');
  v_today date := (now() at time zone 'UTC')::date;
begin
  begin
    v_chapter := coalesce(p_chapter_id, nullif(v_filters ->> 'chapter_id', '')::uuid);
    v_cohort := nullif(v_filters ->> 'cohort_id', '')::uuid;
    v_inactive := nullif(v_filters ->> 'inactive_days', '')::integer;
    if v_inactive is not null then
      v_inactive := least(greatest(v_inactive, 1), 365);
    end if;
  exception when others then
    raise exception 'Bad audience filters' using errcode = '22023';
  end;
  if jsonb_typeof(v_filters -> 'stages') = 'array' then
    select array_agg(s) into v_stages from jsonb_array_elements_text(v_filters -> 'stages') s;
  end if;

  return query
    select p.id
      from public.profiles p
      left join public.learner_attributes la on la.profile_id = p.id
     where p.id is distinct from p_sender
       and (v_chapter is null or exists (
             select 1 from public.chapter_members m where m.chapter_id = v_chapter and m.profile_id = p.id))
       and (v_region is null or p.region = v_region)
       and (v_cohort is null or exists (
             select 1 from public.cohort_members cm
              where cm.cohort_id = v_cohort and cm.profile_id = p.id and cm.role = 'learner'))
       and (v_track is null
            or exists (select 1 from public.cohort_members cm
                        where cm.profile_id = p.id and cm.specialization = v_track)
            or (select r.slug from public.personalized_paths pp
                  join public.roadmaps r on r.id = pp.recommended_roadmap_id
                 where pp.profile_id = p.id
                 order by pp.created_at desc limit 1) = v_track)
       and (v_stages is null or cardinality(v_stages) = 0 or la.stage = any (v_stages))
       and (v_inactive is null
            or coalesce(la.last_active_on, (p.created_at at time zone 'UTC')::date) <= v_today - v_inactive)
       and (v_campaign is null or exists (
             select 1 from public.profile_first_touch ft where ft.profile_id = p.id and ft.utm_campaign = v_campaign))
       and (p_channel is distinct from 'whatsapp' or exists (
             select 1 from public.consents c
              where c.profile_id = p.id and c.kind = 'whatsapp' and c.revoked_at is null
                and c.phone is not null and c.phone = p.phone))
       -- Frequency cap: nobody gets more than one of these messages in 2 days.
       and not exists (
             select 1 from public.message_recipients r
               join public.message_sends s on s.id = r.message_id
              where r.profile_id = p.id and not r.held_out and s.created_at > now() - interval '2 days');
end;
$$;

revoke execute on function private.message_audience(uuid, jsonb, text, uuid) from public, anon, authenticated;

-- 4. The API ------------------------------------------------------------------------------------

-- How many people a message would reach, before it is sent.
create function public.message_audience_size(p_filters jsonb, p_channel text, p_chapter_id uuid default null)
returns integer
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.assert_message_sender(p_chapter_id);
  if p_channel not in ('in_app', 'whatsapp') then
    raise exception 'Unknown channel' using errcode = '22023';
  end if;
  return (select count(*)::integer from private.message_audience(p_chapter_id, p_filters, p_channel, (select auth.uid())));
end;
$$;

-- Send: records the message, holds out a random share, and writes the in app
-- notifications. WhatsApp recipients are queued; the server sends them with
-- the service role (after checking the current consent wording) and records
-- each result.
create function public.send_message(
  p_filters jsonb,
  p_channel text,
  p_template text,
  p_title text,
  p_body text,
  p_href text,
  p_holdout_share integer,
  p_chapter_id uuid default null
)
returns table (message_id uuid, audience integer, held_out integer, sent integer)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_uid uuid := (select auth.uid());
  v_admin boolean := private.is_admin();
  v_share integer := least(greatest(coalesce(p_holdout_share, 0), 0), 50);
  v_title text := nullif(regexp_replace(trim(coalesce(p_title, '')), '\s+', ' ', 'g'), '');
  v_body text := nullif(trim(coalesce(p_body, '')), '');
  v_href text := nullif(trim(coalesce(p_href, '')), '');
  v_id uuid;
  v_total integer;
  v_held integer;
  v_sent integer := 0;
  v_cap constant integer := 1000;
begin
  perform private.assert_message_sender(p_chapter_id);
  if p_channel not in ('in_app', 'whatsapp') then
    raise exception 'Unknown channel' using errcode = '22023';
  end if;
  if v_title is null or char_length(v_title) > 140 or char_length(coalesce(v_body, '')) > 300 then
    raise exception 'Title (1 to 140) and body (up to 300) please' using errcode = '22023';
  end if;
  if v_href is not null and (char_length(v_href) > 300 or v_href !~ '^/([^/\\\s][^\\\s]*)?$') then
    raise exception 'Links must be a page on this site' using errcode = '22023';
  end if;
  if not private.take_rate_limit('message_send', v_uid::text, case when v_admin then 20 else 5 end, interval '1 day') then
    raise exception 'Slow down' using errcode = '54000';
  end if;

  insert into public.message_sends (sender_id, chapter_id, channel, template, title, body, href, filters, holdout_share)
  values (v_uid, p_chapter_id, p_channel, coalesce(nullif(p_template, ''), 'custom'), v_title, v_body, v_href,
          case when jsonb_typeof(p_filters) = 'object' then p_filters else '{}'::jsonb end, v_share)
  returning id into v_id;

  -- A random order; the first round(n * share / 100) are held out.
  insert into public.message_recipients (message_id, profile_id, held_out, status)
  select v_id, a.profile_id, a.rn <= round(a.n * v_share / 100.0),
         case when a.rn <= round(a.n * v_share / 100.0) then 'held_out'
              when p_channel = 'whatsapp' then 'queued'
              else 'sent' end
    from (select x.profile_id, row_number() over (order by random()) as rn, count(*) over () as n
            from private.message_audience(p_chapter_id, p_filters, p_channel, v_uid) x
           limit v_cap + 1) a;
  get diagnostics v_total = row_count;

  if v_total = 0 then
    raise exception 'Nobody matches these filters' using errcode = 'P0002';
  end if;
  if v_total > v_cap then
    raise exception 'Over % people: narrow the audience', v_cap using errcode = '54000';
  end if;

  select count(*) filter (where r.held_out)::integer into v_held
    from public.message_recipients r where r.message_id = v_id;

  if p_channel = 'in_app' then
    update public.message_recipients r
       set notification_id = private.notify(r.profile_id, 'system', jsonb_strip_nulls(jsonb_build_object(
             'title', v_title, 'body', v_body, 'href', v_href, 'message_id', v_id))),
           sent_at = now()
     where r.message_id = v_id and r.status = 'sent';
    get diagnostics v_sent = row_count;
  end if;

  update public.message_sends set audience_count = v_total, holdout_count = v_held where id = v_id;
  return query select v_id, v_total, v_held, v_sent;
end;
$$;

-- Results for one message, for the people it went to and the holdout:
-- delivered (sent), opened (in app), and came back (any activity in the 7
-- days after sending).
create function public.message_results(p_message_id uuid)
returns table (held_out boolean, people integer, delivered integer, opened integer, came_back integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_chapter uuid;
  v_at timestamptz;
begin
  select s.chapter_id, s.created_at into v_chapter, v_at from public.message_sends s where s.id = p_message_id;
  if v_at is null then
    raise exception 'Message not found' using errcode = 'P0002';
  end if;
  if not (private.is_admin() or (v_chapter is not null and private.is_chapter_lead(v_chapter))) then
    raise exception 'Staff or the chapter''s leads only' using errcode = '42501';
  end if;
  return query
    select g.held_out,
           coalesce(count(r.profile_id), 0)::integer,
           coalesce(count(r.profile_id) filter (where r.status = 'sent'), 0)::integer,
           coalesce(count(r.profile_id) filter (where r.opened_at is not null), 0)::integer,
           coalesce(count(r.profile_id) filter (where exists (
             select 1 from public.events e
              where e.profile_id = r.profile_id
                and e.created_at > v_at and e.created_at <= v_at + interval '7 days'
                and coalesce(e.device_class, 'unknown') <> 'bot')), 0)::integer
      from (values (false), (true)) g (held_out)
      left join public.message_recipients r on r.message_id = p_message_id and r.held_out = g.held_out
     group by g.held_out
     order by g.held_out;
end;
$$;

revoke execute on function public.message_audience_size(jsonb, text, uuid) from public, anon;
revoke execute on function public.send_message(jsonb, text, text, text, text, text, integer, uuid) from public, anon;
revoke execute on function public.message_results(uuid) from public, anon;
grant execute on function public.message_audience_size(jsonb, text, uuid) to authenticated, service_role;
grant execute on function public.send_message(jsonb, text, text, text, text, text, integer, uuid) to authenticated, service_role;
grant execute on function public.message_results(uuid) to authenticated, service_role;

-- 5. Chapter dashboard -------------------------------------------------------------------------

-- Counts only, for the chapter's leads and staff.
create function public.chapter_dashboard(p_chapter_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_result jsonb;
begin
  if not (private.is_admin() or private.is_chapter_lead(p_chapter_id)) then
    raise exception 'Chapter leads only' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'members', (select count(*) from public.chapter_members m where m.chapter_id = p_chapter_id),
    'joined_30', (select count(*) from public.chapter_members m
                   where m.chapter_id = p_chapter_id and m.joined_at >= now() - interval '30 days'),
    'joins_by_source', coalesce((
      select jsonb_agg(jsonb_build_object('source', x.source, 'count', x.n) order by x.n desc, x.source)
        from (select coalesce(ft.utm_source, ft.referrer, 'unknown') as source, count(*)::integer as n
                from public.chapter_members m
                left join public.profile_first_touch ft on ft.profile_id = m.profile_id
               where m.chapter_id = p_chapter_id and m.joined_at >= now() - interval '90 days'
               group by 1) x), '[]'::jsonb),
    'from_chapter_links', (select count(*) from public.chapter_members m
                             join public.profile_first_touch ft on ft.profile_id = m.profile_id
                             join public.chapters c on c.id = m.chapter_id
                            where m.chapter_id = p_chapter_id and ft.utm_medium = 'chapter' and ft.utm_campaign = c.slug),
    'by_stage', coalesce((
      select jsonb_object_agg(x.stage, x.n)
        from (select coalesce(la.stage, 'not_computed') as stage, count(*)::integer as n
                from public.chapter_members m
                left join public.learner_attributes la on la.profile_id = m.profile_id
               where m.chapter_id = p_chapter_id
               group by 1) x), '{}'::jsonb),
    'events', coalesce((
      select jsonb_agg(jsonb_build_object(
               'slug', e.slug, 'title', e.title, 'starts_at', e.starts_at, 'status', e.status,
               'going', (select count(*) from public.event_rsvps r where r.event_id = e.id and r.status = 'going'),
               'checked_in', (select count(*) from public.event_checkins ci where ci.event_id = e.id))
             order by e.starts_at)
        from public.community_events e
       where e.chapter_id = p_chapter_id
         and e.status in ('published', 'completed')
         and e.ends_at >= now() - interval '30 days'), '[]'::jsonb)
  ) into v_result;
  return v_result;
end;
$$;

revoke execute on function public.chapter_dashboard(uuid) from public, anon;
grant execute on function public.chapter_dashboard(uuid) to authenticated, service_role;

-- 6. Event names -------------------------------------------------------------------------------

create or replace function private.is_event_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_name = any (array[
    -- Taxonomy (issues #51 and #242)
    'page_view', 'web_vital', 'form_started', 'form_submitted', 'share_clicked',
    'client_error', 'server_error', 'action_failed', 'signup', 'sign_in',
    'sign_out', 'welcome_completed', 'password_reset_requested',
    'password_updated', 'profile_updated', 'public_profile_updated',
    'whatsapp_consent_set', 'display_prefs_saved', 'milestone_posts_set',
    'waitlist_joined', 'quiz_run', 'path_saved', 'path_viewed', 'lesson_opened',
    'node_started', 'quiz_submitted', 'node_completed', 'review_completed',
    'weekly_goal_set', 'study_buddy_message', 'skill_quiz_submitted',
    'skill_portfolio_submitted', 'skill_portfolio_reviewed', 'path_skills_claimed',
    'application_submitted', 'application_withdrawn', 'application_decided',
    'specialisation_chosen', 'submission_saved', 'submission_graded',
    'peer_review_assigned', 'peer_review_submitted', 'learner_deferred',
    'certificate_issued', 'certificate_revoked', 'expert_applied',
    'expert_application_decided', 'offer_created', 'offer_updated',
    'booking_requested', 'booking_status_changed', 'booking_message_sent',
    'booking_reviewed', 'brief_created', 'pitch_submitted', 'pitch_withdrawn',
    'pitch_decided', 'opportunity_created', 'opportunity_reported', 'opportunity_saved',
    'opportunity_unsaved', 'outcome_reported', 'outcome_decided',
    'talent_listing_saved', 'talent_contact_requested', 'talent_contact_responded',
    'organisation_created', 'organisation_member_invited',
    'organisation_invite_accepted', 'organisation_decided', 'post_created',
    'reply_created', 'reaction_set', 'content_reported', 'content_moderated',
    'event_rsvp', 'event_checked_in', 'event_feedback_sent', 'chapter_joined',
    'chapter_left', 'profile_followed', 'profile_reported', 'invite_sent',
    'notification_opened', 'notifications_read_all',
    -- Attribution (epic #320)
    'visit_started',
    -- Learner profile v2 (epic #320)
    'learner_profile_saved', 'profile_field_updated',
    -- Behaviour and work-readiness events (epic #320, step 3)
    'session_started', 'lesson_left', 'resource_opened', 'quiz_question_answered', 'quiz_retried',
    'search_performed', 'filter_applied', 'submission_resubmitted', 'deadline_met', 'deadline_missed',
    'opportunity_viewed', 'opportunity_apply_opened', 'opportunity_applied',
    'opportunity_application_withdrawn', 'opportunity_applicant_moved',
    -- Audience messaging and chapter toolkit (epic #320, #334 and #335)
    'message_sent', 'campaign_link_copied',
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;
