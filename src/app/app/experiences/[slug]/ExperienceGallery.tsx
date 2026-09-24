"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib";

export function ExperienceGallery({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface-muted">
        <Image
          src={images[selected]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority={selected === 0}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelected(index)}
              className={cn(
                "relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors duration-150",
                selected === index
                  ? "border-primary"
                  : "border-transparent hover:border-border",
              )}
            >
              <Image
                src={src}
                alt={`${title} ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
