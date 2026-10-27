# Data model (Phase 1)

Every table lives in `public`, has row level security enabled in the migration
that creates it, and starts from `revoke all from anon, authenticated` with
precise grants added back. Security definer helpers live in `private` (not
exposed over the API) with `search_path = ''`. Admin means
`profiles.role = 'admin'`, checked by `private.is_admin()`.

Tables are not auto exposed on this project, so `service_role` (server code
with the secret key) is granted explicitly on every table.

Tests: `supabase/tests/database/*.test.sql` (pgTAP), grouped by domain, plus
`schema_security.test.sql` which fails if any public table lacks RLS, any view
is not `security_invoker`, or any private function is executable by everyone.

## Tables

**profiles** (extended). One row per auth user, created by the sign up trigger.
Owner reads and edits name, region, avatar, phone, slug, is_public, headline, skills, goals; role and datacamp_license_slot are staff only.

**public_profiles** (view). Public columns of profiles where `is_public`: id, slug, name, headline, region, avatar, skills, goals.
Readable by anyone; the only public path to profile data. Never carries phone, role or email.

**public_profile_stats** (view). For opted in profiles only: id, slug, name, avatar, region, quiz verified nodes completed, current streak (verified only), follower and following counts, and whether a DataCamp licence is assigned (yes or no, never the slot).
Readable by anyone; feeds public profile pages and the leaderboards. A security_invoker view over `private.public_profile_stats_rows()`.

**roadmaps**. A learning roadmap with an SEO slug, track, locale, display order and publish flag.
Anyone reads published ones; admins read drafts and do all writes.

**roadmap_nodes**. A topic in a roadmap; `parent_id` makes a tree (parent must be in the same roadmap), `position` orders siblings, slug unique per roadmap.
Same visibility as the roadmap; admins write.

**node_content**. Pre generated, reviewed explanation and practice task for a node (one current version, `content_version` bumps on regeneration).
Readable when the node's roadmap is published; admins write.

**node_resources**. External links (article, video, practice) for a node; `is_active` is the link health flag.
Anyone reads active links of published nodes; admins see and write all.

**node_quiz**. Quiz questions for a node, `[{"id","prompt","options"}]`, and `pass_threshold` as a percentage.
Readable when published; contains no answers.

**node_quiz_answers**. The answer key per quiz, `{"q1": 2}` (question id to correct option).
Admins only. Learners get zero rows; anon gets permission denied.

**roadmap_progress**. One row per learner per node: status, best quiz score, completed_at, and verified_at (first quiz pass; null for topics marked done by hand).
Owner reads. Nobody writes it directly; see the anti cheat notes and verified completions.

**personalized_paths**. Path quiz answers plus the recommended roadmap, skill gap and plan.
Owner reads and can delete; the server (service role) writes, since the plan is generated.

**achievements**. Milestones for the share loop: `roadmap_node_completed`, `roadmap_completed`, `streak`, `track_chosen`, `path_personalized`, with a `ref_id`.
Visible to the owner, and to everyone when the owner's profile is public. Minted only by `private.mint_achievement`.

**follows**. `(follower_id, following_id)` pairs; no self follow.
Signed in users read the graph and insert or delete only rows where they are the follower.

**consents**. Append only log of terms, privacy and WhatsApp consent by version, with `granted_at` from the server clock.
Owner inserts and reads their own; revoking goes through `revoke_consent(kind)`, which stamps `revoked_at`.

**events**. First party analytics: name from a fixed list, optional profile_id, anonymous_id, small props object.
Anyone may insert (profile_id must be null or their own); only admins read.
The app writes the funnel taxonomy (page_view, signup, quiz_run, path_viewed, node_started, node_completed, invite_sent)
through `track()` in `src/lib/analytics`; older Phase 1 names stay valid until a contract migration.

**ai_usage**. Study Buddy messages and tokens per learner per day, keyed on the Africa/Accra date (UTC).
Owner reads; only `record_ai_usage` writes, and it can only increase the counters.

