# Readiness score v1: model card

Epic #320 step 5, fairness checks issue #328. Status: **staff only, weights
proposed, awaiting founder approval.** Last fairness review: none yet (the
first one is due when the weights are approved; see "Fairness review").

## What it is

A transparent, rule based score from 0 to 100 for each learner against each
track (a published roadmap) they have started a topic in or chosen in About
you. It is not a prediction: there are not yet enough recorded interviews,
offers and hires to learn from. Each score is stored with its parts, so staff
(and later the learner) can see why it is what it is.

- Table: `public.readiness_scores` (one row per learner per track).
- Computed: daily, by `private.refresh_readiness()` inside
  `public.run_analytics_maintenance`. Rows for tracks a learner no longer
  follows are removed on the next run. Mentors and admins are not scored.
- Who sees it: admins only (RLS), at `/admin/readiness` and on
  `/admin/learners/[id]`. Learners do not see their score yet (#337), but
  matching (#336) uses it to order their suggestions and shows them their
  band for an opportunity's track. Employers never see a number or the
  inputs, and see a band only when the learner shares it (see "Matching").

## Inputs and weights

Weights live in one place, `private.readiness_weights()` in
`supabase/migrations/20261114100000_readiness_score.sql`, mirrored in
`src/lib/readiness/score.ts`. A unit test fails if they differ.

| Part | Points | Source | Full marks when |
|---|---|---|---|
| Core skills verified | 40 | `verified_skills` (live) for published skills mapped to the track in `skill_roadmaps`. Skills are earned by a path, a skill quiz or a portfolio review | Every mapped skill is verified |
| Track progress | 25 | `roadmap_progress` done, over the track's required (not optional) topics | Every required topic is done |
| Approved portfolio pieces | 15 | Approved skill portfolios (`skill_assessment_attempts`) for the track's skills, plus programme work graded at or above the pass mark in weeks linked to the track (`program_week_nodes`) | 3 pieces |
| Recent learning | 10 | Days in the last 30 with a topic update, a review, a skill attempt or programme work | 8 days |
| Profile | 10 | 5 for About you goal, career stage and at least one track; 5 for a public profile with a headline | Both |

Each part is proportional between zero and full marks, rounded to one
decimal. **Score** = 100 × points ÷ points available, rounded. Points
available is 100, less 40 when no published skill is mapped to the track yet,
less 25 when the track has no required topics, so a learner is not held back
by a catalogue gap.

**Bands:** Getting started 0 to 39, Building 40 to 69, Job ready 70 to 100.

## Never inputs

Region, device, internet or connection, study hour or study times, age or date
of birth, education and field of study, employment status, experience,
languages, where someone first came from, and the About you work preferences
(ways of working, regions, start date, moving, lowest pay, industries).
Gender, ethnicity, religion, disability and marital status are not collected
at all.

Enforced by `src/lib/readiness/score.test.ts` (the refresh never names these
fields; the only About you fields it reads are goal, career stage and tracks)
and by `supabase/tests/database/readiness_scores.test.sql` (changing a
learner's region, device, internet, study time, education and work
preferences leaves their score unchanged).

## Known limits

- **Not a prediction.** It measures progress on SydCrest, not job
  performance. Revisit after about 200 recorded outcomes.
- **Catalogue gaps.** Tracks with few mapped skills or few portfolio
  assessments are easier or harder to score high on. The skills part is
  dropped when a track has no mapped skills, which makes progress count for
  more on that track.
- **Recent learning is approximate.** A topic only keeps its last update
  time, so going back to an old topic counts once, on its latest day.
- **Proxies remain possible.** Activity and a public profile can still
  follow access to time, data and devices, which is why the fairness report
  checks results by device, internet, region and age.
- **Self chosen tracks.** Listing a track in About you creates a row that
  starts near zero; the report counts each learner once, at their best track,
  for every group except track.

## Fairness review (issue #328)

`/admin/readiness` (`public.admin_readiness_report()`) shows, from the daily
scores:

- the score spread (ten point steps) and band shares overall;
- average score and band shares by region, usual device, internet (About
  you), age band (from the date of birth given at sign up), education (About
  you) and track, with "Not known" for missing answers.

A group is **flagged** when its average differs from its dimension's average
by more than 10 points (`FAIRNESS_GAP`). Groups under 5 learners
(`MIN_SAMPLE`) show "Not enough data yet" and are never flagged. Gender is not
collected, so it cannot be checked.

The score must not be shown to employers or used to rank anyone while a flag
is open and unexplained. Before it ships beyond staff: run the review on the
day, record it below, and explain or fix every flag.

| Date | Reviewer | Learners scored | Flags | Outcome |
|---|---|---|---|---|
| | | | | |

## Changing the score

Change `private.readiness_weights()` in a new migration and `WEIGHTS` in
`src/lib/readiness/score.ts` together, update this card, and add a row to the
review table after the next daily run.

## Matching (issue #336)

Status: **built on the proposed weights, switched off.** Nothing
readiness based reaches learners or employers until a switch is on (see
"Switches" and "Founder decision" below).

**Switches** (server env, read at request time, both off by default; see
`.env.example` and `src/lib/matching/flags.ts`):

- `READINESS_FOR_LEARNERS=on` (shared with My progress, #337): "Why this fits
  you" and "What would improve your fit", and ranking "Suggested for you" by
  match. Off: Suggested keeps the path track order and no fit block shows.
- `READINESS_FOR_EMPLOYERS=on`: the "Share my readiness band" boxes on the
  apply form, My applications and the talent listing, and shared bands on
  the org applicants page and in the talent directory. Off: the boxes are
  hidden (nobody consents to something not live), the apply action stores
  `share_readiness = false`, a listing save leaves the stored choice alone,
  and no page calls `org_applicant_readiness` or shows `talent_directory.readiness`.
- `/admin/matching` is available to admins either way.

The columns and database functions exist regardless; only the UI is gated.

**Match score** per learner per opportunity = the learner's best readiness
score among the roadmaps of the opportunity's tracks (`roadmaps.track`, or a
roadmap slug), plus **5 points for each required skill they have verified**,
capped at 100. The bonus lives in `private.match_weights()` in
`supabase/migrations/20261114900000_matching.sql`, mirrored in
`src/lib/matching/match.ts` (a unit test keeps them equal).

**Required skills** (`private.opportunity_required_skills`): the skills the
listing names that are in the published SydCrest catalogue, matched by name
or slug ignoring case. Opportunity skills are free text, so when a listing
names none from the catalogue, the skills mapped (`skill_roadmaps`) to the
roadmaps of its tracks count instead. When neither exists, the match is
track readiness only, and the learner sees only their band and the next
step.

**What it does:** it orders "Suggested for you" on `/opportunities` for a
signed in learner, best fit first. It never hides a listing: the board lists
every open opportunity in the same order for everyone (it is cached and
public). A learner with no readiness for the tracks and no matching verified
skill has no match score and sorts after those with one.

**Learner view:** on suggested cards and the opportunity page, "Why this fits
you" (the verified skills that match, and the readiness band for the track)
and "What would improve your fit" (the next required skill to verify, else
the next topic in the track's roadmap, else starting the track). Never a
number. Read through `public.my_match_readiness()` (own rows only); learners
still cannot select `readiness_scores`.

**Employer view, only with consent:**

- Applications: `opportunity_applications.share_readiness`, a box on the
  apply form, off by default; the learner can turn it on or off later on My
  applications (`public.set_application_readiness_sharing`). The org
  applicants page then shows the band for the opportunity's track, the
  required skills the applicant verified, and their approved portfolio
  pieces for that track (`public.org_applicant_readiness`, consenting
  applicants only, for people who manage the applications).
- Talent directory: `talent_listings.share_readiness`, a box on the listing,
  off by default. `talent_directory.readiness` lists the band (and approved
  portfolio pieces) for up to three tracks, empty unless shared.
- Never shown to employers: the score, its parts, About you answers or pay.

**Admin audit** (`/admin/matching`): `public.admin_match_audit()` per
opportunity by band, and `public.admin_match_fairness()` by the readiness
fairness groups (region, usual device, internet, age band, education) plus
band. "Shown" means a signed in learner opened the listing
(`opportunity_viewed`) or applied; shortlisted counts shortlisted, interview,
offer and hired. Rates: applied of shown, shortlisted and hired of applied.
A rate needs 5 cases (`MIN_SAMPLE`); a group is flagged when a rate differs
from its dimension's rate by more than 10 points (`MATCH_RATE_GAP`).

**Known limits**

- Bands in the audit are today's, not the band when the learner was shown or
  applied. A stamped band (for example a `match_band` prop on
  `opportunity_viewed` and `opportunity_applied`, as the tracking plan
  proposes) is a follow up.
- Views older than 13 months are purged with raw events, so "shown" covers
  the last 13 months; applications are kept.
- Readiness already counts verified track skills, so a skill named on the
  listing and mapped to the track counts twice. Intended: the bonus rewards
  the skills this employer asked for.
- Free text skills only match the catalogue by exact name or slug.

**Founder decision.** The readiness card above says the score must not be
shown beyond staff or used to rank anyone until the weights are approved and
the fairness review is recorded. So both switches stay off. Turning on
`READINESS_FOR_LEARNERS` lets learners see their band and a ranked list;
turning on `READINESS_FOR_EMPLOYERS` lets learners opt in to employers seeing
their band. Approve the weights (and the 5 point skill bonus) and record the
review first.
