/**
 * Search within one roadmap (issue #244). Pure and client safe: the roadmap
 * page passes a compact list of its topics to the search box, which ranks
 * them here on every keystroke. No index, no network: a roadmap has at most
 * a few dozen topics.
 */

export type SearchItem = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  /** "2.3" */
  number: string;
  sectionTitle: string;
  optional: boolean;
};

export type SearchResult = SearchItem & { score: number };

/** Lowercase, accents removed, punctuation as spaces: "Café, Wa" → "cafe wa". */
export function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, " ")
    .trim();
}

/**
 * Topics matching every word of `query`, best first. A word matches when it
 * starts a word of the title, summary or section title (so "sh" finds
 * "Sharing" but not "Spreadsheets"); a topic number such as "2.3" matches
 * exactly. Ties keep reading order.
 */
export function searchTopics(items: readonly SearchItem[], query: string, limit = 8): SearchResult[] {
  const q = normalise(query);
  if (!q) return [];
  const words = q.split(" ");
  const results: SearchResult[] = [];

  items.forEach((item, order) => {
    const title = normalise(item.title);
    const titleWords = title.split(" ");
    const otherWords = `${normalise(item.summary ?? "")} ${normalise(item.sectionTitle)}`.split(" ");
    let score = 0;
    for (const word of words) {
      if (item.number === word) score += 120;
      else if (titleWords.some((w) => w.startsWith(word))) score += titleWords.includes(word) ? 30 : 20;
      else if (otherWords.some((w) => w.startsWith(word))) score += 5;
      else return;
    }
    if (title.startsWith(q)) score += 50;
    results.push({ ...item, score: score - order / 1000 });
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => ({ ...r, score: Math.round(r.score) }));
}
