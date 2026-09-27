import Link from "next/link";
import { Card, CardBody, StarIcon } from "@/components/ui";
import { experiences } from "@/data/experiences";
import { formatPrice } from "@/lib";

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
          <Link
            key={experience.id}
            href={`/app/experiences/${experience.slug}`}
          >
            <Card hoverable className="h-full">
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-foreground-muted">
                      <StarIcon className="text-warning" />
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
                      {formatPrice(experience.price)}
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
