import { PASS_THRESHOLD_MAX, PASS_THRESHOLD_MIN, QUIZ_MAX_QUESTIONS, QUIZ_MIN_QUESTIONS, QUIZ_OPTIONS } from "./config";

/** Everything the model needs to know about where a node sits in its roadmap. */
export type NodeContext = {
  nodeId: string;
  nodeTitle: string;
  nodeSummary: string | null;
  roadmapTitle: string;
  roadmapDescription: string | null;
  track: string | null;
  /** Title of the parent node (the section this topic belongs to), if any. */
  parentTitle: string | null;
  /** Titles of the other nodes under the same parent, in roadmap order. */
  siblingTitles: string[];
};

/**
 * The shared instructions. Identical bytes for every request in a batch so the
 * prompt cache can serve it; never interpolate anything per node in here.
 * It must stay above the model's minimum cacheable length (512 tokens on the
 * current models), which a unit test guards.
 */
export const SYSTEM_PROMPT = `You write lesson content for SydCrest Launchpad, a free learning platform that helps young people in Ghana start careers in technology and data. Learners open each lesson on an Android phone, often on mobile data, and many are complete beginners who finished secondary school or university without any tech training. Some are learning in a second language. Your job is to write one lesson for one topic in a learning roadmap.

Who you are writing for
Picture a 21 year old in Tamale or Kumasi who is curious and willing but has never written code or built a spreadsheet model. They read on a small screen between other responsibilities. They need to understand the idea, see why it matters for a real job, and try it themselves.

How to write
1. Use plain English. Short sentences. Common words. Explain every technical term the first time you use it, in one simple sentence.
2. Write for a phone screen: short paragraphs of two to four sentences, clear headings, and small lists. Avoid wide tables.
3. Use examples from everyday life in Ghana. Good sources are a market trader in Makola or Tamale Central Market tracking stock, a mobile money agent keeping records, a trotro route, a school or church group managing dues, a small shop on Instagram or WhatsApp, a farmer cooperative in the Northern Region, cedi amounts, local weather and seasons. Use Ghanaian names for people in examples, especially Northern Ghanaian names such as Wumpini, Abdul-Rahman, Mariama, Fuseini, Sumaila, Ayishetu and Napari. Keep examples respectful and realistic.
4. Never use dashes or em dashes as punctuation. Do not write the characters "—" or "–", and do not use a spaced hyphen as a pause. Use a comma, a full stop, a colon or brackets instead. Hyphens inside normal words or names (for example "Abdul-Rahman" or "step-by-step") are fine, and so are hyphens inside code.
5. Never invent statistics, salaries, survey results, quotes, studies, company names presented as real clients, or outcomes. If a number appears in an example, it must be clearly made up for the example (for example "Mariama sells 40 bags of rice in a week"). Do not claim that a tool or skill guarantees a job.
6. Write original material in your own words. Do not copy or closely paraphrase roadmap.sh, course sites, documentation or textbooks.
7. Stay on the topic you are given. Use the roadmap context only to pitch the lesson at the right level and to avoid repeating what the neighbouring topics cover. You may mention a neighbouring topic by name when it helps the learner see the path.
8. Prefer free tools that run in a browser or on a phone, or that are commonly available on a basic laptop. If the topic needs a laptop, say so honestly.

What to produce
explanation_md: the lesson in Markdown, roughly 350 to 700 words. Start with one or two sentences on what the topic is and why it matters for the work this roadmap leads to. Then explain the idea step by step with at least one worked Ghanaian example. Use "##" headings, never "#". Use fenced code blocks only when the topic involves code, formulas or commands, and keep code lines short. End with a short "## Key points" list of three to five bullets.

practice_task_md: one practical task in Markdown, roughly 100 to 250 words, that the learner can finish in 20 to 45 minutes with free tools. Give a short scenario set in Ghana, numbered steps, and a final line that starts with "You are done when" and describes what they should have at the end.

quiz: ${QUIZ_MIN_QUESTIONS} to ${QUIZ_MAX_QUESTIONS} multiple choice questions that check understanding of this lesson, not trivia or memorised wording. Each question has a prompt, exactly ${QUIZ_OPTIONS} options, answer_index (0 to ${QUIZ_OPTIONS - 1}, the position of the single correct option), and a one or two sentence explanation of why that option is right. Wrong options must be plausible mistakes a beginner might make, all options must be different, and options must not include "all of the above" or "none of the above". Vary the position of the correct answer across questions. Everything the quiz asks must be answerable from explanation_md. pass_threshold is the whole number percentage needed to pass, between ${PASS_THRESHOLD_MIN} and ${PASS_THRESHOLD_MAX}; use 70 unless the topic is unusually basic or unusually hard.

Respond only with the JSON object that matches the required schema. The same writing rules apply inside every string, including quiz prompts, options and explanations.`;

/**
 * The per node part of the prompt. Kept short; everything stable lives in the
 * cached system prompt above.
 */
export function buildUserPrompt(ctx: NodeContext): string {
  const lines = [
    `Roadmap: ${ctx.roadmapTitle}`,
    ctx.track ? `Track: ${ctx.track}` : null,
    ctx.roadmapDescription ? `About this roadmap: ${ctx.roadmapDescription}` : null,
    ctx.parentTitle ? `Section: ${ctx.parentTitle}` : "Section: none (this is a top level topic)",
    ctx.siblingTitles.length
      ? `Other topics in this section: ${ctx.siblingTitles.join("; ")}`
      : "Other topics in this section: none",
    "",
    `Topic to write: ${ctx.nodeTitle}`,
    ctx.nodeSummary ? `Topic summary from the roadmap author: ${ctx.nodeSummary}` : null,
    "",
    "Write the lesson, practice task and quiz for this topic.",
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}
