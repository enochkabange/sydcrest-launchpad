# Remote demand and pay snapshot: Data Analyst, Digital Marketing, Frontend Developer

Snapshot taken 14 November 2026 (data pulled 13:14 to 13:45 GMT). Desk research for SydCrest. This is a one-day snapshot, not the 8-week tracking.

**Short answer:** remote employers do hire junior people in all three tracks. But very few of the postings that are both junior and open to someone in Ghana show up on public boards. Digital Marketing has the most volume, the highest junior share and the most Ghana-eligible roles. Frontend has a similar share of Ghana-open roles, but very few junior roles. Data Analyst is the weakest. Its remote postings are mostly US-only and mostly mid or senior.

---

## 1. Method

**Sources.** I used only public APIs and feeds that are meant for reuse. I used no keys, made no sign-ups and submitted no forms. I read each board's terms before fetching (see section 8). All responses were fetched with curl and saved as untrusted raw data. I parsed them with `python3 -I`, using scripts kept outside the raw folder.

| Source | Endpoint used | What it gave | Postings loaded (all roles) |
|---|---|---|---|
| Himalayas | `/jobs/api/search?q=…` (19 track keyword queries, 5 pages each, sorted by both `recent` and `relevant`) plus `country=GH` queries | Structured location restrictions, timezones, seniority and salary fields | 2,635 unique |
| Jobicy | `/api/jobs` (one full cursor pass over its 7-day window) | Region (`jobGeo`), level and salary fields | 1,504 |
| We Work Remotely | 8 category RSS feeds plus the main RSS feed | Region field, no salary | 483 |
| Arbeitnow | `/api/job-board-api`, pages 1 to 10, `remote=true` rows only | Europe-centred listings from employer ATS systems, no salary | 164 remote (out of about 3,000) |
| Remote OK | `/api` | Location text and salary min/max | 97 |
| Remotive | `/api/remote-jobs` | Location text and salary text | 16 (the whole public feed) |

After de-duplicating on title plus company across boards, 4,528 postings were left. 1,621 of them matched one of the three tracks.

**Track matching (titles only).**
- **Data Analyst:** titles like data, BI, reporting, insights, product or marketing analyst, plus BI developer. Data engineers, scientists, security analysts and financial analysts are excluded.
- **Digital Marketing:** marketing and marketer titles, plus SEO/SEM/PPC, social media, paid media, media buyer, growth and content roles. Titles containing analyst, engineer or developer are excluded.
- **Frontend Developer:** frontend or front-end, React/Vue/Angular/JS/TS/UI/web developer, and WordPress, Shopify or Webflow developer. Full-stack and back-end titles are excluded.

**Seniority.**
- **Junior:** the title contains junior, jr, entry, intern, graduate, trainee, apprentice, assistant, associate, or a trailing "I".
- **Senior:** the title contains senior, lead, principal, staff, head, director, VP, chief, II, III or similar.
- If the title is neutral, I used the board's own level field (Himalayas or Jobicy).
- If there was no level field, I used years of experience in the text: 5 or more years means senior, 3 to 4 means mid.
- Text asking for 2 years or less is **not** counted as junior, because that rule is too noisy. Those rows are reported only as an upper bound.
- Everything else is mid.

**Location eligibility.**
- **Himalayas:** an empty country list with a UTC+0 timezone counts as worldwide. A country list that includes Ghana counts as Ghana-eligible. Any other list counts as not eligible. This follows the rule in Himalayas' own documentation.
- **Other boards:** I mapped the free-text location to worldwide, Africa, EMEA, Europe-only, UK-only, US-only, other multi-country, or unclear.
- **Description text:** used only to resolve "unclear" rows (for example "authorised to work in the US"), and to flag worldwide postings whose text then restricts location.
- **We Work Remotely:** its "Anywhere in the World" field is self-declared and often loose, so I count it as **likely**, not yes.
- **Arbeitnow:** remote rows with no country stated are labelled `europe-board-default`, because the board covers Europe. That label is my inference, not the employer's statement.

**Open to Ghana** means: yes (worldwide, or Ghana or Africa as a whole is named), likely (EMEA, or WWR "Anywhere"), unclear, or no.

**Cross-check.** I also used Himalayas' own `country=GH` filter, which includes worldwide roles open to Ghana. I paged through every result for six queries to build a **Ghana-open pool** that is not limited by my recency/relevance sample.

