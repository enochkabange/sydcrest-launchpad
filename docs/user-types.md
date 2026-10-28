# User types and access rules

Who uses SydCrest Launchpad, how the code knows who they are, what each of
them may see and do, and where each rule is enforced today. Written for
issue #240 from the code on `main` (28 Oct 2026); the access matrix is kept
honest by `e2e/access-matrix.spec.ts`, which signs in as each type and
asserts the allowed and refused routes and writes below. Change a rule here,
in the code and in that spec together.

Companions: `docs/page-guide.md` (what each page is for, per type) and
`docs/founder-decisions.md` (rules only the founder can set).

---

## 1. The four enforcement layers

A rule is only as strong as the lowest layer that enforces it. RLS is the
real boundary: everything above it is for a good experience, not security.

| Layer | Where | What it does | Notes |
|---|---|---|---|
| **Proxy** | `src/proxy.ts` → `src/lib/supabase/proxy.ts:74` with `src/lib/supabase/protected-paths.ts` | Signed out visitors on a signed in path go to `/login`; `/path` goes to `/signup?next=/path` (`proxy.ts:70`); signed in users without a date of birth and terms consent go to `/welcome` (`proxy.ts:82`). | Early exit only, by path. It knows nothing about roles. It errs towards leaving a path out (a wrongly protected public page would lock visitors out). |
| **Page** | `requireUser` (`src/lib/auth.ts:32`), `requireAdmin` (`src/lib/admin.ts:14`), `requireStaff` (`src/lib/mentor/data.ts:65`), `getOrgForMember` (`src/lib/organisations/queries.ts:53`), `requireEventPage` (`src/lib/events/session.ts:12`), plus per page checks | Redirects to `/login` or `/welcome`, or `notFound()` for role areas. | Pages stream, so a `notFound()` inside `<Suspense>` answers **200** with the not found UI. **Layouts and pages render in parallel**: a layout gate does not stop a page's markup reaching the response (finding S2), so every page must check for itself. |
| **Server Action** | Each `actions.ts` | Re-checks the user (`requireUser`/`requireAdmin`) on every call. | All 41 action files re-check (audited: every exported action calls `requireUser`, `requireAdmin`, `getCurrentUser` or `getClaims`, or is a public form such as the waitlist). Most then rely on RLS for the role check. |
| **RLS** | `supabase/migrations/*.sql`; helpers in schema `private` | Row policies, column grants, security definer RPCs that check `auth.uid()` and the role. | Every table has RLS on. Column grants stop people editing status, role, verified and score columns. Every `public` RPC callable by `authenticated` that touches someone's data checks the caller (all 60 audited). Views are `security_invoker` and expose no email or phone. |

---

## 2. User types and how each is derived

Everyone signed in is a learner first; the other types are extra rows on top,
and one person can be several at once (an expert who mentors a cohort and
owns an organisation). `src/lib/nav/viewer.ts` derives the four nav roles
(`admin`, `staff`, `expert`, `business`) the same way.

