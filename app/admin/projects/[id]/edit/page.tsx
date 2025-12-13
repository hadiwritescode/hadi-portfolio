import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/project-form"
import { notFound } from "next/navigation"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground mt-2">Update your project details</p>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}
