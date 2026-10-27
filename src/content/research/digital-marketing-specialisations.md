# Research: Digital Marketing Specialisations track

Track file: `src/content/roadmaps/digital-marketing-specialisations.ts` (roadmap slug `digital-marketing-specialisations`, track `digital-marketing-specialisations`).
Lesson content: `src/content/roadmaps/content/digital-marketing-specialisations.content.ts`.
Week mapping: `src/content/dmp/week-lessons.ts`.
Researched 27 October 2026 for issue #198.

## Why this roadmap exists

The Delta Mentoring Program (`src/content/dmp/curriculum.ts`) forks in weeks 7 to 9 into three specialisations: SEO and Content Marketing, Social Media Marketing, and Google Ads (SEM). The phase 2 DMP seed linked each of those weeks to only one or two beginner topics in the Digital Marketer roadmap, so an external course did the real teaching. The founder's rule (27 Oct) is that external links are never the only teaching. The Digital Marketer roadmap already has 30 nodes, the validator's maximum, so the lead chose a companion roadmap: three sections (one per specialisation), each with nine lessons, three per week, in week order. That makes 30 nodes.

Outline decisions:

* **Three sections of nine topics.** CONTENT_GUIDE suggests 2 to 4 topics per section; this roadmap deliberately has 9, on the lead's decision, because each section is one specialisation a learner follows for three weeks and its order mirrors the weeks. Every node is `optional: false` so progress counts work normally; a learner only follows the section for their chosen specialisation.
* **No `kind` or `choice_group`.** The admin import test expects existing drafts to carry neither.
* **Section lessons are taught.** Each section lesson introduces the specialisation and is linked to its week 7.
* **No overlap with the beginner roadmap.** The Digital Marketer topics `seo-basics`, `google-business-profile`, `social-ads`, `search-ads`, `short-video`, `community-management` and `budgets-in-cedis` teach the beginner layer. These lessons go one level deeper and stay linked as refreshers in the week mapping.

## Method and provenance

* No roadmap.sh pages, no "field roadmap" searches, no logins, no LinkedIn.
* Job adverts were read for skill keywords only; no advert text is copied. Salary figures shown on some pages were deliberately not recorded.
* The 20 adverts analysed for the Digital Marketer track (`src/content/research/digital-marketing.md`, read 25 Oct 2026) are reused as signals and cited as DM#n. Nine specialist adverts were added and are cited as S#n.
* Current platform facts in the lessons (match types, Quality Score, Ad Rank, budgets, responsive search ad limits, campaign types, bid strategies, local ranking, link attributes, title and snippet guidance, Shorts length, disclosure labels) were checked on official help pages on 27 Oct 2026 and are listed below. Platform features change, so lessons that name labels say "at the time of writing" or tell learners to check the current screen.

## Sources

