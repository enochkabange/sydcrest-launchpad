/**
 * Seeds a rated roadmap for the lesson structure spec (issue #255): two
 * sections with career levels and jobs, rated topics, and one lesson with
 * outcomes, headings and every optional anatomy part. Test code only.
 */
import { admin, insert } from "./supabase-admin";

export type SeededRatedRoadmap = {
  id: string;
  slug: string;
  title: string;
  lesson: { slug: string; title: string };
};

const para = (topic: string) =>
  `Hawa keeps the stock list for a provisions shop in Tamale. ${topic} matters because every order, refund and restock depends on numbers she can trust, and a small slip on Monday becomes a big gap by Friday. `.repeat(
    3,
  );

export async function seedRatedRoadmap(): Promise<SeededRatedRoadmap> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const title = `Stock Keeping ${suffix}`;
  const [roadmap] = await insert<{ slug: string }>("roadmaps", [
    { slug: `e2e-stock-${suffix}`, title, description: "Seeded by the lesson structure tests.", is_published: true },
  ]);

  const [basics, work] = await insert<{ slug: string }>("roadmap_nodes", [
    {
      roadmap_id: roadmap.id,
      slug: "stock-basics",
      title: "Stock basics",
      summary: "What a stock list is for.",
      position: 0,
      difficulty: "beginner",
      complexity: 1,
      career_level: "foundation",
      jobs: [],
    },
    {
      roadmap_id: roadmap.id,
      slug: "stock-at-work",
      title: "Stock at work",
      summary: "Keeping stock for an employer.",
      position: 1,
      difficulty: "intermediate",
      complexity: 2,
      career_level: "junior",
      jobs: ["Store Assistant", "Inventory Clerk"],
    },
  ]);

  const [lesson] = await insert<{ slug: string; title: string }>("roadmap_nodes", [
    {
      roadmap_id: roadmap.id,
      parent_id: work.id,
      slug: "counting-stock",
      title: "Counting stock",
      summary: "Count, compare and fix the gaps.",
      position: 0,
      difficulty: "intermediate",
      complexity: 3,
    },
    {
      roadmap_id: roadmap.id,
      parent_id: basics.id,
      slug: "what-stock-is",
      title: "What stock is",
      summary: "Goods you hold to sell.",
      position: 0,
      difficulty: "beginner",
      complexity: 1,
    },
  ]);

  await insert("node_content", [
    {
      node_id: lesson.id,
      explanation_md: [
        `## Why counting matters\n\n${para("Counting")}`,
        `## Count and compare\n\n${para("Comparing")}`,
        `## Fix the gaps\n\n${para("Fixing gaps")}`,
      ].join("\n\n"),
      practice_task_md: "**Goal:** count ten items on a shelf and compare them with your list.",
      outcomes: ["Count stock against a written list", "Find the gap between the count and the list", "Record a fix"],
      worked_example_md: "Issahaku counts 48 tins of milk but his list says 50. He checks the sales book and finds two unrecorded sales.",
      key_terms: [
        { term: "Stock count", definition: "Counting what is really on the shelf." },
        { term: "Variance", definition: "The difference between the count and the list." },
      ],
      common_mistakes: ["Counting from memory instead of the shelf"],
      self_check: ["Can you explain a variance to the shop owner?"],
    },
  ]);
  const [quiz] = await insert("node_quiz", [
    {
      node_id: lesson.id,
      pass_threshold: 100,
      questions: [{ id: "q1", prompt: "What is a variance?", options: ["A count", "A difference"] }],
    },
  ]);
  await admin("/rest/v1/node_quiz_answers", { method: "POST", body: { quiz_id: quiz.id, answer_key: { q1: 1 } } });

  return { id: roadmap.id, slug: roadmap.slug, title, lesson: { slug: lesson.slug, title: lesson.title } };
}

export async function deleteRatedRoadmap(id: string) {
  await admin(`/rest/v1/roadmaps?id=eq.${id}`, { method: "DELETE" });
}
