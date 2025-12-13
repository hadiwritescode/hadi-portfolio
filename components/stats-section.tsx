"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: "Projects Delivered", value: "10+" },
  { label: "Client Satisfaction", value: "100%" },
  { label: "Average Delivery", value: "2-3 Days" },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const statElements = sectionRef.current?.querySelectorAll(".stat-item")
      if (statElements) {
        gsap.from(statElements, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-b border-border/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item flex flex-col md:flex-row md:items-baseline md:gap-4 flex-1">
            <span className="font-[var(--font-bebas)] text-4xl md:text-5xl text-accent">{stat.value}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1 md:mt-0">
              {stat.label}
            </span>
            {index < stats.length - 1 && (
              <div className="hidden md:block md:ml-auto md:w-[1px] md:h-12 md:bg-border/40" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
