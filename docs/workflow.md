# How we work

Fast and structured: weekly sprints, a plan before any build, one deploy path.
Sprint roadmap: `Planning/11_SPRINT_PLAN.md`. Pipeline: `docs/ci-cd.md`.

## Words
- **Sprint:** one week, Monday to Sunday, one goal, a GitHub milestone ("Sprint 1").
- **Issue:** one piece of work with acceptance criteria. Lives in a sprint
  milestone, or in the **backlog** (no milestone).
- **PR:** a GitHub pull request, always by its number (#28). Says `Closes #n`.
- **Step:** a Phase 1 build step from `Planning/10` §5 (for example "Roadmap
  data model"). A step usually spans one or two sprints.

## The week
1. **Monday planning (30 min).** Choose the sprint's issues from the plan and the
   backlog. Each issue gets: problem, acceptance criteria, out of scope, owner.
   Founder-only tasks carry `owner:founder`.
2. **Build.** Branch per issue cluster, PR per branch, CI green (Checks,
   Migrations, E2E), preview checked, merge. The pipeline deploys.
3. **Sunday review (30 min).** Demo on production. Close the milestone. Move
   anything unfinished to the next sprint or the backlog. Write one line on what
   to improve.

## New ideas mid sprint
Open an **Idea** issue (it lands in the backlog). It is considered at the next
Monday planning. To pull it into the current sprint, take out something of
similar size. Small fixes that clearly belong to an open PR's scope can go in;
say so on the PR.

## Labels
`feature`, `bug`, `chore`, `planning`, `from-the-field` (learner, event or
community feedback), `pilot-blocker` (must ship before January), `owner:founder`.

## Definition of done
Merged, deployed by the pipeline, checked on production, issue closed.

## Parallel work with agents
Independent issues in the same sprint can be built at the same time by separate
Claude agents, each in its own git worktree, branch and PR, all through the same
CI gates. Use it when issues touch different files and different tables; keep
work that shares a migration or a screen sequential. The founder's review time
is the real limit, so parallel PRs should still be small enough to check on a
preview in a few minutes.
