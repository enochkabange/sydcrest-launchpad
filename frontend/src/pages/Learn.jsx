/**
 * Learn — the real dashboard, wired to GET /api/learning/paths.
 *
 * A freshly registered mentee has zero paths until either a cohort assigns
 * one or they generate one themselves via POST /api/learning/paths/generate
 * (Phase C, requireAI-gated). The empty state offers that generate form and
 * handles the honest 503 the same way marketplace booking handles Hubtel's
 * pending_setup — not an error, just "not configured yet".
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, Badge, Progress, EmptyState, Alert, PageLoader, Button, Input, Textarea } from "../components/ui/index.js";

const TRACKS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full-stack" },
  { value: "data", label: "Data" },
];

function GeneratePathForm({ onGenerated }) {
  const [track, setTrack] = useState("frontend");
  const [goals, setGoals] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unconfigured, setUnconfigured] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setUnconfigured(false);
    try {
      const { path } = await api.post("/api/learning/paths/generate", { track, goals: goals || undefined });
      onGenerated(path);
    } catch (err) {
      if (err instanceof ApiError && err.status === 503) setUnconfigured(true);
      else setError(err instanceof ApiError ? err.message : "Couldn't generate a path.");
    } finally {
      setBusy(false);
    }
  };

  if (unconfigured) {
    return (
      <Alert tone="info" title="AI path generation isn't set up yet">
        This platform hasn't turned on AI curriculum generation. Ask your cohort admin to place you in a cohort instead.
      </Alert>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
      {error && <Alert tone="danger" title="Something went wrong">{error}</Alert>}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Track</label>
        <div className="flex flex-wrap gap-2">
          {TRACKS.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => setTrack(t.value)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                track === t.value
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        label="What are you hoping to get out of this? (optional)"
        placeholder="e.g. I want to build a portfolio strong enough to apply for junior roles."
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
        rows={3}
      />
      <Button type="submit" loading={busy}>Generate my 12-week path</Button>
    </form>
  );
}

export default function Learn() {
  const { profile } = useAuth();
  const [paths, setPaths] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/learning/paths")
      .then(({ paths }) => setPaths(paths))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your paths."));
  }, []);

  const handleGenerated = (path) => {
    setPaths((prev) => [{ ...path, weeks_total: path.total_weeks, weeks_completed: 0, percent_complete: 0 }, ...(prev || [])]);
  };

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
        <div className="flex flex-col gap-6">
          <EmptyState
            icon="lesson"
            title="No learning path yet"
            description="Once you're placed in a cohort, your 12-week curriculum will show up here. Or generate one now."
          />
          <PageSection title="Generate a path with AI">
            <GeneratePathForm onGenerated={handleGenerated} />
          </PageSection>
        </div>
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
