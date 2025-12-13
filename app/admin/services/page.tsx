import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { ServicesList } from "@/components/services-list"

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: services } = await supabase.from("services").select("*").order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio services</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <ServicesList services={services || []} />
    </div>
  )
}
