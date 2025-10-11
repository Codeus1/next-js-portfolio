import { Card } from "@/components/ui/card"
import { Code2, Palette, Rocket, Zap } from "lucide-react"

export function About() {
  const skills = [
    {
      icon: Code2,
      title: "Desarrollo Frontend",
      description: "React, Next.js, TypeScript, y las últimas tecnologías web",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Interfaces intuitivas y experiencias de usuario excepcionales",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimización y mejores prácticas para aplicaciones rápidas",
    },
    {
      icon: Rocket,
      title: "Innovación",
      description: "Siempre explorando nuevas tecnologías y metodologías",
    },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Sobre <span className="text-primary">Mí</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Desarrollador frontend apasionado por crear experiencias web excepcionales que combinan diseño elegante
              con código robusto
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{skill.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              Con más de 5 años de experiencia en desarrollo web, me especializo en crear aplicaciones modernas y
              escalables. Mi enfoque combina las mejores prácticas de ingeniería con un ojo crítico para el diseño,
              asegurando que cada proyecto no solo funcione perfectamente, sino que también ofrezca una experiencia de
              usuario memorable.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Node.js", "Git", "Figma"].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
