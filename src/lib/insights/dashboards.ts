/**
 * The insights dashboards and their exportable tables (issue #243). Pages,
 * the sub navigation and the CSV route all read this, so a table's export
 * always calls the same report function with the same filters as its page.
 */
import type { Database } from "@/lib/supabase/database.types";
import type { FilterKey } from "./filters";

const PEOPLE: FilterKey[] = ["track", "region", "chapter", "cohort"];
const ALL: FilterKey[] = [...PEOPLE, "device"];

export type DashboardSlug =
  | "overview"
  | "funnel"
  | "retention"
  | "learning"
  | "features"
  | "cohorts"
  | "earn"
  | "community"
  | "reliability";

export type Dashboard = {
  slug: DashboardSlug;
  href: string;
  title: string;
  description: string;
  filters: FilterKey[];
  /** Reads raw events or rollups (shows the data freshness note). */
  events: boolean;
};

export const DASHBOARDS: Dashboard[] = [
  { slug: "overview", href: "/admin/insights", title: "Overview", description: "Daily, weekly and monthly active people, sign ups and trends.", filters: ALL, events: true },
  { slug: "funnel", href: "/admin/insights/funnel", title: "Acquisition and funnel", description: "From first visit to sign up, path, first topic and first pass, by device.", filters: ALL, events: true },
  { slug: "retention", href: "/admin/insights/retention", title: "Retention", description: "Weekly sign up cohorts and how many come back in weeks 1 to 8.", filters: PEOPLE, events: true },
  { slug: "learning", href: "/admin/insights/learning", title: "Learning", description: "Pass rates and drop off per roadmap and topic, hardest questions and reviews.", filters: PEOPLE, events: false },
  { slug: "features", href: "/admin/insights/features", title: "Feature use", description: "Every feature: how many people, how often, and the trend.", filters: ALL, events: true },
  { slug: "cohorts", href: "/admin/insights/cohorts", title: "DMP cohorts", description: "On time submissions, grading turnaround and learners at risk.", filters: PEOPLE, events: false },
  { slug: "earn", href: "/admin/insights/earn", title: "Experts and Earn", description: "Bookings, briefs, pitches, response times and outcomes.", filters: PEOPLE, events: false },
  { slug: "community", href: "/admin/insights/community", title: "Community", description: "Posts, replies, RSVPs, check ins and chapters.", filters: ["region", "chapter"], events: false },
  { slug: "reliability", href: "/admin/insights/reliability", title: "Reliability", description: "Errors by page and action, failure rates and Web Vitals.", filters: ["device"], events: true },
];

export function dashboard(slug: DashboardSlug): Dashboard {
  return DASHBOARDS.find((d) => d.slug === slug)!;
}

type Fns = Database["public"]["Functions"];
export type InsightRpc = Extract<keyof Fns, `admin_insights_${string}`> & Exclude<keyof Fns, "admin_insights_rollups_to">;
export type RowOf<R extends InsightRpc> = Fns[R]["Returns"] extends (infer T)[] ? T : never;

export type TableSpec = {
  dashboard: DashboardSlug;
  rpc: InsightRpc;
  title: string;
  columns: [key: string, header: string][];
};

