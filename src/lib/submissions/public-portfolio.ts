import "server-only";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Graded work a learner put in their portfolio, for their public profile.
 * Read with the anon client through the public_portfolio view, so a signed in
 * viewer never sees more than a stranger. The view carries no scores,
 * feedback or file paths; files stay in the private bucket.
 */
export type PortfolioItem = {
  submission_id: string;
  program_title: string;
  week_number: number;
  theme: string;
  is_capstone: boolean;
  link_url: string | null;
  body_excerpt: string | null;
  body_is_excerpt: boolean;
  has_file: boolean;
  graded_at: string;
};

export async function getPublicPortfolio(profileId: string): Promise<PortfolioItem[]> {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("public_portfolio")
    .select("submission_id, program_title, week_number, theme, is_capstone, link_url, body_excerpt, body_is_excerpt, has_file, graded_at")
    .eq("profile_id", profileId)
    .order("graded_at", { ascending: false });
  return (data ?? []).flatMap((r) =>
    r.submission_id && r.program_title && r.week_number != null && r.theme && r.graded_at
      ? [
          {
            submission_id: r.submission_id,
            program_title: r.program_title,
            week_number: r.week_number,
            theme: r.theme,
            is_capstone: Boolean(r.is_capstone),
            link_url: r.link_url,
            body_excerpt: r.body_excerpt,
            body_is_excerpt: Boolean(r.body_is_excerpt),
            has_file: Boolean(r.has_file),
            graded_at: r.graded_at,
          },
        ]
      : [],
  );
}
