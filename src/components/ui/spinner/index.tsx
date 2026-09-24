import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({ className, size = "md", ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-label="loading"
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-transparent border-t-current align-middle",
          sizeClasses[size],
          className,
        )}
        {...rest}
      />
    );
  },
);

Spinner.displayName = "Spinner";
