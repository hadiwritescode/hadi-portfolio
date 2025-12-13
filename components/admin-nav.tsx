"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, Briefcase, Settings, MessageSquare, LogOut } from "lucide-react"

interface AdminNavProps {
  userEmail: string
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: Briefcase },
    { href: "/admin/services", label: "Services", icon: Settings },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ]

  return (
    <div className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
