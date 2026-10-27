/** "27 October 2026", in Ghana time. */
export function formatIssued(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}
