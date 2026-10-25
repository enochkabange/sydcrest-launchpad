/**
 * Deterministic rules that turn quiz answers into a personalised path.
 * No AI and no randomness: the same answers and the same roadmap always give
 * the same result, so it can be unit tested and explained to the learner.
 */
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import type { RoadmapTrack } from "@/content/roadmaps/types";
import type { Goal, Hours, Interest, PathAnswers } from "./quiz";

export type Track = RoadmapTrack;

/** Question order, which is also the tiebreak order between tracks. */
const INTEREST_TRACK: Record<Exclude<Interest, "unsure">, Track> = {
  web: "frontend",
  apps: "backend",
  data: "data",
  marketing: "digital-marketing",
  design: "ui-ux",
  product: "product",
};

/** Tracks whose early sections work on a phone. The others need a computer for practice. */
const PHONE_FRIENDLY: ReadonlySet<Track> = new Set(["digital-marketing", "ui-ux", "product", "digital-skills-bridge"]);

const GOAL_AFFINITY: Record<Goal, Track[]> = {
  "first-job": ["data", "frontend", "digital-marketing"],
  freelance: ["frontend", "ui-ux", "digital-marketing"],
  switch: ["product", "data", "ui-ux"],
  business: ["digital-marketing", "product"],
  explore: [],
};

export type TrackChoice = { track: Track; reasons: string[] };

export function chooseTrack(a: PathAnswers): TrackChoice {
  if (a.confidence === "low" && a.experience === "none") {
    return {
      track: "digital-skills-bridge",
      reasons: [
        "You told us everyday digital tools are still new to you, so we start with the skills every tech course assumes.",
        "The bridge ends with you ready to apply for the Delta Mentoring Program cohort.",
      ],
    };
  }

  const candidates = a.interests.filter((i) => i !== "unsure").map((i) => INTEREST_TRACK[i]);

  if (candidates.length === 0) {
    const track = fallbackForGoal(a);
    return {
      track,
      reasons: [
        "You are not sure yet, so we picked a track that fits your goal and the device you have.",
        "You can retake the quiz any time once something catches your interest.",
      ],
    };
  }

  if (candidates.length === 1) {
    return { track: candidates[0], reasons: ["It is the area you said interests you most."] };
  }

  // Several interests: goal fit counts double, then phone fit, then question order.
  const score = (t: Track) =>
    (GOAL_AFFINITY[a.goal].includes(t) ? 2 : 0) + (a.device === "phone" && PHONE_FRIENDLY.has(t) ? 1 : 0);
  let best = candidates[0];
  for (const t of candidates) if (score(t) > score(best)) best = t;

  const reasons = ["It is one of the areas you picked."];
  if (GOAL_AFFINITY[a.goal].includes(best)) reasons.push("It fits the goal you chose best.");
  if (a.device === "phone" && PHONE_FRIENDLY.has(best)) reasons.push("You can make real progress on it with just a phone.");
  return { track: best, reasons };
}

function fallbackForGoal(a: PathAnswers): Track {
  switch (a.goal) {
    case "business":
      return "digital-marketing";
    case "freelance":
      return a.device === "own-computer" ? "frontend" : "digital-marketing";
    case "first-job":
    case "switch":
      return a.device === "phone" ? "digital-marketing" : "data";
    case "explore":
      return "digital-marketing";
  }
}

// Roadmap -----------------------------------------------------------------

export type Section = { slug: string; title: string };

/** A published roadmap from the database, reduced to what the path needs. */
export type PublishedRoadmap = { id: string; slug: string; title: string; sections: Section[] };

export function draftFor(track: Track) {
  const draft = ROADMAP_DRAFTS.find((r) => r.track === track);
  if (!draft) throw new Error(`No roadmap draft for track ${track}`);
  return draft;
}

/** Top level sections of the draft outline, used until the roadmap is published. */
function draftSections(track: Track): Section[] {
  return draftFor(track)
    .nodes.filter((n) => n.parent === null)
    .map(({ slug, title }) => ({ slug, title }));
}

/**
 * Where to start in the list of top level sections. Learners who have started
 * or built things skip the opening sections (shown as a quick review). The
 * last section (getting hired) is never the starting point.
 */
export function startingIndex(a: PathAnswers, track: Track, sectionCount: number): number {
  if (track === "digital-skills-bridge" || sectionCount < 2) return 0;
  const wanted = a.experience === "built" ? 2 : a.experience === "tried" ? 1 : 0;
  return Math.min(wanted, sectionCount - 2);
}

// Weekly plan -------------------------------------------------------------

const SESSIONS: Record<Hours, { count: number; minutes: number; label: string }> = {
  "under-3": { count: 3, minutes: 40, label: "about 2 hours a week" },
  "3-6": { count: 4, minutes: 75, label: "about 5 hours a week" },
  "7-12": { count: 5, minutes: 110, label: "about 9 hours a week" },
  "over-12": { count: 6, minutes: 140, label: "about 14 hours a week" },
};

