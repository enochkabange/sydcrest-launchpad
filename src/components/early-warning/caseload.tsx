import Link from "@/components/ui/link";
import { Pill } from "@/components/mentor/fields";
import { logContact } from "@/lib/early-warning/actions";
import { CONTACT_PAST, LEVEL_LABEL, LEVEL_TONE, isContactKind, isRiskLevel, reasonText, type RiskDetail } from "@/lib/early-warning/rules";
import { LogContact } from "./log-contact";

export type CaseloadItem = RiskDetail & {
  profile_id: string;
  display_name: string | null;
  level: string;
  reasons: string[];
  last_active_on: string | null;
  last_contact_at: string | null;
  last_contact_kind: string | null;
  next_due_on?: string | null;
  /** Where the name links, when the viewer has a learner page for them. */
  href?: string;
};

const day = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Accra" }).format(
    new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso),
  );

/**
 * The early warning list (issues #325 and #330): one card per learner, in the
 * order given (sortCaseload), with the reasons in plain words, last contact,
 * next deadline and one tap contact logging.
 */
export function CaseloadList({ items, label }: { items: CaseloadItem[]; label: string }) {
  return (
    <ul aria-label={label} className="grid gap-3 lg:grid-cols-2">
      {items.map((it) => {
        const name = it.display_name?.trim() || "Unnamed learner";
        const level = isRiskLevel(it.level) ? it.level : "none";
        const contact =
          it.last_contact_at && isContactKind(it.last_contact_kind)
            ? `${CONTACT_PAST[it.last_contact_kind]} ${day(it.last_contact_at)}`
            : "No contact logged yet";
        return (
          <li key={it.profile_id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4" aria-label={name}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {it.href ? (
                <Link href={it.href} className="font-semibold text-content hover:underline">
                  {name}
                </Link>
              ) : (
                <span className="font-semibold text-content">{name}</span>
              )}
              <Pill tone={LEVEL_TONE[level]}>{LEVEL_LABEL[level]}</Pill>
            </div>
            {it.reasons.length > 0 && (
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
                {it.reasons.map((r) => (
                  <li key={r}>{reasonText(r, it)}</li>
                ))}
              </ul>
            )}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-content-3">Last active</dt>
                <dd className="text-content">{it.last_active_on ? day(it.last_active_on) : "Not yet"}</dd>
              </div>
              <div>
                <dt className="text-content-3">Last contact</dt>
                <dd className="text-content">{contact}</dd>
              </div>
              {it.next_due_on !== undefined && (
                <div>
                  <dt className="text-content-3">Next deadline</dt>
                  <dd className="text-content">{it.next_due_on ? day(it.next_due_on) : "None ahead"}</dd>
                </div>
              )}
            </dl>
            <LogContact action={logContact.bind(null, it.profile_id)} name={name} id={it.profile_id} />
          </li>
        );
      })}
    </ul>
  );
}
