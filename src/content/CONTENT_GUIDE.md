# SydCrest content guide

Every roadmap, explanation, practice task and quiz follows this guide. Agents
write; a different agent reviews against the rubric at the end; the founder
spot checks and publishes.

## Who we write for
A young Ghanaian, often in the north (Tamale, Bolgatanga, Wa, Damongo,
Nalerigu), often learning on a phone with a prepaid data bundle, sometimes on a
shared device or a laptop or desktop at school, work or a hub, often with little
formal tech background. Smart, motivated, short on
money and data, not short on ability.

## Provenance (non negotiable)
- Everything is written from scratch. **Never open, search for, quote or adapt
  roadmap.sh**, and skip any page that reproduces it. Do not run "X roadmap"
  style searches.
- Sources we do use: Ghanaian and remote junior job adverts (analysed for which
  skills appear, never copied), openly licensed curricula (MDN Learning Area,
  freeCodeCamp, Google's free courses; read for which topics exist, never lift
  text or ordering, record the licence), public skills frameworks (ESCO, O*NET),
  official documentation.
- No logins and no scraping of sites that forbid it (LinkedIn). Web search
  snippets and public career pages are fine.
- Every source used is listed with URL, date read and licence in
  `src/content/research/<track>.md`.

## Roadmap structure
- 15 to 30 nodes, a shallow tree of sections with 2 to 4 topics each, beginner
  to job ready.
- Every node is justified in the research file's coverage table by at least one
  signal: job adverts, a skills framework, or a prerequisite of another node.
- Slugs are lowercase, hyphenated, stable. Change them only before publishing.

## Node content
- **Explanation:** 300 to 600 words, markdown, short paragraphs, plain English.
  Start with why it matters for a job in Ghana, then the idea, then a small
  worked example. Headings only if they help on a small screen. Code blocks
  short enough to read on a small screen.
- **Practice task:** doable with free tools on a phone or a computer,
  with little data. Clear goal, steps, and what "done" looks like. Something a
  learner can show a mentor or put in a portfolio.
- **Quiz:** 4 or 5 questions, 4 options each, exactly one clearly correct,
  every question answerable from the explanation alone. Plausible wrong options,
  no trick wording, no "all of the above". A one sentence explanation per
  question. `answer_index` is 0 based. `pass_threshold` is a percentage from
  50 to 100: use 75 for 4 questions and 80 for 5.
- **Outcomes:** 3 or 4 short "You will be able to" items per lesson, each
  starting with a verb, no full stop, drawn only from what the lesson teaches.
- **Optional anatomy:** `workedExample_md`, `keyTerms`, `commonMistakes`,
  `selfCheck`; the lesson page shows each one when present.
- **Ratings (issue #255):** every node in `src/content/roadmaps/<track>.ts`
  has `difficulty` and `complexity` (1 to 5); every section has `careerLevel`
  and `jobs`, using only job titles found in `research/<track>.md` (leave it
  empty rather than invent one; never salaries).
- Shape: exactly what `src/lib/content-generation/schema.ts` validates.

## Local context and voice
- Ghanaian examples: MoMo payments, cedis, a chop bar menu, a Tamale shop's
  stock list, a church or school WhatsApp group, a market trader's records, an
  NGO field survey. Names: Wumpini, Abdul-Rahman, Mariama, Fuseini, Hawa,
  Issahaku, Sumaila, Amina.
- Encouraging, direct, never condescending. "You" not "the learner".
- **No dashes or em dashes** anywhere in learner copy.
- **No statistics, salary figures or claims we can't source.** No "X% of
  employers". No brand endorsements; name tools and companies only as examples.
- Links in content only to free, reputable pages you are confident exist.

## Devices
We design phone first, but we write for every device. Many learners use a
phone, many use a laptop or desktop, and most switch between them.
- Address the reader on any device: "your phone or computer", "your device",
  "your browser". Never assume they are holding a phone.
- Name a device only when it changes what the learner does: a task that truly
  needs a laptop (say so and why), a feature that only exists in the web or
  desktop version, or a tip that differs (give the phone and the computer
  version side by side).
- Phones as subject matter are fine and stay: building mobile apps, phone
  forms for field data, SMS, mobile money, phone numbers, a trader who sells
  phone accessories.
- Never call the platform, a track or a lesson "phone only" or "for phones".
 (reviewer agent, per node)
1. Accurate and current.
2. Fits the learner above; localised without being forced.
3. Readable on any screen; within the word range; device neutral (see Devices).
4. Practice task is doable with free tools and little data.
5. Every quiz question answerable from the explanation; one correct answer.
6. No dashes, no invented numbers, no endorsements.
7. Provenance clean: no roadmap.sh, sources listed.
