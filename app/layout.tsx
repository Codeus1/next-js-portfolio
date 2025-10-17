import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const SITE_URL = 'https://antonio-munoz.vercel.app'
const SITE_NAME = 'Antonio Muñoz — Frontend Developer'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Next.js & React`,
    template: '%s — Antonio Muñoz',
  },
  description: 'I build accessible, high-performance interfaces with Next.js for startups and agencies.',
  applicationName: 'Antonio Muñoz Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Antonio Muñoz',
    'Frontend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind',
    'Three.js',
    'freelance',
    'remote',
    'Madrid',
  ],
  authors: [{ name: 'Antonio Muñoz', url: SITE_URL }],
  creator: 'Antonio Muñoz',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_NAME,
    description: 'I build accessible, high-performance interfaces with Next.js for startups and agencies.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/og-default.svg`, width: 1200, height: 630, alt: 'Antonio Muñoz — Frontend Developer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'I build accessible, high-performance interfaces with Next.js for startups and agencies.',
    images: [`${SITE_URL}/og-default.svg`],
  },
  verification: {
    
    google: 'TsVpjtEQWVGyYZFRYTPXF7IeaaBv28OrI5vhBv6logM',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {/* JSON-LD Person schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Antonio Muñoz',
                jobTitle: 'Frontend Developer | Next.js & React',
                url: SITE_URL,
                sameAs: [
                  'https://github.com/Codeus1',
                  'https://www.linkedin.com/in/antonio-munoz-torres/',
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Madrid',
                  addressCountry: 'ES',
                },
              }),
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
