import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminUsersTable } from "@/components/admin/admin-users-table"

export default async function AdminUsersPage() {
  const cookieStore = await cookies()
  const supabase = await createClient()

  // Проверка авторизации
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/auth/login")
  }

  // Проверка прав администратора
  const { data: admin } = await supabase.from("admin_users").select("*").eq("id", user.id).single()

  if (!admin || admin.role !== "super_admin") {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Управление Администраторами</h1>
        <p className="text-muted-foreground mt-2">
          Создавайте и управляйте учетными записями администраторов с разными уровнями доступа
        </p>
      </div>

      <AdminUsersTable />
    </div>
  )
}
