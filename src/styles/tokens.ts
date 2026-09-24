import type { ThemeConfig } from "antd";

export type ColorName =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export type Palette = Record<string, ColorScale>;

export const palette: Palette = {
  neutral: {
    50: "oklch(98.4% 0.003 247.858)",
    100: "oklch(96.8% 0.007 247.896)",
    200: "oklch(92.9% 0.013 255.508)",
    300: "oklch(86.9% 0.022 252.894)",
    400: "oklch(70.4% 0.04 256.788)",
    500: "oklch(55.4% 0.046 257.417)",
    600: "oklch(44.6% 0.043 257.281)",
    700: "oklch(37.2% 0.044 257.287)",
    800: "oklch(27.9% 0.041 260.031)",
    900: "oklch(20.8% 0.042 265.755)",
    950: "oklch(12.9% 0.042 264.695)",
  },
  primary: {
    50: "oklch(98.4% 0.014 180.72)",
    100: "oklch(95.3% 0.051 180.801)",
    200: "oklch(91% 0.096 180.426)",
    300: "oklch(85.5% 0.138 181.071)",
    400: "oklch(77.7% 0.152 181.912)",
    500: "oklch(70.4% 0.14 182.503)",
    600: "oklch(60% 0.118 184.704)",
    700: "oklch(51.1% 0.096 186.391)",
    800: "oklch(43.7% 0.078 188.216)",
    900: "oklch(38.6% 0.063 188.416)",
    950: "oklch(27.7% 0.046 192.524)",
  },
  secondary: {
    50: "oklch(98.7% 0.022 95.277)",
    100: "oklch(96.2% 0.059 95.617)",
    200: "oklch(92.4% 0.12 95.746)",
    300: "oklch(87.9% 0.169 91.605)",
    400: "oklch(82.8% 0.189 84.429)",
    500: "oklch(76.9% 0.188 70.08)",
    600: "oklch(66.6% 0.179 58.318)",
    700: "oklch(55.5% 0.163 48.998)",
    800: "oklch(47.3% 0.137 46.201)",
    900: "oklch(41.4% 0.112 45.904)",
    950: "oklch(27.9% 0.077 45.635)",
  },
  accent: {
    50: "oklch(96.9% 0.015 12.422)",
    100: "oklch(94.1% 0.03 12.58)",
    200: "oklch(89.2% 0.058 10.001)",
    300: "oklch(81% 0.117 11.638)",
    400: "oklch(71.2% 0.194 13.428)",
    500: "oklch(64.5% 0.246 16.439)",
    600: "oklch(58.6% 0.253 17.585)",
    700: "oklch(51.4% 0.222 16.935)",
    800: "oklch(45.5% 0.188 13.697)",
    900: "oklch(41% 0.159 10.272)",
    950: "oklch(27.1% 0.105 12.094)",
  },
  success: {
    50: "oklch(98.2% 0.018 155.826)",
    100: "oklch(96.2% 0.044 156.743)",
    200: "oklch(92.5% 0.084 155.995)",
    300: "oklch(87.1% 0.15 154.449)",
    400: "oklch(79.2% 0.209 151.711)",
    500: "oklch(72.3% 0.219 149.579)",
    600: "oklch(62.7% 0.194 149.214)",
    700: "oklch(52.7% 0.154 150.069)",
    800: "oklch(44.8% 0.119 151.328)",
    900: "oklch(39.3% 0.095 152.535)",
    950: "oklch(26.6% 0.065 152.934)",
  },
  warning: {
    50: "oklch(98% 0.016 73.684)",
    100: "oklch(95.4% 0.038 75.164)",
    200: "oklch(90.1% 0.076 70.697)",
    300: "oklch(83.7% 0.128 66.29)",
    400: "oklch(75% 0.183 55.934)",
    500: "oklch(70.5% 0.213 47.604)",
    600: "oklch(64.6% 0.222 41.116)",
    700: "oklch(55.3% 0.195 38.402)",
    800: "oklch(47% 0.157 37.304)",
    900: "oklch(40.8% 0.123 38.172)",
    950: "oklch(26.6% 0.079 36.259)",
  },
  error: {
    50: "oklch(97.1% 0.013 17.38)",
    100: "oklch(93.6% 0.032 17.717)",
    200: "oklch(88.5% 0.062 18.334)",
    300: "oklch(80.8% 0.114 19.571)",
    400: "oklch(70.4% 0.191 22.216)",
    500: "oklch(63.7% 0.237 25.331)",
    600: "oklch(57.7% 0.245 27.325)",
    700: "oklch(50.5% 0.213 27.518)",
    800: "oklch(44.4% 0.177 26.899)",
    900: "oklch(39.6% 0.141 25.723)",
    950: "oklch(25.8% 0.092 26.042)",
  },
  info: {
    50: "oklch(97.7% 0.013 236.62)",
    100: "oklch(95.1% 0.026 236.824)",
    200: "oklch(90.1% 0.058 230.902)",
    300: "oklch(82.8% 0.111 230.318)",
    400: "oklch(74.6% 0.16 232.661)",
    500: "oklch(68.5% 0.169 237.323)",
    600: "oklch(58.8% 0.158 241.966)",
    700: "oklch(50% 0.134 242.749)",
    800: "oklch(44.3% 0.11 240.79)",
    900: "oklch(39.1% 0.09 240.876)",
    950: "oklch(29.3% 0.066 243.157)",
  },
};

