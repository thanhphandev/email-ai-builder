import { appleTheme } from "./themes/apple"
import { defaultTheme } from "./themes/default"
import { discordTheme } from "./themes/discord"
import { githubTheme } from "./themes/github"
import { googleTheme } from "./themes/google"
import { microsoftTheme } from "./themes/microsoft"
import { orangeTheme } from "./themes/orange"
import { supabaseTheme } from "./themes/supabase"
import { telegramTheme } from "./themes/telegram"
import { youtubeTheme } from "./themes/youtube"
import { zaloTheme } from "./themes/zalo"

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

export interface ThemeFonts {
    sans: string
    mono: string
    heading: string
}

export interface Theme {
    name: string
    label: string
    cssClass: string
    colors: {
        light: ThemeColors
        dark: ThemeColors
    }
    fonts?: ThemeFonts
}

export const themes: Theme[] = [
    defaultTheme,
    orangeTheme,
    supabaseTheme,
    microsoftTheme,
    googleTheme,
    appleTheme,
    youtubeTheme,
    githubTheme,
    telegramTheme,
    discordTheme,
    zaloTheme
]

export function getTheme(name: string): Theme | undefined {
    return themes.find(theme => theme.name === name)
}

export function getThemeNames(): string[] {
    return themes.map(theme => theme.name)
}
