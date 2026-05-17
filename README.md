# Email AI Builder 📧✨

A powerful, AI-driven email template builder that helps you create stunning, responsive email templates with ease. Built with Next.js, TypeScript, and modern web technologies.

## 🚀 Features

- **AI-Powered Generation**: Create email templates using AI assistance
- **Multiple Themes**: Choose from 11+ beautiful themes including brand-inspired designs (Apple, Google, Microsoft, Netflix, Spotify, etc.)
- **Responsive Design**: All templates are mobile-friendly and cross-platform compatible
- **Real-time Preview**: See your changes instantly with live preview
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Theme Customization**: Light/dark mode support with extensive color customization
- **Export Options**: Export templates in multiple formats
- **TypeScript**: Fully typed for better development experience

## 🎨 Available Themes

### Popular Color Schemes
- **Light** - Clean and minimal light theme
- **Dark** - Elegant dark theme  
- **Blue** - Professional blue accent theme

### Brand-Inspired Themes
- **Apple** - Sleek and minimalist design
- **Google** - Clean Material Design inspired
- **Microsoft** - Professional corporate style
- **Netflix** - Bold and dramatic red theme
- **Spotify** - Vibrant green music theme
- **Twitter/X** - Social media blue theme
- **Instagram** - Gradient-inspired design
- **WhatsApp** - Friendly green messaging theme

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Color System**: OKLCH color space
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/email-ai-builder.git
   cd email-ai-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Getting Started

1. **Choose a Theme**: Select from our collection of professional themes
2. **Design Your Email**: Use the AI assistant or manual tools to create your template
3. **Customize**: Adjust colors, fonts, and layout to match your brand
4. **Preview**: See how your email looks across different devices
5. **Export**: Download your template or copy the HTML/CSS code

## 📁 Project Structure

```
email-ai-builder/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── lib/                # Utility functions
│   │   ├── themes.ts       # Theme configurations
│   │   └── utils.ts        # Helper functions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── README.md
├── package.json
└── ...
```

## 🎯 Usage Examples

### Basic Email Template
```typescript
import { getTheme } from '@/lib/themes'

const theme = getTheme('apple')
// Use theme colors and fonts in your email template
```

### Custom Theme Implementation
```typescript
// Add your custom theme to themes.ts
const customTheme: Theme = {
  name: "custom",
  label: "Custom Brand",
  cssClass: "theme-custom",
  colors: {
    light: { /* your light theme colors */ },
    dark: { /* your dark theme colors */ }
  },
  fonts: {
    sans: "'Your Brand Font', sans-serif",
    // ...
  }
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# AI Service Configuration
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Theme Customization
Themes are configured in `src/lib/themes.ts`. Each theme includes:
- Light and dark mode color palettes
- Typography settings
- CSS class names for styling

## 📱 Browser Support

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

- 📧 Email: support@email-ai-builder.com
- 💬 Discord: [Join our community](https://discord.gg/email-ai-builder)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/email-ai-builder/issues)

## 🗺️ Roadmap

- [ ] Advanced AI template generation
- [ ] Email testing across clients
- [ ] Template marketplace
- [ ] Collaboration features
- [ ] API integrations
- [ ] Mobile app

---

Made with ❤️ by [Phan Văn Thành](https://github.com/thanhphandev)
