import { createClient } from "@/lib/supabase/server"
import { MessagesList } from "@/components/messages-list"

export default async function MessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground mt-2">View and manage contact form submissions</p>
      </div>

      <MessagesList messages={messages || []} />
    </div>
  )
}
