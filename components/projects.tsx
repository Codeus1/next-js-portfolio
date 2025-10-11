import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel de administración.",
      image: "/modern-ecommerce-website.png",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Dashboard Analytics",
      description:
        "Dashboard interactivo con visualización de datos en tiempo real, gráficos dinámicos y reportes personalizables.",
      image: "/analytics-dashboard-dark-theme.png",
      technologies: ["React", "D3.js", "TailwindCSS", "Node.js"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Social Media App",
      description:
        "Aplicación social con feed en tiempo real, sistema de mensajería, notificaciones push y perfiles de usuario.",
      image: "/social-media-app-interface.png",
      technologies: ["Next.js", "Socket.io", "MongoDB", "AWS"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ]

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Proyectos <span className="text-primary">Destacados</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Una selección de mis trabajos más recientes y significativos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`Captura del proyecto ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" className="gap-2 flex-1 bg-transparent" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                    </Button>
                    <Button size="sm" className="gap-2 flex-1" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
