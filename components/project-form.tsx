"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  link: string | null
  technologies: string[]
  featured: boolean
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState(project?.title || "")
  const [description, setDescription] = useState(project?.description || "")
  const [imageUrl, setImageUrl] = useState(project?.image_url || "")
  const [link, setLink] = useState(project?.link || "")
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || [])
  const [techInput, setTechInput] = useState("")
  const [featured, setFeatured] = useState(project?.featured || false)

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const projectData = {
      title,
      description,
      image_url: imageUrl,
      link: link || null,
      technologies,
      featured,
    }

    try {
      if (project) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", project.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("projects").insert(projectData)
        if (error) throw error
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/placeholder.svg?height=400&width=600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Project Link (optional)</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies</Label>
            <div className="flex gap-2">
              <Input
                id="technologies"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTechnology()
                  }
                }}
                placeholder="Add technology"
              />
              <Button type="button" onClick={addTechnology} variant="outline">
                Add
              </Button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked === true)} />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured Project
            </Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : project ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
