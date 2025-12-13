"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "TailwindCSS",
  "Supabase",
  "PostgreSQL",
  "Make.com",
  "Vercel",
  "LemonSqueezy",
]

export function ServicesSection({
  services,
}: { services: Array<{ id: string; title: string; description: string; icon: string }> }) {
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

      const cards = gridRef.current?.querySelectorAll(".service-card")
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
    <section ref={sectionRef} id="services" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Services</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHAT I BUILD</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* Tech Stack Card - Spanning 2 columns */}
        <TechStackCard />
      </div>
    </section>
  )
}

function ServiceCard({
  service,
}: {
  service: {
    id: string
    title: string
    description: string
    icon: string
  }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !spotlightRef.current) return

    const card = cardRef.current
    const spotlight = spotlightRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      spotlight.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent)`
    }

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const Icon =
    (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] || LucideIcons.Code2

  return (
    <div
      ref={cardRef}
      className={cn(
        "service-card group relative border border-border/40 p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden min-h-[280px]",
        isHovered && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        <Icon
          className={cn(
            "w-10 h-10 mb-4 transition-colors duration-300",
            isHovered ? "text-accent" : "text-muted-foreground",
          )}
        />
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-3xl tracking-tight mb-3 transition-colors duration-300",
            isHovered ? "text-accent" : "text-foreground",
          )}
        >
          {service.title}
        </h3>
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">{service.description}</p>
      </div>

      {/* Price tag */}
      <div className="relative z-10 mt-6">
        <span
          className={cn(
            "font-mono text-sm font-semibold transition-colors duration-300",
            isHovered ? "text-accent" : "text-foreground/80",
          )}
        >
          {service.price}
        </span>
      </div>
    </div>
  )
}

function TechStackCard() {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !spotlightRef.current) return

    const card = cardRef.current
    const spotlight = spotlightRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      spotlight.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent)`
    }

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "service-card group relative border border-border/40 p-8 transition-all duration-500 cursor-pointer overflow-hidden col-span-1 md:col-span-2",
        isHovered && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        <LucideIcons.Boxes
          className={cn(
            "w-10 h-10 mb-4 transition-colors duration-300",
            isHovered ? "text-accent" : "text-muted-foreground",
          )}
        />
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-3xl tracking-tight mb-6 transition-colors duration-300",
            isHovered ? "text-accent" : "text-foreground",
          )}
        >
          Tech Stack
        </h3>

        {/* Tech grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="border border-border/30 px-4 py-3 font-mono text-xs text-center text-foreground/80 hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
