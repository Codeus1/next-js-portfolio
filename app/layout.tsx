import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Antonio Muñoz Portfolio',
  description: 'Desarrollador Full-Stack | React, Next.js, Node.js | Proyectos Innovadores y Soluciones a Medida',
  generator: 'Next.js',
  applicationName: 'Antonio Muñoz Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Antonio Muñoz', 'Desarrollador Full-Stack', 'React', 'Next.js', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Antonio Muñoz', url: 'https://antonio-munoz-portfolio.vercel.app' }],
  creator: 'Antonio Muñoz',
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