**Pay.** I took the midpoint of the stated range and converted it to annual USD:
- hourly × 2080, monthly × 12, weekly × 52;
- other currencies converted at ECB reference rates from Frankfurter (`api.frankfurter.dev`, 13 Nov 2026 fixing);
- values under $3,000 a year dropped as probable unit errors.

**Files** (all under `/private/tmp/claude-501/-Users-enigma-Documents-Vault-77-Sydcrest/addd14d0-cee9-44ad-8981-c7f21e972e6e/scratchpad/research/`):
- `fetch.sh`: rerunnable fetcher
- `classify.py`: rerunnable classifier
- `raw/2026-11-14/`: raw responses
- `out/2026-11-14/jobs.csv`: every in-track posting with its classification, for audit
- `out/2026-11-14/ghana_pool.csv`
- `out/2026-11-14/summary.json`
- `out/2026-11-14/report.md`: full classifier output

To rerun weekly: `bash fetch.sh raw/YYYY-MM-DD && python3 -I classify.py raw/YYYY-MM-DD out/YYYY-MM-DD`

---

## 2. Results by track (pooled sample, all boards, de-duplicated)

### Counts by board

| Track | Himalayas | Jobicy | WWR | Remote OK | Arbeitnow | Remotive | **Total** |
|---|---|---|---|---|---|---|---|
| Data Analyst | 224 | 8 | 1 | 0 | 0 | 0 | **233** |
| Digital Marketing | 981 | 66 | 38 | 3 | 15 | 0 | **1,103** |
| Frontend Developer | 266 | 9 | 5 | 4 | 1 | 0 | **285** |

Himalayas makes up about 90% of every track. The pooled shares below are therefore close to "what Himalayas shows". Himalayas' own `totalCount` estimates for unfiltered searches give a sense of market size. They are fuzzy (they match description text as well as titles) and capped at 5,000:
- "data analyst": 5,000 or more
- "digital marketing": 5,000 or more
- "front end": 3,173
- "react developer": 3,129
- "frontend developer": 2,656

### Seniority

| Track | Junior | Mid | Senior | Junior upper bound (adds "≤2 years" rows) |
|---|---|---|---|---|
| Data Analyst | 16 (7%) | 112 (48%) | 105 (45%) | 16 (7%) |
| Digital Marketing | 192 (17%) | 401 (36%) | 510 (46%) | 197 (18%) |
| Frontend Developer | 18 (6%) | 121 (42%) | 146 (51%) | 19 (7%) |

### Location eligibility

| Location | Data Analyst (n=233) | Digital Marketing (n=1,103) | Frontend (n=285) |
|---|---|---|---|
| Worldwide | 1 (0%) | 30 (3%) | 9 (3%) |
| Africa list (Ghana or other African countries) | 6 (3%) | 66 (6%) | 14 (5%) |
| EMEA | 1 (0%) | 4 (0%) | 0 |
| Europe-only | 22 (9%) | 122 (11%) | 74 (26%) |
| Europe (Arbeitnow board default) | 0 | 15 (1%) | 1 (0%) |
| UK-only | 13 (6%) | 37 (3%) | 7 (2%) |
| US-only | 121 (52%) | 381 (35%) | 72 (25%) |
| Other multi-country (LATAM, APAC, India, Philippines, Canada…) | 69 (30%) | 445 (40%) | 107 (38%) |
| Unclear | 0 | 3 (0%) | 1 (0%) |

The "Africa list" row includes postings that name other African countries but not Ghana. Those count as "no" for Ghana in the next table.

## 3. Eligibility for candidates in Ghana

| Track | Open to Ghana: yes | likely | yes + likely | unclear | **Junior AND yes/likely** | Ghana named in posting |
|---|---|---|---|---|---|---|
| Data Analyst | 1 | 2 | **3 (1%)** | 0 | **0** | 1 |
| Digital Marketing | 14 | 31 | **45 (4%)** | 3 | **5** | 16 |
| Frontend Developer | 10 | 3 | **13 (5%)** | 1 | **1** | 5 |

The board you look at changes the Ghana-open share a lot:

