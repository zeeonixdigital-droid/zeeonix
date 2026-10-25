import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import ChatWidget from '@/components/chat/ChatWidget';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zeeonix.com'),
  title: {
    default: 'Zeeonix Digital -- AI-Powered Digital Agency',
    template: '%s | Zeeonix Digital',
  },
  description:
    'Zeeonix Digital delivers digital marketing, web development, AI automation, graphic design, and more -- helping businesses grow online with smart technology.',
  keywords: [
    'digital marketing agency', 'web development', 'AI chatbot', 'SEO services',
    'social media marketing', 'graphic design', 'lead generation', 'India',
  ],
  authors: [{ name: 'Zeeonix Digital' }],
  creator: 'Zeeonix Digital',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Zeeonix Digital',
    title: 'Zeeonix Digital -- AI-Powered Digital Agency',
    description: 'Digital marketing, web development, AI automation & more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zeeonix Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeeonix Digital',
    description: 'AI-Powered Digital Agency',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-brand-navy text-brand-white">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}