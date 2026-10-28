# Data model (Phases 1 and 2)

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
Owner reads and edits name, region, avatar, phone, slug, is_public, headline, skills, goals, display_prefs and milestone_posts (off by default: automatic community posts for finished sections, roadmaps and certificates); role and datacamp_license_slot are staff only.

**public_profiles** (view). Public columns of profiles where `is_public`: id, slug, name, headline, region, avatar, skills, goals.
Readable by anyone; the only public path to profile data. Never carries phone, role or email.

**public_profile_stats** (view). For opted in profiles only: id, slug, name, avatar, region, quiz verified nodes completed, current streak (verified only), follower and following counts, and whether a DataCamp licence is assigned (yes or no, never the slot).
Readable by anyone; feeds public profile pages and the leaderboards. A security_invoker view over `private.public_profile_stats_rows()`.

**roadmaps**. A learning roadmap with an SEO slug, track, locale, display order and publish flag.
Anyone reads published ones; admins read drafts and do all writes.

**roadmap_nodes**. A topic in a roadmap; `parent_id` makes a tree (parent must be in the same roadmap), `position` orders siblings, slug unique per roadmap. Lesson structure (#255, `20261029200000_lesson_structure.sql`): every node has nullable `difficulty` (beginner, intermediate, advanced) and `complexity` (1 to 5); sections have `career_level` (foundation, junior, mid, specialist) and `jobs` (text[], job titles from the track research, no salaries).
Same visibility as the roadmap; admins write.

**node_content**. Pre generated, reviewed explanation and practice task for a node (one current version, `content_version` bumps on regeneration). Optional lesson anatomy (#255): `outcomes` (text[], You will be able to), `worked_example_md`, `key_terms` (jsonb `[{term, definition}]`), `common_mistakes` and `self_check` (text[]); null when a lesson leaves a part out.
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

**achievements**. Milestones for the share loop: `roadmap_node_completed`, `section_completed`, `roadmap_completed`, `streak`, `track_chosen`, `path_personalized`, with a `ref_id`.
Visible to the owner, and to everyone when the owner's profile is public. Minted only by `private.mint_achievement`. `section_completed` (ref: the section node) is minted by a trigger when every required node in a top level section is verified (issue #233). Share cards for these live at `/og/achievements/<id>/story|square`, behind the same public profile gate as `/a/<id>`.

**private.milestone_post_log**. `(profile_id, kind, ref_id)` for each milestone already posted to the community (kind `section`, `roadmap` or `certificate`, keyed by programme), so each is posted at most once even after the post is deleted.
No policies or grants: only the definer triggers on achievements and certificates write it. A milestone post is skipped when the feed's rate limit refuses it or a moderator hid the learner's content in the last 30 days.

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

## Phase 2 tables (issue #142)

Cohort roles live on `cohort_members.role` (learner, mentor, coordinator);
"staff" below means a mentor or coordinator of a cohort the learner is (or
was, before a deferral) in. Admin is still `profiles.role = 'admin'`.

**programs**. A mentored programme (DMP first): slug, title, duration, `min_age` (18 or more), eligibility, default cohort size (20), `grace_days` (7), `pass_score`, `min_peer_reviews` (at least 1, no waiver), `specializations` `[{slug,label}]`, `screening_questions`, publish flag.
Anyone reads published ones; admins read drafts and do all writes.

**cohorts**. One run of a programme: name, `starts_on`, `max_size` (20 default, 25 for the pilot), status planned, enrolling, running, completed or cancelled.
Anyone reads cohorts of published programmes; admins write.

**cohort_members**. `(cohort, profile)` with role, learner `specialization`, status active, deferred (with `deferred_to`) or completed.
Members read their cohort's rows; admins read all and add, change or remove staff directly. Learners join only through `decide_application` or `defer_learner` (size cap); status, deferral and specialization are never written directly.

**cohort_roster** (view). Members of the caller's cohorts with display name, avatar, public slug (if public), role, specialization and status; admins see every cohort.
Signed in only. Never carries phone or email. A security_invoker view over `private.cohort_roster_rows()`.

**cohort_applications**. An application to a programme: preferred cohort, preferred specialization, `screening_answers` (object keyed by question id), status submitted, waitlisted, accepted, declined or withdrawn, and the decision.
Applicants insert as themselves (published programmes, one live application each) and edit answers while open; admins read all. Status changes only through `decide_application` and `withdraw_application`.

**application_queue** (view). Applications with the applicant's display name, avatar, region and public slug (if public), for the admin review queue.
Admins only; everyone else gets zero rows. A security_invoker view over `private.application_queue_rows()`. Never carries phone or email.

**cohort_notes**. Private notes by staff about a cohort member.
Staff of that cohort and admins read; staff write as themselves, authors edit their own. The member never sees them.

**program_weeks**. A programme week: theme, objectives, free resource, assignment, `is_capstone`; `specialization` null means shared, otherwise it replaces the shared week for learners with that specialization (DMP weeks 7 to 9).
Anyone reads weeks of published programmes; admins write. Themes are verbatim from the curriculum: render them through `displayTheme` (no dashes in copy).

**program_week_nodes**. A week's links to roadmap topics by `roadmap_slug` and `node_slug` (not ids, so they survive re imports).
Same visibility as the week; admins write. Join to `roadmaps.slug` and `roadmap_nodes.slug`; skip links whose roadmap is unpublished or missing.

**rubrics**. Scoring criteria `[{id,label,description,max_points}]` for a week (`program_week_id`) or the programme default (`program_week_id` null).
Same visibility as the programme; admins write. A week's rubric is its own, else the default.

**submissions**. One learner's work per programme week: text, link or `file_path` in the `submissions` bucket, status draft, submitted, ai_reviewed, returned or graded, `attempt`, AI feedback and score, mentor feedback, `final_score`, `in_portfolio`.
Owner reads all of theirs; staff and admins read sent work (not drafts), in one SELECT policy. Learners update only `in_portfolio` (graded work); everything else goes through the functions below. Portfolio work of public profiles is public through `public_portfolio`.

**peer_reviews**. A reviewer assigned to a submission, and once submitted their `rubric_scores` `{criterion_id: points}` and comment.
Reviewer, staff and admins read; the author reads it once submitted. Written only by `assign_peer_review` and `submit_peer_review`.

**peer_review_submissions** (view). The caller's review assignments with the work to review (text, link, file path) and nothing else: no author, AI feedback or scores.
Signed in only. Peers never read `submissions` rows directly.

**certificates**. A programme certificate: `verification_id` (32 hex characters, unguessable), recipient name, programme title and specialization snapshots, `badge_json` (Open Badges 3.0), issued by and at, revoked by, at and why.
Holder, their staff and admins read. Nobody signed in writes it directly; one live certificate per learner per programme.

**public_certificates** (view). Live certificates of opted in profiles: slug, verification id, programme, specialization, issued date.
Readable by anyone, for public profile pages. A security_invoker view over `private.public_certificate_rows()`.

**public_portfolio** (view, issue #192). Graded submissions the learner put in their portfolio (`in_portfolio`), for learners whose profile is public, in published programmes: profile id and slug, programme slug and title, week number, theme, `is_capstone`, the learner's link, the first 600 characters of the text (`body_excerpt`, with `body_is_excerpt` when cut), `has_file` and `graded_at`.
Readable by anyone, for `/u/[slug]`. A security_invoker view over `private.public_portfolio_rows()`. Never carries scores, mentor or AI feedback, or the file path: attached files stay in the private bucket and are not served publicly (the page says a file is attached but not shown).

**ai_review_usage** (issue #192). One row per AI rubric review model call (also refused, cut off or invalid answers): submission, attempt, model, outcome (`recorded`, `stale`, `failed`), input, output, cache write and cache read tokens, estimated USD.
Written only by server code with the service role (`src/lib/submissions/review.ts`); admins read; nobody signed in writes or edits it.

**Storage: `submissions` bucket** (private, 50 MB, documents, images and short video). Object names start with the owner's id: `<profile_id>/...`.
Owners upload, read and replace in their own folder; staff, admins and assigned peers read a file only when it is the `file_path` of a sent submission they may read. Files attached to sent work cannot be replaced or deleted. Serve with signed URLs.

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

| `decide_application(application_id, decision, cohort_id, note)` | admins | `accepted` (into a cohort of the programme, within `max_size`; creates the learner membership), `waitlisted` or `declined`. Full cohort: `53400`. |
| `withdraw_application(application_id)` | the applicant | Withdraws a submitted or waitlisted application. |
| `choose_specialization(cohort_member_id, specialization)` | the learner, cohort staff, admins | Sets a learner's specialization. Learners are locked once they submit specialization work. |
| `defer_learner(cohort_member_id, to_cohort_id)` | cohort staff, admins | Marks the learner deferred and, with a target (same programme, later start, within size), creates the new active membership. Progress is kept (submissions key on learner and week). Null target: deferred and waiting; call again to place. |
| `save_submission(week_id, body_text, link_url, file_path, submit)` | active learners | Upserts the caller's work for a week of their path. `submit` false keeps a draft; true sends it, clears the old AI review and counts an attempt. Graded work is final unless returned. |
| `record_ai_review(submission_id, attempt, feedback, score, model)` | service role only | Stores the AI rubric review; returns false (ignored) for another attempt or work already graded or returned. |
| `grade_submission(submission_id, final_score, mentor_feedback, return)` | cohort staff, admins | Sets the final score (0 to 100), or with `return` asks for changes. |
| `assign_peer_review(submission_id, reviewer_id)` | cohort staff, admins | Assigns another active learner in the programme; idempotent. |
| `submit_peer_review(review_id, rubric_scores, comment)` | the assigned reviewer | Scores every rubric criterion (whole points up to its maximum) with a comment. |
| `certification_status(program_id, profile_id)` | the learner (default), staff, admins | `{eligible, specialization, weeks_required, weeks_passed, missing_weeks, capstone_passed, peer_reviews_given, peer_reviews_required, pass_score}`. |
| `issue_certificate(cohort_member_id)` | the cohort's mentor, a coordinator, admins | Issues once `eligible`; marks the membership completed. |
| `set_certificate_badge(certificate_id, badge_json)` | service role only | Stores the Open Badges 3.0 JSON server code built. |
| `revoke_certificate(certificate_id, reason)` | admins | Revokes; verification then shows it as revoked. |
| `admin_find_profile_by_email(email)` | admins | Zero or one row: profile id and display name of the account with that sign in email (any case, trimmed). Reads `auth.users` in a definer (`private.admin_find_profile_by_email`); the public function is security invoker. Never returns the email. Others `42501`, empty email `22023`. |
| `verify_certificate(verification_id)` | anyone | Zero or one row: name, programme, specialization, cohort, issued and revoked dates, badge JSON. Security invoker over `private.verify_certificate_row`. |

None of these is executable by `anon` except `verify_certificate`, which is
security invoker; `schema_security.test.sql` fails if any security definer
function in `public` is.

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

## Learning rules (Phase 2)

- **Due dates.** Week n of a cohort is due on `starts_on + 7 * n` days; work
  is late after that plus `programs.grace_days` (7). Falling behind past grace
  is a staff decision through `defer_learner`, never automatic.
- **A learner's path** is, for each week number, their specialization's row
  when there is one, else the shared row. `save_submission` refuses another
  specialization's week; `choose_specialization` before week 7.
- **Deferral keeps progress.** Submissions are unique per learner and
  programme week; `cohort_id` only records where they were sent. The new
  cohort's staff see earlier work because staff access is "a learner of a
  cohort I staff in this programme". Deferred memberships stay for history
  and do not count toward a cohort's completion.
- **Scores are server only.** No signed in role has an insert or update grant
  on `submissions` beyond `in_portfolio`. AI feedback comes from server code
  with the secret key (`record_ai_review`, attempt checked so a slow review
  of old work is dropped); the final score only from `grade_submission`.
- **Certification** (`certification_status`): every week of the path graded
  at or above `pass_score` (capstone included) and at least
  `min_peer_reviews` submitted capstone peer reviews. Peer review cannot be
  waived (`min_peer_reviews >= 1`). The mentor issues; a coordinator of the
  cohort or an admin is the backup issuer; only admins revoke.
- **Open Badges.** `issue_certificate` creates the row; server code then builds
  the OpenBadgeCredential (it needs the site origin) and stores it with
  `set_certificate_badge`. `/verify/[id]` calls `verify_certificate`.
- **Verification ids are never listed.** Public reads go through a lookup by
  id or through `public_certificates` (opted in profiles only), so ids cannot
  be enumerated.
- **The DMP is seeded by migration** `phase2_dmp_seed` from a JSON literal
  derived from `src/content/dmp/curriculum.ts`; `src/content/dmp/seed.test.ts`
  fails if they drift or a week links a topic the roadmap outlines lack. To
  change the curriculum in a database, write a new `_dmp_` migration with a
  `$json$` literal of `{"weeks": [{week_number, specialization, ...fields}]}`
  (see `phase2_dmp_resources`); the test applies it over the seed.

## Security advisor (issue #82)

Reviewed against the production advisor run on 27 Oct.

- **Security definer RPCs** (lint 0029, signed in users can execute):
  `admin_reports`, `admin_unpublish_profile`, `funnel_by_week`,
  `record_ai_usage`, `record_ai_tokens`, `revoke_consent`, `set_node_status`,
  `submit_node_quiz`, and from Phase 2 `decide_application`,
  `withdraw_application`, `choose_specialization`, `defer_learner`,
  `save_submission`, `grade_submission`, `assign_peer_review`,
  `submit_peer_review`, `certification_status`, `issue_certificate`,
  `revoke_certificate`, and from #192 `community_post` (same caller checks as
  `community_thread`). `admin_find_profile_by_email` is security invoker over
  a definer in `private` that checks `private.is_admin()`. Accepted: each pins `search_path = ''` and checks the
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

## Community, chapters, events, skills and notifications (issue #158)

Schema B. Migrations `notifications`, `chapters_community`,
`community_events`, `skills_verified` (and `talent_verified_skills`, which
extends the talent directory). Tests: `notifications`, `community`,
`community_events`, `skills_verified` (`*.test.sql`).

Roles used below. **Chapter lead**: `chapter_members.role = 'lead'`,
appointed by admins. **Cohort staff**: a mentor or coordinator in
`cohort_members`. **Host** of an event: admins, or a lead of the event's
chapter. **Moderator** of a feed scope: admins everywhere, chapter leads in
their chapter, cohort staff in their cohort. **Reviewer**: `profiles.role`
mentor or admin. Errors as in Phase 2: `42501` not allowed, `22023` bad input
or wrong state, `P0002` not found, `23505` duplicate, `54000` rate limited
(`Slow down`).

**chapters**. slug, name, `region` (the profiles.region list), city, status
`draft|launching|active|paused|closed`, summary, `whatsapp_url` (chat.whatsapp.com,
wa.me or a WhatsApp channel).
Anyone reads non draft chapters, WhatsApp link included. Admins write; leads
change summary and link through `set_chapter_details`.

**chapter_members**. `(chapter_id, profile_id)`, role `member|lead`, joined_at.
Members of the chapter and admins read. Learners join (as member) launching
or active chapters and leave; leads remove members (not leads); admins add
anyone and change roles. Learners may be in several chapters; the UI defaults
the choice from `profiles.region`.

**chapter_roster** (view). chapter_id, profile_id, name, avatar, public slug
(public profiles only), role, joined_at. Leads of non draft chapters for
everyone; every member for members of that chapter and admins.

**cohort_channels**. `cohort_id` and its WhatsApp `whatsapp_url`, kept off the
public cohorts table. Cohort members read; cohort staff and admins write.

**community_posts**. author_id (defaults to caller), `scope`
`everyone|chapter|cohort` with exactly the matching `chapter_id` or
`cohort_id`, body (4000), link_url, pinned_at, hidden_at, hidden_by,
hidden_reason, edited_at.
Everyone posts: any signed in user. Chapter and cohort posts: members of that
chapter or cohort only (admins read all). Authors insert as themselves where
they belong and edit body and link; authors and moderators delete. Hidden
posts are visible only to their author and moderators. Ten posts an hour per
person.

**community_replies**. post_id, author_id, body (2000), hidden fields,
edited_at. Readable wherever the post is; insert only on a post the caller
can read and that is not hidden. Sixty replies an hour per person. A reply
notifies the post author.

**community_reactions**. One `kind` (`like|celebrate|helpful|support`) per
person per post or reply. Readable with the target; added only to open
targets; owner removes.

**reports** (extended). `target_type` also takes `community_post`,
`community_reply`, `chapter`, `community_event`, `event_recording`. Admins
still triage everything through `admin_reports`; leads and cohort staff use
`community_report_queue` and `set_community_report_status` for their scope.

**community_events**. Named so because `public.events` is the Phase 1
analytics table. slug, `kind` `skillshop|webinar|flagship|activation`, title,
summary, description, `format` `online|in_person|hybrid`, starts_at, ends_at,
venue_name, venue_address, city, region, optional chapter_id, `capacity`
(null is unlimited), status `draft|published|cancelled|completed`, created_by.
Anyone reads non draft events (public pages, Event structured data); hosts
read drafts and write. A lead cannot create or move an event outside their
chapter; only admins create events without a chapter. Publishing an in
person event needs a venue.

**event_access**. Per event `join_url` and the eight character `checkin_code`
(no 0, O, 1, I), created with the event. Hosts only. Attendees get the link
from `event_join_link`; nobody else ever reads the code.

**event_rsvps**. `(event_id, profile_id)`, status `going|waitlisted|cancelled`,
responded_at (waitlist order). Own rows and hosts read. Written only by
`rsvp_event`, `cancel_rsvp`, check in, and the waitlist filler (a freed seat
or a higher capacity moves the oldest waitlisted person up and notifies
them). Cancelling or moving a published event notifies everyone going or
waitlisted.

**event_attendance** (view). event_id, going_count, waitlist_count,
seats_left (null when unlimited). Anyone, for visible events. Real counts.

**event_checkins**. `(event_id, profile_id)`, method `code|host`,
checked_in_by, checked_in_at. Own rows and hosts read. Written only by
`check_in_event` (code verified server side) or `host_check_in`.

**event_attendees** (view). Hosts only: RSVPs of their events with name,
avatar, public slug, status and check in time.

**event_feedback**. `(event_id, profile_id)`, the events playbook impact
snapshot: confidence, usefulness, clarity, logistics (1 to 5), recommend (0 to
10), attend_again, comment, `quote_consent`. Only people who checked in, once
the event has started; owner edits; owner and hosts read. A comment is
quotable only with `quote_consent`.

**event_recordings**. event_id, title, summary, video_url (https),
duration_minutes, is_published. Published recordings of public events are
public; hosts write.

**skills**. slug, name, summary, is_published. Anyone reads published;
admins write.

**skill_roadmaps**. `(skill_id, roadmap_slug)`: roadmaps whose completion
verifies the skill, by `roadmaps.slug` like `program_week_nodes`. Public for
published skills; admins write.

**skill_assessments**. skill_id, `kind` `quiz|portfolio`, title, instructions,
`questions` (quiz, same shape as node_quiz, no answers), `pass_threshold`
(80), `retry_after_hours` (24), is_published. Public when it and its skill
are published; admins write.

**skill_assessment_answers**. Quiz answer keys `{"q1": 2}`. Admins only.

**skill_assessment_attempts**. assessment_id, skill_id, profile_id, kind,
status (`passed|failed` for quizzes, `pending_review|approved|rejected` for
portfolios), answers, score, portfolio_url (https), portfolio_note,
reviewer_id, review_note, reviewed_at, submitted_at. Owner reads; reviewers
read portfolio attempts; admins all. Written only by functions.

**portfolio_review_queue** (view). Portfolio attempts with skill name and
the person's name, avatar and public slug. Reviewers only.

**verified_skills**. profile_id, skill_id, `source`
`path_completion|assessment|portfolio_review`, `source_ref` (roadmap slug or
attempt id), issued_by (the reviewer; null when the database issued it),
issued_at, revoked_at, revoked_by, revocation_reason. One live row per
person per skill. Owner and admins read; anyone reads live rows of public
profiles. **No signed in role can insert, update or delete**: every row
comes from `private.issue_verified_skill`.

**notifications**. recipient_id, `kind`
(`community_reply|chapter_post|event_update|event_waitlist_promoted|verified_skill|skill_review|booking|review|cohort|opportunity|system`),
`payload` object (4 KB; ids and names the UI needs, an optional
`title`, `body` and `href` from server code; never phone or email), read_at.
Recipient reads, sets `read_at` and deletes. Inserted only by
`private.notify` (database triggers and functions) and `notify_user`
(service role). The UI writes the copy from `kind` and `payload`, so stored
rows carry no user facing text from the database.

### Functions (Schema B)

| Function | Who | What |
| --- | --- | --- |
| `set_chapter_details(chapter_id, summary, whatsapp_url)` | chapter leads, admins | Edits the lead owned part of the chapter page. |
| `community_feed(scope, scope_id, before, limit)` | signed in members of the scope, admins | A page of posts (pinned first on the first page) with author name, avatar, public slug, `author_is_lead`, `reply_count`, `reaction_counts` `{kind: n}`, `my_reactions`. Page with `before` = last `created_at`. Not a member: `42501`. |
| `community_post(post_id)` | whoever can read the post | One row in the `community_feed` shape (author fields, `author_is_lead`, `reply_count`, `reaction_counts`, `my_reactions`), for thread headers. Hidden posts only for their author and moderators. Otherwise `P0002`. |
| `community_thread(post_id)` | whoever can read the post | Replies oldest first with author fields, reaction counts and the caller's reactions. Otherwise `P0002`. |
| `moderate_community_content(target_type, target_id, hide, reason)` | moderators of the scope | Hides (reason required) or unhides a `community_post` or `community_reply`. |
| `pin_community_post(post_id, pinned)` | moderators of the scope | Pins or unpins an announcement. |
| `community_report_queue(status)` | moderators | Reports on posts and replies the caller moderates, with content, scope and names. Others get zero rows. |
| `set_community_report_status(report_id, status)` | moderators of that content, admins | Triage a community report. |
| `rsvp_event(event_id)` | signed in | `going` while seats last, else `waitlisted`. Idempotent. Published events that have not ended only. |
| `cancel_rsvp(event_id)` | signed in | Cancels; the first waitlisted person moves up and is notified. |
| `event_join_link(event_id)` | people going, hosts | The online join link (null if none). Others `42501`. |
| `check_in_event(event_id, code)` | signed in | From two hours before the start to two hours after the end; case, spaces and hyphens ignored; makes the RSVP `going` (walk ins count). Wrong or missing code: `22023 Wrong code`. |
| `host_check_in(event_id, profile_id)` | hosts | Checks in someone with an RSVP. |
| `rotate_event_checkin_code(event_id)` | hosts | New code, returned. |
| `event_feedback_summary(event_id)` | hosts | going, checked in, responses, averages and attend again rate (null when nobody answered). |
| `submit_skill_quiz(assessment_id, answers)` | signed in | `score`, `passed`, `verified_skill_id`. Does not reveal which answers were right. After a fail, `22023 Try again later` until `retry_after_hours` pass. |
| `submit_skill_portfolio(assessment_id, portfolio_url, note)` | signed in | Sends work for review; one pending at a time, retry wait after a rejection. |
| `review_skill_portfolio(attempt_id, approve, note)` | reviewers (never their own) | Approve issues the verified skill; reject needs a note. Notifies either way. |
| `claim_path_skills()` | signed in | Issues skills mapped after the caller completed a roadmap. Completion itself issues them automatically. |
| `revoke_verified_skill(id, reason)` | admins | Revokes with a reason; the badge leaves public profiles and the talent directory. |
| `mark_notifications_read(ids)` | signed in | Marks the given (or, with null, all) of the caller's notifications read; returns the count. |
| `notify_user(recipient_id, kind, payload)` | service role only | Server code notifies for bookings, reviews, cohorts and opportunities. |

### Verified skills: earned, never bought

Product Enrichment §7.5. A verified skill is issued only by
`private.issue_verified_skill` (not executable by any API role), from:

- **path_completion**: a trigger on `achievements` for `roadmap_completed`,
  which is minted only when every required topic of the roadmap is quiz
  verified. Every published skill mapped to that roadmap's slug is issued.
  `claim_path_skills` covers mappings added later.
- **assessment**: `submit_skill_quiz` grades against a key no learner can
  read. Unlimited instant retries would let someone find the answers by
  elimination, so a fail waits `retry_after_hours` and the result does not
  say which answers were right. Attempts are serialised per person.
- **portfolio_review**: a mentor or admin approves submitted work; nobody
  reviews their own.

Issuing is idempotent (one live badge per person per skill) and notifies the
holder. Admins revoke with a reason; a revoked skill can be earned again by
one of the three routes. Nothing about a verified skill involves payment.
`private.has_verified_skill(profile_id)` is the one line check the talent
directory and expert ranking use.

Talent and experts (migration `talent_verified_skills`, on top of #148):
`private.talent_eligible` is now "a live certificate **or** a live verified
skill", so verified learners can list in the talent directory and drop out
the moment the skill is revoked. `talent_eligibility()` adds a
`verified_skills` count. `talent_directory` and `public_experts` gain a last
column `verified_skills`, `[{slug, name, source, issued_at}]`, so expert
pages show badges and discovery can rank verified experts first.

### Events: check in and capacity

- RSVPs lock the event row, so two people cannot take the last seat.
- The check in code is never readable by attendees; the function compares it
  server side, inside a window around the event. Eight characters from 32
  give about 10^12 codes; hosts rotate it if it leaks.
- A walk in who checks in becomes `going` even past capacity: attendance is
  what happened, not what was booked.
- Feedback is only from people who checked in, so the impact snapshot counts
  real attendees.

## Not yet

`public_profile_rows()` and `public_profile_stats_rows()` scan all public
profiles before the view's filter applies; fine at Phase 1 scale, revisit
(materialized view refreshed on a schedule) past a few thousand public
profiles.

`community_feed` counts replies and reactions per post on read; fine for
chapter scale, revisit with counters past tens of thousands of posts.
Chapter post notifications fan out one row per member on insert.

## Market and Earn (issue #148)

Five migrations, `earn_organisations`, `earn_experts`, `earn_bookings_briefs`,
`earn_opportunities_outcomes` and `earn_talent`. Tests:
`supabase/tests/database/earn_*.test.sql`.

**No money.** SydCrest never custodies funds (PRODUCT_ENRICHMENT §5.3 and §8),
and nothing is charged in this window. No table has a balance, payout detail,
payment status or payment state machine. `offers.indicative_price_ghs`,
`pitches.indicative_price_ghs` and `briefs.indicative_budget_ghs` are whole
cedis for display only; offers show as free during the soft launch.

**One account, several modes.** No new role on `profiles`. A person is in
seller mode while they hold an approved `expert_profiles` row, and acts for a
business through an active `organisation_members` row. Learner and mentor
modes stay as they were (`profiles.role`, cohorts).

**Adults only.** `private.is_adult(profile_id)` reads the `date_of_birth`
(YYYY-MM-DD) that sign up (`options.data`) or `/welcome` (`updateUser`)
stores in the auth user's metadata; missing or unreadable means not an adult.
It is checked on insert (never in select policies) for: expert profiles and
applications, offers, booking requests (buyers too, §5.8), briefs, pitches,
accepting a pitch, organisations, accepting an organisation invite,
opportunities posted by organisations, talent listings and contact requests.
The metadata is user writable through `updateUser`, so this keeps the
database consistent with the sign up gate rather than proving age. There is
no `is_minor` column anywhere in the schema.

### Tables

**organisations**. Business accounts (also school, nonprofit, government): slug, name, kind, description, website, region, logo, `registration_number` (private), `verification_status` unverified, pending, verified, rejected or suspended, admin note, created_by.
Members, invitees, the creator and admins read it; owners and admins edit it. Status changes only through the functions below. Renaming a verified organisation (or changing its registration number) sends it back to pending.

**public_organisations** (view). Verified organisations, public columns only. Anyone reads it.

**organisation_members**. `(organisation, profile)` with role owner, admin or recruiter and status invited or active. The creator becomes the active owner.
Owners invite at any role, admins invite admins and recruiters; the invitee accepts with `accept_organisation_invite` and declines (or leaves) by deleting their row. The last active owner cannot leave or step down, except by deleting their account.

**organisation_roster** (view). Members with name and avatar, for active members of that organisation and admins.

**expert_profiles**. Seller mode, one per account: slug, headline, bio, skills, categories, links (http only), languages, region, availability note, `accepting_requests`, `offers_free_intro`, status pending, approved or delisted, `is_verified`, `is_featured`.
Anyone reads approved ones; owners and admins read all. The owner edits the content columns; status, verified and featured change only through admin functions. `is_verified` is the admin identity check badge (§5.5), not the verified SydCrest skill badge, which is `verified_skills` (#158).

**expert_applications**. The review record for becoming an expert: motivation, experience, evidence links, `fast_track` (set by the database for mentors and cohort mentors or coordinators), status submitted, approved, rejected or withdrawn, decision. One open application per person. Create the expert profile first, then apply.
The applicant and admins read it; the applicant can only withdraw it.

**expert_application_queue** (view). Applications with the applicant's name and expert profile, admins only.

**offers**. What an expert sells: kind `one_to_one`, `group`, `async_review`, `project`, `recurring` or `gig` (fixed scope, Phase 4), title, description, scope, duration, delivery days, group size, cadence, revisions, skills, indicative price, active flag, position. Checks: a gig needs scope and delivery days, a group needs a size, recurring needs a cadence, sessions need a duration.
Anyone reads active offers of approved experts. Experts with a profile that is not delisted create and edit their own (pending experts can draft); admins can edit any.

**briefs**. A request for pitches: kind `advice` (any adult, Phase 3) or `job` (needs `organisation_id`, posted for a verified organisation by its owner, admin or recruiter, Phase 4), title, description, skills, categories, indicative budget, location, remote, deadline, status open, closed, awarded or cancelled.
Read by the poster, any active member of its organisation, approved experts while open, experts who pitched, and admins. Managers edit while open or closed and can close, reopen or cancel; awarding happens only through `accept_pitch`.

**brief_board** (view). Briefs the caller may read with the poster's name, organisation, pitch count, the caller's own pitch status and whether the caller manages it.

**pitches**. An approved expert's answer to an open brief they do not own: message, timeline, optional own offer, indicative price, status submitted, accepted, declined or withdrawn. One per expert per brief.
The expert, the brief's managers and admins read it. The expert edits or withdraws while submitted.

**booking_requests**. A request for a session or service: requester, expert, optional offer (which decides the expert), brief and pitch when it came from a brief, message, preferred times, status requested, accepted, declined, completed or cancelled, `responded_at`, `completed_at`. One open request per person per expert. The expert must be approved and accepting requests.
The two parties and admins read it. A booking from an organisation's job brief carries `organisation_id`, and that organisation's active members share the requester side (read and message; owners, admins and recruiters also cancel or complete). Nobody updates it directly: status moves only through `set_booking_status`.

**booking_messages**. The thread on a booking, append only. The parties write while it is requested, accepted or completed; the parties and admins read (admins for disputes and reports).

**booking_threads** (view). The caller's bookings (including their organisations' bookings) with both names, the offer, the organisation, whether it has a review and the last message time.

**expert_reviews**. One per completed booking, by the requester: rating 1 to 5, body. `expert_id` is copied from the booking. Admins can hide one (`is_hidden` is the only editable column, admins only).
The reviewer, the expert and admins read the table; the public reads `public_expert_reviews`.

**public_experts** (view). Approved experts with name, avatar and trust signals counted from real rows: `completed_bookings`, `review_count`, `average_rating` (null until a review), `median_response_hours` (null until three requests were answered in the last 180 days; bookings from pitches do not count). Anyone reads it.

**public_expert_reviews** (view). Visible reviews of approved experts with the offer kind; the reviewer is named only when their own profile is public.

**opportunities**. Jobs, internships, scholarships, grants and gigs: slug, title, summary, description, organisation (or a typed `organisation_name` for external posts), apply link or instructions, location, region, remote, deadline, eligibility, fields, skills, tracks, compensation note (display text), source link, status draft, open or closed.
Anyone reads open ones whose deadline (Africa/Accra date) has not passed, so they expire on their own. Admins post anything; active owners, admins and recruiters of a verified organisation post for it, always under the organisation's own name. Organisations delete drafts; admins delete anything.

**opportunity_saves**. A learner's private saved or applied marker; `applied_at` is stamped by the database. Only the learner and admins read it, never the poster.

**outcomes**. A learner reported result: type job, internship, freelance contract, scholarship or grant, title, organisation (name, optional link), optional opportunity, `started_on`, evidence link and note, `show_on_profile`, verification pending, verified or rejected.
The learner and admins read it. The learner edits pending or rejected outcomes (an edit to a rejected one sends it back to pending); once verified only `show_on_profile` changes. The learner can delete their own.

**outcome_queue** (view). Outcomes with the learner's name, admins only.

**public_outcome_stats** (view). Verified outcomes by type: count and distinct people. No rows until something is verified.

**talent_listings**. Opt in directory entry: headline, summary, skills, tracks, region, availability (open to work, internships or gigs), remote, portfolio link, active flag.
Writable only while the learner is an adult and `private.talent_eligible`; switching a listing off is always allowed. Read by the learner, admins, and active members of verified organisations (active and eligible listings only).

**talent_directory** (view). Listed, eligible learners with name, avatar, public slug (if public) and live certificates, for verified organisation members and admins; learners see their own row as a preview.

**talent_contact_requests**. A verified organisation (owner, admin or recruiter) asks to contact a listed learner: message, optional opportunity, status pending, accepted, declined or withdrawn, `shared_contact`. One pending request per organisation per learner. Nothing beyond the directory is shared until the learner accepts, and then only what they type into `shared_contact`; SydCrest never hands over account email or phone.

**reports** (changed). `target_type` also accepts `expert_profile`, `offer`, `expert_review`, `booking_message`, `brief`, `pitch`, `organisation`, `opportunity` and `talent_listing`. The constraint is `reports_target_type_check`; #158 swaps it again for community targets and must keep every value above.

### Functions

| Function | Who | What |
| --- | --- | --- |
| `accept_organisation_invite(organisation_id)` | the invitee (adult) | Activates the caller's invitation. |
| `request_organisation_verification(organisation_id)` | owners and admins of it | unverified or rejected to pending. |
| `admin_set_organisation_verification(organisation_id, status, note)` | admins | Any status; `verified` stamps who and when. |
| `decide_expert_application(application_id, decision, note)` | admins | `approved` (lists the expert) or `rejected`, for an open application. |
| `admin_set_expert_status(profile_id, status, reason)` | admins | `pending`, `approved` (list again) or `delisted`. |
| `admin_set_expert_flags(profile_id, is_verified, is_featured)` | admins | Null leaves a flag as it is. |
| `set_booking_status(booking_id, status, reason)` | the parties, admins | requested to accepted or declined (the expert); requested or accepted to cancelled (either party or an admin); accepted to completed (either party). Anything else `22023`. |
| `accept_pitch(pitch_id)` | the brief's managers (adult) | Accepts the pitch, declines the brief's other pitches, awards the brief, and returns a new accepted booking between the caller and the expert. |
| `decline_pitch(pitch_id)` | the brief's managers | Declines a submitted pitch. |
| `admin_verify_outcome(outcome_id, status, note)` | admins | `pending`, `verified` or `rejected`. |
| `admin_cohort_outcomes(months)` | admins | North Star per cohort: learners, completed, certified (live certificates), and `placed` (learners with a verified outcome starting between the cohort start and `months`, default 6, after its end). A cohort ends `starts_on + 7 x` its programme's highest week number. |
| `talent_eligibility()` | signed in | `{eligible, is_adult, certificates}` for the caller. |
| `respond_talent_contact(request_id, accept, shared_contact)` | the learner | Accepts (sharing what they type, or nothing) or declines a pending request. |
| `withdraw_talent_contact(request_id)` | the organisation's owner, admin or recruiter | Withdraws a pending request. |

None is executable by `anon`. Each pins `search_path = ''` and checks the
caller inside.

### Extension points for #158 (verified skills)

- `private.talent_eligible(p_profile_id uuid) returns boolean` is the single
  rule for the talent directory, used by the listing policies, contact
  requests and `talent_directory`. Today it is "has a live certificate".
  Extend it with `create or replace` (same signature, `language sql stable
  security definer set search_path = ''`) adding "or has a verified skill".
- `talent_directory` can gain a `verified_skills` column with
  `create or replace view` (new columns go last).
- `public_experts` likewise for skill badges on expert pages.

### Privacy decisions

- Approving an expert makes their name, avatar and expert profile public on
  `/experts` whatever `profiles.is_public` says: being listed is the expert's
  choice to be found. Delisting removes them at once.
- Verified organisations are public through `public_organisations`; the
  registration number and admin notes never are.
- Booking details, threads, briefs, pitches, saves, outcomes and contact
  requests are never public. Earning reaches the public only as aggregates
  (completed bookings, review counts and ratings, verified outcome counts),
  in line with PRODUCT_ENRICHMENT §7.4.
- The talent directory is not public: only members of verified
  organisations (and admins) browse it.
