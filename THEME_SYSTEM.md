# Hệ thống Theme

Ứng dụng này có hệ thống theme linh hoạt và có thể mở rộng dễ dàng với hỗ trợ font customization.

## Tính năng

- **Nhiều theme có sẵn**: Mặc định, Xanh dương, Xanh lá, Tím, Cam, YouTube, GitHub, Chuyên nghiệp
- **Chế độ sáng/tối**: Hỗ trợ chế độ sáng, tối và theo hệ thống
- **Font customization**: Mỗi theme có thể có font riêng cho sans, mono, và heading
- **Chuyển đổi mượt mà**: Hiệu ứng chuyển tiếp CSS khi thay đổi theme và font
- **Lưu trữ local**: Theme và chế độ được lưu trong localStorage
- **Dễ mở rộng**: Có thể thêm theme mới một cách dễ dàng

## Cách sử dụng

### Thay đổi theme
1. Nhấn vào icon palette (🎨) để chọn theme
2. Nhấn vào icon monitor/sun/moon để chuyển đổi chế độ sáng/tối
3. Nhấn vào icon settings (⚙️) để xem chi tiết theme và sao chép cấu hình

### Thêm theme mới

1. **Cách 1: Thêm vào file themes.ts**
```typescript
// src/lib/themes.ts
export const themes: Theme[] = [
  // ... các theme hiện có
  {
    name: "my-theme",
    label: "Theme của tôi",
    cssClass: "theme-my-theme",
    colors: {
      light: {
        primary: "oklch(0.65 0.2 120)", // màu xanh lá
        // ... các màu khác
      },
      dark: {
        primary: "oklch(0.75 0.15 120)",
        // ... các màu khác
      }
    },
    fonts: {
      sans: "'Inter', sans-serif",
      mono: "'Fira Code', monospace",
      heading: "'Inter', sans-serif",
    }
  }
]
```

2. **Cách 2: Sử dụng theme creator utility**
```typescript
// src/utils/theme-creator.ts
import { createNewTheme, colorPresets } from "@/utils/theme-creator"
import { themes } from "@/lib/themes"

const myTheme = createNewTheme(
  "red",
  "Đỏ",
  colorPresets.red.light,
  colorPresets.red.dark,
  {
    sans: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace", 
    heading: "'Roboto', sans-serif",
  }
)

themes.push(myTheme)
```

## Themes có sẵn

### YouTube Theme
- **Màu chính**: YouTube Red (#FF0000)
- **Font**: Roboto family
- **Đặc điểm**: Thiết kế hiện đại, tập trung vào video content

### GitHub Theme  
- **Màu chính**: GitHub Green (#2EA44F)
- **Font**: Segoe UI, Helvetica Neue
- **Đặc điểm**: Thiết kế developer-friendly, tối giản

### Professional Theme
- **Màu chính**: Neutral Gray (#424242)
- **Font**: Helvetica Neue (như bạn yêu cầu)
- **Đặc điểm**: Thiết kế business, chuyên nghiệp

## Cấu trúc file

- `src/lib/themes.ts`: Định nghĩa các theme và fonts
- `src/hooks/use-theme.tsx`: Hook quản lý theme, mode và font
- `src/components/theme-selector.tsx`: Component chọn theme
- `src/components/theme-toggle.tsx`: Component chuyển đổi chế độ sáng/tối
- `src/components/theme-customizer.tsx`: Component xem chi tiết theme và font
- `src/utils/theme-creator.ts`: Utilities để tạo theme mới
- `src/app/globals.css`: CSS với transitions, theme variables và font support

## API

### useCustomTheme Hook
```typescript
const {
  theme,        // tên theme hiện tại
  setTheme,     // function để thay đổi theme
  mode,         // chế độ hiện tại: "light" | "dark" | "system"
  setMode,      // function để thay đổi chế độ
  currentTheme  // object theme hiện tại (bao gồm fonts)
} = useCustomTheme()
```

### Theme Interface với Font Support
```typescript
interface Theme {
  name: string           // tên duy nhất
  label: string          // nhãn hiển thị
  cssClass: string       // CSS class
  colors: {
    light: ThemeColors   // màu sắc cho chế độ sáng
    dark: ThemeColors    // màu sắc cho chế độ tối
  }
  fonts?: ThemeFonts     // font configuration (optional)
}

interface ThemeFonts {
  sans: string           // font cho text thường
  mono: string           // font cho code
  heading: string        // font cho headings
}
```

## Font System

Hệ thống font được tích hợp với CSS variables:

- `--font-sans`: Font cho text thường
- `--font-mono`: Font cho code blocks
- `--font-heading`: Font cho tiêu đề

### CSS Classes tự động
- `body`: Sử dụng `--font-sans`
- `h1, h2, h3, h4, h5, h6`: Sử dụng `--font-heading`
- `code, pre, .font-mono`: Sử dụng `--font-mono`

## Màu sắc hỗ trợ

Mỗi theme có các màu sau:
- `background`, `foreground`: Màu nền và chữ chính
- `card`, `cardForeground`: Màu card
- `popover`, `popoverForeground`: Màu popover
- `primary`, `primaryForeground`: Màu chính
- `secondary`, `secondaryForeground`: Màu phụ
- `muted`, `mutedForeground`: Màu nhạt
- `accent`, `accentForeground`: Màu nhấn
- `destructive`: Màu cảnh báo
- `border`, `input`, `ring`: Màu viền và input

## Lưu ý

- Theme được lưu trong localStorage với key `ui-theme`
- Chế độ được lưu trong localStorage với key `ui-theme-mode`
- CSS variables được cập nhật tự động khi thay đổi theme
- Font variables được áp dụng tự động với fallback
- Hỗ trợ SSR với suppressHydrationWarning
- Smooth transitions cho cả màu sắc và font
