# Analytics

First party product analytics for SydCrest Launchpad: what is collected, how
it gets into the database, and the tables reporting reads. Issue #51 built the
pipeline and the funnel; issue #242 added the full taxonomy, standard
attributes, failures, UX signals, retention and daily rollups. Admin
dashboards (issue #243) read the rollups described in section 5.

Google Analytics 4 runs alongside it when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is
set (`src/lib/analytics/google.ts`, epic #320). The page view tracker loads
the Google tag after the same opt out check, so Do Not Track, GPC and the
`/privacy` switch keep it off. Once loaded, the tag follows the GA4
property's settings: page views with the full address and title, and
enhanced measurement. Founder decision, 12 November 2026. If those settings
change, update `/privacy#google-analytics`. Everything else stays first
party. The privacy page
(`/privacy#analytics`) is the public description of all of this; keep it in
step.

---

## 1. The pieces

| Piece | Where | Job |
|---|---|---|
| Taxonomy | `src/lib/analytics/events.ts` | Every event, its feature, who may send it (server or browser) and its allowed props with a kind for each. `validateProps` keeps only declared keys whose values fit their kind. |
| Server tracking | `src/lib/analytics/track.ts` | `track(name, props)`, `trackResult(name, error, props)`, `trackRefusal(action, refusal, code)`, `trackNow` (Server Components). Fire and forget: the write runs in `after()`, never throws. |
| Request context | `src/lib/analytics/context.ts` | Device class, route pattern, opt out signals, cookie names. |
| Refusals | `src/lib/analytics/refusal.ts` | Postgres or Auth error code to a refusal type. |
| Browser | `src/lib/analytics/client/*`, `page-view-tracker.tsx` | One queue per page, batched beacon, page views, Web Vitals, form starts and submits, error reporter, share clicks. `PageViewTracker` is mounted in each route group layout. |
| Beacon route | `src/app/api/analytics/route.ts`, `src/lib/analytics/beacon.ts` | `POST /api/analytics`: origin check, 16 KB cap, per address limit, opt out, browser events only. |
| Server errors | `src/instrumentation.ts`, `src/lib/analytics/server-error.ts` | `onRequestError`: thrown Server Action errors, Route Handler errors (500) and render errors. |
| Error boundaries | `src/app/global-error.tsx`, `src/app/(app)/error.tsx`, `src/lib/analytics/error-fallback.tsx` | Friendly fallback plus a `client_error` report. |
| Opt out switch | `src/lib/analytics/analytics-choice.tsx` on `/privacy` | Sets the `sc_analytics=off` cookie. |
| Database | `supabase/migrations/20261029230000_analytics_collection.sql` | Attribute columns, `record_events`, rollup tables, refresh and purge. pgTAP: `supabase/tests/database/analytics_collection.test.sql`. |
| Maintenance | `src/lib/analytics/maintenance.ts`, run daily by `/api/cron/reengage` (09:00 UTC, `vercel.json`); `/api/cron/analytics` for manual runs | Calls `run_analytics_maintenance` with the service role. Not its own cron: the Vercel plan allows two. |

## 2. Rules for call sites

- Record at the success or failure point of the action, after the main write:
  `await trackResult("booking_requested", error)` records `booking_requested`
  on success and `action_failed` with the refusal type and code on failure.
  Validation refusals before any write: `await trackRefusal("signup", "validation")`.
- Props are ids, slugs, enum values, counts, durations and flags only. The
  spec in `events.ts` is the allowlist; a prop not declared there is dropped.
  Never names, emails, phone numbers, free text, or a person's slug.
  `events.test.ts` fails if a spec declares a personal key or free text
  outside the error events.
- Never pass the person: identity and attributes are derived by the database
  from the session.
- To add an event: add it to `EVENTS` in `events.ts`, replace
  `private.is_event_name()` in a new migration with the name added (the unit
  test compares the two lists), and describe it in section 4 here.
- Forms opt into abandonment tracking with `data-analytics-form="<name>"`
  (the name must be in `FORM_NAMES`).

## 3. Collection paths and opt out

```
Server Action / Route Handler ── track() ──┐
                                           ├── after() ── rpc public.record_events(p_events, p_context)
Browser ── queue ── sendBeacon ── /api/analytics ──┘            (security invoker)
                                                              └─ private.record_events (definer)
onRequestError ── service role ── record_events                    derives profile, roles, track, region,
                                                                   chapter, cohort from auth.uid()
```

- **Batching.** The browser queues events and sends them when 10 are waiting,
  5 seconds after the first, and when the page is hidden or closed
  (`navigator.sendBeacon`, text/plain JSON, keepalive fetch as fallback). At
  most 25 events and 16 KB per request. Events carry the route pattern of the
  page they happened on; who the person is comes from the session when the
  batch arrives (a page view queued just before signing in is attributed to the
  signed in session).
- **Opt out.** Nothing is recorded when the request has `DNT: 1` or
  `Sec-GPC: 1`, or the `sc_analytics=off` cookie; the browser also checks
  `navigator.doNotTrack` and `globalPrivacyControl` before queueing. This holds
  for every path (server events, beacon, server errors).
- **Limits.** `record_events` allows 600 batches per person per 10 minutes, 300
  per anonymous visitor id, and 20,000 anonymous batches overall; over the limit
  it returns 0 and writes nothing. The beacon route also counts each request
  against the visitor's hashed address (`take_form_rate_limit('beacon')`,
  3,000 an hour; local addresses are not limited).
- **Sampling.** Web Vitals: 25% of tab sessions (decided once per session).
  Browser errors: 50% of tab sessions, deduplicated per page and capped at 10
  per page. Server errors and refusals are not sampled. Rates are constants in
  `src/lib/analytics/client/sampling.ts`.
- **Cookies.** `sc_aid` (httpOnly, random visitor id, 1 year, set by the
  proxy), `sc_sid` (tab session id, session cookie), `sc_route` (current route
  pattern, session cookie, so Server Actions know where they ran),
  `sc_analytics` (the opt out).

## 4. Taxonomy

Source of truth: `EVENTS` in `src/lib/analytics/events.ts`. Server events are
recorded by the server; browser events come through the beacon.

### Experience and failures

| Event | Source | Props | Notes |
|---|---|---|---|
| `page_view` | browser | none | Route in the `route` column. |
| `visit_started` | browser | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` (slugs), `referrer` (direct, internal, search, whatsapp, facebook, instagram, linkedin, x, tiktok, youtube, telegram, email, other), `deep_link` | Once per tab session, before its first `page_view`; the landing route is in `route`. See section 9. |
| `session_started` | browser | `hour_band` (night, morning, afternoon, evening, late; local clock), `weekday`, `days_since_last` (count; absent on a browser's first session), `returning`, `connection`, `save_data` (section 13) | Once per tab session with `visit_started`; the last session's date is kept in localStorage (`sc_last_day`). See section 11. |
| `web_vital` | browser | `metric` (LCP, INP, CLS, FCP, TTFB), `value` (ms; CLS unitless), `rating`, `navigation`, `connection`, `save_data` (section 13) | 25% of sessions. |
| `form_started` / `form_submitted` | browser | `form` | First input in a tagged form, and its submit. |
| `share_clicked` | browser | `target` (achievement, certificate, roadmap, ...), `channel` (share, copy, download, ...) | |
| `client_error` | browser | `kind` (boundary, error, rejection), `message` (scrubbed, 120 chars), `error` (class), `digest` | |
| `server_error` | server | `route_type` (render, route, action, proxy), `error` (class), `digest` | From `onRequestError`; anonymous. |
| `action_failed` | server | `action` (the event that failed), `refusal`, `code` | `refusal`: `rate_limited` (54000), `forbidden` (42501, P0002), `validation` (22xxx, 23xxx, form errors), `server_error`. `code`: Postgres or Auth code, or a short reason (`unanswered`, `daily_limit`, `unkeyed`). |

### Product events

| Feature | Events (props) |
|---|---|
| Auth | `signup` (method), `sign_in` (method), `sign_out`, `welcome_completed`, `password_reset_requested`, `password_updated` |
| Settings | `profile_updated` (has_region), `public_profile_updated` (is_public), `learner_profile_saved` (answered, changed), `profile_field_updated` (field), `profile_published`, `whatsapp_consent_set` (on), `display_prefs_saved`, `milestone_posts_set` (on) |
| Onboarding and path | `waitlist_joined`, `quiz_run` (signed_in), `path_saved`, `path_viewed` |
| Learn | `lesson_opened` (roadmap, node_id; every open), `node_started` (first open), `quiz_submitted` (node_id, score, passed), `node_completed` (roadmap, node_id, via), `lesson_left` (browser: roadmap, node_id, time_spent_ms visible, scroll_percent, done_before), `resource_opened` (browser: node_id, kind), `quiz_question_answered` (node_id, question_id, correct; one per question), `quiz_retried` (node_id, passed, passed_before) |
| Discovery | `search_performed` (browser: scope topics, results; never the words), `filter_applied` (browser: scope roadmaps or opportunities, filter, results) |
| Review and Study Buddy | `review_completed` (items, correct), `weekly_goal_set` (goal), `study_buddy_message` (turn) |
| Skills | `skill_quiz_submitted` (passed, score), `skill_portfolio_submitted`, `skill_portfolio_reviewed` (decision), `path_skills_claimed` (claimed) |
| Programme and cohort | `application_submitted`, `application_withdrawn`, `application_decided` (decision), `specialisation_chosen` (specialisation), `submission_saved` (sent), `submission_graded` (passed), `deadline_met` (kind cohort_task, hours_early), `deadline_missed` (kind, hours_late), `submission_resubmitted` (attempt), `peer_review_assigned`, `peer_review_submitted`, `learner_deferred`, `certificate_issued`, `certificate_revoked` |
| Mentoring | `mentor_contact_logged` (kind: message, call or session; logged from the caseload) |
| Experts and bookings | `expert_applied`, `expert_application_decided` (decision), `offer_created`, `offer_updated`, `booking_requested`, `booking_status_changed` (status), `booking_message_sent`, `booking_reviewed` (rating) |
| Briefs | `brief_created`, `pitch_submitted`, `pitch_withdrawn`, `pitch_decided` (decision) |
| Opportunities, outcomes, talent | `opportunity_created` (by), `opportunity_saved` (status), `opportunity_unsaved`, `opportunity_reported`, `opportunity_viewed` (browser: opportunity_id), `opportunity_apply_opened` (browser: opportunity_id, on_sydcrest; the employer's own link), `opportunity_applied` (opportunity_id), `opportunity_application_withdrawn`, `opportunity_applicant_moved` (stage), `outcome_reported`, `outcome_decided` (decision), `talent_listing_saved`, `talent_contact_requested`, `talent_contact_responded` (accepted) |
| Organisations | `organisation_created`, `organisation_member_invited` (role), `organisation_invite_accepted`, `organisation_decided` (decision) |
| Community, events, chapters, social | `post_created` (scope), `reply_created`, `reaction_set` (on), `content_reported`, `content_moderated` (hide), `event_rsvp` (going), `event_checked_in` (by), `event_feedback_sent` (recommend), `chapter_joined`, `chapter_left`, `profile_followed` (on), `profile_reported` |
| Sharing and notifications | `invite_sent` (method), `notification_opened`, `notifications_read_all` |

Phase 1 names the database still accepts but nothing sends:
`signup_started`, `signup_completed`, `onboarding_completed`, `roadmap_viewed`,
`node_opened`, `path_quiz_started`, `path_quiz_completed`, `achievement_shared`.

## 5. Schema

### `public.events` (raw, 13 months)

| Column | Type | Meaning |
|---|---|---|
| `id` | bigint | Identity. |
| `name` | text | `private.is_event_name(name)`. |
| `profile_id` | uuid null | `auth.uid()` when signed in. Set null if the profile is deleted. |
| `anonymous_id` | text null | `sc_aid` visitor id. |
| `props` | jsonb | Flat object, at most 16 keys, strings at most 200 characters, 4 KB. |
| `created_at` | timestamptz | When recorded. |
| `source` | text | `server` or `client`; null before #242. |
| `session_id` | text | Tab session uuid (`sc_sid`). |
| `route` | text | Route pattern, e.g. `/learn/[slug]/[node]`. |
| `device_class` | text | `mobile`, `tablet`, `desktop`, `bot`, `unknown`. |
| `signed_in` | boolean | Recorded with a session; null before #242. |
| `roles` | text[] | All roles at the time: `learner`, `admin`, `skill_reviewer`, `staff`, `expert`, `expert_pending`, `business`, `chapter_lead`, `cohort`, `applicant`. |
| `primary_role` | text | Highest of: `admin` > `staff` > `expert` > `business` > `chapter_lead` > `cohort` > `applicant` > `learner`; `visitor` when signed out. |
| `track` | text | Roadmap slug of the latest saved path, else cohort specialisation. |
| `region` | text | `profiles.region` (Ghana region slug). |
| `chapter_id` | uuid | Chapter led, else first joined. |
| `cohort_id` | uuid | Latest cohort membership (active first). |

Indexes: `(name, created_at)`, `(profile_id, created_at)`, `(created_at)`,
`(route, created_at)`, `(cohort_id, created_at)`, `(chapter_id, created_at)`,
`(primary_role, created_at)`, `(session_id, name)`; the attribute indexes are
partial on not null.

Access: admins `select` (RLS `private.is_admin()`); nobody else reads. Writes
go through `public.record_events` (the old four column insert grant from
Phase 1 remains for now, see #247; the attribute columns are not granted).

### Rollups (kept indefinitely, admin read only)

All are rebuilt per UTC day (Africa/Accra time) by
`private.refresh_analytics_rollups(from, to)`; re-running a day replaces it.
Text dimensions use `''` for none, uuid dimensions `null`.

**`public.events_daily`**: `day`, `name`, `route`, `device_class`,
`signed_in`, `primary_role`, `track`, `region`, `cohort_id`, `chapter_id`,
`events` (count), `actors` (distinct profile id, else anonymous id, else
session). Every event lands here, so success counts per feature, funnels and
cohort or chapter breakdowns read this table. Sum `events` across dimensions
you do not need; do not sum `actors` across rows (a person can appear in
several rows), read raw events for exact distinct counts over a range.

**`public.web_vitals_daily`**: `day`, `route`, `device_class`, `metric`,
`samples`, `p50`, `p75`, `p95`, `good`, `needs_improvement`, `poor`. Core Web
Vitals use p75 for the headline figure.

**`public.errors_daily`**: `day`, `name` (`action_failed`, `server_error`,
`client_error`), `subject` (the failing action, the route type, or the client
error kind), `refusal`, `code`, `route`, `device_class`, `occurrences`,
`actors`.

**`public.durations_daily`**: `day` (when the success happened), `metric`,
`samples`, `p50_seconds`, `p90_seconds`, `mean_seconds`. From domain
timestamps, not client timers:

| Metric | From | To |
|---|---|---|
| `topic_start_to_pass` | `roadmap_progress.created_at` | `completed_at`, quiz topics (`quiz_score` set) |
| `topic_start_to_done` | `roadmap_progress.created_at` | `completed_at`, topics without a quiz |
| `application_to_decision` | `cohort_applications.created_at` | `decided_at` |
| `expert_application_to_decision` | `expert_applications.created_at` | `decided_at` |
| `booking_request_to_accept` | `booking_requests.created_at` | `responded_at`, accepted or completed, not opened from a pitch |
| `pitch_to_decision` | `pitches.created_at` | `decided_at` |
| `submission_to_grade` | `submissions.submitted_at` | `graded_at` |

**`public.abandonment_daily`**: `day`, `kind`, `subject`, `started`,
`finished`. `form`: tab sessions that started a tagged form that day
(`subject` = form name) and how many of those sessions submitted it. `lesson`:
people who first opened a lesson that day (`subject` = roadmap slug) and how
many have finished that topic since (`roadmap_progress.status = 'done'`). Recent
days look more abandoned than they are; the cron rebuilds the last 3 days, so
call `GET /api/cron/analytics?days=N` (with the `CRON_SECRET` bearer) to
refresh further back before reporting on lesson completion.

### Functions

| Function | Who | What |
|---|---|---|
| `public.record_events(p_events jsonb, p_context jsonb)` | anon, authenticated, service_role | Up to 25 events: `[{name, props, route}]`; context `{anonymous_id, session_id, device_class, source, route}`. Returns rows written (0 when limited). |
| `public.run_analytics_maintenance(p_days int default 3)` | service_role | Refresh the last `p_days` days, link new accounts' first touch, purge raw events older than 13 months. Returns `{from, to, purged, linked}`. |
| `public.funnel_by_week(p_weeks int)` | admins | Visits, sign ups, activations per week (#51). |
| `private.refresh_analytics_rollups(from date, to date)` | service_role | Rebuild a day range (at most 400 days). |
| `private.purge_old_events()` | service_role | Batched delete of raw events past 13 months. |
| `private.analytics_attributes(uuid)` | service_role | The attribute derivation used by `record_events`. |
| `private.first_visit(anonymous_id text, at timestamptz)` | definer functions only | A browser's first touch for something that happened at `at` (section 9). |
| `private.link_first_touch()` | service_role | Fills `profile_first_touch` for accounts made in the last 60 days. |

## 6. Retention

Raw events: 13 months, purged daily (`purge_old_events`, batches of 50,000).
Rollups: kept; they hold no person ids, only counts by attribute.

Schedule: the daily `/api/cron/reengage` job runs the WhatsApp nudge, then
`runAnalyticsMaintenance` (last 3 days). Each step is isolated: a failure in
one is logged and the other still runs; the response carries both results and
is a 500 if either failed. `/api/cron/analytics` is the same maintenance on
demand (`?days=N`, 1 to 400), unscheduled. Both need `CRON_SECRET` and
`SUPABASE_SECRET_KEY`; without the key they answer 503 and do nothing.

## 7. Testing

- Unit: `src/lib/analytics/*.test.ts` (taxonomy and database list in step, PII
  guard, props validation, route patterns, device class, refusals, beacon
  parsing and batching, queue, sampling, server errors, `track`).
- pgTAP: `supabase/tests/database/analytics_collection.test.sql` (learners
  cannot read events or rollups, attributes cannot be forged, the record
  function, rollups, purge).
- E2E: `e2e/analytics-collection.spec.ts` (sign in, refused sign in and profile
  save record the right events and attributes; Do Not Track and the privacy
  switch record nothing; the beacon refuses other sites) and
  `e2e/analytics.spec.ts`.

## 8. Admin insights (issue #243)

Nine dashboards under `/admin/insights` (overview, funnel, retention,
learning, feature use, DMP cohorts, mentors and Earn, community,
reliability). Pages: `src/app/(admin)/admin/insights/*`; registry of
dashboards and exportable tables: `src/lib/insights/dashboards.ts`.

- **Access.** Every page calls `requireAdmin` in its Suspense island (404 for
  everyone else). Data comes only from `public.admin_insights_*` functions
  (migration `20261029250000_admin_insights.sql`): security definer,
  `search_path = ''`, `private.insights_guard` refuses non admins (42501) and
  ranges over 400 days (22023). pgTAP: `admin_insights.test.sql`.
- **Sources.** Event counts read the rollups; distinct people (DAU, WAU, MAU,
  funnel steps, retention, feature users) and Web Vitals p75 read raw
  `public.events` (actors and percentiles cannot be added across rows or
  days). Learning, cohorts, Earn and community read the domain tables.
- **Filters.** URL search params: `range` (7, 30, 90 or `custom` with `from`
  and `to`), `track`, `region`, `chapter`, `cohort`, `device`
  (`src/lib/insights/filters.ts`). Each dashboard shows only the filters it
  supports; every function takes the same seven arguments.
- **Export.** `GET /admin/insights/export?table=<key>&<filters>` returns the
  table's rows as CSV (admin checked, 404 otherwise). The at risk list carries
  display names only, as the admin cohort page does.
- **Small numbers.** Rates, medians and percentiles under `MIN_SAMPLE` (5)
  cases read "Not enough data yet" (`src/lib/insights/metrics.ts`); a
  retention week that has not ended is "Not yet", never zero.
- **Not collected yet.** Attendance at live cohort sessions; the dashboards
  say so instead of estimating. Acquisition is collected from 13 November
  2026 (section 9); earlier sign ups read "Not known".

## 9. Attribution (epic #320)

Where visits and sign ups come from. Code: `src/lib/analytics/attribution.ts`
(pure, unit tested), migration `20261113100000_attribution.sql`.

- **The visit.** On the first page of each tab session the browser records
  `visit_started`: the link's `utm_source`, `utm_medium`, `utm_campaign` and
  `utm_content`, each reduced to a lowercase slug of at most 60 characters
  (dropped if it looks like an email address or phone number); the kind of
  site in `document.referrer` (never the host or page); and `deep_link`, true
  when the landing page is not the home page. The landing route pattern is the
  event's `route`. A tab opened from another SydCrest page has referrer
  `internal` and is not counted as a visit in the reports.
- **Tagging links.** The share buttons (`ShareButton`, `ShareCard`) add
  `utm_source=share|copy&utm_medium=share&utm_campaign=<what>`. Chapter
  WhatsApp groups, posters and partners should use their own links, for
  example `https://sydcrest.com/chapters/tamale?utm_source=whatsapp&utm_medium=chapter&utm_campaign=tamale`.
  Keep tags lowercase words and hyphens.
- **First touch.** `private.first_visit(anonymous_id, at)`: among the
  browser's visits from 30 days before `at` to 10 minutes after (the beacon
  batches), the earliest one with campaign tags or from another site; else the
  earliest typed or bookmarked one. The reports count each `signup` under the
  first touch of the browser it was made in.
- **Kept with the account.** `public.profile_first_touch` (one row per
  member, read by the member and by definer functions; deleted with the
  account) holds the first touch so it outlives the 13 month purge. The daily
  maintenance fills it for accounts made in the last 60 days, linking a
  browser to an account through the account's signed in events (they carry
  the `sc_aid` anonymous id). An email sign up confirmed on another device
  links only if the first device is used signed in later.
- **Reports.** `admin_insights_acquisition` (source, medium, campaign:
  visits, distinct visitors, sign ups) and `admin_insights_landing` (landing
  route: visits, visitors, sign ups; top 100), on the Acquisition and funnel
  dashboard with CSV export (`acquisition`, `landing`). Source is the
  `utm_source`, else the referrer kind; medium is the `utm_medium`, else none,
  search, email or referral.
- **Google Analytics** reads the same tags from the address on its own; its
  numbers will differ (sessions, consent, ad blockers).

## 10. Learner profile v2 (epic #320)

Optional answers in `public.learner_profiles` (one row per member), asked on
`/profile/about` and linked from the dashboard (until half are answered) and
`/profile`. Options and parsing: `src/lib/learner-profile.ts`; the
migration's checks must list the same values (a unit test compares them).

- **Used for** learning (path, pacing, low data versions, reminders) and
  matching (filters and ranking). **Never** a readiness score input. Pay is a
  filter only and never shown to employers.
- **Never collected:** gender, ethnicity, religion, health or disability,
  marital status (a unit test checks the field names).
- **Access:** the member reads and writes their own row; admins read all
  (`private.is_admin()`); visitors none.
- **Events:** `learner_profile_saved` (`answered`, `changed` counts) and one
  `profile_field_updated` per changed field (`field` name only, never the
  answer), sent in one write with `trackMany`.
- **Not yet:** confidence per core skill of a track (needs the track's skill
  list on the form); asking these questions inside onboarding, which comes
  with the new UI.

## 11. Behaviour and work-readiness events (epic #320, step 3)

What each person does that later predicts finishing and doing well at work.
Wired only where the feature exists today; the rest waits for its feature.

| Signal | Events | Notes |
|---|---|---|
| Study rhythm | `session_started` | Hour band and weekday on the learner's clock; days since the last session on this browser. Streaks are computed from progress (`src/lib/learning-loop/streak.ts`), not recorded as events. |
| How lessons are read | `lesson_left`, `resource_opened` | Visible time only (a hidden tab does not count), capped at 2 hours; deepest scroll. |
| Where they struggle | `quiz_question_answered`, `quiz_retried` | One event per question per submit. A retry is a submit when a score was already on file. |
| What they look for | `search_performed`, `filter_applied` | Topic search inside a roadmap counts once the typing settles (1.5 s); the words are never sent. |
| Going after work | `opportunity_viewed`, `opportunity_apply_opened`, `opportunity_applied`, `opportunity_application_withdrawn`, `opportunity_applicant_moved` | Applications were not tracked before this step. |
| Reliability | `deadline_met`, `deadline_missed`, `submission_resubmitted` | Against the end of the week's due date (Accra), first send only; grace days are ignored, since this measures punctuality. |

**Waiting for a feature:** `study_buddy_opened` (Study Buddy has no open
step; `study_buddy_message` turn 1 is the first use), `goal_set`,
`weekly_plan_set`, `module_started`, `event_no_show` (derived from RSVPs and
check-ins in the computed attributes step), `message_replied`,
`mentor_feedback_given`, `cv_updated`, `mock_interview_rated`,
`interview_reported` / `offer_reported` / `hired_reported` (outcomes cover part
of this), `employer_feedback_given`, `still_employed_checked` (#329),
`feedback_given` (#326), `app_installed` / `offline_used`.

## 12. Learner attributes and the learner view (epic #320, step 4)

`public.learner_attributes`: one row per member, rebuilt by
`private.refresh_learner_attributes()` inside the daily
`run_analytics_maintenance` (after first touches are linked, before the
purge). Read by admins and by the member (own row); never by employers.

| Group | Columns | From |
|---|---|---|
| Activity | `first_active_on`, `last_active_on`, `active_days_30`, `active_weeks_8`, `stage` | Signed in events (bots left out) |
| Learning | `topics_started`, `topics_completed`, `quizzes_passed`, `avg_quiz_score`, `days_to_first_topic`, `quiz_retries_90` | `roadmap_progress`, `quiz_retried` |
| Rhythm | `usual_hour_band` (last 60 days), `usual_device` (last 30 days) | `session_started`, events' device class |
| Reliability | `deadlines_met`, `deadlines_missed`, `on_time_rate`, `resubmissions`, `events_going`, `events_attended`, `event_no_shows` | Step 3 events, `event_rsvps`, `event_checkins` |
| Work | `opportunities_viewed_90`, `opportunities_applied` | `opportunity_viewed`, `opportunity_applications` (not withdrawn) |
| Origin | `first_touch_source`, `first_touch_campaign` | `profile_first_touch` |

**Stage** (UTC day of the refresh): `new` joined in the last 14 days;
`not_started` older and never opened a topic; `active` active in the last 7
days; `slipping` 8 to 21 days; `dormant` over 21 days. A no show is an
event that has ended where the member said going and did not check in.

**Learner view:** `/admin/learners` (by stage, search by part of a name or an
exact email; `admin_learners`) and `/admin/learners/[id]` (`admin_learner`,
`admin_learner_progress`, plus the member's attributes, About you answers,
first touch and last 60 events, which admins read under RLS). Admin only;
everyone else gets a 404. Support actions and an audit log of who opened
which learner come with the People console (#332).

## 13. Low bandwidth and low end devices (issue #331)

**Connection class.** `web_vital` and `session_started` carry
`connection` (`slow-2g`, `2g`, `3g`, `4g` or `unknown`) from
`navigator.connection.effectiveType` and `save_data` (flag, absent when the
browser does not say) from `navigator.connection.saveData`
(`src/lib/analytics/connection.ts`). Only Chromium browsers expose the
Network Information API; Safari and Firefox are `unknown`. Other events take
the connection of their tab session's `session_started` (joined on
`session_id`). Slow means `slow-2g`, `2g` or `3g`; fast means `4g` (which
the browser also reports for wifi). Connection is report only: it never
enters `learner_attributes` or any score.

**Reports** (Reliability dashboard, migration `20261114600000_low_bandwidth.sql`,
all with the usual seven argument signature; only the device filter applies):

| Function | What |
|---|---|
| `admin_insights_slow_routes` | The five pages with the widest LCP p75 gap between slow and fast connections (five LCP samples each side at least), with the INP gap |
| `admin_insights_vitals_connection` | Web Vitals p75 and ratings by connection type and device |
| `admin_insights_loads_connection` | Sessions, page views, browser errors and server render errors by session connection and device |
| `admin_insights_learn_connection` | Lessons opened and left, read to the end (scroll at least 90%), median time and scroll, quizzes sent and passed, by connection class |

**Page weight budget.** After `pnpm build`, CI runs
`pnpm tsx scripts/perf-budget-cli.ts`: it reads
`.next/diagnostics/route-bundle-stats.json` (written by `next build`), gzips
each route's first load chunks and fails when a page in `perf-budget.json`
is over its budget or missing from the build. Budgets started about 10%
above the 14 Nov 2026 sizes; `--suggest` prints fresh numbers. Raise a
budget only on purpose, and say why in the PR.
## 13. Readiness score v1 and the fairness report (epic #320, step 5; #328)

`public.readiness_scores`: one row per learner per track (a published roadmap
they started a topic in, or listed in About you), with the score, band and
every part. Rebuilt by `private.refresh_readiness()` inside the daily
`run_analytics_maintenance` (its result gains a `readiness` count). Weights
live in `private.readiness_weights()`, mirrored in
`src/lib/readiness/score.ts` (a unit test keeps them equal and checks the
refresh never reads a Never attribute). Admin only: `/admin/readiness`
(`admin_readiness_report`, the fairness check) and a Readiness block on
`/admin/learners/[id]` (`admin_learner_readiness`). Not shown to learners
(#337) or employers, and not used for matching (#336) yet. No events.
Model card, inputs, limits and the fairness review: `docs/readiness.md`.
## 13. Early warning and the mentor caseload (#325, #330)

`private.refresh_learner_risk()` runs inside `run_analytics_maintenance`
right after the learner attributes (result key `risk`). It writes one row
per learner (not admins, not cohort staff) to `public.learner_risk`: a
`level` (`none`, `watch`, `at_risk`), the `reasons` (codes below) and the
numbers behind them, and a `route` for who acts.

| Reason | Rule (UTC days) |
| `went_quiet` | Quiet for at least twice their usual gap between active days (and at least 7), up to 60. Usual gap: 56 over their active days in the 56 days up to their last active day, when there were 3 or more |
| `dormant` | Stage dormant, up to 60 days quiet |
| `missed_deadlines` | Two or more `deadline_missed` in 28 days |
| `streak_broken` | Active on 5 or more of the 14 days up to their last active day, now quiet 3 or more days (not yet `went_quiet`) |
| `slipping` | Stage slipping |
| `pace_slowing` | 4 or more topics done in the 56 days before the last 14, and the last 14 at most half that pace |
| `quiz_stuck` | 3 or more failed `quiz_submitted` on one topic in 30 days, topic not passed |
| `no_first_topic` | Saved a path 7 or more days ago, no topic started |

Level: `at_risk` with `went_quiet`, `dormant` or `missed_deadlines`, or two
or more reasons; `watch` with one. The rules are pure SQL
(`private.risk_reasons`, `private.risk_level`) mirrored in
`src/lib/early-warning/rules.ts`, which also words each reason for people.
Device, connection, region and study hour never enter them.

**Routing:** `mentor` when the learner is active in an enrolling or running
cohort that has staff (`cohort_id`; every mentor and coordinator of the
cohort sees them, as there is no per learner mentor yet); else
`chapter_lead` for the chapter they joined last, if open and led
(`chapter_id`); else `admin`.

**Alerts:** `public.learner_risk_alerts` keeps one row per flagged stretch
(`raised_on`, reasons at the time, `came_back_on` the first active day after,
`closed_on` when back to `none`). Admins only.

**Contacts:** `public.mentor_contacts` (staff, learner, `kind` message, call
or session, optional `note` up to 280 characters). Logged from the caseload;
event `mentor_contact_logged` (`kind`). Readable by whoever may contact that
learner (`private.can_contact_learner`) and admins; never by the learner.

**Pages:** `/mentor` Caseload (`mentor_caseload`: risk, last contact, next
unsent deadline; sorted by `sortCaseload`); chapter leads see "Members to
check in with" on their chapter page (`chapter_check_ins`); admins see
Early warning, Mentors and Learners flagged now on `/admin/insights/cohorts`
(`admin_insights_early_warning`, `admin_insights_mentors`,
`admin_insights_risk_learners`). "Came back" counts alerts for going quiet
raised at least 14 days ago, split by whether a contact was logged first. It
is a plain comparison, not an experiment.
