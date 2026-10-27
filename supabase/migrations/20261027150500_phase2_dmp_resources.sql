-- Phase 2, part 6: DMP week resource links (follow up to phase2_dmp_seed).
--
-- PR #155 replaced broken or generic resource links in
-- src/content/dmp/curriculum.ts (weeks 1, 2, 4, 6, 7 and 8). phase2_dmp_seed
-- has already shipped, so this migration brings resource_name and
-- resource_url of every DMP week in line with curriculum.ts. Themes,
-- objectives and assignments are unchanged. Idempotent: an update keyed on
-- programme slug, week number and specialization; nothing is deleted.
--
-- src/content/dmp/seed.test.ts applies this JSON over the seed's and fails
-- if the result drifts from curriculum.ts.

do $seed$
declare
  v_doc jsonb := $json$
{
  "weeks": [
    {
      "week_number": 1,
      "specialization": null,
      "resource_name": "GCFGlobal LearnFree: Computer Basics",
      "resource_url": "https://www.learnfree.org/series/computer-basics"
    },
    {
      "week_number": 2,
      "specialization": null,
      "resource_name": "GCFGlobal LearnFree: Google Drive",
      "resource_url": "https://www.learnfree.org/series/google-drive"
    },
    {
      "week_number": 3,
      "specialization": null,
      "resource_name": "Meta Blueprint",
      "resource_url": "https://www.facebook.com/business/learn"
    },
    {
      "week_number": 4,
      "specialization": null,
      "resource_name": "Google Skillshop: Fundamentals of Digital Marketing",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1830706"
    },
    {
      "week_number": 5,
      "specialization": null,
      "resource_name": "Meta Blueprint: Increase Sales",
      "resource_url": "https://www.facebook.com/business/learn"
    },
    {
      "week_number": 6,
      "specialization": null,
      "resource_name": "Google Analytics Academy",
      "resource_url": "https://support.google.com/analytics/answer/15068052"
    },
    {
      "week_number": 7,
      "specialization": "google_ads",
      "resource_name": "Google Skillshop: Get Search Ad Campaign Ready",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1830706"
    },
    {
      "week_number": 7,
      "specialization": "seo",
      "resource_name": "Google Skillshop: Search",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1830706"
    },
    {
      "week_number": 7,
      "specialization": "social_media",
      "resource_name": "Meta Blueprint",
      "resource_url": "https://www.facebook.com/business/learn"
    },
    {
      "week_number": 8,
      "specialization": "google_ads",
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 8,
      "specialization": "seo",
      "resource_name": "GCFGlobal LearnFree: SEO Basics for Beginners",
      "resource_url": "https://www.learnfree.org/series/seo-basics-for-beginners"
    },
    {
      "week_number": 8,
      "specialization": "social_media",
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 9,
      "specialization": "google_ads",
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 9,
      "specialization": "seo",
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 9,
      "specialization": "social_media",
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 10,
      "specialization": null,
      "resource_name": null,
      "resource_url": null
    },
    {
      "week_number": 11,
      "specialization": null,
      "resource_name": "Google Sites",
      "resource_url": "https://sites.google.com/"
    },
    {
      "week_number": 12,
      "specialization": null,
      "resource_name": null,
      "resource_url": null
    }
  ]
}
$json$;
  v_week jsonb;
begin
  for v_week in select * from jsonb_array_elements(v_doc -> 'weeks') loop
    update public.program_weeks w
       set resource_name = v_week ->> 'resource_name',
           resource_url = v_week ->> 'resource_url'
      from public.programs p
     where p.id = w.program_id
       and p.slug = 'dmp'
       and w.week_number = (v_week ->> 'week_number')::smallint
       and w.specialization is not distinct from (v_week ->> 'specialization')
       and (w.resource_name, w.resource_url) is distinct from (v_week ->> 'resource_name', v_week ->> 'resource_url');
  end loop;
end;
$seed$;
