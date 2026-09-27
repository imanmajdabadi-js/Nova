"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { cn, formatPrice } from "@/lib";
import type { Experience, ExperienceSession } from "@/data/experiences";
import { useBookingStore } from "@/lib/booking-store";
import { validateBooking, calculateBookingTotal } from "@/data/experiences";

export type BookingStep =
  "initial" | "date" | "session" | "guests" | "summary" | "confirmed";

export interface BookingSelection {
  date: string | null;
  session: ExperienceSession | null;
  guests: number;
}

function DateSelection({
  dates,
  selectedDate,
  onSelect,
}: {
  dates: readonly { date: string; count: number }[];
  selectedDate: string | null;
  onSelect: (date: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground-muted">
        تاریخ خواست‌شده
      </h3>
      <div className="flex flex-col gap-2">
        {dates.map(({ date, count }) => (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-all duration-150",
              selectedDate === date
                ? "border-primary bg-primary-soft"
                : "border-border bg-surface hover:border-border-strong hover:bg-surface-interactive",
            )}
          >
            <span className="text-foreground">{date}</span>
            <span className="text-foreground-muted">{count} جلسه</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SessionSelection({
  sessions,
  onBack,
  onSelect,
}: {
  sessions: readonly ExperienceSession[];
  onBack: () => void;
  onSelect: (session: ExperienceSession) => void;
}) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-primary hover:text-primary-hover"
      >
        ← بازگشت به تاریخ
      </button>
      <h3 className="text-sm font-semibold text-foreground-muted">
        جلسات موجود
      </h3>
      <div className="flex flex-col gap-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session)}
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-all duration-150",
              "border-border bg-surface hover:border-border-strong hover:bg-surface-interactive",
            )}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium text-foreground">
                {session.time}
              </span>
              <span className="text-xs text-foreground-muted">
                {session.remainingCapacity} جای باقی‌مانده
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GuestCountSelection({
  guestCount,
  maxGuests,
  onChange,
  onBack,
}: {
  guestCount: number;
  maxGuests: number;
  onChange: (delta: number) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-primary hover:text-primary-hover"
      >
        ← بازگشت به جلسات
      </button>

      <h3 className="text-sm font-semibold text-foreground-muted">
        تعداد مهمان
      </h3>
      <div className="flex items-center justify-center gap-4 py-4">
        <button
          onClick={() => onChange(-1)}
          disabled={guestCount <= 1}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border text-xl font-medium transition-all duration-150",
            guestCount <= 1
              ? "cursor-not-allowed border-border text-foreground-subtle"
              : "border-border text-foreground hover:border-border-strong hover:bg-surface-interactive",
          )}
          aria-label="کاهش تعداد مهمان"
        >
          −
        </button>
        <span className="text-3xl font-bold text-foreground" aria-live="polite">
          {guestCount}
        </span>
        <button
          onClick={() => onChange(1)}
          disabled={guestCount >= maxGuests}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border text-xl font-medium transition-all duration-150",
            guestCount >= maxGuests
              ? "cursor-not-allowed border-border text-foreground-subtle"
              : "border-border text-foreground hover:border-border-strong hover:bg-surface-interactive",
          )}
          aria-label="افزایش تعداد مهمان"
        >
          +
        </button>
      </div>
      <p className="text-center text-xs text-foreground-muted">
        حداکثر {maxGuests} نفر
      </p>
    </div>
  );
}

function BookingSummary({
  experience,
  selection,
  totalPrice,
  onBack,
}: {
  experience: Experience;
  selection: BookingSelection;
  totalPrice: number;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-primary hover:text-primary-hover"
      >
        ← بازگشت
      </button>

      <h3 className="text-sm font-semibold text-foreground-muted">
        خلاصه رزرو
      </h3>
      <div className="space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">{experience.title}</span>
          <span className="text-foreground">
            {formatPrice(experience.price)} / نفر
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">تاریخ</span>
          <span className="text-foreground">{selection.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">ساعت</span>
          <span className="text-foreground">{selection.session?.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">تعداد مهمان</span>
          <span className="text-foreground">{selection.guests} نفر</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-foreground">مجموع</span>
            <span className="text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationState({
  experience,
  selection,
  totalPrice,
  bookingRef,
  onRestart,
}: {
  experience: Experience;
  selection: BookingSelection;
  totalPrice: number;
  bookingRef: string;
  onRestart: () => void;
}) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <svg
          viewBox="0 0 48 48"
          width={48}
          height={48}
          className="text-success"
        >
          <path
            fill="currentColor"
            d="M24 0a24 24 0 1 0 0 48 24 24 0 0 0 0-48Zm0 44a20 20 0 1 1 0-40 20 20 0 0 1 0 40Z"
          />
          <path
            fill="white"
            d="M35.7 15.3a2.5 2.5 0 0 0-3.4 0L20 28.5 15.7 33a2.5 2.5 0 1 0 3.5 3.5l6.2-6.7a2.5 2.5 0 0 0-3.4-3.4l-1.3 1.3a2.5 2.5 0 0 0 1.7 4.3 2.5 2.5 0 0 0 1.7-4.3l6.2-6.7a2.5 2.5 0 0 0 0-3.4Z"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">رزرو شما ثبت شد</h3>
        <p className="mt-2 text-sm text-foreground-muted">
          کد رزرو شما:{" "}
          <span className="font-mono font-semibold text-foreground">
            {bookingRef}
          </span>
        </p>
      </div>
      <div className="space-y-2 border-t border-border pt-4 text-right text-sm">
        <p className="text-foreground">{experience.title}</p>
        <p className="text-foreground-muted">
          {selection.date}، ساعت {selection.session?.time}
        </p>
        <p className="text-foreground-muted">{selection.guests} نفر</p>
        <p className="font-semibold text-foreground">
          مبلغ: {formatPrice(totalPrice)}
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          مشاهده رزروهای من
        </Link>
        <Button variant="outline" size="lg" onClick={onRestart}>
          رزرو جدید
        </Button>
      </div>
    </div>
  );
}

