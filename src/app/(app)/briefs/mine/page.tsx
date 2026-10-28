import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BriefStatusPill, KindPill, PageHeading, PitchStatusPill, Skeleton, pitchCount } from "@/components/briefs/brief-bits";
import { buttonClasses } from "@/components/ui/button";
import { DataTable, SectionGrid, rowLinkClass } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { budgetLabel, formatDate } from "@/lib/briefs/briefs";
import { getMyBriefs, getMyPitches, getViewer, type Brief, type MyPitch } from "@/lib/briefs/queries";

export const metadata: Metadata = { title: "Your briefs and pitches", robots: { index: false } };

/**
 * Briefs the viewer (or their organisation) posted, and pitches they sent as
 * an expert. Two tables side by side from xl, stacked below.
 */
export default function MyBriefsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        eyebrow="Briefs"
        title="Your briefs and pitches"
        actions={
          <>
            <Link href="/briefs/new" className={buttonClasses("primary")}>
              Post a brief
            </Link>
            <Link href="/briefs" className={buttonClasses("secondary")}>
              Brief board
            </Link>
          </>
        }
      />
      <Suspense
        fallback={
          <div className="grid gap-8 xl:grid-cols-2">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        }
      >
        <Lists />
      </Suspense>
    </div>
  );
}

async function Lists() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/briefs/mine")}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent("/briefs/mine")}`);
  const [viewer, briefs, pitches] = await Promise.all([getViewer(user.id), getMyBriefs(), getMyPitches(user.id)]);
  const showPitches = viewer.isApprovedExpert || pitches.length > 0;

  return (
    <div className={showPitches ? "grid gap-8 xl:grid-cols-2 xl:items-start" : "flex flex-col gap-8"}>
      <section aria-labelledby="my-briefs" className="flex min-w-0 flex-col gap-4">
        <h2 id="my-briefs" className="text-subtitle text-content">
          Briefs you posted
        </h2>
        {briefs.length === 0 ? (
          <Empty
            title="You have not posted a brief yet"
            body="Post one when you need advice or help with a piece of work. Experts with matching skills will pitch."
            action={
              <Link href="/briefs/new" className={buttonClasses("secondary")}>
                Post a brief
              </Link>
            }
          />
        ) : (
          <DataTable<Brief>
            caption="Briefs you posted"
            rows={briefs}
            rowKey={(b) => b.id}
            columns={[
              {
                header: "Brief",
                cell: (b) => (
                  <div className="flex min-w-0 flex-col gap-1">
                    <Link href={`/briefs/${b.id}`} className={`font-semibold text-content hover:underline ${rowLinkClass}`}>
                      {b.title}
                    </Link>
                    <span className="text-xs text-content-3">
                      {b.organisation_name ? `${b.organisation_name}, ` : ""}posted {formatDate(b.created_at)}
                    </span>
                  </div>
                ),
                className: "min-w-0 flex-1",
              },
              { header: "Kind", cell: (b) => <KindPill kind={b.kind} />, phone: "hide" },
              { header: "Pitches", cell: (b) => pitchCount(b.pitch_count ?? 0), phone: "hide", className: "text-sm whitespace-nowrap text-content-2" },
              { header: "Status", cell: (b) => <BriefStatusPill status={b.status} /> },
            ]}
          />
        )}
      </section>

      {showPitches ? (
        <section aria-labelledby="my-pitches" className="flex min-w-0 flex-col gap-4">
          <h2 id="my-pitches" className="text-subtitle text-content">
            Your pitches
          </h2>
          {pitches.length === 0 ? (
            <Empty
              title="You have not pitched yet"
              body="Open briefs that match your skills are on the brief board, and we notify you when a new one is posted."
              action={
                <Link href="/briefs" className={buttonClasses("secondary")}>
                  See open briefs
                </Link>
              }
            />
          ) : (
            <DataTable<MyPitch>
              caption="Your pitches"
              rows={pitches}
              rowKey={(p) => p.id}
              columns={[
                {
                  header: "Brief",
                  cell: (p) => (
                    <div className="flex min-w-0 flex-col gap-1">
                      <Link href={`/briefs/${p.briefId}`} className={`font-semibold text-content hover:underline ${rowLinkClass}`}>
                        {p.brief?.title ?? "A brief"}
                      </Link>
                      <span className="text-xs text-content-3">Sent {formatDate(p.createdAt)}</span>
                    </div>
                  ),
                  className: "min-w-0 flex-1",
                },
                {
                  header: "Your price",
                  cell: (p) => budgetLabel(p.indicativePriceGhs)?.replace(" (indicative)", "") ?? "Not given",
                  phone: "hide",
                  className: "text-sm whitespace-nowrap text-content-2",
                },
                {
                  header: "Status",
                  cell: (p) =>
                    p.bookingId ? (
                      <Link
                        href={`/bookings/${p.bookingId}`}
                        className="relative z-10 inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline"
                      >
                        Open the booking
                      </Link>
                    ) : (
                      <PitchStatusPill status={p.status} />
                    ),
                },
              ]}
            />
          )}
        </section>
      ) : (
        <SectionGrid cols={2}>
          <Note title="Want to pitch on briefs?">
            Approved experts see open briefs and pitch on them. Browse the experts already helping on SydCrest to see how it works.
            <Link href="/experts" className="mt-2 inline-flex min-h-11 items-center font-semibold text-content-link underline">
              Meet the experts
            </Link>
          </Note>
          <Note title="Posting for an organisation?">
            Verified organisations post job briefs. Their owners, admins and recruiters choose the organisation when they post.
          </Note>
        </SectionGrid>
      )}
    </div>
  );
}

function Empty({ title, body, action }: { title: string; body: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line-strong p-6 xl:p-8">
      <p className="font-semibold text-content">{title}</p>
      <p className="max-w-reading text-content-2">{body}</p>
      {action}
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-1 rounded-lg border border-line bg-surface-sunken p-5">
      <h3 className="font-semibold text-content">{title}</h3>
      <div className="flex flex-col items-start text-sm text-content-2">{children}</div>
    </section>
  );
}