export type SemanticName =
  | "background"
  | "surface"
  | "surface-subtle"
  | "surface-muted"
  | "surface-elevated"
  | "surface-interactive"
  | "foreground"
  | "foreground-muted"
  | "foreground-subtle"
  | "border"
  | "border-strong"
  | "divider"
  | "primary"
  | "primary-hover"
  | "primary-active"
  | "primary-soft"
  | "primary-foreground"
  | "secondary"
  | "secondary-hover"
  | "secondary-active"
  | "secondary-soft"
  | "accent"
  | "accent-hover"
  | "accent-soft"
  | "success"
  | "success-soft"
  | "warning"
  | "warning-soft"
  | "error"
  | "error-soft"
  | "info"
  | "info-soft"
  | "neutral-soft";

export interface SemanticMode {
  [K: string]: string;
}

const brand = (name: string, n: ColorName): string => palette[name][n];
const neutral = (n: ColorName): string => palette.neutral[n];

export const semantic: Record<
  "light" | "dark",
  Record<SemanticName, string>
> = {
  light: {
    background: neutral("50"),
    surface: "oklch(100% 0 0)",
    "surface-subtle": neutral("50"),
    "surface-muted": neutral("100"),
    "surface-elevated": "oklch(100% 0 0)",
    "surface-interactive": neutral("100"),
    foreground: neutral("900"),
    "foreground-muted": neutral("500"),
    "foreground-subtle": neutral("600"),
    border: neutral("300"),
    "border-strong": neutral("400"),
    divider: neutral("200"),
    primary: brand("primary", "700"),
    "primary-hover": brand("primary", "800"),
    "primary-active": brand("primary", "900"),
    "primary-soft": brand("primary", "50"),
    "primary-foreground": "oklch(100% 0 0)",
    secondary: brand("secondary", "500"),
    "secondary-hover": brand("secondary", "600"),
    "secondary-active": brand("secondary", "700"),
    "secondary-soft": brand("secondary", "50"),
    accent: brand("accent", "500"),
    "accent-hover": brand("accent", "600"),
    "accent-soft": brand("accent", "50"),
    success: brand("success", "500"),
    "success-soft": brand("success", "50"),
    warning: brand("warning", "600"),
    "warning-soft": brand("warning", "100"),
    error: brand("error", "600"),
    "error-soft": brand("error", "100"),
    info: brand("info", "500"),
    "info-soft": brand("info", "50"),
    "neutral-soft": neutral("100"),
  },
  dark: {
    background: neutral("950"),
    surface: neutral("900"),
    "surface-subtle": neutral("950"),
    "surface-muted": neutral("800"),
    "surface-elevated": neutral("800"),
    "surface-interactive": neutral("800"),
    foreground: neutral("200"),
    "foreground-muted": neutral("400"),
    "foreground-subtle": neutral("500"),
    border: neutral("700"),
    "border-strong": neutral("600"),
    divider: neutral("800"),
    primary: brand("primary", "400"),
    "primary-hover": brand("primary", "500"),
    "primary-active": brand("primary", "600"),
    "primary-soft": brand("primary", "900"),
    "primary-foreground": "oklch(20.5% 0.042 264.665)",
    secondary: brand("secondary", "400"),
    "secondary-hover": brand("secondary", "500"),
    "secondary-active": brand("secondary", "600"),
    "secondary-soft": brand("secondary", "900"),
    accent: brand("accent", "400"),
    "accent-hover": brand("accent", "500"),
    "accent-soft": brand("accent", "900"),
    success: brand("success", "400"),
    "success-soft": brand("success", "900"),
    warning: brand("warning", "400"),
    "warning-soft": brand("warning", "900"),
    error: brand("error", "400"),
    "error-soft": brand("error", "900"),
    info: brand("info", "400"),
    "info-soft": brand("info", "900"),
    "neutral-soft": neutral("800"),
  },
};