interface BookingFlowProps {
  experience: Experience;
}

export function BookingFlow({ experience }: BookingFlowProps) {
  const [step, setStep] = useState<BookingStep>("initial");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] =
    useState<ExperienceSession | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const isConfirmingRef = useRef(false);

  const selection: BookingSelection = useMemo(
    () => ({
      date: selectedDate,
      session: selectedSession,
      guests: guestCount,
    }),
    [selectedDate, selectedSession, guestCount],
  );

  const uniqueDates = useMemo(() => {
    const dateMap = new Map<string, number>();
    for (const session of experience.sessions) {
      dateMap.set(session.date, (dateMap.get(session.date) ?? 0) + 1);
    }
    return Array.from(dateMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }, [experience.sessions]);

  const sessionsForDate = useMemo(
    () =>
      selectedDate
        ? experience.sessions.filter(
            (s) => s.date === selectedDate && s.remainingCapacity > 0,
          )
        : [],
    [experience.sessions, selectedDate],
  );

  const maxGuests = selectedSession?.remainingCapacity ?? 1;

  const totalPrice = useMemo(
    () => experience.price * guestCount,
    [experience.price, guestCount],
  );

  const startBooking = () => {
    if (experience.sessions.length > 0) {
      setStep("date");
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSession(null);
    setStep("session");
  };

  const handleSessionSelect = (session: ExperienceSession) => {
    setSelectedSession(session);
    setGuestCount(1);
    setStep("guests");
  };

  const handleGuestChange = (delta: number) => {
    const next = guestCount + delta;
    if (next >= 1 && next <= maxGuests) {
      setGuestCount(next);
    }
  };

  const handleConfirm = () => {
    if (isConfirmingRef.current) return;
    isConfirmingRef.current = true;

    const { date, session, guests } = selection;
    if (!date || !session) {
      isConfirmingRef.current = false;
      return;
    }

    // Validate booking
    const validation = validateBooking(experience.id, session.id, guests);
    if (!validation.valid) {
      console.warn("Booking validation failed:", validation.error);
      isConfirmingRef.current = false;
      return;
    }

    // Calculate total price
    const total = calculateBookingTotal(experience.id, guests);

    // Add booking to store
    const newBooking = useBookingStore.getState().addBooking({
      experienceId: experience.id,
      sessionId: session.id,
      date,
      time: session.time,
      guestCount: guests,
      totalPrice: total,
      status: "confirmed",
    });

    setBookingRef(newBooking.reference);
    setStep("confirmed");
    isConfirmingRef.current = false;
  };

  const handleRestart = () => {
    setSelectedDate(null);
    setSelectedSession(null);
    setGuestCount(1);
    setBookingRef(null);
    setStep("initial");
  };

  if (step === "confirmed") {
    return (
      <ConfirmationState
        experience={experience}
        selection={selection}
        totalPrice={totalPrice}
        bookingRef={bookingRef ?? "NOVA-0000"}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-4">
      {step === "initial" && (
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={startBooking}
            disabled={experience.sessions.length === 0}
          >
            رزرو تجربه
          </Button>
          <p className="mt-2 text-xs text-foreground-subtle">
            جلسات موجود: {experience.sessions.length}
          </p>
        </div>
      )}

      {step === "date" && (
        <DateSelection
          dates={uniqueDates}
          selectedDate={selectedDate}
          onSelect={handleDateSelect}
        />
      )}

      {step === "session" && (
        <SessionSelection
          sessions={sessionsForDate}
          onBack={() => setStep("date")}
          onSelect={handleSessionSelect}
        />
      )}

      {step === "guests" && (
        <GuestCountSelection
          guestCount={guestCount}
          maxGuests={maxGuests}
          onChange={handleGuestChange}
          onBack={() => setStep("session")}
        />
      )}

      {step === "summary" && (
        <BookingSummary
          experience={experience}
          selection={selection}
          totalPrice={totalPrice}
          onBack={() => setStep("guests")}
        />
      )}

      <div className="border-t border-border pt-4">
        {step === "guests" && (
          <>
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-foreground-muted">مجموع</span>
              <span className="font-semibold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setStep("summary")}
            >
              ادامه
            </Button>
          </>
        )}

        {step === "summary" && (
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleConfirm}
          >
            تأیید و رزرو
          </Button>
        )}
      </div>

      {(selectedDate || selectedSession || guestCount > 1) && (
        <button
          onClick={handleRestart}
          className="text-center text-xs text-foreground-subtle hover:text-foreground"
        >
          شروع مجدد
        </button>
      )}
    </div>
  );
}
