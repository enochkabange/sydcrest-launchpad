import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { RoadmapForm } from "../roadmap-form";

export const metadata: Metadata = { title: "New roadmap" };

/** The layout gate checks the admin role; createRoadmap checks it again on submit. */
export default function NewRoadmapPage() {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Link href="/admin/roadmaps" className="inline-flex min-h-11 items-center text-sm text-content-link">
        Back to roadmaps
      </Link>
      <h1 className="text-title text-content">New roadmap</h1>
      <p className="text-content-2">New roadmaps start as drafts. Learners see them only after you publish.</p>
      <RoadmapForm />
    </div>
  );
}
