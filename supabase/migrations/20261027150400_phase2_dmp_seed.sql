-- Phase 2, part 5: the Delta Mentoring Program and its weeks (data).
--
-- Production needs the DMP too, so it is seeded by a migration, not
-- seed.sql. Every statement is an upsert keyed on natural keys (programme
-- slug, week number plus specialization, week plus roadmap and node slug), so
-- running it again changes nothing. Nothing is deleted.
--
-- The JSON literal in v_doc is derived from
-- src/content/dmp/curriculum.ts (weeks 1 to 6 and 10 to 12 shared, weeks 7 to
-- 9 once per specialization) plus each week's roadmap topic links in the
-- Digital Skills Bridge and Digital Marketer roadmaps. src/content/dmp/
-- seed.test.ts fails if it drifts from curriculum.ts or links a topic that
-- the roadmap outlines do not have. Themes are verbatim, so some carry em
-- dashes: render them through displayTheme (no dashes in user copy).
--
-- Programme rules, screening questions and the two rubrics below are
-- SydCrest's own defaults; admins change them as data.

do $seed$
declare
  v_doc jsonb := $json$
{
  "program": {
    "slug": "dmp",
    "title": "Delta Mentoring Program",
    "specializations": [
      {
        "slug": "seo",
        "label": "SEO & Content Marketing"
      },
      {
        "slug": "social_media",
        "label": "Social Media Marketing"
      },
      {
        "slug": "google_ads",
        "label": "Google Ads (SEM)"
      }
    ]
  },
  "weeks": [
    {
      "week_number": 1,
      "specialization": null,
      "theme": "Computer & Internet Basics",
      "objectives": [
        "Use basic computer hardware and manage files and folders",
        "Navigate the internet safely and recognize phishing attempts",
        "Set up and use a Gmail account to send and receive email with attachments"
      ],
      "resource_name": "GCFGlobal: Digital Skills Tutorials",
      "resource_url": "https://edu.gcfglobal.org/en/topics/digitalskills/",
      "assignment": "Write a 1-paragraph \"tip sheet\" summarizing safe internet practices in Google Docs and submit it.",
      "is_capstone": false,
      "roadmap_nodes": [
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
          "node_slug": "passwords-and-two-step"
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
      "theme": "Cloud Collaboration & Productivity Tools",
      "objectives": [
        "Create, upload, and organize files in Google Drive",
        "Format and share documents in Google Docs",
        "Build a short presentation in Google Slides",
        "Enter data and use simple formulas in Google Sheets"
      ],
      "resource_name": "GCFGlobal: Google Drive & Docs Tutorials",
      "resource_url": "https://edu.gcfglobal.org/en/topics/digitalskills/",
      "assignment": "Finalize a 3-slide presentation about yourself or a mock business, export it as a PDF, and submit it.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "files-on-your-phone"
        },
        {
          "roadmap_slug": "digital-skills-bridge",
          "node_slug": "typing"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "content-calendar"
        }
      ]
    },
    {
      "week_number": 3,
      "specialization": null,
      "theme": "Online Communication & Digital Citizenship",
      "objectives": [
        "Create a Facebook Page or Group for a mock project",
        "Write clear, engaging content for online posts",
        "Recognize phishing attempts and apply cyber-safety basics (strong passwords, privacy settings)",
        "Evaluate online sources for credibility"
      ],
      "resource_name": "Meta Blueprint",
      "resource_url": "https://www.facebook.com/business/learn",
      "assignment": "Compose an email newsletter draft for a mock organization's weekly update and explain your content choices.",
      "is_capstone": false,
      "roadmap_nodes": [
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
          "node_slug": "copywriting"
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
      "theme": "Introduction to Digital Marketing Concepts",
      "objectives": [
        "Understand the core digital marketing channels: SEO, social, email, ads",
        "Learn how search engines work and why a website matters",
        "Write basic web content using keyword principles",
        "Create a Google My Business profile for a sample shop"
      ],
      "resource_name": "Google Skillshop: Fundamentals of Digital Marketing",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing",
      "assignment": "Draft a basic homepage layout for a small business using Google Slides (image and text placeholders).",
      "is_capstone": false,
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
          "node_slug": "google-business-profile"
        }
      ]
    },
    {
      "week_number": 5,
      "specialization": null,
      "theme": "Social Media Marketing — Strategy & Content",
      "objectives": [
        "Choose the right social platforms for a business",
        "Plan a two-week content calendar",
        "Design a promotional social graphic using a free tool",
        "Practice responding to customer comments and questions"
      ],
      "resource_name": "Meta Blueprint: Increase Sales",
      "resource_url": "https://www.facebook.com/business/learn",
      "assignment": "Prepare a 3-slide social media campaign proposal (strategy plus two example posts) for a mock business.",
      "is_capstone": false,
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
      "theme": "Analytics and Data in Marketing",
      "objectives": [
        "Understand core web analytics metrics (visitors, engagement)",
        "Navigate a Google Analytics report",
        "Interpret basic social media analytics",
        "Understand A/B testing basics for ads and posts"
      ],
      "resource_name": "Google Analytics Academy",
      "resource_url": "https://analytics.google.com/analytics/academy/",
      "assignment": "Submit a one-page \"Analytics Report\" summarizing a mock business's key metrics and proposed next steps.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "analytics"
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
      "theme": "Google Ads Fundamentals",
      "objectives": [
        "Complete the Google Skillshop Search Ads readiness unit"
      ],
      "resource_name": "Google Skillshop: Get Search Ad Campaign Ready",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing",
      "assignment": "Complete Google Skillshop's \"Get Search Ad Campaign Ready\" module.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "search-ads"
        }
      ]
    },
    {
      "week_number": 7,
      "specialization": "seo",
      "theme": "SEO Basics — Keyword Research & On-Page SEO",
      "objectives": [
        "Conduct keyword research for a business",
        "Apply on-page SEO techniques to existing content"
      ],
      "resource_name": "Google Skillshop: Search",
      "resource_url": "https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing",
      "assignment": "Optimize the mock business's homepage and blog post from Week 4 using keyword research.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "week_number": 7,
      "specialization": "social_media",
      "theme": "Advanced Ad Targeting",
      "objectives": [
        "Set up a mock ad campaign with a defined audience and budget"
      ],
      "resource_name": "Meta Blueprint",
      "resource_url": "https://www.facebook.com/business/learn",
      "assignment": "Set up a mock Facebook/Instagram ad campaign using Meta Blueprint modules (audience, budget defined).",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "specialization": "google_ads",
      "theme": "Campaign Setup — Keywords & Ad Copy",
      "objectives": [
        "Choose keywords and write ad copy for a search campaign"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Build a sample search campaign for a mock business with 3 ad copies.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "week_number": 8,
      "specialization": "seo",
      "theme": "Off-Page SEO — Backlinks & Local SEO",
      "objectives": [
        "Understand backlinks and local SEO fundamentals",
        "Identify local listing opportunities"
      ],
      "resource_name": "GCFGlobal: SEO Basics",
      "resource_url": "https://edu.gcfglobal.org/en/topics/digitalskills/",
      "assignment": "Identify 3 local directories or blogs where the business could be listed and draft outreach emails.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "week_number": 8,
      "specialization": "social_media",
      "theme": "Content Creation Mastery — Video & Storytelling",
      "objectives": [
        "Create short-form video content and storytelling for social platforms"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Create a 30-second promo video (smartphone or Canva) for a small business.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "specialization": "google_ads",
      "theme": "Optimization and Budgeting",
      "objectives": [
        "Analyze mock campaign data and suggest bid adjustments"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Create a Google Ads account, set up a demo campaign, and submit screenshots of the settings.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "budgets-in-cedis"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "analytics"
        }
      ]
    },
    {
      "week_number": 9,
      "specialization": "seo",
      "theme": "Advanced Content Strategy",
      "objectives": [
        "Build a content calendar covering blogs, FAQs, and multimedia"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Present a 1-page SEO strategy plan in Google Slides.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "week_number": 9,
      "specialization": "social_media",
      "theme": "Community Building & Influencer Outreach",
      "objectives": [
        "Identify and pitch micro-influencers for collaboration"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Identify 2 local micro-influencers and draft collaboration proposals.",
      "is_capstone": false,
      "roadmap_nodes": [
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
      "week_number": 10,
      "specialization": null,
      "theme": "Integrative Marketing Campaign",
      "objectives": [
        "Collaborate on a unified, cross-channel marketing campaign",
        "Define campaign objectives, channels, and timeline"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Present a unified marketing campaign plan and complete the Final Quiz covering digital literacy and marketing fundamentals.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "campaign-plan"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "channels-overview"
        }
      ]
    },
    {
      "week_number": 11,
      "specialization": null,
      "theme": "Portfolio Development & Practice",
      "objectives": [
        "Build an online portfolio using Google Sites",
        "Practice presenting your portfolio",
        "Complete the final specialization quiz"
      ],
      "resource_name": "Google Sites",
      "resource_url": "https://sites.google.com/",
      "assignment": "Draft a portfolio with at least 3 pieces of work and get mentor feedback on readiness.",
      "is_capstone": false,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "portfolio"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "job-applications"
        }
      ]
    },
    {
      "week_number": 12,
      "specialization": null,
      "theme": "Final Assessment and Graduation",
      "objectives": [
        "Finalize a capstone project based on your specialization",
        "Complete the comprehensive final quiz",
        "Peer-review a classmate's capstone using a rubric"
      ],
      "resource_name": null,
      "resource_url": null,
      "assignment": "Submit all capstone artifacts and complete the comprehensive 20-question final quiz for certification.",
      "is_capstone": true,
      "roadmap_nodes": [
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "portfolio"
        },
        {
          "roadmap_slug": "digital-marketer",
          "node_slug": "client-reporting"
        }
      ]
    }
  ]
}
$json$;
  v_program_id uuid;
  v_week jsonb;
  v_week_id uuid;
  v_node jsonb;
  v_position smallint;
