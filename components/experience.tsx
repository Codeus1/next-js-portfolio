import { Card } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      period: "2022 - Presente",
      description:
        "Liderando el desarrollo de aplicaciones web escalables con React y Next.js. Implementación de arquitecturas modernas y mejores prácticas.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Desarrollo de interfaces de usuario responsivas y accesibles. Colaboración con equipos de diseño y backend para entregar productos de alta calidad.",
      technologies: ["React", "JavaScript", "SASS", "Redux"],
    },
    {
      title: "Junior Frontend Developer",
      company: "StartUp Ventures",
      period: "2019 - 2020",
      description:
        "Construcción de componentes reutilizables y mantenimiento de aplicaciones web. Aprendizaje continuo de nuevas tecnologías y frameworks.",
      technologies: ["HTML", "CSS", "JavaScript", "Vue.js"],
    },
  ]

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-primary">Experiencia</span> Profesional
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Mi trayectoria en el desarrollo web y las empresas donde he contribuido
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card border-border"
              >
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-pretty">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
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