| Title | URL | Date read | Licence or type |
| --- | --- | --- | --- |
| SydCrest DMP curriculum, weeks 7 to 9 | `src/content/dmp/curriculum.ts` | 2026-10-27 | Internal |
| Digital Marketer research (20 adverts, frameworks) | `src/content/research/digital-marketing.md` | 2026-10-27 | Internal |
| Google Search Central, Creating helpful, reliable, people first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | 2026-10-27 | Official documentation; fact check (helpful content, E E A T, trust) |
| Google Search Central, Title links | https://developers.google.com/search/docs/appearance/title-link | 2026-10-27 | Official documentation; fact check (unique, concise titles, no fixed limit) |
| Google Search Central, Snippets and meta descriptions | https://developers.google.com/search/docs/appearance/snippet | 2026-10-27 | Official documentation; fact check (snippets mostly from page content) |
| Google Search Central, Spam policies (link spam) | https://developers.google.com/search/docs/essentials/spam-policies | 2026-10-27 | Official documentation; fact check (buying links, sponsored or nofollow) |
| Google Search Central, Qualify outbound links | https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links | 2026-10-27 | Official documentation; fact check (sponsored, ugc, nofollow) |
| Google Search Central, Image SEO and Video SEO best practices | https://developers.google.com/search/docs/appearance/google-images and https://developers.google.com/search/docs/appearance/video | 2026-10-27 | Official documentation; checked to resolve, used as further reading |
| Google Business Profile Help, Tips to improve your local ranking | https://support.google.com/business/answer/7091 | 2026-10-27 | Official documentation; fact check (relevance, distance, prominence; no paid ranking) |
| Google Ads Help, About keyword matching options | https://support.google.com/google-ads/answer/7478529 | 2026-10-27 | Official documentation; fact check (broad, phrase, exact, negatives) |
| Google Ads Help, About Quality Score | https://support.google.com/google-ads/answer/6167118 | 2026-10-27 | Official documentation; fact check (1 to 10, three components, not an auction input) |
| Google Ads Help, About Ad Rank | https://support.google.com/google-ads/answer/1752122 | 2026-10-27 | Official documentation; fact check (Ad Rank factors, relevance offsets bid) |
| Google Ads Help, About responsive search ads | https://support.google.com/google-ads/answer/7684791 | 2026-10-27 | Official documentation; fact check (15 headlines, 4 descriptions, 30 and 90 characters, pinning) |
| Google Ads Help, About average daily budgets | https://support.google.com/google-ads/answer/2375420 | 2026-10-27 | Official documentation; fact check (divide monthly by 30.4) |
| Google Ads Help, Why daily costs might exceed the budget | https://support.google.com/google-ads/answer/1704443 | 2026-10-27 | Official documentation; fact check (up to twice daily, 30.4 times monthly) |
| Google Ads Help, Determine a bid strategy | https://support.google.com/google-ads/answer/2472725 | 2026-10-27 | Official documentation; fact check (Manual CPC, Maximise clicks, Maximise conversions, Target CPA, Target ROAS) |
| Google Ads Help, Choose the right campaign type | https://support.google.com/google-ads/answer/2567043 | 2026-10-27 | Official documentation; fact check (Search, Performance Max, Display, Video, App, Shopping; Demand Gen listed) |
| Google Ads Help, Use Keyword Planner | https://support.google.com/google-ads/answer/7337243 | 2026-10-27 | Official documentation; fact check (needs account setup including billing, so lessons do not depend on it) |
| YouTube Help, Shorts length | https://support.google.com/youtube/answer/15424877 | 2026-10-27 | Official documentation; fact check (Shorts up to three minutes) |
| Instagram Help Centre, How to use the paid partnership label to tag organic branded content on Instagram | https://help.instagram.com/1109894795810258 | 2026-10-27 | Official documentation, read in full in a browser by the reviewer; fact check (Branded Content Policies require the paid partnership label to tag the brand) |
| TikTok Help Center, Promoting a brand, product or service | https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/promoting-a-brand-product-or-service | 2026-10-27 | Official documentation, read in full in a browser by the reviewer; fact check (content disclosure setting required; Paid partnership label for another business, Promotional content for your own) |
| TikTok Branded Content Policy | https://www.tiktok.com/legal/page/global/bc-policy/en | 2026-10-27 | Official policy; fact check (commercial content disclosure toggle required for branded content) |
| Meta Business Help Center, How to choose the right ad objective in Meta Ads Manager | https://www.facebook.com/business/help/1438417719786914 | 2026-10-27 | Official documentation, read in full in a browser by the reviewer; fact check (six objectives: Awareness, Traffic, Engagement, Leads, App promotion, Sales; Traffic sends people to a website, app or Page; Engagement covers messages) |
| Meta Business Help Center, About Advantage+ campaign budget | https://www.facebook.com/business/help/153514848493595 | 2026-10-27 | Official documentation; fact check (one campaign budget shared across ad sets as an alternative to ad set budgets) |
| O*NET 13-1161.01 Search Marketing Strategists | https://www.onetonline.org/link/summary/13-1161.01 | 2026-10-25 (via DM research) | CC BY 4.0 |
| ESCO digital marketing manager (via crosswalk) | see DM research | 2026-10-25 (via DM research) | ESCO reuse terms |

## Specialist adverts added (9)

Depth: F = full advert or full keyword summary of the page, C = listing card, S = search snippet. Level: E = entry, M = mid, S = senior.

