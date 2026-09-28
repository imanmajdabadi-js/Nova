"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@/components/ui";
import { StarIcon } from "@/components/ui";
import { useHostExperiencesStore } from "@/lib/host-experiences-store";
import {
  checkReadiness,
  canTransition,
  getAllowedTransitions,
  statusLabels,
  statusVariants,
} from "@/data/experience-lifecycle";
import { findHostById } from "@/data/hosts";
import type {
  Experience,
  ExperienceSession,
  ExperienceStatus,
} from "@/data/experiences";
import { cn, type ExperiencePatch } from "@/lib";

function StatusPill({ status }: { status: ExperienceStatus }) {
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
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
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

function ReadinessBanner({ experience }: { experience: Experience }) {
  const readiness = useMemo(() => checkReadiness(experience), [experience]);

  if (readiness.isReady) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-success-soft px-4 py-2.5 text-sm text-success">
        <svg
          width="14"
          height="14"
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
        <span>آماده انتشار — تمام فیلدهای لازم تکمیل شده‌اند.</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-error-soft px-4 py-3 text-sm text-error">
      <div className="flex items-start gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <span className="font-medium">آماده نیست.</span>
          <span className="block mt-1">فیلدهای گمشده:</span>
          <ul className="mt-1 list-disc list-inside space-y-0.5">
            {readiness.missingFields.map((field) => (
              <li key={field}>• {field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SessionEditor({
  sessions,
  onChange,
}: {
  sessions: readonly ExperienceSession[];
  onChange: (sessions: ExperienceSession[]) => void;
}) {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const handleAdd = () => {
    if (!newDate.trim() || !newTime.trim() || !newCapacity) return;
    const capacity = parseInt(newCapacity, 10);
    if (isNaN(capacity) || capacity <= 0) return;
    const newSession: ExperienceSession = {
      id: `s-${Date.now()}`,
      date: newDate,
      time: newTime,
      remainingCapacity: capacity,
    };
    onChange([...sessions, newSession]);
    setNewDate("");
    setNewTime("");
    setNewCapacity("");
  };

  const handleRemove = (id: string) => {
    onChange(sessions.filter((s) => s.id !== id));
  };

  const handleCapacityChange = (id: string, value: string) => {
    const capacity = parseInt(value, 10);
    if (isNaN(capacity)) return;
    onChange(
      sessions.map((s) =>
        s.id === id ? { ...s, remainingCapacity: capacity } : s,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface-muted/30 p-4 text-center text-sm text-foreground-muted">
          <p>هیچ جلسه‌ای تنظیم نشده است.</p>
          <p className="mt-1 text-xs">
            حداقل یک جلسه با ظرفیت معتبر اضافه کنید.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <Input
                label="تاریخ"
                value={session.date}
                onChange={(e) =>
                  onChange(
                    sessions.map((s) =>
                      s.id === session.id ? { ...s, date: e.target.value } : s,
                    ),
                  )
                }
                className="flex-1"
              />
              <Input
                label="ساعت"
                value={session.time}
                onChange={(e) =>
                  onChange(
                    sessions.map((s) =>
                      s.id === session.id ? { ...s, time: e.target.value } : s,
                    ),
                  )
                }
                className="flex-1"
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-foreground">
                  ظرفیت
                </label>
                <input
                  type="number"
                  min={1}
                  value={session.remainingCapacity}
                  onChange={(e) =>
                    handleCapacityChange(session.id, e.target.value)
                  }
                  className="w-20 rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground focus:border-primary"
                  aria-label="ظرفیت جلسه"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(session.id)}
                className="text-error hover:text-error"
                aria-label="حذف جلسه"
              >
                حذف
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-dashed border-border p-4">
        <h4 className="mb-3 text-sm font-medium text-foreground">
          افزودن جلسه جدید
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Input
            label="تاریخ"
            placeholder="مثال: ۱۴۰۵/۰۸/۰۱"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Input
            label="ساعت"
            placeholder="مثال: ۱۴:۰۰"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <Input
            label="ظرفیت"
            type="number"
            min={1}
            placeholder="مثال: ۸"
            value={newCapacity}
            onChange={(e) => setNewCapacity(e.target.value)}
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={!newDate || !newTime || !newCapacity}
          className="mt-3 w-full"
        >
          افزودن جلسه
        </Button>
      </div>
    </div>
  );
}

export function HostExperienceEditor({
  experienceId,
  seedExperience,
}: {
  experienceId: string;
  seedExperience: Experience | undefined;
}) {
  const router = useRouter();
  const isHydrated = useHostExperiencesStore((state) => state.isHydrated);
  const updateExperiencePatch = useHostExperiencesStore(
    (state) => state.updateExperience,
  );
  const updateSessions = useHostExperiencesStore(
    (state) => state.updateSessions,
  );
  const setStatus = useHostExperiencesStore((state) => state.setStatus);
  const removeDraft = useHostExperiencesStore((state) => state.removeDraft);
  const getHostExperience = useHostExperiencesStore(
    (state) => state.getHostExperience,
  );

  const [sessionEdits, setSessionEdits] = useState<ExperienceSession[]>([]);
  const [isEditingSessions, setIsEditingSessions] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const experience = useMemo(() => {
    if (!isHydrated) {
      return seedExperience ?? null;
    }
    const fromStore = getHostExperience(experienceId);
    return fromStore ?? seedExperience ?? null;
  }, [isHydrated, experienceId, getHostExperience, seedExperience]);

  const isLoading = !isHydrated && !seedExperience;
  const isNew = !seedExperience;

  const host = useMemo(
    () => (experience ? findHostById(experience.hostId) : null),
    [experience?.hostId],
  );

  const readiness = useMemo(
    () => (experience ? checkReadiness(experience) : null),
    [experience],
  );

  const allowedTransitions = useMemo(
    () => (experience ? getAllowedTransitions(experience.status) : []),
    [experience?.status],
  );

  const formStateRef = useRef<{
    title: string;
    description: string;
    category: string;
    location: string;
    price: string;
    image: string;
  } | null>(null);

  if (experience && !formStateRef.current) {
    formStateRef.current = {
      title: experience.title ?? "",
      description: experience.description ?? "",
      category: experience.category ?? "",
      location: experience.location ?? "",
      price: experience.price > 0 ? String(experience.price) : "",
      image: experience.image ?? "",
    };
    setSessionEdits(Array.from(experience.sessions ?? []));
  }

  const title = formStateRef.current?.title ?? "";
  const description = formStateRef.current?.description ?? "";
  const category = formStateRef.current?.category ?? "";
  const location = formStateRef.current?.location ?? "";
  const price = formStateRef.current?.price ?? "";
  const image = formStateRef.current?.image ?? "";

  const handleSave = () => {
    if (!experience) return;
    setIsSaving(true);
    const patch: ExperiencePatch = {};
    if (title !== (experience.title ?? "")) patch.title = title || undefined;
    if (description !== (experience.description ?? ""))
      patch.description = description || undefined;
    if (category !== (experience.category ?? ""))
      patch.category = category || undefined;
    if (location !== (experience.location ?? ""))
      patch.location = location || undefined;
    if (price !== "" && parseInt(price, 10) !== experience.price) {
      patch.price = parseInt(price, 10);
    }
    if (image !== (experience.image ?? "")) patch.image = image || undefined;

    if (Object.keys(patch).length > 0) {
      updateExperiencePatch(experience.id, patch);
    }
    setIsSaving(false);
  };

  const handleStatusChange = (next: ExperienceStatus) => {
    if (!experience) return;
    if (!canTransition(experience.status, next)) return;
    if (next === "published" && !readiness?.isReady) return;
    setStatus(experience.id, next);
  };

  const handleDeleteDraft = () => {
    if (!experience) return;
    removeDraft(experience.id);
    router.replace("/dashboard/host/experiences");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-surface-muted" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded border border-border bg-surface"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-foreground-muted">تجربه یافت نشد.</p>
      </div>
    );
  }

  const handleSessionChange = (newSessions: ExperienceSession[]) => {
    setSessionEdits(newSessions);
  };

  const handleSaveSessions = () => {
    updateSessions(experience.id, sessionEdits);
    setIsEditingSessions(false);
  };

  const handleCancelSessions = () => {
    setSessionEdits(Array.from(experience.sessions || []));
    setIsEditingSessions(false);
  };

  const displaySessions = isEditingSessions
    ? sessionEdits
    : Array.from(experience.sessions || []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? "ساخت تجربه جدید" : "ویرایش تجربه"}
          </h1>
          {isNew && (
            <p className="mt-1 text-sm text-foreground-muted">
              این تجربه در وضعیت پیش‌نویس است. اطلاعات خود را تکمیل کنید و سپس
              منتشر کنید.
            </p>
          )}
        </div>
        <StatusPill status={experience.status} />
      </div>

      {host && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-muted">
            {host.avatar && (
              <Image
                src={host.avatar}
                alt={host.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{host.name}</p>
            {host.verified && (
              <span className="text-xs text-success">✓ میزبان تأیید شده</span>
            )}
            {host.bio && (
              <p className="text-xs text-foreground-muted">{host.bio}</p>
            )}
          </div>
        </div>
      )}

      <ReadinessBanner experience={experience} />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            اطلاعات پایه
          </h2>
          <div className="mt-4 space-y-4">
            <Input
              label="عنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="نام تجربه خود را وارد کنید"
              required
              error={title === "" && isNew ? "عنوان الزامی است" : undefined}
            />
            <Textarea
              label="توضیحات"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیح دهید چه چیزی در انتظار مهمانان است..."
              rows={5}
              required
            />
            <Input
              label="دسته‌بندی"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="مثال: آشپزی، تور شهری، کارگاه"
              required
            />
            <Input
              label="موقعیت"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="مثال: تهران، باغ نیاوران"
              required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="قیمت (تومان)"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="مثال: 2500000"
              />
              <Input
                label="URL عکس اصلی"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">جلسات</h2>
            {experience.status === "published" && !isEditingSessions && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSessionEdits(Array.from(experience.sessions || []));
                  setIsEditingSessions(true);
                }}
              >
                ویرایش جلسات
              </Button>
            )}
          </div>

          <div className="mt-4">
            {isEditingSessions ? (
              <div className="space-y-4">
                <SessionEditor
                  sessions={sessionEdits}
                  onChange={handleSessionChange}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveSessions}>
                    ذخیره جلسات
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelSessions}
                  >
                    لغو
                  </Button>
                </div>
              </div>
            ) : (
              <SessionEditor
                sessions={displaySessions}
                onChange={setSessionEdits}
              />
            )}
          </div>
        </div>

        {experience.rating !== undefined &&
          experience.rating > 0 &&
          experience.reviews > 0 && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-2 text-sm font-medium text-foreground-muted">
                امتیاز و نظرات (فقط خواندنی)
              </h3>
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-warning" />
                <span className="font-medium text-foreground">
                  {experience.rating} از ۵
                </span>
                <span className="text-sm text-foreground-muted">
                  ({experience.reviews} نظر)
                </span>
              </div>
            </div>
          )}

        <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
          <div className="space-y-1">
            <h3 className="font-medium text-foreground">وضعیت انتشار</h3>
            <p className="text-sm text-foreground-muted">
              {statusLabels[experience.status]}
              {readiness?.isReady
                ? " — آماده انتشار"
                : readiness?.missingFields.length
                  ? ` — آماده نیست: ${readiness.missingFields.join(", ")}`
                  : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isNew && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteDraft}
              >
                حذف پیش‌نویس
              </Button>
            )}
            {allowedTransitions.map((next) => {
              if (next === experience.status) return null;
              const isNextPublish = next === "published";
              return (
                <Button
                  key={next}
                  size="sm"
                  variant={
                    next === "paused"
                      ? "secondary"
                      : next === "published"
                        ? "primary"
                        : "outline"
                  }
                  onClick={() => handleStatusChange(next)}
                  disabled={isNextPublish && !readiness?.isReady}
                >
                  {next === "paused"
                    ? "متوقف"
                    : next === "published"
                      ? "منتشر"
                      : "پیش‌نویس"}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            size="md"
            onClick={handleSave}
            loading={isSaving}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}
