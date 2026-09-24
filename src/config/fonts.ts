import { Inter, Vazirmatn } from "next/font/google";

export const inter = Inter({
  variable: "--font-en",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const vazirmatn = Vazirmatn({
  variable: "--font-fa",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const fontVars = `${vazirmatn.variable} ${inter.variable}`;
