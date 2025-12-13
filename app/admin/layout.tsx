import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Get the user's session
  const { data: { user }, error } = await supabase.auth.getUser()

  // If there's no user, redirect to login with a redirect back URL
  if (error || !user) {
    const redirectUrl = new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    redirectUrl.searchParams.set('redirectedFrom', '/admin')
    redirect(redirectUrl.toString())
  }

  // Check if user is an admin
  const { data: adminProfile, error: adminError } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  // If user is not an admin, sign them out and redirect to login
  if (adminError || !adminProfile) {
    await supabase.auth.signOut()
    const redirectUrl = new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    redirectUrl.searchParams.set('error', 'unauthorized')
    redirect(redirectUrl.toString())
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav userEmail={user.email || ""} />
      <main className="flex-1 p-8 bg-muted/30">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
