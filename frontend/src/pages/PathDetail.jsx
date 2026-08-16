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

function QuizBlock({ weekNumber, track }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unconfigured, setUnconfigured] = useState(false);

  const generate = async () => {
    setBusy(true);
    setError("");
    setUnconfigured(false);
    try {
      const { quiz } = await api.post("/api/learning/quiz/generate", { week_number: weekNumber, track });
      setQuiz(quiz);
      setAnswers({});
      setSubmitted(false);
    } catch (err) {
      if (err instanceof ApiError && err.status === 503) setUnconfigured(true);
      else setError(err instanceof ApiError ? err.message : "Couldn't generate a quiz.");
    } finally {
      setBusy(false);
    }
  };

  if (unconfigured) return null;

  if (!quiz) {
    return (
      <div className="flex flex-col gap-1.5">
        {error && <Alert tone="danger">{error}</Alert>}
        <Button variant="secondary" size="sm" loading={busy} onClick={generate}>
          Take a quiz on this week
        </Button>
      </div>
    );
  }

  const score = submitted
    ? quiz.questions.reduce((n, q, i) => n + (answers[i] === q.correct_index ? 1 : 0), 0)
    : null;

  return (
    <div className="flex flex-col gap-4 rounded-md border border-line p-3">
      {quiz.questions.map((q, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-content">{i + 1}. {q.question}</p>
          <div className="flex flex-col gap-1">
            {q.options.map((opt, oi) => {
              const isChosen = answers[i] === oi;
              const isCorrect = submitted && oi === q.correct_index;
              const isWrongChoice = submitted && isChosen && oi !== q.correct_index;
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                  className={`rounded-md border px-3 py-1.5 text-left text-sm transition-colors ${
                    isCorrect ? "border-success-500 bg-success-bg text-success-fg"
                    : isWrongChoice ? "border-danger-500 bg-danger-bg text-danger-fg"
                    : isChosen ? "border-[var(--color-brand)] bg-surface-sunken"
                    : "border-line text-content-2"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {submitted ? (
        <p className="text-sm font-semibold text-content">Score: {score}/{quiz.questions.length}</p>
      ) : (
        <Button
          size="sm"
          variant="accent"
          disabled={Object.keys(answers).length < quiz.questions.length}
          onClick={() => setSubmitted(true)}
        >
          Submit quiz
        </Button>
      )}
    </div>
  );
}

export default function PathDetail() {
  const { pathId } = useParams();
  const [weeks, setWeeks] = useState(null);
  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    api.get(`/api/learning/weeks/${pathId}`)
      .then(({ weeks }) => setWeeks(weeks))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load this path."));
    api.get("/api/learning/paths")
      .then(({ paths }) => setTrack(paths.find((p) => p.id === pathId)?.track ?? null))
      .catch(() => {});
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
                {track && <QuizBlock weekNumber={week.week_number} track={track} />}
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
