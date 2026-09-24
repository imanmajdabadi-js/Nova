"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui";
import { StarOutlined } from "@ant-design/icons";

const experiences = [
  {
    id: "1",
    title: "كلاس آشپزی ایرانی",
    location: "تهران، چinar باغ",
    price: "۲,۵۰۰,۰۰۰",
    rating: 4.9,
    reviews: 128,
    href: "/experiences/1",
  },
  {
    id: "2",
    title: "تور مخفی شهر",
    location: "اصفهان، میدان نقش جهان",
    price: "۸۵۰,۰۰۰",
    rating: 4.7,
    reviews: 89,
    href: "/experiences/2",
  },
  {
    id: "3",
    title: "workshop گلیم بافی",
    location: "کرمان، بازار",
    price: "۱,۲۰۰,۰۰۰",
    rating: 4.8,
    reviews: 56,
    href: "/experiences/3",
  },
  {
    id: "4",
    title: "کنسرت سنتی",
    location: "شیراز، باغ ارم",
    price: "۱,۸۰۰,۰۰۰",
    rating: 4.6,
    reviews: 234,
    href: "/experiences/4",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          تجربه‌ها
        </h1>
        <p className="max-w-2xl text-body text-foreground-muted">
          تجربه‌های دست‌چین شده برای شما.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience) => (
          <Link key={experience.id} href={experience.href}>
            <Card hoverable className="h-full">
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-foreground-muted">
                      <StarOutlined className="text-warning" />
                      <span>{experience.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    {experience.location}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-foreground-subtle">
                      {experience.reviews} نظر
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {experience.price} تومان
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
