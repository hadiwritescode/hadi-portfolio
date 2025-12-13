"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Mail, Github, Twitter, Linkedin, Send } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
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
      }

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const supabase = createClient()

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
        status: "unread",
      })

      if (error) throw error

      setSubmitStatus("success")
      setName("")
      setEmail("")
      setMessage("")

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      <div ref={contentRef} className="max-w-3xl">
        {/* Email - large and centered */}
        <a
          href="mailto:nothadihere@gmail.com"
          className="group inline-flex items-center gap-4 mb-8 hover:translate-x-2 transition-transform duration-300"
        >
          <Mail className="w-8 h-8 text-accent" />
          <span className="font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight group-hover:text-accent transition-colors duration-300">
            nothadihere@gmail.com
          </span>
        </a>

        {/* Availability note */}
        <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4 mt-12">
          Available for projects starting January 2026.
        </p>
        <p className="font-mono text-sm text-accent leading-relaxed mb-12">First 3 clients get 50% off.</p>

        <div className="border border-border/40 p-8 mb-12">
          <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-xs uppercase tracking-wider">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-mono text-xs uppercase tracking-wider">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSubmitting}
                rows={6}
                className="bg-transparent resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <p className="text-sm text-accent font-mono">Message sent successfully! I'll get back to you soon.</p>
            )}

            {submitStatus === "error" && (
              <p className="text-sm text-destructive font-mono">Failed to send message. Please try again.</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto font-mono text-xs uppercase tracking-wider"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Connect</span>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-3 border border-border/40 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 border border-border/40 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 border border-border/40 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
