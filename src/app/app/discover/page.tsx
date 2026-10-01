"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Button, IconButton, Badge } from "@/components/ui";
import { HeartOutlined } from "@ant-design/icons";
import type { Experience, FilterState, SortOption } from "@/data/experiences";
import {
  categories,
  experiences,
  getUniqueLocations,
  getSortOptions,
  filterExperiences,
} from "@/data/experiences";
import { WishlistToggle } from "@/components/domain/wishlist-toggle";
import { formatPriceFa } from "@/lib";

function formatPrice(price: number): string {
  return formatPriceFa(price) + " تومان";
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

function FilterChips({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const hasFilters =
    filters.category !== "همه" ||
    filters.location !== "همه" ||
    filters.sort !== "featured" ||
    filters.search.trim();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.category !== "همه" && (
          <Badge
            variant="primary"
            size="sm"
            onClick={() => onChange({ ...filters, category: "همه" })}
            className="cursor-pointer gap-1"
          >
            دسته: {filters.category}
            <IconButton
              icon={<HeartOutlined />}
              size="sm"
              variant="ghost"
              label="حذف فیلتر دسته"
              onClick={() => onChange({ ...filters, category: "همه" })}
            />
          </Badge>
        )}
        {filters.location !== "همه" && (
          <Badge
            variant="secondary"
            size="sm"
            onClick={() => onChange({ ...filters, location: "همه" })}
            className="cursor-pointer gap-1"
          >
            موقعیت: {filters.location}
            <IconButton
              icon={<HeartOutlined />}
              size="sm"
              variant="ghost"
              label="حذف فیلتر موقعیت"
              onClick={() => onChange({ ...filters, location: "همه" })}
            />
          </Badge>
        )}
        {filters.sort !== "featured" && (
          <Badge
            variant="accent"
            size="sm"
            onClick={() => onChange({ ...filters, sort: "featured" })}
            className="cursor-pointer gap-1"
          >
            مرتب‌سازی:{" "}
            {getSortOptions().find((o) => o.value === filters.sort)?.label}
            <IconButton
              icon={<HeartOutlined />}
              size="sm"
              variant="ghost"
              label="حذف فیلتر مرتب‌سازی"
              onClick={() => onChange({ ...filters, sort: "featured" })}
            />
          </Badge>
        )}
        {filters.search.trim() && (
          <Badge
            variant="info"
            size="sm"
            onClick={() => onChange({ ...filters, search: "" })}
            className="cursor-pointer gap-1"
          >
            جستجو: {filters.search}
            <IconButton
              icon={<HeartOutlined />}
              size="sm"
              variant="ghost"
              label="حذف جستجو"
              onClick={() => onChange({ ...filters, search: "" })}
            />
          </Badge>
        )}
      </div>
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-sm"
        >
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
}

function FilterBar({
  filters,
  onChange,
  locations,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  locations: string[];
}) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              placeholder="جستجوی تجربه، مکان، دسته، میزبان..."
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
            {getSortOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <FilterChips filters={filters} onChange={onChange} />
    </div>
  );
}

function DiscoverPageClient({
  initialFilters,
}: {
  initialFilters: {
    search: string;
    category: string;
    location: string;
    sort: SortOption;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<{
    search: string;
    category: string;
    location: string;
    sort: SortOption;
  }>(initialFilters);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("q", filters.search);
    if (filters.category !== "همه") params.set("category", filters.category);
    if (filters.location !== "همه") params.set("location", filters.location);
    if (filters.sort !== "featured") params.set("sort", filters.sort);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [filters, pathname, router]);

  const locations = useMemo(() => getUniqueLocations(experiences), []);

  const filtered = useMemo(
    () => filterExperiences(experiences, filters),
    [filters],
  );

  const handleChange = (next: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  const handleClear = () => {
    setFilters({
      search: "",
      category: "همه",
      location: "همه",
      sort: "featured",
    });
  };

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
                handleChange({ ...filters, search: e.target.value })
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
        <FilterBar
          filters={filters}
          onChange={handleChange}
          locations={locations}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground-muted">
              {filtered.length} تجربه یافت شد
            </span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-foreground-muted">
            <p className="text-lg">
              هیچ تجربه‌ای با فیلترهای انتخابی شما یافت نشد.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={handleClear}>
                پاک کردن فیلترها
              </Button>
              <Button
                variant="primary"
                onClick={() => router.push("/app/discover")}
              >
                بازگشت به همه تجربه‌ها
              </Button>
            </div>
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

function DiscoverPageContent() {
  const searchParams = useSearchParams();

  const initialFilters = useMemo(
    () => ({
      search: searchParams.get("q") || "",
      category: searchParams.get("category") || "همه",
      location: searchParams.get("location") || "همه",
      sort: (searchParams.get("sort") as SortOption) || "featured",
    }),
    [searchParams],
  );

  return <DiscoverPageClient initialFilters={initialFilters} />;
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-muted rounded w-1/3 mx-auto" />
            <div className="h-4 bg-surface-muted rounded w-1/2 mx-auto" />
          </div>
        </div>
      }
    >
      <DiscoverPageContent />
    </Suspense>
  );
}
