import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Card, CardHeader, CardTitle, CardBody, Badge, Button, Input, Select, Modal, Alert, PageLoader, EmptyState } from "../../components/ui/index.js";

export default function CohortsTab({ isPlatformAdmin }) {
  const [cohorts, setCohorts] = useState(null);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState(null); // cohort being enrolled into

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
                {isPlatformAdmin && (
                  <Button size="sm" variant="secondary" className="self-start mt-1" onClick={() => setEnrollTarget(c)}>
                    Enroll mentees
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <CreateCohortModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={load} />
      <EnrollModal cohort={enrollTarget} onClose={() => setEnrollTarget(null)} onEnrolled={load} />
    </div>
  );
}

function CreateCohortModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", track: "frontend", total_weeks: "12", max_size: "20" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/admin/cohorts", {
        ...form, total_weeks: Number(form.total_weeks), max_size: Number(form.max_size),
      });
      onCreated();
      onClose();
      setForm({ name: "", track: "frontend", total_weeks: "12", max_size: "20" });
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
          label="Track" value={form.track} onChange={set("track")}
          options={[
            { value: "frontend", label: "Frontend" },
            { value: "backend", label: "Backend" },
            { value: "fullstack", label: "Full-stack" },
            { value: "data", label: "Data" },
          ]}
        />
        <Input label="Total weeks" type="number" min="1" value={form.total_weeks} onChange={set("total_weeks")} />
        <Input label="Max size" type="number" min="1" value={form.max_size} onChange={set("max_size")} />
      </form>
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
