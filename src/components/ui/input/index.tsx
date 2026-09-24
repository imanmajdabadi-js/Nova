import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "prefix" | "suffix"
> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    label,
    helperText,
    error,
    required,
    prefix,
    suffix,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `nova-input-${String(generatedId)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const describedBy = [error ? errorId : helperText ? helperId : null]
    .filter(Boolean)
    .join(" ");
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1" data-error={hasError || undefined}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-label font-medium text-foreground",
            disabled && "text-foreground-subtle",
          )}
        >
          {label}
          {required && (
            <span className="text-error" aria-hidden={true}>
              {" *"}
            </span>
          )}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span
            className="absolute inset-y-0 start-0 flex h-full items-center ps-3 text-foreground-muted"
            aria-hidden={true}
          >
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "w-full rounded-md border bg-surface px-3 py-2 text-base text-foreground",
            "placeholder-foreground-subtle transition-colors duration-150",
            "focus:border-primary",
            hasError ? "border-error" : "border-border",
            disabled && "bg-surface-muted text-foreground-subtle",
            prefix ? "ps-10" : "",
            suffix ? "pe-10" : "",
            className,
          )}
          {...rest}
        />
        {suffix && (
          <span
            className="absolute inset-y-0 end-0 flex h-full items-center pe-3 text-foreground-muted"
            aria-hidden={true}
          >
            {suffix}
          </span>
        )}
      </div>
      {error ? (
        <p
          id={errorId}
          className="text-xs text-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-foreground-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";