| Board (three tracks pooled) | n | Junior | Open to Ghana (yes/likely) | US-only |
|---|---|---|---|---|
| Himalayas | 1,471 | 15% | 2% | 37% |
| Jobicy | 83 | 4% | 6% | 29% |
| We Work Remotely | 44 | 5% | 70% (mostly "likely": self-declared "Anywhere") | 9% |
| Remote OK | 7 | 14% | 0% | 57% |
| Arbeitnow | 16 | 19% | 0% (Europe board) | 0% |

**Himalayas Ghana-open pool** (board-native `country=GH` filter; I paged through every result and kept in-track titles only):

| Track | Ghana-open postings | Junior | Mid | Senior | Via an explicit country list that includes Ghana | With salary |
|---|---|---|---|---|---|---|
| Data Analyst | 11 | 0 | 9 | 2 | 10 | 1 |
| Digital Marketing | 103 | 10 | 15 | 78 | 90 | 20 |
| Frontend Developer | 27 | 2 | 15 | 10 | 13 | 5 |

Board totals behind those queries:
- "data analyst": 61 open to Ghana, against an unfiltered 5,000 or more
- "front end": 71 open to Ghana, against 3,173 (about 2%)
- "react developer": 68 against 3,129 (about 2%)
- "marketing": 268 against 5,000 or more

Many "explicit list" postings carry a near-global country list (Afghanistan … Zimbabwe). Some of those lists are looser than the posting's text: one is titled "Data Analyst – Remote Europe/UK". The digital marketing senior count is also inflated by one title, "Client Account Manager – Marketing Agency", appearing 9 times.

**Reading:** about 1 to 5% of remote postings in these tracks are open to Ghana. Postings that are also junior number in single digits per track. Examples of junior Ghana-open roles seen today:
- Junior Performance Marketer (2 recruiters)
- Digital Marketing Associate
- Growth & Marketing Associate: lists Ghana explicitly, $13.2k a year
- Junior Amazon PPC Manager
- International marketing internships
- Junior Frontend Developer (a "future position" talent pool)
- Web Frontend Engineer at Canonical: about $59k

## 4. Pay (annual USD, midpoint of stated range)

### All in-track postings with a stated salary

| Track | Seniority | n | p25 | Median | p75 |
|---|---|---|---|---|---|
| Data Analyst | junior | 5 | $70k | $82k | $85k |
| | mid | 36 | $71k | $87k | $97k |
| | senior | 50 | $106k | $124k | $150k |
| Digital Marketing | junior | 43 | $17k | $33k | $68k |
| | mid | 111 | $30k | $60k | $75k |
| | senior | 202 | $73k | $107k | $150k |
| Frontend | junior | 2 | $38k | $53k | $68k |
| | mid | 31 | $46k | $92k | $140k |
| | senior | 41 | $115k | $152k | $192k |

Pay depends on the hiring market, and that drives these numbers:

| Track / seniority | US-only median (n) | Europe/UK median (n) | Other regions median (n) |
|---|---|---|---|
| Data Analyst junior | $82.5k (5) | none | none |
| Data Analyst mid | $89k (28) | $46k (2) | $45k (6) |
| Digital Marketing junior | $67k (22) | $41k (1) | **$18k (20)** |
| Digital Marketing mid | $70k (59) | $48k (10) | $24k (42) |
| Frontend junior | $82.5k (1) | $23k (1) | none |
| Frontend mid | $135k (19) | $50k (4) | $35k (8) |

"Other regions" is mostly the Philippines, India and LATAM offshore markets. That is the market a Ghana-based junior is most likely to be priced against.

### Postings open to Ghana with a stated salary (very small samples)
- **Pooled sample:** Digital Marketing n=6, median $70k (p25 to p75: $56k to $78k). Frontend n=1, $52k. Data Analyst n=0.
- **Himalayas Ghana-open pool:**
  - Digital Marketing n=20, median $100k (mostly senior). Mid n=4: $57k. Junior n=1: $13k.
  - Frontend n=5, median $66k (p25 to p75: $59k to $88k).
  - Data Analyst n=1: $56k.

### Published benchmarks
All are US data and not specific to remote work. Use them as a ceiling for junior pay, not as the expected offer to a Ghana-based remote hire.

