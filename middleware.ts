import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )

  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the user's session
    const { data: { session } } = await supabase.auth.getSession()

    // If there's no session, redirect to login
    if (!session) {
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Check if the user is an admin
    const { data: adminData, error } = await supabase
      .from('admin_profiles')
      .select('id')
      .eq('id', session.user.id)
      .single()

    // If the user is not an admin, redirect to login
    if (error || !adminData) {
      await supabase.auth.signOut()
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('error', 'You do not have admin access')
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/ (auth routes)
     * - api/auth/ (auth API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/|api/auth/).*)',
  ],
}
