import type { Experience, ExperienceStatus } from "@/data/experiences";

export type { ExperienceStatus };

export const statusLabels: Record<ExperienceStatus, string> = {
  draft: "پیش‌نویس",
  published: "منتشر شده",
  paused: "متوقف",
};

export const statusVariants: Record<
  ExperienceStatus,
  "warning" | "success" | "info"
> = {
  draft: "warning",
  published: "success",
  paused: "info",
};

const validTransitions: Record<ExperienceStatus, ExperienceStatus[]> = {
  draft: ["published"],
  published: ["published", "paused"],
  paused: ["published"],
};

export function canTransition(
  from: ExperienceStatus,
  to: ExperienceStatus,
): boolean {
  return from === to || validTransitions[from].includes(to);
}

export function getAllowedTransitions(
  from: ExperienceStatus,
): readonly ExperienceStatus[] {
  return validTransitions[from];
}

export interface ExperienceReadiness {
  readonly isReady: boolean;
  readonly missingFields: readonly string[];
}

export function checkReadiness(experience: Experience): ExperienceReadiness {
  const missing: string[] = [];

  if (!experience.title?.trim()) {
    missing.push("عنوان");
  }

  if (!experience.description?.trim()) {
    missing.push("توضیحات");
  }

  if (!experience.category?.trim()) {
    missing.push("دسته‌بندی");
  }

  if (!experience.location?.trim()) {
    missing.push("موقعیت");
  }

  if (experience.price < 0) {
    missing.push("قیمت");
  }

  const hasImage = !!experience.image || (experience.images?.length ?? 0) > 0;
  if (!hasImage) {
    missing.push("عکس");
  }

  if (!experience.host?.name?.trim()) {
    missing.push("اطلاعات میزبان");
  }

  const hasValidSession = experience.sessions.some(
    (s) => s.date?.trim() && s.time?.trim() && s.remainingCapacity > 0,
  );
  if (!hasValidSession) {
    missing.push("جلسه فعال");
  }

  return {
    isReady: missing.length === 0,
    missingFields: missing,
  };
}

export function canPublish(experience: Experience): boolean {
  return checkReadiness(experience).isReady;
}
