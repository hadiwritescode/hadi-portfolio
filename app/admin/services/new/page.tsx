import { ServiceForm } from "@/components/service-form"

export default function NewServicePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Service</h1>
        <p className="text-muted-foreground mt-2">Add a new service to your portfolio</p>
      </div>
      <ServiceForm />
    </div>
  )
}
