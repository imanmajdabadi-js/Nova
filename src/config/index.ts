import type { Locale } from "@/types";

export interface AppConfig {
  readonly name: string;
  readonly defaultLocale: Locale;
  readonly supportedLocales: readonly Locale[];
}

export const appConfig: AppConfig = {
  name: "NOVA",
  defaultLocale: "fa",
  supportedLocales: ["fa"],
};
