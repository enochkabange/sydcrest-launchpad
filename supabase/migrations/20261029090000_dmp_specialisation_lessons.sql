-- DMP specialisation weeks 7 to 9 link SydCrest's own lessons (issue #198).
--
-- The companion roadmap digital-marketing-specialisations (PR #203) teaches
-- each specialisation week. This migration sets the roadmap links of every
-- week 7, 8 and 9 row to src/content/dmp/week-lessons.ts (weekNodeLinks):
-- the week's lessons first, then the Digital Marketer refreshers the seed
-- already linked. Links outside that list are removed for those weeks only;
-- program_week_nodes holds links, not learner data. Idempotent.
--
-- A link whose roadmap is not yet imported or published is simply not shown
-- (see the program_week_nodes comment), so this is safe to apply before the
-- specialisations roadmap is published.
--
-- src/content/dmp/seed.test.ts applies this JSON over the seed's and checks
-- every link points at a real topic.

do $seed$
declare
  v_doc jsonb := $json$
{
  "weeks": [
    {
      "week_number": 7,
      "specialization": "seo",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "seo-content"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "keyword-research"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "search-intent"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "on-page-seo"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "seo-basics"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "copywriting"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "seo",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "backlinks"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "local-seo"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "listings-and-outreach"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "google-business-profile"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "seo-basics"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "seo",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "content-pillars"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "faqs-and-multimedia"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "seo-strategy-plan"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "content-calendar"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "copywriting"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "social_media",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "social-media-marketing"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "social-campaign-structure"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "audience-targeting"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "social-budgets-and-testing"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "social-ads"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "budgets-in-cedis"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "social_media",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "social-storytelling"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "video-scripting-and-shooting"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "video-editing-and-captions"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "short-video"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "graphics-and-photos"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "social_media",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "community-building"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "micro-influencers"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "influencer-collaborations"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "community-management"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "know-your-audience"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "google_ads",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "google-ads"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "google-ads-auction"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "campaign-types-and-goals"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "account-structure"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "search-ads"
        }
      ]
    },
    {
      "week_number": 8,
      "specialization": "google_ads",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "keywords-and-match-types"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "responsive-search-ads"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "assets-and-landing-pages"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "search-ads"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "copywriting"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "google_ads",
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "budgets-and-bidding"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "reading-campaign-data"
        },
        {
          "roadmap_slug": "digital-marketing-specialisations",
          "node_slug": "optimising-campaigns"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "budgets-in-cedis"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "analytics"
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

    delete from public.program_week_nodes n
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
  end loop;
end;
$seed$;
