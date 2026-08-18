/**
 * MentorDashboard — the mentor-side home. Same gap as the admin dashboard
 * before it: projects.js and sessions.js are fully built and tested, but
 * nothing before this let a mentor actually review a submission or manage
 * a session without calling the API by hand.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardHeader, CardTitle, CardBody, CardFooter, Badge, Button, Textarea, Select, Input, Checkbox, Modal, Alert, PageLoader, EmptyState, Avatar } from "../components/ui/index.js";
import VideoCall from "../components/video/VideoCall.jsx";

const PENDING_STATUSES = ["submitted", "ai_reviewed"];

export default function MentorDashboard() {
  const [projects, setProjects] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState("");
  const [reviewing, setReviewing] = useState(null);
  const [scheduling, setScheduling] = useState(false);
  const [joining, setJoining] = useState(null); // session being joined

  const loadProjects = () => api.get("/api/projects").then(({ projects }) => setProjects(projects));
  const loadSessions = () => api.get("/api/sessions").then(({ sessions }) => setSessions(sessions));

  useEffect(() => {
    Promise.all([loadProjects(), loadSessions()])
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your dashboard."));
  }, []);

  const markAttended = async (sessionId) => {
    try {
      await api.post(`/api/sessions/${sessionId}/attendance`, {});
      await loadSessions();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update session.");
    }
  };

  if (error && !projects) return <Page title="Dashboard"><Alert tone="danger">{error}</Alert></Page>;
  if (projects === null || sessions === null) return <PageLoader message="Loading your dashboard…" />;

  const pending = projects.filter((p) => PENDING_STATUSES.includes(p.status));
  const upcoming = sessions.filter((s) => s.status === "scheduled");

  return (
    <Page eyebrow="Delta Mentoring Program" title="Your dashboard" description="What needs your attention.">
      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      <PageSection title={`Projects awaiting review (${pending.length})`}>
        {pending.length === 0 ? (
          <EmptyState icon="project" title="Nothing to review" description="Submissions from your mentees will show up here." />
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>Week {p.week_number} — {p.title}</CardTitle>
                    <Badge tone="info">{p.status.replace(/_/g, " ")}</Badge>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                  <p className="text-sm text-content-2">{p.profiles?.full_name}</p>
                  {p.submission_url && (
                    <a href={p.submission_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-content-link">{p.submission_url}</a>
                  )}
                </CardBody>
                <CardFooter>
                  <Button size="sm" variant="accent" onClick={() => setReviewing(p)}>Review</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </PageSection>

      <PageSection
        title={`Upcoming sessions (${upcoming.length})`}
        action={<Button size="sm" onClick={() => setScheduling(true)}>Schedule session</Button>}
      >
        {upcoming.length === 0 ? (
          <EmptyState icon="session" title="Nothing scheduled" description="Sessions you book with your mentees will show up here." />
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((s) => (
              <Card key={s.id}>
                <CardBody className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={s.mentee?.full_name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-content">
                          {s.mentee?.full_name}
                          {s.session_type === "group" && <Badge tone="info" className="ml-2">Group</Badge>}
                        </p>
                        <p className="text-xs text-content-2">{new Date(s.scheduled_at).toLocaleString()} · {s.duration_mins}min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.daily_room_url ? (
                        <Button size="sm" onClick={() => setJoining(joining === s.id ? null : s.id)}>
                          {joining === s.id ? "Hide call" : "Join"}
                        </Button>
                      ) : s.meet_link ? (
                        <a href={s.meet_link} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="secondary">Open meeting link</Button>
                        </a>
                      ) : null}
                      <Button size="sm" variant="secondary" onClick={() => markAttended(s.id)}>Mark attended</Button>
                    </div>
                  </div>
                  {joining === s.id && s.daily_room_url && (
                    <VideoCall joinFn={() => api.post(`/api/sessions/${s.id}/join`, {})} />
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </PageSection>

      <ReviewModal project={reviewing} onClose={() => setReviewing(null)} onReviewed={loadProjects} />
      <ScheduleModal open={scheduling} onClose={() => setScheduling(false)} onScheduled={loadSessions} />
    </Page>
  );
}

const REVIEW_STATUSES = [
  { value: "approved", label: "Approve" },
  { value: "revision_requested", label: "Request revision" },
  { value: "mentor_reviewed", label: "Mark reviewed (no verdict yet)" },
];

function ReviewModal({ project, onClose, onReviewed }) {
  const [status, setStatus] = useState("approved");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) { setStatus("approved"); setFeedback(""); setScore(""); setError(""); }
  }, [project]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/api/projects/${project.id}/review`, {
        status, mentor_feedback: feedback, final_score: score ? Number(score) : undefined,
      });
      onReviewed();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={project ? `Review: ${project.title}` : ""}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={submitting}>Submit review</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      <div className="flex flex-col gap-4">
        <Select label="Decision" value={status} onChange={(e) => setStatus(e.target.value)} options={REVIEW_STATUSES} />
        <Textarea label="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} />
        <input
          type="number" min="0" max="100" placeholder="Score (optional)"
          value={score} onChange={(e) => setScore(e.target.value)}
          className="h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content"
        />
      </div>
    </Modal>
  );
}

/**
 * ScheduleModal — books a session via the previously-uncalled POST
 * /api/sessions. Safeguarding (PLATFORM_SPEC.md §11): once a minor mentee
 * is selected, the form drops the 1:1 framing and requires at least one
 * more attendee from the same roster before it'll submit — mirrors the
 * server-side rejection in sessions.js rather than just trusting it.
 */
