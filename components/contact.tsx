"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formData)
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

              <div className="space-y-4">
                <a
                  href="mailto:tu@email.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>tu@email.com</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <span>github.com/tuusuario</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <span>linkedin.com/in/tuusuario</span>
                </a>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border shadow-none">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input className="shadow-none rounded-4xl"
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input className="shadow-none rounded-4xl"
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Enviar Mensaje
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
