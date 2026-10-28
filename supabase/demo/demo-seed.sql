-- SydCrest STAGING demo data. NEVER run this against production.
--
-- Fills every screen with realistic, internally consistent demo rows so the
-- founder and Claude Design can review full, partial and empty states.
-- Run it in the Supabase SQL editor (postgres role) on STAGING only. It is
-- idempotent: fixed ids and "on conflict do nothing", so a second run changes
-- nothing. Remove everything with demo-cleanup.sql. See README.md.
--
-- Every demo row is findable for cleanup:
--   * auth users have emails ending @demo.sydcrest.test (profiles and all
--     their own rows cascade from them);
--   * every other row this file inserts has an id starting de000000-.
-- Demo users have a random, unknown bcrypt password: nobody can sign in as them.
-- Timestamps are relative to now(), so streaks and upcoming events are fresh on
-- the day you run it. To refresh later: run demo-cleanup.sql, then this file.
--
-- Prerequisite: the roadmaps are imported and published on staging (admin,
-- Roadmaps, Import draft roadmaps). Without them the learning progress,
-- streaks and leaderboards are skipped; everything else still loads.

begin;

-- Safety catch: refuse to run where it looks like production.
do $$
begin
  if (select count(*) from auth.users where email not like '%@demo.sydcrest.test') > 500 then
    raise exception 'More than 500 real accounts here. This looks like production. Demo data is for staging only.';
  end if;
end $$;

create or replace function pg_temp.did(k integer, n bigint) returns uuid
language sql immutable as $$
  select ('de000000-' || lpad(k::text, 4, '0') || '-4000-8000-' || lpad(n::text, 12, '0'))::uuid
$$;
create or replace function pg_temp.uid(n integer) returns uuid
language sql immutable as $$ select pg_temp.did(1, n) $$;
-- A moment n days (and m minutes) ago, never in the future.
create or replace function pg_temp.ago(days numeric, minutes integer default 0) returns timestamptz
language sql stable as $$ select now() - make_interval(mins => (days * 1440)::integer + minutes) $$;
-- Ghana date n days from today, as a date (negative for the past).
create or replace function pg_temp.day(n integer) returns date
language sql stable as $$ select (now() at time zone 'Africa/Accra')::date + n $$;

-- Ids and slugs below must not be taken by real (non demo) rows.
do $$
declare
  v_clash text;
begin
  select string_agg(x, ', ') into v_clash from (
    select 'chapter ' || slug as x from public.chapters
     where slug in ('tamale', 'bolgatanga', 'wa') and id::text not like 'de000000-%'
    union all
    select 'event ' || slug from public.community_events
     where slug like 'demo-%' and id::text not like 'de000000-%'
    union all
    select 'organisation ' || slug from public.organisations
     where slug in ('savanna-agro-traders', 'northern-youth-skills-network', 'tamale-print-and-design-studio')
       and id::text not like 'de000000-%'
    union all
    select 'cohort ' || c.name from public.cohorts c join public.programs p on p.id = c.program_id
     where p.slug = 'dmp' and c.name in ('Tamale pilot cohort', 'Tamale cohort 2', 'Tamale cohort 3')
       and c.id::text not like 'de000000-%'
  ) t;
  if v_clash is not null then
    raise exception 'Demo data would clash with existing rows: %. Rename them in demo-seed.sql first.', v_clash;
  end if;
  if not exists (select 1 from public.programs where slug = 'dmp') then
    raise exception 'The Delta Mentoring Program (slug dmp) is missing. Apply the migrations first.';
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- People: 30 learners (1 to 30), 8 mentors (31 to 38), 7 experts (41 to 47,
-- the last one still pending), 5 organisation staff (51 to 55).
-- ---------------------------------------------------------------------------
create temp table demo_people (
  n integer primary key,
  name text not null,
  region text not null,
  role text not null,          -- profiles.role
  slug text,                   -- public profile slug; null keeps it private
  headline text,
  skills text[] not null default '{}',
  goals text,
  joined integer not null,     -- days ago
  phone text
) on commit drop;

insert into demo_people (n, name, region, role, slug, headline, skills, goals, joined, phone) values
  (1,  'Fuseini Mahama',      'northern',      'learner', 'fuseini-mahama',      'Data analyst in training, Tamale',              '{Google Sheets,Data cleaning,Pivot tables,SQL basics}', 'Help NGOs in the north make sense of their field data.', 240, '+233200000101'),
  (2,  'Zulaiha Alhassan',    'northern',      'learner', 'zulaiha-alhassan',    'Social media and content for small businesses',  '{Content planning,Canva,Facebook pages}',               'Run social media for shops and cooperatives in Tamale.', 236, '+233200000102'),
  (3,  'Abdul-Rahman Iddrisu','northern',      'learner', 'abdul-rahman-iddrisu','Learning web development',                       '{HTML,CSS,JavaScript basics}',                          'Build websites for local businesses.', 231, null),
  (4,  'Mariama Yakubu',      'northern',      'learner', 'mariama-yakubu',      'Video and community radio content',             '{Short video,Scriptwriting,Audio editing}',             'Tell stories from the north on radio and online.', 228, null),
  (5,  'Wumpini Abukari',     'northern',      'learner', 'wumpini-abukari',     'Spreadsheets and records for traders',           '{Google Sheets,Data entry,Charts}',                     'Keep clean records for market traders and teach others.', 225, '+233200000105'),
  (6,  'Rahinatu Sulemana',   'northern',      'learner', 'rahinatu-sulemana',   'Digital marketing learner',                      '{Content planning,SEO basics}',                         'Grow my sister''s shea butter business online.', 214, '+233200000106'),
  (7,  'Issahaku Zakaria',    'savannah',      'learner', 'issahaku-zakaria',    'Digital skills for work, Damongo',               '{Email,Google Docs,Online safety}',                     'Get confident with computers and find office work.', 160, null),
  (8,  'Hawa Salifu',         'northern',      'learner', 'hawa-salifu',         'Spreadsheet and data enthusiast',                '{Google Sheets,Data cleaning}',                         'Work in monitoring and evaluation.', 150, null),
  (9,  'Sumaila Abdulai',     'north_east',    'learner', 'sumaila-abdulai',     'IT support learner, Nalerigu',                   '{Troubleshooting,Networking basics}',                   'Look after computers for schools and clinics.', 148, null),
  (10, 'Asheitu Azumah',      'upper_east',    'learner', 'asheitu-azumah',      'UI and UX design learner, Bolgatanga',           '{Figma,User research}',                                 'Design simple apps people in the north can use.', 146, null),
  (11, 'Mohammed Fuseini',    'northern',      'learner', 'mohammed-fuseini',    'Marketing learner',                              '{Facebook ads,Copywriting}',                            'Help my uncle''s pharmacy reach more customers.', 140, null),
  (12, 'Amina Iddrisu',       'northern',      'learner', 'amina-iddrisu',       'Graphic design learner',                         '{Canva,Layout,Branding}',                               'Design flyers and brands for local businesses.', 138, null),
  (13, 'Yakubu Alhassan',     'upper_west',    'learner', null,                  null,                                             '{}',                                                    null, 135, null),
  (14, 'Sanatu Mahama',       'northern',      'learner', 'sanatu-mahama',       'Online selling for small businesses',            '{WhatsApp Business,Product photos,Pricing}',            'Move my tailoring business online.', 133, null),
  (15, 'Abubakari Salifu',    'savannah',      'learner', 'abubakari-salifu',    'Digital basics learner',                         '{Email,Typing}',                                        null, 130, null),
  (16, 'Fati Abdulai',        'upper_east',    'learner', 'fati-abdulai',        'Remote work and virtual assistance',             '{Calendar management,Google Workspace}',                'Work remotely as a virtual assistant.', 128, null),
  (17, 'Kwame Mensah',        'ashanti',       'learner', 'kwame-mensah',        'Backend development learner, Kumasi',            '{Python,SQL,APIs}',                                     'Build systems for mobile money agents.', 126, null),
  (18, 'Ama Owusu',           'greater_accra', 'learner', null,                  'Frontend learner',                               '{HTML,CSS}',                                            null, 60, null),
  (19, 'Iddrisu Yakubu',      'northern',      'learner', 'iddrisu-yakubu',      'Starting out in tech',                           '{Typing,Email}',                                        'Find my first job in an office.', 55, null),
  (20, 'Barikisu Zakaria',    'northern',      'learner', 'barikisu-zakaria',    'AI tools for work',                              '{ChatGPT,Google Docs}',                                 'Use AI tools to save time at work.', 50, null),
  (21, 'Kofi Asante',         'eastern',       'learner', null,                  null,                                             '{}',                                                    null, 45, null),
  (22, 'Adwoa Boateng',       'ashanti',       'learner', 'adwoa-boateng',       'Mobile app learner',                             '{Flutter basics}',                                      'Build an app for my church group.', 40, null),
  (23, 'Alhassan Abukari',    'upper_west',    'learner', 'alhassan-abukari',    'Digital basics, Wa',                             '{}',                                                    null, 30, null),
  (24, 'Memunatu Sulemana',   'northern',      'learner', 'memunatu-sulemana',   'Marketing beginner',                             '{}',                                                    'Promote my mother''s chop bar online.', 24, null),
  (25, 'Nashiru Azumah',      'upper_east',    'learner', null,                  null,                                             '{}',                                                    null, 20, null),
  (26, 'Ayishetu Mahama',     'north_east',    'learner', 'ayishetu-mahama',     null,                                             '{}',                                                    null, 9,  null),
  (27, 'Selorm Agbeko',       'volta',         'learner', 'selorm-agbeko',       'Design curious',                                 '{Sketching}',                                           null, 14, null),
  (28, 'Efua Quaye',          'central',       'learner', null,                  null,                                             '{}',                                                    null, 3,  null),
  (29, 'Tahiru Abdulai',      'northern',      'learner', 'tahiru-abdulai',      'Learning the basics',                            '{}',                                                    null, 18, null),
  (30, 'Sakina Iddrisu',      'savannah',      'learner', null,                  null,                                             '{}',                                                    null, 1,  null),
  (31, 'Abdulai Fuseini',     'northern',      'mentor',  'abdulai-fuseini',     'Digital marketing mentor, Delta Mentoring Program','{SEO,Content strategy,Google Ads}',                   null, 300, null),
  (32, 'Mariama Sulemana',    'northern',      'mentor',  'mariama-sulemana',    'Mentor and Tamale chapter lead',                 '{Social media,Community building}',                     null, 298, null),
  (33, 'Iddrisu Alhassan',    'northern',      'mentor',  'iddrisu-alhassan',    'Programme coordinator',                          '{Programme management,Training}',                       null, 296, null),
  (34, 'Hawa Abukari',        'northern',      'mentor',  'hawa-abukari',        'Mentor, pilot cohort',                           '{Digital marketing,Analytics}',                         null, 290, null),
  (35, 'Yaw Darko',           'greater_accra', 'mentor',  'yaw-darko',           'Skills reviewer and design mentor',              '{Graphic design,Portfolio review}',                     null, 280, null),
  (36, 'Zakaria Mahama',      'upper_east',    'mentor',  'zakaria-mahama',      'Bolgatanga chapter lead',                        '{IT support,Community events}',                         null, 200, null),
  (37, 'Akosua Frimpong',     'ashanti',       'mentor',  'akosua-frimpong',     'Mentor, Tamale cohort 3',                        '{Copywriting,Email marketing}',                         null, 120, null),
  (38, 'Salifu Yakubu',       'upper_west',    'mentor',  null,                  'Mentor in Wa',                                   '{Data analysis}',                                       null, 90,  null),
  (41, 'Rahinatu Abdulai',    'northern',      'learner', 'rahinatu-abdulai',    'Data analyst for NGOs and cooperatives',         '{Excel,Power BI,KoboToolbox}',                          null, 280, null),
  (42, 'Kwesi Appiah',        'greater_accra', 'learner', 'kwesi-appiah',        'Web developer for small businesses',             '{JavaScript,React,WordPress}',                          null, 270, null),
  (43, 'Amina Zakaria',       'northern',      'learner', 'amina-zakaria',       'Social media strategist',                        '{Facebook,Instagram,Content calendars}',                null, 250, null),
  (44, 'Sulemana Iddrisu',    'upper_east',    'learner', 'sulemana-iddrisu',    'IT support and network technician',              '{Networking,Windows,Cybersecurity basics}',             null, 245, null),
  (45, 'Abena Osei',          'ashanti',       'learner', 'abena-osei',          'Brand and graphic designer',                     '{Branding,Illustrator,Canva}',                          null, 240, null),
  (46, 'Fuseini Azumah',      'northern',      'learner', 'fuseini-azumah',      'Careers coach and business adviser',             '{CV writing,Interview practice,Business planning}',     null, 230, null),
  (47, 'Halima Mahama',       'northern',      'learner', null,                  'AI tools trainer',                               '{ChatGPT,Google Workspace}',                            null, 12,  null),
  (51, 'Alhassan Yakubu',     'northern',      'learner', null,                  'Operations lead, Savanna Agro Traders',          '{}',                                                    null, 200, null),
  (52, 'Sanatu Abdulai',      'northern',      'learner', null,                  'Recruiter, Savanna Agro Traders',                '{}',                                                    null, 190, null),
  (53, 'Nana Ama Asare',      'upper_east',    'learner', null,                  'Programme officer',                              '{}',                                                    null, 70,  null),
  (54, 'Musah Salifu',        'northern',      'learner', null,                  'Owner, print and design studio',                 '{}',                                                    null, 40,  null),
  (55, 'Gifty Ansah',         'northern',      'learner', null,                  null,                                             '{}',                                                    null, 6,   null);

