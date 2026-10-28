-- DMP: refreshed week links and up to three resources per week (issue #239).
--
-- Schema (additive): program_weeks.resources, a jsonb array of at most three
-- {"name", "url"} objects, shown in the cohort portal as "Extra practice"
-- after SydCrest's own lessons. resource_name and resource_url stay and
-- mirror the first resource, for compatibility. Existing rows of any
-- programme are backfilled from those two columns. Column grants and RLS are
-- the table's (public read for published programmes, admins write).
--
-- Data: every DMP week's resources, and the roadmap links of the shared weeks
-- (1 to 6 and 10 to 12) remapped to the Digital Skills Bridge and Digital
-- Marketer lessons in teaching order (src/content/dmp/week-lessons.ts,
-- SHARED_WEEK_LINKS). Weeks 7 to 9 keep the specialisation links from
-- 20261029110000_dmp_specialisation_lessons. Links outside the new list are
-- removed for the shared weeks only; program_week_nodes holds links, not
-- learner data. Idempotent.
--
-- src/content/dmp/seed.test.ts applies this JSON over the seed's and fails if
-- the result drifts from curriculum.ts or week-lessons.ts.
--
-- Resource check, 2026-10-28: every URL below was fetched and returned 200 on
-- the page named (title checked, since Skillshop answers 200 "Not Found" for
-- bad paths). Sources: GCFGlobal LearnFree (learnfree.org/series), Meta
-- Blueprint (facebookblueprint.com), Google Skillshop, Google Search Central,
-- Google Business Profile Help, Google Analytics Help, Google Ads Help,
-- Google Sites Help, YouTube Help, HubSpot Academy free certification courses
-- and Mailchimp's free guides. Replaced: facebook.com/business/learn (weeks 3
-- and 5, social media week 7; answers 400 and is a generic hub), the
-- Fundamentals of Digital Marketing collection used for SEO and Google Ads
-- week 7 (right page, wrong topic), and sites.google.com (week 11; a sign in
-- screen, not a guide). Not used: canva.com/designschool (403 to checks),
-- edu.gcfglobal.org paths (404 now; LearnFree is the successor), WhatsApp and
-- Facebook help pages (block automated checks). No paid courses, no
-- roadmap.sh.

