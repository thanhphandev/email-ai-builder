"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { themes, type Theme } from "@/lib/themes"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
  mode: "light" | "dark" | "system"
  setMode: (mode: "light" | "dark" | "system") => void
  currentTheme: Theme
}

const initialState: ThemeProviderState = {
  theme: "default",
  setTheme: () => null,
  mode: "system",
  setMode: () => null,
  currentTheme: themes[0],
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function CustomThemeProvider({
  children,
  defaultTheme = "default",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(defaultTheme)
  const [mode, setMode] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey)
    const storedMode = localStorage.getItem(`${storageKey}-mode`)
    
    if (storedTheme) {
      setTheme(storedTheme)
    }
    
    if (storedMode && (storedMode === "light" || storedMode === "dark" || storedMode === "system")) {
      setMode(storedMode)
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove all theme classes
    themes.forEach(t => {
      root.classList.remove(t.cssClass)
    })
    
    // Add current theme class
    const currentTheme = themes.find(t => t.name === theme) || themes[0]
    root.classList.add(currentTheme.cssClass)
    
    // Handle dark/light mode
    root.classList.remove("light", "dark")
    
    if (mode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(mode)
    }
    
    // Apply CSS variables
    const colors = mode === "dark" ? currentTheme.colors.dark : currentTheme.colors.light
    
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }, [theme, mode])

  const value = {
    theme,
    setTheme: (theme: string) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    mode,
    setMode: (mode: "light" | "dark" | "system") => {
      localStorage.setItem(`${storageKey}-mode`, mode)
      setMode(mode)
    },
    currentTheme: themes.find(t => t.name === theme) || themes[0],
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useCustomTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")

  return context
}