type Focus = "learn" | "practice" | "build" | "review";

const PATTERN: Record<number, Focus[]> = {
  3: ["learn", "practice", "review"],
  4: ["learn", "practice", "learn", "review"],
  5: ["learn", "practice", "learn", "practice", "review"],
  6: ["learn", "practice", "learn", "practice", "build", "review"],
};

export type Session = { title: string; minutes: number; focus: Focus; detail: string };

export type WeeklyPlan = { summary: string; sessions: Session[]; tips: string[] };

export function weeklyPlan(a: PathAnswers, track: Track): WeeklyPlan {
  const { count, minutes, label } = SESSIONS[a.hours];
  const needsComputer = !PHONE_FRIENDLY.has(track);

  const detail: Record<Focus, string> = {
    learn:
      a.data === "tight"
        ? "Read the next topic and its notes. Save videos for when you are on WiFi."
        : "Work through the next topic: read the notes and watch the linked lesson.",
    practice:
      a.device === "phone" && needsComputer
        ? "Do the practice task. Where it needs a computer, write your plan on your phone and finish it at your next computer session."
        : a.device === "shared-computer" && needsComputer
          ? "Use your computer time for this one: do the practice task hands on."
          : "Do the practice task for the topic you just learned.",
    build: "Put the week together in one small piece of your own work you could show someone.",
    review: "Look back over the week, take the topic quiz, and note one question to ask the community.",
  };
  const titles: Record<Focus, string> = { learn: "Learn", practice: "Practise", build: "Build", review: "Review" };

  const sessions = PATTERN[count].map((focus, i) => ({
    title: `Session ${i + 1}: ${titles[focus]}`,
    minutes,
    focus,
    detail: detail[focus],
  }));

  const tips: string[] = [];
  if (a.data === "tight") {
    tips.push("Download lessons on WiFi and study offline. Turn off video autoplay on mobile data.");
  } else if (a.data === "okay") {
    tips.push("Choose the text version of a lesson when there is one and keep videos for WiFi.");
  }
  if (a.device === "phone" && needsComputer) {
    tips.push(
      "This track needs a computer for hands on work later. Start on your phone now and look for a computer you can use at a school, library or community centre.",
    );
  } else if (a.device === "shared-computer") {
    tips.push("Keep your computer time for practice and do the reading on your phone.");
  }
  if (a.hours === "under-3") {
    tips.push("Short, regular sessions beat one long one. Pick the same times each week.");
  }

  return { summary: `${count} sessions of ${minutes} minutes, ${label}.`, sessions, tips };
}

// The full result ---------------------------------------------------------

export type GapStatus = "review" | "start" | "learn";

export type PathResult = {
  track: Track;
  trackTitle: string;
  reasons: string[];
  /** null until the track's roadmap is published. */
  roadmap: { id: string; slug: string; title: string } | null;
  start: { title: string; href: string | null };
  skillGap: { slug: string; title: string; status: GapStatus }[];
  plan: WeeklyPlan;
  nextAction: { label: string; detail: string; href: string | null };
};

export function buildPath(a: PathAnswers, published: PublishedRoadmap | null): PathResult {
  const { track, reasons } = chooseTrack(a);
  const draft = draftFor(track);
  const sections = published?.sections.length ? published.sections : draftSections(track);
  const index = startingIndex(a, track, sections.length);
  const start = sections[index];

  const roadmap = published ? { id: published.id, slug: published.slug, title: published.title } : null;
  const startHref = published && start ? `/roadmaps/${published.slug}/${start.slug}` : null;
  const plan = weeklyPlan(a, track);

  let nextAction: PathResult["nextAction"];
  if (startHref && start) {
    nextAction = {
      label: `Open ${start.title}`,
      detail: `Begin your first ${plan.sessions[0].minutes} minute session with this topic.`,
      href: startHref,
    };
  } else if (track === "digital-skills-bridge") {
    nextAction = {
      label: "See the Delta Mentoring Program",
      detail: "The bridge leads into this free cohort. The bridge roadmap opens here soon.",
      href: "/programme",
    };
  } else {
    nextAction = {
      label: "Book your first session",
      detail: `Put your first ${plan.sessions[0].minutes} minute session in your calendar this week. The ${draft.title} roadmap opens here soon and your starting point will be ready.`,
      href: null,
    };
  }

  return {
    track,
    trackTitle: published?.title ?? draft.title,
    reasons,
    roadmap,
    start: { title: start?.title ?? draft.title, href: startHref },
    skillGap: sections.map((s, i) => ({
      slug: s.slug,
      title: s.title,
      status: i < index ? "review" : i === index ? "start" : "learn",
    })),
    plan,
    nextAction,
  };
}
