import { NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'

const ContactSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(80, 'Name is too long'),
  email: z.string().email('Invalid email address').max(200),
  message: z.string().min(10, 'Message is too short').max(2000, 'Message is too long'),
  website: z.string().optional(), // honeypot
  ts: z.number().optional(), // timestamp ms
})

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0'

    // Basic rate limit: 5 req/h per IP
    const { allowed, remaining, resetAt } = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Try again later.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining), 'X-RateLimit-Reset': String(resetAt) } },
      )
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid Content-Type' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, message, website, ts } = parsed.data

    // Honeypot
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 }) // silently ignore bots
    }

    // Minimum dwell time on form (3s)
    if (typeof ts === 'number') {
      const now = Date.now()
      if (now - ts < 3000) {
        return NextResponse.json({ ok: false, error: 'Submission too fast.' }, { status: 400 })
      }
    }

    // Send email
    const result = await sendContactEmail({ name, email, message })
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