-- Auth users. The profile row is created by the on_auth_user_created trigger.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at, last_sign_in_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  email_change_token_current, phone_change, phone_change_token, reauthentication_token
)
select
  '00000000-0000-0000-0000-000000000000', pg_temp.uid(p.n), 'authenticated', 'authenticated',
  replace(lower(regexp_replace(p.name, '[^A-Za-z ]', '', 'g')), ' ', '.') || '@demo.sydcrest.test',
  extensions.crypt(gen_random_uuid()::text || gen_random_uuid()::text, extensions.gen_salt('bf')),
  pg_temp.ago(p.joined),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  jsonb_build_object('full_name', p.name, 'terms_version', '2026-10-draft', 'demo', true,
                     -- Everyone is an adult: born 1984 to 2005.
                     'date_of_birth', to_char(make_date(case when p.n <= 30 then 1996 + (p.n * 7) % 10 else 1984 + (p.n * 5) % 12 end,
                                                        1 + (p.n * 5) % 12, 1 + (p.n * 11) % 28), 'YYYY-MM-DD')),
  pg_temp.ago(p.joined), pg_temp.ago(p.joined), pg_temp.ago(least(p.joined, (p.n % 5) + 0.3)),
  '', '', '', '', '', '', '', ''
from demo_people p
on conflict (id) do nothing;

-- Profiles: fill in what people set up after signing up. Re-running keeps the
-- same values (phone is unchanged, so WhatsApp consent is never revoked).
update public.profiles pr
   set display_name = p.name,
       region       = p.region,
       role         = p.role,
       headline     = p.headline,
       skills       = p.skills,
       goals        = p.goals,
       public_slug  = p.slug,
       is_public    = p.slug is not null,
       phone        = p.phone,
       created_at   = pg_temp.ago(p.joined)
  from demo_people p
 where pr.id = pg_temp.uid(p.n)
   and (pr.display_name, pr.region, pr.role, pr.public_slug, pr.phone)
       is distinct from (p.name, p.region, p.role, p.slug, p.phone);

-- Terms and privacy agreed at sign up, for everyone.
insert into public.consents (id, profile_id, kind, version, granted_at)
select pg_temp.did(28, p.n * 10 + k.i), pg_temp.uid(p.n), k.kind, '2026-10-draft', pg_temp.ago(p.joined)
from demo_people p
cross join (values (1, 'terms'), (2, 'privacy')) k(i, kind)
on conflict do nothing;

-- WhatsApp reminders: only clearly fake numbers (+233 20 000 01xx), and one
-- person who later replied STOP. The phone is copied from the profile by trigger.
insert into public.consents (id, profile_id, kind, version, granted_at, revoked_at, revoked_reason)
select pg_temp.did(28, p.n * 10 + 3), pg_temp.uid(p.n), 'whatsapp', '2026-10', pg_temp.ago(least(p.joined, 20)),
       null, null
from demo_people p
where p.phone is not null
on conflict do nothing;
update public.consents
   set revoked_at = pg_temp.ago(4), revoked_reason = 'stop'
 where id = pg_temp.did(28, 6 * 10 + 3) and revoked_at is null;

-- Follows between learners, so follower counts on profiles and boards are real.
insert into public.follows (follower_id, following_id, created_at)
select pg_temp.uid(f.a), pg_temp.uid(f.b), pg_temp.ago(f.d)
from (values
  (2,1,90),(3,1,88),(4,1,80),(5,1,75),(6,1,40),(8,1,30),(12,1,22),(17,1,15),(19,1,10),(20,1,6),
  (1,2,89),(4,2,70),(6,2,38),(11,2,35),(14,2,20),(24,2,9),
  (1,3,85),(17,3,60),(22,3,12),
  (1,5,70),(8,5,28),(15,5,25),
  (2,6,37),(11,6,33),(14,6,19),
  (8,7,12),(15,7,11),(19,7,8),(23,7,5),
  (1,8,27),(5,8,26),
  (16,10,30),(25,10,10),(27,10,7),
  (2,12,21),(27,12,6),
  (3,17,58),(9,17,40),(22,17,11),
  (7,31,100),(8,31,90),(11,31,60),(6,32,50),(14,32,30),(1,41,60),(8,41,40),(3,42,50)
) f(a, b, d)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Organisations: one verified, one unverified, one waiting for verification.
-- The owner row is added by the organisations_add_owner trigger.
-- ---------------------------------------------------------------------------
insert into public.organisations (id, slug, name, kind, description, region, verification_status,
                                  verification_note, verified_at, created_by, created_at)
values
  (pg_temp.did(2, 1), 'savanna-agro-traders', 'Savanna Agro Traders', 'business',
   'A Tamale business buying and selling grains, shea and groundnuts from farmers across the Northern Region. We hire people who are good with records, customers and simple digital tools.',
   'northern', 'verified', 'Registration and contact person checked by the SydCrest team.', pg_temp.ago(150), pg_temp.uid(51), pg_temp.ago(170)),
  (pg_temp.did(2, 2), 'northern-youth-skills-network', 'Northern Youth Skills Network', 'nonprofit',
   'A volunteer network running weekend skills sessions for young people in Bolgatanga and nearby towns.',
   'upper_east', 'unverified', null, null, pg_temp.uid(53), pg_temp.ago(60)),
  (pg_temp.did(2, 3), 'tamale-print-and-design-studio', 'Tamale Print and Design Studio', 'business',
   'A small studio printing flyers, banners and branded items for shops, churches, mosques and schools.',
   'northern', 'pending', null, null, pg_temp.uid(54), pg_temp.ago(35))
on conflict do nothing;

insert into public.organisation_members (organisation_id, profile_id, role, status, invited_by, joined_at, created_at)
values
  (pg_temp.did(2, 1), pg_temp.uid(52), 'recruiter', 'active',  pg_temp.uid(51), pg_temp.ago(140), pg_temp.ago(141)),
  (pg_temp.did(2, 1), pg_temp.uid(55), 'recruiter', 'invited', pg_temp.uid(51), null,             pg_temp.ago(5))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Chapters: Tamale is live with a lead, Bolgatanga is launching, Wa is a draft.
-- No WhatsApp links: a made up invite link could lead to a stranger's group.
-- ---------------------------------------------------------------------------
insert into public.chapters (id, slug, name, region, city, status, summary, created_at)
values
  (pg_temp.did(3, 1), 'tamale', 'Tamale', 'northern', 'Tamale', 'active',
   'Learners in Tamale meet every other Saturday to study together, share what they are building and help each other with roadmaps and cohort work.',
   pg_temp.ago(200)),
  (pg_temp.did(3, 2), 'bolgatanga', 'Bolgatanga', 'upper_east', 'Bolgatanga', 'launching',
   'A new chapter for learners in Bolgatanga and nearby towns. Our first meetup is coming soon.',
   pg_temp.ago(30)),
  (pg_temp.did(3, 3), 'wa', 'Wa', 'upper_west', 'Wa', 'draft',
   'Being set up. Learners in Wa, tell us you are interested and we will be in touch.',
   pg_temp.ago(8))
on conflict do nothing;

insert into public.chapter_members (chapter_id, profile_id, role, joined_at)
select pg_temp.did(3, m.c), pg_temp.uid(m.n), m.role, pg_temp.ago(m.d)
from (values
  (1,32,'lead',195),(1,31,'member',190),(1,33,'member',188),
  (1,1,'member',180),(1,2,'member',178),(1,3,'member',175),(1,4,'member',170),(1,5,'member',168),
  (1,6,'member',160),(1,8,'member',140),(1,11,'member',130),(1,12,'member',128),(1,14,'member',120),
  (1,19,'member',50),(1,20,'member',45),(1,24,'member',20),(1,29,'member',15),(1,41,'member',100),
  (1,46,'member',90),(1,51,'member',60),
  (2,36,'lead',29),(2,10,'member',25),(2,16,'member',22),(2,25,'member',12),
  (3,38,'lead',7),(3,13,'member',6),(3,23,'member',4)
) m(c, n, role, d)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Cohorts of the Delta Mentoring Program (programme rows come from the
-- migrations; week ids differ per database, so weeks are looked up by number).
-- Pilot finished, cohort 2 is in week 7, cohort 3 is enrolling.
-- ---------------------------------------------------------------------------
insert into public.cohorts (id, program_id, name, starts_on, max_size, status, created_at)
select pg_temp.did(8, c.i), p.id, c.name, c.starts_on, c.size, c.status, pg_temp.ago(c.created)
from public.programs p
cross join (values
  (1, 'Tamale pilot cohort', date_trunc('week', pg_temp.day(0))::date - 25 * 7, 12, 'completed', 200),
  (2, 'Tamale cohort 2',     date_trunc('week', pg_temp.day(0))::date - 6 * 7,  20, 'running',   80),
  (3, 'Tamale cohort 3',     date_trunc('week', pg_temp.day(0))::date + 9 * 7,  20, 'enrolling', 20)
) c(i, name, starts_on, size, status, created)
where p.slug = 'dmp'
on conflict do nothing;

-- Learner specialisations from week 7: seo, social_media or google_ads.
create temp table demo_cohort_learners (n integer primary key, cohort integer, spec text, j integer) on commit drop;
insert into demo_cohort_learners values
  (1, 1, 'seo', 0), (2, 1, 'social_media', 1), (3, 1, 'google_ads', 2), (4, 1, 'social_media', 3), (5, 1, 'seo', 4),
  (6, 2, 'social_media', 0), (7, 2, 'seo', 1), (8, 2, 'google_ads', 2), (9, 2, 'seo', 3), (10, 2, 'social_media', 4),
  (11, 2, 'google_ads', 5), (12, 2, 'social_media', 6), (14, 2, 'social_media', 7), (15, 2, 'seo', 8),
  (16, 2, 'google_ads', 9), (17, 2, 'seo', 10), (13, 2, 'google_ads', 11);

insert into public.cohort_members (id, cohort_id, profile_id, role, specialization, status, completed_at, created_at)
select pg_temp.did(9, l.n), pg_temp.did(8, l.cohort), pg_temp.uid(l.n), 'learner', l.spec,
       case when l.cohort = 1 then 'completed' else 'active' end,
       case when l.cohort = 1 then pg_temp.ago(80) end,
       case when l.cohort = 1 then pg_temp.ago(180) else pg_temp.ago(45) end
from demo_cohort_learners l
on conflict do nothing;

-- Rahinatu started in the pilot and deferred to cohort 2.
insert into public.cohort_members (id, cohort_id, profile_id, role, specialization, status, deferred_to, deferred_at, created_at)
values (pg_temp.did(9, 106), pg_temp.did(8, 1), pg_temp.uid(6), 'learner', 'social_media', 'deferred',
        pg_temp.did(8, 2), pg_temp.ago(150), pg_temp.ago(180))
on conflict do nothing;

-- Staff, and two accepted learners waiting for cohort 3 to start.
insert into public.cohort_members (id, cohort_id, profile_id, role, specialization, status, created_at)
select pg_temp.did(9, s.id), pg_temp.did(8, s.cohort), pg_temp.uid(s.n), s.role, null, 'active', pg_temp.ago(s.d)
from (values
  (201, 1, 34, 'mentor', 185), (202, 1, 33, 'coordinator', 185),
  (203, 2, 31, 'mentor', 50), (204, 2, 32, 'mentor', 50), (205, 2, 33, 'coordinator', 50),
  (206, 3, 37, 'mentor', 10), (207, 3, 33, 'coordinator', 10),
  (208, 3, 18, 'learner', 6), (209, 3, 19, 'learner', 5)
) s(id, cohort, n, role, d)
on conflict do nothing;

insert into public.cohort_notes (id, cohort_member_id, author_id, body, created_at)
values
  (pg_temp.did(34, 1), pg_temp.did(9, 13), pg_temp.uid(31),
   'Missed weeks 5 and 6. Called him on Tuesday: he has been helping on the family farm and will catch up over the weekend. Check in again on Monday.',
   pg_temp.ago(3)),
  (pg_temp.did(34, 2), pg_temp.did(9, 6), pg_temp.uid(32),
   'Strong start after deferring from the pilot. Her week 4 caption bank was one of the best in the cohort; ask her to share it in the group.',
   pg_temp.ago(12)),
  (pg_temp.did(34, 3), pg_temp.did(9, 9), pg_temp.uid(31),
   'Week 4 returned for a clearer audience section. He asked good questions in the session and resubmitted quickly.',
   pg_temp.ago(15))
on conflict do nothing;

-- Applications in every state, for the admin queue and the apply page.
insert into public.cohort_applications (id, program_id, profile_id, preferred_cohort_id, specialization,
       screening_answers, status, cohort_id, decision_note, decided_by, decided_at, created_at)
select pg_temp.did(10, a.n), p.id, pg_temp.uid(a.n), pg_temp.did(8, a.pref), a.spec,
       jsonb_build_object('motivation', a.why, 'device', a.device, 'hours', a.hours),
       a.status,
       case when a.status = 'accepted' then pg_temp.did(8, a.pref) end,
       a.note,
       case when a.status in ('accepted', 'declined', 'waitlisted') then pg_temp.uid(33) end,
       case when a.status in ('accepted', 'declined', 'waitlisted') then pg_temp.ago(a.d - 3) end,
       pg_temp.ago(a.d)
