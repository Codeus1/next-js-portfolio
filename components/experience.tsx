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
        "Investigador en técnicas de optimización de renderizado de modelos 3D para web mediante escaneo previo de drones en UCJC - Hovering Solutions.",
      technologies: ["React", "Nest.js", "TypeScript", "Tailwind CSS"],
    },

    {
      title: "Desarrollador Frontend",
      company: "ALTIA",
      period: "7/2023 - 6/2024",
      description:
        "Development of Front-End functionalities with JavaScript frameworks like Vue.js 3 and React 18.\n- Data visualization with JavaScript in structured formats for better and faster understanding by humans, such as data tables.\n- Management of asynchronous requests to data sources.\n- Management and handling of global state in front-end applications.\n- Routing management in web applications.\n- Database communication to optimize application performance.\n- Continuous improvement of user interface and user experience (UI/UX).",
      technologies: ["Vue.js", "React", "JavaScript", "TypeScript", "REST APIs"],
    },
    {
      title: "QA Engineer",
      company: "THALES",
      period: "6/2022 - 10/2022",
      description:
        "Contrato de prácticas · Consultas a base de datos para extraer información relevante para la empresa.\nCreación de procedimientos almacenados (PL-SQL).\nTratamiento de datos (organización y visualización) con Excel.\nRevisar funcionamiento de maquinas remotas (AWS).\nDocumentación de actividades relevantes con Confluence - JIRA",
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
