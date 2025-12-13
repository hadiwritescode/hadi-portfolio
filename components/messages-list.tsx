"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, MailOpen } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Message {
  id: string
  name: string
  email: string
  message: string
  status: string
  created_at: string
}

export function MessagesList({ messages }: { messages: Message[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleStatus = async (id: string, currentStatus: string) => {
    const supabase = createClient()
    const newStatus = currentStatus === "read" ? "unread" : "read"

    const { error } = await supabase.from("contact_messages").update({ status: newStatus }).eq("id", id)

    if (!error) {
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("contact_messages").delete().eq("id", id)

    if (error) {
      console.error("Error deleting message:", error)
    } else {
      router.refresh()
    }
    setDeletingId(null)
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">No messages yet.</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  {message.name}
                  <Badge variant={message.status === "read" ? "secondary" : "default"}>{message.status}</Badge>
                </CardTitle>
                <CardDescription className="mt-1">
                  {message.email} • {new Date(message.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{message.message}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toggleStatus(message.id, message.status)}>
                {message.status === "read" ? (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Mark Unread
                  </>
                ) : (
                  <>
                    <MailOpen className="h-4 w-4 mr-2" />
                    Mark Read
                  </>
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={deletingId === message.id}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this message from {message.name}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(message.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
