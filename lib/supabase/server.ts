import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "@/lib/supabase/database.types"

type TypedSupabaseClient = ReturnType<typeof createSupabaseServerClient<Database>>

export function createClient(): TypedSupabaseClient {
  const cookieStore = cookies()
  
  // Create a simple cookie store that matches the expected interface
  const cookieStoreWrapper = {
    get: (name: string) => {
      const cookie = cookieStore.get(name)
      return cookie?.value
    },
    set: (name: string, value: string, options: any) => {
      try {
        cookieStore.set({ name, value, ...options })
      } catch (error) {
        console.error('Error setting cookie:', error)
      }
    },
    remove: (name: string, options: any) => {
      try {
        cookieStore.set({ name, value: '', ...options })
      } catch (error) {
        console.error('Error removing cookie:', error)
      }
    }
  }
  
  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStoreWrapper.get(name)
        },
        set(name: string, value: string, options: any) {
          cookieStoreWrapper.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStoreWrapper.remove(name, options)
        }
      }
    }
  )
}
