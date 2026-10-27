-- Schema B (issue #158), part 2: regional chapters and the community feed.
--
-- Chapters are the regional model (Planning 01 §3): one per northern capital
-- first (Tamale, then Bolgatanga, Wa, Damongo, Nalerigu), each with a
-- volunteer lead and a WhatsApp group. WhatsApp stays the main chat; the in
-- app feed is for posts that should last (wins, questions, announcements).
--
-- The feed has three scopes: everyone (any signed in member), a chapter
-- (its members) and a cohort (its members, learners and staff). Scoped
-- posts are members only. Moderators: admins everywhere, chapter leads for
-- their chapter, cohort mentors and coordinators for their cohort. Moderators
-- hide content (it stays visible to its author and to moderators) rather
-- than delete it, so a report can still be reviewed. Reports reuse the
-- reports table with new target types.
--
-- Names of other people come only through definer functions (community_feed,
-- community_thread, chapter_roster): name, avatar and the public slug of
-- public profiles. Never phone or email.

-- chapters --------------------------------------------------------------------

create table public.chapters (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$'),
  name         text not null check (char_length(name) between 1 and 80),
  region       text not null check (region in (
                 'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                 'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                 'upper_east', 'upper_west', 'volta', 'western', 'western_north'
               )),
  city         text not null check (char_length(city) between 1 and 80),
  status       text not null default 'draft'
                 check (status in ('draft', 'launching', 'active', 'paused', 'closed')),
  summary      text check (char_length(summary) <= 2000),
  whatsapp_url text check (char_length(whatsapp_url) <= 300
                 and whatsapp_url ~ '^https://(chat\.whatsapp\.com|wa\.me|whatsapp\.com/channel)/[A-Za-z0-9/?=_-]+$'),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.chapters is
  'A regional chapter (region slug as on profiles.region, plus city). Public unless draft. Admins create; leads edit summary and WhatsApp link through set_chapter_details.';
comment on column public.chapters.status is
  'draft (admins only), launching (open to join, first Skillshop pending), active, paused (visible, not joinable), closed (visible, not joinable).';
comment on column public.chapters.whatsapp_url is
  'Invite link to the chapter WhatsApp group or channel. Public with the chapter.';

create index chapters_region_idx on public.chapters (region);

alter table public.chapters enable row level security;

create trigger chapters_set_updated_at
  before update on public.chapters
  for each row execute function private.set_updated_at();

create policy "Chapters are public unless draft; admins see all"
  on public.chapters for select
  to anon, authenticated
  using (status <> 'draft' or (select private.is_admin()));

create policy "Admins insert chapters"
  on public.chapters for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update chapters"
  on public.chapters for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete chapters"
  on public.chapters for delete to authenticated using ((select private.is_admin()));

revoke all on public.chapters from anon, authenticated;
grant select on public.chapters to anon, authenticated;
grant insert (slug, name, region, city, status, summary, whatsapp_url) on public.chapters to authenticated;
grant update (slug, name, region, city, status, summary, whatsapp_url) on public.chapters to authenticated;
grant delete on public.chapters to authenticated;
grant select, insert, update, delete on public.chapters to service_role;

-- chapter_members -------------------------------------------------------------

create table public.chapter_members (
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  profile_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  role       text not null default 'member' check (role in ('member', 'lead')),
  joined_at  timestamptz not null default now(),
  primary key (chapter_id, profile_id)
);

comment on table public.chapter_members is
  'Who is in a chapter. Learners join and leave themselves (as member); admins appoint leads; leads remove members.';

create index chapter_members_profile_idx on public.chapter_members (profile_id);

alter table public.chapter_members enable row level security;

-- The caller's role in a chapter, or null when they are not in it.
create function private.chapter_role(p_chapter_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.chapter_members
  where chapter_id = p_chapter_id and profile_id = (select auth.uid());
$$;

revoke execute on function private.chapter_role(uuid) from public;
grant execute on function private.chapter_role(uuid) to anon, authenticated, service_role;

create function private.is_chapter_lead(p_chapter_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.chapter_role(p_chapter_id) = 'lead', false);
$$;

revoke execute on function private.is_chapter_lead(uuid) from public;
grant execute on function private.is_chapter_lead(uuid) to anon, authenticated, service_role;

-- Launching and active chapters take new members.
create function private.chapter_is_joinable(p_chapter_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.chapters
    where id = p_chapter_id and status in ('launching', 'active')
  );
$$;

revoke execute on function private.chapter_is_joinable(uuid) from public;
grant execute on function private.chapter_is_joinable(uuid) to authenticated, service_role;

create policy "Members see their chapter's members; admins see all"
  on public.chapter_members for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.chapter_role(chapter_id) is not null
    or (select private.is_admin())
  );

create policy "Learners join as members; admins add anyone"
  on public.chapter_members for insert
  to authenticated
  with check (
    (profile_id = (select auth.uid()) and role = 'member' and private.chapter_is_joinable(chapter_id))
    or (select private.is_admin())
  );

create policy "Admins appoint leads"
  on public.chapter_members for update
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- Anyone leaves; leads remove members (not other leads); admins remove anyone.
create policy "Members leave; leads and admins remove"
  on public.chapter_members for delete
  to authenticated
  using (
    profile_id = (select auth.uid())
    or (role = 'member' and private.is_chapter_lead(chapter_id))
    or (select private.is_admin())
  );

revoke all on public.chapter_members from anon, authenticated;
grant select, delete on public.chapter_members to authenticated;
grant insert (chapter_id, profile_id, role) on public.chapter_members to authenticated;
grant update (role) on public.chapter_members to authenticated;
grant select, insert, update, delete on public.chapter_members to service_role;

-- Leads edit the parts of their chapter page they own. Admins can too (and
-- edit everything else directly).
create function public.set_chapter_details(p_chapter_id uuid, p_summary text, p_whatsapp_url text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (private.is_chapter_lead(p_chapter_id) or private.is_admin()) then
    raise exception 'Chapter leads only' using errcode = '42501';
  end if;
  update public.chapters
     set summary = nullif(trim(p_summary), ''),
         whatsapp_url = nullif(trim(p_whatsapp_url), '')
   where id = p_chapter_id;
  if not found then
    raise exception 'Chapter not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke execute on function public.set_chapter_details(uuid, text, text) from public, anon;
grant execute on function public.set_chapter_details(uuid, text, text) to authenticated, service_role;

-- chapter_roster (view) -------------------------------------------------------

-- Leads of visible chapters are public (the chapter page names them). The
-- full member list is for members of that chapter and admins.
create function private.chapter_roster_rows()
returns table (
  chapter_id   uuid,
  profile_id   uuid,
  display_name text,
  avatar_url   text,
  public_slug  text,
  role         text,
  joined_at    timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select m.chapter_id, m.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         m.role, m.joined_at
  from public.chapter_members m
  join public.profiles p on p.id = m.profile_id
  join public.chapters c on c.id = m.chapter_id
  where private.is_admin()
     or private.chapter_role(m.chapter_id) is not null
     or (m.role = 'lead' and c.status <> 'draft');
$$;

revoke execute on function private.chapter_roster_rows() from public;
grant execute on function private.chapter_roster_rows() to anon, authenticated, service_role;

create view public.chapter_roster
  with (security_invoker = true)
as
  select * from private.chapter_roster_rows();

comment on view public.chapter_roster is
  'Chapter leads for everyone; every member for members of that chapter and admins. Name and avatar only, never phone or email.';

revoke all on public.chapter_roster from anon, authenticated;
grant select on public.chapter_roster to anon, authenticated, service_role;

-- cohort_channels -------------------------------------------------------------

-- The cohort's WhatsApp group, kept off the public cohorts table: only the
-- cohort's members see it.
create table public.cohort_channels (
  cohort_id    uuid primary key references public.cohorts (id) on delete cascade,
  whatsapp_url text not null check (char_length(whatsapp_url) <= 300
                 and whatsapp_url ~ '^https://(chat\.whatsapp\.com|wa\.me|whatsapp\.com/channel)/[A-Za-z0-9/?=_-]+$'),
  updated_at   timestamptz not null default now()
);

comment on table public.cohort_channels is
  'A cohort''s WhatsApp invite link. Members of the cohort read it; its staff and admins set it.';

alter table public.cohort_channels enable row level security;

create trigger cohort_channels_set_updated_at
  before update on public.cohort_channels
  for each row execute function private.set_updated_at();

create policy "Cohort members read the channel"
  on public.cohort_channels for select
  to authenticated
  using (private.cohort_role(cohort_id) is not null or (select private.is_admin()));
create policy "Cohort staff set the channel"
  on public.cohort_channels for insert
  to authenticated
  with check (private.is_cohort_staff(cohort_id) or (select private.is_admin()));
create policy "Cohort staff change the channel"
  on public.cohort_channels for update
  to authenticated
  using (private.is_cohort_staff(cohort_id) or (select private.is_admin()))
  with check (private.is_cohort_staff(cohort_id) or (select private.is_admin()));
create policy "Cohort staff remove the channel"
  on public.cohort_channels for delete
  to authenticated
  using (private.is_cohort_staff(cohort_id) or (select private.is_admin()));

revoke all on public.cohort_channels from anon, authenticated;
grant select, delete on public.cohort_channels to authenticated;
grant insert (cohort_id, whatsapp_url), update (whatsapp_url) on public.cohort_channels to authenticated;
grant select, insert, update, delete on public.cohort_channels to service_role;

-- Scope helpers ---------------------------------------------------------------

-- The caller may read and post in this scope: any signed in member for
-- everyone, members for a chapter or cohort. Admins read everything but post
-- only where they belong (policies add the admin read).
create function private.in_community_scope(p_scope text, p_chapter_id uuid, p_cohort_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case p_scope
    when 'everyone' then (select auth.uid()) is not null
    when 'chapter'  then private.chapter_role(p_chapter_id) is not null
    when 'cohort'   then private.cohort_role(p_cohort_id) is not null
    else false
  end;
$$;

revoke execute on function private.in_community_scope(text, uuid, uuid) from public;
grant execute on function private.in_community_scope(text, uuid, uuid) to authenticated, service_role;

-- The caller moderates this scope: admins anywhere, chapter leads in their
-- chapter, cohort mentors and coordinators in their cohort.
create function private.moderates_community_scope(p_scope text, p_chapter_id uuid, p_cohort_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or case p_scope
    when 'chapter' then private.is_chapter_lead(p_chapter_id)
    when 'cohort'  then private.is_cohort_staff(p_cohort_id)
    else false
  end;
$$;

revoke execute on function private.moderates_community_scope(text, uuid, uuid) from public;
grant execute on function private.moderates_community_scope(text, uuid, uuid) to authenticated, service_role;

-- community_posts -------------------------------------------------------------

create table public.community_posts (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  scope         text not null check (scope in ('everyone', 'chapter', 'cohort')),
  chapter_id    uuid references public.chapters (id) on delete cascade,
  cohort_id     uuid references public.cohorts (id) on delete cascade,
  body          text not null check (char_length(trim(body)) between 1 and 4000),
  link_url      text check (char_length(link_url) <= 500 and link_url ~ '^https?://'),
  pinned_at     timestamptz,
  hidden_at     timestamptz,
  hidden_by     uuid references public.profiles (id) on delete set null,
  hidden_reason text check (char_length(hidden_reason) <= 500),
  edited_at     timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint community_posts_chapter_scope check ((scope = 'chapter') = (chapter_id is not null)),
  constraint community_posts_cohort_scope check ((scope = 'cohort') = (cohort_id is not null))
);

comment on table public.community_posts is
  'Feed posts scoped to everyone (signed in), a chapter or a cohort (members only). Authors edit body and link; moderators hide and pin through functions.';
comment on column public.community_posts.hidden_at is
  'Set by a moderator. Hidden posts stay visible to the author and moderators only.';

create index community_posts_everyone_idx on public.community_posts (created_at desc) where scope = 'everyone';
create index community_posts_chapter_idx on public.community_posts (chapter_id, created_at desc) where chapter_id is not null;
create index community_posts_cohort_idx on public.community_posts (cohort_id, created_at desc) where cohort_id is not null;
create index community_posts_author_idx on public.community_posts (author_id, created_at desc);

alter table public.community_posts enable row level security;

create trigger community_posts_set_updated_at
  before update on public.community_posts
  for each row execute function private.set_updated_at();

-- Edits by the author stamp edited_at; moderation does not.
create function private.stamp_community_edit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.body is distinct from old.body then
    new.edited_at := now();
  end if;
  return new;
end;
$$;

revoke execute on function private.stamp_community_edit() from public;

create trigger community_posts_stamp_edit
  before update of body on public.community_posts
  for each row execute function private.stamp_community_edit();

-- Basic abuse protection: at most 10 posts and 60 replies an hour per person.
-- Error 54000 (program_limit_exceeded) with message 'Slow down'.
create function private.community_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recent integer;
begin
  if tg_table_name = 'community_posts' then
    select count(*) into v_recent from public.community_posts
    where author_id = new.author_id and created_at > now() - interval '1 hour';
    if v_recent >= 10 then
      raise exception 'Slow down' using errcode = '54000';
    end if;
  else
    select count(*) into v_recent from public.community_replies
    where author_id = new.author_id and created_at > now() - interval '1 hour';
    if v_recent >= 60 then
      raise exception 'Slow down' using errcode = '54000';
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function private.community_rate_limit() from public, anon, authenticated;

create trigger community_posts_rate_limit
  before insert on public.community_posts
  for each row execute function private.community_rate_limit();

create policy "Members read posts in their scopes"
  on public.community_posts for select
  to authenticated
  using (
    (private.in_community_scope(scope, chapter_id, cohort_id) or (select private.is_admin()))
    and (
      hidden_at is null
      or author_id = (select auth.uid())
      or private.moderates_community_scope(scope, chapter_id, cohort_id)
    )
  );

create policy "Members post as themselves in their scopes"
  on public.community_posts for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and private.in_community_scope(scope, chapter_id, cohort_id)
  );

create policy "Authors edit their posts"
  on public.community_posts for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors and moderators delete posts"
  on public.community_posts for delete
  to authenticated
  using (
    author_id = (select auth.uid())
    or private.moderates_community_scope(scope, chapter_id, cohort_id)
  );

revoke all on public.community_posts from anon, authenticated;
grant select, delete on public.community_posts to authenticated;
grant insert (author_id, scope, chapter_id, cohort_id, body, link_url) on public.community_posts to authenticated;
grant update (body, link_url) on public.community_posts to authenticated;
grant select, insert, update, delete on public.community_posts to service_role;

-- Read check by id, for replies, reactions and the report queue.
create function private.can_read_community_post(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_posts p
    where p.id = p_post_id
      and (private.in_community_scope(p.scope, p.chapter_id, p.cohort_id) or private.is_admin())
      and (p.hidden_at is null or p.author_id = (select auth.uid())
           or private.moderates_community_scope(p.scope, p.chapter_id, p.cohort_id))
  );
$$;

revoke execute on function private.can_read_community_post(uuid) from public;
grant execute on function private.can_read_community_post(uuid) to authenticated, service_role;

-- The caller can read the post and it is not hidden: replies and reactions
-- are allowed.
create function private.community_post_is_open(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_posts p
    where p.id = p_post_id and p.hidden_at is null
      and private.in_community_scope(p.scope, p.chapter_id, p.cohort_id)
  );
$$;

revoke execute on function private.community_post_is_open(uuid) from public;
grant execute on function private.community_post_is_open(uuid) to authenticated, service_role;

create function private.moderates_community_post(p_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_posts p
    where p.id = p_post_id
      and private.moderates_community_scope(p.scope, p.chapter_id, p.cohort_id)
  );
$$;

revoke execute on function private.moderates_community_post(uuid) from public;
grant execute on function private.moderates_community_post(uuid) to authenticated, service_role;

-- A chapter lead's post notifies the chapter's other members.
create function private.notify_chapter_post()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_chapter public.chapters%rowtype;
begin
  if new.scope <> 'chapter' then
    return new;
  end if;
  if not exists (
    select 1 from public.chapter_members
    where chapter_id = new.chapter_id and profile_id = new.author_id and role = 'lead'
  ) then
    return new;
  end if;
  select * into v_chapter from public.chapters where id = new.chapter_id;
  perform private.notify(m.profile_id, 'chapter_post',
    jsonb_build_object('post_id', new.id, 'chapter_id', v_chapter.id,
                       'chapter_slug', v_chapter.slug, 'chapter_name', v_chapter.name))
  from public.chapter_members m
  where m.chapter_id = new.chapter_id and m.profile_id <> new.author_id;
  return new;
end;
$$;

revoke execute on function private.notify_chapter_post() from public, anon, authenticated;

create trigger community_posts_notify_chapter
  after insert on public.community_posts
  for each row execute function private.notify_chapter_post();

-- community_replies -----------------------------------------------------------

create table public.community_replies (
  id            uuid primary key default gen_random_uuid(),
  post_id       uuid not null references public.community_posts (id) on delete cascade,
  author_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  body          text not null check (char_length(trim(body)) between 1 and 2000),
  hidden_at     timestamptz,
  hidden_by     uuid references public.profiles (id) on delete set null,
  hidden_reason text check (char_length(hidden_reason) <= 500),
  edited_at     timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.community_replies is
  'Replies to a feed post, readable wherever the post is. Hidden replies stay visible to the author and moderators.';

create index community_replies_post_idx on public.community_replies (post_id, created_at);
create index community_replies_author_idx on public.community_replies (author_id, created_at desc);

alter table public.community_replies enable row level security;

create trigger community_replies_set_updated_at
  before update on public.community_replies
  for each row execute function private.set_updated_at();

create trigger community_replies_stamp_edit
  before update of body on public.community_replies
  for each row execute function private.stamp_community_edit();

create trigger community_replies_rate_limit
  before insert on public.community_replies
  for each row execute function private.community_rate_limit();

create policy "Members read replies to posts they can read"
  on public.community_replies for select
  to authenticated
  using (
    private.can_read_community_post(post_id)
    and (
      hidden_at is null
      or author_id = (select auth.uid())
      or private.moderates_community_post(post_id)
    )
  );

create policy "Members reply as themselves to open posts"
  on public.community_replies for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and private.community_post_is_open(post_id)
  );

create policy "Authors edit their replies"
  on public.community_replies for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors and moderators delete replies"
  on public.community_replies for delete
  to authenticated
  using (author_id = (select auth.uid()) or private.moderates_community_post(post_id));

revoke all on public.community_replies from anon, authenticated;
grant select, delete on public.community_replies to authenticated;
grant insert (post_id, author_id, body) on public.community_replies to authenticated;
grant update (body) on public.community_replies to authenticated;
grant select, insert, update, delete on public.community_replies to service_role;

-- A reply notifies the post's author (not themselves).
create function private.notify_community_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_post public.community_posts%rowtype;
begin
  select * into v_post from public.community_posts where id = new.post_id;
  if v_post.author_id <> new.author_id then
    perform private.notify(v_post.author_id, 'community_reply',
      jsonb_build_object('post_id', v_post.id, 'reply_id', new.id, 'scope', v_post.scope,
                         'chapter_id', v_post.chapter_id, 'cohort_id', v_post.cohort_id));
  end if;
  return new;
end;
$$;

revoke execute on function private.notify_community_reply() from public, anon, authenticated;

create trigger community_replies_notify
  after insert on public.community_replies
  for each row execute function private.notify_community_reply();

-- community_reactions ---------------------------------------------------------

create table public.community_reactions (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  post_id    uuid references public.community_posts (id) on delete cascade,
  reply_id   uuid references public.community_replies (id) on delete cascade,
  kind       text not null check (kind in ('like', 'celebrate', 'helpful', 'support')),
  created_at timestamptz not null default now(),
  constraint community_reactions_one_target check (num_nonnulls(post_id, reply_id) = 1),
  constraint community_reactions_once unique nulls not distinct (profile_id, post_id, reply_id, kind)
);

comment on table public.community_reactions is
  'One reaction of a kind per person per post or reply. Readable wherever the target is.';

create index community_reactions_post_idx on public.community_reactions (post_id) where post_id is not null;
create index community_reactions_reply_idx on public.community_reactions (reply_id) where reply_id is not null;

alter table public.community_reactions enable row level security;

-- The reply exists, its post is open to the caller and the reply is not hidden.
create function private.community_reply_is_open(p_reply_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_replies r
    where r.id = p_reply_id and r.hidden_at is null
      and private.community_post_is_open(r.post_id)
  );
$$;

revoke execute on function private.community_reply_is_open(uuid) from public;
grant execute on function private.community_reply_is_open(uuid) to authenticated, service_role;

create function private.can_read_community_reply(p_reply_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.community_replies r
    where r.id = p_reply_id
      and private.can_read_community_post(r.post_id)
      and (r.hidden_at is null or r.author_id = (select auth.uid())
           or private.moderates_community_post(r.post_id))
  );
$$;

revoke execute on function private.can_read_community_reply(uuid) from public;
grant execute on function private.can_read_community_reply(uuid) to authenticated, service_role;

create policy "Members read reactions on what they can read"
  on public.community_reactions for select
  to authenticated
  using (
    (post_id is not null and private.can_read_community_post(post_id))
    or (reply_id is not null and private.can_read_community_reply(reply_id))
  );

create policy "Members react as themselves"
  on public.community_reactions for insert
  to authenticated
  with check (
    profile_id = (select auth.uid())
    and (
      (post_id is not null and private.community_post_is_open(post_id))
      or (reply_id is not null and private.community_reply_is_open(reply_id))
    )
  );

create policy "Members remove their reactions"
  on public.community_reactions for delete
  to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.community_reactions from anon, authenticated;
grant select, delete on public.community_reactions to authenticated;
grant insert (profile_id, post_id, reply_id, kind) on public.community_reactions to authenticated;
grant select, insert, update, delete on public.community_reactions to service_role;

-- Feed and thread reads -------------------------------------------------------

-- One page of a feed, newest first (pinned first), with author name and
-- avatar, reply count, reaction counts and the caller's own reactions.
-- p_scope_id is the chapter or cohort id (ignored for everyone). Pass the
-- created_at of the last post seen as p_before for the next page.
create function public.community_feed(
  p_scope    text,
  p_scope_id uuid default null,
  p_before   timestamptz default null,
  p_limit    integer default 20
)
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
declare
  v_chapter_id uuid := case when p_scope = 'chapter' then p_scope_id end;
  v_cohort_id  uuid := case when p_scope = 'cohort' then p_scope_id end;
  v_moderator  boolean;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if p_scope not in ('everyone', 'chapter', 'cohort')
     or (p_scope <> 'everyone' and p_scope_id is null) then
    raise exception 'Unknown feed' using errcode = '22023';
  end if;
  if not (private.in_community_scope(p_scope, v_chapter_id, v_cohort_id) or private.is_admin()) then
    raise exception 'Members only' using errcode = '42501';
  end if;
  v_moderator := private.moderates_community_scope(p_scope, v_chapter_id, v_cohort_id);

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
    where p.scope = p_scope
      and p.chapter_id is not distinct from v_chapter_id
      and p.cohort_id is not distinct from v_cohort_id
      and (p.hidden_at is null or p.author_id = (select auth.uid()) or v_moderator)
      and (p_before is null or p.created_at < p_before)
    order by (p.pinned_at is not null and p_before is null) desc, p.created_at desc
    limit least(greatest(coalesce(p_limit, 20), 1), 100);
end;
$$;

revoke execute on function public.community_feed(text, uuid, timestamptz, integer) from public, anon;
grant execute on function public.community_feed(text, uuid, timestamptz, integer) to authenticated, service_role;

-- A post's replies, oldest first, with author name and avatar.
create function public.community_thread(p_post_id uuid)
returns table (
  id                 uuid,
  post_id            uuid,
  author_id          uuid,
  author_name        text,
  author_avatar_url  text,
  author_public_slug text,
  body               text,
  hidden_at          timestamptz,
  edited_at          timestamptz,
  created_at         timestamptz,
  reaction_counts    jsonb,
  my_reactions       text[]
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_moderator boolean;
begin
  if not private.can_read_community_post(p_post_id) then
    raise exception 'Post not found' using errcode = 'P0002';
  end if;
  v_moderator := private.moderates_community_post(p_post_id);

  return query
    select r.id, r.post_id, r.author_id, a.display_name, a.avatar_url,
           case when a.is_public then a.public_slug end,
           r.body, r.hidden_at, r.edited_at, r.created_at,
           coalesce((select jsonb_object_agg(k.kind, k.n) from (
              select cr.kind, count(*) as n from public.community_reactions cr
              where cr.reply_id = r.id group by cr.kind) k), '{}'::jsonb),
           coalesce((select array_agg(cr.kind order by cr.kind) from public.community_reactions cr
              where cr.reply_id = r.id and cr.profile_id = (select auth.uid())), '{}'::text[])
    from public.community_replies r
    join public.profiles a on a.id = r.author_id
    where r.post_id = p_post_id
      and (r.hidden_at is null or r.author_id = (select auth.uid()) or v_moderator)
    order by r.created_at
    limit 500;
end;
$$;

revoke execute on function public.community_thread(uuid) from public, anon;
grant execute on function public.community_thread(uuid) to authenticated, service_role;

-- Moderation ------------------------------------------------------------------

-- Hide or unhide a post or reply. Moderators of the scope only. A reason is
-- required to hide.
create function public.moderate_community_content(
  p_target_type text,
  p_target_id   uuid,
  p_hide        boolean,
  p_reason      text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_post_id uuid;
begin
  if p_target_type = 'community_post' then
    v_post_id := p_target_id;
  elsif p_target_type = 'community_reply' then
    select post_id into v_post_id from public.community_replies where id = p_target_id;
  else
    raise exception 'Unknown target type' using errcode = '22023';
  end if;
  if v_post_id is null or not exists (select 1 from public.community_posts where id = v_post_id) then
    raise exception 'Not found' using errcode = 'P0002';
  end if;
  if not private.moderates_community_post(v_post_id) then
    raise exception 'Moderators only' using errcode = '42501';
  end if;
  if p_hide and nullif(trim(p_reason), '') is null then
    raise exception 'Give a reason' using errcode = '22023';
  end if;

  if p_target_type = 'community_post' then
    update public.community_posts
       set hidden_at = case when p_hide then now() end,
           hidden_by = case when p_hide then (select auth.uid()) end,
           hidden_reason = case when p_hide then trim(p_reason) end
     where id = p_target_id;
  else
    update public.community_replies
       set hidden_at = case when p_hide then now() end,
           hidden_by = case when p_hide then (select auth.uid()) end,
           hidden_reason = case when p_hide then trim(p_reason) end
     where id = p_target_id;
  end if;
end;
$$;

revoke execute on function public.moderate_community_content(text, uuid, boolean, text) from public, anon;
grant execute on function public.moderate_community_content(text, uuid, boolean, text) to authenticated, service_role;

-- Pin or unpin a post (announcements). Moderators of the scope only.
create function public.pin_community_post(p_post_id uuid, p_pinned boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (select 1 from public.community_posts where id = p_post_id) then
    raise exception 'Post not found' using errcode = 'P0002';
  end if;
  if not private.moderates_community_post(p_post_id) then
    raise exception 'Moderators only' using errcode = '42501';
  end if;
  update public.community_posts
     set pinned_at = case when p_pinned then coalesce(pinned_at, now()) end
   where id = p_post_id;
end;
$$;

revoke execute on function public.pin_community_post(uuid, boolean) from public, anon;
grant execute on function public.pin_community_post(uuid, boolean) to authenticated, service_role;

-- Reports: new target types ---------------------------------------------------

-- Widening the list is additive: every existing row still passes.
alter table public.reports drop constraint reports_target_type_check;
alter table public.reports add constraint reports_target_type_check check (target_type in (
  'profile', 'achievement', 'roadmap_node', 'node_resource', 'other',
  'community_post', 'community_reply', 'chapter', 'community_event', 'event_recording'
));

-- The moderation queue for community content: reports on posts and replies
-- the caller moderates (admins: all of them), with the content and names.
create function public.community_report_queue(p_status text default 'open')
returns table (
  id            uuid,
  target_type   text,
  target_id     text,
  reason        text,
  status        text,
  created_at    timestamptz,
  reporter_name text,
  post_id       uuid,
  scope         text,
  chapter_id    uuid,
  cohort_id     uuid,
  content_body  text,
  author_id     uuid,
  author_name   text,
  hidden_at     timestamptz
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
  return query
    with targets as (
      select r.*, coalesce(post.id, reply.post_id) as the_post_id,
             coalesce(reply.body, post.body) as the_body,
             coalesce(reply.author_id, post.author_id) as the_author_id,
             coalesce(reply.hidden_at, post.hidden_at) as the_hidden_at
      from public.reports r
      left join public.community_posts post
        on r.target_type = 'community_post' and post.id::text = r.target_id
      left join public.community_replies reply
        on r.target_type = 'community_reply' and reply.id::text = r.target_id
      where r.target_type in ('community_post', 'community_reply')
        and (p_status is null or r.status = p_status)
    )
    select t.id, t.target_type, t.target_id, t.reason, t.status, t.created_at,
           reporter.display_name, p.id, p.scope, p.chapter_id, p.cohort_id,
           t.the_body, t.the_author_id, author.display_name, t.the_hidden_at
    from targets t
    join public.community_posts p on p.id = t.the_post_id
    left join public.profiles reporter on reporter.id = t.reporter_id
    left join public.profiles author on author.id = t.the_author_id
    where private.moderates_community_scope(p.scope, p.chapter_id, p.cohort_id)
    order by t.created_at desc
    limit 200;
end;
$$;

revoke execute on function public.community_report_queue(text) from public, anon;
grant execute on function public.community_report_queue(text) to authenticated, service_role;

-- Moderators of the reported content triage its report. Admins can also
-- update reports directly.
create function public.set_community_report_status(p_report_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_report  public.reports%rowtype;
  v_post_id uuid;
begin
  if p_status not in ('open', 'reviewing', 'actioned', 'dismissed') then
    raise exception 'Unknown status' using errcode = '22023';
  end if;
  select * into v_report from public.reports where id = p_report_id;
  if not found or v_report.target_type not in ('community_post', 'community_reply') then
    raise exception 'Report not found' using errcode = 'P0002';
  end if;
  if v_report.target_type = 'community_post' then
    select id into v_post_id from public.community_posts where id::text = v_report.target_id;
  else
    select post_id into v_post_id from public.community_replies where id::text = v_report.target_id;
  end if;
  if not (private.is_admin() or (v_post_id is not null and private.moderates_community_post(v_post_id))) then
    raise exception 'Moderators only' using errcode = '42501';
  end if;
  update public.reports set status = p_status where id = p_report_id;
end;
$$;

revoke execute on function public.set_community_report_status(uuid, text) from public, anon;
grant execute on function public.set_community_report_status(uuid, text) to authenticated, service_role;
