/**
 * PathDetail — the ordered curriculum for one learning path, wired to
 * GET /api/learning/weeks/:pathId and POST .../complete.
 *
 * learning_weeks has no rich content column (theme, objectives, a resource
 * link, an assignment — that's it), so this renders exactly that rather
 * than reaching for LessonStepper, which needs hand-authored step content
 * that doesn't exist in the data model yet.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, CardFooter, Badge, Button, Alert, PageLoader, Icon } from "../components/ui/index.js";

export default function PathDetail() {
  const { pathId } = useParams();
  const [weeks, setWeeks] = useState(null);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    api.get(`/api/learning/weeks/${pathId}`)
      .then(({ weeks }) => setWeeks(weeks))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load this path."));
  }, [pathId]);

  const completeWeek = async (weekId) => {
    setCompletingId(weekId);
    try {
      const { week } = await api.post(`/api/learning/weeks/${weekId}/complete`, {});
      setWeeks((ws) => ws.map((w) => (w.id === week.id ? week : w)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't mark this week complete.");
    } finally {
      setCompletingId(null);
    }
  };

  if (error && !weeks) {
    return (
      <Page title="Learning path">
        <Alert tone="danger" title="Something went wrong">{error}</Alert>
      </Page>
    );
  }

  if (weeks === null) return <PageLoader message="Loading curriculum…" />;

  return (
    <Page eyebrow={<Link to="/" className="hover:underline">← Back to Learn</Link>} title="Curriculum">
      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      <PageSection>
        <div className="flex flex-col gap-4">
          {weeks.map((week) => (
            <Card key={week.id} variant={week.status === "completed" ? "default" : "accent"}>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Week {week.week_number} — {week.theme}</CardTitle>
                  <Badge tone={week.status === "completed" ? "success" : "neutral"}>
                    {week.status === "completed" ? "Complete" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                {week.objectives?.length > 0 && (
                  <ul className="list-disc pl-5 text-sm text-content-2">
                    {week.objectives.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                )}
                {week.resource_url && (
                  <a
                    href={week.resource_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-content-link"
                  >
                    <Icon name="external" size="sm" />
                    {week.resource_name || "Resource"}
                  </a>
                )}
                {week.assignment && (
                  <div className="rounded-md bg-surface-sunken border border-line p-3 text-sm text-content-2">
                    <span className="font-semibold text-content">Assignment: </span>
                    {week.assignment}
                  </div>
                )}
                {week.score != null && (
                  <p className="text-sm text-content-2">Score: <span className="font-semibold text-content">{week.score}</span></p>
                )}
              </CardBody>
              <CardFooter>
                {week.status === "completed" ? (
                  <span className="text-sm text-content-2">
                    Completed {new Date(week.completed_at).toLocaleDateString()}
                  </span>
                ) : (
                  <Button
                    variant="accent"
                    size="sm"
                    loading={completingId === week.id}
                    onClick={() => completeWeek(week.id)}
                  >
                    Mark complete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </PageSection>
    </Page>
  );
}
