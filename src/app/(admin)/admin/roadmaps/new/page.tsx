import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { AdminOnly } from "../../admin-only";
import { RoadmapForm } from "../roadmap-form";

export const metadata: Metadata = { title: "New roadmap" };

/** The form shows only to admins; createRoadmap checks the role again on submit. */
export default function NewRoadmapPage() {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Link href="/admin/roadmaps" className="inline-flex min-h-11 items-center text-sm text-content-link">
        Back to roadmaps
      </Link>
      <h1 className="text-title text-content">New roadmap</h1>
      <p className="text-content-2">New roadmaps start as drafts. Learners see them only after you publish.</p>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <AdminOnly>
          <RoadmapForm />
        </AdminOnly>
      </Suspense>
    </div>
  );
}
