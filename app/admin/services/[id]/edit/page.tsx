import { createClient } from "@/lib/supabase/server"
import { ServiceForm } from "@/components/service-form"
import { notFound } from "next/navigation"

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service } = await supabase.from("services").select("*").eq("id", id).single()

  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <p className="text-muted-foreground mt-2">Update your service details</p>
      </div>
      <ServiceForm service={service} />
    </div>
  )
}
