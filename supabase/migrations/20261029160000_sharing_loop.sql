-- Sharing loop (issue #233): section milestones and optional milestone posts.
--
-- 1. A new achievement type, section_completed (ref_id: the section node id),
--    minted when every required node in a section is verified. It chains off
--    the topic achievement, which only a passed checkpoint quiz mints, so a
--    topic marked done by hand never finishes a section (issue #128).
--    Minted by an AFTER INSERT trigger on achievements rather than inside
--    after_node_done, so the progress functions stay untouched.
--
-- 2. profiles.milestone_posts, off by default. When a learner turns it on, a
--    finished section, a finished roadmap or an issued certificate creates one
--    community post in the everyone feed, written for them in plain words.
--    - Once per milestone: a ledger (private.milestone_post_log) remembers
--      what was posted, so a re issued certificate, or a post the learner
--      deleted or a moderator hid, is never posted again.
--    - Rate limits hold: the post goes through the feed's own insert trigger
--      (10 posts an hour). When it refuses, the milestone is skipped and the
--      quiz pass or certificate issue that caused it still succeeds.
--    - Moderation holds: hidden posts work as for any post, and a learner with
--      a post or reply hidden by a moderator in the last 30 days gets no
--      automatic posts until that has passed.
--    - Finishing the last section of a roadmap posts the roadmap only.
--
-- Additive: one column with a safe default, a constraint swap that only adds
-- a value, a new private table, new functions and triggers.

-- Achievement type ----------------------------------------------------------------

alter table public.achievements drop constraint achievements_type_check;
alter table public.achievements add constraint achievements_type_check check (type in (
  'roadmap_node_completed', 'roadmap_completed', 'section_completed', 'streak',
  'track_chosen', 'path_personalized'
));

comment on column public.achievements.ref_id is
  'What the achievement is for: node id, section node id, roadmap id, streak length, track slug.';

-- The section a node belongs to: its top level ancestor (or itself), unless
-- that is a checkpoint. Same rule as src/lib/roadmaps/view-model.ts, where a
-- top level node is a section and a top level checkpoint is not.
create function private.section_of(p_node_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  with recursive up as (
    select n.id, n.parent_id, n.kind from public.roadmap_nodes n where n.id = p_node_id
    union all
    select n.id, n.parent_id, n.kind from public.roadmap_nodes n join up on n.id = up.parent_id
  )
  select up.id from up where up.parent_id is null and up.kind is distinct from 'checkpoint';
$$;

revoke execute on function private.section_of(uuid) from public, anon, authenticated;

-- True when every required node in the section (the section node and all its
-- descendants) has a verified completion for this learner.
create function private.section_verified(p_profile_id uuid, p_section_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  with recursive down as (
    select n.id, n.is_optional from public.roadmap_nodes n where n.id = p_section_id
    union all
    select n.id, n.is_optional from public.roadmap_nodes n join down on n.parent_id = down.id
  )
  select not exists (
    select 1
    from down
    left join public.roadmap_progress p
      on p.node_id = down.id and p.profile_id = p_profile_id and p.verified_at is not null
    where not down.is_optional and p.id is null
  );
$$;

revoke execute on function private.section_verified(uuid, uuid) from public, anon, authenticated;

-- Same rule after_node_done uses to mint roadmap_completed.
create function private.roadmap_verified(p_profile_id uuid, p_roadmap_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1
    from public.roadmap_nodes n
    left join public.roadmap_progress p
      on p.node_id = n.id and p.profile_id = p_profile_id and p.verified_at is not null
    where n.roadmap_id = p_roadmap_id and not n.is_optional and p.id is null
  );
$$;

revoke execute on function private.roadmap_verified(uuid, uuid) from public, anon, authenticated;

-- A section with no nodes under it is a single topic, already its own
-- achievement, so it never mints a section as well.
create function private.mint_section_achievement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_section uuid;
begin
  if new.type <> 'roadmap_node_completed' or new.ref_id !~ '^[0-9a-f-]{36}$' then
    return null;
  end if;
  v_section := private.section_of(new.ref_id::uuid);
  if v_section is null
     or not exists (select 1 from public.roadmap_nodes c where c.parent_id = v_section)
     or not private.section_verified(new.profile_id, v_section) then
    return null;
  end if;
  perform private.mint_achievement(new.profile_id, 'section_completed', v_section::text);
  return null;
end;
$$;

revoke execute on function private.mint_section_achievement() from public, anon, authenticated;

create trigger achievements_mint_section
  after insert on public.achievements
  for each row execute function private.mint_section_achievement();

-- The setting ---------------------------------------------------------------------

alter table public.profiles
  add column milestone_posts boolean not null default false;

comment on column public.profiles.milestone_posts is
  'Learner choice, off by default: post to the community feed when they finish a section or roadmap or earn a certificate. Owner only via RLS; never shown on public views.';

-- RLS already limits updates to the owner's row; this lets them write the field.
grant update (milestone_posts) on public.profiles to authenticated;

-- The ledger ----------------------------------------------------------------------

create table private.milestone_post_log (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  kind       text not null check (kind in ('section', 'roadmap', 'certificate')),
  ref_id     text not null check (char_length(ref_id) between 1 and 64),
  post_id    uuid references public.community_posts (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (profile_id, kind, ref_id)
);

comment on table private.milestone_post_log is
  'One row per milestone already posted for a learner (section node id, roadmap id, or programme id for certificates), so each is posted at most once even if the post is deleted.';

create index milestone_post_log_post_idx on private.milestone_post_log (post_id);

alter table private.milestone_post_log enable row level security;
-- No policies: only the definer functions below read and write it.
revoke all on private.milestone_post_log from public, anon, authenticated;
grant select, insert, update, delete on private.milestone_post_log to service_role;

-- Posting -------------------------------------------------------------------------

-- Posts p_body for the learner when they turned milestone posts on, nothing
-- of theirs was hidden lately and this milestone was not posted before.
-- Returns the new post id, or null when nothing was posted. Never raises for
-- a refused post: the caller is a quiz pass or a certificate issue.
create function private.post_milestone(p_profile_id uuid, p_kind text, p_ref_id text, p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_post uuid;
begin
  if not exists (select 1 from public.profiles where id = p_profile_id and milestone_posts) then
    return null;
  end if;
  if exists (select 1 from public.community_posts
             where author_id = p_profile_id and hidden_at > now() - interval '30 days')
     or exists (select 1 from public.community_replies
                where author_id = p_profile_id and hidden_at > now() - interval '30 days') then
    return null;
  end if;

  begin
    insert into private.milestone_post_log (profile_id, kind, ref_id)
    values (p_profile_id, p_kind, p_ref_id)
    on conflict do nothing;
    if not found then
      return null;
    end if;

    insert into public.community_posts (author_id, scope, body)
    values (p_profile_id, 'everyone', p_body || E'\n\nShared automatically because I turned on milestone posts.')
    returning id into v_post;

    update private.milestone_post_log set post_id = v_post
     where profile_id = p_profile_id and kind = p_kind and ref_id = p_ref_id;
  exception when sqlstate '54000' then
    -- The feed's rate limit refused it; the ledger row rolls back with it.
    return null;
  end;
  return v_post;
end;
$$;

revoke execute on function private.post_milestone(uuid, text, text, text) from public, anon, authenticated;

-- Section and roadmap achievements. Visible copy: no dashes.
create function private.achievement_milestone_post()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_title   text;
  v_roadmap uuid;
  v_roadmap_title text;
begin
  if new.ref_id !~ '^[0-9a-f-]{36}$' then
    return null;
  end if;

  if new.type = 'section_completed' then
    select n.title, n.roadmap_id, r.title into v_title, v_roadmap, v_roadmap_title
    from public.roadmap_nodes n join public.roadmaps r on r.id = n.roadmap_id
    where n.id = new.ref_id::uuid;
    -- The roadmap milestone follows in the same transaction; post that one only.
    if v_title is null or private.roadmap_verified(new.profile_id, v_roadmap) then
      return null;
    end if;
    perform private.post_milestone(new.profile_id, 'section', new.ref_id,
      format('I finished the %s section of the %s roadmap, passing every checkpoint quiz in it.', v_title, v_roadmap_title));
  elsif new.type = 'roadmap_completed' then
    select r.title into v_roadmap_title from public.roadmaps r where r.id = new.ref_id::uuid;
    if v_roadmap_title is null then
      return null;
    end if;
    perform private.post_milestone(new.profile_id, 'roadmap', new.ref_id,
      format('I finished the %s roadmap, passing the checkpoint quiz for every required topic.', v_roadmap_title));
  end if;
  return null;
end;
$$;

revoke execute on function private.achievement_milestone_post() from public, anon, authenticated;

create trigger achievements_milestone_post
  after insert on public.achievements
  for each row
  when (new.type in ('section_completed', 'roadmap_completed'))
  execute function private.achievement_milestone_post();

-- Certificates: keyed by programme, so a certificate issued again after a
-- revocation does not post twice.
create function private.certificate_milestone_post()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.post_milestone(new.profile_id, 'certificate', new.program_id::text,
    format('I earned my %s certificate.',
           case when new.specialization_label is not null
                then new.program_title || ': ' || new.specialization_label
                else new.program_title end));
  return null;
end;
$$;

revoke execute on function private.certificate_milestone_post() from public, anon, authenticated;

create trigger certificates_milestone_post
  after insert on public.certificates
  for each row execute function private.certificate_milestone_post();
