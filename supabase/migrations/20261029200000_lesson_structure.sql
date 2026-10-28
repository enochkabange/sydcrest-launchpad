-- Lesson structure (issue #255). Additive only: nullable columns with checks,
-- no backfill, so every existing row and the current pages keep working. The
-- import (/admin/roadmaps and the Staging content workflow) fills them from
-- src/content/roadmaps.
--
-- roadmap_nodes, every node:
--   difficulty  beginner, intermediate or advanced
--   complexity  1 (one simple idea) to 5 (many moving parts)
-- roadmap_nodes, sections:
--   career_level  foundation, junior, mid or specialist
--   jobs          job titles seen in Ghana adverts for this level (no salaries)
--
-- node_content, the optional lesson anatomy (rendered when present):
--   outcomes, worked_example_md, key_terms, common_mistakes, self_check
--
-- RLS is unchanged: the existing policies and grants on both tables cover
-- every column, so anon reads these on published roadmaps and only admins
-- write them.

alter table public.roadmap_nodes
  add column difficulty text
    constraint roadmap_nodes_difficulty_check check (difficulty in ('beginner', 'intermediate', 'advanced')),
  add column complexity smallint
    constraint roadmap_nodes_complexity_check check (complexity between 1 and 5),
  add column career_level text
    constraint roadmap_nodes_career_level_check check (career_level in ('foundation', 'junior', 'mid', 'specialist')),
  add column jobs text[]
    constraint roadmap_nodes_jobs_check check (
      cardinality(jobs) <= 12 and array_position(jobs, null) is null
    );

comment on column public.roadmap_nodes.difficulty is
  'beginner, intermediate or advanced. Null: not rated yet.';
comment on column public.roadmap_nodes.complexity is
  '1 to 5: how much a learner holds in mind at once. Null: not rated yet.';
comment on column public.roadmap_nodes.career_level is
  'Sections: foundation, junior, mid or specialist. Null: not set.';
comment on column public.roadmap_nodes.jobs is
  'Sections: job titles from the track research adverts that fit this level. No salaries.';

alter table public.node_content
  add column outcomes text[]
    constraint node_content_outcomes_check check (
      cardinality(outcomes) between 1 and 8 and array_position(outcomes, null) is null
    ),
  add column worked_example_md text,
  add column key_terms jsonb
    constraint node_content_key_terms_check check (jsonb_typeof(key_terms) = 'array'),
  add column common_mistakes text[]
    constraint node_content_common_mistakes_check check (array_position(common_mistakes, null) is null),
  add column self_check text[]
    constraint node_content_self_check_check check (array_position(self_check, null) is null);

comment on column public.node_content.outcomes is 'You will be able to: short statements shown at the top of the lesson.';
comment on column public.node_content.worked_example_md is 'Optional worked example, markdown.';
comment on column public.node_content.key_terms is 'Optional [{term, definition}] shown as a glossary.';
comment on column public.node_content.common_mistakes is 'Optional list of common mistakes.';
comment on column public.node_content.self_check is 'Optional self check questions (not graded).';
