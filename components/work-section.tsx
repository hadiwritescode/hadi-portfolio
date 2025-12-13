"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function WorkSection({
  projects,
}: {
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    link: string | null
    featured: boolean
  }>
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Portfolio</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">SELECTED WORK</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Building real apps for real clients. Portfolio expanding soon.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 font-mono text-sm text-muted-foreground">
          More projects coming soon. Currently building for first clients.
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

function WorkCard({
  project,
  index,
}: {
  project: {
    id: string
    title: string
    description: string
    technologies: string[]
    link: string | null
    featured: boolean
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden min-h-[320px]",
        isHovered && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-[10px] uppercase tracking-wider">
              {tech}
            </Badge>
          ))}
        </div>

        <h3
          className={cn(
            "font-[var(--font-bebas)] text-3xl tracking-tight transition-colors duration-300",
            isHovered ? "text-accent" : "text-foreground",
          )}
        >
          {project.title}
        </h3>

        <p className="font-mono text-xs text-muted-foreground leading-relaxed">{project.description}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline transition-colors duration-300"
          >
            View Project <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isHovered ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  )
}