create function private.program_week_resources_valid(p_resources jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select jsonb_typeof(p_resources) = 'array'
     and jsonb_array_length(p_resources) <= 3
     and not exists (
       select 1 from jsonb_array_elements(p_resources) e
       where jsonb_typeof(e) <> 'object'
          or char_length(coalesce(e ->> 'name', '')) not between 1 and 200
          or coalesce(e ->> 'url', '') !~ '^https://'
          or char_length(e ->> 'url') > 2000
     );
$$;

revoke execute on function private.program_week_resources_valid(jsonb) from public;
grant execute on function private.program_week_resources_valid(jsonb) to authenticated, service_role;

alter table public.program_weeks
  add column resources jsonb not null default '[]'::jsonb
  constraint program_weeks_resources_valid check (private.program_week_resources_valid(resources));

comment on column public.program_weeks.resources is
  'Up to three free official resources for extra practice, [{"name","url"}] in display order. resource_name and resource_url mirror the first one.';

-- Backfill every programme from the single resource columns.
update public.program_weeks
   set resources = jsonb_build_array(jsonb_build_object('name', resource_name, 'url', resource_url))
 where resources = '[]'::jsonb
   and resource_name is not null
   and resource_url ~ '^https://';

do $seed$
declare
  v_doc jsonb := $json$
{
  "weeks": [
    {
      "week_number": 1,
      "specialization": null,
      "resource_name": "GCFGlobal LearnFree: Computer Basics",
      "resource_url": "https://www.learnfree.org/series/computer-basics",
      "resources": [
        {
          "name": "GCFGlobal LearnFree: Computer Basics",
          "url": "https://www.learnfree.org/series/computer-basics"
        },
        {
          "name": "GCFGlobal LearnFree: Internet Basics",
          "url": "https://www.learnfree.org/series/internet-basics"
        },
        {
          "name": "GCFGlobal LearnFree: Gmail",
          "url": "https://www.learnfree.org/series/gmail"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "computer-access"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "mouse-and-keyboard"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "files-on-your-phone"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "email-account"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "spotting-scams"
        }
      ]
    },
    {
      "week_number": 2,
      "specialization": null,
      "resource_name": "GCFGlobal LearnFree: Google Drive",
      "resource_url": "https://www.learnfree.org/series/google-drive",
      "resources": [
        {
          "name": "GCFGlobal LearnFree: Google Drive",
          "url": "https://www.learnfree.org/series/google-drive"
        },
        {
          "name": "GCFGlobal LearnFree: Google Slides",
          "url": "https://www.learnfree.org/series/google-slides"
        },
        {
          "name": "GCFGlobal LearnFree: Google Sheets",
          "url": "https://www.learnfree.org/series/google-sheets"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "typing"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "clear-english"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "money-records"
        }
      ]
    },
    {
      "week_number": 3,
      "specialization": null,
      "resource_name": "Meta Blueprint: How to create a Facebook Page",
      "resource_url": "https://www.facebookblueprint.com/student/activity/409145-how-to-create-a-facebook-page",
      "resources": [
        {
          "name": "Meta Blueprint: How to create a Facebook Page",
          "url": "https://www.facebookblueprint.com/student/activity/409145-how-to-create-a-facebook-page"
        },
        {
          "name": "GCFGlobal LearnFree: Internet Safety",
          "url": "https://www.learnfree.org/series/internet-safety"
        },
        {
          "name": "Mailchimp: What is email marketing?",
          "url": "https://mailchimp.com/marketing-glossary/email-marketing/"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "passwords-and-two-step"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "privacy-and-shared-phones"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "searching-well"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "facebook-instagram"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "email-marketing"
        }
      ]
    },
    {
      "week_number": 4,
      "specialization": null,
      "resource_name": "Google Skillshop: Fundamentals of Digital Marketing",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1830706",
      "resources": [
        {
          "name": "Google Skillshop: Fundamentals of Digital Marketing",
          "url": "https://skillshop.exceedlms.com/student/collection/1830706"
        },
        {
          "name": "Google Search Central: SEO Starter Guide",
          "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
        },
        {
          "name": "Google Business Profile Help: Sign up for a Business Profile",
          "url": "https://support.google.com/business/answer/10514137"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "customer-journey"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "channels-overview"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "seo-basics"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "copywriting"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "google-business-profile"
        }
      ]
    },
    {
      "week_number": 5,
      "specialization": null,
      "resource_name": "Meta Blueprint: How to post on a Facebook Page",
      "resource_url": "https://www.facebookblueprint.com/student/activity/409148-how-to-post-on-a-facebook-page",
      "resources": [
        {
          "name": "Meta Blueprint: How to post on a Facebook Page",
          "url": "https://www.facebookblueprint.com/student/activity/409148-how-to-post-on-a-facebook-page"
        },
        {
          "name": "GCFGlobal LearnFree: Canva",
          "url": "https://www.learnfree.org/series/canva"
        },
        {
          "name": "HubSpot Academy: Social Media Marketing",
          "url": "https://academy.hubspot.com/courses/social-media"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "know-your-audience"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "content-calendar"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "graphics-and-photos"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "community-management"
        }
      ]
    },
    {
      "week_number": 6,
      "specialization": null,
      "resource_name": "Google Analytics Help: Analytics Academy courses on Skillshop",
      "resource_url": "https://support.google.com/analytics/answer/15068052",
      "resources": [
        {
          "name": "Google Analytics Help: Analytics Academy courses on Skillshop",
          "url": "https://support.google.com/analytics/answer/15068052"
        },
        {
          "name": "Google Analytics Help: How Google Analytics works",
          "url": "https://support.google.com/analytics/answer/12159447"
        },
        {
          "name": "Google Analytics Help: Overview of reports",
          "url": "https://support.google.com/analytics/answer/9212670"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "measurement"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "analytics"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "social-ads"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "client-reporting"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "google_ads",
      "resource_name": "Google Ads Help: Create a Search campaign",
      "resource_url": "https://support.google.com/google-ads/answer/9510373",
      "resources": [
        {
          "name": "Google Ads Help: Create a Search campaign",
          "url": "https://support.google.com/google-ads/answer/9510373"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "seo",
      "resource_name": "Google Search Central: SEO Starter Guide",
      "resource_url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      "resources": [
        {
          "name": "Google Search Central: SEO Starter Guide",
          "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
        },
        {
          "name": "Google Ads Help: Use Keyword Planner",
          "url": "https://support.google.com/google-ads/answer/7337243"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "social_media",
      "resource_name": "Meta Blueprint: Get started with Ads Manager",
      "resource_url": "https://www.facebookblueprint.com/student/activity/415305-get-started-with-ads-manager",
      "resources": [
        {
          "name": "Meta Blueprint: Get started with Ads Manager",
          "url": "https://www.facebookblueprint.com/student/activity/415305-get-started-with-ads-manager"
        },
        {
          "name": "Meta Blueprint: Your guide to audience targeting",
          "url": "https://www.facebookblueprint.com/student/catalog/list?category_ids=7506-your-guide-to-audience-targeting"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "google_ads",
      "resource_name": "Google Ads Help: About keyword matching options",
      "resource_url": "https://support.google.com/google-ads/answer/7478529",
      "resources": [
        {
          "name": "Google Ads Help: About keyword matching options",
          "url": "https://support.google.com/google-ads/answer/7478529"
        },
        {
          "name": "Google Ads Help: About responsive search ads",
          "url": "https://support.google.com/google-ads/answer/7684791"
        },
        {
          "name": "Google Ads Help: Use Keyword Planner",
          "url": "https://support.google.com/google-ads/answer/7337243"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "seo",
      "resource_name": "Google Business Profile Help: Improve your local ranking",
      "resource_url": "https://support.google.com/business/answer/7091",
      "resources": [
        {
          "name": "Google Business Profile Help: Improve your local ranking",
          "url": "https://support.google.com/business/answer/7091"
        },
        {
          "name": "GCFGlobal LearnFree: SEO Basics for Beginners",
          "url": "https://www.learnfree.org/series/seo-basics-for-beginners"
        },
        {
          "name": "Google Business Profile Help: Get more reviews",
          "url": "https://support.google.com/business/answer/3474122"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "social_media",
      "resource_name": "YouTube Help: Get started creating YouTube Shorts",
      "resource_url": "https://support.google.com/youtube/answer/10059070",
      "resources": [
        {
          "name": "YouTube Help: Get started creating YouTube Shorts",
          "url": "https://support.google.com/youtube/answer/10059070"
        },
        {
          "name": "Meta Blueprint: Creative inspiration",
          "url": "https://www.facebookblueprint.com/student/catalog/list?category_ids=7508-creative-inspiration"
        },
        {
          "name": "GCFGlobal LearnFree: Canva",
          "url": "https://www.learnfree.org/series/canva"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "google_ads",
      "resource_name": "Google Ads Help: Understanding bidding basics",
      "resource_url": "https://support.google.com/google-ads/answer/2459326",
      "resources": [
        {
          "name": "Google Ads Help: Understanding bidding basics",
          "url": "https://support.google.com/google-ads/answer/2459326"
        },
        {
          "name": "Google Ads Help: About optimisation score",
          "url": "https://support.google.com/google-ads/answer/9061546"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "seo",
      "resource_name": "Google Search Central: Creating helpful content",
      "resource_url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      "resources": [
        {
          "name": "Google Search Central: Creating helpful content",
          "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
        },
        {
          "name": "HubSpot Academy: Content Marketing",
          "url": "https://academy.hubspot.com/courses/content-marketing"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "social_media",
      "resource_name": "Meta Blueprint: Messaging tools to build deeper connections with customers",
      "resource_url": "https://www.facebookblueprint.com/student/activity/579392-how-to-use-messaging-tools-to-build-deeper-connections-with-customers",
      "resources": [
        {
          "name": "Meta Blueprint: Messaging tools to build deeper connections with customers",
          "url": "https://www.facebookblueprint.com/student/activity/579392-how-to-use-messaging-tools-to-build-deeper-connections-with-customers"
        },
        {
          "name": "HubSpot Academy: Social Media Marketing",
          "url": "https://academy.hubspot.com/courses/social-media"
        }
      ]
    },
    {
      "week_number": 10,
      "specialization": null,
      "resource_name": "HubSpot Academy: Digital Marketing",
      "resource_url": "https://academy.hubspot.com/courses/digital-marketing",
      "resources": [
        {
          "name": "HubSpot Academy: Digital Marketing",
          "url": "https://academy.hubspot.com/courses/digital-marketing"
        },
        {
          "name": "Mailchimp: Marketing plan template",
          "url": "https://mailchimp.com/resources/marketing-plan-template/"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "campaign-plan"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "channels-overview"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "content-calendar"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "budgets-in-cedis"
        }
      ]
    },
    {
      "week_number": 11,
      "specialization": null,
      "resource_name": "Google Sites Help: How to use Google Sites",
      "resource_url": "https://support.google.com/sites/answer/6372878",
      "resources": [
        {
          "name": "Google Sites Help: How to use Google Sites",
          "url": "https://support.google.com/sites/answer/6372878"
        },
        {
          "name": "GCFGlobal LearnFree: Resume Writing",
          "url": "https://www.learnfree.org/series/resume-writing"
        },
        {
          "name": "GCFGlobal LearnFree: Interviewing Skills",
          "url": "https://www.learnfree.org/series/interviewing-skills"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "portfolio"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "job-applications"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "freelancing"
        }
      ]
    },
    {
      "week_number": 12,
      "specialization": null,
      "resource_name": "GCFGlobal LearnFree: Job Search and Networking",
      "resource_url": "https://www.learnfree.org/series/job-search-and-networking",
      "resources": [
        {
          "name": "GCFGlobal LearnFree: Job Search and Networking",
          "url": "https://www.learnfree.org/series/job-search-and-networking"
        }
      ],
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "campaign-plan"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "client-reporting"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "portfolio"
        }
      ]
    }
  ]
}
$json$;
  v_week jsonb;
  v_week_id uuid;
  v_node jsonb;
  v_position smallint;
begin
  for v_week in select * from jsonb_array_elements(v_doc -> 'weeks') loop
    select w.id into v_week_id
      from public.program_weeks w
      join public.programs p on p.id = w.program_id
     where p.slug = 'dmp'
       and w.week_number = (v_week ->> 'week_number')::smallint
       and w.specialization is not distinct from (v_week ->> 'specialization');
    if v_week_id is null then
      continue;
    end if;

    update public.program_weeks
       set resource_name = v_week ->> 'resource_name',
           resource_url = v_week ->> 'resource_url',
           resources = v_week -> 'resources'
     where id = v_week_id
       and (resource_name, resource_url, resources)
           is distinct from (v_week ->> 'resource_name', v_week ->> 'resource_url', v_week -> 'resources');

    if v_week ? 'roadmap_nodes' then
      delete from public.program_week_nodes n -- allow-destructive: replaces this shared week's links only; links hold no learner data
       where n.program_week_id = v_week_id
         and not exists (
           select 1 from jsonb_array_elements(v_week -> 'roadmap_nodes') l
            where l ->> 'roadmap_slug' = n.roadmap_slug and l ->> 'node_slug' = n.node_slug
         );

      v_position := 0;
      for v_node in select * from jsonb_array_elements(v_week -> 'roadmap_nodes') loop
        insert into public.program_week_nodes (program_week_id, roadmap_slug, node_slug, position)
        values (v_week_id, v_node ->> 'roadmap_slug', v_node ->> 'node_slug', v_position)
        on conflict (program_week_id, roadmap_slug, node_slug) do update
          set position = excluded.position;
        v_position := v_position + 1;
      end loop;
    end if;
  end loop;
end;
$seed$;
