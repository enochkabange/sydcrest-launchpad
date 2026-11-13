/**
 * Bare frame for pages made to be printed or saved as PDF (#329): no app
 * navigation, a white page, the reading width. The browser's print dialog
 * does the PDF; there is no PDF library.
 */
export default function PrintLayout({ children }: LayoutProps<"/">) {
  return <main className="mx-auto w-full max-w-page flex-1 bg-surface px-4 py-8 md:px-8 print:max-w-none print:p-0">{children}</main>;
}
