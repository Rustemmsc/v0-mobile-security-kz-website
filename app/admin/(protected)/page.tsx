import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, TrendingUp, DollarSign, FolderTree, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [productsResult, ordersResult, categoriesResult] = await Promise.all([
    supabase.from("products").select("*"),
    supabase.from("orders").select("*"),
    supabase.from("product_categories").select("*"),
  ])

  const stats = [
    {
      title: "Всего товаров",
      value: productsResult.data?.length || 0,
      icon: Package,
      color: "text-[#2F2FA2]",
      bgColor: "bg-[#2F2FA2]/10",
    },
    {
      title: "Заказов",
      value: ordersResult.data?.length || 0,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Категорий",
      value: categoriesResult.data?.length || 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Выручка",
      value: "0 ₸",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Дашборд</h1>
        <p className="text-slate-600">Общая статистика вашего магазина</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div className={cn("rounded-full p-2", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/products/new">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Package className="h-6 w-6" />
                Добавить товар
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <FolderTree className="h-6 w-6" />
                Создать категорию
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <FileText className="h-6 w-6" />
                Редактировать контент
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Последние заказы</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-slate-500 py-8">Пока нет заказов</p>
        </CardContent>
      </Card>
    </div>
  )
}
