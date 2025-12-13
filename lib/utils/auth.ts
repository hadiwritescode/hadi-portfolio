import { createClient } from "@/lib/supabase/client"

export async function isUserAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false
  
  const { data, error } = await supabase
    .from('admin_profiles')
    .select('id')
    .eq('id', user.id)
    .single()
    
  return !!data
}

export async function ensureAdmin(redirectTo = '/auth/login') {
  const isAdmin = await isUserAdmin()
  
  if (!isAdmin) {
    // Redirect to login if not admin
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = redirectTo
  }
  
  return isAdmin
}
