# Readiness score v1: model card

Epic #320 step 5, fairness checks issue #328. Status: **staff and the
learner themselves (My progress, #337); weights proposed, awaiting founder
approval.** Last fairness review: none yet (the
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
- Who sees it: admins (RLS), at `/admin/readiness` and on
  `/admin/learners/[id]`; and each learner, their own rows only, on
  `/progress` (#337: the band, each part's points and the next steps with the
  biggest gain, worded kindly and never compared with anyone). Employers
  never see a number or the inputs, and will see a band only with consent;
  matching (#336) does not use it yet.

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
