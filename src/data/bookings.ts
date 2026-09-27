export type BookingStatus =
  "pending" | "confirmed" | "canceled" | "completed" | "refunded";

export type BookingSessionInfo = {
  readonly date: string;
  readonly time: string;
};

export type BookingCustomerInfo = {
  readonly name: string;
  readonly email: string;
};

export type Booking = {
  readonly id: string;
  readonly reference: string;
  readonly experienceId: string;
  readonly customer: BookingCustomerInfo;
  readonly status: BookingStatus;
  readonly session: BookingSessionInfo;
  readonly participants: number;
  readonly price: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export const statusLabels: Record<BookingStatus, string> = {
  pending: "در انتظار تایید",
  confirmed: "تایید شده",
  canceled: "لغو شده",
  completed: "تکمیل شده",
  refunded: "استرداد شده",
};

export const statusOrder: readonly BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "canceled",
  "refunded",
];

export const statusBadgeVariant: Record<
  BookingStatus,
  "success" | "warning" | "error" | "info" | "neutral"
> = {
  confirmed: "success",
  pending: "warning",
  completed: "info",
  canceled: "error",
  refunded: "neutral",
};

export const bookings: readonly Booking[] = [
  {
    id: "b-1",
    reference: "BK-7521",
    experienceId: "1",
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@example.com",
    },
    status: "confirmed",
    session: { date: "۱۴۰۵/۰۷/۰۵", time: "۱۰:۰۰" },
    participants: 2,
    price: 5000000,
    createdAt: "۱۴۰۵/۰۶/۲۸",
    updatedAt: "۱۴۰۵/۰۶/۲۸",
  },
  {
    id: "b-2",
    reference: "BK-8832",
    experienceId: "2",
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@example.com",
    },
    status: "pending",
    session: { date: "۱۴۰۵/۰۷/۰۶", time: "۰۹:۰۰" },
    participants: 1,
    price: 850000,
    createdAt: "۱۴۰۵/۰۶/۲۵",
    updatedAt: "۱۴۰۵/۰۶/۲۵",
  },
  {
    id: "b-3",
    reference: "BK-5419",
    experienceId: "4",
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@example.com",
    },
    status: "completed",
    session: { date: "۱۴۰۵/۰۷/۱۱", time: "۱۸:۰۰" },
    participants: 1,
    price: 1800000,
    createdAt: "۱۴۰۵/۰۵/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۱۱",
  },
  {
    id: "b-4",
    reference: "BK-3347",
    experienceId: "5",
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@example.com",
    },
    status: "canceled",
    session: { date: "۱۴۰۵/۰۷/۰۶", time: "۰۷:۰۰" },
    participants: 1,
    price: 950000,
    createdAt: "۱۴۰۴/۱۲/۳۰",
    updatedAt: "۱۴۰۴/۱۲/۳۰",
  },
  {
    id: "b-5",
    reference: "BK-9165",
    experienceId: "7",
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@example.com",
    },
    status: "confirmed",
    session: { date: "۱۴۰۵/۰۷/۰۷", time: "۰۹:۰۰" },
    participants: 3,
    price: 4200000,
    createdAt: "۱۴۰۵/۰۶/۲۰",
    updatedAt: "۱۴۰۵/۰۶/۲۰",
  },
];
