"use client"

import { Button } from "@/components/ui/button"
import { VoronoiPattern } from "@/components/voronoi-pattern"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Interactive3DScene } from "./interactive-3d-scene"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background (gradient fallback). Pointer-events disabled so UI stays interactive */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Fallback gradient: más notorio */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-accent/30 dark:from-primary/35 dark:via-primary/15 dark:to-accent/35 animate-gradient" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse motion-reduce:hidden" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/80 rounded-full blur-3xl animate-pulse motion-reduce:hidden"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Voronoi Pattern */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <VoronoiPattern
          count={24}
          speed={0.08}
          roundness={0.6}
          gap={3}
          lineWidth={1}
          lineColor="oklch(0.45 0.15 264 / 0.12)"
          colorA="oklch(0.45 0.15 264 / 0.08)"
          colorB="oklch(0.65 0.2 310 / 0.08)"
          seed={42}
        />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-[2]">
        <Interactive3DScene />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-accent text-xl">Hi, I'm Antonio Muñoz</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Frontend Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-pretty text-sidebar-ring dark:text-foreground/90 transition-colors">
              Building exceptional web experiences with clean code and pixel-perfect design
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className={cn(
                "gap-2 tracking-normal border-none rounded-3xl text-white",
                "bg-gradient-to-r from-primary to-accent",
                "hover:from-primary/85 hover:to-accent/85",
                "shadow-md shadow-primary/20 hover:shadow-primary/40",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background",
                "transition-all duration-300"
              )}
              asChild
            >
              <a href="#projects" aria-label="View featured projects">
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className={cn(
                "gap-2 rounded-3xl transition-all duration-300",
                "hover:bg-primary hover:text-primary-foreground",
                "dark:hover:text-foreground"
              )}
              asChild
            >
              <a href="#contact">Contact</a>
            </Button>
          </div>

          <div
            className="flex items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
            role="list"
            aria-label="Social profiles"
          >
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full border-2 border-muted-foreground/20",
                "transform-gpu transition-transform duration-200 ease-out hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "hover:border-[#0d1117] hover:bg-[#0d1117] hover:text-white",
                "dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
              )}
              asChild
            >
              <a
                href="https://github.com/Codeus1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full border-2 border-muted-foreground/20",
                "transform-gpu transition-transform duration-200 ease-out hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
                "dark:hover:border-[#0A66C2] dark:hover:bg-[#0A66C2] dark:hover:text-white"
              )}
              asChild
            >
              <a
                href="https://www.linkedin.com/in/antonio-munoz-torres/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full border-2 border-muted-foreground/20",
                "transform-gpu transition-transform duration-200 ease-out hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "hover:border-red-600 hover:bg-red-600 hover:text-white",
                "dark:hover:border-red-500 dark:hover:bg-red-500"
              )}
              asChild
            >
              <a href="mailto:tonytorres1098@gmail.com" aria-label="Send email">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-reduce:sr-only animate-bounce z-10">
        <ArrowDown className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
      </div>
    </section>
  )
}
