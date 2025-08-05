"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"
import { useCustomTheme } from "@/hooks/use-theme"
import { themes } from "@/lib/themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSelector() {
  const { theme, setTheme } = useCustomTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Chọn theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Chọn theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-border"
                style={{
                  background: `linear-gradient(135deg, ${themeOption.colors.light.primary} 0%, ${themeOption.colors.light.accent} 100%)`
                }}
              />
              <span>{themeOption.label}</span>
            </div>
            {theme === themeOption.name && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
