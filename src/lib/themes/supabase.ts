export const supabaseTheme = {
  name: "supabase",
  label: "Supabase",
  cssClass: "theme-supabase",
  colors: {
    light: {
      background: "oklch(1 0 0)",                // Trắng
      foreground: "oklch(0.15 0 0)",             // Đen xám
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0 0)",
      popover: "oklch(0.98 0 0)",
      popoverForeground: "oklch(0.2 0 0)",
      primary: "oklch(0.6 0.15 150)",            // Xanh Supabase (#3ECF8E)
      primaryForeground: "oklch(0.15 0 0)",      
      secondary: "oklch(0.9 0 0)",               // Xám nhạt
      secondaryForeground: "oklch(0.25 0 0)",    
      muted: "oklch(0.95 0 0)",                  
      mutedForeground: "oklch(0.5 0 0)",
      accent: "oklch(0.65 0.12 150)",            // Xanh nhấn nhạt hơn
      accentForeground: "oklch(0.15 0 0)",
      destructive: "oklch(0.6 0.2 30)",          // Đỏ cảnh báo
      border: "oklch(0.9 0 0)",
      input: "oklch(1 0 0)",
      ring: "oklch(0.6 0.15 150)",               // Xanh viền Supabase
    },
    dark: {
      background: "oklch(0.13 0 0)",             // #1A1A1A (Dark background)
      foreground: "oklch(1 0 0)",                // Trắng
      card: "oklch(0.16 0 0)",                   // #292929
      cardForeground: "oklch(1 0 0)",
      popover: "oklch(0.18 0 0)",                
      popoverForeground: "oklch(1 0 0)",
      primary: "oklch(0.7 0.18 150)",            // Xanh Supabase sáng hơn (#3ECF8E)
      primaryForeground: "oklch(0.15 0 0)",
      secondary: "oklch(0.25 0 0)",
      secondaryForeground: "oklch(1 0 0)",
      muted: "oklch(0.2 0 0)",
      mutedForeground: "oklch(0.7 0 0)",
      accent: "oklch(0.65 0.15 150)",
      accentForeground: "oklch(1 0 0)",
      destructive: "oklch(0.6 0.2 30)", 
      border: "oklch(0.25 0 0)",
      input: "oklch(0.18 0 0)",
      ring: "oklch(0.7 0.18 150)",               // Xanh nhấn dark mode
    },
  },
  fonts: {
    sans: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, Menlo, monospace",
    heading: "Inter, system-ui, sans-serif",
  }
}
