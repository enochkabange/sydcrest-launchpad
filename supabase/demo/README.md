# Staging demo data

**STAGING ONLY. Never run these files against production.**

`demo-seed.sql` fills the staging database with realistic, made up people and
activity so every screen shows its full, partial and empty states for founder
review and for Claude Design. `demo-cleanup.sql` removes all of it again.

These files are not migrations and are not wired into `supabase/config.toml`
seeds or CI. Local e2e tests still run on an empty database.

## What it creates

Everything is invented. Names are mostly Northern Ghanaian. Organisations have
plainly generic names. There are no photos, avatars or external images, no pay
figures and no money moving. Ratings, counts and outcomes all come from the demo
rows themselves (a review exists only for a completed demo booking, and so on).

| Area | Rows |
| --- | --- |
| People | 50 demo accounts: 30 learners, 8 mentors, 7 experts (6 approved, 1 pending), 5 organisation staff |
| Organisations | Savanna Agro Traders (verified), Northern Youth Skills Network (unverified), Tamale Print and Design Studio (pending), with members |
| Chapters | Tamale (active, a lead and 19 members), Bolgatanga (launching), Wa (draft) |
| Community | 20 posts (everyone, chapter, cohort; 4 pinned, 1 hidden), 26 replies, about 200 reactions, 3 reports |
| Events | 8: three past with check ins and feedback, three upcoming (one full with a waitlist), one cancelled, one draft; 88 RSVPs |
| Delta Mentoring Program | Pilot cohort (completed, 5 certificates), cohort 2 (in week 7), cohort 3 (enrolling); 24 applications in every status; 129 submissions (graded, AI feedback ready, sent, returned, draft); 42 peer reviews; mentor notes |
| Learning | About 300 roadmap progress rows across tracks: quiz verified completions with streaks, a few hand marked topics (never counted on boards), two full roadmaps |
| Experts | 12 offers, 18 bookings in every status, 9 reviews, booking messages, expert applications |
| Briefs | 5 briefs (open, closed, awarded, cancelled) and 8 pitches |
| Opportunities | 9 (open, closed, draft), saves and applications, 4 outcomes (3 verified, which is what /impact shows) |
| Talent | 8 listings, 4 contact requests |
| Skills | 5 demo skills (only if the catalogue is empty), portfolio reviews, 9 verified skills |
| Other | Terms, privacy and WhatsApp consents, follows, achievements, notifications |

WhatsApp consent uses only fake numbers of the form `+233 20 000 01xx`
(stored as `+23320000010x`). Nothing is sent: there is no Twilio on staging.

Portfolio review links use the reserved `https://example.com/` domain as
placeholders. Event recordings are not created because a recording needs a
real video link. Chapters have no WhatsApp link for the same reason.

## How it identifies demo rows

* Every demo account's email ends with `@demo.sydcrest.test`. Their profiles
  and everything they own cascade from the account.
* Every other row the seed inserts has an id starting with `de000000-`.
* Demo accounts get a random, unknown password, so nobody can sign in as them.

## Before you run it

1. Make sure you are in the **staging** project in the Supabase dashboard.
2. Import and publish the roadmaps first (admin, Roadmaps, Import draft
   roadmaps, then publish). Learning progress, streaks and leaderboards are
   built from the published roadmaps and are skipped if there are none.
3. The seed refuses to run if the database has more than 500 real accounts,
   if a demo slug (chapters `tamale`, `bolgatanga`, `wa`; events starting
   `demo-`; the three organisations; the three cohort names) is already used by
   a real row, or if the Delta Mentoring Program is missing.

## Run

Open the SQL editor in the staging project, paste the whole of
`demo-seed.sql` and run it. It runs in one transaction, so it either loads
completely or not at all. Running it again changes nothing.

Dates are relative to the moment you run it (streaks end today, upcoming
events are in the coming weeks). To refresh them later, run the cleanup and
then the seed again.

## Remove

Paste and run `demo-cleanup.sql`. It deletes the demo accounts and the demo id
rows in a safe order and fails loudly if anything demo is left. It is safe to
run twice.

Note: if real staging accounts interacted with demo content (for example an
RSVP to a demo event or joining a demo chapter), those rows go too, because
what they point at is removed. Real accounts themselves are never touched.

## Seeing signed in screens

Demo accounts cannot sign in. To see screens like the community feed,
leaderboards, the talent directory or the admin queues populated, sign in with
your own staging admin account. To see the mentor or organisation views as
well, an admin can add their own account to a demo cohort as a mentor (admin,
Cohorts) or to Savanna Agro Traders (the organisation's team page).