function ScheduleModal({ open, onClose, onScheduled }) {
  const [roster, setRoster] = useState(null);
  const [menteeId, setMenteeId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMins, setDurationMins] = useState("60");
  const [attendeeIds, setAttendeeIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setMenteeId(""); setScheduledAt(""); setDurationMins("60"); setAttendeeIds([]); setError("");
    api.get("/api/sessions/roster").then(({ mentees }) => setRoster(mentees)).catch(() => setRoster([]));
  }, [open]);

  const mentee = roster?.find((m) => m.id === menteeId);
  const otherMentees = roster?.filter((m) => m.id !== menteeId && m.cohort_id === mentee?.cohort_id) ?? [];

  const toggleAttendee = (id) => {
    setAttendeeIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/sessions", {
        mentee_id: menteeId,
        cohort_id: mentee?.cohort_id,
        scheduled_at: new Date(scheduledAt).toISOString(),
        duration_mins: Number(durationMins),
        ...(mentee?.is_minor ? { session_type: "group", attendee_ids: attendeeIds } : {}),
      });
      await onScheduled();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't schedule that session.");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = menteeId && scheduledAt && (!mentee?.is_minor || attendeeIds.length > 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule a session"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={submitting} disabled={!canSubmit}>Schedule</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {roster === null ? (
        <p className="text-sm text-content-2">Loading your roster…</p>
      ) : roster.length === 0 ? (
        <p className="text-sm text-content-2">No enrolled mentees in your cohort yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <Select
            label="Mentee" required placeholder="Choose a mentee" value={menteeId}
            onChange={(e) => { setMenteeId(e.target.value); setAttendeeIds([]); }}
            options={roster.map((m) => ({ value: m.id, label: m.full_name }))}
          />
          {mentee?.is_minor && (
            <Alert tone="info">
              This mentee is under 18 — sessions with them must be group sessions. Add at least one more mentee below.
            </Alert>
          )}
          <Input label="Date and time" type="datetime-local" required value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
          <Select
            label="Duration" value={durationMins} onChange={(e) => setDurationMins(e.target.value)}
            options={[{ value: "30", label: "30 minutes" }, { value: "60", label: "60 minutes" }]}
          />
          {mentee?.is_minor && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-content">Other attendees</p>
              {otherMentees.length === 0 ? (
                <p className="text-sm text-content-2">No other mentees in this cohort to add.</p>
              ) : (
                otherMentees.map((m) => (
                  <Checkbox key={m.id} label={m.full_name} checked={attendeeIds.includes(m.id)} onChange={() => toggleAttendee(m.id)} />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
