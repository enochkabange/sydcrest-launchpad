/**
 * ProgramDetail — one page combining description + eligibility + duration
 * + a real curriculum preview, PLATFORM_SPEC.md §13. Not split into a
 * separate "Requirements & Eligibility" page — not enough content to
 * justify a second page and a second click before Apply.
 *
 * The curriculum section (GET /api/programs/:slug/curriculum,
 * applications.js) is real content from backend/src/data/dmp-
 * curriculum.js — the actual week-by-week DMP curriculum — not invented
 * marketing copy. It's currently DMP-only (404s for any other slug),
 * so this section is skipped entirely when the route 404s.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, ApiError } from "../../lib/api.js";
import PublicShell from "../../components/public/PublicShell.jsx";
import { Button, Badge, Alert, PageLoader } from "../../components/ui/index.js";
import { SectionAccent } from "../../components/public/illustrations.jsx";

export default function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [curriculum, setCurriculum] = useState(null); // null = not loaded yet, [] = none available
  const [activeTrack, setActiveTrack] = useState(0);

  useEffect(() => {
    api.get(`/api/programs/${slug}`)
      .then(({ program }) => setProgram(program))
      .catch((err) => (err instanceof ApiError && err.status === 404 ? setNotFound(true) : setError("Couldn't load this program.")));
    api.get(`/api/programs/${slug}/curriculum`)
      .then(({ tracks }) => setCurriculum(tracks))
      .catch(() => setCurriculum([]));
  }, [slug]);

  if (notFound) {
    return (
      <PublicShell>
        <div className="flex items-center justify-center px-4 py-16">
          <Alert tone="danger" title="Program not found">This application isn't open, or the link is wrong.</Alert>
        </div>
      </PublicShell>
    );
  }

  if (!program && !error) return <PublicShell><PageLoader message="Loading…" /></PublicShell>;

  const track = curriculum?.[activeTrack];

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        {error && <Alert tone="danger" className="mb-4">{error}</Alert>}
        {program && (
          <>
            <SectionAccent />
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-content-3">{program.duration_weeks}-week program</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">{program.name}</h1>
            <p className="mt-4 text-lg text-content-2">{program.description}</p>

            {(program.eligibility_min_age || program.eligibility_max_age || program.eligibility_notes) && (
              <div className="mt-8 rounded-lg border border-line bg-surface-sunken p-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-content-3">Eligibility</h2>
                {(program.eligibility_min_age || program.eligibility_max_age) && (
                  <p className="mt-2 text-content">
                    Ages {program.eligibility_min_age ?? "—"}{program.eligibility_max_age ? `–${program.eligibility_max_age}` : "+"}
                  </p>
                )}
                {program.eligibility_notes && <p className="mt-2 text-content-2">{program.eligibility_notes}</p>}
              </div>
            )}

            {curriculum?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-extrabold text-content">What you'll learn</h2>
                <p className="mt-1 text-content-2">
                  Weeks 1–6 are shared across every track, then you specialize.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {curriculum.map((t, i) => (
                    <button
                      key={t.track}
                      type="button"
                      onClick={() => setActiveTrack(i)}
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                        activeTrack === i ? "border-content bg-content text-surface" : "border-line text-content-2 hover:border-line-strong"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <ol className="mt-6 flex flex-col gap-2">
                  {track.weeks.map((w) => (
                    <li key={w.week_number} className="flex items-start gap-3 rounded-md border border-line px-4 py-3">
                      <Badge tone="neutral">Week {w.week_number}</Badge>
                      <span className="text-content">{w.theme}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-10">
              <Link to={`/apply/${program.slug}`}>
                <Button variant="accent">Apply to this program</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </PublicShell>
  );
}
