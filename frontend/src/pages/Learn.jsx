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
import { api, ApiError, BASE_URL } from "../lib/api.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, Badge, Progress, EmptyState, Alert, PageLoader, Button, Input, Textarea, Avatar } from "../components/ui/index.js";
import VideoCall from "../components/video/VideoCall.jsx";

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
  const [onboarding, setOnboarding] = useState(null);
  const [nudges, setNudges] = useState([]);
  const [sessions, setSessions] = useState(null);
  const [joining, setJoining] = useState(null);

  useEffect(() => {
    api.get("/api/learning/paths")
      .then(({ paths }) => setPaths(paths))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your paths."));
    // 404 here just means "not enrolled yet" — not an error, no banner.
    api.get("/api/onboarding/me")
      .then(({ enrollment }) => setOnboarding(enrollment))
      .catch(() => {});
    // PLATFORM_SPEC.md §8 — reserved for acceptance/halfway/certification
    // (nudge_worthy), never every milestone; the endpoint itself already
    // filters to unacknowledged nudge_worthy rows.
    api.get("/api/achievements/me?nudge=true")
      .then(({ achievements }) => setNudges(achievements))
      .catch(() => {});
    // Role-scoped to the caller already (sessions.js) — a mentee only
    // ever sees their own sessions here.
    api.get("/api/sessions")
      .then(({ sessions }) => setSessions(sessions.filter((s) => s.status === "scheduled")))
      .catch(() => {});
  }, []);

  const acknowledgeNudge = (id) => {
    setNudges((prev) => prev.filter((n) => n.id !== id));
    api.post(`/api/achievements/${id}/acknowledge`).catch(() => {});
  };

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
    <Page title={`Welcome back, ${profile?.full_name?.split(" ")[0] ?? ""}`} titleHidden width="wide">
      <div className="mb-8 overflow-hidden rounded-2xl bg-[image:var(--gradient-launch)] px-6 py-10 sm:px-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#5c2e00]/80">Delta Mentoring Program</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#211d1d] sm:text-4xl">
          Welcome back, {profile?.full_name?.split(" ")[0] ?? ""}
        </h1>
        <p className="mt-2 max-w-xl text-[#211d1d]/80">
          {paths.length ? "Pick up where you left off." : "Your curriculum hasn't been assigned yet."}
        </p>
      </div>

      {onboarding && (!onboarding.device_check_completed_at || !onboarding.orientation_completed_at) && (
        <Alert tone="info" title="Finish getting set up" className="mb-6">
          A quick device check and orientation checklist will help you get the most out of your cohort.{" "}
          <Link to="/onboarding" className="font-semibold underline">Complete onboarding</Link>
        </Alert>
      )}
      {nudges.map((n) => (
        <Alert key={n.id} tone="success" title={n.label} onDismiss={() => acknowledgeNudge(n.id)} className="mb-6">
          Worth sharing —{" "}
          <a href={`${BASE_URL}/api/achievements/${n.id}`} target="_blank" rel="noreferrer" className="font-semibold underline">
            view your shareable page
          </a>.
        </Alert>
      ))}
      {sessions?.length > 0 && (
        <PageSection title={`Upcoming sessions (${sessions.length})`}>
          <div className="flex flex-col gap-3">
            {sessions.map((s) => (
              <Card key={s.id}>
                <CardBody className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={s.mentor?.full_name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-content">
                          {s.mentor?.full_name}
                          {s.session_type === "group" && <Badge tone="info" className="ml-2">Group</Badge>}
                        </p>
                        <p className="text-xs text-content-2">{new Date(s.scheduled_at).toLocaleString()} · {s.duration_mins}min</p>
                      </div>
                    </div>
                    {s.daily_room_url ? (
                      <Button size="sm" onClick={() => setJoining(joining === s.id ? null : s.id)}>
                        {joining === s.id ? "Hide call" : "Join"}
                      </Button>
                    ) : s.meet_link ? (
                      <a href={s.meet_link} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="secondary">Open meeting link</Button>
                      </a>
                    ) : null}
                  </div>
                  {joining === s.id && s.daily_room_url && (
                    <VideoCall joinFn={() => api.post(`/api/sessions/${s.id}/join`, {})} />
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </PageSection>
      )}
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
              <Link key={path.id} to={`/learn/${path.id}`} className="block h-full">
                <Card interactive className="h-full overflow-hidden p-0">
                  <div className="h-[3px] bg-[image:var(--gradient-launch)]" />
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
