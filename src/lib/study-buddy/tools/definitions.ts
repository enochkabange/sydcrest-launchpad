import type Anthropic from "@anthropic-ai/sdk";

/**
 * The companion tools Study Buddy may call. Read only, run on the server for
 * the signed in learner only (they take no user id: the executor already
 * knows who is asking). The list is fixed and in a fixed order, so it stays
 * byte identical and sits in the prompt cache with the system prompt.
 */

export const TOOL_NAMES = ["my_next_steps", "suggest_mentors", "find_opportunities", "upcoming_events"] as const;
export type ToolName = (typeof TOOL_NAMES)[number];

export const OPPORTUNITY_KINDS = ["job", "internship", "scholarship", "grant", "gig"] as const;

const focus = {
  type: "string",
  description:
    "Optional. A skill or topic the learner asked about, in a few words (for example \"Excel\" or \"social media\"). Leave it out to match the learner's own path.",
  maxLength: 60,
} as const;

export const COMPANION_TOOLS: Anthropic.Tool[] = [
  {
    name: "my_next_steps",
    description:
      "The learner's own path and progress: their track and roadmap, how many topics they have finished, the next unfinished topics with links, their verified skills and the chapters they belong to. Use it when they ask what to do next, how they are doing, or before suggesting anything personal.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "suggest_mentors",
    description:
      "Approved SydCrest experts who match the learner's track and skills, best match first, with links to their pages. Counts such as reviews are real and may be zero. Use it when the learner wants a mentor, advice from someone experienced, or a review of their work.",
    input_schema: { type: "object", properties: { focus }, additionalProperties: false },
  },
  {
    name: "find_opportunities",
    description:
      "Open jobs, internships, scholarships, grants and gigs on SydCrest whose deadline has not passed, matching the learner's track first, with links. Use it when the learner asks about work, internships, funding or ways to earn.",
    input_schema: {
      type: "object",
      properties: {
        focus,
        kind: { type: "string", enum: [...OPPORTUNITY_KINDS], description: "Optional. Only this kind of opportunity." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "upcoming_events",
    description:
      "Upcoming SydCrest community events (skillshops, webinars, meetups), events of the learner's own chapters first, then events in their region, then the rest, with links. Use it when the learner asks about events, meetups or meeting other learners.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
];
