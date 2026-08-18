/**
 * Apply — public application form, PLATFORM_SPEC.md §3. No auth: an
 * applicant doesn't have an account yet. Core fields are fixed across
 * every program (no per-program form builder — see the Programs PR's own
 * scope note on the same "no second program exists yet" reasoning); only
 * the screening test varies, sourced from the program itself.
 *
 * Screening question UI mirrors PathDetail.jsx's QuizBlock (button-per-
 * option, single choice) rather than inventing a second pattern — this
 * one just tracks a selection instead of grading client-side, since
 * scoring happens server-side on submit.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardBody, Input, Select, Textarea, Button, Alert, PageLoader } from "../components/ui/index.js";
import PublicShell from "../components/public/PublicShell.jsx";

const REGIONS = [
  "Northern", "North East", "Savannah", "Upper East", "Upper West",
  "Greater Accra", "Ashanti", "Western", "Eastern", "Central", "Volta", "Bono", "Other",
];
const GENDERS = ["Female", "Male", "Other", "Prefer not to say"];

export default function Apply() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", date_of_birth: "", region: "", gender: "", is_underserved: false, essay: "",
  });
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState(null);

  useEffect(() => {
    api.get(`/api/programs/${slug}`)
      .then(({ program }) => setProgram(program))
      .catch((err) => (err instanceof ApiError && err.status === 404 ? setNotFound(true) : setError("Couldn't load this program.")));
  }, [slug]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const questions = program?.screening_test?.questions ?? [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { reference_code } = await api.post("/api/applications", {
        program_id: program.id,
        ...form,
        screening_answers: questions.length ? questions.map((_, i) => answers[i]) : undefined,
      });
      setReferenceCode(reference_code);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your application. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (notFound) {
    return (
      <PublicShell>
        <div className="flex items-center justify-center px-4 py-16">
          <Alert tone="danger" title="Program not found">This application isn't open, or the link is wrong.</Alert>
        </div>
      </PublicShell>
    );
  }
  if (!program && !error) return <PublicShell><PageLoader message="Loading…" /></PublicShell>;

  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {referenceCode ? (
          <Card>
            <CardBody className="flex flex-col gap-3">
              <Alert tone="success" title="Application submitted">
                We'll review it and let you know. Save your reference code below to check your status anytime.
              </Alert>
              <div className="rounded-md border border-line bg-surface-sunken px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-widest text-content-3">Reference code</p>
                <p className="mt-1 text-2xl font-black tracking-wide text-content">{referenceCode}</p>
              </div>
              <p className="text-sm text-content-2">
                Check your status anytime at <Link to="/apply/status" className="text-content-link font-medium">the status page</Link>{" "}
                using this code and the email you applied with.
              </p>
            </CardBody>
          </Card>
        ) : (
          <Page title={`Apply — ${program.name}`} description={program.description} width="wide" className="!px-0 !py-0">
            {error && <Alert tone="danger" className="mb-4">{error}</Alert>}

            <PageSection>
              <Card><CardBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input label="Full name" required value={form.full_name} onChange={set("full_name")} />
                  <Input label="Email" type="email" required value={form.email} onChange={set("email")} />
                  <Input label="Phone" type="tel" placeholder="+233…" value={form.phone} onChange={set("phone")} />
                  <Input label="Date of birth" type="date" value={form.date_of_birth} onChange={set("date_of_birth")} />
                  <Select label="Region" value={form.region} onChange={set("region")} options={[{ value: "", label: "Select…" }, ...REGIONS.map((r) => ({ value: r, label: r }))]} />
                  <Select label="Gender" value={form.gender} onChange={set("gender")} options={[{ value: "", label: "Select…" }, ...GENDERS.map((g) => ({ value: g, label: g }))]} />
                  <label className="flex items-center gap-2 text-sm text-content">
                    <input type="checkbox" checked={form.is_underserved} onChange={set("is_underserved")} />
                    I'm applying from an underserved or low-income community
                  </label>
                  <Textarea label="Why do you want to join?" required rows={5} value={form.essay} onChange={set("essay")} />

                  {questions.length > 0 && (
                    <div className="flex flex-col gap-4 rounded-md border border-line p-4">
                      <p className="text-sm font-bold text-content">Quick screening questions</p>
                      {questions.map((q, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <p className="text-sm font-semibold text-content">{i + 1}. {q.question}</p>
                          <div className="flex flex-col gap-1">
                            {q.options.map((opt, oi) => (
                              <button
                                key={oi}
                                type="button"
                                onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                                className={`rounded-md border px-3 py-1.5 text-left text-sm transition-colors ${
                                  answers[i] === oi ? "border-[var(--color-brand)] bg-surface-sunken text-content" : "border-line text-content-2"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button type="submit" variant="accent" loading={submitting}>Submit application</Button>
                </form>
              </CardBody></Card>
            </PageSection>
          </Page>
        )}
      </div>
    </PublicShell>
  );
}
