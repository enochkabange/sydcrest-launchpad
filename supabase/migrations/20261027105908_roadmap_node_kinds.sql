-- Roadmap node semantics for the roadmap views (issue #129). Additive only:
-- two nullable columns with checks, no backfill, so every existing row and
-- the previous frontend keep working unchanged.
--
-- kind: what a node means on the roadmap. Null means "derive from the tree":
-- a top level node is a section and anything below it is a topic. The app
-- derives it (src/lib/roadmaps/view-model.ts) rather than a default or a
-- trigger, so moving a node in the tree never leaves a stale kind behind.
--
-- choice_group: nodes under the same parent that share a value are "pick one
-- of these" alternatives. A short slug style key, not learner facing copy.
--
-- RLS is unchanged: the existing roadmap_nodes policies and grants cover
-- every column, so anon reads these on published roadmaps and only admins
-- write them.

alter table public.roadmap_nodes
  add column kind text
    constraint roadmap_nodes_kind_check check (kind in ('section', 'topic', 'checkpoint')),
  add column choice_group text
    constraint roadmap_nodes_choice_group_check check (choice_group ~ '^[a-z0-9][a-z0-9-]{0,38}[a-z0-9]$');

comment on column public.roadmap_nodes.kind is
  'section, topic or checkpoint. Null: derived from depth (top level is a section, deeper is a topic).';
comment on column public.roadmap_nodes.choice_group is
  'Siblings sharing this key are alternatives: the learner picks one. Null: not part of a choice.';
