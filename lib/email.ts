type ContactPayload = { name: string; email: string; message: string }

function getEnv(name: string) {
  if (typeof process !== 'undefined' && process.env) return process.env[name]
  return undefined
}

export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const TO = getEnv('CONTACT_TO') || 'javig78608@arqsis.com'
  const KEY = getEnv('RESEND_API_KEY')

  // Fallback seguro si no hay clave: log y éxito simulado para no romper UX
  if (!KEY) {
    console.warn('[email] RESEND_API_KEY no configurada. Simulando envío: ', payload)
    return { ok: true }
  }

  // Import dinámico para no cargar el SDK si no se usa
  const { Resend } = await import('resend').catch(() => ({ Resend: undefined as any }))
  if (!Resend) {
    console.error('[email] Paquete resend no disponible')
    return { ok: false, error: 'Email provider no disponible' }
  }

  try {
    const resend = new Resend(KEY)
    const subject = `Nuevo mensaje de contacto: ${payload.name}`
    const html = `
      <h2>Nuevo mensaje desde el portfolio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Mensaje:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(payload.message)}</pre>
    `
    await resend.emails.send({ from: 'Portfolio <noreply@resend.dev>', to: [TO], subject, html })
    return { ok: true }
  } catch (e: any) {
    console.error('[email] Error enviando correo', e)
    return { ok: false, error: 'No se pudo enviar el correo' }
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
