"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto").max(80, "El nombre es demasiado largo"),
  email: z.string().email("Email inválido").max(200),
  message: z.string().min(10, "El mensaje es demasiado corto").max(2000, "El mensaje es demasiado largo"),
  // Anti-spam
  website: z.string().optional(),
  ts: z.number().optional(),
})

type FormData = z.infer<typeof ContactSchema>

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    ts: undefined,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [statusMsg, setStatusMsg] = useState<string>("")

  // Sello de tiempo al montar (min dwell time)
  useEffect(() => {
    setFormData((p) => ({ ...p, ts: Date.now() }))
  }, [])

  // Validación perezosa por campo
  const validators = useMemo(
    () => ({
      name: (v: string) => ContactSchema.shape.name.safeParse(v),
      email: (v: string) => ContactSchema.shape.email.safeParse(v),
      message: (v: string) => ContactSchema.shape.message.safeParse(v),
    }),
    [],
  )

  const validateAll = (data: FormData) => {
    const res = ContactSchema.safeParse(data)
    if (!res.success) {
      const flat = res.error.flatten().fieldErrors as Record<string, string[]>
      const mapped: Partial<Record<keyof FormData, string>> = {}
      for (const k in flat) {
        const msg = flat[k]?.[0]
        if (msg) mapped[k as keyof FormData] = msg
      }
      setErrors(mapped)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setStatusMsg("")

    // Honeypot: si está relleno, terminamos en silencio
    if (formData.website && formData.website.trim().length > 0) {
      setStatus("success")
      setStatusMsg("Mensaje enviado")
      setFormData({ name: "", email: "", message: "", website: "", ts: Date.now() })
      return
    }

    if (!validateAll(formData)) {
      setStatus("error")
      setStatusMsg("Revisa los campos marcados")
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || "No se pudo enviar el mensaje")
      }
      setStatus("success")
      setStatusMsg("¡Gracias! He recibido tu mensaje.")
      setFormData({ name: "", email: "", message: "", website: "", ts: Date.now() })
    } catch (err: any) {
      setStatus("error")
      setStatusMsg(err?.message || "Error al enviar el mensaje")
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Hablemos de tu <span className="text-primary">Proyecto</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              ¿Tienes una idea en mente? Me encantaría escucharla y ayudarte a hacerla realidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6 bg-card border-border shadow-none">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Información de Contacto</h3>
                <p className="text-muted-foreground text-pretty">
                  Estoy disponible para proyectos freelance, colaboraciones o simplemente para charlar sobre tecnología.
                </p>
              </div>
              <div className="space-y-4" role="list" aria-label="Información de contacto">
                <a
                  href="mailto:tonytorres1098@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="Enviar correo a tonytorres1098@gmail.com"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>tonytorres1098@gmail.com</span>
                </a>

                <a
                  href="https://github.com/Codeus1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="Visitar perfil de GitHub de Codeus1 (se abre en nueva ventana)"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <span>github.com/Codeus1</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/antonio-munoz-torres/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="Visitar perfil de LinkedIn de Antonio Muñoz Torres (se abre en nueva ventana)"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <span>linkedin.com/in/antonio-munoz-torres</span>
                </a>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border shadow-none">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website || ""}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />
                {/* timestamp */}
                <input type="hidden" name="ts" value={formData.ts || 0} />
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    className="shadow-none rounded-4xl"
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={(e) => {
                      const r = validators.name(e.target.value)
                      setErrors((p) => ({ ...p, name: r.success ? undefined : r.error.errors[0].message }))
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    className="shadow-none rounded-4xl"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={(e) => {
                      const r = validators.email(e.target.value)
                      setErrors((p) => ({ ...p, email: r.success ? undefined : r.error.errors[0].message }))
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onBlur={(e) => {
                      const r = validators.message(e.target.value)
                      setErrors((p) => ({ ...p, message: r.success ? undefined : r.error.errors[0].message }))
                    }}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div aria-live="polite" aria-atomic="true" className="min-h-6">
                  {status !== "idle" && statusMsg && (
                    <p className={`text-sm ${status === "success" ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                      {statusMsg}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="cursor-pointer w-full gap-2 dark:hover:text-foreground dark:text-foreground disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-8 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Frontend Developer Portfolio. Hecho con ❤️ y Next.js
          </p>
        </div>
      </footer>
    </section>
  )
}