export type SemanticKey = keyof typeof semantic.light;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  xl2: "1.5rem",
  xl3: "1.75rem",
  xl4: "2rem",
  xl5: "2.5rem",
  xl6: "3rem",
  xs2: "0.125rem",
} as const;

export const radius = {
  none: "0",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  xl2: "1rem",
  xl3: "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  none: "0 0 0 0 rgba(0, 0, 0, 0)",
  subtle: "0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
  medium: "0 2px 6px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.07)",
  elevated: "0 6px 18px 0 rgb(0 0 0 / 0.06), 0 2px 6px 0 rgb(0 0 0 / 0.06)",
} as const;

export type ShadowName = keyof typeof shadows;

export const motion = {
  duration: {
    instant: "0ms",
    fastest: "50ms",
    faster: "100ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    standardAccel: "cubic-bezier(0.3, 0, 0, 1)",
    standardDecel: "cubic-bezier(0, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    emphasizedAccel: "cubic-bezier(0.3, 0, 0, 1)",
    emphasizedDecel: "cubic-bezier(0, 0, 0, 1)",
  },
} as const;

export const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  xl2: "96rem",
} as const;

export interface TypographyLevel {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  fontWeight: number;
  letterSpacing?: string;
}

export const typography: Record<string, TypographyLevel> = {
  display: {
    fontFamily: "var(--font-fa)",
    fontSize: "2.75rem",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  h1: {
    fontFamily: "var(--font-fa)",
    fontSize: "2.25rem",
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  h2: {
    fontFamily: "var(--font-fa)",
    fontSize: "1.75rem",
    lineHeight: 1.2,
    fontWeight: 600,
  },
  h3: {
    fontFamily: "var(--font-fa)",
    fontSize: "1.375rem",
    lineHeight: 1.3,
    fontWeight: 600,
  },
  h4: {
    fontFamily: "var(--font-fa)",
    fontSize: "1.125rem",
    lineHeight: 1.4,
    fontWeight: 600,
  },
  "body-lg": {
    fontFamily: "var(--font-fa)",
    fontSize: "1.125rem",
    lineHeight: 1.6,
    fontWeight: 400,
  },
  body: {
    fontFamily: "var(--font-fa)",
    fontSize: "1rem",
    lineHeight: 1.65,
    fontWeight: 400,
  },
  "body-sm": {
    fontFamily: "var(--font-fa)",
    fontSize: "0.875rem",
    lineHeight: 1.55,
    fontWeight: 400,
  },
  caption: {
    fontFamily: "var(--font-fa)",
    fontSize: "0.75rem",
    lineHeight: 1.4,
    fontWeight: 500,
    letterSpacing: "0.02em",
  },
  label: {
    fontFamily: "var(--font-fa)",
    fontSize: "0.875rem",
    lineHeight: 1.4,
    fontWeight: 600,
  },
} as const;

export const novaTheme = {
  palette,
  semantic,
  spacing,
  radius,
  shadows,
  motion,
  breakpoints,
  typography,
} as const;

export type NovaTheme = typeof novaTheme;

export function antdToken(mode: "light" | "dark"): ThemeConfig {
  const s = semantic[mode];
  return {
    token: {
      colorPrimary: s.primary,
      colorPrimaryBorder: s["primary-hover"],
      colorPrimaryHover: s["primary-hover"],
      colorText: s.foreground,
      colorTextSecondary: s["foreground-muted"],
      colorTextTertiary: s["foreground-subtle"],
      colorTextLabel: s.foreground,
      colorTextDescription: s["foreground-muted"],
      colorTextPlaceholder: s["foreground-subtle"],
      colorTextDisabled: s["foreground-subtle"],
      colorTextHeading: s.foreground,
      colorTextLightSolid: s["primary-foreground"],
      colorBorder: s.border,
      colorBorderSecondary: s.border,
      colorBorderBg: s["surface-elevated"],
      colorSplit: s.divider,
      colorBgContainer: s.surface,
      colorBgElevated: s["surface-elevated"],
      colorBgMask: "rgb(0 0 0 / 0.42)",
      colorBgTextHover: s["surface-interactive"],
      colorFillAlter: s["surface-muted"],
      colorFillContent: s["surface-subtle"],
      colorFillContentHover: s["surface-interactive"],
      colorIcon: s.foreground,
      colorIconHover: s["foreground-muted"],
      borderRadius: 8,
      borderRadiusOuter: 8,
      borderRadiusSM: 4,
      controlOutline: s.primary,
      boxShadow: shadows.none,
      boxShadowSecondary: shadows.none,
      boxShadowTertiary: shadows.none,
      fontFamily: "var(--font-fa), system-ui, sans-serif",
      fontSize: 14,
    },
  };
}

export function cssThemeVars(): string {
  const lines: string[] = [];
  const darkLines: string[] = [];

  for (const [name, scale] of Object.entries(palette)) {
    for (const [stop, value] of Object.entries(scale)) {
      lines.push(`--nova-color-${name}-${stop}: ${value};`);
    }
  }

  for (const [key, value] of Object.entries(semantic.light)) {
    if (!value.startsWith("var(--color-")) {
      lines.push(`--nova-${key}: ${value};`);
    }
  }
  for (const [key, value] of Object.entries(semantic.dark)) {
    if (!value.startsWith("var(--color-")) {
      darkLines.push(`--nova-${key}: ${value};`);
    }
  }

  lines.push(`--nova-shadow-subtle: ${shadows.subtle};`);
  lines.push(`--nova-shadow-medium: ${shadows.medium};`);
  lines.push(`--nova-shadow-elevated: ${shadows.elevated};`);
  lines.push(`--nova-radius-sm: ${radius.sm};`);
  lines.push(`--nova-radius-md: ${radius.md};`);
  lines.push(`--nova-radius-lg: ${radius.lg};`);
  lines.push(`--nova-radius-xl: ${radius.xl};`);
  lines.push(`--nova-radius-2xl: ${radius.xl2};`);
  lines.push(`--nova-radius-3xl: ${radius.xl3};`);
  lines.push(`--nova-radius-full: ${radius.full};`);
  lines.push(`--nova-duration-fast: ${motion.duration.fast};`);
  lines.push(`--nova-duration-normal: ${motion.duration.normal};`);
  lines.push(`--nova-duration-slow: ${motion.duration.slow};`);

  let css = `:root {\n${lines.join("\n")}\n}`;
  if (darkLines.length > 0) {
    css += `\n:root.dark {\n${darkLines.join("\n")}\n}`;
  }
  return css;
}
