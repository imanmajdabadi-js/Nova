"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { antdToken } from "@/styles/tokens";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (next: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within NovaThemeProvider");
  }
  return ctx;
}

export interface NovaThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

function readSystemMode(): ThemeMode {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialMode(defaultMode: ThemeMode): ThemeMode {
  if (typeof window === "undefined") return defaultMode;
  const saved = localStorage.getItem("nova-theme") as ThemeMode | null;
  return saved ?? readSystemMode();
}

function applyThemeClass(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function NovaThemeProvider({
  children,
  defaultMode = "light",
}: NovaThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() =>
    getInitialMode(defaultMode),
  );

  useEffect(() => {
    applyThemeClass(mode);
    localStorage.setItem("nova-theme", mode);
  }, [mode]);

  const toggleTheme = (): void => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ mode, toggleTheme, setMode }), [mode]);

  const config = useMemo(() => {
    const token = antdToken(mode).token;
    const algorithm =
      mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
    return { token, algorithm: [algorithm] };
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        direction="rtl"
        theme={config}
        getPopupContainer={() =>
          typeof document !== "undefined" ? document.body : ({} as HTMLElement)
        }
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
