import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib";
import { Spinner } from "@/components/ui/spinner";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "bg-secondary text-foreground hover:bg-secondary-hover active:bg-secondary-active",
  outline:
    "border border-border bg-surface text-foreground hover:bg-surface-interactive",
  ghost: "bg-transparent text-foreground hover:bg-surface-interactive",
  destructive:
    "bg-error text-error-foreground hover:bg-error/90 active:opacity-80",
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      icon,
      iconPosition = "right",
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        type="button"
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium",
          "transition-[background-color,border-color,color,box-shadow] duration-150",
          variantClasses[variant],
          sizeClasses[size],
          loading && "cursor-wait opacity-80",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...rest}
      >
        {loading && (
          <Spinner
            size={size === "sm" ? "xs" : size === "lg" ? "md" : "sm"}
            aria-hidden={true}
          />
        )}
        {icon && !loading && iconPosition === "left" && (
          <span
            className={cn(
              "inline-flex items-center justify-center",
              iconSizeClasses[size],
            )}
          >
            {icon}
          </span>
        )}
        {children}
        {icon && !loading && iconPosition === "right" && (
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

Button.displayName = "Button";
