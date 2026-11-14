# Talent intelligence: design (draft for founder review)

Status: proposal, 14 November 2026. Replaces the idea of a single readiness
score (v1 in `docs/readiness.md`, staff only) with four connected parts:
evidence of ability, the labour market, a predictive model, and personal
growth guidance. Nothing here is built yet. Founder decisions are listed at
the end.

## 1. What we are trying to answer

For each learner, and for each real opportunity:

1. **What can this person actually do, and how sure are we?**
2. **What does the market want right now, in Ghana and remotely?**
3. **How likely is this person to be shortlisted, hired and to do well, for
   this role?**
4. **What is the single best next step to close the gap, and how long will
   it take?**

A weighted sum of activity cannot answer any of these well. The answers need
direct evidence of ability, a model of demand, a model fitted to outcomes,
and a planner that connects them.

## 2. Principles

- **Evidence over activity.** Logging in, ticking topics and filling in a
  profile prove little. Graded work, assessed answers and real outcomes count.
- **Every number has a confidence.** Thin evidence is shown as thin.
- **Explainable to the learner.** Every judgement breaks down into
  competencies and evidence a person can see and act on.
- **Fair by construction and by test.** Protected and proxy attributes are
  never inputs. Every release is tested for unequal outcomes before it ships.
- **Humans decide hiring.** Models rank and explain. They never reject
  anyone automatically, and employers see evidence only with the learner's
  consent.
- **Built for Ghana.** Phone first, low data, Ghanaian employers and pay.
  Remote work counts as a market too.
- **Lawful.** Act 843: profiling needs Data Protection Commission
  registration, consent, the right to an explanation and the right to a human
  review.

## 3. Part A: evidence of ability

### Competency frameworks

Each track gets a competency map, for example Data Analyst: SQL, spreadsheets,
data cleaning, statistics basics, visualisation, stakeholder communication.
Each competency has four levels (aware, working, independent, expert) with
observable indicators. We draft them from SFIA, O*NET and real Ghanaian
vacancies (Part B), then review them with two or three employers per track.

Tables: `competencies` (track, key, title, indicators per level),
`competency_skills` (mapping to the existing skill catalogue and roadmap
topics).

### Assessment types

| Type | What it shows | How it is graded |
|---|---|---|
| Adaptive quizzes | Knowledge, misconceptions | Item response theory. Each question's difficulty and discrimination are calibrated from `quiz_question_answered` (already collected) |
| Work samples | Can do the job: a cleaned dataset, a landing page, a campaign plan | Claude Sonnet 5.5 against a written rubric, citing evidence per criterion. 10% are double marked by a human. A calibration set is re-graded on every prompt change. Learners can appeal |
| Scenario tasks | Judgement: a messy brief, a difficult client message | Rubric graded as above |
| Written answers | Communication: clarity, structure, tone | Rubric graded, with the reasoning shown to the learner |
| Mock interviews | Interview readiness | Text or voice notes (low data). AI rubric feedback for practice. Human review before anything reaches an employer |
| Mentor and peer ratings | Collaboration, professionalism, initiative | Many-facet Rasch. Each rater's strictness is estimated and corrected |
| Real outcomes | Proof in the world: gigs, hires, employer feedback | Verified outcomes (existing) and employer feedback (new) |

**Integrity:**
- Questions are drawn at random from banks.
- Tasks are timed and scenario-based.
- A short follow-up asks the learner to explain their own submission.
- Portfolio authorship is spot-checked.
- AI tools are allowed where the job allows them, but the learner must say
  so, and the follow-up checks they understand their work.

### Mastery model

For each learner and competency:
- **The estimate:** a Bayesian estimate of level, with a mean and an
  uncertainty, updated by every piece of evidence.
- **Evidence weights:** a graded work sample counts more than a quiz. An
  employer-verified outcome counts most.
- **Time decay:** older evidence fades (a half-life of about 6 months)
  unless it is refreshed.
- **Shown as:** level plus confidence: "SQL: independent (strong
  evidence)", or "Visualisation: working (early evidence)".

