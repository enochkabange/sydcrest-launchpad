import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Card, CardHeader, CardTitle, CardBody, Badge, Button, Input, Select, Modal, Alert, PageLoader, EmptyState } from "../../components/ui/index.js";

export default function CohortsTab({ isPlatformAdmin }) {
  const [cohorts, setCohorts] = useState(null);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState(null); // cohort being enrolled into
  const [curriculumTarget, setCurriculumTarget] = useState(null); // cohort getting the DMP curriculum
  const [onboardingTarget, setOnboardingTarget] = useState(null); // cohort whose onboarding roster is open
  const [certificationTarget, setCertificationTarget] = useState(null); // cohort whose certification candidates are open

  const load = () => api.get("/api/admin/cohorts").then(({ cohorts }) => setCohorts(cohorts));

  useEffect(() => {
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load cohorts."));
  }, []);

  if (error && !cohorts) return <Alert tone="danger" className="mt-4">{error}</Alert>;
  if (cohorts === null) return <PageLoader message="Loading cohorts…" />;

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      {isPlatformAdmin && (
        <Button icon="add" className="self-end" onClick={() => setCreateOpen(true)}>New cohort</Button>
      )}

      {cohorts.length === 0 ? (
        <EmptyState icon="cohort" title="No cohorts yet" description="Create the first one to start enrolling mentees." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cohorts.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{c.name}</CardTitle>
                  <Badge tone={c.is_active ? "success" : "neutral"}>{c.is_active ? "Active" : "Inactive"}</Badge>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 text-sm">
                <p className="text-content-2">Track: <span className="text-content font-medium">{c.track}</span></p>
                <p className="text-content-2">Mentor: <span className="text-content font-medium">{c.profiles?.full_name ?? "Unassigned"}</span></p>
                <p className="text-content-2">
                  Enrolled: <span className="text-content font-medium">{c.enrollments?.[0]?.count ?? 0}/{c.max_size}</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {isPlatformAdmin && (
                    <Button size="sm" variant="secondary" onClick={() => setEnrollTarget(c)}>
                      Enroll mentees
                    </Button>
                  )}
                  <Button size="sm" variant="secondary" onClick={() => setCurriculumTarget(c)}>
                    Assign DMP curriculum
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setOnboardingTarget(c)}>
                    View onboarding
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setCertificationTarget(c)}>
                    View certification
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <CreateCohortModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={load} />
      <EnrollModal cohort={enrollTarget} onClose={() => setEnrollTarget(null)} onEnrolled={load} />
      <AssignCurriculumModal cohort={curriculumTarget} onClose={() => setCurriculumTarget(null)} />
      <OnboardingRosterModal cohort={onboardingTarget} onClose={() => setOnboardingTarget(null)} />
      <CertificationModal cohort={certificationTarget} onClose={() => setCertificationTarget(null)} />
    </div>
  );
}

const DMP_TRACKS = [
  { value: "seo", label: "SEO & Content Marketing" },
  { value: "social_media", label: "Social Media Marketing" },
  { value: "google_ads", label: "Google Ads (SEM)" },
];