| # | Type | How the code knows | Source of truth |
|---|---|---|---|
| T1 | **Signed out visitor** | No verified JWT (`getClaims` returns no `sub`) | Supabase Auth |
| T2 | **Learner without a path** | Signed in, adult, terms agreed; no `personalized_paths` row | `auth.users.raw_user_meta_data` (`date_of_birth`, `terms_version`), `consents`, `profiles` (created by `private.handle_new_user`, `20261025100410_profiles.sql:61`) |
| T3 | **Learner with a path** | As T2 plus a `personalized_paths` row (saved by the service role after the `/start` quiz) | `personalized_paths` |
| T4 | **Under 18 (blocked)** | Date of birth less than 18 years ago (Africa/Accra). Never gets an account: the sign up form and `/welcome` refuse; since this PR the Auth layer refuses too | `src/lib/legal.ts` (`MINIMUM_AGE`), `src/app/(auth)/actions.ts:108`, `private.check_date_of_birth` (`20261029180000_age_gate_auth_users.sql`) |
| T5 | **Cohort member** | `cohort_members` row with `role = 'learner'` (status active, deferred or completed) | `cohort_members`; created only by `decide_application` (admin) |
| T6 | **DMP applicant** | `cohort_applications` row (submitted, waitlisted, accepted, declined, withdrawn) | `cohort_applications` |
| T7 | **Cohort mentor / coordinator** ("staff") | `cohort_members.role in ('mentor','coordinator')`; admins count as staff everywhere (`requireStaff`) | `cohort_members` (admins add staff) |
| T8 | **Expert, pending** | `expert_profiles.status = 'pending'` (usually with a submitted `expert_applications` row) | `expert_profiles`, `expert_applications` |
| T9 | **Expert, approved** | `expert_profiles.status = 'approved'` (public, can pitch, can be booked) | `admin_set_expert_status`, `decide_expert_application` |
| T10 | **Expert, verified** | Approved and `expert_profiles.is_verified` (the "Verified by SydCrest" badge) | `admin_set_expert_flags` |
| T11 | **Organisation owner / admin / recruiter** | `organisation_members` row, `status = 'active'`, `role` owner, admin or recruiter. `private.org_role(org)` returns the role for active members only (`20261027151800_earn_organisations.sql:157`). Posting and the talent directory also need the organisation `verification_status = 'verified'` | `organisation_members`, `organisations` |
| T12 | **Organisation invitee** | `organisation_members.status = 'invited'`; becomes active through `accept_organisation_invite` | `organisation_members` |
| T13 | **Chapter lead** (and chapter member) | `chapter_members.role = 'lead'` (`'member'` for members) | `chapter_members`; only admins appoint leads |
| T14 | **Skill reviewer** | `profiles.role in ('mentor','admin')` (`private.is_skill_reviewer`, `20261028100300_skills_verified.sql:182`) | `profiles.role`. Nothing in the app can set `'mentor'` (finding A5, #248), so today this is admins only |
| T15 | **Platform admin** | `profiles.role = 'admin'` (`private.is_admin`, `20261025123340_phase1_profiles_public.sql:22`) | `profiles.role`, set only through SQL or the service role (the column is not granted to users) |
| T16 | **Event host** (derived) | Admin, or lead of the event's chapter (`private.hosts_chapter_event`, `20261028100200_community_events.sql:73`) | `community_events.chapter_id`, `chapter_members` |
| T17 | **Booking party** (derived) | Requester or expert on a `booking_requests` row (or a member of its organisation) | `booking_requests` |
| T18 | **Talent listed learner** (derived) | `talent_listings.is_active` and `private.talent_eligible` (a certificate or verified skill, `20261028100400_talent_verified_skills.sql:10`) | `talent_listings` |

"Adult" (`private.is_adult`, `20261027151800_earn_organisations.sql:23`)
gates the market and Earn: organisations, expert profiles, offers, bookings,
briefs, opportunities posted by organisations, talent listings and contact
requests. It reads the date of birth from Auth metadata, which is why the
Auth layer must stop people rewriting it (finding S1, fixed).

---

## 3. Access matrix

Columns: **V** visitor, **L** learner (T2 and T3), **C** cohort member, **Ap**
applicant, **M** cohort mentor or coordinator, **E** expert (p pending, a
approved, v verified), **O** organisation (ow owner, ad admin, re recruiter,
inv invitee), **CL** chapter lead, **A** platform admin. "own" means the
person's own rows only. Every signed in type can also do everything in the
L column.

Enforcement codes: **P** proxy, **Pg** page check, **SA** Server Action
check, **R** RLS policy, grant or RPC check. The e2e column names the
`e2e/access-matrix.spec.ts` test that pins the rule (blank: covered by an
older feature spec or not yet tested).

### 3.1 Learn

| Feature / action | V | L | C | Ap | M | E | O | CL | A | Enforced | e2e |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Read roadmaps, topic pages, topic panel | yes | yes | yes | yes | yes | yes | yes | yes | yes + drafts | R `roadmaps`/`roadmap_nodes` published only (`20261025123342_phase1_roadmap_content.sql`) | visitor |
| Lesson page `/learn/[slug]/[node]`, quiz, mark done | sign in | yes | yes | yes | yes | yes | yes | yes | yes | P, Pg `requireUser`, R `set_node_status`/`submit_node_quiz` (quiz gates done) | visitor |
| `/path` result | to `/signup` | own | own | own | own | own | own | own | own | P (`proxy.ts:70`), Pg, R `personalized_paths` own | visitor, learner |
| Study Buddy, 5 minute review | sign in | own | own | own | own | own | own | own | own | P, Pg, R `ai_usage`/`review_sessions` own, daily cap | visitor |
| `/cohort` home and weeks | sign in | explainer | own cohort | explainer | own cohorts | | | | all | P, Pg (`getCohortHome`), R `cohort_members` member of the cohort | learner, cohort |
| Submit cohort work | no | no | own, active | no | no | | | | no | R `save_submission` (active learner of the week's programme, own storage folder) | |
| Read sent work | no | no | own | no | own cohort's learners | | | | all | R `submissions` (`20261028120100_advisor_fk_indexes_policies.sql:46`), storage `can_read_submission_file` | mentor (refused other cohort) |
| Peer review a capstone | no | no | assigned only | no | assign | | | | assign | R `peer_reviews`, `peer_review_submissions` view hides author | |
| Grade, defer, notes | no | no | no | no | own cohort | | | | yes | Pg `requireStaff`, R `grade_submission`/`defer_learner`/`cohort_notes` | |
| Issue a certificate | no | no | no | no | own cohort | | | | yes | Pg (`certificates/issue`), R `issue_certificate` (criteria + staff) | cohort, mentor |
| Join a cohort / change own role | no | no | no (admin only) | no | no | | | | yes | R `cohort_members` insert/update admin only (`...programs_cohorts.sql:309`) | cohort, mentor |
| Read another cohort's roster | no | no | no | no | no | | | | yes | R `cohort_roster_rows` member of that cohort | cohort |
| Apply to the programme | sign in | yes | yes | edit while open | yes | yes | yes | yes | yes | P, SA, R `cohort_applications` insert own, update answers only (status not granted) | applicant |
| Decide applications | no | no | no | no | no | | | | yes | Pg, SA `requireAdmin`, R `decide_application` | applicant |
| Take a skill quiz / send a portfolio | sign in | yes | yes | yes | yes | yes | yes | yes | yes | P, Pg, R `submit_skill_quiz`/`submit_skill_portfolio` (retry window) | |
| Review skill portfolios (`/skills/reviews`) | no | no | no | no | **no** (A5) | | | | yes | Pg `isReviewerRole`, R `review_skill_portfolio` (`is_skill_reviewer`) | learner, admin |

### 3.2 Mentors and experts

| Feature / action | V | L | C | Ap | M | E | O | CL | A | Enforced | e2e |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Browse experts, offers, reviews | approved only | approved + own | | | | p: own only; a, v: public | | | all | R `expert_profiles`/`offers` approved or own (`20261027151801_earn_experts.sql`) | expert pending (own page 404 publicly) |
| Apply to be an expert | sign in | adult | adult | adult | fast tracked | | | | | P, SA, R `expert_applications` adult (`...experts.sql:193`) | |
| Create an expert profile directly | no | **yes, via API** (A6) | | | | | | | | R `Adults create their own expert profile` (`...experts.sql:109`) | |
| Approve, verify, feature experts | no | no | no | no | no | no (self refused) | | | yes | Pg, SA `requireAdmin`, R `admin_set_expert_status`/`_flags`, column grants exclude `status`/`is_verified` | expert pending, approved |
| Create and edit offers | no | no | | | | p, a, v own (`can_sell`: not delisted) | | | edit any | R `offers` (`...experts.sql:264`) | |
| Request a booking | sign in | adult | adult | adult | adult | adult (not own) | org on behalf | | | P, SA, R `booking_requests` adult (`20261027151802_earn_bookings_briefs.sql:361`), `validate_booking_request` | |
| Read a booking `/bookings/[id]` and its thread | no | parties only | | | | parties | org members | | yes | P, Pg `requireUser` + RLS read, R `is_booking_party` | |
| Accept, decline, complete a booking | no | requester: cancel | | | | expert | | | | R `set_booking_status` | |
| Post a brief | sign in | adult | | | | | job brief: verified org | | | R `briefs` (`can_post_for_org`) | |
| Read open briefs | no | own only (explainer) | | | | a, v: open briefs | own org's | | yes | R `can_read_brief` (`...bookings_briefs.sql:104`) | learner, expert approved |
| Pitch, accept or decline a pitch | no | accept/decline own briefs | | | | a, v pitch | manage org briefs | | | R `pitches`, `accept_pitch`, `decline_pitch` | |
| Mentor console `/mentor` | sign in | 404 | 404 | 404 | own cohorts | 404 | 404 | 404 | all cohorts | P, Pg `requireStaff` (404) | learner, cohort, mentor, admin |
| Another cohort's learner `/mentor/learners/[id]` | | | | | **404** | | | | yes | Pg `requireStaff` + R `cohort_roster` | mentor (IDOR probe) |

### 3.3 Community and chapters

| Feature / action | V | L | C | Ap | M | E | O | CL | A | Enforced | e2e |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Feed: read and post (everyone scope) | sign in | yes | yes | yes | yes | yes | yes | yes | yes | P, R `in_community_scope` (`20261028100100_chapters_community.sql:294`) | visitor |
| Chapter and cohort scopes | no | member of it | own cohort | | own cohort | | | own chapter | all | R `in_community_scope` | |
| Hide, pin, resolve reports | no | no (explainer) | no | | own cohort | | | own chapter | yes | Pg `getMyCommunity().isModerator`, R `moderate_community_content`, `pin_community_post`, `set_community_report_status` | learner, lead, admin |
| Browse chapters and chapter pages | yes (not drafts) | yes | | | | | | | + drafts | R `chapters` | |
| Join or leave a chapter | sign in | member | | | | | | | add anyone | SA, R `chapter_members` (`...chapters_community.sql:147`) | |
| Edit chapter summary and WhatsApp link | no | no | | | | | | own chapter | yes | Pg `canManage` (`chapters/[slug]/page.tsx:252`), R `set_chapter_details` | lead (refused on another chapter) |
| Appoint leads | no | no | | | | | | **no** | yes | R `Admins appoint leads` (`...chapters_community.sql:155`) | lead |
| Events: browse, RSVP, check in, feedback | browse | yes | | | | | | | | P (`/events/*/check-in|feedback|host`), R `rsvp_event`, `check_in_event` (code), `event_feedback` attended | |
| Host tools, create and edit events | no | no | | | | | | own chapter's | yes | Pg `requireEventPage` + host check, R `hosts_chapter_event` | |
| Leaderboards | sign in | yes | | | | | | | | P, Pg | |
| Follow, report a profile | sign in | yes | | | | | | | | R `follows`, `reports` own | |
| Read who follows whom | no | **everyone's** (A3) | | | | | | | | R `Signed in users can see follows` `true` (`20261025123346_phase1_social_safety.sql:21`) | |

### 3.4 Earn and organisations

| Feature / action | V | L | C | Ap | M | E | O | CL | A | Enforced | e2e |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Opportunities board and detail | yes (open, before deadline) | yes; save | | | | | own org's drafts | | all | R `opportunities` | visitor |
| Post an opportunity | no | no | | | | | ow, ad, re of a verified org | | yes | Pg, SA (`org/[slug]/actions.ts:178`), R `can_post_for_org` + adult | learner (refused) |
| Report outcomes | sign in | own | | | | | | | verify | P, SA, R `outcomes` own; `admin_verify_outcome` | learner (refused others') |
| Talent listing `/talent/me` | sign in | eligible adults | | | | | | | | P, Pg, R `talent_listings` + `talent_eligible` | |
| Talent directory `/talent` | sign in | explainer | | | | | members of a verified org | | yes | Pg `audience()` (`talent/page.tsx:25`), R `talent_listings` (`20261027151804_earn_talent.sql:113`) | learner, org |
| Contact a listed learner | no | no | | | | | ow, ad, re (verified) | | | R `talent_contact_requests` insert | |
| Create an organisation | sign in | adult | | | | | | | | P, SA, R adult (`...organisations.sql:250`) | |
| Organisation pages `/org/[slug]/*` | sign in | 404 | | | | | active members | | via SQL only | Pg `getOrgForMember` (404 unless active) | org invitee (404) |
| Edit organisation profile | no | no | | | | | ow, ad | | | SA `myRole`, R `organisations` update owner/admin; verification column not granted | org owner, recruiter |
| Invite, change role, remove members | no | no | | | | | ow: any; ad: not owners | | | SA `assignableRoles`, R `organisation_members` (`...organisations.sql:340`) | org admin, recruiter |
| Accept an invitation | | | | | | | inv | | | R `accept_organisation_invite` | |
| Verify organisations | no | no | | | | | no | | yes | Pg, SA `requireAdmin`, R `admin_set_organisation_verification` | org owner (refused) |

### 3.5 Account and admin

| Feature / action | V | L … A | Enforced | e2e |
|---|---|---|---|---|
| Sign up | adults only | | SA `signUp` (`(auth)/actions.ts`), Auth trigger `guard_date_of_birth` (this PR) | under 18 |
| Change date of birth after it is set | | **refused for everyone** | Auth trigger (this PR); support fixes it in SQL | under 18 |
| Profile: own display name, region, headline, phone, public toggle | | own | P, SA, R `profiles` update own; `role` not granted (`20261025100410_profiles.sql:32`) | learner (refused role) |
| Read other people's profiles | public profiles only | public view only | R `profiles` own only; `public_profiles` view (no email or phone) | visitor, learner |
| Settings `/settings` | yes (device only) | yes (saved to profile) | none needed | visitor |
| Notifications | sign in | own | P, R own | |
| Admin area `/admin/*` | sign in | 404 for all but A | P, layout gate, Pg `requireAdmin` on every page (four pages fixed in this PR), SA `requireAdmin`, R `is_admin` | every signed in test |

---

## 4. Findings

Severity: **critical** = a real hole (fixed in this PR); otherwise filed on
milestone "Sprint 3c: Integrate, design, release".

### Fixed in this PR

| # | Finding | Kind | Fix |
|---|---|---|---|
| **S1** | **The age gate trusted user writable metadata.** `private.is_adult` and the proxy read `date_of_birth` from Auth `user_metadata`, which any signed in user can rewrite with `PUT /auth/v1/user` (`supabase.auth.updateUser({ data })`). Verified on the local stack: a 14 year old's account changed its date of birth to 1990 with one call and could then create an organisation (RLS `is_adult` passed). `POST /auth/v1/signup` also accepted an under 18 date of birth directly, skipping the form's check. Violates the hard constraint "under 18s are blocked at sign up" and the adult only market. | Refused in UI, allowed by the Auth API (security hole) | `20261029180000_age_gate_auth_users.sql`: a trigger on `auth.users` for writes made by the Auth server refuses an under 18 or impossible date of birth and any change or removal once one is set. pgTAP `age_gate.test.sql`; e2e "under 18" asserts the form, the direct API sign up and the metadata rewrite are all refused. |
| **S2** | **Layout gates do not stop a page rendering.** `/admin`, `/admin/roadmaps/new`, `/admin/opportunities/new` and `/admin/events/new` relied on the admin layout's gate; Next renders layouts and pages in parallel, so a learner's 404 response still carried those pages' forms. Only static forms (no data), and every action re-checks, so low impact, but it breaks the stated rule that every page checks for itself. | Unprotected admin route (markup only) | Each page now wraps its content in `AdminOnly` (`src/app/(admin)/admin/admin-only.tsx`) or calls `requireAdmin`. e2e asserts the form text is absent for every non admin type. |

### Filed

| # | Finding | Kind | Issue |
|---|---|---|---|
| A2 | Admin header lists every admin section to non admins above the 404 (`admin/layout.tsx` renders `AdminNav` outside the gate). | Over-exposure (names only), looks broken | #245 |
| A3 | `follows` readable in full by every signed in user, including private profiles' follow edges. | Data over-exposure | #246 |
| A4 | Waitlist and analytics `events` inserts are open to the publishable key; the rate limit lives only in the Server Action, so scripts bypass it. | Missing server side re-check | #247 |
| A5 | Skill reviewers (`profiles.role = 'mentor'`) cannot be appointed in the app and `/skills/reviews` has no way in; only admins can review portfolios. | Allowed by RLS, unreachable in UI (broken UX) | #248 |
| A6 | An expert profile can be inserted directly without an application: it can create offers, flips the nav to "Expert dashboard", and never appears in the admin queue. | Refused in UI flow, allowed by RLS | #249 |
| A7 | `cohort_roster` shows classmates' `status` and `deferred_to` to every learner. | Data over-exposure | #250 |
| A8 | `/welcome` re-consent with a different date of birth now fails with a generic error (consequence of S1). | Broken UX | #251 |
| A9 | Refusals are inconsistent (404 vs explainer vs empty page); `/certificates/issue` is a 404 even for an admin when no cohort exists; ten routes have no nav entry. | Inconsistent pattern, orphan routes | #252 |

### Checked and fine

- **Email and phone never leave the owner.** `profiles` is readable only by
  its owner; every people view (`public_profiles`, `cohort_roster`,
  `chapter_roster`, `organisation_roster`, `event_attendees`,
  `talent_directory`, `booking_threads`, the admin queues) selects names,
  avatars and slugs only. Talent contact details are shared only through
  `respond_talent_contact` when the learner accepts. `admin_find_profile_by_email`
  checks `is_admin` first.
- **IDOR on `[id]` routes.** `/bookings/[id]`, `/briefs/[id]`,
  `/cohort/reviews/[reviewId]`, `/cohort/work/[weekId]`,
  `/mentor/learners/[memberId]`, `/mentor/submissions/[id]`,
  `/outcomes/[id]/edit`, `/expert/offers/[id]` (filters `expert_id = me`),
  `/talent/[id]` and `/org/[slug]/*` all read through the user's session, so
  RLS returns nothing for someone else's row and the page 404s. The mentor
  probe is in the e2e.
- **`select("*")`** appears only on views (whose column list is the
  allowlist), on the caller's own rows (`expert_profiles`, `offers`,
  `submissions`) or in admin pages.
- **Service role** is used only in cron routes, the Twilio webhook, content
  generation, path saving, AI review recording and notification fan out, all
  server side and never with a user supplied id that skips a check.
- **Every public RPC** granted to `authenticated` that reads or changes
  someone's data checks `auth.uid()` and the role (60 audited; the rest are
  rate limit and certificate lookups meant for anyone); `mint_achievement`, `notify_user`, `record_ai_review`
  and `set_certificate_badge` are not callable by users at all.
- **Storage** (`submissions` bucket): uploads only into the caller's own
  folder; reads by owner, cohort staff, admins and assigned peer reviewers;
  a file attached to sent work cannot be replaced or deleted.

### Residual risk (founder decision, not a bug)

The date of birth is still **self declared** once: a minor who types a false
date at sign up gets in, as on any site without ID checks. The fix above
stops changes after the fact and API bypasses, not lying. Stronger options
are in `docs/founder-decisions.md` (D1).

---

## 5. Keeping this true

- `e2e/access-matrix.spec.ts` runs in CI with the other journeys (desktop
  project only; access does not depend on the viewport). When you add a role
  area, add an allowed and a refused route and one refused write for the
  affected types.
- New table: RLS in the same migration, column grants for status and role
  columns, pgTAP, and a row in section 3.
- New page in a role area: call the guard in the page (or wrap it in
  `AdminOnly`); never rely on the layout alone.
