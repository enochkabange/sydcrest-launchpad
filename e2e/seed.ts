/**
 * Seeds a small roadmap for the study view spec through the shared service
 * role helpers (e2e/supabase-admin.ts). Test code only.
 */
import { admin, insert } from "./supabase-admin";

export type SeededRoadmap = {
  id: string;
  slug: string;
  title: string;
  quizNode: { slug: string; title: string };
  plainNode: { slug: string; title: string };
};

/**
 * A published roadmap with two topics: the first has content, a resource and
 * a two question quiz (0 based answer key: q1 is option 1, q2 is option 0;
 * pass mark 100), the second has no quiz and is marked done with "Mark as done".
 */
export async function seedRoadmap(): Promise<SeededRoadmap> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const title = `Data Analyst Test ${suffix}`;
  const [roadmap] = await insert<{ slug: string }>("roadmaps", [
    { slug: `e2e-data-${suffix}`, title, description: "Seeded by the end to end tests.", is_published: true },
  ]);

  const [quizNode, plainNode] = await insert<{ slug: string; title: string }>("roadmap_nodes", [
    {
      roadmap_id: roadmap.id,
      slug: "spreadsheet-basics",
      title: "Spreadsheet basics",
      summary: "Rows, columns and your first formulas.",
      position: 1,
    },
    {
      roadmap_id: roadmap.id,
      slug: "cleaning-data",
      title: "Cleaning data",
      summary: "Fix messy records before you analyse them.",
      position: 2,
    },
  ]);

  await insert("node_content", [
    {
      node_id: quizNode.id,
      explanation_md:
        "## Why it matters\n\nMost offices in **Tamale** keep their records in spreadsheets.\n\n- A row runs across the sheet\n- A column runs down it",
      practice_task_md: "Make a sheet of five market prices and add them with `SUM`.",
    },
  ]);
  await insert("node_resources", [
    { node_id: quizNode.id, label: "Spreadsheet practice sheet", url: "https://example.com/practice", kind: "practice" },
  ]);
  const [quiz] = await insert("node_quiz", [
    {
      node_id: quizNode.id,
      pass_threshold: 100,
      questions: [
        { id: "q1", prompt: "Which function adds up a column of numbers?", options: ["COUNT", "SUM", "MAX"] },
        { id: "q2", prompt: "Which way does a row run?", options: ["Across the sheet", "Down the sheet"] },
      ],
    },
  ]);
  await admin("/rest/v1/node_quiz_answers", { method: "POST", body: { quiz_id: quiz.id, answer_key: { q1: 1, q2: 0 } } });

  return {
    id: roadmap.id,
    slug: roadmap.slug,
    title,
    quizNode: { slug: quizNode.slug, title: quizNode.title },
    plainNode: { slug: plainNode.slug, title: plainNode.title },
  };
}

/** Removes a seeded roadmap; nodes, content, quiz and progress cascade. */
export async function deleteRoadmap(id: string) {
  await admin(`/rest/v1/roadmaps?id=eq.${id}`, { method: "DELETE" });
}
