import Logo from "@/components/brand/Logo";
import { HeroGraphic } from "@/components/brand/illustrations";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-16 md:flex-row md:items-center md:px-8">
      <div className="flex flex-col gap-6">
        <Logo size={44} />
        <h1 className="text-4xl text-content md:text-5xl">Find your path into tech.</h1>
        <p className="max-w-prose text-lg text-content-2">
          Free roadmaps written for the Ghanaian job market, a community that learns
          together, and mentors who have done it before. We are rebuilding the
          platform now.
        </p>
      </div>
      <HeroGraphic className="mx-auto w-64 shrink-0 md:w-80" />
    </main>
  );
}
