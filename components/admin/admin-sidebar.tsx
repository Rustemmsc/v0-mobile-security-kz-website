"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, FolderTree, FileText, ShoppingCart, Settings, Shield } from "lucide-react"

interface AdminSidebarProps {
  adminUser: {
    full_name: string | null
    role: string
  }
}

const navigation = [
  {
    name: "Дашборд",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Товары",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Категории",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Заказы",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Контент сайта",
    href: "/admin/content",
    icon: FileText,
  },
  {
    name: "Настройки",
    href: "/admin/settings",
    icon: Settings,
  },
]

const superAdminNavigation = [
  {
    name: "Администраторы",
    href: "/admin/users",
    icon: Shield,
  },
]

export function AdminSidebar({ adminUser }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = adminUser.role === "super_admin" ? [...navigation, ...superAdminNavigation] : navigation

  return (
    <div className="flex w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-slate-400">MobileSecurity.kz</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-semibold">{adminUser.full_name?.charAt(0) || "A"}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{adminUser.full_name || "Admin"}</p>
            <p className="text-xs text-slate-400">{adminUser.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
