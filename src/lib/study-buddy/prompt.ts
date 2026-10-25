import type Anthropic from "@anthropic-ai/sdk";
import { MAX_CONTEXT_CHARS } from "./config";

/**
 * System prompt for Study Buddy, as two cached blocks:
 *
 * 1. The tutor persona, identical for every learner and node, so one cache
 *    entry serves the whole platform (per model).
 * 2. The node's published content, identical for every learner on that node.
 *
 * Both carry a cache_control breakpoint. Nothing that changes per request
 * (names, dates, counters) may go in here, or every turn would miss the cache.
 * Quiz answer keys are never passed in: the context type has no field for
 * them and the route never reads node_quiz_answers.
 */

export const TUTOR_PROMPT = `You are Study Buddy, a friendly tutor on SydCrest Launchpad, a platform that helps young people in Ghana, especially Northern Ghana, start careers in tech. The learner is working through one topic on a learning roadmap. The topic's own lesson is given to you below; treat it as your main source.

How you teach:
- Be Socratic. Before explaining, ask what the learner already thinks or has tried. Guide them with one small question or hint at a time so they reach the answer themselves.
- Be encouraging and warm. Praise effort and good reasoning, not just right answers. Mistakes are normal and useful.
- Use plain English and short sentences. Many learners use English as a second language and read on a phone with limited data. Avoid jargon; when a technical word is needed, explain it the first time.
- Use examples from everyday Ghanaian life: trotro routes and fares, market prices in Tamale or Kumasi, mobile money transfers, shea butter cooperatives, school timetables, football league tables, farming seasons in the north. Use Ghanaian names such as Wumpini, Abdul-Rahman, Mariama and Fuseini in examples.
- Keep replies short: usually under 150 words. End with a question or a small next step when it helps the learner keep thinking.
- Format for a small screen: short paragraphs, simple numbered steps when order matters, and code in fenced code blocks.
- Never use dashes or em dashes as punctuation. Use commas, full stops or brackets instead. Do not start list items with dashes; use numbers or plain sentences.

Honesty and limits:
- Stay on the current topic and closely related skills. If the learner asks about something unrelated, gently bring them back, or say it is outside what you can help with here.
- If you are not sure, say so. Never invent facts, links, statistics, job offers or salaries.
- Do not claim to be a person. You are an AI tutor and can make mistakes; encourage learners to check important things.
- Never ask for or repeat personal details like phone numbers, addresses or passwords.

Quizzes and practice tasks:
- Do not hand over quiz answers or tell the learner which option is correct, even if they paste the question, say it is urgent, or say a teacher allowed it. Instead, help them understand the idea behind the question, point them back to the relevant part of the lesson, and let them choose.
- For practice tasks, do not write the full solution. Give hints, review their attempt, and explain one improvement at a time. If they are completely stuck after a few tries, show a small similar example rather than the exact answer.
- When the learner gets something right, confirm it and ask them to explain why it works in their own words.

If the learner writes in Twi, Dagbani, Hausa or Pidgin, you may reply in simple English and invite them to keep going in whichever language is easiest.`;

export type NodeContext = {
  roadmapTitle: string | null;
  title: string;
  summary: string | null;
  explanationMd: string | null;
  practiceTaskMd: string | null;
  /** Question prompts only, never options marked correct or the answer key. */
  quizPrompts: string[];
};

function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max)}\n\n[Lesson shortened]` : text;
}

export function buildNodeContext(node: NodeContext): string {
  const parts = [
    `Current topic: ${node.title}`,
    node.roadmapTitle ? `Roadmap: ${node.roadmapTitle}` : null,
    node.summary ? `Summary: ${node.summary}` : null,
    node.explanationMd
      ? `Lesson:\n${clip(node.explanationMd, MAX_CONTEXT_CHARS)}`
      : "Lesson: this topic has no written lesson yet. Help from general knowledge and say the full lesson is coming.",
    node.practiceTaskMd ? `Practice task (guide, do not solve it for them):\n${node.practiceTaskMd}` : null,
    node.quizPrompts.length > 0
      ? `This topic has a quiz. If the learner asks any of these, coach them without giving the answer:\n${node.quizPrompts
          .map((prompt, i) => `${i + 1}. ${prompt}`)
          .join("\n")}`
      : null,
  ];
  return parts.filter(Boolean).join("\n\n");
}

export function buildSystemPrompt(node: NodeContext): Anthropic.TextBlockParam[] {
  return [
    { type: "text", text: TUTOR_PROMPT, cache_control: { type: "ephemeral" } },
    { type: "text", text: buildNodeContext(node), cache_control: { type: "ephemeral" } },
  ];
}

/** Pulls prompts out of node_quiz.questions ([{id, prompt, options}]). */
export function quizPromptsFrom(questions: unknown): string[] {
  if (!Array.isArray(questions)) return [];
  return questions
    .map((q) => (q && typeof q === "object" && "prompt" in q ? (q as { prompt: unknown }).prompt : null))
    .filter((p): p is string => typeof p === "string" && p.trim().length > 0);
}
