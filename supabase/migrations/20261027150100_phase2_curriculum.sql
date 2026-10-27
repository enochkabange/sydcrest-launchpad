-- Phase 2, part 2: the curriculum of a programme.
--
-- program_weeks holds each week's theme, objectives, free resource and
-- assignment. A week with a specialization replaces the shared week of the
-- same number for learners who chose it (DMP weeks 7 to 9). Weeks link to
-- roadmap topics by roadmap slug and node slug, not by id, so the links
-- survive a roadmap re import. Rubrics hold the criteria AI review, mentors
-- and peer reviewers score against.
--
-- The curriculum is not personal: anyone reads it once the programme is
-- published (the public /programme page uses it). Admins write.

-- program_weeks -----------------------------------------------------------------

create table public.program_weeks (
  id             uuid primary key default gen_random_uuid(),
  program_id     uuid not null references public.programs (id) on delete cascade,
  week_number    smallint not null check (week_number between 1 and 52),
  specialization text,
  theme          text not null check (char_length(theme) between 1 and 200),
  objectives     text[] not null default '{}' check (cardinality(objectives) <= 20),
  resource_name  text check (char_length(resource_name) <= 200),
  resource_url   text check (resource_url ~ '^https?://'),
  assignment     text not null check (char_length(assignment) between 1 and 2000),
  is_capstone    boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  -- One shared row (specialization null) or one row per specialization.
  constraint program_weeks_once unique nulls not distinct (program_id, week_number, specialization),
  -- Target for composite foreign keys that keep a week inside its programme.
  unique (program_id, id)
);

comment on table public.program_weeks is
  'A week of a programme. specialization null means shared; otherwise only learners with that specialization take it. Render theme through displayTheme (no dashes in copy).';
comment on column public.program_weeks.is_capstone is
  'Capstone week: AI review uses the reasoning model and peer review is assigned on it (required for certification).';

alter table public.program_weeks enable row level security;

create trigger program_weeks_set_updated_at
  before update on public.program_weeks
  for each row execute function private.set_updated_at();

create function private.validate_program_week()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.specialization is not null
     and not private.program_has_specialization(new.program_id, new.specialization) then
    raise exception 'Unknown specialization %', new.specialization using errcode = '22023';
  end if;
  return new;
end;
$$;

revoke execute on function private.validate_program_week() from public;

create trigger program_weeks_validate
  before insert or update on public.program_weeks
  for each row execute function private.validate_program_week();

create policy "Weeks of published programmes are public; admins see all"
  on public.program_weeks for select
  to anon, authenticated
  using (private.program_is_published(program_id) or private.is_admin());

create policy "Admins insert weeks"
  on public.program_weeks for insert to authenticated with check (private.is_admin());
create policy "Admins update weeks"
  on public.program_weeks for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "Admins delete weeks"
  on public.program_weeks for delete to authenticated using (private.is_admin());

revoke all on public.program_weeks from anon, authenticated;
grant select on public.program_weeks to anon, authenticated;
grant insert, update, delete on public.program_weeks to authenticated;
grant select, insert, update, delete on public.program_weeks to service_role;

-- program_week_nodes ------------------------------------------------------------

