"use client";

import Link from "next/link";
import { Button, Card, CardBody } from "@/components/ui";

export default function DiscoverPage() {
  const featuredCategories = [
    { name: "تجربه‌های culinary", count: 124, href: "/categories/culinary" },
    { name: "تورهای شهری", count: 89, href: "/categories/tours" },
    { name: "workshops", count: 56, href: "/categories/workshops" },
    { name: "فرهنگی", count: 43, href: "/categories/cultural" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          تجربه‌های جدید را کشف کنید
        </h1>
        <p className="max-w-2xl text-lg text-foreground-muted">
          از کلاس‌های آشپزی تا تورهای مخفی شهر، بهترین تجربه‌ها را در نزدیکی خود
          پیدا کنید.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            دسته‌های محبوب
          </h2>
          <Button variant="ghost" size="sm">
            مشاهده همه
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card hoverable className="h-full">
                <CardBody>
                  <h3 className="text-base font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {category.count} تجربه
                  </p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
