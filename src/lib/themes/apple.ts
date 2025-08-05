export const appleTheme = {
    name: "apple",
    label: "Apple",
    cssClass: "theme-apple",
    colors: {
        light: {
            background: "oklch(1 0 0)",                // #FFFFFF
            foreground: "oklch(0.15 0 0)",             // #242424 (xám đậm)
            card: "oklch(1 0 0)",                      // #FFFFFF
            cardForeground: "oklch(0.15 0 0)",         // #242424
            popover: "oklch(0.98 0 0)",                // #FAFAFA
            popoverForeground: "oklch(0.2 0 0)",       // #333333
            primary: "oklch(0.8 0 0)",                 // #CCCCCC (màu nhấn tinh tế)
            primaryForeground: "oklch(0.15 0 0)",      // #242424
            secondary: "oklch(0.93 0 0)",              // #EEEEEE
            secondaryForeground: "oklch(0.2 0 0)",     // #333333
            muted: "oklch(0.95 0 0)",                  // #F2F2F2
            mutedForeground: "oklch(0.5 0 0)",         // #808080
            accent: "oklch(0.8 0 0)",                  // #CCCCCC
            accentForeground: "oklch(0.15 0 0)",       // #242424
            destructive: "oklch(0.6 0.1 20)",          // Đỏ Apple (nhẹ)
            border: "oklch(0.9 0 0)",                  // #E6E6E6
            input: "oklch(1 0 0)",                     // #FFFFFF
            ring: "oklch(0.7 0 0)",                    // Xám nhạt tinh tế
        },
        dark: {
            background: "oklch(0.14 0 0)",             // #232323
            foreground: "oklch(1 0 0)",                // #FFFFFF
            card: "oklch(0.16 0 0)",                   // #292929
            cardForeground: "oklch(1 0 0)",            // #FFFFFF
            popover: "oklch(0.18 0 0)",                // #2D2D2D
            popoverForeground: "oklch(1 0 0)",         // #FFFFFF
            primary: "oklch(0.7 0 0)",                 // Xám tinh tế
            primaryForeground: "oklch(1 0 0)",         // #FFFFFF
            secondary: "oklch(0.2 0 0)",               // Xám tối
            secondaryForeground: "oklch(1 0 0)",       // #FFFFFF
            muted: "oklch(0.2 0 0)",                   // Xám muted
            mutedForeground: "oklch(0.7 0 0)",         // Xám nhạt
            accent: "oklch(0.7 0 0)",                  // Xám nhấn
            accentForeground: "oklch(1 0 0)",          // Trắng
            destructive: "oklch(0.55 0.1 20)",         // Đỏ Apple tối
            border: "oklch(0.25 0 0)",                 // #404040
            input: "oklch(0.18 0 0)",                  // Xám tối
            ring: "oklch(0.5 0 0)",                    // Xám nhạt viền
        }
    },
    fonts: {
        sans: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "SF Mono, Menlo, monospace",
        heading: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    }
}