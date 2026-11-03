-- DMP Google Ads week 9: settings sheet assignment (founder decision, 2 Nov 2026).
--
-- Every learner plans the campaign in a settings sheet (budget, bidding,
-- keywords, ads). Only learners who already have a Google Ads account also
-- screenshot those settings with the campaign paused. Nobody adds payment
-- details. Replaces the earlier wording that asked every learner to create a
-- Google Ads account.
--
-- Data only: updates program_weeks.assignment for the dmp programme, week 9,
-- specialization google_ads, and nothing else. Idempotent; a missing row is
-- skipped.
--
-- src/content/dmp/seed.test.ts applies this JSON over the seed's and fails if
-- the result drifts from curriculum.ts.

do $seed$
declare
  v_doc jsonb := $json$
{
  "weeks": [
    {
      "week_number": 9,
      "specialization": "google_ads",
      "assignment": "Plan a search campaign for a mock business in a settings sheet: budget, bidding, keywords and ads. Only if you already have a Google Ads account, also screenshot those settings with the campaign paused. Do not add payment details."
    }
  ]
}
$json$;
  v_week jsonb;
begin
  for v_week in select * from jsonb_array_elements(v_doc -> 'weeks') loop
    update public.program_weeks w
       set assignment = v_week ->> 'assignment'
      from public.programs p
     where p.id = w.program_id
       and p.slug = 'dmp'
       and w.week_number = (v_week ->> 'week_number')::smallint
       and w.specialization is not distinct from (v_week ->> 'specialization')
       and w.assignment is distinct from (v_week ->> 'assignment');
  end loop;
end;
$seed$;
