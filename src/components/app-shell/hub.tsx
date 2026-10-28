import { Suspense } from "react";
import Link from "@/components/ui/link";
import { AutoGrid } from "@/components/ui/layout";
import { canSee, groupById, NO_ROLES, type GroupId, type NavItem } from "@/lib/nav/config";
import { getNavViewer } from "@/lib/nav/viewer";

/**
 * Hub pages (issue #190): what a phone tab opens. Each lists its group's
 * destinations from src/lib/nav/config.ts as cards, so everything is two taps
 * from anywhere. The cards everyone sees are static; role items (Mentor
 * console, Expert dashboard, Organisation) stream in from their own island.
 */

function HubCard({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <li className="relative flex gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:bg-surface-sunken xl:p-5">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-info-bg text-info-fg">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-h3 text-content">
          <Link href={item.href} className="no-underline after:absolute after:inset-0 after:content-['']">
            {item.label}
          </Link>
        </h2>
        <p className="text-sm text-content-2">{item.description}</p>
      </div>
    </li>
  );
}

/** Items only some viewers see. `everyone` items are the static part of the hub. */
const isGated = (item: NavItem) => (item.audience ?? "everyone") !== "everyone";

async function GatedCards({ id }: { id: GroupId }) {
  const roles = (await getNavViewer())?.roles ?? NO_ROLES;
  return (
    <>
      {groupById(id)
        .items.filter((item) => isGated(item) && canSee(item, roles))
        .map((item) => (
          <HubCard key={item.href} item={item} />
        ))}
      {/* Marks the role items as streamed in, for e2e. Never shown. */}
      <li hidden data-testid="hub-roles-ready" />
    </>
  );
}

/**
 * True when every viewer gets at least one role card (Mentors: Expert
 * dashboard or Become an expert), so a placeholder card holds its place
 * without ever vanishing. Otherwise the cards appear without one.
 */
const alwaysGated = (items: NavItem[]) =>
  items.some((i) => i.audience === "expert") && items.some((i) => i.audience === "notExpert");

export function HubPage({ id }: { id: GroupId }) {
  const group = groupById(id);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">{group.label}</h1>
        <p className="text-lead text-content-2">{group.description}</p>
      </div>
      <AutoGrid as="ul" min="md">
        {group.items.filter((item) => !isGated(item)).map((item) => (
          <HubCard key={item.href} item={item} />
        ))}
        <Suspense fallback={alwaysGated(group.items) ? <li aria-hidden="true" className="min-h-24 animate-skeleton rounded-lg bg-surface-sunken" /> : null}>
          <GatedCards id={id} />
        </Suspense>
      </AutoGrid>
    </div>
  );
}

/**
 * A compact row of a group's destinations, for a hub whose landing page is
 * itself one of them (Community: the feed). `current` is the destination the
 * page belongs to (the feed for a post too), marked with aria-current="true".
 */
export function HubStrip({ id, current }: { id: GroupId; current: string }) {
  const group = groupById(id);
  return (
    <nav aria-label={group.label}>
      <ul className="flex flex-wrap gap-2">
        {group.items
          .filter((item) => !isGated(item))
          .map(({ href, label, icon: Icon }) => {
            const active = href === current;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold no-underline ${
                    active ? "border-transparent bg-info-bg text-info-fg" : "border-line text-content-2 hover:bg-surface-sunken hover:text-content"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
