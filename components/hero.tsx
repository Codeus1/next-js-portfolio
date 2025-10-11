"use client"

import { Interactive3DScene } from "@/components/interactive-3d-scene"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background (gradient fallback). Pointer-events disabled so UI stays interactive */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse motion-reduce:hidden" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse motion-reduce:hidden"
          style={{ animationDelay: "1s" }}
        />
      </div>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Interactive3DScene />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-accent text-xl">Hola, soy Antonio Muñoz</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Frontend Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-pretty text-accent">
              Creando experiencias web excepcionales con código limpio y diseño pixel-perfect
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" className="gap-2 tracking-normal border border-none rounded-3xl" asChild>
              <a href="#projects">
                Ver Proyectos
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 rounded-3xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a href="#contact">Contactar</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-background" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 text-background" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:tu@email.com">
                <Mail className="w-5 h-5 text-background" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