Table: `competency_mastery` (profile, competency, mean, sd, evidence_count,
last_evidence_at, updated daily and on new evidence).

## 4. Part B: the labour market

### Sources

These are permitted sources only. We never scrape against a site's terms.

1. Opportunities posted on SydCrest and their full application pipeline
   (#310): who was shortlisted, interviewed and hired, for what.
2. Partner employer feeds (CSV or API) from organisations in the sponsor and
   employer programme.
3. Public job boards that offer feeds or APIs, and remote job boards with
   public APIs.
4. Official statistics: Ghana Statistical Service labour force reports, for
   sector and region context.
5. Pay data, from vacancies that state pay and from outcome check-in
   earnings bands (aggregated, five or more people only).

### Pipeline

Ingest, de-duplicate, then extract with Claude Haiku 5.5 into the competency
taxonomy (role, competencies and level, location or remote, pay band,
seniority). Humans spot-check a sample, and then we aggregate.

**Outputs:**
- **Demand index:** per competency, role and region, by month, with the trend.
- **Role profiles from real vacancies:** what a "junior data analyst in
  Accra" job actually asks for.
- **Pay bands per role and region**, shown honestly as ranges.
- **Employer patterns from our own pipeline:** which evidence leads to a
  shortlist.

These feed Part C (features), Part D (what to learn next), the content team
(which tracks to build) and sponsor reports.

Tables: `market_postings` (source, raw and extracted fields, dedupe key),
`market_demand` (competency, role, region, month, count, trend),
`market_pay` (role, region, band, n).

## 5. Part C: the predictive model (from day one)

### The problem

We have few outcomes today. A model trained only on outcomes would be noise
for months. A day-one model therefore starts from an expert prior and learns
as outcomes arrive.

### Design

- **Targets, in stages:**
  - P(shortlisted | applied), the most frequent label;
  - P(interview | shortlisted);
  - P(hired);
  - P(still employed at 3 and 6 months), from the outcome check-ins;
  - employer feedback, which is rare but strong.
- **Features:**
  - competency fit to the vacancy's profile (mastery mean and uncertainty
    against the required levels);
  - evidence strength;
  - work behaviours (on-time rate, turn-up rate, persistence,
    responsiveness);
  - preference fit (availability, work style, location);
  - market demand for the role;
  - recency.
- **Never features:**
  - region, device, connection, age, gender, education level and study hour;
  - proxies for these, checked by the fairness tests.
- **Model:**
  - a Bayesian logistic model per stage, whose prior is the expert rules
    (Part A competency fit plus behaviours);
  - with little data it behaves like the rules, and with more data the
    evidence takes over;
  - a learning-to-rank model (gradient boosted trees) for ordering
    opportunities and candidates, once there are several hundred
    application outcomes.
- **Cold start:** the expert prior, plus pairwise judgements from employers
  ("which of these two would you shortlist?"). These are cheap to collect and
  very informative.
- **Calibration and validity:**
  - reliability curves, so that "60%" means about 60%;
  - predictive validity reported per release;
  - shadow mode first: score everything, show nothing, and compare with
    what happens.
