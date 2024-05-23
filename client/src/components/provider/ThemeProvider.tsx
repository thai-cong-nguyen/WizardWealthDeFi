"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as MaterialThemesProvider } from "@mui/material/styles";
import theme from "@/themes/muiTheme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MaterialThemesProvider theme={theme}>{children}</MaterialThemesProvider>
    </NextThemesProvider>
  );
}
