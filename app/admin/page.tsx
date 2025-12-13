import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Settings, MessageSquare } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const [projectsResult, servicesResult, messagesResult] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
  ])

  const projectsCount = projectsResult.count || 0
  const servicesCount = servicesResult.count || 0
  const messagesCount = messagesResult.count || 0

  const stats = [
    {
      title: "Total Projects",
      value: projectsCount,
      icon: Briefcase,
      href: "/admin/projects",
    },
    {
      title: "Total Services",
      value: servicesCount,
      icon: Settings,
      href: "/admin/services",
    },
    {
      title: "Contact Messages",
      value: messagesCount,
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