| # | Role | Employer type | Location | Date | Level | Depth | Skill keywords | Source URL |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | Digital Ads and Social Media Specialist | Residential property | Accra | Deadline May 2026 (closed) | M | F | Meta Ads, Google Ads, media buying, ad budgets, campaign optimisation, CTR, conversion rate, ROAS, content planning, lead generation | https://jobs.com.gh/job/digital-ads-social-media-specialist-at-oceanview-apartments/ |
| S2 | SEO and Content Marketing Specialist | Advertising and media | Accra | Nov 2024 | M | F | SEO audits, keyword research, competitor analysis, on page optimisation, content strategy, link building, Search Console, Analytics, Keyword Planner, Business Profile optimisation, reporting | https://www.jobsearchgh.com/jobs/22110/seo-content-marketing-specialist-strategic-agile |
| S3 | SEO Specialist | Advertising agency | Accra | Jan 2022 (older, used for skill shape only) | M | F | keyword research, link building, local SEO, technical SEO, content strategy, Search Console, PPC, Google Ads, copywriting, spreadsheets | https://www.jobsearchgh.com/jobs/16357/seo-specialist-command-space |
| S4 | Search Engine Optimization Specialist | Not stated | Accra | Date not shown | M | S | keyword research, SEO audits, content and structure optimisation | https://www.jobberman.com.gh/listings/search-engine-optimization-specialist-d785k0 (snippet; page redirected to a category list) |
| S5 | Social Media Manager / Digital Marketer | Company | Accra | Oct 2026 | E/M | C | social media management, content creation, digital advertising, performance monitoring | Jobberman marketing category page (listing card) |
| S6 | Social Media Team Lead (multi brand) | Company | Accra | Sep to Oct 2026 | S | C | content planning, campaign management, performance monitoring | Jobberman marketing category page (listing card) |
| S7 | Multimedia Designer | Advertising network | Accra | Oct 2026 | M | C | motion graphics, video production, social media design, creative briefs | Jobberman Accra listing page (listing card) |
| S8 | TikTok Live Host | Company | Accra | Oct 2026 | E | C | live streaming, on camera presence, hosting | Jobberman marketing category page (listing card) |
| S9 | Shop Attendant and Social Media Pages Manager | Retail SME | Accra | Oct 2026 | E | C | social media management, content creation, online brand building, customer service | Jobberman Accra listing page (listing card) |

Pages that could not be used: a Careerjet PPC Specialist advert (verification wall), a Keda Ghana Ceramics and a logistics company social media advert (expired, no text), an AmaliTech Content and SEO Specialist advert (404).

## Skills signals by specialisation

| Skill | Signals |
| --- | --- |
| Keyword research | S2, S3, S4, DM#16; O*NET search marketing tasks; DMP SEO week 7 |
| On page optimisation and audits | S2, S3, S4; DMP SEO week 7 |
| Link building | S2, S3; DMP SEO week 8 |
| Local SEO and Business Profile | S2, S3; DMP SEO week 8 |
| Content strategy and planning | S2, S3, S6, DM#18; DMP SEO week 9 |
| Search Console and reporting | S2, S3 |
| Paid social (Meta Ads) and targeting | S1, S5, DM#14, DM#18; DMP social week 7 |
| Ad budgets and optimisation | S1, DM#18; DMP social week 7 and Google Ads week 9 |
| Video production, storytelling, editing | S7, S8, DM#3, DM#7, DM#14; DMP social week 8 |
| Community and influencer partnerships | DM#12, DM#17; DMP social week 9 |
| Google Ads, PPC, SEM | S1, S3, DM#14, DM#18; O*NET paid search; DMP Google Ads weeks 7 to 9 |
| Campaign metrics (CTR, conversion rate, ROAS) | S1; O*NET web metrics; DMP Google Ads week 9 |
| Certifications (Google, Meta) | DM#18; DMP Google Ads week 7 (Skillshop) |

## Coverage table

