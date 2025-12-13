import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { WorkSection } from "@/components/work-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SideNav } from "@/components/side-nav"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()

  const [servicesResult, projectsResult] = await Promise.all([
    supabase.from("services").select("*").order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").order("created_at", { ascending: false }),
  ])

  const services = servicesResult.data || []
  const projects = projectsResult.data || []

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
