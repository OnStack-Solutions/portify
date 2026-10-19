import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { person } from '@/content/profile';
import { getSiteUrl, seo } from '@/lib/site';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FloatingActions } from '@/components/FloatingActions';
import './globals.css';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${person.name}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: `${person.name} Portfolio`,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    firstName: 'Salman',
    lastName: 'Bashir',
    url: '/',
    siteName: person.name,
    title: seo.title,
    description: seo.description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
  category: 'technology',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0e1217' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1217' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
