import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { formatDeletionDate } from "@/lib/data-rights/dates";
import { LEGAL_VERSION } from "@/lib/legal";
import {
  ACTION_NOTICES,
  ROLES,
  auditActionLabel,
  consentLine,
  onCurrentTerms,
  parseConsents,
  parseMemberships,
  providersLabel,
} from "@/lib/people/console";
import type { Database } from "@/lib/supabase/database.types";
import { addSupportNote, resendConfirmation, setPaused, setRole } from "./actions";

type Account = Database["public"]["Functions"]["admin_learner_account"]["Returns"][number];
type Entry = Database["public"]["Functions"]["admin_audit_entries"]["Returns"][number];

const when = (iso: string | null | undefined) => (iso ? iso.slice(0, 16).replace("T", " ") : "Never");

function Card({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  const heading = `${id ?? title.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`;
  return (
    <section id={id} aria-labelledby={heading} className="flex scroll-mt-8 flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <h2 id={heading} className="text-h3 text-content">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Pairs({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 text-sm">
      {items.map(([k, v], i) => (
        <div key={`${k}-${i}`} className="contents">
          <dt className="text-content-2">{k}</dt>
          <dd className="text-end font-semibold text-content">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Feedback from the last action (?done= or ?error=). */
export function ActionNotice({ code }: { code: string | undefined }) {
  const notice = code ? ACTION_NOTICES[code] : undefined;
  return notice ? <Alert tone={notice.tone}>{notice.text}</Alert> : null;
}

/**
 * The people console part of the learner page (issue #332): account state,
 * consents, programmes and chapters, safe actions and this person's audit
 * trail. Passwords and tokens are never read.
 */
export function PeoplePanel({ account, entries, isSelf }: { account: Account; entries: Entry[]; isSelf: boolean }) {
  const id = account.profile_id;
  const consents = parseConsents(account.consents);
  const memberships = parseMemberships(account.memberships);
  const paused = Boolean(account.suspended_at);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Account">
          <Pairs
            items={[
              ["Email", <span key="e" className="break-all">{account.email ?? "None"}</span>],
              ["Email confirmed", account.email_confirmed_at ? `Yes, ${account.email_confirmed_at.slice(0, 10)}` : "No"],
              ["Signs in with", providersLabel(account.providers)],
              ["Last signed in", when(account.last_sign_in_at)],
              ["Phone", account.phone ?? "None"],
              ["Role", account.role + (account.is_skill_reviewer ? ", skill reviewer" : "")],
              ["State", paused ? `Paused since ${account.suspended_at!.slice(0, 10)}` : "Active"],
              ["Deletion", account.deletion_after ? `Asked, deletes ${formatDeletionDate(account.deletion_after)}` : "Not asked"],
            ]}
          />
        </Card>
        <Card title="Consents">
          <p className="text-sm text-content-2">
            Current terms version {LEGAL_VERSION}: {onCurrentTerms(consents, LEGAL_VERSION) ? "agreed" : "not agreed yet (they are asked on next sign in)"}.
          </p>
          {consents.length ? <Pairs items={consents.map(consentLine)} /> : <p className="text-sm text-content-2">No consent recorded.</p>}
        </Card>
        <Card title="Programmes and chapters">
          {memberships.length ? (
            <ul className="flex flex-col gap-2 text-sm">
              {memberships.map((m, i) => (
                <li key={`${m.kind}-${i}`} className="flex flex-col">
                  <span className="font-semibold text-content">{m.label}</span>
                  <span className="text-content-2">
                    {m.kind === "application" ? "Application" : m.kind === "cohort" ? "Cohort" : "Chapter"}
                    {m.role ? `, ${m.role}` : ""}, {m.status.replaceAll("_", " ")}, since {m.at.slice(0, 10)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-content-2">No applications, cohorts or chapters.</p>
          )}
        </Card>
      </div>

      <Card title="Help them" id="actions">
        <p className="text-sm text-content-2">Every action here is written to the audit log with your name.</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <form action={addSupportNote.bind(null, id)} className="flex flex-col gap-2">
            <TextAreaField id="support-note" name="note" label="Support note" hint="What they asked and what you did. Up to 500 characters." maxLength={500} required />
            <div>
              <Button type="submit">Save note</Button>
            </div>
          </form>

          <div className="flex flex-col gap-6">
            {!account.email_confirmed_at && (
              <form action={resendConfirmation.bind(null, id)} className="flex flex-col gap-2">
                <p className="text-sm text-content-2">Their email is not confirmed, so they cannot sign in with a password yet.</p>
                <div>
                  <Button type="submit" variant="secondary">
                    Resend confirmation email
                  </Button>
                </div>
              </form>
            )}

            <form action={setRole.bind(null, id)} className="flex flex-col gap-2">
              <SelectField id="role" label="Role" defaultValue={account.role}>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </SelectField>
              <TextField id="role-note" name="note" label="Why (optional)" maxLength={200} />
              <div>
                <Button type="submit" variant="secondary">
                  Change role
                </Button>
              </div>
            </form>

            {!isSelf && account.role !== "admin" && (
              <form action={setPaused.bind(null, id, !paused)} className="flex flex-col gap-2">
                <TextField id="pause-note" name="note" label={paused ? "Why reactivate (optional)" : "Why pause (optional)"} maxLength={200} />
                <div>
                  <Button type="submit" variant="secondary">
                    {paused ? "Reactivate account" : "Pause account"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Card>

      <section aria-labelledby="audit-heading" className="flex flex-col gap-3">
        <h2 id="audit-heading" className="text-h2 text-content">
          Audit log
        </h2>
        <p className="text-sm text-content-2">Who looked at or changed this account, newest first. Opening this page adds a line.</p>
        {entries.length ? (
          <ol className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {entries.map((e) => (
              <li key={e.id} className="flex flex-col gap-0.5 p-3 text-sm sm:flex-row sm:items-baseline sm:gap-4">
                <span className="shrink-0 font-semibold text-content">{auditActionLabel(e.action)}</span>
                <span className="min-w-0 flex-1 text-content-2">{e.note ?? ""}</span>
                <span className="shrink-0 text-content-3">{e.admin_name ?? "System"}</span>
                <time dateTime={e.at} className="shrink-0 text-content-3 tabular-nums">
                  {when(e.at)}
                </time>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-content-2">Nothing logged yet.</p>
        )}
      </section>
    </>
  );
}
