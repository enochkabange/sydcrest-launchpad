-- Modern roadmap experience (issue #244). Additive only, and idempotent:
-- staging already ran these statements under an earlier version number.
--
-- roadmaps.leads_to: the tracks a learner can move on to after this roadmap
-- ("Leads to"). "Builds on" is the inverse, derived in the app
-- (src/lib/roadmaps/links.ts), so the two directions can never disagree.
-- Values are track keys (roadmaps.track), not ids: a track's roadmap can be
-- unpublished or re imported without breaking links; unknown or unpublished
-- tracks are simply not shown.
--
-- roadmaps.level: who the roadmap is for, for the roadmap index filter.
-- first-steps (new to digital tools), beginner (no tech experience needed),
-- next-step (best after another track). Null: not set, shown under every level.
--
-- node_estimate_inputs: the raw numbers behind the time estimates (word
-- counts of the lesson and practice task, quiz question count) so the public
-- pages read a few integers per topic instead of every lesson's markdown. The
-- formula lives in src/lib/roadmaps/estimates.ts. security_invoker, so the
-- node_content, node_quiz and roadmap_nodes policies apply as they are: anon
-- sees published roadmaps only.
--
-- RLS on roadmaps is unchanged: its policies and grants cover the new columns.

alter table public.roadmaps
  add column if not exists leads_to text[] not null default '{}'
    constraint roadmaps_leads_to_check check (
      cardinality(leads_to) <= 20
      and array_position(leads_to, null) is null
      and array_to_string(leads_to, ',') ~ '^([a-z0-9][a-z0-9-]{0,38}[a-z0-9](,|$))*$'
    ),
  add column if not exists level text
    constraint roadmaps_level_check check (level in ('first-steps', 'beginner', 'next-step'));

comment on column public.roadmaps.leads_to is
  'Track keys (roadmaps.track) a learner can move on to next. Builds on is derived as the inverse.';
comment on column public.roadmaps.level is
  'first-steps, beginner or next-step, for the roadmap index filter. Null: not set.';

create or replace view public.node_estimate_inputs
  with (security_invoker = true)
as
select
  n.id as node_id,
  n.roadmap_id,
  (c.node_id is not null) as has_lesson,
  coalesce(cardinality(regexp_split_to_array(nullif(btrim(c.explanation_md), ''), '\s+')), 0) as lesson_words,
  coalesce(cardinality(regexp_split_to_array(nullif(btrim(c.practice_task_md), ''), '\s+')), 0) as practice_words,
  coalesce(jsonb_array_length(q.questions), 0) as quiz_questions
from public.roadmap_nodes n
left join public.node_content c on c.node_id = n.id
left join public.node_quiz q on q.node_id = n.id;

comment on view public.node_estimate_inputs is
  'Per node word counts and quiz size for the time estimates (issue #244). security_invoker: base table RLS applies.';

revoke all on public.node_estimate_inputs from public, anon, authenticated;
grant select on public.node_estimate_inputs to anon, authenticated, service_role;
