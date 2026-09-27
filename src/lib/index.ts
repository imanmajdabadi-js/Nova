// Shared library utilities for NOVA.

export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs
    .filter(
      (input): input is string => typeof input === "string" && input.length > 0,
    )
    .join(" ");
}

export { usePathname } from "./use-pathname";

export function formatPriceFa(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}
