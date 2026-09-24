import { type LabelHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, required, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      aria-required={required || undefined}
      className={cn(
        "block text-label font-medium leading-none text-foreground",
        "mb-1 select-none",
        required && "after:ml-1 after:content-['*'] after:text-error",
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export const useFieldId = useId;
