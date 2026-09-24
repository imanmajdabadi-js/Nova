import { type TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, label, helperText, error, required, id, disabled, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? `nova-textarea-${String(generatedId)}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const describedBy = [error ? errorId : helperText ? helperId : null]
      .filter(Boolean)
      .join(" ");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1" data-error={hasError || undefined}>
        {label && (
          <label
            htmlFor={textareaId}
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
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "w-full resize-y rounded-md border bg-surface px-3 py-2 text-base text-foreground",
            "placeholder-foreground-subtle transition-colors duration-150",
            "focus:border-primary",
            hasError ? "border-error" : "border-border",
            disabled && "bg-surface-muted text-foreground-subtle",
            className,
          )}
          {...rest}
        />
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
  },
);

Textarea.displayName = "Textarea";
