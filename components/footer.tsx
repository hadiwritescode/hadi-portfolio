"use client"

import { useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="relative py-12 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 Hadi. Built with Next.js, Supabase, and speed.
        </p>

        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  )
}
