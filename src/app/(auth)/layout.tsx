import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-4 py-12">
      <Link href="/" aria-label="SydCrest Launchpad home" className="self-start">
        <Logo size={36} />
      </Link>
      {children}
    </main>
  );
}
