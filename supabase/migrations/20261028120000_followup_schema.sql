-- Follow up schema (issue #192): the four gaps the Phase 2 and Schema B
-- feature PRs left for a migration.
--
-- 1. public_portfolio: graded work a learner chose for their portfolio, shown
--    on their public profile. Week, theme, programme, link, a text excerpt
--    and the graded date. Never scores, feedback, AI fields or file paths.
-- 2. community_post(post_id): one post in the community_feed row shape, for
--    thread headers, with the same visibility rules.
-- 3. ai_review_usage: tokens per AI rubric review model call. Written by the
--    service role only, read by admins.
-- 4. admin_find_profile_by_email(email): admins find a profile by sign in
--    email (auth.users), replacing the Auth admin listUsers scan.

-- 1. public_portfolio ---------------------------------------------------------

-- Files stay private. The submissions bucket is never opened to the public;
-- the row says only whether a file is attached (has_file), and the public
-- page shows the link and text excerpt.
create function private.public_portfolio_rows()
returns table (
  submission_id   uuid,
  profile_id      uuid,
  public_slug     text,
  program_slug    text,
  program_title   text,
  week_number     smallint,
  theme           text,
  is_capstone     boolean,
  link_url        text,
  body_excerpt    text,
  body_is_excerpt boolean,
  has_file        boolean,
  graded_at       timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select s.id, s.profile_id, pr.public_slug, p.slug, p.title,
         w.week_number::smallint, w.theme, w.is_capstone,
         s.link_url,
         left(s.body_text, 600),
         coalesce(char_length(s.body_text) > 600, false),
         s.file_path is not null,
         s.graded_at
  from public.submissions s
  join public.profiles pr on pr.id = s.profile_id and pr.is_public and pr.public_slug is not null
  join public.programs p on p.id = s.program_id and p.is_published
  join public.program_weeks w on w.id = s.program_week_id
  where s.status = 'graded' and s.in_portfolio;
$$;

revoke execute on function private.public_portfolio_rows() from public;
grant execute on function private.public_portfolio_rows() to anon, authenticated, service_role;

create view public.public_portfolio
  with (security_invoker = true)
as
  select * from private.public_portfolio_rows();

comment on view public.public_portfolio is
  'Graded work learners with a public profile put in their portfolio. No scores, feedback, AI fields or file paths: add a column only by changing private.public_portfolio_rows, deliberately.';

revoke all on public.public_portfolio from anon, authenticated;
grant select on public.public_portfolio to anon, authenticated, service_role;

-- 2. community_post -------------------------------------------------------------

-- One post with the columns of a community_feed row. Whoever can read the
-- post (community_thread's rule: members of the scope and admins; hidden
-- posts only for their author and moderators). Otherwise P0002.
create function public.community_post(p_post_id uuid)
returns table (
  id                 uuid,
  scope              text,
  chapter_id         uuid,
  cohort_id          uuid,
  author_id          uuid,
  author_name        text,
  author_avatar_url  text,
  author_public_slug text,
  author_is_lead     boolean,
  body               text,
  link_url           text,
  pinned_at          timestamptz,
  hidden_at          timestamptz,
  edited_at          timestamptz,
  created_at         timestamptz,
  reply_count        integer,
  reaction_counts    jsonb,
  my_reactions       text[]
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if not private.can_read_community_post(p_post_id) then
    raise exception 'Post not found' using errcode = 'P0002';
  end if;

  return query
    select p.id, p.scope, p.chapter_id, p.cohort_id, p.author_id,
           a.display_name, a.avatar_url,
           case when a.is_public then a.public_slug end,
           exists (select 1 from public.chapter_members cm
                   where cm.chapter_id = p.chapter_id and cm.profile_id = p.author_id and cm.role = 'lead'),
           p.body, p.link_url, p.pinned_at, p.hidden_at, p.edited_at, p.created_at,
           (select count(*)::integer from public.community_replies r
             where r.post_id = p.id and r.hidden_at is null),
           coalesce((select jsonb_object_agg(k.kind, k.n) from (
              select cr.kind, count(*) as n from public.community_reactions cr
              where cr.post_id = p.id group by cr.kind) k), '{}'::jsonb),
           coalesce((select array_agg(cr.kind order by cr.kind) from public.community_reactions cr
              where cr.post_id = p.id and cr.profile_id = (select auth.uid())), '{}'::text[])
    from public.community_posts p
    join public.profiles a on a.id = p.author_id
    where p.id = p_post_id;
end;
$$;

revoke execute on function public.community_post(uuid) from public, anon;
grant execute on function public.community_post(uuid) to authenticated, service_role;

-- 3. ai_review_usage ------------------------------------------------------------

create table public.ai_review_usage (
  id                          uuid primary key default gen_random_uuid(),
  submission_id               uuid not null references public.submissions (id) on delete cascade,
  attempt                     smallint not null check (attempt between 1 and 100),
  model                       text not null check (char_length(model) between 1 and 100),
  outcome                     text not null check (outcome in ('recorded', 'stale', 'failed')),
  input_tokens                integer not null default 0 check (input_tokens >= 0),
  output_tokens               integer not null default 0 check (output_tokens >= 0),
  cache_creation_input_tokens integer not null default 0 check (cache_creation_input_tokens >= 0),
  cache_read_input_tokens     integer not null default 0 check (cache_read_input_tokens >= 0),
  estimated_usd               numeric(12, 6) check (estimated_usd >= 0),
  created_at                  timestamptz not null default now()
);

comment on table public.ai_review_usage is
  'One row per AI rubric review model call (also failed ones), with token counts and an estimated cost. Written by server code with the service role; admins read.';

create index ai_review_usage_submission_idx on public.ai_review_usage (submission_id, attempt);
create index ai_review_usage_created_idx on public.ai_review_usage (created_at desc);

alter table public.ai_review_usage enable row level security;

create policy "Admins read AI review usage"
  on public.ai_review_usage for select
  to authenticated
  using ((select private.is_admin()));

revoke all on public.ai_review_usage from anon, authenticated;
grant select on public.ai_review_usage to authenticated;
grant select, insert on public.ai_review_usage to service_role;

-- 4. admin_find_profile_by_email -------------------------------------------------

-- Email lives only in auth.users. The definer reads it for admins and
-- returns the profile id and display name; never the email itself or anyone
-- else's row. Others get 42501.
create function private.admin_find_profile_by_email(p_email text)
returns table (id uuid, display_name text)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_email is null or char_length(trim(p_email)) not between 3 and 320 then
    raise exception 'Give an email' using errcode = '22023';
  end if;

  return query
    select pr.id, pr.display_name
    from auth.users u
    join public.profiles pr on pr.id = u.id
    where lower(u.email) = lower(trim(p_email))
    order by u.created_at
    limit 1;
end;
$$;

revoke execute on function private.admin_find_profile_by_email(text) from public;
grant execute on function private.admin_find_profile_by_email(text) to authenticated;

-- The API entry point: security invoker, so the caller check above runs as
-- the caller. Not executable by anon.
create function public.admin_find_profile_by_email(p_email text)
returns table (id uuid, display_name text)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.admin_find_profile_by_email(p_email);
$$;

revoke execute on function public.admin_find_profile_by_email(text) from public, anon;
grant execute on function public.admin_find_profile_by_email(text) to authenticated;
