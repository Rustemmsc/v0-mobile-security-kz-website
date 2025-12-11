import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductsTable } from "@/components/admin/products-table"

export default async function ProductsPage() {
  const supabase = await createClient()

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, product_categories(name_ru, id)")
      .order("position", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("product_categories")
      .select("*")
      .order("display_order"),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Товары</h1>
          <p className="text-slate-600">Управление товарами вашего магазина</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Добавить товар
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все товары</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products || []} categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
