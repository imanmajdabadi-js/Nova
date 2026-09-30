import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib";
import { Spinner } from "@/components/ui/spinner";
import {
  variantClasses,
  sizeClasses,
  iconSizeClasses,
  type ButtonSize,
} from "@/components/ui/button";

export type IconButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type IconButtonSize = ButtonSize;

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      className,
      label,
      icon,
      variant = "ghost",
      size = "md",
      loading,
      disabled,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        type="button"
        ref={ref}
        aria-label={label}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-[background-color,border-color,color,box-shadow] duration-150",
          variantClasses[variant],
          sizeClasses[size],
          loading && "cursor-wait opacity-80",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...rest}
      >
        {loading ? (
          <Spinner size={size === "sm" ? "xs" : size === "lg" ? "md" : "sm"} />
        ) : (
          <span
            className={cn(
              "inline-flex items-center justify-center",
              iconSizeClasses[size],
            )}
          >
            {icon}
          </span>
        )}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
