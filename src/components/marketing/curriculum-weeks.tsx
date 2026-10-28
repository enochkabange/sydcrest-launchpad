import { ExtraPracticeLinks } from "@/components/dmp/extra-practice";
import { buildWeeks, TRACK_LABELS, TRACKS, type DmpTrack, type DmpWeek } from "@/content/dmp/curriculum";
import { SHARED_WEEK_LINKS, weekNodeLinks, type SharedWeek, type SpecialisationWeek } from "@/content/dmp/week-lessons";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";

/** The transcribed curriculum uses em dashes in some themes; the site copy rule forbids them. */
export function displayTheme(theme: string) {
  return theme.replace(/\s*[—–]\s*/g, ": ");
}

const ALL = buildWeeks(TRACKS[0]);

/** Titles of the SydCrest lessons a week links to, in teaching order (the same links the cohort portal uses). */
function lessonTitles(week: number, track: DmpTrack): string[] {
  const links = week >= 7 && week <= 9 ? weekNodeLinks(track, week as SpecialisationWeek) : SHARED_WEEK_LINKS[week as SharedWeek];
  return links.flatMap((l) => {
    const node = ROADMAP_DRAFTS.find((r) => r.slug === l.roadmap_slug)?.nodes.find((n) => n.slug === l.node_slug);
    return node ? [node.title] : [];
  });
}
const FOUNDATION = ALL.filter((w) => w.week_number <= 6);
const FINISH = ALL.filter((w) => w.week_number >= 10);

function Week({ week, track = TRACKS[0] }: { week: DmpWeek; track?: DmpTrack }) {
  const lessons = lessonTitles(week.week_number, track);
  return (
    <li className="flex gap-4 rounded-lg border border-line bg-surface p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-info-bg text-sm font-bold text-info-fg">
        <span className="sr-only">Week </span>
        {week.week_number}
      </span>
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-base text-content">{displayTheme(week.theme)}</h3>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
          {week.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="text-sm text-content-2">
          <span className="font-semibold text-content">Assignment: </span>
          {week.assignment}
        </p>
        {lessons.length > 0 && (
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold text-content">SydCrest lessons</h4>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
              {lessons.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {week.resources.length > 0 && (
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-content">Extra practice</h4>
            <ExtraPracticeLinks resources={week.resources} compact />
          </div>
        )}
      </div>
    </li>
  );
}

function Block({ title, intro, weeks }: { title: string; intro: string; weeks: DmpWeek[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-h2 text-content">{title}</h2>
      <p className="text-content-2">{intro}</p>
      {/* One week per row on phones; weeks side by side from lg so twelve weeks are not one long column. */}
      <ol className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 xl:gap-4">
        {weeks.map((w) => (
          <Week key={`${w.week_number}-${w.theme}`} week={w} />
        ))}
      </ol>
    </div>
  );
}

/** The full week by week outline for /programme/curriculum: phases at h2, weeks at h3. */
export function CurriculumWeeks() {
  return (
    <div className="flex flex-col gap-12 xl:gap-16">
      <Block
        title="Weeks 1 to 6: the foundation"
        intro="Everyone takes these together, from computer and internet basics to reading a marketing analytics report."
        weeks={FOUNDATION}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-h2 text-content">Weeks 7 to 9: choose a specialisation</h2>
        <p className="text-content-2">Pick one of three tracks and go deeper.</p>
        <div className="flex flex-col gap-3">
          {TRACKS.map((track) => (
            <details key={track} className="group rounded-lg border border-line bg-surface-sunken">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 font-semibold text-content">
                {TRACK_LABELS[track]}
              </summary>
              <ol className="flex flex-col gap-3 px-3 pb-3 lg:grid lg:grid-cols-2 xl:grid-cols-3">
                {buildWeeks(track)
                  .filter((w) => w.week_number >= 7 && w.week_number <= 9)
                  .map((w) => (
                    <Week key={w.week_number} week={w} track={track} />
                  ))}
              </ol>
            </details>
          ))}
        </div>
      </div>
      <Block
        title="Weeks 10 to 12: bring it together"
        intro="A full campaign, a portfolio you can show employers, and a capstone to graduate."
        weeks={FINISH}
      />
    </div>
  );
}
