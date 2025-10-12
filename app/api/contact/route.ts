import { NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'

const ContactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto').max(80, 'Nombre demasiado largo'),
  email: z.string().email('Email inválido').max(200),
  message: z.string().min(10, 'Mensaje demasiado corto').max(2000, 'Mensaje demasiado largo'),
  website: z.string().optional(), // honeypot
  ts: z.number().optional(), // timestamp ms
})

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0'

    // Basic rate limit: 5 req/h por IP
    const { allowed, remaining, resetAt } = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiadas solicitudes. Inténtalo más tarde.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining), 'X-RateLimit-Reset': String(resetAt) } },
      )
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Content-Type inválido' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, message, website, ts } = parsed.data

    // Honeypot
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 }) // silenciar bots
    }

    // Tiempo mínimo en formulario (3s)
    if (typeof ts === 'number') {
      const now = Date.now()
      if (now - ts < 3000) {
        return NextResponse.json({ ok: false, error: 'Envio demasiado rápido.' }, { status: 400 })
      }
    }

    // Enviar correo
    const result = await sendContactEmail({ name, email, message })
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error', err)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
