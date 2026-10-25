# How we work

Fast and structured: goal based sprints, a plan before any build, one deploy path.
Sprint roadmap: `Planning/11_SPRINT_PLAN.md`. Pipeline: `docs/ci-cd.md`.

## Words
- **Sprint:** one goal and a fixed list of issues, a GitHub milestone ("Sprint 1").
  It lasts as long as it takes to ship the goal; the milestone due date is the
  estimate, not a deadline.
- **Issue:** one piece of work with acceptance criteria. Lives in a sprint
  milestone, or in the **backlog** (no milestone).
- **PR:** a GitHub pull request, always by its number (#28). Says `Closes #n`.
- **Step:** a Phase 1 build step from `Planning/10` §5 (for example "Roadmap
  data model"). A step usually spans one or two sprints.

## The cycle
1. **Sunday: plan.** Choose the sprint's goal and issues from the plan and the
   backlog. Each issue gets: problem, acceptance criteria, out of scope, owner.
   Founder-only tasks carry `owner:founder`. Set the milestone due date as the
   estimate.
2. **Build until the goal ships.** Branch per issue cluster, PR per branch, CI
   green (Checks, Migrations, E2E), preview checked, merge. The pipeline deploys.
   If the goal ships midweek, pull the next ready issue from the plan rather than
   sit idle; it counts toward the next sprint.
3. **Saturday: review**, the day before the next planning. Demo on production.
   If the goal shipped, close the milestone. If it is running past its estimate,
   decide: cut scope or carry on, never quietly grow it. Write one line on what
   to improve.

## New ideas mid sprint
Open an **Idea** issue (it lands in the backlog). It is considered at the next
Sunday planning. To pull it into the current sprint, take out something of
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
