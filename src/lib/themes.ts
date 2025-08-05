export interface ThemeColors {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
}

export interface Theme {
  name: string
  label: string
  cssClass: string
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
}

export const themes: Theme[] = [
  {
    name: "default",
    label: "Mặc định",
    cssClass: "theme-default",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.205 0 0)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.97 0 0)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.708 0 0)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.922 0 0)",
        primaryForeground: "oklch(0.205 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.269 0 0)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.556 0 0)",
      },
    },
  },
  {
    name: "blue",
    label: "Xanh dương",
    cssClass: "theme-blue",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.598 0.207 255.1)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.94 0.025 255.1)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.598 0.207 255.1)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.7 0.15 255.1)",
        primaryForeground: "oklch(0.145 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.32 0.05 255.1)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.7 0.15 255.1)",
      },
    },
  },
  {
    name: "green",
    label: "Xanh lá",
    cssClass: "theme-green",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.55 0.15 142)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.94 0.025 142)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.55 0.15 142)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.7 0.12 142)",
        primaryForeground: "oklch(0.145 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.32 0.05 142)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.7 0.12 142)",
      },
    },
  },
  {
    name: "purple",
    label: "Tím",
    cssClass: "theme-purple",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.55 0.18 295)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.94 0.025 295)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.55 0.18 295)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.7 0.15 295)",
        primaryForeground: "oklch(0.145 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.32 0.05 295)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.7 0.15 295)",
      },
    },
  },
  {
    name: "orange",
    label: "Cam",
    cssClass: "theme-orange",
    colors: {
      light: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.65 0.2 50)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.94 0.025 50)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.65 0.2 50)",
      },
      dark: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.75 0.15 50)",
        primaryForeground: "oklch(0.145 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.32 0.05 50)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.75 0.15 50)",
      },
    },
  },
]

export function getTheme(name: string): Theme | undefined {
  return themes.find(theme => theme.name === name)
}

export function getThemeNames(): string[] {
  return themes.map(theme => theme.name)
}