**reports**. Safety reports: target type and id, reason, triage status.
Signed in users file as themselves; admins read and change status only.

**waitlist**. Marketing site sign ups: email (format checked, unique ignoring case), name, region, interest.
Anyone inserts; only admins read. A repeat email returns `23505`; treat it as success.

## Functions callable from the app

| Function | Who | What |
| --- | --- | --- |
| `set_node_status(node_id, status)` | signed in | Start, reset or (for nodes without a quiz) mark a node done for personal tracking. Never verifies or mints. |
| `submit_node_quiz(node_id, answers)` | signed in | Grade against the hidden key; returns `score`, `passed`, per question `results`. A pass verifies the node and mints. |
| `record_ai_usage(input_tokens, output_tokens)` | signed in | Add one Study Buddy message to today's row. |
| `revoke_consent(kind)` | signed in | Revoke the caller's live consent of that kind. |
| `funnel_by_week(weeks)` | admins | Visitors, sign ups and activations (first node completed) per week, newest first. |
| `mint_achievement(profile_id, type, ref_id, metadata)` | service role only | Server side minting for `track_chosen`, `path_personalized`, `streak`. |
| `admin_reports(status)` | admins | The report queue with reporter and reported profile names (no phone or email). Others get `42501`. |
| `admin_unpublish_profile(profile_id)` | admins | Sets a reported profile's `is_public` to false. Others get `42501`. |

None of these is executable by `anon`; `schema_security.test.sql` fails if any
security definer function in `public` is.

## Anti cheat design

Leaderboards and the share loop count completed nodes and achievements, so
learners must not be able to write those numbers.

- `roadmap_progress`, `achievements` and `ai_usage` have **no insert or update
  grant** for `authenticated`. Learners write only through security definer
  functions that use `auth.uid()` for identity, never a parameter.
- A node **with a quiz** reaches `done` only by passing `submit_node_quiz`.
  `set_node_status(..., 'done')` refuses it. Nodes without a quiz can be
  marked done by the learner, but that is personal tracking only (see
  verified completions below).
- `quiz_score` keeps the **best** attempt and a pass is sticky, so retrying
  cannot lower a score or un-complete a node, and a learner cannot set a score.
- Quiz **answer keys are in their own table** with no learner access. A hidden
  column was rejected: column grants are per role and admins are also
  `authenticated`, so admins could not edit keys, and `select *` on the quiz
  would fail for everyone. The grader returns which questions were right, not
  the key. Unlimited retries mean a determined learner can find the right
  options by elimination; quizzes are a learning check, not an exam, and
  leaderboards should weigh nodes done, not quiz scores.
- Achievements are minted by `private.mint_achievement`, idempotent through a
  `unique nulls not distinct (profile_id, type, ref_id)` constraint and
  `on conflict do nothing`. Verifying a node (first quiz pass) mints
  `roadmap_node_completed`; verifying every non optional node mints
  `roadmap_completed`. Other types are minted by server code through the
  service role wrapper.
- `record_ai_usage` only adds (negative counts are rejected), so calling it
  directly can only spend a learner's own allowance, never reset it. The cap
  itself is enforced by the Study Buddy route reading today's row.
- `type` on achievements is a text check, not a Postgres enum, so adding a
  type later is a constraint swap in one migration.

## Verified completions (issue #128)

Founder decision, 27 Oct: marking a topic done is personal tracking, not
certification.

- `roadmap_progress.status = 'done'` is the learner's own view: map colours,
  dashboard counts and "Roadmap complete" on their dashboard all read it, so
  a topic marked done by hand shows as done to them.
- `roadmap_progress.verified_at` is set only by `submit_node_quiz` on a pass
  (learners have no insert or update grant on the table). A check keeps it
  null unless the node is done, and resetting a node clears it.
- Everything that ranks, rewards or certifies reads `verified_at`, never
  `status`: the topics and region boards and the streak
  (`private.public_profile_stats_rows`), `roadmap_node_completed`,
  `roadmap_completed` (every required node verified), and so the shareable
  achievement cards. A roadmap with a required topic that has no quiz (every
  outline track today) cannot mint `roadmap_completed` until that topic gets
  a quiz.
