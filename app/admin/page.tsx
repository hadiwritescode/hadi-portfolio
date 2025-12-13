// app/admin/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Settings, LayoutDashboard, Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = createClient()

  // Fetch counts
  const [
    projectsCount,
    servicesCount,
    messagesCount
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact' }),
    supabase.from('services').select('*', { count: 'exact' }),
    supabase.from('contact_messages').select('*', { count: 'exact' })
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount.count || 0}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/projects" className="text-primary hover:underline">
                Manage projects
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicesCount.count || 0}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/services" className="text-primary hover:underline">
                Manage services
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesCount.count || 0}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/messages" className="text-primary hover:underline">
                View messages
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/services/new">
                  <Plus className="mr-2 h-4 w-4" /> New Service
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Recent activity will appear here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
