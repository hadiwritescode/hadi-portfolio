import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: adminProfile } = await supabase.from("admin_profiles").select("*").eq("id", data.user.id).single()

  if (!adminProfile) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav userEmail={data.user.email || ""} />
      <main className="flex-1 p-8 bg-muted/30">{children}</main>
    </div>
  )
}
