// Shared library utilities for NOVA.

export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs
    .filter(
      (input): input is string => typeof input === "string" && input.length > 0,
    )
    .join(" ");
}

export { usePathname } from "./use-pathname";

export function formatPriceFa(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export function formatPrice(price: number): string {
  return formatPriceFa(price) + " تومان";
}

export { useWishlistStore } from "./wishlist-store";
export { useBookingStore } from "./booking-store";
export type { CustomerBooking } from "./booking-store";

export { useHostExperiencesStore } from "./host-experiences-store";
export type { ExperiencePatch } from "./host-experiences-store";
export { applyPatch } from "./host-experiences-store";

export {
  useCanonicalExperiences,
  useCanonicalExperienceById,
  useCanonicalExperienceBySlug,
  useCanonicalSession,
  filterVisibleExperiences,
  isExperienceBookable,
  visibleStatuses,
} from "./canonical-experiences";

export {
  findExperienceById,
  findSessionById,
  validateBooking,
  calculateBookingTotal,
} from "@/data/experiences";