- **Experiments:** ranking changes go through the experiments framework
  (#327), with holdouts.

### Fairness gates (every release)

- **Adverse impact:** the four-fifths rule on shortlist and hire rates by
  region, device class, age band and self-reported gender. Self-reported
  gender is a new, voluntary field used only for this test, never as an
  input.
- **Error parity:** gaps in calibration and false-negative rates across
  groups stay under agreed thresholds.
- **Fix before release:** if a gate fails, we reweight or constrain and
  retest.
- **Model card:** each release gets one, recorded in the docs.

### Where it runs

- **Training:** a weekly Python job (a GitHub Action) on a de-identified
  extract.
- **Scoring:** the resulting model is stored as a small JSON file and scored
  in TypeScript or SQL, with no ML service to host.
- **Versioning:** model versions are kept in `model_versions`, with their
  metrics.

## 6. Part D: personal growth guidance

For each learner, on My progress and in Study Buddy:

1. **Target roles.** From their About you goal, their tracks and the demand
   index, two or three realistic roles with pay ranges.
2. **Gap analysis.** Their mastery against each role's profile, as a short
   list of gaps, each with its confidence.
3. **Next best action.** The step with the largest expected gain in fit for
   the target role per hour of effort. It weighs the predicted mastery gain
   from the content, demand weight, and the learner's own pace and weekly
   time budget. Examples: "Do the SQL joins work sample", "Apply to these two
   internships now", "Book a mock interview".
4. **Time to job ready.** A forecast range from their pace and gap, revised
   every week.
5. **Opportunities now.** Ranked by Part C, each with why it fits and what
   would improve the fit (#336).
6. **Adaptive nudges.** Timing and channel adapt to their study rhythm, and
   are tested with holdouts.
7. **Coaching.** Study Buddy receives this plan as context, so it can coach
   towards the goal. Mentors see the same plan in their caseload.

## 7. Data model summary

New tables:
- `competencies` and `competency_skills`
- `assessments` and `assessment_attempts` (rubric scores and grader
  reasoning)
- `rubrics`
- `competency_mastery`
- `rater_calibration`
- `market_postings`, `market_demand` and `market_pay`
- `role_profiles`
- `model_versions` and `predictions` (shadow scores)
- `learner_plans` (targets, gaps, next actions, forecast)

All follow the existing rules: RLS, admin definer functions, pgTAP tests, and
the event taxonomy for every new action. A learner can export and delete all
of it.

## 8. Rollout, with gates

| Phase | What | Gate before the next phase |
|---|---|---|
| P0 Foundations (about 2 weeks) | Competency maps for three pilot tracks (data, digital marketing, frontend), item calibration job, market ingestion from our own and partner postings | Employers sign off the maps |
| P1 Evidence (3 to 4 weeks) | Work samples with AI rubric grading and human double marking, mastery model, learner competency profile (replaces readiness v1 internally) | AI against human grading agreement above 0.8 (weighted kappa) on the calibration set |
| P2 Guidance (2 to 3 weeks) | Target roles, gap analysis, next best action and time-to-ready forecast on My progress and in Study Buddy | Learners find it useful in a pilot cohort (feedback and return rate) |
| P3 Prediction, shadow (from P1) | Bayesian staged model scoring in shadow; pairwise judgements from employers | Calibration acceptable; every fairness gate passes |
| P4 Prediction, live | Staff first, then learner-facing ranking, then employer view with consent | DPC registration done; consent flows live; model card published |

## 9. Costs (estimates to confirm in P1)

- **AI grading:** one Sonnet call per work sample with prompt caching of the
  rubric, low cents per submission. Double marking is human time.
- **Market extraction:** Haiku per posting, a fraction of a cent.
- **Training:** free on GitHub Actions minutes at our scale.
- **People:**
  - employer reviews of the competency maps;
  - human double marking, about 10% of work samples;
  - founder time for decisions and the DPC registration.

## 10. Risks

- **Small data.** The model stays close to the expert prior for months. We
  must say so plainly and not oversell the predictions.
- **AI grading bias or drift.** Guarded by the calibration set, human double
  marking, appeals and monitoring.
- **Gaming.** Item banks, follow-up questions and authorship checks. The
  value is in real work, which is harder to fake.
- **Low bandwidth.** Mock interviews use text or voice notes, not video.
- **Market data coverage.** Ghanaian postings are scattered. Partner feeds
  matter more than public boards.
- **Legal.** Profiling requires DPC registration before Part C goes live.

## 11. Founder decisions

1. The three pilot tracks for P0. Proposed: Data Analyst, Digital Marketing,
   Frontend.
2. Which employers review the competency maps, and which give pairwise
   judgements.
3. Collect self-reported gender, voluntary and used only for fairness
   testing? Without it we cannot check gender fairness.
4. Mock interview format: text, voice notes, or both.
5. Can AI-graded results count towards verified competencies straight away,
   or only after human confirmation during the pilot?
6. Start the Data Protection Commission registration now (needed before P4).
7. Readiness v1 stays staff only and is retired when P1's competency profile
   lands.
