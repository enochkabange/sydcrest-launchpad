-- Phase 1, part 2: roadmap content.
--
-- Original, Ghana localised roadmaps (never roadmap.sh content). Published
-- content is readable by everyone, signed in or not, so roadmap pages can be
-- server rendered for SEO. Only admins write. Quiz answer keys live in their
-- own table that learners cannot read at all; grading happens in
-- public.submit_node_quiz (part 3).

-- roadmaps ------------------------------------------------------------------

create table public.roadmaps (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  title          text not null check (char_length(title) between 1 and 120),
  description    text check (char_length(description) <= 2000),
  track          text,
  field_category text,
  locale         text not null default 'en-GH',
  is_published   boolean not null default false,
  display_order  integer not null default 0,
  og_image_url   text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.roadmaps is
  'A learning roadmap (Data Analyst, Frontend...). Visible to everyone once is_published.';

create index roadmaps_published_order_idx
  on public.roadmaps (display_order) where is_published;

alter table public.roadmaps enable row level security;

create trigger roadmaps_set_updated_at
  before update on public.roadmaps
  for each row execute function private.set_updated_at();

-- Helpers used by content policies. Definer so they don't stack RLS on RLS
-- and stay cheap; they only answer "is this published".
create function private.roadmap_is_published(p_roadmap_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.roadmaps where id = p_roadmap_id and is_published
  );
$$;

revoke execute on function private.roadmap_is_published(uuid) from public;
grant execute on function private.roadmap_is_published(uuid) to anon, authenticated, service_role;

-- roadmap_nodes -------------------------------------------------------------

create table public.roadmap_nodes (
  id          uuid primary key default gen_random_uuid(),
  roadmap_id  uuid not null references public.roadmaps (id) on delete cascade,
  parent_id   uuid,
  slug        text not null check (slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  title       text not null check (char_length(title) between 1 and 120),
  summary     text check (char_length(summary) <= 1000),
  position    integer not null default 0,
  is_optional boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (roadmap_id, slug),
  -- Target for the parent FK below, so a parent is always in the same roadmap.
  unique (roadmap_id, id),
  foreign key (roadmap_id, parent_id)
    references public.roadmap_nodes (roadmap_id, id) on delete cascade,
  check (parent_id is distinct from id)
);

comment on table public.roadmap_nodes is
  'A topic in a roadmap. parent_id forms the tree; position orders siblings.';

create index roadmap_nodes_roadmap_position_idx on public.roadmap_nodes (roadmap_id, position);
create index roadmap_nodes_parent_idx on public.roadmap_nodes (roadmap_id, parent_id);

alter table public.roadmap_nodes enable row level security;

create trigger roadmap_nodes_set_updated_at
  before update on public.roadmap_nodes
  for each row execute function private.set_updated_at();

create function private.node_is_published(p_node_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.roadmap_nodes n
    join public.roadmaps r on r.id = n.roadmap_id
    where n.id = p_node_id and r.is_published
  );
$$;

revoke execute on function private.node_is_published(uuid) from public;
grant execute on function private.node_is_published(uuid) to anon, authenticated, service_role;

-- node_content --------------------------------------------------------------

create table public.node_content (
  id               uuid primary key default gen_random_uuid(),
  node_id          uuid not null unique references public.roadmap_nodes (id) on delete cascade,
  explanation_md   text not null,
  practice_task_md text,
  content_version  integer not null default 1 check (content_version > 0),
  generated_at     timestamptz not null default now(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.node_content is
  'Pre generated, reviewed explanation and practice task for a node. One current version per node.';

alter table public.node_content enable row level security;

create trigger node_content_set_updated_at
  before update on public.node_content
  for each row execute function private.set_updated_at();

-- node_resources ------------------------------------------------------------

create table public.node_resources (
  id         uuid primary key default gen_random_uuid(),
  node_id    uuid not null references public.roadmap_nodes (id) on delete cascade,
  label      text not null check (char_length(label) between 1 and 200),
  url        text not null check (url ~ '^https?://'),
  kind       text not null check (kind in ('article', 'video', 'practice')),
  is_active  boolean not null default true,
  source     text,
  position   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.node_resources is
  'External links for a node. is_active is the link health flag; inactive links are hidden from learners.';

create index node_resources_node_idx on public.node_resources (node_id, position);

alter table public.node_resources enable row level security;

create trigger node_resources_set_updated_at
  before update on public.node_resources
  for each row execute function private.set_updated_at();

-- node_quiz and node_quiz_answers --------------------------------------------

create table public.node_quiz (
  id             uuid primary key default gen_random_uuid(),
  node_id        uuid not null unique references public.roadmap_nodes (id) on delete cascade,
  questions      jsonb not null check (jsonb_typeof(questions) = 'array'),
  pass_threshold smallint not null default 70 check (pass_threshold between 1 and 100),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.node_quiz is
  'Questions only: [{"id":"q1","prompt":"...","options":["...","..."]}]. No answers here.';
comment on column public.node_quiz.pass_threshold is
  'Percentage (1 to 100) needed to pass and mark the node done.';

alter table public.node_quiz enable row level security;

create trigger node_quiz_set_updated_at
  before update on public.node_quiz
  for each row execute function private.set_updated_at();

-- Answer keys are a separate table rather than a hidden column: column grants
-- are per role, so a hidden column would also hide it from admins (who are
-- the authenticated role too) and would make select * on node_quiz fail.
-- Learners get no rows here, ever; submit_node_quiz grades as definer.
create table public.node_quiz_answers (
  quiz_id    uuid primary key references public.node_quiz (id) on delete cascade,
  answer_key jsonb not null check (jsonb_typeof(answer_key) = 'object'),
  updated_at timestamptz not null default now()
);

comment on table public.node_quiz_answers is
  'Correct option per question id: {"q1": 2}. Admins and the grading function only.';

alter table public.node_quiz_answers enable row level security;

create trigger node_quiz_answers_set_updated_at
  before update on public.node_quiz_answers
  for each row execute function private.set_updated_at();

-- Policies ------------------------------------------------------------------
-- Reads: published (and, for resources, active) rows for everyone; admins
-- see drafts. Writes: admins only, through the authenticated role.

create policy "Published roadmaps are public"
  on public.roadmaps for select
  to anon, authenticated
  using (is_published or (select private.is_admin()));

create policy "Nodes of published roadmaps are public"
  on public.roadmap_nodes for select
  to anon, authenticated
  using (private.roadmap_is_published(roadmap_id) or (select private.is_admin()));

create policy "Content of published nodes is public"
  on public.node_content for select
  to anon, authenticated
  using (private.node_is_published(node_id) or (select private.is_admin()));

create policy "Active resources of published nodes are public"
  on public.node_resources for select
  to anon, authenticated
  using ((is_active and private.node_is_published(node_id)) or (select private.is_admin()));

create policy "Quiz questions of published nodes are public"
  on public.node_quiz for select
  to anon, authenticated
  using (private.node_is_published(node_id) or (select private.is_admin()));

create policy "Admins read answer keys"
  on public.node_quiz_answers for select
  to authenticated
  using ((select private.is_admin()));

-- One set of admin write policies per content table.
do $$
declare
  t text;
begin
  foreach t in array array[
    'roadmaps', 'roadmap_nodes', 'node_content', 'node_resources',
    'node_quiz', 'node_quiz_answers'
  ] loop
    execute format(
      'create policy "Admins insert %1$s" on public.%1$I for insert to authenticated
         with check ((select private.is_admin()))', t);
    execute format(
      'create policy "Admins update %1$s" on public.%1$I for update to authenticated
         using ((select private.is_admin())) with check ((select private.is_admin()))', t);
    execute format(
      'create policy "Admins delete %1$s" on public.%1$I for delete to authenticated
         using ((select private.is_admin()))', t);

    execute format('revoke all on public.%I from anon, authenticated', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant select, insert, update, delete on public.%I to service_role', t);
  end loop;
end;
$$;

grant select on public.roadmaps, public.roadmap_nodes, public.node_content,
  public.node_resources, public.node_quiz to anon;
