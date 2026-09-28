import { useMemo } from "react";
import { useHostExperiencesStore } from "@/lib/host-experiences-store";
import {
  experiences,
  findExperienceById,
  findExperienceBySlug,
} from "@/data/experiences";
import type {
  Experience,
  ExperienceSession,
  ExperienceStatus,
} from "@/data/experiences";

export function useCanonicalExperiences(): {
  experiences: readonly Experience[];
  isHydrated: boolean;
} {
  const isHydrated = useHostExperiencesStore((state) => state.isHydrated);
  const getCanonicalExperiences = useHostExperiencesStore(
    (state) => state.getCanonicalExperiences,
  );

  const canonical = useMemo(() => {
    if (!isHydrated) {
      return experiences;
    }
    return getCanonicalExperiences();
  }, [isHydrated, getCanonicalExperiences]);

  return { experiences: canonical, isHydrated };
}

export function useCanonicalExperienceById(id: string): {
  experience: Experience | undefined;
  isHydrated: boolean;
} {
  const isHydrated = useHostExperiencesStore((state) => state.isHydrated);
  const getCanonicalById = useHostExperiencesStore(
    (state) => state.getCanonicalExperienceById,
  );

  const experience = useMemo(() => {
    if (!isHydrated) {
      return findExperienceById(id);
    }
    return getCanonicalById(id);
  }, [isHydrated, id, getCanonicalById]);

  return { experience, isHydrated };
}

export function useCanonicalExperienceBySlug(slug: string): {
  experience: Experience | undefined;
  isHydrated: boolean;
} {
  const isHydrated = useHostExperiencesStore((state) => state.isHydrated);
  const getCanonicalBySlug = useHostExperiencesStore(
    (state) => state.getCanonicalExperienceBySlug,
  );

  const experience = useMemo(() => {
    if (!isHydrated) {
      return findExperienceBySlug(slug);
    }
    return getCanonicalBySlug(slug);
  }, [isHydrated, slug, getCanonicalBySlug]);

  return { experience, isHydrated };
}

export function useCanonicalSession(
  experienceId: string,
  sessionId: string,
): ExperienceSession | undefined {
  const { experience } = useCanonicalExperienceById(experienceId);
  if (!experience) return undefined;
  return experience.sessions.find((s) => s.id === sessionId);
}

export const visibleStatuses: readonly ExperienceStatus[] = ["published"];

export function filterVisibleExperiences(
  all: readonly Experience[],
): Experience[] {
  return all.filter((e) => visibleStatuses.includes(e.status));
}

export function isExperienceBookable(experience: Experience): boolean {
  if (experience.status !== "published") return false;
  return experience.sessions.some((s) => s.remainingCapacity > 0);
}
