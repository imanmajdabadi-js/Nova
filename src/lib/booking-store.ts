import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BookingStatus } from "@/data/bookings";

export type CustomerBooking = {
  readonly id: string;
  readonly reference: string;
  readonly experienceId: string;
  readonly sessionId: string;
  readonly date: string;
  readonly time: string;
  readonly guestCount: number;
  readonly totalPrice: number;
  readonly status: BookingStatus;
  readonly createdAt: string;
};

type BookingState = {
  bookings: CustomerBooking[];
  isHydrated: boolean;
  addBooking: (
    booking: Omit<CustomerBooking, "id" | "reference" | "createdAt">,
  ) => CustomerBooking;
  getBooking: (id: string) => CustomerBooking | undefined;
  getAllBookings: () => CustomerBooking[];
  removeBooking: (id: string) => void;
  clearBookings: () => void;
  setHydrated: (hydrated: boolean) => void;
};

function generateId(): string {
  return `b-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getPersianDate(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === "year")?.value ?? "0000";
  const month = parts.find((p) => p.type === "month")?.value ?? "00";
  const day = parts.find((p) => p.type === "day")?.value ?? "00";
  return `${year}/${month}/${day}`;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      isHydrated: false,

      addBooking: (bookingData) => {
        const newBooking: CustomerBooking = {
          id: generateId(),
          reference: `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`,
          createdAt: getPersianDate(),
          ...bookingData,
        };
        set((state) => ({
          bookings: [newBooking, ...state.bookings],
        }));
        return newBooking;
      },

      getBooking: (id: string) => {
        return get().bookings.find((b) => b.id === id);
      },

      getAllBookings: () => {
        return [...get().bookings].sort((a, b) => {
          // Sort by creation date descending (newest first)
          return b.createdAt.localeCompare(a.createdAt);
        });
      },

      removeBooking: (id: string) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }));
      },

      clearBookings: () => {
        set({ bookings: [] });
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: "nova-bookings",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        bookings: state.bookings,
      }),
    },
  ),
);
