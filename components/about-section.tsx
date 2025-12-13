"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const workPrinciples = [
  {
    number: "01",
    title: "Ship Fast, Iterate Later",
    description: "Move quickly, deliver results, improve based on real feedback.",
  },
  {
    number: "02",
    title: "AI-Powered Development",
    description: "Leverage cutting-edge AI tools to build faster and smarter.",
  },
  {
    number: "03",
    title: "Transparent Pricing",
    description: "Clear costs, no surprises, honest timelines from day one.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article) => {
        gsap.from(article, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / About</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHO I AM</h2>
      </div>

      {/* About content */}
      <div ref={contentRef} className="mb-24">
        <div className="max-w-3xl">
          <p className="font-mono text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            I'm <HighlightText parallaxSpeed={0.6}>Hadi</HighlightText>, a 19-year-old developer from Lahore taking a
            gap year before university.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
            I build fast—2-3 days average delivery—using AI-powered development tools to compete with established
            developers. My goal: reach $3k/month revenue by 2027 through real client work, not just practice projects.
          </p>
        </div>
      </div>

      {/* How I Work */}
      <div ref={principlesRef} className="space-y-12">
        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-8">HOW I WORK</h3>

        {workPrinciples.map((principle, index) => (
          <article
            key={index}
            className="flex flex-col items-start text-left border-l-2 border-border/40 pl-6 hover:border-accent transition-colors duration-300"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {principle.number}
            </span>
            <h4 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight mb-2">{principle.title}</h4>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-md">{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
