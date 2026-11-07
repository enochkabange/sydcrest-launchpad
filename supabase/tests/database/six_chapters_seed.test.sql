-- The six chapters seeded for launch (#300).
begin;
select plan(4);

select is(
  (select array_agg(slug order by slug) from public.chapters
    where slug in ('tamale', 'accra', 'wa', 'navrongo', 'bolgatanga', 'north-east')),
  array['accra', 'bolgatanga', 'navrongo', 'north-east', 'tamale', 'wa'],
  'all six chapters exist'
);

select is(
  (select count(*)::int from public.chapters
    where slug in ('tamale', 'accra', 'wa', 'navrongo', 'bolgatanga', 'north-east') and status = 'launching'),
  6,
  'they open as being set up, so people can join'
);

select is(
  (select city from public.chapters where slug = 'north-east'),
  'Nalerigu and Walewale',
  'North East is one chapter for Nalerigu and Walewale'
);

set local role anon;
select is(
  (select count(*)::int from public.chapters
    where slug in ('tamale', 'accra', 'wa', 'navrongo', 'bolgatanga', 'north-east')),
  6,
  'signed out visitors can see them'
);
reset role;

select * from finish();
rollback;
