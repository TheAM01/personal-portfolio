import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | Abdul Mueed' },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.me }],
  creator: site.author,
  publisher: site.author,
  keywords: ['Abdul Mueed', 'software engineer', 'full stack developer', 'software architect', 'portfolio', 'SaaS products', 'Next.js developer', 'Karachi', 'Pakistan'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: site.title,
    description: site.description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <div className="min-h-screen bg-background text-foreground overflow-x-clip texture-grid-me">
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-black rounded-full mix-blend-darken filter blur-3xl opacity-2 animate-float-1" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-black rounded-full mix-blend-darken filter blur-3xl opacity-2 animate-float-2" />
          </div>
          <SiteHeader />
          <div className="relative z-10">
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
