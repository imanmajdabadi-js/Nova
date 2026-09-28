"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useHostExperiencesStore } from "@/lib/host-experiences-store";
import { checkReadiness } from "@/data/experience-lifecycle";
import type { Experience, ExperienceStatus } from "@/data/experiences";
import {
  statusLabels,
  statusVariants,
  canTransition,
  getAllowedTransitions,
} from "@/data/experience-lifecycle";
import { cn } from "@/lib";

type FilterKey = "all" | ExperienceStatus;

const filterTabs: { value: FilterKey; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "draft", label: "پیش‌نویس" },
  { value: "published", label: "منتشر شده" },
  { value: "paused", label: "متوقف" },
];

function StatusIndicator({ status }: { status: ExperienceStatus }) {
  const label = statusLabels[status];
  const icon =
    status === "published" ? (
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
    ) : status === "paused" ? (
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <rect x="5" y="5" width="14" height="14" rx="2" />
      </svg>
    ) : (
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
        <path d="M9 18h6" />
        <path d="M12 5v13" />
      </svg>
    );

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        statusVariants[status] === "success" && "bg-success-soft text-success",
        statusVariants[status] === "warning" && "bg-warning-soft text-warning",
        statusVariants[status] === "info" && "bg-info-soft text-info",
      )}
      aria-label={`وضعیت: ${label}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}

function ReadinessIndicator({ experience }: { experience: Experience }) {
  const readiness = useMemo(() => checkReadiness(experience), [experience]);

  if (readiness.isReady) {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success"
        aria-label="آماده انتشار"
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
        <span>آماده انتشار</span>
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span
        className="inline-flex items-center gap-1 rounded-full bg-error-soft px-2.5 py-1 text-xs font-medium text-error"
        aria-label="آماده نیست"
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>آماده نیست</span>
      </span>
      <details className="text-xs text-foreground-muted open:text-foreground/90">
        <summary className="cursor-pointer list-none">
          <span className="underline decoration-dotted">
            اطلاعات گمشده ({readiness.missingFields.length})
          </span>
        </summary>
        <ul className="mt-1 space-y-0.5 pr-3">
          {readiness.missingFields.map((field) => (
            <li key={field} className="list-disc">
              • {field}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function HostExperienceCard({
  experience,
  onStatusChange,
}: {
  experience: Experience;
  onStatusChange: (experienceId: string, next: ExperienceStatus) => void;
}) {
  const sessionCount = experience.sessions?.length ?? 0;
  const hasAvailableSessions = experience.sessions?.some(
    (s) => s.remainingCapacity > 0,
  );
  const readiness = useMemo(() => checkReadiness(experience), [experience]);
  const allowedTransitions = useMemo(
    () => getAllowedTransitions(experience.status),
    [experience.status],
  );

  return (
    <article className="group grid grid-cols-12 gap-4 items-center rounded-xl border border-border bg-surface p-5 transition-shadow duration-150 hover:shadow-medium">
      <div className="col-span-12 sm:col-span-5 flex items-center gap-4">
        <div className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
          {experience.image ? (
            <Image
              src={experience.image}
              alt={experience.title || "تجربه بدون عنوان"}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-foreground-subtle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M6 8h12" />
                <path d="M6 14h12" />
              </svg>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {experience.title || "بدون عنوان"}
          </h3>
          <p className="text-xs text-foreground-muted truncate">
            {experience.location}
          </p>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-3 flex flex-col gap-2 text-sm">
        <StatusIndicator status={experience.status} />
        <ReadinessIndicator experience={experience} />
      </div>

      <div className="col-span-12 sm:col-span-2 text-sm text-foreground-muted">
        <span>{sessionCount} جلسه</span>
        {!hasAvailableSessions && sessionCount > 0 && (
          <span className="block text-xs text-error">
            همه‌ی جلسات پر شده‌اند
          </span>
        )}
      </div>

      <div className="col-span-12 sm:col-span-2 flex flex-col gap-2">
        <Link
          href={`/dashboard/host/experiences/${experience.id}`}
          className="text-center text-sm font-medium text-primary hover:underline"
        >
          ویرایش
        </Link>

        {allowedTransitions.length > 1 && (
          <div className="flex gap-1">
            {allowedTransitions
              .filter((t) => t !== experience.status)
              .filter((t) => {
                if (t === "published") return readiness.isReady;
                return true;
              })
              .map((next) => (
                <button
                  key={next}
                  onClick={() => onStatusChange(experience.id, next)}
                  className={cn(
                    "px-2 py-1 text-xs rounded font-medium transition-colors",
                    next === "paused"
                      ? "text-info bg-info-soft hover:bg-info-soft/80"
                      : next === "published"
                        ? "text-success bg-success-soft hover:bg-success-soft/80"
                        : "text-warning bg-warning-soft hover:bg-warning-soft/80",
                  )}
                >
                  {next === "paused"
                    ? "متوقف"
                    : next === "published"
                      ? "منتشر"
                      : "پیش‌نویس"}
                </button>
              ))}
          </div>
        )}
      </div>
    </article>
  );
}

function HostExperiencesEmpty({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
        <svg
          className="h-10 w-10 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 01.708.292l.04.063m-.041-.878a.75.75 0 00-1.5.75z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 15.385v-3.51a2.25 2.25 0 00-1.029-1.875l-.324-.186a.75.75 0 01-.375-.58V8.25a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.75a.75.75 0 01-.375.58l-.324.186a2.25 2.25 0 00-1.029 1.875v3.51a2.25 2.25 0 01-1.029 1.875l-.324.186a.75.75 0 01-.375.58v1.75a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75v-1.75a.75.75 0 01.375-.58l.324-.186a2.25 2.25 0 001.029-1.875v-.369A3.375 3.375 0 0121 12.855v.53a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.75a.75.75 0 01.375-.58l.324-.186a2.25 2.25 0 001.029-1.875z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">
        تجربه‌ای در حال مدیریت نیست
      </h2>
      <p className="text-foreground-muted max-w-sm mb-8 leading-relaxed">
        هنوز هیچ تجربه‌ای ایجاد نکرده‌اید. اولین تجربه‌تان را بسازید.
      </p>
      <Button variant="primary" size="lg" onClick={onCreate}>
        ساخت اولین تجربه
      </Button>
    </div>
  );
}

export function HostExperiencesList({
  seedExperiences,
}: {
  seedExperiences: readonly Experience[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>("all");
  const isHydrated = useHostExperiencesStore((state) => state.isHydrated);
  const setStatus = useHostExperiencesStore((state) => state.setStatus);
  const createExperience = useHostExperiencesStore(
    (state) => state.createExperience,
  );

  const experiences = useMemo(() => {
    if (!isHydrated) {
      return seedExperiences;
    }
    return useHostExperiencesStore.getState().getHostExperiences();
  }, [isHydrated, seedExperiences]);

  const handleCreateNew = () => {
    const newExp = createExperience();
    router.replace(`/dashboard/host/experiences/${newExp.id}`);
  };

  const handleStatusChange = (experienceId: string, next: ExperienceStatus) => {
    const exp = useHostExperiencesStore
      .getState()
      .getHostExperience(experienceId);
    if (!exp) return;
    if (!canTransition(exp.status, next)) return;
    if (next === "published" && !checkReadiness(exp).isReady) return;
    setStatus(experienceId, next);
  };

  const filtered = useMemo(() => {
    if (filter === "all") return experiences;
    return experiences.filter((e) => e.status === filter);
  }, [experiences, filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 overflow-x-auto rounded-lg border border-border p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
                filter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface-interactive",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={handleCreateNew}>
          + تجربه جدید
        </Button>
      </div>

      {experiences.length === 0 ? (
        <HostExperiencesEmpty onCreate={handleCreateNew} />
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-foreground-muted">
          <p className="text-lg">تجربه‌ای با فیلتر انتخابی یافت نشد.</p>
          <p className="mt-2 text-sm">
            فیلتر خود را تغییر دهید یا تجربه جدیدی بسازید.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((experience) => (
            <HostExperienceCard
              key={experience.id}
              experience={experience}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
