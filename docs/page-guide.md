# Page by page UX guide

What every route in `src/app` is for, who it is for, what it should show
first, and what should go. Written for issue #240 as the main input to the
Claude Design brief (#195): the brief should take each page's **one job**,
**priority order** and **cut / move / collapse** line as decisions, not
suggestions. Access rules per user type are in `docs/user-types.md` (type
codes T1 to T18 below come from there); open questions for the founder are in
`docs/founder-decisions.md`.

Written from the code on `main`, 28 Oct 2026. `/programme` is described as it
will be after #239 (a lean three phase page plus `/programme/curriculum`).

---

## The top 10 UX problems, ranked by impact

Impact = how many people hit it × how close it sits to the moment that
matters (sign up, first lesson, applying, getting paid work).

1. **The home page does not offer the product's front door.** The marketing
   home hero's two buttons are "Create a free account" and "Sign in". The path quiz
   (`/start`, the Phase 1 lead capture mechanic, PRODUCT_ENRICHMENT §3.2 to
   3.3) and the free roadmaps are not linked from the hero at all, and the
   "One path, three stages" lanes are not links and are stale: "Get mentored:
   Opening in 2027" and "Earn: On our roadmap" while `/experts`,
   `/opportunities` and briefs are live in the soft launch. **Decision:** hero
   primary "Find your starting point" → `/start`, secondary "Browse roadmaps";
   sign in moves to the header; each lane becomes a link with a live status.
2. **Home after sign in is role blind.** `/dashboard` shows the same
   roadmap centred page to a self serve learner, a cohort learner with an
   assignment due, a mentor with work to grade, an expert with new booking
   requests and an organisation owner with contact replies. None of their
   waiting work appears on Home. **Decision:** Home's main column becomes a
   "Next up" stack fed by every role the person has (this week's assignment,
   peer review to give, work to grade, booking requests, invitations, talent
   contact requests, review due), roadmaps below it; the rail keeps path,
   plan, leaderboard, community.
3. **Three of the four phone tabs open a menu, not content.** `/learn`,
   `/mentors` and `/earn` are 9 line `HubPage` grids of the same links the
   sidebar already shows; Community opens the feed. Every first tap into an
   area costs a second tap, and the desktop sidebar plus the hub repeat each
   other. **Decision:** each hub becomes an overview with the person's state
   in it (Learn: continue lesson, cohort week, review due; Mentors: your
   bookings and briefs, then find experts; Earn: matched opportunities, saved,
   outcome prompt), with the destination strip (`HubStrip`) on top, as the
   Community tab already does.
4. **The programme journey has no spine.** A person goes `/programme` →
   `/programme/apply` (no nav entry of its own) → waits with no status anywhere
   in the app except the apply page → `/cohort` (an explainer until accepted)
   → `/cohort/week/[n]`, `/cohort/work`, `/cohort/reviews` → `/certificates`.
   **Decision:** `/cohort` is the one state aware home for the programme:
   not applied (apply inline or one button), applied (status, what happens
   next), accepted (orientation), running (this week), finished
   (certificate). `/programme/apply` stays as the form only.
5. **Five routes one letter apart serve opposite sides.** `/mentors` (a hub),
   `/mentor` (cohort staff console), `/experts` (the public directory),
   `/expert` (my expert dashboard), `/experts/apply`. The tab is "Mentors" but
   the directory says "Experts", and a cohort "mentor" is a different thing
   from a marketplace "expert". **Decision:** see founder decision D5. Proposed:
   the tab becomes "Mentors", the directory "Find a mentor" (`/experts`
   keeps its URL), the supply side tools move to a "Your work" group.
6. **Supply side people have no home.** Mentors, experts, chapter leads,
   event hosts, organisation members and skill reviewers find their tools as
   the fourth to sixth item inside a learner hub, in a rail
   (`/community/moderation`), on an event page (host tools), or nowhere
   (`/skills/reviews`). **Decision:** a "Your work" section at the top of the
   sidebar and avatar menu, shown only to people with a supply role, listing
   each tool with a count (to grade, requests, reports, contact requests).
7. **One topic, three pages.** A roadmap topic is a panel over the roadmap,
   a public topic page `/roadmaps/[slug]/[node]` (summary and a "Start
   learning" button) and the signed in lesson `/learn/[slug]/[node]`
   (explanation, practice, checkpoint). Signed in learners land on the public
   page from search, shares and the roadmap, and must click again to learn.
   **Decision:** keep the public page as the canonical URL; for a signed in
   viewer it renders the lesson inline (same component), and `/learn/...`
   redirects there. The panel stays a preview.
8. **Refusals and empty states follow no rule.** Some pages 404 (`/mentor`,
   `/skills/reviews`, `/certificates/issue`, even for an admin with no
   cohort), some explain (`/expert`, `/talent`, `/community/moderation`,
   `/briefs`), one is an empty column (`/certificates`, #238). **Decision:**
   staff only tools 404 (unlisted); anything a person could become explains
   in one card with one action; every empty state fills its slot (#252,
   founder decision D6).
9. **The same identity is edited in four places.** Headline, skills and
   region are fields on `/profile`, `/talent/me` and `/expert`; display prefs
   live on `/settings`; the public face is `/u/[slug]`. `/talent` (the
   organisation's directory) and `/talent/me` (a learner's listing) share a
   name and serve opposite people. **Decision:** one profile with sections
   (About, Public page, Talent listing, Expert profile), each listing reuses
   the profile fields and adds only its own; `/talent/me` becomes "Your
   listing" under Profile.
10. **Marketing pages repeat and compete.** The Bolgatanga Skillshop numbers
    appear on home, About and Partners; "Hiring, funding or partnering?" on
    home duplicates `/business` and `/partners`; before #239 `/programme`
    carried the whole 12 week syllabus. **Decision:** one proof band
    component used once per page type (home short, About full), home sends
    each audience to one page, `/partners` asks for support only, `/business`
    sells hiring only.

Also high: ten orphan routes (section "Orphans"), the admin header showing to
non admins (#245), and `/settings` being reachable signed out but listed only
in the signed in avatar menu.

---

## How to read an entry

- **Audience**: type codes from `docs/user-types.md`. V visitor, L learner,
  C cohort member, Ap applicant, M cohort staff, E expert, O organisation,
  CL chapter lead, A admin.
- **Job**: the one thing the page is for. If a block does not serve it, it
  goes in **Cut / move / collapse**.
- **Priority**: top to bottom on a phone; left to right, then rail, on
  desktop.
- **States**: empty (nothing yet), partial (some data), full.
- **Phone / desktop**: phone is one column in priority order, 44px targets,
  the tab bar visible. Desktop uses the primitives in
  `src/components/ui/layout.tsx` (`SplitHero`, `MainWithRail`, `SectionGrid`,
  `AutoGrid`, `DataTable`) and is never the phone column stretched.
- **Nav**: where the page sits. Tabs = phone bottom tabs (Home, Learn,
  Mentors, Community, Earn); Sidebar = desktop app nav (same groups); You =
  avatar menu (Profile, Notifications, Settings, Admin); Header = the public
  site header (`PUBLIC_NAV`); Footer = `FOOTER_NAV`.

### Navigation by user type today (`src/lib/nav/config.ts`)

| Type | Tabs and sidebar items they see | Avatar menu |
|---|---|---|
| V | Header: Roadmaps, Programme, Experts, Opportunities, Events, Chapters, Skills, Impact, For business. Footer adds Find your path, About, Partners | Sign in / Create account |
| L, C, Ap | Home; Learn (Roadmaps, Your path, Cohort, Skills, Certificates, 5 minute review, Study Buddy); Mentors (Find experts, Bookings, Briefs, Become an expert); Community (Feed, Events, Chapters, Leaderboards); Earn (Opportunities, Outcomes, Talent profile) | Profile, Notifications, Settings |
| M | as L plus Mentors → Mentor console | as L |
| E (any status) | as L but "Expert dashboard" replaces "Become an expert" | as L |
| O (active or invited) | as L plus Earn → Organisation | as L |
| CL | as L (no lead entry; tools are on the chapter page and the moderation link in the community rail) | as L |
| Skill reviewer | as L (no entry; finding A5, #248) | as L |
| A | everything above plus Mentor console | plus Admin |

Signed in people keep the app navigation on public pages (`viewer-frame`).

---

## 1. Public marketing

### `/` Home (marketing)
- **Audience**: V (signed in people go to `/dashboard` from the logo, but can open `/`).
- **Job**: get a visitor to their starting point (the path quiz) or a free roadmap.
- **Primary**: Find your starting point (`/start`). **Secondary**: Browse roadmaps; See the programme.
- **Priority**: 1 hero promise + quiz CTA; 2 three lanes (Learn, Get mentored, Earn) as links with live status; 3 the programme with seats and date; 4 "We start where others skip" (north first, chapters); 5 one proof band; 6 one line each for business and partners.
- **Cut / move / collapse**: cut "Create a free account / Sign in" as the hero buttons (sign in lives in the header); fix the stale lane statuses; collapse "Hiring, funding or partnering?" into two footer style links; move full Skillshop stats to About.
- **States**: static; the programme block reads `PILOT` (seats, date).
- **Phone**: hero words then CTA then visual; lanes stacked. **Desktop**: `SplitHero` 7:5 with the quiz teaser as the visual; lanes in `SectionGrid cols=3`; north and proof as split sections.
- **Nav**: logo target for V; Header.

### `/start` Where do I start? (path quiz)
- **Audience**: V, L without a path (T2). **Job**: answer five questions and get a personal path.
- **Primary**: answer and see my path (signed out: sign up to see it, the gate). **Secondary**: none.
- **Priority**: 1 question, one per step, progress; 2 what you get (track, starting point, weekly plan); 3 privacy line.
- **Cut / move / collapse**: nothing to add; keep it one task.
- **States**: first visit; returning with saved answers (offer "see your path").
- **Phone**: one question per screen, big targets. **Desktop**: question in a reading column with a rail showing "what you get" and step progress; never a wide form.
- **Nav**: Footer only today. **Should be** the hero primary on `/`, the empty state on `/path` and `/dashboard`, and an item in Learn.

### `/roadmaps` Learning roadmaps
- **Audience**: everyone. **Job**: pick a track to look at.
- **Primary**: open a roadmap. **Secondary**: take the quiz if unsure.
- **Priority**: 1 tracks grouped by field with one line each and size (topics, weeks); 2 "not sure? take the quiz"; 3 for signed in: progress on tracks started.
- **Cut / move / collapse**: nothing major; add a filter by field once there are more than about 12 tracks.
- **States**: always full (seeded); signed in partial progress per card.
- **Phone**: one column of cards. **Desktop**: `AutoGrid` grouped by field with the quiz card pinned first.
- **Nav**: Header; Learn → Roadmaps.

### `/roadmaps/[slug]` A roadmap (and the `@panel` topic preview)
- **Audience**: everyone. **Job**: see the whole track and open a topic.
- **Primary**: open the next topic (signed in: "Continue: topic"). **Secondary**: switch view (`docs/roadmap-views.md`), share.
- **Priority**: 1 title, one line, progress for signed in; 2 the map; 3 who it is for, time, related skills and cohort.
- **Cut / move / collapse**: the panel (`@panel/(.)[node]`) stays a preview with one "Open topic" button; do not grow it into a third lesson surface (see problem 7). Roadmap redesign is #244.
- **States**: signed out (no progress); started (progress overlay); finished (certificate or skill prompt).
- **Phone**: list view by default, map on demand. **Desktop**: map in `wide` container, panel slides over on the right.
- **Nav**: Learn → Roadmaps (active on `/learn/*` too).

### `/roadmaps/[slug]/[node]` Topic page
- **Audience**: everyone (SEO landing). **Job**: understand what this topic is and start learning it.
- **Primary**: Start learning (signed out: sign up and come back). **Secondary**: previous and next topic; Study Buddy.
- **Priority**: 1 title, breadcrumb, summary; 2 for signed in: the lesson itself (see problem 7); 3 where it sits in the track.
- **Cut / move / collapse**: merge with `/learn/[slug]/[node]` for signed in viewers.
- **States**: published; topic without generated content ("coming"), never a blank.
- **Phone**: summary then CTA then siblings. **Desktop**: `MainWithRail` with the track outline in the rail.
- **Nav**: as roadmap.

### `/programme` The Delta Mentoring Program (after #239) and `/programme/curriculum`
- **Audience**: V, L, Ap. **Job**: decide to apply for the January cohort.
- **Primary**: Apply for a seat (signed out: sign up first). **Secondary**: join the waitlist; see the curriculum.
- **Priority**: 1 promise, seats, start date, free; 2 three phases (foundation, specialisation, capstone) in one band; 3 who it is for; 4 apply / waitlist; `/programme/curriculum` carries the week by week list.
- **Cut / move / collapse**: the full syllabus lives on `/programme/curriculum` only (done by #239). For an existing applicant the apply block shows their status instead of the form CTA.
- **States**: open for applications; full (waitlist only); signed in applicant (status).
- **Phone**: facts as a 2×2 grid under the hero. **Desktop**: `PageHeader` with facts aside; phases in `SectionGrid cols=3`; curriculum page as a `DataTable` of weeks with the specialisation fork visible.
- **Nav**: Header "Programme"; Learn → Cohort matches `/programme/apply`.

### `/experts` Find an expert (directory)
- **Audience**: everyone. **Job**: find someone who can help with my goal.
- **Primary**: open an expert. **Secondary**: filter (skill, service, availability); become an expert.
- **Priority**: 1 search and the result grid; 2 featured; 3 how it works (free during the soft launch).
- **Cut / move / collapse**: the "first experts are being approved" state is honest; keep it. Move "Become an expert" to the bottom.
- **States**: none approved yet (explain, offer the brief route); a few; many with filters.
- **Phone**: filters behind a sheet button above results. **Desktop**: `MainWithRail railFirst` with filters in the rail, `AutoGrid` results.
- **Nav**: Header "Experts"; Mentors → Find experts.

### `/experts/[slug]` Expert profile
- **Audience**: everyone. **Job**: decide to request this person.
- **Primary**: request an offer. **Secondary**: see reviews, links.
- **Priority**: 1 name, headline, verified badge, response time; 2 offers; 3 reviews and completed sessions; 4 bio, skills, verified skills, links.
- **Cut / move / collapse**: keep trust signals above the fold; no invented ratings (empty reviews say so).
- **States**: new (no reviews); established. Pending or delisted experts are 404 publicly.
- **Phone**: header card then offers list. **Desktop**: `MainWithRail` with offers in the main column, trust and links in the rail.
- **Nav**: from `/experts`.

### `/experts/[slug]/offers/[id]` Offer and `/experts/[slug]/offers/[id]/request`
- **Audience**: everyone (request: signed in adults). **Job**: understand the offer, then send a request.
- **Primary**: Request this (signed out: sign in and return). **Secondary**: back to the expert.
- **Priority**: offer title, what you get, duration, free during soft launch; request form with preferred times and message.
- **Cut / move / collapse**: the request step could be a sheet on the offer page instead of a separate route (one fewer page); keep the URL for no JS.
- **States**: own offer (no request button), inactive offer (404).
- **Phone / desktop**: form in a reading column with the offer summary in the rail.

### `/opportunities` and `/opportunities/[slug]`
- **Audience**: everyone; save for signed in. **Job**: find an opportunity I can apply to now.
- **Primary**: open, then Apply (external). **Secondary**: save; filter by kind, region, remote.
- **Priority**: 1 open, soonest deadline first, with kind and location; 2 filters; 3 saved count for signed in.
- **Cut / move / collapse**: "Saved" (`/opportunities/saved`) has no nav entry; add it as a filter tab on this page instead of a separate orphan page.
- **States**: none open (say when the next ones come); some; filtered empty.
- **Phone / desktop**: as `/experts` (rail filters, grid). Detail: `MainWithRail` with apply box and deadline in the rail.
- **Nav**: Header; Earn → Opportunities.

### `/events`, `/events/[slug]`, `/events/recordings`
- **Audience**: everyone; RSVP signed in. **Job**: find the next event near me and say I am going.
- **Primary**: RSVP. **Secondary**: add to calendar (`calendar.ics`), recordings.
- **Priority**: 1 next events by date with city and format; 2 filters; 3 recordings link.
- **Cut / move / collapse**: recordings are an orphan sub page; make them a tab on `/events`.
- **States**: none planned (honest "being planned"); upcoming; past with recording.
- **Phone / desktop**: list then filters; desktop `MainWithRail` filters in rail. Event detail: date, place, seats left and RSVP in the rail.
- **Nav**: Header; Community → Events.

### `/chapters` and `/chapters/[slug]`
- **Audience**: everyone; join signed in; lead tools for CL. **Job**: find my regional chapter and join it.
- **Primary**: join (or open my chapter). **Secondary**: WhatsApp link once a member.
- **Priority**: 1 your chapter (signed in) or the nearest; 2 all chapters with status; 3 how chapters work. Chapter page: what it is, members, events, posts; for leads "Edit the chapter page" below.
- **Cut / move / collapse**: lead tools (edit details, remove members) should move to a "Lead" tab or the "Your work" group, not the bottom of the public page.
- **States**: planned (no lead yet), launching, active; draft is admin only.
- **Phone / desktop**: list; desktop `AutoGrid` with "Your chapter" rail.
- **Nav**: Header; Community → Chapters.

### `/skills` and `/skills/[slug]`
- **Audience**: everyone. **Job**: see which skills I can prove and how.
- **Primary**: take the assessment or send a portfolio. **Secondary**: roadmaps that lead to it.
- **Priority**: skill, the three ways to earn it (path, quiz, portfolio), who checks it.
- **Cut / move / collapse**: fine as is; on the detail page show the learner's attempt state first when signed in.
- **States**: not started; attempt pending review; verified; retry window.
- **Phone / desktop**: catalogue `AutoGrid`; detail `MainWithRail` with the "how to earn" box in the rail.
- **Nav**: Header; Learn → Skills.

### `/impact`
- **Audience**: V, donors, partners. **Job**: show real verified outcomes.
- **Primary**: none (proof). **Secondary**: partner with us.
- **Priority**: verified counts, what is live, how we count.
- **Cut / move / collapse**: keep the honest "Nothing verified yet"; do not pad with Skillshop numbers here (they are not outcomes).
- **Nav**: Header.

### `/business`
- **Audience**: employers. **Job**: get an organisation to create an account and post.
- **Primary**: Create a business account (`/business/new`). **Secondary**: see opportunities.
- **Priority**: promise, what you get, how verification works, learners stay in control.
- **Cut / move / collapse**: do not repeat partner and donor content.
- **Nav**: Header "For business".

### `/about`, `/partners`, `/accessibility`, `/privacy`, `/terms`
| Route | Job | Primary | Cut / move |
|---|---|---|---|
| `/about` | Tell the story and mission | Get involved | Holds the one full proof band; keep chapters short (link to `/chapters`). |
| `/partners` | Ask donors and sponsors for support | Talk to us | Remove the repeated Skillshop band (link to About); tiers first. |
| `/accessibility` | State what we support and how to report a barrier | Settings | Fine. |
| `/privacy`, `/terms` | Legal text (draft banner until #60) | none | Reading column only; no rail. |

Nav: Footer only, correct.

---

## 2. Auth and onboarding

| Route | Audience | Job | Primary | Notes |
|---|---|---|---|---|
| `/signup` | V | Create an account (adults) | Create account; Google | Keep `?next` through confirmation. Under 18 sees one sentence, no form reset. Desktop: form plus brand panel (done). |
| `/login` | V | Get back in | Sign in; Google | Error states for age, Google, rate limit. |
| `/welcome` | Google sign ups, re-consent | Give date of birth and agree | Continue | Hide the date of birth when it is already on file (#251). |
| `/forgot-password`, `/reset-password` | V | Reset a password | Send link / Save | Public on purpose (see `protected-paths.ts`). |
| `/auth/callback` (route) | | OAuth return | | No UI. |
| `/offline` | anyone | Say we are offline and what still works | Try again | Served by the service worker. |

---

## 3. Learn (signed in)

### `/dashboard` Home
- **Audience**: every signed in type. **Job**: show what to do next today.
- **Primary**: the single next action (continue lesson, or this week's assignment, or grade, or reply). **Secondary**: other items in "Next up".
- **Priority**: 1 Next up (role aware, problem 2); 2 your roadmaps with progress; 3 rail: path, weekly plan, leaderboard, community.
- **Cut / move / collapse**: "Explore" roadmap grid collapses to one link once a person has started something; the greeting shrinks to one line.
- **States**: brand new (quiz CTA, start a roadmap); learning (progress); cohort (week); supply roles (queues).
- **Phone**: Next up first, then roadmaps; rail cards follow. **Desktop**: `MainWithRail`, each rail card its own Suspense island (done).
- **Nav**: Tab and sidebar "Home".

### `/learn`, `/mentors`, `/earn` hubs
- **Audience**: signed in. **Job today**: a menu of the group's links. **Job proposed**: an overview of my state in that area (problem 3).
- **Cut / move / collapse**: replace the card grid with state plus `HubStrip`; on desktop the sidebar already lists the items, so the hub must add information, not repeat links.
- **Nav**: phone tabs.

### `/path` Your path
- **Audience**: L (T2 sees the quiz invitation, T3 sees their plan). Signed out goes to `/signup?next=/path`.
- **Job**: show my track, starting topic and weekly plan, and start.
- **Primary**: Start at topic X. **Secondary**: retake the quiz; adjust the weekly goal.
- **Priority**: track and why; starting point; weekly plan; skill gap.
- **States**: no path ("Find your starting point"); path; saving (cookie answers after sign up).
- **Phone / desktop**: result in main, plan in rail.
- **Nav**: Learn → Your path.

### `/learn/[slug]/[node]` Lesson
- **Audience**: L. **Job**: learn and pass this topic.
- **Primary**: pass the checkpoint (marks it done). **Secondary**: practice task, resources, Study Buddy, next topic.
- **Priority**: explanation, practice, checkpoint, next.
- **Cut / move / collapse**: fold into the public topic URL (problem 7).
- **States**: not started, in progress, passed, content coming.
- **Phone**: reading column, sticky "Checkpoint" button. **Desktop**: reading column with the track outline and Study Buddy in the rail.

### `/cohort`, `/cohort/week/[n]`, `/cohort/work`, `/cohort/work/[weekId]`, `/cohort/reviews`, `/cohort/reviews/[reviewId]`
- **Audience**: C (explainer for everyone else). **Job of `/cohort`**: this week, what is due, who is with me.
- **Primary**: open this week's assignment. **Secondary**: progress, people, WhatsApp channel, peer reviews to give.
- **Priority**: 1 this week (theme, objectives, assignment, due date with grace); 2 progress; 3 people and mentor; 4 the plan.
- **Cut / move / collapse**: make `/cohort` the programme spine for applicants too (problem 4); `/cohort/work` and `/cohort/reviews` become tabs of `/cohort` on desktop and a segmented control on phones, not separate list pages; the week page keeps its URL for links.
- **States**: not applied; applied; accepted not started; running; deferred (progress kept); completed (certificate).
- **Phone / desktop**: `MainWithRail` (done); work list as `DataTable`.
- **Nav**: Learn → Cohort.

### `/certificates`, `/certificates/issue`
- **Audience**: `/certificates` every learner; `/issue` M and A. **Job**: see and share what I earned; staff: issue earned ones.
- **Primary**: share (learner); issue (staff). **Secondary**: verify link.
- **Cut / move / collapse**: fix the empty main column (#238); staff "Issue" should live in the mentor console, not as a card here; an admin with no cohorts gets an empty state, not a 404 (#252).
- **Nav**: Learn → Certificates; `/issue` orphan (reached from `/certificates` only).

### `/review` 5 minute review, `/study-buddy`
| Route | Job | Primary | Notes |
|---|---|---|---|
| `/review` | Five quick questions from passed topics | Start | Entry is the "This week" card; fine as an item, but it shares the word "review" with peer and portfolio reviews: rename "Quick quiz" or "Recap". |
| `/study-buddy` | Ask and plan next steps | Ask | Should open in context from lessons (it does); the page itself is a fallback. Rail: what it can do. |

### `/skills/[slug]/quiz`, `/skills/[slug]/portfolio`
- **Audience**: L. **Job**: prove one skill. **Primary**: submit. States: retry window, pending review, verified.
- **Nav**: from `/skills/[slug]` only; correct (a task page).

### `/skills/reviews` Portfolio reviews
- **Audience**: skill reviewers and A. **Job**: approve or return portfolios. **Primary**: decide.
- **Nav**: orphan (only from an admin assessment page). Add to "Your work" for reviewers (#248).

### `/programme/apply`
- **Audience**: L, Ap. **Job**: send or follow my application. **Primary**: submit (or withdraw). **Secondary**: edit answers while open.
- **Cut / move / collapse**: the status card belongs on `/cohort` too.
- **Nav**: no item of its own (Cohort lights up for it); reached from `/programme`.

---

## 4. Mentors and experts (signed in)

### `/mentor` Mentor console, `/mentor/learners/[memberId]`, `/mentor/submissions/[id]`
- **Audience**: M, A. **Job**: get through my review queue and keep my learners on track.
- **Primary**: review the oldest waiting submission. **Secondary**: roster, progress grid, defer, notes, peer review assignment, issue certificates.
- **Priority**: 1 waiting work count and list; 2 learners at risk; 3 roster and grid; 4 cohort settings.
- **Cut / move / collapse**: a 376 line page doing five jobs; split into tabs (Queue, Learners, Peer review, Certificates). Bring certificate issuing here.
- **States**: no cohorts (404 for non staff; explainer for an admin), empty queue, busy.
- **Phone**: queue first; grid becomes a list. **Desktop**: `DataTable` roster with the cohort switcher in the rail (done).
- **Nav**: Mentors → Mentor console (staff). Should be "Your work".

### `/expert`, `/expert/offers/new`, `/expert/offers/[id]`
- **Audience**: E (explainer for others). **Job**: run my expert listing: answer requests, keep offers current.
- **Primary**: respond to new requests (today requests live in `/bookings`). **Secondary**: edit profile, add offer.
- **Priority**: 1 status (pending, approved, delisted) and what it means; 2 new requests count with link; 3 offers; 4 profile form.
- **Cut / move / collapse**: profile fields duplicated with `/profile` (problem 9); `/expert/offers/new` redirects to `/expert`, so the form is inline: keep one pattern.
- **Nav**: Mentors → Expert dashboard (experts); "Become an expert" for others.

### `/experts/apply`
- **Audience**: adult L. **Job**: apply to be listed. **Primary**: submit. States: draft, submitted, approved (go to dashboard), declined. Fast track note for cohort mentors.

### `/bookings`, `/bookings/[id]`
- **Audience**: anyone with a booking (requester or expert or organisation). **Job**: see what I asked for or was asked, and act on it.
- **Primary**: accept or decline (expert), message, mark complete, review.
- **Cut / move / collapse**: split "Requests to you" and "Your requests" as tabs; experts should see their incoming requests on Home and `/expert`.
- **States**: none, requested, accepted, completed (review), declined, cancelled.
- **Phone / desktop**: list as `DataTable` with filters in the rail (done); detail thread in main, status and actions in rail.
- **Nav**: Mentors → Bookings.

### `/briefs`, `/briefs/new`, `/briefs/mine`, `/briefs/[id]`
- **Audience**: approved experts (board), anyone adult (post), organisations (job briefs). **Job**: for posters, get pitches; for experts, find work to pitch for.
- **Primary**: poster: Post a brief; expert: open and pitch.
- **Cut / move / collapse**: two audiences on one page; a learner sees an explainer and their own briefs. Make `/briefs` the expert board and `/briefs/mine` "Your briefs" a tab; `/briefs/new` a task page.
- **Nav**: Mentors → Briefs; `/mine` and `/new` orphan.

### `/mentors` hub
See section 3 hubs.

---

## 5. Community (signed in)

### `/community`, `/community/post/[id]`, `/community/moderation`
- **Audience**: every signed in type; moderation for CL, M, A. **Job**: ask and answer with people near me.
- **Primary**: write a post. **Secondary**: switch scope (everyone, chapter, cohort), react, reply, WhatsApp.
- **Priority**: 1 composer and scope switcher; 2 pinned; 3 feed; rail: my groups, WhatsApp, moderation link for moderators.
- **Cut / move / collapse**: moderation queue reached only from the rail; add to "Your work" with a count of open reports.
- **States**: quiet (seed prompt, honest), active, hidden posts for authors and moderators.
- **Phone / desktop**: `MainWithRail` (done); `HubStrip` on top (done).
- **Nav**: Community tab lands here (the model for other hubs).

### `/leaderboards`
- **Job**: see who is learning most this week, nationally and by region. **Primary**: switch board. Keep the regional board first for the north. Nav: Community → Leaderboards.

### `/events/[slug]/check-in`, `/feedback`, `/host`
| Route | Audience | Job | Notes |
|---|---|---|---|
| `check-in` | attendees | Enter the code at the venue | Phone first; big code field. |
| `feedback` | attendees after start | Rate the event | One screen; no rail needed on phone. |
| `host` | hosts (A, CL) | Attendance, code, join link, recordings, feedback summary | Reached only from the event page; add to "Your work" for hosts. |

---

## 6. Earn and organisation (signed in)

### `/outcomes`, `/outcomes/new`, `/outcomes/[id]/edit`
- **Audience**: L. **Job**: report a job, gig or promotion so it can be verified. **Primary**: report an outcome. States: none, pending, verified, rejected (edit and resend).
- **Cut / move / collapse**: `/profile` also has a "Report outcome" card; keep one entry (this page) and link to it.
- **Nav**: Earn → Outcomes.

### `/talent/me` Your talent listing
- **Audience**: adult L who are eligible (certificate or verified skill). **Job**: be findable by verified organisations and answer contact requests.
- **Primary**: turn the listing on. **Secondary**: answer requests, edit summary.
- **Cut / move / collapse**: move under Profile as "Talent listing" (problem 9); reuse profile headline, skills, region.
- **States**: not eligible (how to become eligible), hidden, live, requests waiting.
- **Nav**: Earn → Talent profile.

### `/talent`, `/talent/[id]` Talent directory
- **Audience**: members of a verified organisation (O), A; explainer for others. **Job**: find candidates and ask to contact them.
- **Primary**: Ask to contact. **Secondary**: filter by skill, track, region.
- **Cut / move / collapse**: rename "Find talent" so it never collides with "Talent profile".
- **Nav**: Earn → Organisation matches `/talent`; no item of its own.

### `/org`, `/org/[slug]/manage`, `/team`, `/opportunities`, `/opportunities/new`, `/requests`, `/business/new`
- **Audience**: O (owner, admin, recruiter); invitees see invitations on `/org`. **Job of `/org/[slug]`**: run the organisation: verification, team, opportunities, contact requests.
- **Primary**: depends on state: unverified → ask to be verified; verified → post an opportunity or find talent.
- **Cut / move / collapse**: five sibling pages with a shared header; on desktop make them tabs under one organisation header (the layout exists), on phones a segmented control. `/business/new` (create) and `/business` (marketing) and `/org` (list) are three doors; keep `/business` for visitors and send signed in people straight to `/business/new`.
- **States**: unverified, pending, verified, rejected, suspended; no opportunities; requests waiting.
- **Nav**: Earn → Organisation (O only).

### `/org/[slug]` public organisation page
- **Audience**: everyone (verified organisations only). **Job**: show who the employer is and their open opportunities. Nav: from opportunity pages.

### `/opportunities/saved`
Orphan; fold into `/opportunities` as a "Saved" filter (section 1).

---

## 7. Account and settings

### `/profile`
- **Audience**: every signed in type. **Job**: edit who I am and what the public sees.
- **Primary**: save details. **Secondary**: public page toggle and link, verified skills, WhatsApp opt in, invite a friend.
- **Priority**: 1 details; 2 public page (preview in rail); 3 verified skills; 4 contact preferences.
- **Cut / move / collapse**: remove the outcome card (link to Outcomes); become the home for Talent listing and Expert profile sections (problem 9).
- **Nav**: You → Profile.

### `/u/[slug]`, `/a/[id]`, `/verify/[id]` (+ `credential.json`, `credential.jwt`), `/badges/*` (JSON)
| Route | Audience | Job | Notes |
|---|---|---|---|
| `/u/[slug]` | everyone | A learner's public page: progress, skills, certificates, follow, report | Only for public profiles; the share card is the growth loop. |
| `/a/[id]` | everyone | One achievement to share | OG card first; one CTA to start the same roadmap. |
| `/verify/[id]` | employers | Check a certificate is real | Valid / revoked / not found states; machine readable links. |
| JSON routes | machines | Open Badges 3.0 documents | No UI. |

### `/notifications`
- **Job**: see what changed for me and go there. **Primary**: open an item. **Secondary**: mark all read. States: empty (honest), unread. Nav: You → Notifications and the bell.

### `/settings`
- **Audience**: everyone (works signed out, saved per device; signed in it syncs to the profile). **Job**: set theme, text size, motion, contrast.
- **Cut / move / collapse**: add it to the footer for visitors (today only the signed in avatar menu lists it).
- **Nav**: You → Settings.

---

## 8. Admin (`/admin/*`, A only)

All admin pages share one header with the section list (it must render only
for admins, #245), use `DataTable` for lists, and put the form in one column
and the record in another from lg. Every page checks `requireAdmin` itself.

| Route | Job | Primary | Notes |
|---|---|---|---|
| `/admin` | Pick a section | open a section | Add counts per section (pending applications, reports, outcomes). |
| `/admin/applications` | Decide programme applications | accept / waitlist / decline | Highest volume in January; filters by status in the rail. |
| `/admin/cohorts`, `/[id]` | Create cohorts, add staff | add staff | |
| `/admin/experts` | Approve, verify, feature experts | decide | Profiles created without an application never show here (#249). |
| `/admin/organisations` | Verify organisations | verify / reject | |
| `/admin/outcomes` | Verify reported outcomes | verify | Feeds `/impact`. |
| `/admin/opportunities`, `/new`, `/[id]` | Curate the public board | post | |
| `/admin/events`, `/new`, `/[id]` | Create events, links, recordings | create | |
| `/admin/chapters`, `/new`, `/[id]` | Create chapters, appoint leads | appoint | |
| `/admin/skills`, `/[id]`, `/assessments/[assessmentId]` | Build skills and assessments | publish | Link to `/skills/reviews` belongs in the section list. |
| `/admin/roadmaps`, `/new`, `/[id]`, `/[id]/nodes/[nodeId]`, `/links` | Author roadmaps, nodes, links; link health | publish | |
| `/admin/content` | Generate and review node content | estimate / submit | Needs the AI key (503 otherwise). |
| `/admin/certificates` | Find and revoke certificates | revoke | |
| `/admin/reports` | Act on profile and post reports | resolve / unpublish | |
| `/admin/funnel`, `/admin/impact` | Read the funnel and the North Star | none | Dashboards are #243. |

---

## 9. Cross cutting findings

### Duplicated pages or surfaces
- Topic: panel, `/roadmaps/[slug]/[node]`, `/learn/[slug]/[node]` (problem 7).
- Hubs repeat the sidebar on desktop (problem 3).
- Identity fields on `/profile`, `/talent/me`, `/expert` (problem 9).
- Business entry: `/business`, `/business/new`, `/org` (section 6).
- Outcome reporting: `/profile` card and `/outcomes/new`.
- Proof band on home, About, Partners (problem 10).
- Issuing certificates: `/certificates/issue` and the mentor console.

### Dead ends
- `/cohort` for a non member: an explainer with no status for applicants.
- `/talent` for a learner: explains, but offers no route to their own listing.
- `/briefs` for a learner who is not an expert: explains, little to do but post.
- Admin with no cohort on `/certificates/issue`: 404.
- `/welcome` re-consent with a different date of birth: generic error (#251).

### Orphan routes (no nav entry; #252)
`/programme/apply`, `/skills/reviews`, `/certificates/issue`, `/briefs/mine`,
`/briefs/new`, `/opportunities/saved`, `/community/moderation`, `/review`
(card only), `/events/recordings`, `/outcomes/new`, `/start` (footer only for
visitors, nothing for signed in people), `/settings` (signed out).

### Inconsistent patterns
- Refusals: 404 vs explainer vs empty (problem 8).
- Sub pages vs tabs: `/cohort/*`, `/org/[slug]/*`, `/briefs/*`, `/events/recordings`, `/opportunities/saved` are separate routes for what are tabs of one page.
- Task pages: `/expert/offers/new` redirects to an inline form, `/outcomes/new` and `/briefs/new` are full pages, the expert request is a full page.
- Naming: "review" means a 5 minute recap, a peer review, a portfolio review, an expert review and an AI review; "mentor" means cohort staff and the marketplace tab; "talent" means a listing and a directory.
- Lead and host tools live at the bottom of public pages rather than in a place for the role.

### Phone and desktop
The desktop compositions from #154 are in place on almost every screen
(`MainWithRail`, `DataTable`, `AutoGrid`). The remaining desktop risks are
the three hubs (a grid of links beside a sidebar of the same links) and
long single column forms (`/programme/apply`, `/talent/me`, `/expert`) that
should put the live preview or status in the rail.

---

## Appendix: route index

Every `page.tsx` and `route.ts` under `src/app`, with the section above that covers it. Route handlers have no UI.

| Route | Kind | Section |
|---|---|---|
| `/admin/applications` | page | 8 Admin |
| `/admin/certificates` | page | 8 Admin |
| `/admin/chapters/[id]` | page | 8 Admin |
| `/admin/chapters/new` | page | 8 Admin |
| `/admin/chapters` | page | 8 Admin |
| `/admin/cohorts/[id]` | page | 8 Admin |
| `/admin/cohorts` | page | 8 Admin |
| `/admin/content` | page | 8 Admin |
| `/admin/events/[id]` | page | 8 Admin |
| `/admin/events/new` | page | 8 Admin |
| `/admin/events` | page | 8 Admin |
| `/admin/experts` | page | 8 Admin |
| `/admin/funnel` | page | 8 Admin |
| `/admin/impact` | page | 8 Admin |
| `/admin/opportunities/[id]` | page | 8 Admin |
| `/admin/opportunities/new` | page | 8 Admin |
| `/admin/opportunities` | page | 8 Admin |
| `/admin/organisations` | page | 8 Admin |
| `/admin/outcomes` | page | 8 Admin |
| `/admin` | page | 8 Admin |
| `/admin/reports` | page | 8 Admin |
| `/admin/roadmaps/[id]/nodes/[nodeId]` | page | 8 Admin |
| `/admin/roadmaps/[id]` | page | 8 Admin |
| `/admin/roadmaps/links` | page | 8 Admin |
| `/admin/roadmaps/new` | page | 8 Admin |
| `/admin/roadmaps` | page | 8 Admin |
| `/admin/skills/[id]/assessments/[assessmentId]` | page | 8 Admin |
| `/admin/skills/[id]` | page | 8 Admin |
| `/admin/skills` | page | 8 Admin |
| `/bookings/[id]` | page | 4 Mentors |
| `/bookings` | page | 4 Mentors |
| `/briefs/[id]` | page | 4 Mentors |
| `/briefs/mine` | page | 4 Mentors |
| `/briefs/new` | page | 4 Mentors |
| `/briefs` | page | 4 Mentors |
| `/business/new` | page | 6 Earn |
| `/certificates/issue` | page | 3 Learn |
| `/certificates` | page | 3 Learn |
| `/cohort` | page | 3 Learn |
| `/cohort/reviews/[reviewId]` | page | 3 Learn |
| `/cohort/reviews` | page | 3 Learn |
| `/cohort/week/[n]` | page | 3 Learn |
| `/cohort/work/[weekId]` | page | 3 Learn |
| `/cohort/work` | page | 3 Learn |
| `/community/moderation` | page | 5 Community |
| `/community` | page | 5 Community |
| `/community/post/[id]` | page | 5 Community |
| `/dashboard` | page | 3 Learn |
| `/earn` | page | 6 Earn |
| `/events/[slug]/check-in` | page | 5 Community |
| `/events/[slug]/feedback` | page | 5 Community |
| `/events/[slug]/host` | page | 5 Community |
| `/expert/offers/[id]` | page | 4 Mentors |
| `/expert/offers/new` | page | 4 Mentors |
| `/expert` | page | 4 Mentors |
| `/experts/apply` | page | 4 Mentors |
| `/leaderboards` | page | 5 Community |
| `/learn/[slug]/[node]` | page | 3 Learn |
| `/learn` | page | 3 Learn |
| `/mentor/learners/[memberId]` | page | 4 Mentors |
| `/mentor` | page | 4 Mentors |
| `/mentor/submissions/[id]` | page | 4 Mentors |
| `/mentors` | page | 4 Mentors |
| `/notifications` | page | 7 Account |
| `/opportunities/saved` | page | 6 Earn |
| `/org/[slug]/manage` | page | 6 Earn |
| `/org/[slug]/opportunities/new` | page | 6 Earn |
| `/org/[slug]/opportunities` | page | 6 Earn |
| `/org/[slug]/requests` | page | 6 Earn |
| `/org/[slug]/team` | page | 6 Earn |
| `/org` | page | 6 Earn |
| `/outcomes/[id]/edit` | page | 6 Earn |
| `/outcomes/new` | page | 6 Earn |
| `/outcomes` | page | 6 Earn |
| `/path` | page | 3 Learn |
| `/profile` | page | 7 Account |
| `/programme/apply` | page | 3 Learn |
| `/review` | page | 3 Learn |
| `/skills/[slug]/portfolio` | page | 3 Learn |
| `/skills/[slug]/quiz` | page | 3 Learn |
| `/skills/reviews` | page | 3 Learn |
| `/study-buddy` | page | 3 Learn |
| `/talent/[id]` | page | 6 Earn |
| `/talent/me` | page | 6 Earn |
| `/talent` | page | 6 Earn |
| `/forgot-password` | page | 2 Auth |
| `/login` | page | 2 Auth |
| `/reset-password` | page | 2 Auth |
| `/signup` | page | 2 Auth |
| `/welcome` | page | 2 Auth |
| `/privacy` | page | 1 Public marketing |
| `/terms` | page | 1 Public marketing |
| `/about` | page | 1 Public marketing |
| `/accessibility` | page | 1 Public marketing |
| `/business` | page | 1 Public marketing |
| `/events/[slug]/calendar.ics` | handler | 1 Events (calendar file) |
| `/events/[slug]` | page | 1 Public marketing |
| `/events` | page | 1 Public marketing |
| `/events/recordings` | page | 1 Public marketing |
| `/experts/[slug]/offers/[id]` | page | 1 Public marketing |
| `/experts/[slug]/offers/[id]/request` | page | 1 Public marketing |
| `/experts/[slug]` | page | 1 Public marketing |
| `/experts` | page | 1 Public marketing |
| `/impact` | page | 1 Public marketing |
| `/opportunities/[slug]` | page | 1 Public marketing |
| `/opportunities` | page | 1 Public marketing |
| `/` | page | 1 Public marketing |
| `/partners` | page | 1 Public marketing |
| `/programme` | page | 1 Public marketing |
| `/roadmaps/[slug]/[node] (panel)` | page | 1 Public marketing |
| `/programme/curriculum` | page (arrives with #239) | 1 Public marketing |
| `/roadmaps/[slug]` (panel slot default, renders nothing) | page | 1 Public marketing |
| `/roadmaps/[slug]/[node]` | page | 1 Public marketing |
| `/roadmaps/[slug]` | page | 1 Public marketing |
| `/roadmaps` | page | 1 Public marketing |
| `/skills/[slug]` | page | 1 Public marketing |
| `/skills` | page | 1 Public marketing |
| `/start` | page | 1 Public marketing |
| `/a/[id]` | page | 7 Account |
| `/chapters/[slug]` | page | 1 Public marketing |
| `/chapters` | page | 1 Public marketing |
| `/org/[slug]` | page | 6 Earn |
| `/settings` | page | 7 Account |
| `/u/[slug]` | page | 7 Account |
| `/verify/[id]/credential.json` | handler | 7 Account (Open Badges JSON) |
| `/verify/[id]/credential.jwt` | handler | 7 Account (Open Badges JSON) |
| `/verify/[id]` | page | 7 Account |
| `/api/cron/event-reminders` | handler | Server only (cron, Study Buddy API, Twilio webhook, version) |
| `/api/cron/reengage` | handler | Server only (cron, Study Buddy API, Twilio webhook, version) |
| `/api/study-buddy` | handler | Server only (cron, Study Buddy API, Twilio webhook, version) |
| `/api/version` | handler | Server only (cron, Study Buddy API, Twilio webhook, version) |
| `/api/webhooks/twilio` | handler | Server only (cron, Study Buddy API, Twilio webhook, version) |
| `/auth/callback` | handler | 2 Auth |
| `/badges/[program]/achievement.json` | handler | 7 Account (Open Badges JSON) |
| `/badges/issuer.json` | handler | 7 Account (Open Badges JSON) |
| `/offline` | page | 2 Auth |
