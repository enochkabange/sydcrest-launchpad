/**
 * Partnerships — public inquiry form, PLATFORM_SPEC.md §13. Wired to the
 * new POST /api/partner-inquiries (applications.js). Same "submitted,
 * thanks" confirmation pattern as ApplyMentor.jsx, no reference code
 * (there's no status-lookup flow for this one — a partner gets a reply
 * by email, not a self-serve check).
 */
import { useState } from "react";
import PublicShell from "../../components/public/PublicShell.jsx";
import { api, ApiError } from "../../lib/api.js";
import { Card, CardBody, PageSection, Input, Select, Textarea, Button, Alert } from "../../components/ui/index.js";
import { StepGraphic, SectionAccent } from "../../components/public/illustrations.jsx";

const TARGETS = [
  { title: "Universities", body: "KNUST, University of Ghana, Ashesi, and CS departments/tech clubs across Ghana." },
  { title: "Hubs & communities", body: "Developer groups, tech hubs, and alumni networks looking to place learners into a real cohort." },
  { title: "Corporate", body: "Companies hiring junior tech talent, or looking to sponsor a cohort." },
];

const PROCESS = [
  { step: "1", title: "Reach out", body: "Tell us who you are and what you had in mind — five minutes, no commitment." },
  { step: "2", title: "We scope a fit", body: "A quick call to figure out whether a referral pipeline, sponsorship, or joint cohort makes sense." },
  { step: "3", title: "We build it together", body: "From there it's a real, ongoing partnership — not a one-off." },
];

const INQUIRY_TYPES = [
  { value: "university", label: "University" },
  { value: "hub", label: "Hub / community" },
  { value: "corporate", label: "Corporate" },
  { value: "other", label: "Other" },
];

export default function Partnerships() {
  const [form, setForm] = useState({ org_name: "", contact_name: "", email: "", phone: "", inquiry_type: "university", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/partner-inquiries", form);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit that. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <SectionAccent />
        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-content-3">Partnerships</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
          Let's build Ghana's tech talent pipeline together
        </h1>

        <PageSection className="mt-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {TARGETS.map((t) => (
              <div key={t.title}>
                <h3 className="font-bold text-content">{t.title}</h3>
                <p className="mt-1 text-sm text-content-2">{t.body}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="How it works">
          <div className="grid gap-6 sm:grid-cols-3">
            {PROCESS.map((s, i) => (
              <div key={s.step} className="flex flex-col gap-3">
                <StepGraphic index={i} />
                <h3 className="font-bold text-content">{s.title}</h3>
                <p className="text-sm text-content-2">{s.body}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Get in touch">
          {submitted ? (
            <Alert tone="success" title="Thanks — we'll be in touch">
              We've received your inquiry and will reach out at the email you gave us.
            </Alert>
          ) : (
            <Card><CardBody>
              {error && <Alert tone="danger" className="mb-4">{error}</Alert>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Organization name" required value={form.org_name} onChange={set("org_name")} />
                <Input label="Your name" required value={form.contact_name} onChange={set("contact_name")} />
                <Input label="Email" type="email" required value={form.email} onChange={set("email")} />
                <Input label="Phone" type="tel" placeholder="+233…" value={form.phone} onChange={set("phone")} />
                <Select label="Organization type" value={form.inquiry_type} onChange={set("inquiry_type")} options={INQUIRY_TYPES} />
                <Textarea label="What did you have in mind?" rows={4} value={form.message} onChange={set("message")} />
                <Button type="submit" variant="accent" loading={submitting}>Send inquiry</Button>
              </form>
            </CardBody></Card>
          )}
        </PageSection>
      </div>
    </PublicShell>
  );
}
