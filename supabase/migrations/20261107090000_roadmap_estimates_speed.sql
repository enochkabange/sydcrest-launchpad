-- Fast roadmap time estimates (issue #281).
--
-- node_estimate_inputs word counted every lesson with regexp_split_to_array
-- at read time, and its security_invoker RLS ran private.node_is_published()
-- once per row on three tables. Reading the whole view as anon took about
-- 1.5 s on an idle database against anon's 3 s statement_timeout, so the
-- roadmap pages failed under load.
--
-- Now:
--   * node_content stores its word counts and node_quiz its question count
--     as generated columns, worked out once when a lesson is written. The
--     rule is unchanged: whitespace separated words of the lesson and its
--     worked example, and of the practice task.
--   * The view reads private.published_node_estimates(), a security definer
--     function that joins published roadmaps once instead of checking each
--     row. It returns published roadmaps only, for every role, which is all
--     the public pages (src/lib/roadmaps/public.ts) ask for. The numbers are
--     counts, never lesson text or quiz answers.
--
-- Column names and types of the view are unchanged, so the app needs no change.

alter table public.node_content
  add column lesson_words integer not null generated always as (
    coalesce(cardinality(regexp_split_to_array(nullif(btrim(explanation_md), ''), '\s+')), 0)
    + coalesce(cardinality(regexp_split_to_array(nullif(btrim(worked_example_md), ''), '\s+')), 0)
  ) stored,
  add column practice_words integer not null generated always as (
    coalesce(cardinality(regexp_split_to_array(nullif(btrim(practice_task_md), ''), '\s+')), 0)
  ) stored;

comment on column public.node_content.lesson_words is
  'Words in explanation_md plus worked_example_md, for the time estimates (issue #281).';
comment on column public.node_content.practice_words is
  'Words in practice_task_md, for the time estimates (issue #281).';

alter table public.node_quiz
  add column question_count integer not null generated always as (jsonb_array_length(questions)) stored;

comment on column public.node_quiz.question_count is
  'Number of questions, for the time estimates (issue #281).';

create function private.published_node_estimates()
returns table (
  node_id uuid,
  roadmap_id uuid,
  has_lesson boolean,
  lesson_words integer,
  practice_words integer,
  quiz_questions integer
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    n.id,
    n.roadmap_id,
    c.node_id is not null,
    coalesce(c.lesson_words, 0),
    coalesce(c.practice_words, 0),
    coalesce(q.question_count, 0)
  from public.roadmaps r
  join public.roadmap_nodes n on n.roadmap_id = r.id
  left join public.node_content c on c.node_id = n.id
  left join public.node_quiz q on q.node_id = n.id
  where r.is_published;
$$;

revoke execute on function private.published_node_estimates() from public;
grant execute on function private.published_node_estimates() to anon, authenticated, service_role;

create or replace view public.node_estimate_inputs
  with (security_invoker = true)
as
select node_id, roadmap_id, has_lesson, lesson_words, practice_words, quiz_questions
from private.published_node_estimates();

comment on view public.node_estimate_inputs is
  'Per node word counts and quiz size for the time estimates (issues #244, #281). Published roadmaps only, for every role.';
