import { buildWeeks, TRACK_LABELS, TRACKS, type DmpWeek } from "@/content/dmp/curriculum";

/** The transcribed curriculum uses em dashes in some themes; the site copy rule forbids them. */
export function displayTheme(theme: string) {
  return theme.replace(/\s*[—–]\s*/g, ": ");
}

const ALL = buildWeeks(TRACKS[0]);
const FOUNDATION = ALL.filter((w) => w.week_number <= 6);
const FINISH = ALL.filter((w) => w.week_number >= 10);

function Week({ week }: { week: DmpWeek }) {
  return (
    <li className="flex gap-4 rounded-lg border border-line bg-surface p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-info-bg text-sm font-bold text-info-fg">
        <span className="sr-only">Week </span>
        {week.week_number}
      </span>
      <div className="flex min-w-0 flex-col gap-2">
        <h4 className="text-base text-content">{displayTheme(week.theme)}</h4>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
          {week.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="text-sm text-content-2">
          <span className="font-semibold text-content">Assignment: </span>
          {week.assignment}
        </p>
        {week.resource_name && week.resource_url && (
          <a href={week.resource_url} target="_blank" rel="noreferrer" className="text-sm font-semibold">
            Free resource: {week.resource_name}
          </a>
        )}
      </div>
    </li>
  );
}

function Block({ title, intro, weeks }: { title: string; intro: string; weeks: DmpWeek[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl text-content">{title}</h3>
      <p className="text-content-2">{intro}</p>
      <ol className="flex flex-col gap-3">
        {weeks.map((w) => (
          <Week key={`${w.week_number}-${w.theme}`} week={w} />
        ))}
      </ol>
    </div>
  );
}

export function CurriculumWeeks() {
  return (
    <div className="flex flex-col gap-10">
      <Block
        title="Weeks 1 to 6: the foundation"
        intro="Everyone takes these together, from computer and internet basics to reading a marketing analytics report."
        weeks={FOUNDATION}
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-xl text-content">Weeks 7 to 9: choose a specialisation</h3>
        <p className="text-content-2">Pick one of three tracks and go deeper.</p>
        <div className="flex flex-col gap-3">
          {TRACKS.map((track) => (
            <details key={track} className="group rounded-lg border border-line bg-surface-sunken">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 font-semibold text-content">
                {TRACK_LABELS[track]}
              </summary>
              <ol className="flex flex-col gap-3 px-3 pb-3">
                {buildWeeks(track)
                  .filter((w) => w.week_number >= 7 && w.week_number <= 9)
                  .map((w) => (
                    <Week key={w.week_number} week={w} />
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
