import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const urbanist = localFont({
  src: "./fonts/urbanist-variable.woff2",
  weight: "300 900",
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "SydCrest Launchpad",
    template: "%s · SydCrest Launchpad",
  },
  description:
    "Find your path into tech, learn with people beside you, and earn from your skills. Built in Northern Ghana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