from public.programs p
cross join (values
  (1,  1, 'seo',          'I keep records for NGOs as a volunteer and want to learn how organisations reach people online.', 'Phone and a shared computer', '5 to 10', 'accepted', null, 210),
  (2,  1, 'social_media', 'I already post for two shops in Tamale and want to do it properly.', 'Phone only', '5 to 10', 'accepted', null, 210),
  (3,  1, 'google_ads',   'I want to understand how ads work so I can build websites that bring customers.', 'My own computer', 'More than 10', 'accepted', null, 209),
  (4,  1, 'social_media', 'I make short videos for a community radio station and want to grow its audience.', 'Phone only', '5 to 10', 'accepted', null, 208),
  (5,  1, 'seo',          'Market traders ask me for help with records and I want to help them sell online too.', 'Phone and a shared computer', 'Under 5', 'accepted', null, 208),
  (6,  1, 'social_media', 'My sister makes shea butter and I want to help her sell beyond Tamale.', 'Phone only', '5 to 10', 'accepted', null, 207),
  (7,  2, 'seo',          'I finished the digital skills bridge and want a structured programme with a mentor.', 'Phone and a shared computer', '5 to 10', 'accepted', null, 70),
  (8,  2, 'google_ads',   'I want to work in monitoring and evaluation and marketing data is a good start.', 'My own computer', 'More than 10', 'accepted', null, 70),
  (9,  2, 'seo',          'Schools in Nalerigu need websites people can find.', 'Phone only', '5 to 10', 'accepted', null, 69),
  (10, 2, 'social_media', 'I design for small businesses and want to understand marketing.', 'My own computer', '5 to 10', 'accepted', null, 69),
  (11, 2, 'google_ads',   'My uncle''s pharmacy needs more customers and I want to help.', 'Phone and a shared computer', '5 to 10', 'accepted', null, 68),
  (12, 2, 'social_media', 'I want to design and market for local brands.', 'Phone only', 'More than 10', 'accepted', null, 68),
  (13, 2, 'google_ads',   'I want to learn digital marketing to find work in Wa.', 'Phone only', 'Under 5', 'accepted', null, 67),
  (14, 2, 'social_media', 'I sew and sell clothes and want more customers online.', 'Phone only', '5 to 10', 'accepted', null, 67),
  (15, 2, 'seo',          'I want a career in tech and marketing is where I can start.', 'Phone and a shared computer', '5 to 10', 'accepted', null, 66),
  (16, 2, 'google_ads',   'I want to offer marketing as a virtual assistant.', 'My own computer', 'More than 10', 'accepted', null, 66),
  (17, 2, 'seo',          'I build backends and want to understand how the products I build get found.', 'My own computer', '5 to 10', 'accepted', null, 65),
  (18, 3, 'seo',          'I am learning frontend and want to understand marketing too.', 'My own computer', '5 to 10', 'accepted', null, 9),
  (19, 3, 'social_media', 'I want a mentor to help me find my first job.', 'Phone only', '5 to 10', 'accepted', null, 8),
  (20, 3, 'google_ads',   'I use AI tools at work and want to add marketing skills.', 'Phone and a shared computer', 'Under 5', 'submitted', null, 4),
  (21, 3, 'seo',          'I want to move from teaching into digital marketing.', 'Phone only', '5 to 10', 'waitlisted', 'Cohort 3 is nearly full. We will offer you the first place that opens.', 7),
  (22, 3, 'social_media', 'I want to promote my church''s events online.', 'Phone only', 'Under 5', 'declined', 'Thank you for applying. This cohort needs at least 5 hours a week; please apply again when you have more time.', 8),
  (23, 3, null,           'I want to learn how to use the internet for business.', 'Phone only', '5 to 10', 'submitted', null, 2),
  (24, 3, 'social_media', 'My mother''s chop bar could get more customers on WhatsApp and Facebook.', 'Phone only', '5 to 10', 'withdrawn', null, 6)
) a(n, pref, spec, why, device, hours, status, note, d)
where p.slug = 'dmp'
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Weekly work. Pilot graduates passed all 12 weeks. Cohort 2 (now in week 7)
-- shows every state: graded with feedback, AI feedback ready, sent, returned,
-- draft and missing. AI feedback follows the week's rubric from the database.
-- ---------------------------------------------------------------------------
create temp table demo_week_text (wk integer, spec text, body text) on commit drop;
insert into demo_week_text values
  (1, null, 'I set up a simple folder system on the phone and the shared computer for {biz}: one folder per month for receipts, one for product photos and one for price lists. I also wrote five safe browsing habits for the owner, like checking the address bar before typing a password.'),
  (2, null, 'I made a shared Google Sheet for {biz} with stock, prices and a weekly sales tab, and shared it with the owner as a viewer so nothing gets deleted by mistake. I wrote a short guide on how to add a new product.'),
  (3, null, 'I wrote three WhatsApp Business replies for {biz}: a greeting, an answer to a price question and a polite message for when something is out of stock. I also wrote rules for the customer group so it stays respectful.'),
  (4, null, 'I described the customers of {biz}: who they are, where they spend time online and what makes them buy. I picked two channels, WhatsApp status and a Facebook page, and explained why they suit these customers better than the others.'),
  (5, null, 'I planned two weeks of posts for {biz}: product photos on Mondays, a customer story on Wednesdays and a reminder of the week''s offer on Fridays. Each post has a caption in English and a short line in Dagbani.'),
  (6, null, 'I followed the Facebook page of {biz} for one week. Reach went up on the days we posted photos of new stock. I put the numbers in a simple table and suggested posting at lunchtime, when most people reacted.'),
  (7, 'seo', 'I listed ten phrases people in Tamale might search for to find {biz}, checked which ones Google suggests, and rewrote the business description to use the three most useful ones naturally.'),
  (7, 'social_media', 'I set up a draft Facebook audience for {biz}: people within 10 km of Tamale, aged 18 to 45, interested in fashion and local markets. I explained why I left out a wider audience.'),
  (7, 'google_ads', 'I wrote a plan for a small Google Ads test for {biz}: three keyword groups, two ads for each and the questions we want answered after one week.'),
  (8, 'seo', 'I wrote the Google Business Profile details for {biz}: opening hours, category, a short description and five photo ideas. I also listed three local directories and groups where the shop could be mentioned.'),
  (8, 'social_media', 'I scripted and filmed a 30 second video for {biz} showing how a product is made, with captions so it works without sound.'),
  (8, 'google_ads', 'I drafted keywords and ad text for {biz}, with negative keywords so the ads do not show to people looking for jobs or free items.'),
  (9, 'seo', 'I planned four short articles for {biz} that answer questions customers really ask, with a title and an outline for each.'),
  (9, 'social_media', 'I wrote a plan to grow the WhatsApp community of {biz}: a weekly question, a monthly competition idea and clear group rules.'),
  (9, 'google_ads', 'I reviewed the test results for {biz}, paused the weakest ad and explained which keywords to keep and why.'),
  (10, null, 'I put together a two week campaign for {biz} that joins WhatsApp, Facebook and a flyer at the shop, with one clear message and a simple way to count enquiries from each channel.'),
  (11, null, 'I collected my best work from the programme for {biz} into one document, with a short note on what I did, what happened and what I would change.'),
  (12, null, 'My capstone is a full marketing plan for {biz}: goals for three months, the customers, the channels, a content calendar and the numbers we will watch each week. I presented it to the owner, who has started using the content calendar.');

create temp table demo_biz (j integer primary key, biz text) on commit drop;
insert into demo_biz values
  (0, 'a provisions shop in Lamashegu'), (1, 'a tailoring shop near Aboabo market'), (2, 'a small pharmacy in Tamale'),
  (3, 'a chop bar near the lorry station'), (4, 'a phone accessories stall at the central market'), (5, 'a women''s shea butter group in Savelugu'),
  (6, 'a hair salon in Sakasaka'), (7, 'a fabric shop in Bolgatanga'), (8, 'a mobile money and printing kiosk'),
  (9, 'a family rice farm near Nyankpala'), (10, 'a small bakery in Kumasi'), (11, 'a guinea fowl farm near Wa');

create temp table demo_submissions on commit drop as
with dmp as (
  select id from public.programs where slug = 'dmp'
),
grid as (
  select l.n, l.cohort, l.spec, l.j, g.wk,
         case
           when l.cohort = 1 then 'graded'
           when g.wk <= 2 then 'graded'
           when g.wk = 3 then case when l.j = 11 then 'returned' else 'graded' end
           when g.wk = 4 then case when l.j = 3 then 'submitted' when l.j = 7 then 'returned' else 'graded' end
           when g.wk = 5 then case when l.j <= 3 then 'ai_reviewed' when l.j <= 7 then 'submitted'
                                   when l.j <= 9 then 'graded' when l.j = 10 then 'draft' end
           when g.wk = 6 then case when l.j <= 4 then 'submitted' when l.j <= 7 then 'draft' end
           when g.wk = 7 then case when l.j <= 1 then 'draft' end
         end as state
  from demo_cohort_learners l
  cross join generate_series(1, 12) g(wk)
  where l.cohort = 1 or g.wk <= 7
)
select g.*, pw.id as week_id, pw.is_capstone, c.starts_on, dmp.id as program_id,
       replace(t.body, '{biz}', b.biz) as body,
       fb.feedback, fb.score
from grid g
cross join dmp
join public.program_weeks pw
  on pw.program_id = dmp.id and pw.week_number = g.wk and coalesce(pw.specialization, g.spec) = g.spec
join public.cohorts c on c.id = pg_temp.did(8, g.cohort)
join demo_week_text t on t.wk = g.wk and coalesce(t.spec, g.spec) = g.spec
join demo_biz b on b.j = case when g.cohort = 1 then g.j + 5 else g.j end % 12
cross join lateral (
  select r.criteria from public.rubrics r
  where r.program_id = dmp.id and (r.program_week_id = pw.id or r.program_week_id is null)
  order by r.program_week_id nulls last limit 1
) rub
cross join lateral (
  select jsonb_build_object(
           'summary', case when sum(x.pts) * 100 / sum(x.maxp) >= 85
                           then 'Strong, practical work that a real business could use straight away. Your best part is the local detail. To push it further, explain the reason behind each choice in a sentence.'
                           else 'A solid piece of work that covers the brief. To improve, add one worked example and say why your choices suit these customers.' end,
           'criteria', jsonb_agg(jsonb_build_object('id', x.id, 'points', x.pts, 'comment', x.cm) order by x.ord)) as feedback,
         round(100.0 * sum(x.pts) / nullif(sum(x.maxp), 0))::smallint as score
  from (
    select e.value ->> 'id' as id, e.ordinality as ord, (e.value ->> 'max_points')::integer as maxp,
           greatest(0, (e.value ->> 'max_points')::integer
             - case when (g.j + g.wk + e.ordinality) % 7 = 0 then 2
                    when (g.j * 3 + g.wk * 5 + e.ordinality * 7) % 2 = 0 then 1 else 0 end) as pts,
           case e.ordinality % 4
             when 1 then 'Meets the main goal of the week. Next time, say in one line which objective each part answers.'
             when 2 then 'Every part of the brief is done. One more worked example would make it complete.'
             when 3 then 'Clear and easy to follow. Shorter paragraphs would read better on a small screen.'
             else 'Your choices suit a real local business. Say why its customers would care.'
           end as cm
    from jsonb_array_elements(rub.criteria) with ordinality e(value, ordinality)
  ) x
) fb
where g.state is not null;

insert into public.submissions (id, profile_id, program_id, program_week_id, cohort_id, status, attempt,
       body_text, ai_feedback, ai_score, ai_model, ai_reviewed_at, mentor_feedback, final_score,
       graded_by, graded_at, in_portfolio, submitted_at, created_at, updated_at)
select pg_temp.did(11, s.n * 100 + s.wk), pg_temp.uid(s.n), s.program_id, s.week_id, pg_temp.did(8, s.cohort),
       s.state,
       case when s.state = 'submitted' and s.cohort = 2 and s.wk = 4 then 2 else 1 end,
       case when s.state = 'draft' then left(s.body, 140) else s.body end,
       case when s.state in ('ai_reviewed', 'returned', 'graded') then s.feedback end,
       case when s.state in ('ai_reviewed', 'returned', 'graded') then s.score end,
       case when s.state in ('ai_reviewed', 'returned', 'graded') then 'claude-haiku-5-5' end,
       case when s.state in ('ai_reviewed', 'returned', 'graded') then sent.at + interval '4 minutes' end,
       case s.state
         when 'graded' then case (s.j + s.wk) % 4
           when 0 then 'Good, practical work. The owner could use this tomorrow. Next week, explain the reason behind each choice in one sentence.'
           when 1 then 'Well done. I like how you used what you know about your customers. Keep your captions short and clear.'
           when 2 then 'This meets the brief. Add a simple way to measure whether it worked, even if it is only counting messages.'
           else 'Clear and well organised. Share this one in the group so others can learn from it.'
         end
         when 'returned' then 'Thanks for sending this. Please add who the customers are and why you chose these channels, then send it again. The rest is a good start.'
       end,
       case when s.state = 'graded' then s.score end,
       case when s.state = 'graded' then pg_temp.uid(case when s.cohort = 1 then 34 when s.j % 2 = 0 then 31 else 32 end) end,
       case when s.state = 'graded' then sent.at + interval '2 days' end,
       s.state = 'graded' and s.cohort = 1 and (s.is_capstone or (s.wk = 5 and s.n in (2, 4))),
       case when s.state <> 'draft' then sent.at end,
       sent.at - interval '2 days',
       sent.at + interval '2 days'
from demo_submissions s
cross join lateral (
  select least(
    ((s.starts_on + 7 * s.wk - 1 - (s.j % 3)) + time '18:00') at time zone 'Africa/Accra',
    now() - interval '3 hours') as at
) sent
on conflict do nothing;

-- Peer reviews: every pilot graduate reviewed a classmate's capstone and week 6;
-- cohort 2 reviews weeks 3 and 4 (done) and week 5 (assigned, still to do).
insert into public.peer_reviews (id, submission_id, reviewer_id, assigned_by, status, rubric_scores, comment,
       assigned_at, submitted_at, created_at)
