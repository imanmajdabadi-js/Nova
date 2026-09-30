"use client";

import { useMemo, useState } from "react";
import { Button, IconButton } from "@/components/ui";
import Image from "next/image";
import { HeartOutlined } from "@ant-design/icons";
import type { Experience, FilterState, SortOption } from "@/data/experiences";
import { categories, experiences } from "@/data/experiences";
import { WishlistToggle } from "@/components/domain/wishlist-toggle";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow duration-150 hover:shadow-medium">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-md bg-surface/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {experience.category}
          </span>
          <WishlistToggle
            experienceId={experience.id}
            size="sm"
            showLabel={false}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-foreground-muted">
            <span>⭐</span>
            <span>{experience.rating}</span>
          </div>
        </div>
        <p className="text-sm text-foreground-muted">{experience.location}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-foreground-subtle">
            {experience.availability}
          </span>
          <span className="text-base font-semibold text-foreground">
            {formatPrice(experience.price)}
          </span>
        </div>
      </div>
    </article>
  );
}

function FilterBar({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onChange({ ...filters, search: localSearch.trim() });
              }
            }}
            placeholder="جستجوی تجربه، مکان، دسته..."
            className="w-full rounded-md border border-border bg-surface px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-foreground-muted">
            🔍
          </span>
        </div>
        <select
          value={filters.sort}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="featured">پیشنهاد NOVA</option>
          <option value="popular">محبوب‌ترین</option>
          <option value="newest">جدیدترین</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              onChange({
                ...filters,
                category: filters.category === category ? "همه" : category,
              })
            }
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
              filters.category === category
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-foreground-muted hover:text-foreground border border-border",
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs
    .filter(
      (input): input is string => typeof input === "string" && input.length > 0,
    )
    .join(" ");
}

export default function DiscoverPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "همه",
    sort: "featured",
  });

  const filtered = useMemo(() => {
    let result = [...experiences];

    if (filters.category !== "همه") {
      result = result.filter((e) => e.category === filters.category);
    }

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q),
      );
    }

    switch (filters.sort) {
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="space-y-12">
      <section className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          تجربه‌های شهر را کشف کنید
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-muted">
          از کلاس‌های آشپزی تا تورهای مخفی، بهترین تجربه‌های شهری را در نزدیکی
          خود پیدا کنید.
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              placeholder="چه تجربه‌ای دنبال می‌کنید؟"
              className="w-full rounded-xl border border-border bg-surface px-5 py-3.5 pr-12 text-base text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-foreground-muted text-lg">
              🔍
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <FilterBar filters={filters} onChange={setFilters} />
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-foreground-muted">
            <p className="text-lg">نتیجه‌ای یافت نشد.</p>
            <p className="mt-2 text-sm">
              فیلترها را تغییر دهید یا عبارت جستجو را بررسی کنید.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