| Role | Figure | Source (accessed 14 Nov 2026) |
|---|---|---|
| Junior Data Analyst (US) | Average base $63,393. Median $63k. 10th to 90th percentile $46k to $84k. 205 profiles, updated 20 Oct 2026. | Payscale: https://www.payscale.com/research/US/Job=Junior_Data_Analyst/Salary |
| Data Analyst, under 1 year of experience (US) | Average total pay $63,574 (1,477 salaries). Overall median base $71k. Updated 20 Oct 2026. | Payscale: https://www.payscale.com/research/US/Job=Data_Analyst/Salary |
| Junior Front End Developer (US) | Average base $49,619. Median $50k. 10th to 90th percentile $33k to $71k. 61 profiles, updated 1 Sep 2026. | Payscale: https://www.payscale.com/research/US/Job=Junior_Front_End_Developer/Salary |
| Digital Marketing Coordinator (US) | Average base $50,702. Median $51k. 10th to 90th percentile $41k to $63k. 384 profiles. Under 1 year of experience: $44,572 total pay (35 salaries). Updated 5 Sep 2026. | Payscale: https://www.payscale.com/research/US/Job=Digital_Marketing_Coordinator/Salary |

I checked two more sources and left them out of the table. ITJobsWatch's UK Junior Data Analyst median of £31,750 rests on only 4 salaries in the 6 months to 14 Nov 2026. Himalayas' "entry-level front end developer" salary page is based on 1 salary. I found no reputable published dataset for remote junior pay to Africa-based hires.

## 5. Limitations

- **Snapshot.** This is one day. Jobicy covers only a 7-day window, and Remotive's public feed is delayed 24 hours and now exposes only 16 jobs (Remotive also offers a paid private API). Week-to-week variation is unknown until the 8-week tracking runs.
- **Board coverage bias.** About 90% of in-track rows come from Himalayas, sampled as the top 100 per keyword query (recent and relevant). These are not complete counts of the market. The pooled shares mostly describe Himalayas. Boards with a more global audience (WWR) show far higher "anywhere" shares, but their location field is self-declared. LinkedIn, Indeed, Wellfound, Upwork and agency or "employer of record" channels are not covered, and Ghana-relevant hiring may well happen there (untested).
- **Keyword classification error.** A hand spot-check of 36 random rows plus about 60 Ghana-open rows found:
  - Track precision of roughly 85 to 90%. Noise includes "Tax Reporting Analyst", "Workday Reporting Analyst", "Social Media Video Editor", translation roles with "marketing" in the title, and "Consultant – Marketing Software".
  - Seniority looked right in roughly 90% of cases. Board level fields drive many "mid" and "senior" calls and are not always right.
  - Treat every count as ±15%.
- **Location rules.**
  - Himalayas country lists sometimes say Ghana while the text says Europe/UK. So "explicitly lists Ghana" can overstate real eligibility.
  - Several WWR "Anywhere in the World" rows also carry a US country or state in the feed's headquarters fields (for example Zanda Health, Socure and ClickHouse with a US country; Reframe Space and Forager with California). I did not check those postings' description text. All WWR "Anywhere" rows are "likely" at best.
  - Postings marked "Worldwide" may still require a contractor arrangement, specific hours, or payment rails that work for Ghana. None of this was checked.
- **Pay.**
  - Only about 32% of in-track rows state a salary, and the junior and Ghana-open samples are tiny (n of 0 to 6, apart from the Himalayas pool for Digital Marketing at n=20).
  - Pay was converted at one day's FX rates, and midpoints hide ranges.
  - Some board salary fields are mislabelled by period. Under $3k a year was dropped; other errors may remain.
- **Arbeitnow** was capped at 10 pages, and its remote rows are assumed to be Europe-bound.
- **We Work Remotely's terms page** returned HTTP 403 to automated requests, so I could not read it. I used only its published RSS feeds: its robots.txt allows them, and they are published for feed readers.

## 6. Implications for SydCrest