select pg_temp.did(12, s.n * 100 + s.wk), pg_temp.did(11, s.n * 100 + s.wk), pg_temp.uid(r.n), pg_temp.uid(33),
       case when s.cohort = 2 and s.wk = 5 then 'assigned' else 'submitted' end,
       case when s.cohort = 2 and s.wk = 5 then '{}'::jsonb
            else (select jsonb_object_agg(c ->> 'id', c -> 'points') from jsonb_array_elements(s.feedback -> 'criteria') c) end,
       case when s.cohort = 2 and s.wk = 5 then null
            else case (s.j + s.wk) % 3
              when 0 then 'I learnt a lot from this. The local examples are great. Maybe add a photo idea for each post.'
              when 1 then 'Very clear. I would try this for my own business. One thing: say how you will know it worked.'
              else 'Good work. The plan is easy to follow. The last part could be a bit shorter.'
            end end,
       sub.submitted_at + interval '1 day',
       case when s.cohort = 2 and s.wk = 5 then null else sub.submitted_at + interval '3 days' end,
       sub.submitted_at + interval '1 day'
from demo_submissions s
join public.submissions sub on sub.id = pg_temp.did(11, s.n * 100 + s.wk)
join demo_cohort_learners r
  on r.cohort = s.cohort
 and r.j = (s.j + 1) % (select count(*) from demo_cohort_learners x where x.cohort = s.cohort)
where s.state in ('graded', 'submitted', 'ai_reviewed')
  and ((s.cohort = 1 and (s.is_capstone or s.wk = 6)) or (s.cohort = 2 and s.wk between 3 and 5))
on conflict do nothing;

-- Certificates for the five pilot graduates.
insert into public.certificates (id, verification_id, profile_id, program_id, cohort_id, recipient_name,
       program_title, specialization, specialization_label, issued_by, issued_at, created_at)
select pg_temp.did(13, l.n), 'de000000000000000000000000000' || lpad(l.n::text, 3, '0'),
       pg_temp.uid(l.n), p.id, pg_temp.did(8, 1), dp.name, p.title, l.spec,
       (select e ->> 'label' from jsonb_array_elements(p.specializations) e where e ->> 'slug' = l.spec),
       pg_temp.uid(34), pg_temp.ago(78 - l.n), pg_temp.ago(78 - l.n)
from demo_cohort_learners l
join demo_people dp on dp.n = l.n
cross join public.programs p
where l.cohort = 1 and p.slug = 'dmp'
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Experts: six approved (three Verified by SydCrest, one featured, one not
-- taking requests) and one application waiting for review. Prices are left
-- empty: payments are not built.
-- ---------------------------------------------------------------------------
insert into public.expert_profiles (profile_id, slug, headline, bio, skills, categories, languages, region,
       availability_note, accepting_requests, offers_free_intro, status, approved_at, is_verified, verified_at,
       is_featured, created_at)
values
  (pg_temp.uid(41), 'rahinatu-abdulai', 'Data analyst for NGOs and cooperatives',
   'I help organisations in the north turn survey and sales records into clear answers. Six years of monitoring and evaluation work, mostly with KoboToolbox, Excel and Power BI. I enjoy teaching people to clean their own data.',
   '{Excel,Power BI,KoboToolbox,Data cleaning,Monitoring and evaluation}', '{data,careers}', '{English,Dagbani}', 'northern',
   'Weekday evenings and Saturday mornings.', true, false, 'approved', pg_temp.ago(260), true, pg_temp.ago(200), true, pg_temp.ago(270)),
  (pg_temp.uid(42), 'kwesi-appiah', 'Web developer for small businesses',
   'I build and fix websites for shops, schools and churches, and I review code for junior developers. Happy to talk through your first project or your portfolio.',
   '{JavaScript,React,WordPress,HTML,CSS}', '{software}', '{English,Twi}', 'greater_accra',
   'Tuesdays and Thursdays after 5pm.', true, false, 'approved', pg_temp.ago(250), true, pg_temp.ago(180), false, pg_temp.ago(260)),
  (pg_temp.uid(43), 'amina-zakaria', 'Social media strategist',
   'I plan and run social media for small businesses in Tamale. I can help you build a content calendar that fits the time you really have.',
   '{Facebook,Instagram,Content calendars,Copywriting}', '{marketing}', '{English,Dagbani,Hausa}', 'northern',
   'Most afternoons.', true, false, 'approved', pg_temp.ago(230), false, null, false, pg_temp.ago(240)),
  (pg_temp.uid(44), 'sulemana-iddrisu', 'IT support and network technician',
   'I set up and look after networks for schools and clinics in the Upper East. I can help you start a career in IT support or check a small office network.',
   '{Networking,Windows,Hardware repair,Cybersecurity basics}', '{it-cloud,cybersecurity}', '{English,Gurune}', 'upper_east',
   'Saturdays.', true, false, 'approved', pg_temp.ago(220), true, pg_temp.ago(150), false, pg_temp.ago(230)),
  (pg_temp.uid(45), 'abena-osei', 'Brand and graphic designer',
   'I design logos, flyers and brand guides for small businesses and give honest, kind feedback on design portfolios.',
   '{Branding,Illustrator,Canva,Typography}', '{design}', '{English,Twi}', 'ashanti',
   'Fully booked until next month.', true, false, 'approved', pg_temp.ago(210), false, null, false, pg_temp.ago(220)),
  (pg_temp.uid(46), 'fuseini-azumah', 'Careers coach and business adviser',
   'I coach young people through CVs, interviews and first jobs, and help new businesses write a simple plan. Book a free intro call to see if we are a good fit.',
   '{CV writing,Interview practice,Business planning}', '{careers,product-business}', '{English,Dagbani}', 'northern',
   'Monday to Friday, 6pm to 8pm.', true, true, 'approved', pg_temp.ago(200), false, null, false, pg_temp.ago(210)),
  (pg_temp.uid(47), 'halima-mahama', 'AI tools trainer',
   'I teach office teams to use AI tools safely for writing, summaries and spreadsheets.',
   '{ChatGPT,Google Workspace,Prompt writing}', '{ai-tools}', '{English,Dagbani}', 'northern',
   null, true, false, 'pending', null, false, null, false, pg_temp.ago(10))
on conflict do nothing;

insert into public.expert_applications (id, profile_id, motivation, experience, status, decided_at, created_at)
select pg_temp.did(30, a.n), pg_temp.uid(a.n), a.why, a.exp, a.status,
       case when a.status = 'approved' then pg_temp.ago(a.d - 5) end, pg_temp.ago(a.d)
from (values
  (41, 'I want to help young analysts in the north get their first data job.', 'Six years in monitoring and evaluation with NGOs in the Northern Region.', 'approved', 265),
  (42, 'I learnt to code alone and want to make it easier for others.', 'Freelance web developer for eight years.', 'approved', 255),
  (43, 'Small businesses here need simple, honest marketing help.', 'Social media manager for local shops since 2021.', 'approved', 235),
  (44, 'I want more young people from the Upper East in IT jobs.', 'Network technician for schools and clinics.', 'approved', 225),
  (45, 'I enjoy reviewing portfolios and helping designers improve.', 'Brand designer for ten years.', 'approved', 215),
  (46, 'I have coached many first time job seekers and want to reach more.', 'Careers adviser and small business trainer.', 'approved', 205),
  (47, 'Offices in Tamale want to use AI tools but do not know where to start.', 'I run AI tools workshops for teams.', 'submitted', 10)
) a(n, why, exp, status, d)
on conflict do nothing;

insert into public.offers (id, expert_id, kind, title, description, scope, duration_minutes, delivery_days,
       max_participants, cadence, revisions_included, skills, is_active, position, created_at)
values
  (pg_temp.did(18, 1),  pg_temp.uid(41), 'one_to_one', 'CV and portfolio review for data roles', 'A call to go through your CV and one portfolio piece, with clear next steps for applying to data jobs.', null, 45, null, null, null, null, '{CV writing,Data analysis}', true, 0, pg_temp.ago(250)),
  (pg_temp.did(18, 2),  pg_temp.uid(41), 'group', 'Spreadsheet clinic', 'Bring a messy spreadsheet. We clean it together in a small group and you learn the steps to do it again.', null, 90, null, 8, null, null, '{Google Sheets,Excel,Data cleaning}', true, 1, pg_temp.ago(240)),
  (pg_temp.did(18, 3),  pg_temp.uid(41), 'async_review', 'Dashboard feedback', 'Send me a dashboard or report and I will reply with written feedback on clarity and accuracy.', null, null, 5, null, null, 1, '{Power BI,Looker Studio}', true, 2, pg_temp.ago(200)),
  (pg_temp.did(18, 4),  pg_temp.uid(42), 'one_to_one', 'Code review session', 'We read your code together and I suggest improvements you can make the same week.', null, 60, null, null, null, null, '{JavaScript,HTML,CSS}', true, 0, pg_temp.ago(240)),
  (pg_temp.did(18, 5),  pg_temp.uid(42), 'project', 'Small business website plan', 'A written plan for a simple website: pages, content, tools and a realistic timeline.', 'Up to five pages, one round of changes, no hosting or build included.', null, 14, null, null, 1, '{WordPress,Web planning}', true, 1, pg_temp.ago(230)),
  (pg_temp.did(18, 6),  pg_temp.uid(43), 'one_to_one', 'Social media plan for your shop', 'A call to build a month of posts you can manage in the time you have.', null, 45, null, null, null, null, '{Content calendars,Facebook}', true, 0, pg_temp.ago(220)),
  (pg_temp.did(18, 7),  pg_temp.uid(43), 'recurring', 'Monthly marketing check in', 'A short monthly call to review what worked and plan the next month.', null, 30, null, null, 'monthly', null, '{Marketing}', true, 1, pg_temp.ago(200)),
  (pg_temp.did(18, 8),  pg_temp.uid(44), 'one_to_one', 'IT support career chat', 'Talk through how to start in IT support, which skills to learn first and how to get experience.', null, 30, null, null, null, null, '{IT support}', true, 0, pg_temp.ago(210)),
  (pg_temp.did(18, 9),  pg_temp.uid(44), 'gig', 'Office network check', 'I review how your office network is set up and send a short list of fixes.', 'One site in the Upper East or Northern Region, written report within three days.', null, 3, null, null, null, '{Networking}', true, 1, pg_temp.ago(150)),
  (pg_temp.did(18, 10), pg_temp.uid(45), 'async_review', 'Logo and brand feedback', 'Send your logo or brand ideas and get written feedback with examples.', null, null, 7, null, null, 1, '{Branding}', true, 0, pg_temp.ago(200)),
  (pg_temp.did(18, 11), pg_temp.uid(46), 'one_to_one', 'Free intro call', 'A short call to understand your goals and see if coaching is right for you.', null, 20, null, null, null, null, '{Careers}', true, 0, pg_temp.ago(195)),
  (pg_temp.did(18, 12), pg_temp.uid(46), 'one_to_one', 'Interview practice', 'A practice interview for a role you are applying for, with honest feedback afterwards.', null, 45, null, null, null, null, '{Interview practice}', true, 1, pg_temp.ago(190))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Briefs (requests for help) and pitches. Brief 2 was awarded through a pitch,
-- which became booking 18.
-- ---------------------------------------------------------------------------
insert into public.briefs (id, kind, poster_id, organisation_id, title, description, skills, categories, location,
       is_remote, deadline, status, awarded_at, created_at)
values
  (pg_temp.did(22, 1), 'job', pg_temp.uid(51), pg_temp.did(2, 1), 'Help setting up stock and sales records',
   'We buy grain and shea from about 40 farmers and sell to traders in Tamale and Kumasi. We need someone to set up a clean Google Sheets system for stock, purchases and sales, and train two staff to use it.',
   '{Google Sheets,Data cleaning,Training}', '{data}', 'Tamale', false, pg_temp.day(18), 'open', null, pg_temp.ago(6)),
  (pg_temp.did(22, 2), 'job', pg_temp.uid(52), pg_temp.did(2, 1), 'Simple website for our produce catalogue',
   'A small website listing what we buy and sell, with a contact form and our WhatsApp number. It must load quickly on a phone or computer with a weak connection.',
   '{WordPress,Web design}', '{software}', null, true, pg_temp.day(-20), 'awarded', pg_temp.ago(30), pg_temp.ago(45)),
  (pg_temp.did(22, 3), 'advice', pg_temp.uid(5), null, 'Moving my records from spreadsheets to a simple database',
   'I keep records for five market traders in Google Sheets. It is getting slow and messy. Should I move to a database, and which free tool would you start with?',
   '{Google Sheets,Databases}', '{data}', null, true, null, 'open', null, pg_temp.ago(3)),
  (pg_temp.did(22, 4), 'advice', pg_temp.uid(11), null, 'Feedback on my first social media plan',
   'I wrote a one month plan for my uncle''s pharmacy. I would like an expert to tell me what to change before I start.',
   '{Content calendars}', '{marketing}', null, true, null, 'closed', null, pg_temp.ago(40)),
  (pg_temp.did(22, 5), 'job', pg_temp.uid(54), pg_temp.did(2, 3), 'Brand refresh for a print studio',
   'New logo and a simple brand guide for our studio.',
   '{Branding}', '{design}', 'Tamale', false, pg_temp.day(-5), 'cancelled', null, pg_temp.ago(30))
on conflict do nothing;

