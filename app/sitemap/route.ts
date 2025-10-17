import { NextResponse } from 'next/server'

const SITE_URL = 'https://antonio-munoz.vercel.app'

export async function GET() {
  const pages = [
    '',
    'about',
    'projects',
    'contact',
  ]

  const urls = pages
    .map((p) => {
      return `  <url>
    <loc>${SITE_URL}/${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
