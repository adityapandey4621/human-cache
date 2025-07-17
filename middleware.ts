import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options })
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const protectedPaths = ["/dashboard", "/plans", "/summaries", "/flashcards", "/mood-journal", "/settings"] // Add all protected paths here

  console.log(`Middleware: Path: ${request.nextUrl.pathname}, Session exists: ${!!session}`) // Log session status in middleware

  if (!session && protectedPaths.includes(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/"
    return NextResponse.redirect(redirectUrl)
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
     * - auth/callback (Supabase auth callback)
     * - api (API routes)
     * - public (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|api|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)|public).*)",
  ],
}