insert into public.pitches (id, brief_id, expert_id, offer_id, message, proposed_timeline, status, decided_at, created_at)
values
  (pg_temp.did(23, 1), pg_temp.did(22, 1), pg_temp.uid(41), pg_temp.did(18, 2), 'I have set up stock records for three cooperatives near Tamale. I would design the sheet with you in the first week, then run two training sessions for your staff.', 'Two weeks', 'submitted', null, pg_temp.ago(5)),
  (pg_temp.did(23, 2), pg_temp.did(22, 1), pg_temp.uid(44), null, 'I can set up the sheet and make sure your office computers and backups are in good shape at the same time.', 'Three weeks', 'submitted', null, pg_temp.ago(4)),
  (pg_temp.did(23, 3), pg_temp.did(22, 2), pg_temp.uid(42), pg_temp.did(18, 5), 'I build light, fast WordPress sites for small businesses. I would start with a plan, then build the five pages and show your team how to update them.', 'Three weeks', 'accepted', pg_temp.ago(30), pg_temp.ago(42)),
  (pg_temp.did(23, 4), pg_temp.did(22, 2), pg_temp.uid(45), pg_temp.did(18, 10), 'I can design the look of the site and a small brand guide to go with it.', 'Two weeks', 'declined', pg_temp.ago(30), pg_temp.ago(41)),
  (pg_temp.did(23, 5), pg_temp.did(22, 2), pg_temp.uid(43), null, 'I could write the text for the site and plan posts to launch it.', 'One week', 'withdrawn', null, pg_temp.ago(40)),
  (pg_temp.did(23, 6), pg_temp.did(22, 3), pg_temp.uid(41), pg_temp.did(18, 1), 'Good question. For five traders a well organised sheet may be enough. Let us look at it together and decide.', null, 'submitted', null, pg_temp.ago(2)),
  (pg_temp.did(23, 7), pg_temp.did(22, 3), pg_temp.uid(42), null, 'I would try a free database tool with a form on top, so traders can add records from their phones. Happy to show you.', null, 'submitted', null, pg_temp.ago(1)),
  (pg_temp.did(23, 8), pg_temp.did(22, 4), pg_temp.uid(43), pg_temp.did(18, 6), 'I would be glad to go through it with you on a call.', null, 'submitted', null, pg_temp.ago(38))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Bookings in every status. Reviews exist only for completed bookings and are
-- written by the person who booked. Abena (45) stops taking requests after.
-- ---------------------------------------------------------------------------
insert into public.booking_requests (id, requester_id, expert_id, offer_id, brief_id, pitch_id, organisation_id,
       message, preferred_times, status, status_reason, responded_at, completed_at, cancelled_by, created_at)
select pg_temp.did(19, b.i), pg_temp.uid(b.req), pg_temp.uid(b.exp), pg_temp.did(18, b.offer),
       case when b.i = 18 then pg_temp.did(22, 2) end,
       case when b.i = 18 then pg_temp.did(23, 3) end,
       case when b.org is not null then pg_temp.did(2, b.org) end,
       b.msg, b.times, b.status, b.reason,
       case when b.status <> 'requested' then pg_temp.ago(b.d, -b.resp_minutes) end,
       case when b.status = 'completed' then pg_temp.ago(b.d - 7) end,
       case when b.status = 'cancelled' then pg_temp.uid(b.req) end,
       pg_temp.ago(b.d)
from (values
  (1,  1,  41, 1,  null, 'I am applying for M&E assistant roles and would like help with my CV.', 'Saturday morning', 'completed', null, 60, 180),
  (2,  3,  41, 1,  null, 'Could you look at my CV and my first dashboard?', 'Weekday evenings', 'completed', null, 48, 300),
  (3,  8,  41, 2,  null, 'I have a messy survey sheet from my volunteer work.', 'Saturday', 'completed', null, 35, 600),
  (4,  12, 41, 3,  null, 'Please review my sales dashboard for a hair salon.', null, 'accepted', null, 6, 240),
  (5,  19, 41, 1,  null, 'I want to move into data work. Where should I start?', 'Any evening', 'requested', null, 1, 0),
  (6,  24, 41, 1,  null, 'Can you help me with my CV?', 'This week', 'declined', 'Sorry, I am fully booked this month. Please try again in a few weeks or join the spreadsheet clinic.', 20, 900),
  (7,  17, 42, 4,  null, 'I built a small API in Python and would like a review.', 'Thursday after 5pm', 'completed', null, 40, 120),
  (8,  51, 42, 5,  1,    'We need a plan for a simple website for our business.', 'Weekday mornings', 'completed', null, 70, 400),
  (9,  21, 42, 4,  null, 'Code review for my first website, please.', 'Tuesday', 'cancelled', 'I found a mentor in my cohort who can help, thank you.', 25, 200),
  (10, 14, 43, 6,  null, 'I want to sell more of my clothes online.', 'Afternoon', 'completed', null, 30, 90),
  (11, 20, 43, 7,  null, 'Could we do monthly check ins for my small business page?', 'First Monday of the month', 'accepted', null, 10, 60),
  (12, 13, 44, 8,  null, 'How do I start in IT support in Wa?', 'Saturday', 'completed', null, 28, 1000),
  (13, 54, 44, 9,  3,    'Our studio network keeps dropping. Could you check it?', 'Any weekday', 'requested', null, 2, 0),
  (14, 22, 46, 11, null, 'I would like a free intro to talk about my career.', 'Evening', 'completed', null, 22, 45),
  (15, 18, 46, 12, null, 'I have an interview for a frontend internship next week.', 'Wednesday evening', 'requested', null, 0.2, 0),
  (16, 27, 45, 10, null, 'Feedback on my first logo, please.', null, 'completed', null, 50, 700),
  (17, 9,  46, 12, null, 'Interview practice for an IT assistant role, please.', 'Friday 6pm', 'accepted', null, 4, 120),
  (18, 51, 42, 5,  1,    'Following your pitch: let us go ahead with the website plan.', null, 'accepted', null, 30, 15)
) b(i, req, exp, offer, org, msg, times, status, reason, d, resp_minutes)
-- The validation trigger runs before the conflict check, so skip existing rows.
where not exists (select 1 from public.booking_requests x where x.id = pg_temp.did(19, b.i))
on conflict do nothing;

update public.expert_profiles
   set accepting_requests = false
 where profile_id = pg_temp.uid(45) and accepting_requests;

insert into public.expert_reviews (id, booking_id, expert_id, reviewer_id, rating, body, created_at)
select pg_temp.did(21, r.i), pg_temp.did(19, r.i), pg_temp.uid(r.exp), pg_temp.uid(r.req), r.rating, r.body, pg_temp.ago(r.d)
from (values
  (1,  41, 1,  5, 'Rahinatu showed me how to describe my volunteer data work on my CV. Clear and practical.', 52),
  (2,  41, 3,  5, 'Very helpful. She found three mistakes in my dashboard I had missed.', 40),
  (3,  41, 8,  4, 'Good session. A bit rushed at the end because the group had many questions.', 26),
  (7,  42, 17, 5, 'Kwesi explained every change he suggested. I fixed my API the same week.', 30),
  (8,  42, 51, 4, 'A clear, realistic plan for our website. We are now working with him on the build.', 60),
  (10, 43, 14, 4, 'I now post three times a week and plan ahead. Thank you.', 20),
  (12, 44, 13, 5, 'Honest advice about starting in IT support outside Accra.', 18),
  (14, 46, 22, 5, 'Friendly and encouraging. Helped me pick what to focus on.', 12),
  (16, 45, 27, 4, 'Kind and detailed feedback with examples I could follow.', 40)
) r(i, exp, req, rating, body, d)
on conflict do nothing;

insert into public.booking_messages (id, booking_id, sender_id, body, created_at)
select pg_temp.did(20, m.i), pg_temp.did(19, m.b), pg_temp.uid(m.sender), m.body, pg_temp.ago(m.d)
from (values
  (1,  1,  41, 'Hello Fuseini, please send your CV here before Saturday so I can read it first.', 59.8),
  (2,  1,  1,  'Thank you. I have attached it as a Google Docs link in my email.', 59.6),
  (3,  1,  41, 'Got it. See you on Saturday at 9.', 59.4),
  (4,  4,  41, 'Thanks Amina. I will send written feedback by Friday.', 5.9),
  (5,  4,  12, 'Thank you. The dashboard uses data from two months of the salon.', 5.8),
  (6,  11, 43, 'Happy to. Let us start on the first Monday of next month.', 9.8),
  (7,  11, 20, 'Perfect, I will prepare my numbers.', 9.7),
  (8,  17, 46, 'Please send me the job advert so we can practise the right questions.', 3.9),
  (9,  17, 9,  'Here is the advert. It is for an IT assistant at a school in Nalerigu.', 3.5),
  (10, 18, 42, 'Thank you for choosing my pitch. I will share the first draft of the plan next week.', 29),
  (11, 18, 51, 'Great. Sanatu will send you our product list.', 28.5)
) m(i, b, sender, body, d)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Opportunities: open, closed and draft. No pay figures and no apply links;
-- applications are described in words.
-- ---------------------------------------------------------------------------
insert into public.opportunities (id, slug, kind, title, summary, description, organisation_id, organisation_name,
       posted_by, apply_instructions, location, region, is_remote, deadline, eligibility, fields, skills, tracks,
       status, published_at, created_at)
values
  (pg_temp.did(24, 1), 'savanna-agro-junior-records-assistant', 'job', 'Junior stock and records assistant',
   'Keep our stock, purchase and sales records accurate and up to date.',
   'You will record grain and shea purchases from farmers, keep the stock sheet up to date and prepare a simple weekly summary for the operations lead. You will be trained on our system. Good for someone who has finished a data or spreadsheet roadmap.',
   pg_temp.did(2, 1), 'Savanna Agro Traders', pg_temp.uid(51),
   'Send a short message through SydCrest saying why you want the role and which roadmap topics you have passed.',
   'Tamale', 'northern', false, pg_temp.day(21), 'You must be 18 or over and able to work in Tamale on weekdays.',
   '{data,business}', '{Google Sheets,Data entry,Attention to detail}', '{data,excel-power-bi}', 'open', pg_temp.ago(5), pg_temp.ago(6)),
  (pg_temp.did(24, 2), 'savanna-agro-digital-marketing-intern', 'internship', 'Digital marketing intern',
   'Help us tell farmers and traders what we buy and sell, on WhatsApp and Facebook.',
   'A three month internship working with our operations lead. You will plan and post content, answer messages and keep a simple record of enquiries. You will get a mentor and a reference at the end.',
   pg_temp.did(2, 1), 'Savanna Agro Traders', pg_temp.uid(52),
   'Share two pieces of content you have made, through SydCrest.',
   'Tamale', 'northern', false, pg_temp.day(30), 'Open to learners in the Northern Region. Delta Mentoring Program learners are welcome.',
   '{marketing}', '{Content planning,Facebook,WhatsApp Business}', '{digital-marketing,social-media-management}', 'open', pg_temp.ago(9), pg_temp.ago(10)),
  (pg_temp.did(24, 3), 'red-volta-craft-collective-product-photos', 'gig', 'Product photos and captions for a craft collective',
   'Photograph 30 baskets and write a short caption for each.',
   'A small gig for a weavers group. Take clear photos of 30 baskets in daylight and write a two line caption for each in English. Work can be done over two weekends.',
   null, 'Red Volta Craft Collective', null,
   'Message the collective through the contact in the brief after you apply.',
   'Bolgatanga', 'upper_east', false, pg_temp.day(12), null,
   '{creative,marketing}', '{Product photography,Copywriting}', '{content-creation}', 'open', pg_temp.ago(4), pg_temp.ago(4)),
  (pg_temp.did(24, 4), 'savannah-learners-bursary', 'scholarship', 'Savannah Learners Bursary',
   'Covers course and exam fees for a recognised digital skills certificate.',
   'For learners from the northern regions who have passed at least ten topics on a SydCrest roadmap. The bursary pays the course provider directly; no money is paid to learners.',
   null, 'Savannah Learners Bursary Fund', null,
   'Write 200 words on what you will study and how it helps you find work.',
   null, 'northern', true, pg_temp.day(45), 'Northern, Savannah, North East, Upper East or Upper West residents aged 18 to 30.',
   '{foundations}', '{}', '{}', 'open', pg_temp.ago(14), pg_temp.ago(15)),
  (pg_temp.did(24, 5), 'young-founders-starter-support', 'grant', 'Young founders starter support',
   'Mentoring and shared workspace for a first small business idea.',
   'Six months of mentoring, a desk at a shared workspace in Tamale and help writing a simple business plan. Open to early ideas in agriculture, retail and digital services.',
   null, 'Northern Enterprise Starter Trust', null,
   'Describe your idea in one page.',
   'Tamale', 'northern', false, pg_temp.day(60), 'Founders aged 18 to 35 based in the north.',
   '{business}', '{Business planning}', '{digital-business}', 'open', pg_temp.ago(20), pg_temp.ago(20)),
  (pg_temp.did(24, 6), 'savanna-agro-field-data-collector', 'job', 'Field data collector',
   'Collect purchase data from farmers using a phone form.',
   'Visit farming communities around Tamale with our buyers and record purchases on a phone form. Training provided.',
   pg_temp.did(2, 1), 'Savanna Agro Traders', pg_temp.uid(51),
   'Applications are closed.',
   'Tamale', 'northern', false, pg_temp.day(-70), null,
   '{data}', '{KoboToolbox,Data entry}', '{data}', 'closed', pg_temp.ago(100), pg_temp.ago(100)),
  (pg_temp.did(24, 7), 'upper-west-community-media-internship', 'internship', 'Community media internship',
   'Produce short audio and video stories for a community media group.',
   'An internship producing short stories for radio and social media in Wa and nearby towns.',
   null, 'Upper West Community Media Group', null,
   'Applications are closed.',
   'Wa', 'upper_west', false, pg_temp.day(-80), null,
   '{creative}', '{Audio editing,Short video}', '{content-creation}', 'closed', pg_temp.ago(110), pg_temp.ago(110)),
  (pg_temp.did(24, 8), 'savanna-agro-customer-service-assistant', 'job', 'Customer service assistant',
   'Answer farmer and trader questions by phone and WhatsApp.',
   'Draft listing, not yet published.',
   pg_temp.did(2, 1), 'Savanna Agro Traders', pg_temp.uid(52),
   null, 'Tamale', 'northern', false, null, null,
   '{business}', '{Customer service}', '{customer-service}', 'draft', null, pg_temp.ago(2)),
  (pg_temp.did(24, 9), 'harmattan-remote-virtual-assistant', 'job', 'Part time remote virtual assistant',
   'Manage calendars, emails and simple documents for a small consultancy.',
   'Work from anywhere in Ghana with a reliable connection, about 15 hours a week. You will manage two calendars, sort emails and prepare simple documents.',
   null, 'Harmattan Remote Services', null,
   'Send a short introduction and the days you are available.',
   null, null, true, pg_temp.day(25), 'Good written English and access to a laptop or desktop computer for the working hours.',
   '{business}', '{Google Workspace,Calendar management,Email}', '{virtual-assistant}', 'open', pg_temp.ago(2), pg_temp.ago(3))