create table public.program_week_nodes (
  id              uuid primary key default gen_random_uuid(),
  program_week_id uuid not null references public.program_weeks (id) on delete cascade,
  roadmap_slug    text not null check (roadmap_slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  node_slug       text not null check (node_slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  position        smallint not null default 0,
  created_at      timestamptz not null default now(),
  unique (program_week_id, roadmap_slug, node_slug)
);

comment on table public.program_week_nodes is
  'Roadmap topics a week links to, by roadmaps.slug and roadmap_nodes.slug (survives re imports). A link whose roadmap or node is unpublished or missing is simply not shown.';

create index program_week_nodes_node_idx on public.program_week_nodes (roadmap_slug, node_slug);

alter table public.program_week_nodes enable row level security;

create function private.program_week_is_published(p_week_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.program_weeks w join public.programs p on p.id = w.program_id
    where w.id = p_week_id and p.is_published
  );
$$;

revoke execute on function private.program_week_is_published(uuid) from public;
grant execute on function private.program_week_is_published(uuid) to anon, authenticated, service_role;

create policy "Week links of published programmes are public; admins see all"
  on public.program_week_nodes for select
  to anon, authenticated
  using (private.program_week_is_published(program_week_id) or private.is_admin());

create policy "Admins insert week links"
  on public.program_week_nodes for insert to authenticated with check (private.is_admin());
create policy "Admins update week links"
  on public.program_week_nodes for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "Admins delete week links"
  on public.program_week_nodes for delete to authenticated using (private.is_admin());

revoke all on public.program_week_nodes from anon, authenticated;
grant select on public.program_week_nodes to anon, authenticated;
grant insert, update, delete on public.program_week_nodes to authenticated;
grant select, insert, update, delete on public.program_week_nodes to service_role;

-- rubrics -----------------------------------------------------------------------

-- Criteria shape: a non empty array of
--   {"id": "objectives", "label": "...", "description": "...", "max_points": 4}
-- with unique ids and max_points between 1 and 100.
create function private.rubric_criteria_valid(p_criteria jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select jsonb_typeof(p_criteria) = 'array'
     and jsonb_array_length(p_criteria) between 1 and 20
     and not exists (
       select 1 from jsonb_array_elements(p_criteria) e
       where jsonb_typeof(e) <> 'object'
          or coalesce(e ->> 'id', '') !~ '^[a-z0-9_]{1,40}$'
          or coalesce(e ->> 'label', '') = ''
          or case when jsonb_typeof(e -> 'max_points') = 'number'
                  then (e ->> 'max_points')::numeric not between 1 and 100
                    or (e ->> 'max_points')::numeric <> trunc((e ->> 'max_points')::numeric)
                  else true end
     )
     and (select count(distinct e ->> 'id') from jsonb_array_elements(p_criteria) e)
         = jsonb_array_length(p_criteria);
$$;

revoke execute on function private.rubric_criteria_valid(jsonb) from public;
grant execute on function private.rubric_criteria_valid(jsonb) to authenticated, service_role;

create table public.rubrics (
  id              uuid primary key default gen_random_uuid(),
  program_id      uuid not null references public.programs (id) on delete cascade,
  program_week_id uuid,
  title           text not null check (char_length(title) between 1 and 120),
  criteria        jsonb not null check (private.rubric_criteria_valid(criteria)),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  foreign key (program_id, program_week_id)
    references public.program_weeks (program_id, id) on delete cascade,
  -- One programme default (week null) and at most one rubric per week.
  constraint rubrics_once unique nulls not distinct (program_id, program_week_id)
);

comment on table public.rubrics is
  'Scoring criteria. Lookup for a week: the rubric with that program_week_id, else the programme default (program_week_id null).';
comment on column public.rubrics.criteria is
  'Array of {"id","label","description","max_points"}. Peer review rubric_scores are {"<id>": points}.';

create index rubrics_week_idx on public.rubrics (program_week_id);

alter table public.rubrics enable row level security;

create trigger rubrics_set_updated_at
  before update on public.rubrics
  for each row execute function private.set_updated_at();

create policy "Rubrics of published programmes are public; admins see all"
  on public.rubrics for select
  to anon, authenticated
  using (private.program_is_published(program_id) or private.is_admin());

create policy "Admins insert rubrics"
  on public.rubrics for insert to authenticated with check (private.is_admin());
create policy "Admins update rubrics"
  on public.rubrics for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "Admins delete rubrics"
  on public.rubrics for delete to authenticated using (private.is_admin());

revoke all on public.rubrics from anon, authenticated;
grant select on public.rubrics to anon, authenticated;
grant insert, update, delete on public.rubrics to authenticated;
grant select, insert, update, delete on public.rubrics to service_role;

-- The rubric that applies to a week: its own, else the programme default.
create function private.rubric_for_week(p_week_id uuid)
returns public.rubrics
language sql
stable
security definer
set search_path = ''
as $$
  select r.*
  from public.program_weeks w
  join public.rubrics r on r.program_id = w.program_id
   and (r.program_week_id = w.id or r.program_week_id is null)
  where w.id = p_week_id
  order by r.program_week_id nulls last
  limit 1;
$$;

revoke execute on function private.rubric_for_week(uuid) from public;
grant execute on function private.rubric_for_week(uuid) to service_role;
