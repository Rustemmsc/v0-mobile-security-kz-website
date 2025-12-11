import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/auth/login")
  }

  let adminUser = null
  try {
    const { data, error } = await supabase.from("admin_users").select("*").eq("id", user.id).single()

    if (error) {
      console.log("[v0] Layout: Could not fetch admin user:", error.message)
    } else {
      adminUser = data
    }
  } catch (err) {
    console.error("[v0] Layout: Error fetching admin user:", err)
  }

  const displayUser = adminUser || {
    id: user.id,
    email: user.email || "admin@mobilesecurity.kz",
    full_name: "Администратор",
    role: "super_admin",
    created_at: new Date().toISOString(),
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <AdminSidebar adminUser={displayUser} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader adminUser={displayUser} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