on conflict do nothing;

insert into public.opportunity_saves (profile_id, opportunity_id, status, applied_at, created_at)
select pg_temp.uid(s.n), pg_temp.did(24, s.o), s.status, case when s.status = 'applied' then pg_temp.ago(s.d - 1) end, pg_temp.ago(s.d)
from (values
  (8, 1, 'applied', 4), (5, 1, 'saved', 3), (19, 1, 'saved', 2),
  (6, 2, 'applied', 7), (11, 2, 'saved', 6), (14, 2, 'applied', 5), (24, 2, 'saved', 3),
  (12, 3, 'saved', 3), (16, 9, 'applied', 2), (7, 4, 'saved', 10), (15, 4, 'saved', 8),
  (2, 6, 'applied', 95), (4, 7, 'applied', 105), (1, 5, 'saved', 15)
) s(n, o, status, d)
on conflict do nothing;

-- Outcomes reported by pilot graduates: three verified (these are the only
-- numbers /impact shows), one waiting for review.
insert into public.outcomes (id, profile_id, type, title, organisation_name, organisation_id, opportunity_id,
       started_on, evidence_note, show_on_profile, verification_status, verification_note, verified_at, created_at)
values
  (pg_temp.did(25, 1), pg_temp.uid(2), 'job', 'Field data collector', 'Savanna Agro Traders', pg_temp.did(2, 1), pg_temp.did(24, 6),
   pg_temp.day(-60), 'Offer letter shared with the SydCrest team.', true, 'verified', 'Offer letter checked.', pg_temp.ago(55), pg_temp.ago(58)),
  (pg_temp.did(25, 2), pg_temp.uid(4), 'internship', 'Community media intern', 'Upper West Community Media Group', null, pg_temp.did(24, 7),
   pg_temp.day(-65), 'Internship agreement shared with the SydCrest team.', true, 'verified', 'Agreement checked.', pg_temp.ago(60), pg_temp.ago(63)),
  (pg_temp.did(25, 3), pg_temp.uid(1), 'freelance_contract', 'Survey data cleaning', 'Northern Youth Skills Network', pg_temp.did(2, 2), null,
   pg_temp.day(-40), 'Signed contract for a three month data cleaning project.', true, 'verified', 'Contract checked.', pg_temp.ago(35), pg_temp.ago(38)),
  (pg_temp.did(25, 4), pg_temp.uid(3), 'scholarship', 'Web development certificate bursary', 'Savannah Learners Bursary Fund', null, null,
   pg_temp.day(-5), 'Award email forwarded.', false, 'pending', null, null, pg_temp.ago(4))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Skills catalogue. Demo skills are created only when the catalogue is empty.
-- ---------------------------------------------------------------------------
insert into public.skills (id, slug, name, summary, is_published, created_at)
select pg_temp.did(14, s.i), s.slug, s.name, s.summary, true, pg_temp.ago(120)
from (values
  (1, 'spreadsheet-data-cleaning', 'Spreadsheet data cleaning', 'Demo skill for staging review. Find and fix duplicates, blanks and inconsistent entries in a spreadsheet.'),
  (2, 'social-media-content-planning', 'Social media content planning', 'Demo skill for staging review. Plan a month of posts that fit a business and its customers.'),
  (3, 'responsive-web-pages', 'Responsive web pages', 'Demo skill for staging review. Build pages that work on phones, tablets and computers.'),
  (4, 'digital-basics', 'Digital basics', 'Demo skill for staging review. Use email, documents, files and the web safely and confidently.'),
  (5, 'brand-design-basics', 'Brand design basics', 'Demo skill for staging review. Design a simple, consistent look for a small business.')
) s(i, slug, name, summary)
where not exists (select 1 from public.skills where id::text not like 'de000000-%')
on conflict do nothing;

insert into public.skill_roadmaps (skill_id, roadmap_slug, created_at)
select s.id, m.slug, pg_temp.ago(120)
from (values (1, 'data-analyst'), (2, 'digital-marketer'), (3, 'frontend-developer'), (4, 'digital-skills-bridge'), (5, 'graphic-designer')) m(i, slug)
join public.skills s on s.id = pg_temp.did(14, m.i)
on conflict do nothing;

insert into public.skill_assessments (id, skill_id, kind, title, instructions, questions, pass_threshold, is_published, created_at)
select pg_temp.did(15, g.i), s.id, 'portfolio', 'Portfolio review: ' || s.name,
       'Share a link to one piece of work that shows this skill, with a short note on what you did. A reviewer checks it within a week.',
       '[]'::jsonb, 80, true, pg_temp.ago(120)
from generate_series(1, 5) g(i)
join public.skills s on s.id = pg_temp.did(14, g.i)
on conflict do nothing;

-- The k-th demo skill, or when real skills exist, one of them.
create or replace function pg_temp.skill(k integer) returns uuid
language sql stable as $$
  select coalesce(
    (select id from public.skills where id = pg_temp.did(14, k) and is_published),
    (select id from public.skills where is_published order by slug
      offset (k - 1) % greatest((select count(*) from public.skills where is_published), 1) limit 1))
$$;

-- Portfolio reviews: approved, rejected and two waiting in the reviewer queue.
-- Portfolio links use the reserved example.com domain: they are placeholders.
insert into public.skill_assessment_attempts (id, assessment_id, skill_id, profile_id, kind, status,
       portfolio_url, portfolio_note, reviewer_id, review_note, reviewed_at, submitted_at)
select pg_temp.did(16, a.i), sa.id, sa.skill_id, pg_temp.uid(a.n), 'portfolio', a.status,
       'https://example.com/portfolio/' || a.n, a.note,
       case when a.status in ('approved', 'rejected') then pg_temp.uid(35) end,
       a.review,
       case when a.status in ('approved', 'rejected') then pg_temp.ago(a.d - 2) end,
       pg_temp.ago(a.d)
from (values
  (1, 12, 5, 'approved', 'A logo and colour guide I made for a hair salon in Sakasaka.', 'Clean, consistent work with a clear reason for each choice. Verified.', 20),
  (2, 16, 2, 'rejected', 'A content plan for my aunt''s shop.', 'A good start, but the plan covers only one week. Plan a full month with a goal for each week and send it again.', 15),
  (3, 27, 5, 'pending_review', 'My first logo for a friend''s phone repair shop.', null, 3),
  (4, 10, 3, 'pending_review', 'A page I designed and built for a cooperative, with notes on how it adapts to small screens.', null, 1)
) a(i, n, k, status, note, review, d)
join public.skill_assessments sa
  on sa.skill_id = pg_temp.skill(a.k) and sa.kind = 'portfolio' and sa.is_published
on conflict do nothing;

insert into public.verified_skills (id, profile_id, skill_id, source, source_ref, issued_by, issued_at)
select pg_temp.did(17, v.i), pg_temp.uid(v.n), pg_temp.skill(v.k), v.source,
       case when v.source = 'portfolio_review' then pg_temp.did(16, 1)::text end,
       case when v.source = 'portfolio_review' then pg_temp.uid(35) end,
       pg_temp.ago(v.d)
from (values
  (1, 12, 5, 'portfolio_review', 18), (2, 2, 2, 'assessment', 70), (3, 6, 2, 'assessment', 20),
  (4, 4, 2, 'assessment', 72), (5, 17, 3, 'assessment', 25), (6, 3, 3, 'assessment', 60),
  (7, 5, 1, 'assessment', 65)
) v(i, n, k, source, d)
where pg_temp.skill(v.k) is not null
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Talent directory (seen by verified organisations and admins). Listings only
-- for people with a certificate or a verified skill, as the directory requires.
-- ---------------------------------------------------------------------------
insert into public.talent_listings (profile_id, headline, summary, skills, tracks, region, availability,
       open_to_remote, is_active, created_at)
select pg_temp.uid(t.n), t.headline, t.summary, t.skills, t.tracks, t.region, t.avail, t.remote, t.active, pg_temp.ago(t.d)
from (values
  (1,  'Data analyst: survey cleaning, sheets and dashboards', 'Delta Mentoring Program graduate. I clean and analyse survey and sales data and present it simply.', '{Google Sheets,Data cleaning,Pivot tables,SQL basics}'::text[], '{data}'::text[], 'northern', 'open_to_work', true, true, 70),
  (2,  'Social media and content for small businesses', 'I plan, write and post content that brings in customers. Currently working, open to weekend gigs.', '{Content planning,Canva,Facebook pages}', '{digital-marketing,social-media-management}', 'northern', 'open_to_gigs', true, true, 70),
  (3,  'Junior web developer', 'I build simple, fast websites with HTML, CSS and JavaScript.', '{HTML,CSS,JavaScript}', '{frontend}', 'northern', 'open_to_internships', true, true, 65),
  (4,  'Video and audio stories', 'Short videos and radio pieces.', '{Short video,Audio editing}', '{content-creation}', 'upper_west', 'open_to_gigs', false, false, 72),
  (5,  'Records and spreadsheets for traders', 'I set up and keep clean records for small businesses and teach owners to use them.', '{Google Sheets,Data entry,Charts}', '{data,excel-power-bi}', 'northern', 'open_to_work', false, true, 66),
  (12, 'Graphic designer for local brands', 'Logos, flyers and social media graphics for shops and events.', '{Canva,Layout,Branding}', '{graphic-design}', 'northern', 'open_to_gigs', true, true, 17),
  (17, 'Backend developer, Python and SQL', 'I build small APIs and databases.', '{Python,SQL,APIs}', '{backend}', 'ashanti', 'open_to_internships', true, true, 24),
  (7,  'Office assistant with strong digital basics', 'Email, documents, spreadsheets and online safety.', '{Email,Google Docs,Online safety}', '{digital-skills-bridge}', 'savannah', 'open_to_work', false, true, 4)
) t(n, headline, summary, skills, tracks, region, avail, remote, active, d)
on conflict do nothing;

insert into public.talent_contact_requests (id, organisation_id, profile_id, requested_by, opportunity_id, message,
       status, shared_contact, responded_at, created_at)
values
  (pg_temp.did(26, 1), pg_temp.did(2, 1), pg_temp.uid(1), pg_temp.uid(52), null,
   'Hello Fuseini, we liked your listing. Could we talk about a data cleaning project for our purchase records?',
   'accepted', 'fuseini.mahama@demo.sydcrest.test', pg_temp.ago(20), pg_temp.ago(21)),
  (pg_temp.did(26, 2), pg_temp.did(2, 1), pg_temp.uid(5), pg_temp.uid(52), pg_temp.did(24, 1),
   'Hello Wumpini, our records assistant role looks like a good fit for you. Would you like to apply?',
   'pending', null, null, pg_temp.ago(2)),
  (pg_temp.did(26, 3), pg_temp.did(2, 1), pg_temp.uid(3), pg_temp.uid(51), null,
   'Hello Abdul-Rahman, are you available to help with our website?',
   'declined', null, pg_temp.ago(25), pg_temp.ago(27)),
  (pg_temp.did(26, 4), pg_temp.did(2, 1), pg_temp.uid(12), pg_temp.uid(52), null,
   'Hello Amina, would you design a flyer for our buying season?',
   'withdrawn', null, null, pg_temp.ago(9))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Community: posts for everyone, the Tamale and Bolgatanga chapters and
-- cohort 2, with replies and reactions. All backdated (the rate limit counts
-- the last hour). Replies and lead posts notify people through the triggers.
-- ---------------------------------------------------------------------------
insert into public.community_posts (id, author_id, scope, chapter_id, cohort_id, body, pinned_at,
       hidden_at, hidden_by, hidden_reason, created_at, updated_at)
select pg_temp.did(5, p.i), pg_temp.uid(p.author), p.scope,
       case when p.scope = 'chapter' then pg_temp.did(3, p.place) end,
       case when p.scope = 'cohort' then pg_temp.did(8, p.place) end,
       p.body,
       case when p.pinned then pg_temp.ago(p.d, -5) end,
       case when p.i = 10 then pg_temp.ago(p.d, -40) end,
       case when p.i = 10 then pg_temp.uid(32) end,
       case when p.i = 10 then 'Selling is not allowed in the community.' end,
       pg_temp.ago(p.d), pg_temp.ago(p.d)
