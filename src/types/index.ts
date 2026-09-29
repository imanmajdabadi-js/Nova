export type Locale = "fa";

export interface AppLocaleConfig {
  readonly locale: Locale;
  readonly direction: "rtl" | "ltr";
  readonly htmlLang: string;
}
