# Hệ thống Theme

Ứng dụng này có hệ thống theme linh hoạt và có thể mở rộng dễ dàng.

## Tính năng

- **Nhiều theme có sẵn**: Mặc định, Xanh dương, Xanh lá, Tím, Cam
- **Chế độ sáng/tối**: Hỗ trợ chế độ sáng, tối và theo hệ thống
- **Chuyển đổi mượt mà**: Hiệu ứng chuyển tiếp CSS khi thay đổi theme
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
  colorPresets.red.dark
)

themes.push(myTheme)
```

## Cấu trúc file

- `src/lib/themes.ts`: Định nghĩa các theme
- `src/hooks/use-theme.tsx`: Hook quản lý theme và provider
- `src/components/theme-selector.tsx`: Component chọn theme
- `src/components/theme-toggle.tsx`: Component chuyển đổi chế độ sáng/tối
- `src/components/theme-customizer.tsx`: Component xem chi tiết theme
- `src/utils/theme-creator.ts`: Utilities để tạo theme mới
- `src/app/globals.css`: CSS với transitions và theme variables

## API

### useCustomTheme Hook
```typescript
const {
  theme,        // tên theme hiện tại
  setTheme,     // function để thay đổi theme
  mode,         // chế độ hiện tại: "light" | "dark" | "system"
  setMode,      // function để thay đổi chế độ
  currentTheme  // object theme hiện tại
} = useCustomTheme()
```

### Theme Interface
```typescript
interface Theme {
  name: string           // tên duy nhất
  label: string          // nhãn hiển thị
  cssClass: string       // CSS class
  colors: {
    light: ThemeColors   // màu sắc cho chế độ sáng
    dark: ThemeColors    // màu sắc cho chế độ tối
  }
}
```

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
- Hỗ trợ SSR với suppressHydrationWarning
