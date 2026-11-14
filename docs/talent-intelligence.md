# Talent intelligence: design (draft for founder review)

Status: proposal, 14 November 2026 (updated the same day with employer
assessments, international remote employers, the market research brief and
the employer interview guide). Replaces the idea of a single readiness
score (v1 in `docs/readiness.md`, staff only) with four connected parts:
evidence of ability, the labour market, a predictive model, and personal
growth guidance, plus employer tooling and positioning for international
employers. Nothing here is built yet. Founder decisions are listed at
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
- **International remote market:** remote postings open to candidates in
  Ghana, tracked as their own market with their own demand and pay bands
  (section 12).
- **Commonly requested assessments** per role (section 11).

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
- `assessment_requests` and `assessment_shares` (section 11)

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
| Research (now, in parallel) | Market research brief and employer interviews (sections 13 and 14) | Go or no-go on international employers; first segment and price chosen |
| P2b Employer assessments (after P1) | Assessment library, request flow, scorecards, assess once and share many | Fairness gates pass on every assessment; local norms checked for work style |
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
  Personality assessments and cross-border sharing with overseas employers
  are covered by the same registration.
- **Price pressure.** International buyers may treat Ghana as a low-cost
  market. We publish fair-pay ranges and sell on evidence, not on price.

## 11. Employer-requested assessments

Employers who want to proceed with a candidate often ask for more checks
first: a skills test, a take-home task, a structured interview, or a
personality or work-style assessment. Today this happens off the platform,
so we lose the signal and candidates repeat the same tests for each employer.
Tracked in #357.

### Employer tooling

- **Assessment library:**
  - skills tests from our calibrated item banks (Part A);
  - work-sample tasks;
  - situational judgement tests ("what would you do if…");
  - structured interview kits per role;
  - a validated work-style questionnaire.
- **Request flow:** choose an assessment for a shortlisted candidate, set a
  deadline, see a scorecard and compare candidates side by side.
- **Custom take-home tasks** graded against the employer's own rubric, AI
  assisted and confirmed by a person.
- **Feedback for every candidate,** whatever the outcome.

### Learner side

- **Assess once, share many.** Results belong to the learner and can be
  reused across employers with consent.
- Results are visible to the learner. Retakes are allowed after a cooldown,
  and accommodations are available on request.
- **Low data delivery.** No webcam proctoring. Integrity comes from item
  banks, time limits and a follow-up "explain your answer".

### How it feeds the recommendation systems

- Skills test and task results become evidence in `competency_mastery`.
  Employer-set tasks carry a high weight.
- A new pipeline stage between shortlist and interview: assessment
  requested, then completed or passed. This gives Part C more labels.
- Role profiles (Part B) record which assessments employers commonly ask
  for. The next best action (Part D) prompts learners to complete them in
  advance.

### Guardrails on personality and work style

- **Validated, job-relevant instruments only,** for example the
  public-domain IPIP Big Five or HEXACO items. No MBTI.
- **Prefer situational judgement tests.** They are harder to fake and more
  predictive of job performance.
- **Never a ranking feature and never a sole cut-off.** Shown to employers
  only with consent, and always next to evidence of ability.
- **Local norms first.** Check scores on Ghanaian test-takers before showing
  any percentile.
- **Fairness gates apply.** The four-fifths check runs on every assessment
  that affects progression.
- **Act 843:** this is profiling, so it needs consent, an explanation and
  human review. It is covered by the DPC registration.

Tables: `assessment_requests` (opportunity, application, assessment,
deadline, status), `assessment_shares` (learner, result, employer, consent
given and withdrawn).

## 12. International remote employers

Positioning for international HR clients hiring from Ghana for remote
roles. Tracked in #358. This is a working position to test with the
research in section 13, not a conclusion.

### Positioning

Early-career remote talent with evidence of what they can do, working in
your time zone, and supported after the hire. Not "cheap talent".

### Who we sell to first

