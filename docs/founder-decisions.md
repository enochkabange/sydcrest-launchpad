# Founder decisions: access and UX rules

> **Decided 28 October 2026:** the founder accepted every recommendation below
> (D1 to D9) as written. Build to the recommendation; the options stay for the
> record.

Rules the code cannot settle on its own, found while writing
`docs/user-types.md` and `docs/page-guide.md` (issue #240). Each has the
options, what the code does today, and a recommendation. Answer on #240 or in
a new issue; the agent that builds it updates the docs and
`e2e/access-matrix.spec.ts` with the answer.

---

### D1. How sure must we be that someone is 18 or over?

**Today.** A self declared date of birth at sign up (or on `/welcome` for
Google). Since #240 the Auth layer refuses an under 18 date and any later
change, so the only way in for a minor is to lie on the form.

| Option | Cost | Effect |
|---|---|---|
| a. Self declared, locked after sign up (today) | none | Stops changes and API bypasses, not lying |
| b. Add a confirmation checkbox ("I confirm I am 18 or over") | trivial | A clearer record for the Data Protection Act; same strength |
| c. ID check (Ghana Card) before the market only (selling, booking, organisations) | provider, cost per check, privacy policy changes | Real assurance where money and strangers meet |
| d. ID check for everyone at sign up | high friction at the registration gate | Hurts Phase 1 sign ups badly |

**Recommendation: b now, c when payments go live** (it lines up with the KYC
tiers in PRODUCT_ENRICHMENT §8, which need ID for payouts anyway).

### D2. Are under 18s blocked everywhere, or only in the market?

**Today.** AGENTS.md says under 18s are blocked at sign up, and the code does
that. PRODUCT_ENRICHMENT §4.7 says minors are barred from the expert market
but **are** served on the learning side, and the DMP serves beginners who
may be young; `programs.min_age` exists, but no guardian consent machinery has been rebuilt in this codebase.

| Option | Effect |
|---|---|
| a. Keep the full block (today) | Simple, safe; turns away 16 and 17 year olds from free roadmaps and the DMP |
| b. Allow 16 and 17 for learning only, with guardian consent; keep the market, organisations, talent directory and public profiles adult only | Matches the enrichment spec; needs a guardian consent flow, an `is_minor` profile flag, privacy policy changes and legal review |

**Recommendation: a until the privacy policy and terms are approved (#60)
and the January pilot has run; revisit b for the second cohort.** The
`is_adult` checks already make b safe to add later.

### D3. Who reviews portfolios for verified skills?

**Today.** RLS allows `profiles.role in ('mentor','admin')`, but nothing can
set `mentor`, so only admins review (#248).

| Option | Effect |
|---|---|
| a. Admins only (today, by accident) | Founder bottleneck |
| b. Admin appointed skill reviewers (a "Make reviewer" action on a profile) | Controlled, small trusted group |
| c. Every active cohort mentor reviews automatically | More reviewers, but cohort mentors are DMP specialists and may not know the skill |
| d. Approved and verified experts with the matching skill | Scales with the market; needs skill matching |

**Recommendation: b now, d later.** Ship the admin action and a "Your work"
entry; add verified experts once there are enough of them.

### D4. Who can issue a certificate when the mentor is away?

**Today.** Cohort staff (mentor or coordinator) of the learner's cohort and
admins (`issue_certificate`). PRODUCT_ENRICHMENT §4.2 lists this as [OPEN].

**Recommendation: keep today's rule** (coordinator or platform admin as the
backup) and close the [OPEN] item.

### D5. What do we call the two kinds of mentor?

**Today.** "Mentor" is a cohort staff role (`/mentor`, "Mentor console") and
also the name of the marketplace tab (`/mentors`), whose directory is called
"Experts" (`/experts`) and whose sellers have an "Expert dashboard"
(`/expert`). Five near identical routes, two meanings (page guide problem 5).

| Option | Tab | Directory | Seller tool | Cohort staff tool |
|---|---|---|---|---|
| a. Today | Mentors | Find experts | Expert dashboard | Mentor console |
| b. Market is "mentors" | Mentors | Find a mentor | Your mentor page | Cohort console |
| c. Market is "experts" | Experts | Find an expert | Expert dashboard | Mentor console |

**Recommendation: c.** "Mentor" then means one thing (the DMP volunteer
mentor, as in the programme name), and the market keeps the word it already
uses in URLs, pages and the schema. The phone tab label changes from Mentors
to Experts.

### D6. What does someone see on a page that is not for them?

**Today.** Mixed: 404, an explainer, or an empty page (#252).

**Recommendation:** staff and admin tools 404 (they stay unlisted); anything
a person could become (expert, organisation, cohort learner, talent listing)
explains in one card with one action; empty states always fill their slot
and say honestly what is coming.

### D7. Is the follow graph public?

**Today.** Every signed in user can read every follow, including private
profiles' (#246).

| Option | Effect |
|---|---|
| a. Only the follower and the followed see a follow; public pages show counts | Most private |
| b. Follows between two public profiles are visible to signed in users; anything touching a private profile is visible only to the two people | Keeps "who follows whom" for public learners (a growth loop) |

**Recommendation: b.**

### D8. Does Home adapt to roles, and do supply roles get their own place?

**Today.** Home is roadmap centred for everyone; mentor, expert, lead, host,
organisation and reviewer tools sit inside learner hubs (page guide problems
2 and 6).

**Recommendation:** yes to both: a role aware "Next up" on Home and a "Your
work" group (sidebar and avatar menu) shown only to people with a supply
role. This is the biggest structural input to the Claude Design brief (#195).

### D9. Should the home page lead with the path quiz?

**Today.** The hero buttons are "Create a free account" and "Sign in"; the
quiz is in the footer (page guide problem 1).

**Recommendation:** yes. The quiz plus the results gate is the Phase 1 lead
capture mechanic; make "Find your starting point" the hero primary and
"Browse roadmaps" the secondary.
