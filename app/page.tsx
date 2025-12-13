/// <reference types="react" />
/// <reference types="next" />
/// <reference types="next/navigation" />

'use client'

import React, { useEffect, useState } from 'react'
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { WorkSection } from "@/components/work-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SideNav } from "@/components/side-nav"
import { createClient } from "@/lib/supabase/client"

export default function Page() {
  const [services, setServices] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        
        const [servicesResult, projectsResult] = await Promise.allSettled([
          supabase.from("services").select("*").order("sort_order", { ascending: true }),
          supabase.from("projects").select("*").order("created_at", { ascending: false }),
        ])

        if (servicesResult.status === 'fulfilled' && servicesResult.value.data) {
          setServices(servicesResult.value.data)
        }

        if (projectsResult.status === 'fulfilled' && projectsResult.value.data) {
          setProjects(projectsResult.value.data)
        }

      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <ServicesSection services={services} />
        <WorkSection projects={projects} />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
