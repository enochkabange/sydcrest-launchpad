/**
 * ProgramDetail — one page combining description + eligibility + duration,
 * PLATFORM_SPEC.md §13. Not split into a separate "Requirements &
 * Eligibility" page — that's a few paragraphs, not enough content to
 * justify a second page and a second click before Apply.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, ApiError } from "../../lib/api.js";
import PublicShell from "../../components/public/PublicShell.jsx";
import { Button, Alert, PageLoader } from "../../components/ui/index.js";

export default function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/programs/${slug}`)
      .then(({ program }) => setProgram(program))
      .catch((err) => (err instanceof ApiError && err.status === 404 ? setNotFound(true) : setError("Couldn't load this program.")));
  }, [slug]);

  if (notFound) {
    return (
      <PublicShell>
        <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
          <Alert tone="danger" title="Program not found">This program isn't open, or the link is wrong.</Alert>
        </div>
      </PublicShell>
    );
  }

  if (!program && !error) return <PublicShell><PageLoader message="Loading…" /></PublicShell>;

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        {error && <Alert tone="danger" className="mb-4">{error}</Alert>}
        {program && (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-content-3">{program.duration_weeks}-week program</p>
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

            <div className="mt-8">
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