function AssignCurriculumModal({ cohort, onClose }) {
  const [track, setTrack] = useState("seo");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (cohort) { setTrack("seo"); setError(""); setResult(null); }
  }, [cohort]);

  const handleAssign = async () => {
    setSubmitting(true);
    setError("");
    try {
      const { assigned } = await api.post(`/api/admin/cohorts/${cohort.id}/assign-curriculum`, { track });
      setResult(assigned);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't assign the curriculum.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!cohort}
      onClose={onClose}
      title={`Assign DMP curriculum — ${cohort?.name ?? ""}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button onClick={handleAssign} loading={submitting}>Assign</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {result !== null && (
        <Alert tone="success" className="mb-3">
          {result === 0
            ? "Every enrolled mentee already has this curriculum — nothing to do."
            : `Assigned the 12-week curriculum to ${result} mentee${result === 1 ? "" : "s"}.`}
        </Alert>
      )}
      <p className="text-sm text-content-2 mb-3">
        Gives every mentee currently enrolled in this cohort the real 12-week Delta Mentoring Program
        curriculum. Safe to run again later — mentees who already have it are skipped.
      </p>
      <Select label="Specialization track" value={track} onChange={(e) => setTrack(e.target.value)} options={DMP_TRACKS} />
    </Modal>
  );
}

function CreateCohortModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", track: "frontend", program_id: "", total_weeks: "12", max_size: "20" });
  const [programs, setPrograms] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    if (!open) return;
    api.get("/api/admin/programs").then(({ programs }) => setPrograms(programs)).catch(() => setPrograms([]));
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/admin/cohorts", {
        ...form, program_id: form.program_id || undefined, total_weeks: Number(form.total_weeks), max_size: Number(form.max_size),
      });
      onCreated();
      onClose();
      setForm({ name: "", track: "frontend", program_id: "", total_weeks: "12", max_size: "20" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create cohort.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New cohort"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button form="create-cohort-form" type="submit" loading={submitting}>Create</Button>
        </>
      }
    >
      <form id="create-cohort-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert tone="danger">{error}</Alert>}
        <Input label="Name" required value={form.name} onChange={set("name")} />
        <Select
          label="Program (optional)" value={form.program_id} onChange={set("program_id")}
          options={[
            { value: "", label: "— None —" },
            ...(programs ?? []).map((p) => ({ value: p.id, label: p.name })),
          ]}
        />
        <Select
          label="Track" value={form.track} onChange={set("track")}
          options={[
            { value: "frontend", label: "Frontend" },
            { value: "backend", label: "Backend" },
            { value: "fullstack", label: "Full-stack" },
            { value: "data", label: "Data" },
            ...DMP_TRACKS,
          ]}
        />
        <Input label="Total weeks" type="number" min="1" value={form.total_weeks} onChange={set("total_weeks")} />
        <Input label="Max size" type="number" min="1" value={form.max_size} onChange={set("max_size")} />
      </form>
    </Modal>
  );
}

// OnboardingRosterModal — PLATFORM_SPEC.md §5. "How's onboarding going for
// this cohort" made answerable for the first time: each mentee's device
// check / orientation / buddy / guardian-consent status, plus actions for
// the two things that need an admin — pairing buddies and generating a
// guardian consent link to relay manually (no email service exists, see
// backend/src/routes/onboarding.js's header comment).
function OnboardingRosterModal({ cohort, onClose }) {
  const [enrollments, setEnrollments] = useState(null);
  const [error, setError] = useState("");
  const [pairing, setPairing] = useState(false);
  const [pairResult, setPairResult] = useState(null);
  const [linkFor, setLinkFor] = useState(null); // enrollment id currently generating a link
  const [links, setLinks] = useState({}); // enrollment id -> confirmation_url
  const [guardianEmails, setGuardianEmails] = useState({}); // enrollment id -> draft email

  const load = () =>
    api.get(`/api/admin/cohorts/${cohort.id}/enrollments`).then(({ enrollments }) => setEnrollments(enrollments));

  useEffect(() => {
    if (!cohort) return;
    setEnrollments(null);
    setError("");
    setPairResult(null);
    setLinks({});
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load the onboarding roster."));
  }, [cohort]);

  const pairBuddies = async () => {
    setPairing(true);
    setError("");
    try {
      const result = await api.post(`/api/admin/cohorts/${cohort.id}/pair-buddies`);
      setPairResult(result);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't pair buddies.");
    } finally {
      setPairing(false);
    }
  };

  const generateLink = async (enrollmentId) => {
    const guardian_email = guardianEmails[enrollmentId];
    if (!guardian_email) return;
    setLinkFor(enrollmentId);
    setError("");
    try {
      const { confirmation_url } = await api.patch(`/api/admin/enrollments/${enrollmentId}/guardian-email`, { guardian_email });
      setLinks((prev) => ({ ...prev, [enrollmentId]: confirmation_url }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't generate a consent link.");
    } finally {
      setLinkFor(null);
    }
  };

  return (
    <Modal
      open={!!cohort}
      onClose={onClose}
      title={`Onboarding — ${cohort?.name ?? ""}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button onClick={pairBuddies} loading={pairing}>Pair buddies</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {pairResult && (
        <Alert tone="success" className="mb-3">
          Paired {pairResult.paired} mentee{pairResult.paired === 1 ? "" : "s"}.
          {pairResult.unpaired_leftover > 0 && " One mentee is left unpaired (odd number in the cohort)."}
        </Alert>
      )}
      {enrollments === null ? (
        <PageLoader message="Loading roster…" />
      ) : enrollments.length === 0 ? (
        <p className="text-sm text-content-2">No mentees enrolled yet.</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
          {enrollments.map((e) => (
            <div key={e.id} className="rounded-md border border-line p-3 flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-content">{e.profiles?.full_name}</span>
                <span className="text-xs text-content-3">{e.profiles?.email}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge tone={e.device_check_completed_at ? "success" : "neutral"}>
                  {e.device_check_completed_at ? "Device check done" : "Device check pending"}
                </Badge>
                <Badge tone={e.orientation_completed_at ? "success" : "neutral"}>
                  {e.orientation_completed_at ? "Orientation done" : "Orientation pending"}
                </Badge>
                {e.buddy_id && <Badge tone="info">Buddy paired</Badge>}
                {e.guardian_consent_required && (
                  <Badge tone={e.guardian_consent_confirmed_at ? "success" : "warning"}>
                    {e.guardian_consent_confirmed_at ? "Guardian consent confirmed" : "Guardian consent needed"}
                  </Badge>
                )}
              </div>
              {e.guardian_consent_required && !e.guardian_consent_confirmed_at && (
                links[e.id] ? (
                  <p className="text-xs text-content-2 break-all">
                    Relay this link to the guardian: <span className="font-mono">{links[e.id]}</span>
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      className="max-w-xs"
                      type="email"
                      placeholder="Guardian's email"
                      value={guardianEmails[e.id] ?? ""}
                      onChange={(ev) => setGuardianEmails((prev) => ({ ...prev, [e.id]: ev.target.value }))}
                    />
                    <Button
                      size="sm" variant="secondary" loading={linkFor === e.id}
                      disabled={!guardianEmails[e.id]}
                      onClick={() => generateLink(e.id)}
                    >
                      Generate consent link
                    </Button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

// CertificationModal — PLATFORM_SPEC.md §7: certification is a manual
// mentor/admin trigger, never automatic. Lists each mentee's readiness
// against the program's own certification_criteria, computed server-side
// (GET .../certification-candidates) — this modal is just the trigger UI.
function CertificationModal({ cohort, onClose }) {
  const [candidates, setCandidates] = useState(null);
  const [error, setError] = useState("");
  const [certifying, setCertifying] = useState(null); // enrollment id in flight

  const load = () =>
    api.get(`/api/admin/cohorts/${cohort.id}/certification-candidates`).then(({ candidates }) => setCandidates(candidates));

  useEffect(() => {
    if (!cohort) return;
    setCandidates(null);
    setError("");
    load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load certification candidates."));
  }, [cohort]);

  const certify = async (enrollmentId) => {
    setCertifying(enrollmentId);
    setError("");
    try {
      await api.post(`/api/admin/enrollments/${enrollmentId}/certify`);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't certify this mentee.");
    } finally {
      setCertifying(null);
    }
  };

  return (
    <Modal open={!!cohort} onClose={onClose} title={`Certification — ${cohort?.name ?? ""}`} footer={<Button variant="secondary" onClick={onClose}>Close</Button>}>
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {candidates === null ? (
        <PageLoader message="Loading candidates…" />
      ) : candidates.length === 0 ? (
        <p className="text-sm text-content-2">No mentees enrolled yet.</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
          {candidates.map((c) => (
            <div key={c.enrollment_id} className="rounded-md border border-line p-3 flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="text-content font-medium">{c.full_name}</p>
                <p className="text-content-3 text-xs">{c.completion_pct}% complete{c.all_projects_approved ? " · all projects approved" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={c.ready ? "success" : "neutral"}>{c.ready ? "Ready" : "Not ready"}</Badge>
                <Button size="sm" disabled={!c.ready} loading={certifying === c.enrollment_id} onClick={() => certify(c.enrollment_id)}>
                  Certify
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

function EnrollModal({ cohort, onClose, onEnrolled }) {
  const [mentees, setMentees] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cohort) return;
    setMentees(null);
    setSelected(new Set());
    api.get("/api/admin/users?role=mentee&limit=100")
      .then(({ users }) => setMentees(users))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load mentees."));
  }, [cohort]);

  const toggle = (id) => setSelected((s) => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const handleEnroll = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/api/admin/cohorts/${cohort.id}/enroll`, { mentee_ids: [...selected] });
      onEnrolled();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't enroll mentees.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!cohort}
      onClose={onClose}
      title={`Enroll into ${cohort?.name ?? ""}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleEnroll} loading={submitting} disabled={selected.size === 0}>
            Enroll {selected.size > 0 ? `(${selected.size})` : ""}
          </Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      {mentees === null ? (
        <PageLoader message="Loading mentees…" />
      ) : mentees.length === 0 ? (
        <p className="text-sm text-content-2">No mentees registered yet.</p>
      ) : (
        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
          {mentees.map((m) => (
            <label key={m.id} className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-surface-sunken cursor-pointer">
              <input type="checkbox" checked={selected.has(m.id)} onChange={() => toggle(m.id)} />
              <span className="text-sm text-content">{m.full_name}</span>
              <span className="text-xs text-content-3">{m.email}</span>
            </label>
          ))}
        </div>
      )}
    </Modal>
  );
}