| Buyer | Why they fit | Priority |
|---|---|---|
| UK and EU small and mid-sized firms and startups | Ghana is on UTC+0: a full working-day overlap with the UK and nearly full with the EU. English is the working language | First |
| US startups | Real demand, but only about 4 to 5 hours of overlap with US Eastern. Better for async roles | Second |
| Staffing agencies and recruitment outsourcers | Need a steady supply of screened candidates. Volume channel | Partner |
| Support and operations outsourcers | Large volume, but low pay and price pressure | Caution |

### Buyer worries and our answers

| Worry | Our answer |
|---|---|
| Can they do the job? | Graded work samples, mastery with confidence, mock interviews (Part A) and employer-requested assessments (section 11) |
| Will they be reliable? | Work behaviours (on-time and turn-up rates, responsiveness) and a check of each person's power and internet setup |
| Can they work remotely? | A new remote-work competency: async writing, standard tools, self-management |
| How do we hire and pay legally? | Employer-of-record partners and contractor routes, plus a one-page guide to hiring in Ghana. We do not run payroll at first |
| Will they stay? | Mentoring after the hire, and outcome check-ins at 3 and 6 months |

### Where we fit

- **Senior vetted networks** (such as Andela, Turing and Toptal) lean
  towards experienced engineers.
- **Open marketplaces** (such as Upwork) do little vetting.
- **Local job boards** do not reach international buyers.
- **The gap:** verified, mentored junior-to-mid talent. That is our learner
  base.

### Pricing to test

- A placement fee with a replacement guarantee (recruitment norms are
  roughly 10 to 20% of first-year pay).
- Paid shortlists or a subscription for agencies that hire often.
- Referral fees from employer-of-record partners.
- Employer assessments (section 11) as an add-on or inside the placement
  fee.
- Published fair-pay ranges, so we do not compete on price alone.

### Design changes

- **Part B:** international remote postings become their own market, with
  their own demand index and pay bands.
- **P4 employer view:** a consented, shareable evidence profile written for
  overseas HR.
- **Act 843:** cross-border transfer consent, included in the DPC
  registration.
- **Pairwise judgements:** recruit 3 to 5 international employers. This also
  starts the sales pipeline.

## 13. Market research brief

### Objective

Decide whether, and how, to sell SydCrest talent to international employers
hiring remotely, before building employer tooling for them.

### Decisions this research informs

1. Which buyer segment to serve first.
2. Which roles and levels to lead with, and whether the pilot tracks fit.
3. The pricing model and price points.
4. Which assessments and evidence buyers need before they will hire.
5. Which employer-of-record and payment partners to work with.

### Hypotheses to test

| # | Hypothesis | Evidence that would disprove it |
|---|---|---|
| H1 | UK and EU small firms hire junior remote staff in data, marketing and frontend roles | Few such postings; hiring managers say they only hire mid or senior remotely |
| H2 | Their main barrier is trust in ability and reliability, not cost or legal set-up | Interviewees rank legal, payroll or tax ahead of ability and reliability |
| H3 | Graded work samples beat CVs and certificates as evidence for them | Interviewees prefer credentials or their own tests regardless |
| H4 | They will pay a placement fee with a guarantee | Strong preference for a subscription, or unwillingness to pay any fee |
| H5 | Employer-of-record services make hiring in Ghana easy enough | The cost or friction is a deal breaker, or coverage is limited |
| H6 | Time-zone overlap is a real advantage over other regions | Buyers do not mention it, or rank it low |
| H7 | Buyers ask for extra tests before an offer, and would use ours if trustworthy | Buyers insist on their own vendors and refuse shared results |

### Questions and sources

| Question | Sources |
|---|---|
| How much demand is there for remote junior roles in our tracks? | Remote job boards with public APIs or feeds; counts by role, level and stated region eligibility over 8 weeks |
| What do comparable roles pay? | Pay stated in remote postings; published salary surveys; employer-of-record cost calculators |
| Who competes, at what price, with what promise? | Websites, pricing pages and public reviews of vetted talent networks, marketplaces, African talent platforms and recruitment agencies |
| What does hiring in Ghana cost and involve? | Employer-of-record providers' Ghana pages and quotes; Ghana Revenue Authority and SSNIT guidance for contractors |
| What assessments do employers use? | Interviews (section 14); public pages of assessment vendors |
| What do our learners need to accept remote offers? | A short learner survey: equipment, power backup, internet, payment methods, preferred hours |