from (values
  (1,  1,  'everyone', null, 'I passed the last checkpoint on the Data Analyst roadmap today. The pivot tables section took me three tries, so if you are stuck there, keep going. Happy to help anyone in Tamale with it.', false, 2.0),
  (2,  19, 'everyone', null, 'Should I start with the Digital Skills Bridge or go straight to Data Analyst? I have only used a phone so far.', false, 1.2),
  (3,  31, 'everyone', null, 'Tip for anyone on a small data bundle: the lessons are mostly text, so they use very little data. The videos in the resources are optional, so save them for when you are on wifi.', true, 6.0),
  (4,  2,  'everyone', null, 'I got my first job after the pilot cohort! I am now a field data collector at Savanna Agro Traders. Thank you to my mentor Hawa and everyone in the Tamale chapter.', false, 50.0),
  (5,  17, 'everyone', null, 'Does anyone in Kumasi want to study the Backend roadmap together? I am on the APIs section.', false, 4.0),
  (6,  10, 'everyone', null, 'I sent my first portfolio piece for review today. Nervous but excited.', false, 1.0),
  (7,  12, 'everyone', null, 'Canva tip: set up your brand colours once and every new design is faster.', false, 8.0),
  (8,  46, 'everyone', null, 'Free intro calls are open this month for anyone preparing for interviews. You can book one from my expert page.', false, 12.0),
  (9,  27, 'everyone', null, 'Hello everyone, I just joined from Ho. Where should a complete beginner start?', false, 0.5),
  (10, 30, 'everyone', null, 'Cheap data bundles for sale, message me on WhatsApp.', false, 0.8),
  (11, 8,  'everyone', null, 'The spreadsheet clinic with Rahinatu was so useful. I finally understand how to remove duplicates properly.', false, 25.0),
  (12, 32, 'chapter',  1,    'Next study session is on Saturday at 10am. Bring your phone or laptop and the topic you are stuck on. We will also plan the Digital Careers Day.', true, 3.0),
  (13, 32, 'chapter',  1,    'Thank you to everyone who came to the spreadsheet skillshop. Please fill in the feedback form on the event page so we can plan the next one.', false, 19.0),
  (14, 5,  'chapter',  1,    'Who wants to form a study group for the Data Analyst roadmap? We could meet on Wednesday evenings.', false, 4.0),
  (15, 14, 'chapter',  1,    'Does anyone know a good place in Tamale to print flyers for a small shop?', false, 2.0),
  (16, 36, 'chapter',  2,    'Welcome to the Bolgatanga chapter! Our launch meetup is coming up soon. Tell your friends who are learning.', true, 5.0),
  (17, 31, 'cohort',   2,    'Welcome to Tamale cohort 2! Week 1 starts today. Post your questions here and a mentor will reply within a day.', true, 42.0),
  (18, 32, 'cohort',   2,    'Reminder: week 6 work is due. If you need more time, message me before the end of the day.', false, 2.0),
  (19, 7,  'cohort',   2,    'For week 5, can we use the same business as week 4?', false, 9.0),
  (20, 11, 'cohort',   2,    'Sharing my week 4 audience description in case it helps anyone. Feedback welcome.', false, 16.0)
) p(i, author, scope, place, body, pinned, d)
on conflict do nothing;

insert into public.community_replies (id, post_id, author_id, body, created_at, updated_at)
select pg_temp.did(6, r.i), pg_temp.did(5, r.post), pg_temp.uid(r.author), r.body,
       cp.created_at + make_interval(mins => r.mins), cp.created_at + make_interval(mins => r.mins)
from (values
  (1,  1,  3,  'Congratulations! Pivot tables took me ages too.', 40),
  (2,  1,  8,  'Well done, that is inspiring.', 90),
  (3,  1,  5,  'How did you practise?', 150),
  (4,  1,  1,  'I used my own records from a shop. Real data made it easier to understand.', 200),
  (5,  2,  7,  'Start with the bridge. It made everything else easier for me.', 30),
  (6,  2,  31, 'The bridge is a good start if you are new to computers. You can switch roadmaps at any time.', 120),
  (7,  4,  1,  'Congratulations Zulaiha!', 20),
  (8,  4,  34, 'So proud of you.', 60),
  (9,  4,  6,  'This gives me hope.', 300),
  (10, 4,  14, 'Well done!', 900),
  (11, 5,  22, 'I am in Kumasi too, learning mobile apps. Happy to join.', 240),
  (12, 9,  23, 'Welcome! The Digital Skills Bridge roadmap is the best start.', 60),
  (13, 9,  32, 'Welcome Selorm. Try the short quiz on the Start page; it suggests a roadmap for you.', 180),
  (14, 11, 41, 'Glad it helped, Hawa!', 120),
  (15, 12, 1,  'I will be there.', 30),
  (16, 12, 6,  'Can I bring my cousin?', 75),
  (17, 12, 32, 'Yes, everyone is welcome.', 95),
  (18, 14, 8,  'Count me in.', 50),
  (19, 14, 29, 'Me too.', 400),
  (20, 16, 10, 'Excited for this!', 45),
  (21, 16, 25, 'I will come with two friends.', 200),
  (22, 17, 6,  'Thank you, happy to be here.', 30),
  (23, 17, 9,  'Ready!', 80),
  (24, 19, 31, 'Yes, keep the same business all the way through. It makes your capstone stronger.', 70),
  (25, 6,  35, 'Well done for sending it. I will look at it this week.', 200),
  (26, 20, 15, 'Thank you, this helped me with mine.', 300)
) r(i, post, author, body, mins)
join public.community_posts cp on cp.id = pg_temp.did(5, r.post)
on conflict do nothing;

-- Reactions from people who can see each post.
insert into public.community_reactions (id, profile_id, post_id, kind, created_at)
select pg_temp.did(7, p.i * 100 + x.n), pg_temp.uid(x.n), cp.id,
       (array['like', 'celebrate', 'helpful', 'support'])[1 + (p.i + x.n) % 4],
       cp.created_at + make_interval(mins => 15 + x.n * 7)
from (values (1),(2),(3),(4),(5),(6),(7),(8),(9),(11),(12),(13),(14),(16),(17),(18),(19),(20)) p(i)
join public.community_posts cp on cp.id = pg_temp.did(5, p.i)
join lateral (
  select dp.n from demo_people dp
  where dp.n <> (select n from demo_people where pg_temp.uid(n) = cp.author_id)
    and (cp.scope = 'everyone'
         or (cp.scope = 'chapter' and exists (select 1 from public.chapter_members m where m.chapter_id = cp.chapter_id and m.profile_id = pg_temp.uid(dp.n)))
         or (cp.scope = 'cohort' and exists (select 1 from public.cohort_members m where m.cohort_id = cp.cohort_id and m.profile_id = pg_temp.uid(dp.n) and m.status = 'active')))
    and (dp.n * 7 + p.i * 3) % (case when p.i in (1, 4, 3) then 2 else 4 end) = 0
) x on true
where cp.created_at + make_interval(mins => 15 + x.n * 7) < now()
on conflict do nothing;

insert into public.community_reactions (id, profile_id, reply_id, kind, created_at)
select pg_temp.did(7, 9000 + r.i), pg_temp.uid(r.n), pg_temp.did(6, r.reply), r.kind, cr.created_at + interval '30 minutes'
from (values (1, 2, 7, 'like'), (2, 1, 4, 'helpful'), (3, 19, 5, 'helpful'), (4, 19, 6, 'helpful'), (5, 7, 24, 'like'), (6, 27, 13, 'like'))
  r(i, n, reply, kind)
join public.community_replies cr on cr.id = pg_temp.did(6, r.reply)
where cr.created_at + interval '30 minutes' < now()
on conflict do nothing;

insert into public.reports (id, reporter_id, target_type, target_id, reason, status, created_at)
values
  (pg_temp.did(29, 1), pg_temp.uid(8),  'community_post', pg_temp.did(5, 10)::text, 'Selling data bundles in the community.', 'actioned', pg_temp.ago(0.79)),
  (pg_temp.did(29, 2), pg_temp.uid(20), 'community_post', pg_temp.did(5, 8)::text,  'Is advertising allowed here? Not sure, so flagging it.', 'open', pg_temp.ago(11)),
  (pg_temp.did(29, 3), pg_temp.uid(24), 'expert_review',  pg_temp.did(21, 3)::text, 'This review seems unfair to the expert.', 'dismissed', pg_temp.ago(20))
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Events: two past (completed) with check ins and feedback, upcoming ones
-- (one full with a waitlist), one cancelled and one draft. No recordings: a
-- recording needs a real video link. Venues are described, not invented.
-- ---------------------------------------------------------------------------
insert into public.community_events (id, slug, kind, title, summary, description, format, starts_at, ends_at,
       venue_name, venue_address, city, region, chapter_id, capacity, status, created_by, created_at)
select pg_temp.did(4, e.i), e.slug, e.kind, e.title, e.summary, e.descr, e.format,
       ((pg_temp.day(e.day) + e.at) at time zone 'Africa/Accra'),
       ((pg_temp.day(e.day) + e.at + make_interval(mins => e.mins)) at time zone 'Africa/Accra'),
       e.venue, e.address, e.city, e.region,
       case when e.chapter is not null then pg_temp.did(3, e.chapter) end,
       e.cap, e.status, pg_temp.uid(e.host), pg_temp.ago(abs(e.day) + 20)
from (values
  (1, 'demo-tamale-spreadsheet-skillshop', 'skillshop', 'Spreadsheet skillshop: cleaning and pivot tables',
   'A hands on morning cleaning a real market sheet and building your first pivot table.',
   'Bring a phone or laptop with Google Sheets. We work through a messy stock sheet together, fix duplicates and blanks, then summarise it with a pivot table. Beginners welcome.',
   'in_person', -19, time '10:00', 180, 'Tamale chapter study space', 'Shared with registered members', 'Tamale', 'northern', 1, 40, 'completed', 32),
  (2, 'demo-cv-clinic-webinar', 'webinar', 'CV clinic for first jobs',
   'How to write a one page CV when you have little work experience.',
   'Fuseini Azumah shows how to turn projects, volunteering and roadmap work into a strong one page CV, then answers questions live.',
   'online', -9, time '18:00', 75, null, null, null, null, null, null, 'completed', 46),
  (3, 'demo-ai-tools-at-work', 'webinar', 'AI tools at work, safely',
   'Using AI tools for writing and summaries without sharing private data.',
   'A practical session on prompts, checking answers and what never to paste into an AI tool.',
   'online', -33, time '18:30', 60, null, null, null, null, null, null, 'completed', 31),
  (4, 'demo-social-media-for-small-shops', 'webinar', 'Social media for small shops',
   'Plan a month of posts in one hour.',
   'Amina Zakaria walks through a simple monthly plan for a shop, with time for your questions. Places are limited so everyone can ask a question.',
   'online', 5, time '18:00', 60, null, null, null, null, null, 12, 'published', 43),
  (5, 'demo-tamale-digital-careers-day', 'flagship', 'Tamale Digital Careers Day',
   'Meet mentors, experts and organisations hiring in the north.',
   'A full day of short talks, CV reviews and conversations with organisations. Join in person in Tamale or follow the talks online.',
   'hybrid', 12, time '09:00', 420, 'Tamale chapter venue', 'Shared with registered members', 'Tamale', 'northern', 1, 120, 'published', 32),
  (6, 'demo-bolgatanga-launch-meetup', 'activation', 'Bolgatanga chapter launch meetup',
   'Meet other learners in Bolgatanga and plan the chapter together.',
   'Our first meetup. Come and meet the chapter lead, pick a roadmap and plan regular study sessions.',
   'in_person', 19, time '15:00', 120, 'Bolgatanga chapter meeting room', 'Shared with registered members', 'Bolgatanga', 'upper_east', 2, 50, 'published', 36),
  (7, 'demo-excel-basics-skillshop', 'skillshop', 'Excel basics skillshop',
   'Formulas and formatting for beginners.',
   'This session is cancelled because the venue is not available. We will share a new date soon.',
   'in_person', 3, time '10:00', 120, 'Tamale chapter study space', 'Shared with registered members', 'Tamale', 'northern', 1, 30, 'cancelled', 32),
  (8, 'demo-wa-chapter-intro', 'activation', 'Wa chapter introduction',
   'An introduction for learners in Wa.',
   'Draft: details to be confirmed.',
   'in_person', 40, time '15:00', 90, null, null, 'Wa', 'upper_west', 3, null, 'draft', 38)
) e(i, slug, kind, title, summary, descr, format, day, at, mins, venue, address, city, region, chapter, cap, status, host)
on conflict do nothing;

-- RSVPs. Event 4 is full (12 going), so three people wait.
insert into public.event_rsvps (event_id, profile_id, status, responded_at, updated_at)
select pg_temp.did(4, r.e), pg_temp.uid(r.n), r.status,
       ce.created_at + make_interval(hours => 2 + r.n), ce.created_at + make_interval(hours => 2 + r.n)
from (
  select 1 as e, n, case when n in (14, 20) then 'cancelled' else 'going' end as status
    from unnest(array[1,2,3,4,5,6,8,11,12,14,19,20,24,29,31,33,41,51]) n
  union all
  select 2, n, 'going' from unnest(array[1,3,5,7,9,13,16,17,18,22,27,28]) n
  union all
  select 3, n, case when n = 25 then 'cancelled' else 'going' end from unnest(array[2,6,10,15,20,23,25,47]) n
  union all
  select 4, n, 'going' from unnest(array[2,6,10,11,12,14,16,20,24,26,29,52]) n
  union all
  select 4, n, 'waitlisted' from unnest(array[19,23,30]) n
  union all
  select 5, n, case when n in (21, 28) then 'cancelled' else 'going' end
    from unnest(array[1,2,3,4,5,6,7,8,9,11,12,14,15,19,20,21,24,28,29,31,32,33,41,46,51,52]) n
  union all
  select 6, n, 'going' from unnest(array[10,16,25,36,44,53]) n
  union all
  select 7, n, 'going' from unnest(array[8,15,29]) n
) r
join public.community_events ce on ce.id = pg_temp.did(4, r.e)
on conflict do nothing;

