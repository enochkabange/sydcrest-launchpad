-- Low bandwidth and low end devices (issue #331, epic #320).
--
-- The browser now adds its connection class to web_vital and session_started
-- (props.connection: slow-2g, 2g, 3g, 4g or unknown, from the Network
-- Information API; props.save_data: the data saver setting). These report
-- functions split page speed, failed loads and lesson and quiz drop off by it
-- for the Reliability dashboard. Report only: connection never enters a
-- score or learner_attributes.
--
-- Connection class: slow is slow-2g, 2g or 3g; fast is 4g (which also covers
-- wifi and anything faster); unknown is everything else, including browsers
-- without the API (Safari, Firefox).
--
-- Events that do not carry the connection themselves (page views, errors,
-- lessons, quizzes) take it from their tab session's session_started.
--
-- Every function has the same seven argument signature as the other
-- admin_insights_* reports so the CSV export route can call it; only
-- p_device applies here.

-- 1. Helpers ---------------------------------------------------------------------------

-- slow, fast or unknown from an effective connection type.
create function private.connection_class(p_type text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_type in ('slow-2g', '2g', '3g') then 'slow'
    when p_type = '4g' then 'fast'
    else 'unknown'
  end;
$$;

revoke execute on function private.connection_class(text) from public, anon, authenticated;

-- The connection type each tab session started on (its first session_started),
-- for sessions that started in the range or the day before it.
create function private.session_connections(p_from date, p_to date)
returns table (session_id text, connection text)
language sql
stable
security definer
set search_path = ''
as $$
  select distinct on (e.session_id) e.session_id,
         case when e.props ->> 'connection' in ('slow-2g', '2g', '3g', '4g') then e.props ->> 'connection' else 'unknown' end
    from public.events e
   where e.name = 'session_started'
     and e.session_id is not null
     and e.created_at >= (p_from - 1)::timestamp at time zone 'UTC'
     and e.created_at < (p_to + 1)::timestamp at time zone 'UTC'
   order by e.session_id, e.created_at;
$$;

revoke execute on function private.session_connections(date, date) from public, anon, authenticated;

-- 2. Web Vitals by connection type and device ---------------------------------------------

create function public.admin_insights_vitals_connection(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (connection text, device_class text, metric text, samples integer, p75 double precision,
               good integer, needs_improvement integer, poor integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select case when e.props ->> 'connection' in ('slow-2g', '2g', '3g', '4g') then e.props ->> 'connection' else 'unknown' end,
         coalesce(e.device_class, 'unknown'), e.props ->> 'metric', count(*)::integer,
         percentile_cont(0.75) within group (order by (e.props ->> 'value')::double precision),
         count(*) filter (where e.props ->> 'rating' = 'good')::integer,
         count(*) filter (where e.props ->> 'rating' = 'needs-improvement')::integer,
         count(*) filter (where e.props ->> 'rating' = 'poor')::integer
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
     and e.name = 'web_vital'
     and e.props ->> 'metric' in ('LCP', 'INP', 'CLS', 'FCP', 'TTFB')
     and jsonb_typeof(e.props -> 'value') = 'number'
     and (p_device is null or e.device_class = p_device)
   group by 1, 2, 3
   order by 4 desc, 1, 2, 3;
end;
$$;

-- 3. Failed loads by connection type and device ----------------------------------------
-- Page views, browser errors (half of sessions) and server render errors in
-- tab sessions, by the connection the session started on.

create function public.admin_insights_loads_connection(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (connection text, device_class text, sessions integer, page_views integer,
               client_errors integer, server_errors integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select coalesce(s.connection, 'unknown'), coalesce(e.device_class, 'unknown'),
         count(distinct e.session_id) filter (where e.name = 'page_view')::integer,
         count(*) filter (where e.name = 'page_view')::integer,
         count(*) filter (where e.name = 'client_error')::integer,
         count(*) filter (where e.name = 'server_error')::integer
    from public.events e
    left join private.session_connections(p_from, p_to) s on s.session_id = e.session_id
   where e.created_at >= v_from and e.created_at < v_to
     and (e.name in ('page_view', 'client_error')
          or (e.name = 'server_error' and e.props ->> 'route_type' = 'render'))
     and (p_device is null or e.device_class = p_device)
   group by 1, 2
   order by 4 desc, 1, 2;
end;
$$;

-- 4. The routes where slow connections hurt most ---------------------------------------------
-- LCP and INP p75 on slow and fast connections per page; the five pages with
-- the widest LCP gap, among pages with at least five LCP samples on each.

create function public.admin_insights_slow_routes(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (route text, slow_samples integer, fast_samples integer,
               slow_lcp double precision, fast_lcp double precision, lcp_gap double precision,
               slow_inp double precision, fast_inp double precision, inp_gap double precision)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with v as (
    select coalesce(e.route, '') as route,
           private.connection_class(e.props ->> 'connection') as class,
           e.props ->> 'metric' as metric,
           (e.props ->> 'value')::double precision as value
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and e.name = 'web_vital'
       and e.props ->> 'metric' in ('LCP', 'INP')
       and jsonb_typeof(e.props -> 'value') = 'number'
       and (p_device is null or e.device_class = p_device)
  ), r as (
    select v.route,
           count(*) filter (where v.metric = 'LCP' and v.class = 'slow') as slow_n,
           count(*) filter (where v.metric = 'LCP' and v.class = 'fast') as fast_n,
           percentile_cont(0.75) within group (order by v.value) filter (where v.metric = 'LCP' and v.class = 'slow') as slow_lcp,
           percentile_cont(0.75) within group (order by v.value) filter (where v.metric = 'LCP' and v.class = 'fast') as fast_lcp,
           percentile_cont(0.75) within group (order by v.value) filter (where v.metric = 'INP' and v.class = 'slow') as slow_inp,
           percentile_cont(0.75) within group (order by v.value) filter (where v.metric = 'INP' and v.class = 'fast') as fast_inp
      from v
     group by v.route
  )
  select r.route, r.slow_n::integer, r.fast_n::integer,
         r.slow_lcp, r.fast_lcp, r.slow_lcp - r.fast_lcp,
         r.slow_inp, r.fast_inp, r.slow_inp - r.fast_inp
    from r
   where r.slow_n >= 5 and r.fast_n >= 5
   order by r.slow_lcp - r.fast_lcp desc, r.route
   limit 5;
end;
$$;

-- 5. Lesson and quiz drop off by connection class -----------------------------------------
-- Lessons opened (server), lessons left with time and scroll depth (browser),
-- and quizzes sent and passed (server), by the class of the session's
-- connection. Read to the end: scrolled at least 90 percent.

create function public.admin_insights_learn_connection(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (connection text, lessons_opened integer, lessons_left integer, read_to_end integer,
               median_time_ms double precision, median_scroll double precision,
               quizzes integer, quizzes_passed integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with l as (
    select private.connection_class(s.connection) as class, e.name,
           case when jsonb_typeof(e.props -> 'time_spent_ms') = 'number' then (e.props ->> 'time_spent_ms')::double precision end as time_ms,
           case when jsonb_typeof(e.props -> 'scroll_percent') = 'number' then (e.props ->> 'scroll_percent')::double precision end as scroll,
           e.props ->> 'passed' = 'true' as passed
      from public.events e
      left join private.session_connections(p_from, p_to) s on s.session_id = e.session_id
     where e.created_at >= v_from and e.created_at < v_to
       and e.name in ('lesson_opened', 'lesson_left', 'quiz_submitted')
       and (p_device is null or e.device_class = p_device)
  )
  select l.class,
         count(*) filter (where l.name = 'lesson_opened')::integer,
         count(*) filter (where l.name = 'lesson_left')::integer,
         count(*) filter (where l.name = 'lesson_left' and l.scroll >= 90)::integer,
         percentile_cont(0.5) within group (order by l.time_ms) filter (where l.name = 'lesson_left'),
         percentile_cont(0.5) within group (order by l.scroll) filter (where l.name = 'lesson_left'),
         count(*) filter (where l.name = 'quiz_submitted')::integer,
         count(*) filter (where l.name = 'quiz_submitted' and l.passed)::integer
    from l
   group by l.class
   order by l.class;
end;
$$;

-- 6. Grants -------------------------------------------------------------------------------

do $$
declare
  f text;
begin
  foreach f in array array[
    'admin_insights_vitals_connection', 'admin_insights_loads_connection',
    'admin_insights_slow_routes', 'admin_insights_learn_connection'
  ] loop
    execute format('revoke execute on function public.%I(date, date, text, text, uuid, uuid, text) from public, anon', f);
    execute format('grant execute on function public.%I(date, date, text, text, uuid, uuid, text) to authenticated, service_role', f);
  end loop;
end;
$$;
