-- The DMP pilot has 25 free seats (Planning/00, the public site's PILOT.seats),
-- but the seed set the programme's default cohort size to 20. New DMP cohorts
-- now default to 25 places. Founder decision, 11 Nov 2026 (#287).
update public.programs
set default_cohort_size = 25
where slug = 'dmp' and default_cohort_size = 20;