- A topic marked done by hand that later gets a quiz is verified, and mints,
  when the learner passes it; its streak day is the day of the pass.
- Existing rows were backfilled: done rows whose best score meets the node's
  pass mark got `verified_at = completed_at`.
- Not changed: `funnel_by_week` activations still count any first completion,
  since activation measures engagement, not certification.

## Security advisor (issue #82)

Reviewed against the production advisor run on 27 Oct.

- **Security definer RPCs** (lint 0029, signed in users can execute):
  `admin_reports`, `admin_unpublish_profile`, `funnel_by_week`,
  `record_ai_usage`, `record_ai_tokens`, `revoke_consent`, `set_node_status`,
  `submit_node_quiz`. Accepted: each pins `search_path = ''` and checks the
  caller inside (`private.is_admin()` for the admin three, `auth.uid()` for
  the rest, which use it as the identity rather than a parameter). None is
  executable by `anon` (lint 0028), asserted in `schema_security.test.sql`.
- **`public.rls_auto_enable()`** is an event trigger helper created from the
  dashboard on the hosted projects; it is in no migration. Migration
  `harden_function_grants` revokes EXECUTE on it from `public`, `anon` and
  `authenticated` where it exists, and leaves it in place (the event trigger
  still fires; trigger firing does not check EXECUTE).
- **GraphQL** (lints 0026 and 0027, tables visible in the GraphQL schema):
  the app does not use `pg_graphql`. All data access is supabase-js over
  PostgREST (`/rest/v1`), and nothing in `src` calls `/graphql/v1`. RLS and
  column grants govern rows either way, so the warnings expose table and
  column names, not data. The extension is left installed by migrations;
  disabling it is a dashboard action (Database, Extensions, `pg_graphql`).
- **Leaked password protection** is an Auth setting in the dashboard
  (Authentication, Attack Protection or password security), not a migration.

## Privacy design

- **Phone and email are never public.** Email lives only in `auth.users`.
  Phone is on `profiles`, which signed in users can read only for their own
  row. Column grants cannot differ per row, so an "is_public" policy on
  `profiles` would have exposed every public profile's phone to signed in
  users. Instead the public path is the `public_profiles` view: a
  `security_invoker` view over `private.public_profile_rows()`, a definer
  function that selects only public columns of opted in profiles. Adding a
  column to the public page means changing that function, deliberately.
- A profile cannot be public without a slug, and turning `is_public` off
  removes it from the view and hides its achievements immediately.
- Consents are append only with server timestamps, so the log can be trusted
  when deciding whether to message someone on WhatsApp.
- `events` and `waitlist` are insert only for the public. With no select grant,
  inserts over the API must not ask for the row back: in supabase-js do not
  chain `.select()` after `.insert()` (the default `return=minimal` is fine).
- `datacamp_license_slot` is assigned by staff through the service role; users
  cannot set it.

## Leaderboards

- Three boards read `public_profile_stats`: nodes completed, current streak,
  and nodes completed within one `profiles.region`.
- **Only public profiles appear.** A learner with a private profile is absent
  from every board and every count, however much progress they have; turning
  `is_public` off (or an admin unpublishing) removes them immediately.
- Boards and streaks count **quiz verified** completions only
  (`roadmap_progress.verified_at`); topics marked done by hand are not counted.
- Streak: consecutive Africa/Accra calendar days with at least one node
  verified (`roadmap_progress.verified_at`), counted while alive (last day is
  today or yesterday in Accra). `verified_at` is set once by the database, so
  days cannot be backfilled.
- Follower counts are public numbers; who follows whom stays signed in only.

## Not yet

`public_profile_rows()` and `public_profile_stats_rows()` scan all public
profiles before the view's filter applies; fine at Phase 1 scale, revisit
(materialized view refreshed on a schedule) past a few thousand public
profiles.
