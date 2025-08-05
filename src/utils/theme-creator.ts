import { Theme } from "@/lib/themes"

// Hướng dẫn tạo theme mới:
// 1. Tạo theme configuration theo interface Theme
// 2. Thêm vào mảng themes trong themes.ts
// 3. CSS variables sẽ được áp dụng tự động

export const createNewTheme = (
  name: string,
  label: string,
  lightColors: Record<string, string>,
  darkColors: Record<string, string>
): Theme => {
  return {
    name,
    label,
    cssClass: `theme-${name}`,
    colors: {
      light: {
        background: lightColors.background || "oklch(1 0 0)",
        foreground: lightColors.foreground || "oklch(0.145 0 0)",
        card: lightColors.card || "oklch(1 0 0)",
        cardForeground: lightColors.cardForeground || "oklch(0.145 0 0)",
        popover: lightColors.popover || "oklch(1 0 0)",
        popoverForeground: lightColors.popoverForeground || "oklch(0.145 0 0)",
        primary: lightColors.primary || "oklch(0.205 0 0)",
        primaryForeground: lightColors.primaryForeground || "oklch(0.985 0 0)",
        secondary: lightColors.secondary || "oklch(0.97 0 0)",
        secondaryForeground: lightColors.secondaryForeground || "oklch(0.205 0 0)",
        muted: lightColors.muted || "oklch(0.97 0 0)",
        mutedForeground: lightColors.mutedForeground || "oklch(0.556 0 0)",
        accent: lightColors.accent || "oklch(0.97 0 0)",
        accentForeground: lightColors.accentForeground || "oklch(0.205 0 0)",
        destructive: lightColors.destructive || "oklch(0.577 0.245 27.325)",
        border: lightColors.border || "oklch(0.922 0 0)",
        input: lightColors.input || "oklch(0.922 0 0)",
        ring: lightColors.ring || "oklch(0.708 0 0)",
      },
      dark: {
        background: darkColors.background || "oklch(0.145 0 0)",
        foreground: darkColors.foreground || "oklch(0.985 0 0)",
        card: darkColors.card || "oklch(0.205 0 0)",
        cardForeground: darkColors.cardForeground || "oklch(0.985 0 0)",
        popover: darkColors.popover || "oklch(0.205 0 0)",
        popoverForeground: darkColors.popoverForeground || "oklch(0.985 0 0)",
        primary: darkColors.primary || "oklch(0.922 0 0)",
        primaryForeground: darkColors.primaryForeground || "oklch(0.205 0 0)",
        secondary: darkColors.secondary || "oklch(0.269 0 0)",
        secondaryForeground: darkColors.secondaryForeground || "oklch(0.985 0 0)",
        muted: darkColors.muted || "oklch(0.269 0 0)",
        mutedForeground: darkColors.mutedForeground || "oklch(0.708 0 0)",
        accent: darkColors.accent || "oklch(0.269 0 0)",
        accentForeground: darkColors.accentForeground || "oklch(0.985 0 0)",
        destructive: darkColors.destructive || "oklch(0.704 0.191 22.216)",
        border: darkColors.border || "oklch(1 0 0 / 10%)",
        input: darkColors.input || "oklch(1 0 0 / 15%)",
        ring: darkColors.ring || "oklch(0.556 0 0)",
      },
    },
  }
}

// Ví dụ cách tạo theme mới:
/*
import { createNewTheme } from "@/utils/theme-creator"
import { themes } from "@/lib/themes"

const myCustomTheme = createNewTheme(
  "pink",
  "Hồng",
  {
    primary: "oklch(0.65 0.2 350)",
    accent: "oklch(0.94 0.025 350)",
    ring: "oklch(0.65 0.2 350)",
  },
  {
    primary: "oklch(0.75 0.15 350)",
    accent: "oklch(0.32 0.05 350)",
    ring: "oklch(0.75 0.15 350)",
  }
)

// Thêm vào mảng themes
themes.push(myCustomTheme)
*/

// Utility functions cho việc tạo theme
export const generateThemeVariants = (baseHue: number, saturation: number = 0.15) => {
  return {
    light: {
      primary: `oklch(0.55 ${saturation} ${baseHue})`,
      accent: `oklch(0.94 ${saturation * 0.2} ${baseHue})`,
      ring: `oklch(0.55 ${saturation} ${baseHue})`,
    },
    dark: {
      primary: `oklch(0.7 ${saturation * 0.8} ${baseHue})`,
      accent: `oklch(0.32 ${saturation * 0.4} ${baseHue})`,
      ring: `oklch(0.7 ${saturation * 0.8} ${baseHue})`,
    }
  }
}

// Preset color schemes
export const colorPresets = {
  red: generateThemeVariants(0, 0.18),
  pink: generateThemeVariants(350, 0.2),
  rose: generateThemeVariants(330, 0.15),
  violet: generateThemeVariants(270, 0.18),
  indigo: generateThemeVariants(240, 0.2),
  cyan: generateThemeVariants(200, 0.18),
  teal: generateThemeVariants(180, 0.15),
  emerald: generateThemeVariants(160, 0.15),
  lime: generateThemeVariants(80, 0.18),
  yellow: generateThemeVariants(60, 0.2),
  amber: generateThemeVariants(45, 0.2),
}
