import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib";

export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, title, hoverable, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-subtle",
        "border border-border transition-[box-shadow,transform] duration-150",
        hoverable && "hover:shadow-medium",
        className,
      )}
      {...rest}
    >
      {title && (
        <header className="flex flex-col gap-1">
          <h3 className="text-h3 font-semibold text-foreground">{title}</h3>
        </header>
      )}
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </div>
  );
});

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...rest }, ref) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...rest} />
  );
});
CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardBody({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-4", className)}
      {...rest}
    />
  );
});
CardBody.displayName = "CardBody";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2", className)}
      {...rest}
    />
  );
});
CardFooter.displayName = "CardFooter";
