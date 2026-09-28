import { use } from "react";
import Link from "next/link";
import { HostExperienceEditor } from "@/components/domain/host-experience-editor";
import { findExperienceById } from "@/data/experiences";

export default function HostExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const seedExperience = findExperienceById(id);

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted">
          <Link
            href="/dashboard/host/experiences"
            className="hover:text-foreground"
          >
            تجربه‌های من
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">
            {seedExperience?.title || id}
          </span>
        </nav>

        <HostExperienceEditor
          experienceId={id}
          seedExperience={seedExperience}
        />
      </div>
    </div>
  );
}
