import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = 'https://darrenlbuckner.com'

export const metadata: Metadata = {
  title: {
    default: 'Darren L. Buckner — Entrepreneur, Builder, Veteran',
    template: '%s | Darren L. Buckner',
  },
  description:
    'Darren L. Buckner is an entrepreneur, real estate developer, Army veteran, and self-taught technologist. Founder of Portal Home Hub.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Darren L. Buckner',
    title: 'Darren L. Buckner',
    description:
      'Entrepreneur, Builder, Technologist, Veteran. Founder of Portal Home Hub — the Zillow of the Global South.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darren L. Buckner',
    description:
      'Entrepreneur, Builder, Technologist, Veteran. Founder of Portal Home Hub — the Zillow of the Global South.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
