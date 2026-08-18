/**
 * Programs — public listing, PLATFORM_SPEC.md §13. Wired to the new
 * public GET /api/programs (applications.js) added alongside the
 * existing per-program GET /api/programs/:slug.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../../lib/api.js";
import PublicShell from "../../components/public/PublicShell.jsx";
import { Card, CardBody, Button, Alert, PageLoader, EmptyState } from "../../components/ui/index.js";

export default function Programs() {
  const [programs, setPrograms] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/programs")
      .then(({ programs }) => setPrograms(programs))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load programs."));
  }, []);

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-content-3">Programs</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
          Find your track
        </h1>
        <p className="mt-2 max-w-xl text-content-2">Every program pairs a real mentor with a structured curriculum.</p>

        <div className="mt-8">
          {error && <Alert tone="danger">{error}</Alert>}
          {programs === null && !error ? (
            <PageLoader message="Loading programs…" />
          ) : programs?.length === 0 ? (
            <EmptyState icon="curriculum" title="No programs open right now" description="Check back soon, or apply as a mentor to help build the next one." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {programs?.map((p) => (
                <Card key={p.id}>
                  <CardBody className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-content">{p.name}</h2>
                    <p className="text-content-2">{p.description}</p>
                    <p className="text-sm text-content-3">{p.duration_weeks} weeks</p>
                    <Link to={`/programs/${p.slug}`}>
                      <Button variant="primary">Learn more</Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}
