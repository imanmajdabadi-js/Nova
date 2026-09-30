import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistState = {
  savedExperienceIds: string[];
  isHydrated: boolean;
  toggle: (experienceId: string) => void;
  isSaved: (experienceId: string) => boolean;
  clear: () => void;
  setHydrated: (hydrated: boolean) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      savedExperienceIds: [],
      isHydrated: false,

      toggle: (experienceId: string) => {
        const { savedExperienceIds } = get();
        const isSaved = savedExperienceIds.includes(experienceId);
        set({
          savedExperienceIds: isSaved
            ? savedExperienceIds.filter((id) => id !== experienceId)
            : [...savedExperienceIds, experienceId],
        });
      },

      isSaved: (experienceId: string) => {
        return get().savedExperienceIds.includes(experienceId);
      },

      clear: () => {
        set({ savedExperienceIds: [] });
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: "nova-wishlist",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        savedExperienceIds: state.savedExperienceIds,
      }),
    },
  ),
);