| Node slug | Week | Signals |
| --- | --- | --- |
| seo-content | Section, SEO week 7 | DMP SEO track; S2, S3, S4; Google helpful content guidance |
| keyword-research | SEO 7 | DMP week 7 objective (keyword research); S2, S3, S4, DM#16; O*NET |
| search-intent | SEO 7 | DMP week 7; S2 (content strategy); O*NET keyword research and search intent |
| on-page-seo | SEO 7 | DMP week 7 objective (on page) and assignment; S2, S4; Google title and snippet docs |
| backlinks | SEO 8 | DMP week 8 objective (backlinks); S2, S3 (link building); Google spam policies |
| local-seo | SEO 8 | DMP week 8 objective (local SEO); S2 (Business Profile), S3 (local SEO); Google local ranking help |
| listings-and-outreach | SEO 8 | DMP week 8 objective and assignment (directories, outreach emails); S2, S3 (link building) |
| content-pillars | SEO 9 | DMP week 9 theme (advanced content strategy); S2, S3, DM#18 |
| faqs-and-multimedia | SEO 9 | DMP week 9 objective (blogs, FAQs, multimedia); Google image and video SEO docs |
| seo-strategy-plan | SEO 9 | DMP week 9 objective and assignment (calendar, one page strategy); S2 (Search Console, reporting) |
| social-media-marketing | Section, social week 7 | DMP social track; S1, S5, S6; DM#14 |
| social-campaign-structure | Social 7 | DMP week 7 (mock campaign); S1 (Meta Ads, media buying); DM#18 (paid social) |
| audience-targeting | Social 7 | DMP week 7 theme (advanced ad targeting) and objective (defined audience); S1 |
| social-budgets-and-testing | Social 7 | DMP week 7 objective (budget) and assignment; S1 (ad budgets, optimisation); DMP week 6 (A/B basics) |
| social-storytelling | Social 8 | DMP week 8 theme and objective (storytelling); S6, S7 |
| video-scripting-and-shooting | Social 8 | DMP week 8 assignment (30 second promo); S7, S8, DM#7 |
| video-editing-and-captions | Social 8 | DMP week 8 assignment; S7, DM#3 (CapCut), DM#7, DM#14 |
| community-building | Social 9 | DMP week 9 theme (community building); DM#12 (community manager), DM#13, S9 |
| micro-influencers | Social 9 | DMP week 9 objective (identify micro influencers); DM#12, DM#17 |
| influencer-collaborations | Social 9 | DMP week 9 objective and assignment (pitch, proposals); DM#12, DM#17; Instagram and TikTok disclosure help |
| google-ads | Section, Ads week 7 | DMP Google Ads track; S1, S3, DM#14, DM#18 |
| google-ads-auction | Ads 7 | DMP week 7 theme (fundamentals); Google Ad Rank and Quality Score help |
| campaign-types-and-goals | Ads 7 | DMP week 7 (Search Ads readiness unit); Google campaign types help; S1 (lead generation) |
| account-structure | Ads 7 | DMP week 7 and week 9 assignment (demo campaign settings); S3 |
| keywords-and-match-types | Ads 8 | DMP week 8 objective (choose keywords); S2 (Keyword Planner), S3; Google match types help |
| responsive-search-ads | Ads 8 | DMP week 8 objective and assignment (three ad copies); S3 (copywriting); Google RSA help |
| assets-and-landing-pages | Ads 8 | DMP week 8 assignment (sample campaign); Quality Score landing page component; S1 (conversion rates) |
| budgets-and-bidding | Ads 9 | DMP week 9 theme (budgeting) and objective (bid adjustments); S1 (budgets, ROAS); Google budget and bid strategy help |
| reading-campaign-data | Ads 9 | DMP week 9 objective (analyse campaign data); S1 (CTR, conversion rate); O*NET web metrics |
| optimising-campaigns | Ads 9 | DMP week 9 objective and assignment (bid adjustments, demo campaign); S1 (campaign optimisation) |

## Gaps and choices

* **Technical SEO** (S3, HTML and site audits in S2) is not a separate node: the DMP weeks do not cover it and most learners will not control site code. On page SEO covers speed, image size and readable addresses at a beginner level.
* **Paid SEO tools** (SEMrush, Ahrefs in S2, S3) are not taught; lessons use free tools only. They are named nowhere in learner copy.
* **Keyword Planner** needs a Google Ads account with billing completed, so lessons teach free keyword methods and mention it only as optional.
* **Week 9 Google Ads assignment** asks learners to create a Google Ads account. The lessons tell learners never to add payment details for practice and to document settings in a sheet if setup cannot continue without them.
* **Meta objective names, Instagram and TikTok disclosure wording** were confirmed by the reviewer on the official help pages, read in a browser on 27 Oct 2026. The lessons keep "at the time of writing, check the screen" because platform labels change.
