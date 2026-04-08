import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      title: "Simple Invoice Generator",
      description:
        "Create and manage invoices quickly with a clean, responsive UI. Includes invoice details capture and a shareable flow for sending to clients.",
      image: "/formulario factura ver detalle.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      github: "https://github.com/Codeus1/facturasimple",
      demo: "https://generador-facturas-nine.vercel.app/",
    },
    {
      title: "YouTube Clone",
      description: "A YouTube clone with video playback, user authentication, comments, likes and subscriptions.",
      image: "/studio_new-tube.png",
      technologies: ["Next.js", "Firebase", "TypeScript", "Sass"],
      github: "https://github.com/antonioPDI/new-tube",
      demo: "https://demo.com",
    },
    {
      title: "AI Multi Chatbot",
      description:
        "Conversational AI platform that lets you switch between custom personas, route context through knowledge bases, and stream GPT-powered replies in real time.",
      image: "/chatbot-nextjs.png",
      technologies: ["Next.js", "TypeScript", "OpenAI", "TailwindCSS"],
      github: "https://github.com/Codeus1/ai-multichatbot",
      demo: "https://ai-multichatbot.vercel.app/",
    },
    {
      title: "Dashboard Analytics",
      description: "Interactive dashboard with real-time data visualization, dynamic charts and customizable reports.",
      image: "/analytics-dashboard-dark-theme.png",
      technologies: ["React", "D3.js", "TailwindCSS", "Node.js"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Kryptox Premium Headphones",
      description:
        "E-commerce landing page for a premium headphone brand. Features a sleek, dark-themed UI and product showcase.",
      image: "/kryptox-headphones.png",
      technologies: ["Next.js", "React", "TailwindCSS"],
      github: "",
      githubDisabled: true,
      demo: "https://premiumheadphones.vercel.app/",
    },
    // {
    //   title: "Social Media App",
    //   description:
    //     "Social app with real-time feed, messaging system, push notifications and user profiles.",
    //   image: "/social-media-app-interface.png",
    //   technologies: ["Next.js", "Socket.io", "MongoDB", "AWS"],
    //   github: "https://github.com",
    //   demo: "https://demo.com",
    // },
  ]

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30 dark:bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {/* en ingles */}
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {/* en ingles */}A selection of my most recent and significant work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-[1500ms] ease-in-out" />

                <Card className="relative h-full overflow-hidden bg-card border-border flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-muted shrink-0">
                    <Image
                      src={project.image || "/studio_new-tube.png"}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      {project.githubDisabled ? (
                        <div title="Private repository" className="flex flex-1 cursor-not-allowed">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="gap-2 w-full group pointer-events-none"
                          >
                            <Github className="w-4 h-4" aria-hidden="true" />
                            Code
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 flex-1 bg-transparent group transform-gpu transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-[#0d1117] hover:bg-[#0d1117] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                          asChild
                        >
                          {/* en ingles */}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open code for ${project.title} on GitHub (opens in new tab)`}
                            title="Open on GitHub"
                          >
                            <Github
                              className="w-4 h-4 transition duration-200 motion-safe:group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 flex-1 bg-transparent group transform-gpu transition duration-200 ease-out 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-accent 
                      hover:bg-accent hover:text-accent-foreground 
                      dark:hover:border-accent dark:hover:bg-accent dark:hover:text-accent-foreground"
                        asChild
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open demo for ${project.title} (opens in new tab)`}
                          title="Open demo"
                        >
                          <ExternalLink
                            className="w-4 h-4 transition duration-200 motion-safe:group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