/** Every table a dashboard offers as CSV, keyed by the `table` search param. */
export const TABLES = {
  daily: {
    dashboard: "overview",
    rpc: "admin_insights_daily",
    title: "Active people by day",
    columns: [["day", "Day"], ["active_people", "Active people"], ["visitors", "Visitors"], ["signups", "Sign ups"], ["topics_completed", "Topics completed"]],
  },
  funnel: {
    dashboard: "funnel",
    rpc: "admin_insights_funnel",
    title: "Funnel by device",
    columns: [["device_class", "Device"], ["visited", "Visited"], ["signed_up", "Signed up"], ["saved_path", "Saved a path"], ["first_topic", "First topic"], ["first_pass", "First pass"]],
  },
  signup_methods: {
    dashboard: "funnel",
    rpc: "admin_insights_signup_methods",
    title: "Sign ups by method",
    columns: [["method", "Method"], ["signups", "Sign ups"]],
  },
  forms: {
    dashboard: "funnel",
    rpc: "admin_insights_forms",
    title: "Form completion",
    columns: [["form", "Form"], ["started", "Started"], ["finished", "Submitted"]],
  },
  retention: {
    dashboard: "retention",
    rpc: "admin_insights_retention",
    title: "Retention by sign up week",
    columns: [["cohort_week", "Sign up week"], ["cohort_size", "People"], ["week_offset", "Week"], ["active", "Active"]],
  },
  retention_cohorts: {
    dashboard: "retention",
    rpc: "admin_insights_retention_cohorts",
    title: "Sign up cohorts",
    columns: [["cohort_week", "Sign up week"], ["cohort_size", "People"]],
  },
  roadmaps: {
    dashboard: "learning",
    rpc: "admin_insights_roadmaps",
    title: "Roadmaps",
    columns: [
      ["roadmap_slug", "Roadmap"], ["roadmap_title", "Title"], ["learners", "Learners"], ["topics_started", "Topics started"],
      ["topics_done", "Topics done"], ["quiz_attempted", "Quizzes attempted"], ["quiz_passed", "Quizzes passed"],
      ["lessons_opened", "Lessons opened"], ["lessons_finished", "Lessons finished"],
    ],
  },
  topics: {
    dashboard: "learning",
    rpc: "admin_insights_topics",
    title: "Topics with stalled learners",
    columns: [["roadmap_slug", "Roadmap"], ["topic_title", "Topic"], ["started", "Started"], ["done", "Done"], ["quiz_attempted", "Quiz attempted"], ["quiz_passed", "Quiz passed"], ["stalled", "Stalled"]],
  },
  questions: {
    dashboard: "learning",
    rpc: "admin_insights_questions",
    title: "Hardest review questions",
    columns: [["roadmap_slug", "Roadmap"], ["topic_title", "Topic"], ["question_id", "Question"], ["prompt", "Prompt"], ["answers", "Answers"], ["correct", "Correct"]],
  },
  reviews: {
    dashboard: "learning",
    rpc: "admin_insights_reviews",
    title: "Reviews by day",
    columns: [["day", "Day"], ["sessions", "Reviews"], ["learners", "Learners"], ["questions", "Questions"], ["correct", "Correct"]],
  },
  features: {
    dashboard: "features",
    rpc: "admin_insights_features",
    title: "Feature use by action",
    columns: [["name", "Action"], ["events", "Times"], ["previous_events", "Times in the previous period"], ["users", "People"], ["active_days", "Days used"]],
  },
  cohorts: {
    dashboard: "cohorts",
    rpc: "admin_insights_cohorts",
    title: "Cohorts",
    columns: [
      ["cohort_name", "Cohort"], ["program_title", "Programme"], ["starts_on", "Starts"], ["status", "Status"], ["learners", "Active learners"],
      ["completed", "Completed"], ["deferred", "Deferred"], ["weeks_due", "Weeks due"], ["on_time", "Sent on time"], ["late", "Sent late"],
      ["missing", "Missing"], ["graded", "Graded in range"], ["grading_hours_median", "Median hours to grade"], ["active_7d", "Active in the last 7 days"],
      ["at_risk", "At risk"],
    ],
  },
  at_risk: {
    dashboard: "cohorts",
    rpc: "admin_insights_at_risk",
    title: "Learners at risk",
    columns: [["cohort_name", "Cohort"], ["learner_name", "Learner"], ["specialization", "Specialisation"], ["missing_weeks", "Missing weeks"], ["late_weeks", "Late weeks"], ["below_pass", "Below pass mark"], ["last_submitted", "Last sent"]],
  },
  earn_daily: {
    dashboard: "earn",
    rpc: "admin_insights_earn_daily",
    title: "Bookings, briefs and pitches by day",
    columns: [["day", "Day"], ["bookings", "Booking requests"], ["briefs", "Briefs posted"], ["pitches", "Pitches sent"]],
  },
  outcomes: {
    dashboard: "earn",
    rpc: "admin_insights_outcomes",
    title: "Outcomes by type",
    columns: [["type", "Type"], ["reported", "Reported"], ["verified", "Verified"], ["rejected", "Rejected"]],
  },
  community_daily: {
    dashboard: "community",
    rpc: "admin_insights_community_daily",
    title: "Community by day",
    columns: [["day", "Day"], ["posts", "Posts"], ["replies", "Replies"], ["rsvps", "RSVPs"], ["checkins", "Check ins"]],
  },
  chapters: {
    dashboard: "community",
    rpc: "admin_insights_chapters",
    title: "Chapters",
    columns: [["chapter_name", "Chapter"], ["region", "Region"], ["status", "Status"], ["members", "Members"], ["new_members", "New members"], ["posts", "Posts"], ["events", "Events"], ["rsvps", "RSVPs"], ["checkins", "Check ins"]],
  },
  error_daily: {
    dashboard: "reliability",
    rpc: "admin_insights_error_daily",
    title: "Errors by day",
    columns: [["day", "Day"], ["page_views", "Page views"], ["server_errors", "Server errors"], ["client_errors", "Browser errors"], ["failed_actions", "Failed actions"]],
  },
  errors: {
    dashboard: "reliability",
    rpc: "admin_insights_errors",
    title: "Errors by page and action",
    columns: [["name", "Kind"], ["subject", "Action or type"], ["route", "Page"], ["occurrences", "Times"], ["days", "Days seen"]],
  },
  failures: {
    dashboard: "reliability",
    rpc: "admin_insights_failures",
    title: "Failure rates by action",
    columns: [["action", "Action"], ["successes", "Succeeded"], ["failures", "Failed"], ["rate_limited", "Rate limited"], ["validation", "Validation"], ["forbidden", "Forbidden"], ["server_error", "Server error"]],
  },
  vitals: {
    dashboard: "reliability",
    rpc: "admin_insights_vitals",
    title: "Web Vitals by page and device",
    columns: [["route", "Page"], ["device_class", "Device"], ["metric", "Metric"], ["samples", "Samples"], ["p75", "p75"], ["good", "Good"], ["needs_improvement", "Needs work"], ["poor", "Poor"]],
  },
} satisfies Record<string, TableSpec>;

export type TableKey = keyof typeof TABLES;

export function isTableKey(value: string | null): value is TableKey {
  return value !== null && Object.hasOwn(TABLES, value);
}
