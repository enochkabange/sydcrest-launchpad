/** A deletion date as people read it in Ghana: "Saturday 21 November 2026". */
export function formatDeletionDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}
