import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CustomThemeProvider } from '@/hooks/use-theme';
import { UserProvider } from '@/hooks/use-user';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Email Generator - Create Professional HTML Emails with AI',
  description: 'Generate responsive, production-ready HTML emails from simple text descriptions using AI. Perfect for marketers, developers, and businesses.',
  keywords: 'AI email generator, HTML email, email templates, responsive email, email marketing, AI email design',
  authors: [{ name: 'AI Email Generator' }],
  creator: 'AI Email Generator',
  publisher: 'AI Email Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-email-generator.vercel.app'),
  openGraph: {
    title: 'AI Email Generator - Create Professional HTML Emails with AI',
    description: 'Generate responsive, production-ready HTML emails from simple text descriptions using AI.',
    url: 'https://ai-email-generator.vercel.app',
    siteName: 'AI Email Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Email Generator - Create Professional HTML Emails with AI',
    description: 'Generate responsive, production-ready HTML emails from simple text descriptions using AI.',
    creator: '@aiemail',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CustomThemeProvider
          defaultTheme="default"
          storageKey="ui-theme"
        >
          <UserProvider>
            <TooltipProvider>
              {children}
              <Toaster position="bottom-right" />
            </TooltipProvider>
          </UserProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}