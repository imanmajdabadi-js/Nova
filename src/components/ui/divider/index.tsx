import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  children?: ReactNode;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, children, ...rest },
  ref,
) {
  if (children) {
    return (
      <div
        className={cn(
          "relative flex items-center gap-2 text-foreground-subtle",
          "text-xs",
          className,
        )}
        role="separator"
      >
        <hr
          aria-hidden={true}
          className="my-0 flex-grow border-0 border-t border-divider"
        />
        <span className="px-1 whitespace-nowrap">{children}</span>
        <hr
          aria-hidden={true}
          className="my-0 flex-grow border-0 border-t border-divider"
        />
      </div>
    );
  }
  return (
    <hr
      ref={ref}
      className={cn("my-0 border-0 border-t border-divider", className)}
      {...rest}
    />
  );
});

Divider.displayName = "Divider";