We use only permitted sources and never scrape against a site's terms.

### Method

- **Desk research,** weeks 1 to 2: demand counts, pay, competitors, employer
  of record.
- **Employer interviews,** weeks 1 to 4: 10 to 15 conversations of 30 to 40
  minutes. Mostly UK and EU hiring managers and HR leads at firms with 10 to
  500 staff. Include 2 to 3 US startups and 2 to 3 staffing agencies.
- **Learner survey,** week 2: our current members and chapter contacts.
- **Synthesis,** week 5: score each hypothesis as supported, mixed or
  refuted, with quotes and counts.

### Recruiting interviewees

- Founder and partner networks, sponsors and existing employer partners.
- LinkedIn outreach to hiring managers who have posted remote roles in our
  tracks.
- Offer a summary of the findings in return. No payment at this stage.

### Outputs

- A findings report: each hypothesis scored, with evidence.
- A one-page go or no-go recommendation, with the first segment, roles,
  price and partners.
- A buyer persona for the first segment.
- Updated priorities for sections 11 and 12 and for Part B.

### Budget and owner

- Founder time for the interviews, about 10 hours. Claude prepares the desk
  research, interview notes and synthesis.
- No paid tools are required. Employer-of-record quotes are free.

## 14. Employer interview guide

30 to 40 minutes, recorded only with consent. Ask about real past
behaviour, not opinions about SydCrest. Show nothing until the last part.

### Opening (5 minutes)

1. What does your company do, and how big is the team?
2. What is your role in hiring?
3. In the last 12 months, which roles have you hired remotely, and from
   which countries?

### The last remote hire (10 minutes)

1. Walk me through the last time you hired someone remotely, from need to
   start date.
2. Where did candidates come from, and how many did you look at?
3. What did you check before making an offer? Which tests, tasks or
   interviews?
4. Did you use any personality or work-style assessment? Why, and did it
   change a decision?
5. What went wrong or took longest?
6. How did you contract and pay them? Employer of record, contractor, or
   something else?

### Junior hires and Africa (10 minutes)

1. Do you hire junior people remotely? If not, why not?
2. Have you hired, or considered hiring, from Ghana or elsewhere in Africa?
   What happened?
3. What would worry you most about hiring a junior person from Ghana? Rank
   your top three.
4. What evidence would remove that worry? Ask them to be specific.
5. How much working-hours overlap do you need?

### Evidence and assessments (5 minutes)

1. If a candidate came with graded work samples and a skills profile, how
   would you use it?
2. Would you trust results from tests we run, or would you need your own?
3. Which extra checks would you want after the shortlist? Skills test,
   take-home task, structured interview, work style, references?

### Money (5 minutes)

1. What did your last hire cost you, in fees and time?
2. Which do you prefer: a placement fee, a subscription, or paying per
   shortlist? Why?
3. What guarantee would make a placement fee easy to agree to?

### Close

1. Is there anything I should have asked?
2. Who else should I speak to?
3. May we share our findings with you, and contact you about a pilot?

### Notes for the interviewer

- Record the answers as they were said. Note the exact words for worries
  and for anything they would pay for.
- After each interview, score H1 to H7 as supported, against, or not
  covered.
- Show the SydCrest concept only at the end, if there is time, and record
  the reaction separately from the earlier answers.

## 15. Founder decisions

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
8. Employer assessments: a paid add-on, or included in the placement fee?
9. Work-style questionnaire: build on public-domain items, or license one?
10. Approve the research in section 13, and give the founder time for 10 to
    15 employer interviews.
11. The first international segment to test. Proposed: UK and EU small and
    mid-sized firms.
