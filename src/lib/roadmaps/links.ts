/**
 * Links between tracks (issue #244): "Leads to" is stored on each roadmap
 * (`roadmaps.leads_to`, from the drafts' `leads_to`); "Builds on" is its
 * inverse, derived here so the two directions can never disagree. Pure.
 */

export type LinkableRoadmap = {
  slug: string;
  title: string;
  track: string | null;
  leads_to: readonly string[];
};

export type TrackLink = { slug: string; title: string; track: string };

export type CrossLinks = { buildsOn: TrackLink[]; leadsTo: TrackLink[] };

/**
 * The published roadmaps this one builds on and leads to. A track key that
 * matches no published roadmap is skipped (not published yet), and a roadmap
 * never links to itself. Leads to keeps the author's order; builds on keeps
 * the order of `all` (the index order).
 */
export function crossLinks(roadmap: Pick<LinkableRoadmap, "slug" | "track" | "leads_to">, all: readonly LinkableRoadmap[]): CrossLinks {
  const byTrack = new Map<string, LinkableRoadmap>();
  for (const r of all) if (r.track && !byTrack.has(r.track)) byTrack.set(r.track, r);
  const link = (r: LinkableRoadmap): TrackLink => ({ slug: r.slug, title: r.title, track: r.track ?? "" });

  const seen = new Set<string>();
  const leadsTo: TrackLink[] = [];
  for (const track of roadmap.leads_to) {
    const target = byTrack.get(track);
    if (!target || target.slug === roadmap.slug || seen.has(target.slug)) continue;
    seen.add(target.slug);
    leadsTo.push(link(target));
  }

  const buildsOn = roadmap.track
    ? all.filter((r) => r.slug !== roadmap.slug && r.leads_to.includes(roadmap.track!)).map(link)
    : [];
  return { buildsOn, leadsTo };
}
