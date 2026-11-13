/**
 * Pages made to be printed (chapter posters, #335): no site header, tab bar
 * or footer, so what is on screen is what goes on paper.
 */
export default function PrintLayout({ children }: LayoutProps<"/">) {
  return <main className="flex flex-1 flex-col bg-surface">{children}</main>;
}
