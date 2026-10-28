import { initialsOf } from "@/components/social/profile-bits";
import { STATUS_LABEL, STATUS_TONE, type BookingStatus } from "@/lib/bookings/model";

/** Server safe pieces shared by the inbox and the thread page. */

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

const SIZE = { sm: "size-9 text-sm", md: "size-12 text-base" } as const;

/** A member's own photo when they set one, else their initials. */
export function PersonAvatar({ name, avatarUrl, size = "sm" }: { name: string; avatarUrl: string | null; size?: keyof typeof SIZE }) {
  if (avatarUrl) {
    // An external avatar (Google sign in); next/image would need every host allow listed.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt="" className={`shrink-0 rounded-full object-cover ring-1 ring-line ${SIZE[size]}`} />;
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-surface-sunken font-semibold text-content-2 ring-1 ring-line ${SIZE[size]}`}
    >
      {initialsOf(name)}
    </span>
  );
}