1. **Digital Marketing looks strongest for remote junior placement.** It has the largest volume (about 4× Data Analyst in the sample), the highest junior share (17 to 18%), and the most Ghana-eligible postings (45 in the pooled sample, 103 in the Himalayas Ghana-open pool, 10 of them junior). The roles that match are performance, paid media, PPC and SEO, plus "associate" and "assistant" titles. The catch is pay: in postings outside the US/EU, junior Digital Marketing pay has a median of **$18k a year (n=20)** and mid-level a median of $24k (n=42), reflecting offshore Philippines/India pricing. The $50k to $67k US figures apply only to US-located hires.
2. **Frontend is viable but rarely junior.** 4 to 5% of postings are open to Ghana, a bit above Digital Marketing, and the pay is good ($52k to $66k for the few Ghana-open roles that state salary). But only 6 to 7% of postings are junior, and the junior Ghana-open roles seen today were a talent-pool listing and one at Canonical. A frontend graduate would need to look like a mid-level hire (portfolio, shipped work) or come in through talent marketplaces (micro1, G2i, Hivex-style platforms show up repeatedly).
3. **Data Analyst is the weakest for remote placement from Ghana.** 52% of postings are US-only. Only 3 of 233 (1%) are open to Ghana, and none of those are junior. Today's public boards do not support a "remote junior data analyst job from Accra" promise. If SydCrest keeps the track, plan the outcome around local and regional employers, freelance or contract analytics work, or data skills as an add-on to marketing (marketing analytics, paid acquisition reporting). Several Ghana-open "analyst" roles were in fact marketing or growth analytics.
4. **Junior viability overall is thin.** On public boards, roughly 0 to 5 postings per track per snapshot are both junior and open to Ghana. That supports a small, selective cohort and an "employability for global remote work" message, not a placement guarantee. The 8-week tracking should test whether these numbers hold. It should also add the channels where Ghana-based remote hiring actually happens: talent marketplaces, EOR-backed employers, agencies, and Africa-focused boards.
5. **Positioning.** The roles open to Ghana mostly come from EMEA-time-zone or global companies (Canonical, Kayzen, Yellow Card, Sporty Group), recruiters, and offshore-staffing intermediaries. Use GMT overlap with the UK and EU and stress English-language strength. That fits the UK/EU-first plan.

## 7. Sources (all accessed 14 November 2026)

Job data. Per each board's terms, jobs are credited to and link back to the original board. The rows in `jobs.csv` are a dated audit snapshot, not a public listing, and should not be republished. Expired Himalayas jobs should be removed if any listing is ever shown.
- **Himalayas**, Remote Jobs API: https://himalayas.app/jobs/api/search (docs and API terms: https://himalayas.app/api). Source: himalayas.app.
- **Jobicy**, Remote Jobs API: https://jobicy.com/api/jobs (docs and fair use: https://github.com/Jobicy/remote-jobs-api, https://jobicy.com/jobs-rss-feed). Jobs courtesy of Jobicy, https://jobicy.com.
- **We Work Remotely**, RSS feeds: https://weworkremotely.com/remote-jobs.rss and https://weworkremotely.com/categories/*.rss (robots.txt: https://weworkremotely.com/robots.txt). Source: We Work Remotely, https://weworkremotely.com.
- **Remote OK**, API: https://remoteok.com/api (terms in the API response: link back and name "Remote OK"). Source: Remote OK, https://remoteok.com.
- **Remotive**, API: https://remotive.com/api/remote-jobs (docs: https://github.com/remotive-com/remote-jobs-api; max 4 calls a day, attribution required). Source: Remotive, https://remotive.com.
- **Arbeitnow**, Job Board API: https://www.arbeitnow.com/api/job-board-api (docs: https://www.arbeitnow.com/blog/job-board-api). Source: Arbeitnow, https://www.arbeitnow.com.
- **FX:** Frankfurter (ECB reference rates), https://api.frankfurter.dev/v1/latest?base=USD

Published salary data:
- Payscale, Junior Data Analyst: https://www.payscale.com/research/US/Job=Junior_Data_Analyst/Salary
- Payscale, Data Analyst: https://www.payscale.com/research/US/Job=Data_Analyst/Salary
- Payscale, Junior Front End Developer: https://www.payscale.com/research/US/Job=Junior_Front_End_Developer/Salary
- Payscale, Digital Marketing Coordinator: https://www.payscale.com/research/US/Job=Digital_Marketing_Coordinator/Salary
- ITJobsWatch, Junior Data Analyst (UK): https://www.itjobswatch.co.uk/jobs/uk/junior%20data%20analyst.do (excluded: n=4)
- Himalayas, Entry-level Front End Developer salary (US): https://himalayas.app/salaries/countries/united-states/entry-level-front-end-developer (excluded: n=1)
