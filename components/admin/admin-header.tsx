"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, Bell } from "lucide-react"
import { useState } from "react"

interface AdminHeaderProps {
  adminUser: {
    full_name: string | null
    role: string
  }
}

export function AdminHeader({ adminUser }: AdminHeaderProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/auth/login")
    router.refresh()
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Добро пожаловать, {adminUser.full_name || "Admin"}</h2>
        <p className="text-sm text-slate-600">Управляйте вашим сайтом и товарами</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="outline" onClick={handleLogout} disabled={isLoading} className="gap-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          {isLoading ? "Выход..." : "Выйти"}
        </Button>
      </div>
    </header>
  )
}
