/**
 * Seeds roadmap content through the LOCAL Supabase REST API with the secret
 * (service role) key, which the E2E job exports from `supabase status`. Test
 * code only: the secret key never goes near the app bundle.
 */
const API = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";

function secretKey() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set. Export it from `supabase status -o json` (.SECRET_KEY).");
  return key;
}

async function rest<T>(method: string, path: string, body?: unknown): Promise<T> {
  const key = secretKey();
  const res = await fetch(`${API}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status} ${await res.text()}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

const insert = async <T>(table: string, rows: unknown) => rest<T[]>("POST", table, rows);

export type SeededRoadmap = {
  id: string;
  slug: string;
  title: string;
  quizNode: { slug: string; title: string };
  plainNode: { slug: string; title: string };
};

/**
 * A published roadmap with two topics: the first has content, a resource and
 * a two question quiz (answers: q1 is option 1, q2 is option 0; pass mark
 * 100), the second has no quiz and is completed with "Mark complete".
 */
export async function seedRoadmap(): Promise<SeededRoadmap> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const title = `Data Analyst Test ${suffix}`;
  const [roadmap] = await insert<{ id: string; slug: string }>("roadmaps", {
    slug: `e2e-data-${suffix}`,
    title,
    description: "Seeded by the end to end tests.",
    is_published: true,
  });

  const [quizNode, plainNode] = await insert<{ id: string; slug: string; title: string }>("roadmap_nodes", [
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

  await insert("node_content", {
    node_id: quizNode.id,
    explanation_md:
      "## Why it matters\n\nMost offices in **Tamale** keep their records in spreadsheets.\n\n- A row runs across the sheet\n- A column runs down it",
    practice_task_md: "Make a sheet of five market prices and add them with `SUM`.",
  });
  await insert("node_resources", {
    node_id: quizNode.id,
    label: "Spreadsheet practice sheet",
    url: "https://example.com/practice",
    kind: "practice",
  });
  const [quiz] = await insert<{ id: string }>("node_quiz", {
    node_id: quizNode.id,
    pass_threshold: 100,
    questions: [
      { id: "q1", prompt: "Which function adds up a column of numbers?", options: ["COUNT", "SUM", "MAX"] },
      { id: "q2", prompt: "Which way does a row run?", options: ["Across the sheet", "Down the sheet"] },
    ],
  });
  await insert("node_quiz_answers", { quiz_id: quiz.id, answer_key: { q1: 1, q2: 0 } });

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
  await rest("DELETE", `roadmaps?id=eq.${id}`);
}
