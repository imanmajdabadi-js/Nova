// Application-level configuration constants.

export const appConfig = {
  name: "NOVA",
  defaultLocale: "fa" as const,
  supportedLocales: ["fa"] as const,
} as const;

export type AppConfig = typeof appConfig;
