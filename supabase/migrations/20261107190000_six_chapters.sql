-- The six chapters SydCrest runs for now (founder decision, 7 Nov 2026, #300):
-- Tamale, Accra, Wa, Navrongo, Bolgatanga, and North East (Nalerigu and
-- Walewale as one chapter). They open as 'launching' ("Being set up": open to
-- join, first Skillshop being planned) before leads are appointed; admins add
-- leads, summaries and WhatsApp links in /admin/chapters.
--
-- Inserts only. A chapter is skipped if its slug is taken or one already
-- exists for the same region and city (one may have been made by hand in
-- /admin/chapters). Same list as CHAPTERS in src/content/marketing.ts.

insert into public.chapters (slug, name, region, city, status)
select v.slug, v.name, v.region, v.city, 'launching'
from (values
  ('tamale',     'Tamale chapter',     'northern',      'Tamale'),
  ('accra',      'Accra chapter',      'greater_accra', 'Accra'),
  ('wa',         'Wa chapter',         'upper_west',    'Wa'),
  ('navrongo',   'Navrongo chapter',   'upper_east',    'Navrongo'),
  ('bolgatanga', 'Bolgatanga chapter', 'upper_east',    'Bolgatanga'),
  ('north-east', 'North East chapter', 'north_east',    'Nalerigu and Walewale')
) as v (slug, name, region, city)
where not exists (
  select 1 from public.chapters c
  where c.slug = v.slug or (c.region = v.region and lower(c.city) = lower(v.city))
);
