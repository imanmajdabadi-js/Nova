import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Experience,
  ExperienceSession,
  ExperienceStatus,
} from "@/data/experiences";
import { experiences, findExperienceById } from "@/data/experiences";
import { checkReadiness } from "@/data/experience-lifecycle";
import { getPersianDate } from "./i18n";

type ExperiencePatch = {
  status?: ExperienceStatus;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  price?: number;
  image?: string;
  images?: readonly string[];
  highlights?: readonly string[];
  sessions?: readonly ExperienceSession[];
  updatedAt?: string;
};

type HostExperiencesState = {
  selectedHostId: string;
  patches: Record<string, ExperiencePatch>;
  draftExperiences: readonly Experience[];
  isHydrated: boolean;

  setStatus: (experienceId: string, status: ExperienceStatus) => void;
  updateExperience: (experienceId: string, patch: ExperiencePatch) => void;
  updateSessions: (
    experienceId: string,
    sessions: readonly ExperienceSession[],
  ) => void;
  createExperience: () => Experience;
  removeDraft: (experienceId: string) => void;

  getHostExperiences: () => Experience[];
  getHostExperience: (experienceId: string) => Experience | undefined;

  getCanonicalExperiences: () => Experience[];
  getCanonicalExperienceById: (id: string) => Experience | undefined;
  getCanonicalExperienceBySlug: (slug: string) => Experience | undefined;

  setHydrated: (hydrated: boolean) => void;
};

function generateId(): string {
  return `exp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function generateSlug(id: string): string {
  return `draft-${id}`;
}

function createDraftExperience(hostId: string): Experience {
  const now = getPersianDate();
  const id = generateId();
  return {
    id,
    title: "",
    slug: generateSlug(id),
    category: "",
    location: "",
    price: 0,
    rating: 0,
    reviews: 0,
    image: "",
    host: { name: "" },
    hostId,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    sessions: [],
  };
}

function applyPatch(
  base: Experience,
  patch: ExperiencePatch | undefined,
): Experience {
  if (!patch) return base;
  return { ...base, ...patch };
}

export { applyPatch };

export const useHostExperiencesStore = create<HostExperiencesState>()(
  persist(
    (set, get) => ({
      selectedHostId: "h1",
      patches: {},
      draftExperiences: [],
      isHydrated: false,

      setStatus: (experienceId, status) => {
        const now = getPersianDate();
        set((state) => ({
          patches: {
            ...state.patches,
            [experienceId]: {
              ...state.patches[experienceId],
              status,
              updatedAt: now,
            },
          },
        }));
      },

      updateExperience: (experienceId, patch) => {
        const now = getPersianDate();
        set((state) => ({
          patches: {
            ...state.patches,
            [experienceId]: {
              ...state.patches[experienceId],
              ...patch,
              updatedAt: now,
            },
          },
        }));
      },

      updateSessions: (experienceId, sessions) => {
        const now = getPersianDate();
        set((state) => ({
          patches: {
            ...state.patches,
            [experienceId]: {
              ...state.patches[experienceId],
              sessions,
              updatedAt: now,
            },
          },
        }));
      },

      createExperience: () => {
        const now = getPersianDate();
        const newExp = createDraftExperience(get().selectedHostId);
        set((state) => ({
          draftExperiences: [...state.draftExperiences, newExp],
          patches: {
            ...state.patches,
            [newExp.id]: {
              updatedAt: now,
            },
          },
        }));
        return newExp;
      },

      removeDraft: (experienceId) => {
        set((state) => {
          const patches = { ...state.patches };
          delete patches[experienceId];
          return {
            draftExperiences: state.draftExperiences.filter(
              (e) => e.id !== experienceId,
            ),
            patches,
          };
        });
      },

      getHostExperiences: () => {
        const { selectedHostId, patches, draftExperiences } = get();
        const seed = experiences
          .filter((e) => e.hostId === selectedHostId)
          .map((e) => applyPatch(e, patches[e.id]));
        const drafts = draftExperiences.map((e) =>
          applyPatch(e, patches[e.id]),
        );
        return [...seed, ...drafts].sort((a, b) => {
          const aTime = a.updatedAt ?? a.createdAt ?? "";
          const bTime = b.updatedAt ?? b.createdAt ?? "";
          return bTime.localeCompare(aTime);
        });
      },

      getHostExperience: (experienceId) => {
        const { patches, draftExperiences } = get();
        const seed = findExperienceById(experienceId);
        const draft = draftExperiences.find((e) => e.id === experienceId);
        if (seed) return applyPatch(seed, patches[experienceId]);
        if (draft) return applyPatch(draft, patches[experienceId]);
        return undefined;
      },

      getCanonicalExperiences: () => {
        const { patches, draftExperiences } = get();
        const withPatches = experiences.map((e) =>
          applyPatch(e, patches[e.id]),
        );
        const withDrafts = draftExperiences.map((e) =>
          applyPatch(e, patches[e.id]),
        );
        return [...withPatches, ...withDrafts];
      },

      getCanonicalExperienceById: (id) => {
        const { patches, draftExperiences } = get();
        const seed = findExperienceById(id);
        const draft = draftExperiences.find((e) => e.id === id);
        if (seed) return applyPatch(seed, patches[id]);
        if (draft) return applyPatch(draft, patches[id]);
        return undefined;
      },

      getCanonicalExperienceBySlug: (slug) => {
        const { patches } = get();
        const seed = experiences.find((e) => e.slug === slug);
        if (seed) return applyPatch(seed, patches[seed.id]);
        return undefined;
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: "nova-host-experiences",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        patches: state.patches,
        draftExperiences: state.draftExperiences,
        selectedHostId: state.selectedHostId,
      }),
    },
  ),
);

export type { ExperiencePatch };
export { checkReadiness };