-- Waitlisted people joined after the event filled up.
update public.event_rsvps
   set responded_at = now() - interval '1 day', updated_at = now() - interval '1 day'
 where event_id = pg_temp.did(4, 4) and status = 'waitlisted' and responded_at < now() - interval '1 day';

insert into public.event_checkins (event_id, profile_id, method, checked_in_by, checked_in_at)
select r.event_id, r.profile_id,
       case when (ascii(right(r.profile_id::text, 1)) % 3) = 0 then 'host' else 'code' end,
       case when (ascii(right(r.profile_id::text, 1)) % 3) = 0 then ce.created_by end,
       ce.starts_at + interval '10 minutes'
from public.event_rsvps r
join public.community_events ce on ce.id = r.event_id
where r.event_id in (pg_temp.did(4, 1), pg_temp.did(4, 2), pg_temp.did(4, 3))
  and r.status = 'going'
  and r.profile_id not in (pg_temp.uid(29), pg_temp.uid(51))
on conflict do nothing;

insert into public.event_feedback (event_id, profile_id, confidence, usefulness, clarity, logistics, recommend,
       attend_again, comment, quote_consent, created_at, updated_at)
select pg_temp.did(4, f.e), pg_temp.uid(f.n), f.conf, f.useful, f.clear, f.logi, f.rec, f.again, f.comment, f.quote,
       ce.ends_at + interval '3 hours', ce.ends_at + interval '3 hours'
from (values
  (1, 1,  5, 5, 5, 4, 10, true, 'I finally understand pivot tables. More sessions like this please.', true),
  (1, 2,  4, 5, 4, 4, 9,  true, 'Very practical. The room was a bit warm.', true),
  (1, 3,  4, 4, 5, 3, 8,  true, null, false),
  (1, 5,  5, 5, 5, 5, 10, true, 'Using a real market sheet made it easy to follow.', true),
  (1, 8,  4, 5, 4, 4, 9,  true, 'Good pace for beginners.', false),
  (1, 12, 3, 4, 4, 4, 8,  true, 'I needed more time on cleaning before pivot tables.', false),
  (1, 19, 4, 4, 4, 5, 9,  true, null, false),
  (2, 7,  4, 5, 5, null, 9, true, 'My CV is now one page and much clearer.', true),
  (2, 18, 5, 5, 5, null, 10, true, null, false),
  (2, 22, 4, 4, 5, null, 8, true, 'Helpful examples for people with no job history.', true)
) f(e, n, conf, useful, clear, logi, rec, again, comment, quote)
join public.community_events ce on ce.id = pg_temp.did(4, f.e)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Learning progress. Only topics passed with a quiz count (verified_at), and
-- every verified row has a passing score for that quiz. Streaks end today or
-- yesterday for some learners and lapsed for others. A few topics marked done
-- by hand (no quiz) are included: they never count on boards or streaks.
-- Roadmaps are matched by slug, falling back to any published roadmap with
-- quizzes, so this works with whatever is published on staging.
-- ---------------------------------------------------------------------------
create temp table demo_plan (n integer primary key, pref text, verified integer, streak integer, failing boolean) on commit drop;
insert into demo_plan values
  (1, 'data-analyst', 999, 12, false), (2, 'digital-marketer', 22, 5, false), (3, 'frontend-developer', 18, 0, true),
  (4, 'content-creator', 14, 3, false), (5, 'data-analyst', 16, 0, false), (6, 'digital-marketer', 20, 7, true),
  (7, 'digital-skills-bridge', 999, 4, false), (8, 'data-analyst', 11, 2, true), (9, 'it-support', 9, 1, false),
  (10, 'ui-ux-designer', 12, 6, false), (11, 'digital-marketer', 8, 0, true), (12, 'graphic-designer', 10, 3, false),
  (13, 'cybersecurity-analyst', 7, 0, false), (14, 'digital-business', 9, 2, false), (15, 'digital-skills-bridge', 15, 0, true),
  (16, 'virtual-assistant', 6, 1, false), (17, 'backend-developer', 13, 4, false), (18, 'frontend-developer', 5, 0, true),
  (19, 'digital-skills-bridge', 4, 2, false), (20, 'ai-tools-for-work', 6, 0, false), (21, 'product-manager', 3, 0, false),
  (22, 'mobile-app-developer', 4, 1, false), (23, 'digital-skills-bridge', 2, 0, false), (24, 'digital-marketer', 3, 0, true),
  (25, 'it-support', 1, 0, false), (26, 'digital-skills-bridge', 0, 0, false), (29, 'digital-skills-bridge', 2, 0, false),
  (31, 'digital-marketer', 9, 0, false), (41, 'data-analyst', 6, 0, false);

create temp table demo_quiz_nodes on commit drop as
select n.id as node_id, n.roadmap_id, q.pass_threshold,
       row_number() over (partition by n.roadmap_id order by n.position, n.slug) as ord,
       count(*) over (partition by n.roadmap_id) as cnt
from public.roadmap_nodes n
join public.roadmaps r on r.id = n.roadmap_id and r.is_published
join public.node_quiz q on q.node_id = n.id;

create temp table demo_progress on commit drop as
with roads as (
  select roadmap_id, slug, row_number() over (order by display_order, slug) as rk, count(*) over () as total
  from (select distinct q.roadmap_id, r.slug, r.display_order
        from demo_quiz_nodes q join public.roadmaps r on r.id = q.roadmap_id) x
),
pick as (
  select p.*, coalesce(
           (select roadmap_id from roads where slug = p.pref),
           (select roadmap_id from roads where rk = 1 + p.n % (select max(total) from roads))) as roadmap_id
  from demo_plan p
),
chosen as (
  select pk.n, pk.streak, pk.failing, q.node_id, q.pass_threshold, q.ord, q.cnt,
         least(pk.verified, q.cnt) as nv
  from pick pk
  join demo_quiz_nodes q on q.roadmap_id = pk.roadmap_id
)
select c.*, c.nv - c.ord + 1 as k,
       case when c.streak > 0 and c.nv - c.ord + 1 <= c.streak then c.nv - c.ord
            when c.streak > 0 then c.streak + 2 * (c.nv - c.ord + 1 - c.streak) - 1
            else 2 + 2 * (c.nv - c.ord + 1) end as days_ago
from chosen c
where c.ord <= c.nv + 1;

insert into public.roadmap_progress (id, profile_id, node_id, status, quiz_score, completed_at, verified_at, created_at, updated_at)
select pg_temp.did(33, d.n * 1000 + d.ord), pg_temp.uid(d.n), d.node_id,
       case when d.ord <= d.nv then 'done' else 'in_progress' end,
       case when d.ord <= d.nv then (d.pass_threshold + ((d.k * 13) % (101 - d.pass_threshold)))::smallint
            when d.failing then greatest(d.pass_threshold - 25, 0)::smallint end,
       case when d.ord <= d.nv then v.at end,
       case when d.ord <= d.nv then v.at end,
       v.at - interval '1 day', v.at
from demo_progress d
cross join lateral (
  select least(
    ((pg_temp.day(0) - d.days_ago::integer) + time '08:00' + make_interval(mins => ((d.k * 37) % 660)::integer)) at time zone 'Africa/Accra',
    now() - make_interval(mins => 10 + d.k::integer)) as at
) v
where d.ord <= d.nv or d.failing or d.n = 26
on conflict do nothing;

-- Topics marked done by hand on roadmaps without quizzes: personal tracking only.
insert into public.roadmap_progress (id, profile_id, node_id, status, completed_at, created_at, updated_at)
select pg_temp.did(33, m.n * 1000 + 900 + x.ord), pg_temp.uid(m.n), x.id, 'done',
       pg_temp.ago(x.ord * 2 + m.n % 3), pg_temp.ago(x.ord * 2 + m.n % 3 + 1), pg_temp.ago(x.ord * 2 + m.n % 3)
from (values (3, 3), (10, 2), (27, 3), (17, 2)) m(n, howmany)
cross join lateral (
  select n.id, row_number() over (order by r.display_order, n.position, n.slug) as ord
  from public.roadmap_nodes n
  join public.roadmaps r on r.id = n.roadmap_id and r.is_published
  where not exists (select 1 from public.node_quiz q where q.node_id = n.id)
  order by r.display_order, n.position, n.slug
  limit m.howmany
) x
on conflict do nothing;

-- Achievements the quiz flow would have minted. A full roadmap also issues the
-- linked verified skill (and its notification) through the achievements trigger.
insert into public.achievements (profile_id, type, ref_id, metadata, created_at)
select rp.profile_id, 'roadmap_node_completed', rp.node_id::text, '{}'::jsonb, rp.verified_at
from public.roadmap_progress rp
where rp.id::text like 'de000000-0033-%' and rp.verified_at is not null
on conflict do nothing;

insert into public.achievements (profile_id, type, ref_id, metadata, created_at)
select rp.profile_id, 'roadmap_completed', n.roadmap_id::text, '{}'::jsonb, max(rp.verified_at)
from public.roadmap_progress rp
join public.roadmap_nodes n on n.id = rp.node_id
where rp.id::text like 'de000000-0033-%' and rp.verified_at is not null
group by rp.profile_id, n.roadmap_id
having not exists (
  select 1 from public.roadmap_nodes n2
  where n2.roadmap_id = n.roadmap_id and not n2.is_optional
    and not exists (select 1 from public.roadmap_progress p2
                    where p2.node_id = n2.id and p2.profile_id = rp.profile_id and p2.verified_at is not null)
)
on conflict do nothing;

insert into public.achievements (profile_id, type, ref_id, metadata, created_at)
select pg_temp.uid(p.n), 'track_chosen', r.slug, '{}'::jsonb, pg_temp.ago(dp.joined - 0.1)
from demo_plan p
join demo_people dp on dp.n = p.n
join public.roadmaps r on r.slug = p.pref and r.is_published
where p.n <= 30
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Notifications. Replies, chapter posts and verified skills already notified
-- people through the triggers; move those to when the thing happened, and mark
-- older ones read. Then a few written notifications of the kinds the app sends.
-- ---------------------------------------------------------------------------
update public.notifications nt
   set created_at = src.at,
       read_at = case when src.at < now() - interval '2 days' and nt.read_at is null then src.at + interval '3 hours' else nt.read_at end
  from (
    select n.id, coalesce(cr.created_at, cp.created_at, vs.issued_at) as at
    from public.notifications n
    left join public.community_replies cr on n.kind = 'community_reply' and cr.id::text = n.payload ->> 'reply_id'
    left join public.community_posts cp on n.kind = 'chapter_post' and cp.id::text = n.payload ->> 'post_id'
    left join public.verified_skills vs on n.kind = 'verified_skill' and vs.id::text = n.payload ->> 'verified_skill_id'
    where n.recipient_id in (select pg_temp.uid(p.n) from demo_people p)
      and n.id::text not like 'de000000-%'
  ) src
 where nt.id = src.id and src.at is not null and nt.created_at > src.at;

insert into public.notifications (id, recipient_id, kind, payload, read_at, created_at)
select pg_temp.did(27, x.i), pg_temp.uid(x.n), x.kind,
       jsonb_build_object('title', x.title, 'body', x.body, 'href', x.href),
       case when x.read then pg_temp.ago(x.d - 0.1) end, pg_temp.ago(x.d)
from (values
  (1,  12, 'booking',     'Rahinatu accepted your request', 'Dashboard feedback: she will reply with written feedback this week.', '/bookings', false, 5.8),
  (2,  12, 'cohort',      'Week 4 is graded', 'You scored well. Read your mentor''s feedback.', '/cohort/work', true, 20),
  (3,  12, 'review',      'Your portfolio was approved', 'The skill is now verified on your profile.', '/profile', true, 18),
  (4,  12, 'opportunity', 'New gig that matches your skills', 'Product photos and captions for a craft collective in Bolgatanga.', '/opportunities', false, 3),
  (5,  12, 'system',      'Welcome to SydCrest', 'Pick a roadmap to start learning, at your own pace.', '/learn', true, 137),
  (6,  6,  'cohort',      'AI feedback on week 5 is ready', 'Read it, then your mentor will grade your work.', '/cohort/work', false, 9),
  (7,  12, 'cohort',      'Week 6 is due', 'Send your work for week 6 today, or message your mentor if you need more time.', '/cohort', false, 1),
  (8,  6,  'system',      'Social media for small shops is coming up', 'It starts in a few days. You have a place.', '/events/demo-social-media-for-small-shops', false, 2),
  (9,  6,  'opportunity', 'You applied to Digital marketing intern', 'Savanna Agro Traders will contact you through SydCrest.', '/opportunities/saved', true, 6),
  (10, 51, 'booking',     'Kwesi accepted your request', 'Small business website plan. Open the booking to message him.', '/bookings', true, 29),
  (11, 51, 'opportunity', 'A learner applied', 'Hawa Salifu applied to Junior stock and records assistant.', '/org/savanna-agro-traders/opportunities', false, 3),
  (12, 41, 'booking',     'New request from Iddrisu Yakubu', 'CV and portfolio review for data roles.', '/expert', false, 1),
  (13, 41, 'review',      'New review from Hawa Salifu', 'Four stars for Spreadsheet clinic.', '/expert', true, 26)
) x(i, n, kind, title, body, href, read, d)
on conflict do nothing;

commit;
