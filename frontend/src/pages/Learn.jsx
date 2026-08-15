/**
 * Learn — the real dashboard, wired to GET /api/learning/paths.
 *
 * A freshly registered mentee has zero paths (path generation is Phase C,
 * not built yet) — that's the honest, common state right now, not an edge
 * case to paper over. EmptyState says so plainly rather than showing sample
 * numbers.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, Badge, Progress, EmptyState, Alert, PageLoader } from "../components/ui/index.js";

export default function Learn() {
  const { profile } = useAuth();
  const [paths, setPaths] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/learning/paths")
      .then(({ paths }) => setPaths(paths))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your paths."));
  }, []);

  if (error) {
    return (
      <Page title="Learn">
        <Alert tone="danger" title="Something went wrong">{error}</Alert>
      </Page>
    );
  }

  if (paths === null) return <PageLoader message="Loading your paths…" />;

  return (
    <Page
      eyebrow="Delta Mentoring Program"
      title={`Welcome back, ${profile?.full_name?.split(" ")[0] ?? ""}`}
      description={paths.length ? "Pick up where you left off." : "Your curriculum hasn't been assigned yet."}
    >
      {paths.length === 0 ? (
        <EmptyState
          icon="lesson"
          title="No learning path yet"
          description="Once you're placed in a cohort, your 12-week curriculum will show up here."
        />
      ) : (
        <PageSection title="Your paths">
          <div className="grid gap-4 sm:grid-cols-2">
            {paths.map((path) => (
              <Link key={path.id} to={`/learn/${path.id}`} className="block">
                <Card interactive className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle>{path.title}</CardTitle>
                      <Badge tone="info">{path.track}</Badge>
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-3">
                    <Progress
                      value={path.percent_complete}
                      label={`${path.weeks_completed}/${path.weeks_total} weeks`}
                      state={path.percent_complete >= 100 ? "complete" : "active"}
                    />
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </PageSection>
      )}
    </Page>
  );
}