begin
  insert into public.programs (
    slug, title, summary, duration_weeks, min_age, eligibility, default_cohort_size,
    grace_days, pass_score, min_peer_reviews, certification_summary,
    specializations, screening_questions, is_published
  )
  values (
    v_doc -> 'program' ->> 'slug',
    v_doc -> 'program' ->> 'title',
    'A twelve week mentored cohort in digital skills and digital marketing for beginners. Six shared weeks build the foundation, three weeks go deep on SEO, social media or Google Ads, and the last three bring it together in a campaign, a portfolio and a capstone.',
    12,
    18,
    'Open to adults aged 18 and over. You need regular access to a phone or computer with internet, and a few hours each week.',
    20,
    7,
    60,
    1,
    'Pass every week''s assignment, including the capstone for your specialization, and review at least one classmate''s capstone. Your mentor then makes the final review and issues the certificate.',
    v_doc -> 'program' -> 'specializations',
    $q$[
      {"id": "motivation", "prompt": "Why do you want to join the Delta Mentoring Program?", "kind": "text", "required": true},
      {"id": "device", "prompt": "How do you usually get online?", "kind": "choice", "options": ["Phone only", "Phone and a shared computer", "My own computer"], "required": true},
      {"id": "hours", "prompt": "How many hours a week can you give to the programme?", "kind": "choice", "options": ["Under 5", "5 to 10", "More than 10"], "required": true}
    ]$q$::jsonb,
    true
  )
  on conflict (slug) do update
    set title = excluded.title,
        specializations = excluded.specializations
  returning id into v_program_id;

  for v_week in select * from jsonb_array_elements(v_doc -> 'weeks') loop
    insert into public.program_weeks (
      program_id, week_number, specialization, theme, objectives,
      resource_name, resource_url, assignment, is_capstone
    )
    values (
      v_program_id,
      (v_week ->> 'week_number')::smallint,
      v_week ->> 'specialization',
      v_week ->> 'theme',
      array(select jsonb_array_elements_text(v_week -> 'objectives')),
      v_week ->> 'resource_name',
      v_week ->> 'resource_url',
      v_week ->> 'assignment',
      (v_week ->> 'is_capstone')::boolean
    )
    on conflict on constraint program_weeks_once do update
      set theme = excluded.theme,
          objectives = excluded.objectives,
          resource_name = excluded.resource_name,
          resource_url = excluded.resource_url,
          assignment = excluded.assignment,
          is_capstone = excluded.is_capstone
    returning id into v_week_id;

    v_position := 0;
    for v_node in select * from jsonb_array_elements(v_week -> 'roadmap_nodes') loop
      insert into public.program_week_nodes (program_week_id, roadmap_slug, node_slug, position)
      values (v_week_id, v_node ->> 'roadmap_slug', v_node ->> 'node_slug', v_position)
      on conflict (program_week_id, roadmap_slug, node_slug) do update
        set position = excluded.position;
      v_position := v_position + 1;
    end loop;
  end loop;

  -- Programme default rubric, used for every week without its own.
  insert into public.rubrics (program_id, program_week_id, title, criteria)
  values (
    v_program_id, null, 'Weekly assignment',
    $r$[
      {"id": "objectives", "label": "Meets the week's objectives", "description": "The work shows the skills listed in this week's objectives.", "max_points": 4},
      {"id": "assignment", "label": "Completes the brief", "description": "Every part of the assignment is done as asked.", "max_points": 4},
      {"id": "clarity", "label": "Clear and well presented", "description": "Easy to read or view, well organised and free of avoidable mistakes.", "max_points": 4},
      {"id": "practical", "label": "Practical for a real business", "description": "Choices suit a real or realistic local business and its customers.", "max_points": 4}
    ]$r$::jsonb
  )
  on conflict on constraint rubrics_once do nothing;

  -- Capstone rubric (week 12), also used for capstone peer review.
  insert into public.rubrics (program_id, program_week_id, title, criteria)
  select v_program_id, w.id, 'Capstone',
    $r$[
      {"id": "strategy", "label": "Sound strategy", "description": "Goals, audience and channels fit together and suit the business.", "max_points": 5},
      {"id": "execution", "label": "Quality of the work", "description": "The capstone pieces are complete and good enough for a client to use.", "max_points": 5},
      {"id": "measurement", "label": "Measuring results", "description": "Says how success will be measured, with realistic numbers to watch.", "max_points": 5},
      {"id": "presentation", "label": "Clear presentation", "description": "A client or employer could follow the work and the reasons behind it.", "max_points": 5}
    ]$r$::jsonb
  from public.program_weeks w
  where w.program_id = v_program_id and w.is_capstone and w.specialization is null
  on conflict on constraint rubrics_once do nothing;
end;
$seed$;
