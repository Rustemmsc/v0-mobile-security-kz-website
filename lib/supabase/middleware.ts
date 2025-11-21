import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/setup") || request.nextUrl.pathname.startsWith("/admin/auth")) {
    return NextResponse.next()
  }

  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = "/admin/auth/login"
        return NextResponse.redirect(url)
      }

      // User is authenticated, allow access
      console.log("[v0] Middleware: User authenticated:", user.id)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    return NextResponse.next()
  }
}
