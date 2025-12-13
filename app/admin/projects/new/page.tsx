import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Project</h1>
        <p className="text-muted-foreground mt-2">Add a new project to your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  )
}
