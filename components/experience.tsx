import { Card } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Personal Docente Investigador y Desarrollador",
      company: "SEK Education Group",
      //todo: poner un date.now() para poner presente o algo asi, "presente" ahi a piñon no me gusta
      period: "2024 - Presente",
      description:
        `Designed and implemented 3D rendering optimization techniques for web applications using drone data, in collaboration 
        with UCJC - Hovering Solutions.
        Developed interactive visualization prototypes and participated in the creation of a comprehensive platform using 
        NestJS and a 3D front-end for managing digital twin projects, including model review, defect control, 
        annotations, and georeferenced image integration.
        `,
      technologies: ["React", "Nest.js", "TypeScript", "Tailwind CSS"],
    },

    {
      title: "Desarrollador Frontend",
      company: "ALTIA",
      period: "7/2023 - 6/2024",
      description: `Developed new functionalities in enterprise applications using React 18 and Vue 3, 
        enhancing code scalability.
        Optimized global state management and routing, reducing asynchronous request errors and accelerating performance.
        Implemented data visualization components that facilitated the interpretation of key information and collaborated on continuous user interface and experience improvements, which increased internal client satisfaction.`,
      technologies: ["Vue.js", "React", "JavaScript", "TypeScript", "REST APIs"],
    },
    {

      title: "QA Engineer",
      company: "THALES",
      period: "6/2022 - 10/2022",
      description:
        "Automated information extraction using SQL queries and stored procedures, reducing data analysis times. Supervised operations on remote machines in AWS, ensuring service continuity. Documented procedures and results in Confluence, improving the traceability of QA processes",
      technologies: ["PL-SQL", "MySQL", "JIRA", "Excel", "AWS"],
    },
  ]
  return (
    <section id="experience" className="py-24 md:py-32 dark:bg-muted">
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
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium dark:bg-ring/10"
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
