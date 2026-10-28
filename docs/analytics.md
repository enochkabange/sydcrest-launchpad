# Analytics

First party product analytics for SydCrest Launchpad: what is collected, how
it gets into the database, and the tables reporting reads. Issue #51 built the
pipeline and the funnel; issue #242 added the full taxonomy, standard
attributes, failures, UX signals, retention and daily rollups. Admin
dashboards (issue #243) read the rollups described in section 5.

Nothing goes to a third party. The privacy page (`/privacy#analytics`) is the
public description of all of this; keep it in step.

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
| `web_vital` | browser | `metric` (LCP, INP, CLS, FCP, TTFB), `value` (ms; CLS unitless), `rating`, `navigation` | 25% of sessions. |
| `form_started` / `form_submitted` | browser | `form` | First input in a tagged form, and its submit. |
| `share_clicked` | browser | `target` (achievement, certificate, roadmap, ...), `channel` (share, copy, download, ...) | |
| `client_error` | browser | `kind` (boundary, error, rejection), `message` (scrubbed, 120 chars), `error` (class), `digest` | |
| `server_error` | server | `route_type` (render, route, action, proxy), `error` (class), `digest` | From `onRequestError`; anonymous. |
| `action_failed` | server | `action` (the event that failed), `refusal`, `code` | `refusal`: `rate_limited` (54000), `forbidden` (42501, P0002), `validation` (22xxx, 23xxx, form errors), `server_error`. `code`: Postgres or Auth code, or a short reason (`unanswered`, `daily_limit`, `unkeyed`). |

### Product events

| Feature | Events (props) |
|---|---|
| Auth | `signup` (method), `sign_in` (method), `sign_out`, `welcome_completed`, `password_reset_requested`, `password_updated` |
| Settings | `profile_updated` (has_region), `public_profile_updated` (is_public), `profile_published`, `whatsapp_consent_set` (on), `display_prefs_saved`, `milestone_posts_set` (on) |
| Onboarding and path | `waitlist_joined`, `quiz_run` (signed_in), `path_saved`, `path_viewed` |
| Learn | `lesson_opened` (roadmap, node_id; every open), `node_started` (first open), `quiz_submitted` (node_id, score, passed), `node_completed` (roadmap, node_id, via) |
| Review and Study Buddy | `review_completed` (items, correct), `weekly_goal_set` (goal), `study_buddy_message` (turn) |
| Skills | `skill_quiz_submitted` (passed, score), `skill_portfolio_submitted`, `skill_portfolio_reviewed` (decision), `path_skills_claimed` (claimed) |
| Programme and cohort | `application_submitted`, `application_withdrawn`, `application_decided` (decision), `specialisation_chosen` (specialisation), `submission_saved` (sent), `submission_graded` (passed), `peer_review_assigned`, `peer_review_submitted`, `learner_deferred`, `certificate_issued`, `certificate_revoked` |
| Experts and bookings | `expert_applied`, `expert_application_decided` (decision), `offer_created`, `offer_updated`, `booking_requested`, `booking_status_changed` (status), `booking_message_sent`, `booking_reviewed` (rating) |
| Briefs | `brief_created`, `pitch_submitted`, `pitch_withdrawn`, `pitch_decided` (decision) |
| Opportunities, outcomes, talent | `opportunity_created` (by), `opportunity_saved` (status), `opportunity_unsaved`, `opportunity_reported`, `outcome_reported`, `outcome_decided` (decision), `talent_listing_saved`, `talent_contact_requested`, `talent_contact_responded` (accepted) |
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
| `public.run_analytics_maintenance(p_days int default 3)` | service_role | Refresh the last `p_days` days, purge raw events older than 13 months. Returns `{from, to, purged}`. |
| `public.funnel_by_week(p_weeks int)` | admins | Visits, sign ups, activations per week (#51). |
| `private.refresh_analytics_rollups(from date, to date)` | service_role | Rebuild a day range (at most 400 days). |
| `private.purge_old_events()` | service_role | Batched delete of raw events past 13 months. |
| `private.analytics_attributes(uuid)` | service_role | The attribute derivation used by `record_events`. |

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
