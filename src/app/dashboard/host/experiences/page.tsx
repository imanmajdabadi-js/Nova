import { Suspense } from "react";
import { findExperiencesByHost } from "@/data/experiences";
import { findHostById } from "@/data/hosts";
import { HostExperiencesList } from "@/components/domain/host-experiences-list";

const demoHostId = "h1";

const pageDescription =
  "تجربه‌های شما در یک نگاه. وضعیت، آمادگی و اقدامات را مدیریت کنید.";

export default function HostExperiencesPage() {
  const host = findHostById(demoHostId);
  const seedExperiences = findExperiencesByHost(demoHostId);

  if (!host) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            میزبان یافت نشد
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              تجربه‌های من
            </h1>
            {host.verified && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-medium text-success"
                aria-label="میزبان تأیید شده"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>تأیید شده</span>
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground-muted">
            {pageDescription}
          </p>
        </header>

        <Suspense
          fallback={
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-xl border border-border bg-surface"
                />
              ))}
            </div>
          }
        >
          <HostExperiencesList seedExperiences={seedExperiences} />
        </Suspense>
      </div>
    </div>
  );
}
